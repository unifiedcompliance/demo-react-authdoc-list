## Setup

Before proceeding, you will need a [RapidAPI](https://www.rapidapi.com/) account that is subscribed to the 
[grcSchema API](https://rapidapi.com/unified-compliance-unified-compliance-default/api/grcschema).

This project uses [Yarn](https://classic.yarnpkg.com/en/docs/install) for package management, development, and build tooling.

Copy the contents of the `.env.template` file to `.env` and add your RapidAPI API key to the `APP_API_KEY` variable line.

From the project directory you may run the following:

`yarn install`: This step is required to install package dependencies.

`yarn start`: Launch an instance of the app locally in development mode that will be accessible from 
[http://localhost:3000](http://localhost:3000). The development instance will live reload as you make any edits and lint 
errors will populate in the console.

`yarn test`: Launch the test runner in interactive watch mode.

`yarn build`: Build the app for production deployment in the `build` directory. This will build a performance optimized, 
minified version of the app which can then be deployed.

**Note: The below is a one-way operation and cannot be reverted.**

`yarn eject`: If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This
 command will remove the single build dependency from your project.
              
Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into 
your project so you have full control over them. All of the commands except `eject` will still work, but they will point
 to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t 
feel obligated to use this feature. However, we understand that this tool wouldn’t be useful if you couldn’t customize it 
when you are ready for it.

## Demo

You can find a live demo [here](https://developer.unifiedcompliance.com/demo/react/).

## Resources

The [GRC Schema documentation](http://grcschema.org) can be used for reference of object return structures.

The [Authority Document Library Spec Sheet](https://theucf.info/GH-AD-Library) can be used for development and design 
reference.

## Universal Hierarchy Component

We leverage a universal hierarchy component that can be repurposed for multiple different hierarchy based elements from
preprocessed data sets. The documentation for it is as follows:

### Preprocessing

Each hierarchical list of items will need to be preprocessed from the API response/data set you wish to use. Each item 
should be an object containing the following structure:

```javascript
    {
      id: "1", // String - Unique identifier value
      name: "Item Name", // String - Name
      icon: <Folder /> // Component - Any available mdi icon component, imported from @material-ui/icons
      iconOpen: <FolderOpen />, // Component|Boolean - Any available mdi icon component, imported from @material-ui/icons, or false if the icon shouldn't change when expanded
      info: true, // Boolean - If a clickable info icon should be displayed
      selectable: true, // Boolean - If the item should be selectable
      selected: false, // Boolean - If the item should be selected
      children: [] // Array - A nested array of children items
    }
```

An example of a preprocessing functions from the Authority Documents list can be found in 
`src/store/reducers/documentList.js`. The geography list preprocessing function is included in the following example:

```javascript
    function structureGeographyTree(documents) {
        const dataTree = [];
        const treeList = [];

        for (const item of documents) {
            dataTree.push({
                id: item.authority_document_fk,
                name: item.authority_document_name,
                icon: item.category_fk === 1 ? <FileDocument /> : <Folder />,
                iconOpen: item.category_fk === 1 ? false : <FolderOpen />,
                info: item.category_fk === 1,
                selectable: item.category_fk === 1,
                selected: false,
                ...item
            });
        }

        for (const item of dataTree) {
            if (item.parent_id === null) {
                treeList.push(item);
                continue;
            }
            for (const parItem of dataTree) {
                if (parItem.authority_document_fk === item.parent_id) {
                    if (!parItem.children || parItem.children === 0) {
                        parItem.children = [];
                    }
                    parItem.children.push(item);
                    _.sortBy(parItem.children, [
                        function (o) {
                            return o.sort_value;
                        }
                    ]);
                    break;
                }
            }
        }

        _.sortBy(treeList, [
            function (o) {
                return o.sort_value;
            }
        ]);

        return treeList;
    }
```

### Implementation

To implement the hierarchy component you will need to import it to the working component:

```javascript
    import Hierarchy from "../../components/Hierarchy";
```

Implement a single hierarchical view without the selected items tree to the right:

```
    <Hierarchy
        viewType="single"
        treeLabel="String - Label for the tree"
        filterKey={"Variable - A state based variable for filtering items in the tree by name"}
        treeItems={"Object - The preproccessed hierarchical nested list of items"}
        handleInfoItem={"Function - The callback function to handle when an item's info button is clicked, it should accept the id of the item"}
    />
```

Implement a double hierarchical view with the selected items tree to the right:

```
    <Hierarchy
        viewType="double"
        treeLabel="String - Label for the tree"
        selectedTreeLabel="String - Label for the selected items tree"
        filterKey={"Variable - A state based variable for filtering items in the tree by name"}
        treeItems={"Object - The preproccessed hierarchical nested list of items"}
        handleInfoItem={"Function - The callback function to handle when an item's info button is clicked, it should accept the id of the item"}
    />
```

You can access an array of selected items from `selectedItems` in the state of the component.
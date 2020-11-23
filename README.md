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

You can find a live demo [here](http://grcschema-demo.unifiedcompliance.com/react/).

## Resources

The [GRC Schema documentation](http://grcschema.org) can be used for reference of object return structures.

The [Authority Document Library Spec Sheet](https://theucf.info/GH-AD-Library) can be used for development and design 
reference.
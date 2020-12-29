import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import { Typography, Checkbox, Tooltip } from '@material-ui/core';
import { InfoOutlined } from '@material-ui/icons';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import './Hierarchy.css';


function ExtendedTreeItem(props) {
    const { item, expanded, infoItem, selectItem } = props;
    return (
        <>
            <TreeItem
                nodeId={item.id.toString()}
                collapseIcon={<><ArrowDropDownIcon />{item.iconOpen ? item.iconOpen : item.icon}</>}
                expandIcon={<><ArrowRightIcon />{item.icon}</>}
                endIcon={item.icon}
                label={
                    <div className="hierarchy-tree-item">
                        <Tooltip title={item.name} placement="bottom">
                            <Typography className="item-label">
                                {item.name}
                            </Typography>
                        </Tooltip>
                        <>
                            {item.info &&
                            <span className="icon-wrapper" onClick={(e) => infoItem(e, item.id)}>
                                <InfoOutlined/>
                            </span>
                            }
                            {item.selectable &&
                            <Checkbox
                                color="primary"
                                size="small"
                                checked={item.selected}
                                onClick={(e) => selectItem(e, item)}
                                inputProps={{'aria-label': 'secondary checkbox'}}
                            />
                            }
                        </>
                    </div>
                }
            >
                {(item.has_children && item.has_children > 0) && item.children.map((treeItem) => {
                    return (
                        <ExtendedTreeItem
                            key={treeItem.id}
                            item={treeItem}
                            expanded={expanded}
                            infoItem={infoItem}
                            selectItem={selectItem}
                        />
                    );
                })}
            </TreeItem>
        </>
    );
}

export default class Hierarchy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredTreeItems: [],
            selectedTreeItems: [],
            expandedItems: [],
            expandedSelectedItems: [],
            selectedItems: []
        };
    }

    static propTypes = {
        viewType: PropTypes.string,
        filterKey: PropTypes.string,
        treeLabel: PropTypes.string,
        selectedTreeLabel: PropTypes.string,
        treeItems: PropTypes.array,
        handleInfoItem: PropTypes.func,
        handleSelectItem: PropTypes.func
    }
    static defaultProps = {};

    handleExpandItem(e, items) {
        this.setState({
            expandedItems: items
        });
    }

    expandedItems() {
        const treeItems = _.cloneDeep(this.state.filteredTreeItems);
        if (this.props.filterKey === '') {
            return this.filterTreeItemProps(this.filterTreeItems(treeItems, 'id', this.state.selectedItems), 'id');
        } else {
            return this.filterTreeItemProps(this.filterTreeItems(treeItems, 'name', this.props.filterKey), 'id');
        }
    };
    selectedTreeItems() {
        const treeItems = _.cloneDeep(this.props.treeItems);
        return this.filterTreeItems(this.restoreSelectedTreeItems(treeItems), 'id', this.state.selectedItems);
    };
    expandedSelectedItems() {
        const treeItems = _.cloneDeep(this.selectedTreeItems());
        return this.filterTreeItemProps(this.filterTreeItems(treeItems, 'id', this.state.selectedItems), 'id');
    };

    infoItem = (e, id) => {
        e.preventDefault();
        this.props.handleInfoItem(id);
    };
    selectItem = (e, item) => {
        e.preventDefault();
        const idx = this.state.selectedItems.indexOf(item.id);
        if (idx > -1) {
            this.state.selectedItems.splice(idx, 1);
        } else {
            this.state.selectedItems.push(item.id);
        }
        this.setState({
            filteredTreeItems: this.restoreSelectedTreeItems(this.state.filteredTreeItems),
            selectedTreeItems: this.selectedTreeItems(),
            expandedSelectedItems: this.expandedSelectedItems().map((item) => {
                return(item.toString());
            })
        });

        //this.$emit('item-selected', item);
    };
    filterTreeItems(list, prop, filter) {
        const obj = this;
        return _.filter(list, (item) => {
            let filtered = false;
            if (item.children) {
                item.children = obj.filterTreeItems(item.children, prop, filter);
                filtered = !_.isEmpty(item.children);
            }
            if (item[prop]) {
                if (_.isBoolean(filter) && item[prop] === filter) {
                    filtered = true;
                } else if (_.isArrayLike(filter) && filter.includes(item[prop])) {
                    filtered = true;
                } else if (_.isString(filter) && _.includes(_.toLower(item[prop]), _.toLower(filter))) {
                    filtered = true;
                }
            }

            return filtered;
        });
    };
    filterTreeItemProps(list, prop) {
        const obj = this;
        return _.reduce(list, function(result, value, key) {
            if (key === prop) {
                result.push(value);
            } else if (_.isObjectLike(value)) {
                return result.concat(obj.filterTreeItemProps(value, prop));
            }

            return result;
        }, []);
    };
    restoreSelectedTreeItems(list) {
        const obj = this;
        for (const item of list) {
            if (item.children) {
                obj.restoreSelectedTreeItems(item.children);
            }
            item.selected = obj.state.selectedItems.includes(item.id);
        }

        return list;
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.filterKey !== this.props.filterKey) {
            const treeItems = _.cloneDeep(this.props.treeItems);
            this.setState({
                filteredTreeItems: this.restoreSelectedTreeItems(this.filterTreeItems(treeItems, 'name', this.props.filterKey))
            }, () => {
                this.setState({
                    expandedItems: this.expandedItems().map((item) => {
                        return(item.toString());
                    })
                });
            });
        }
        if (prevProps.treeItems.toString() !== this.props.treeItems.toString()) {
            const treeItems = _.cloneDeep(this.props.treeItems);
            this.setState({
                filteredTreeItems: this.restoreSelectedTreeItems(this.filterTreeItems(treeItems, 'name', this.props.filterKey))
            }, () => {
                this.setState({
                    selectedTreeItems: this.selectedTreeItems()
                }, () => {
                    this.setState({
                        expandedItems: this.expandedItems().map((item) => {
                            return(item.toString());
                        }),
                        expandedSelectedItems: this.expandedSelectedItems().map((item) => {
                            return(item.toString());
                        })
                    });
                });
            });
        }
    }

    render() {
        const { props, state } = this;
        return (
            <div className="hierarchy-list">
                <div className="hierarchy-tree">
                    <p className="tree-label">{props.treeLabel}</p>
                    <TreeView
                        expanded={state.expandedItems}
                        defaultCollapseIcon={<ArrowDropDownIcon/>}
                        defaultExpandIcon={<ArrowRightIcon/>}
                        defaultEndIcon={<div style={{width: 24}}/>}
                        onNodeToggle={(e, nodes) => this.handleExpandItem(e, nodes)}
                    >
                        {state.filteredTreeItems && state.filteredTreeItems.map((treeItem) => {
                            return (
                                <ExtendedTreeItem
                                    key={treeItem.id}
                                    item={treeItem}
                                    expanded={state.expandedItems}
                                    infoItem={this.infoItem}
                                    selectItem={this.selectItem}
                                />
                            );
                        })}
                    </TreeView>
                </div>

                {props.viewType === 'double' &&
                <div className="hierarchy-tree">
                    <p className="tree-label">{props.selectedTreeLabel}</p>
                    <TreeView
                        expanded={state.expandedSelectedItems}
                        defaultCollapseIcon={<ArrowDropDownIcon/>}
                        defaultExpandIcon={<ArrowRightIcon/>}
                        defaultEndIcon={<div style={{width: 24}}/>}
                    >
                        {state.selectedTreeItems && state.selectedTreeItems.map((treeItem) => {
                            return (
                                <ExtendedTreeItem
                                    key={treeItem.id}
                                    item={treeItem}
                                    expanded={state.expandedSelectedItems}
                                    infoItem={this.infoItem}
                                    selectItem={this.selectItem}
                                />
                            );
                        })}
                    </TreeView>
                </div>
                }
            </div>
        )
    };
};

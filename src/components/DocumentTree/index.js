import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import { Typography, Checkbox } from '@material-ui/core';
import { Folder, InfoOutlined } from '@material-ui/icons';
import { FolderOpen, FileDocument } from 'mdi-material-ui';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import styles from './styles';

const useTreeItemStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.secondary,
    '&:hover > $content': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:focus > $content, &$selected > $content': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
      color: 'var(--tree-view-color)',
    },
    '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
      backgroundColor: 'transparent',
    },
  },
  content: {
    boxSizing: 'border-box',
    paddingLeft: theme.spacing(2),
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '$expanded > &': {
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
  expanded: {},
  selected: {},
  label: {
    fontWeight: 'inherit',
    color: 'inherit',
  },
  labelRoot: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 0.5),
  },
  labelText: {
    flexGrow: 1,
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.87)',
    paddingLeft: '5px'
  },
}));

function StyledTreeItem(props) {
  const classes = useTreeItemStyles();
  const { labelText, data, nodeId, expandedTreeNodes, filteredTreeNodes, isFiltering, handleSelectDocument, handleShowDocumentCard, ...other } = props;
  const nodeExpanded = !isFiltering || ( nodeId === '0' ||  filteredTreeNodes.includes(nodeId) );
  return ( nodeExpanded ?
    <>
      <TreeItem
        nodeId={nodeId}
        collapseIcon={data.category_fk !== 1 ? <><ArrowDropDownIcon /><FolderOpen /></> : <><ArrowDropDownIcon /><FileDocument /></>}
        expandIcon={data.category_fk !== 1 ? <><ArrowRightIcon /><Folder /></> : <><ArrowRightIcon /><FileDocument /></>}
        endIcon={data.category_fk !== 1 ? <Folder /> : <FileDocument />}
        label={
          <div className={classes.labelRoot}>
            <Typography className={classes.labelText}>
              {labelText}
            </Typography>
            {data.category_fk === 1 &&
              <>
                <span className="icon-wrapper" onClick={(e) => handleShowDocumentCard(e, data.authority_document_fk)}>
                  <InfoOutlined />
                </span>
                <Checkbox
                  color="primary"
                  size="small"
                  checked={data.selected}
                  onClick={(e) => handleSelectDocument(e, data, e.target.checked)}
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
              </>
            }
          </div>
        }
        classes={{
          root: classes.root,
          content: classes.content,
          expanded: classes.expanded,
          selected: classes.selected,
          group: classes.group,
          label: classes.label,
        }}
        {...other}
      >
        {(data.has_children && data.has_children > 0) && data.children.map((treeItem) => {
          return (
            <StyledTreeItem
              key={treeItem.id}
              nodeId={treeItem.id.toString()}
              labelText={treeItem.authority_document_name}
              data={treeItem}
              expandedTreeNodes={expandedTreeNodes}
              filteredTreeNodes={filteredTreeNodes}
              isFiltering={isFiltering}
              handleSelectDocument={handleSelectDocument}
              handleShowDocumentCard={handleShowDocumentCard}
            />
          );
        })}
      </TreeItem>
      <style jsx>{styles}</style>
    </> : <TreeItem nodeId={nodeId} label="Calendar" style={{display: 'none'}} />
  );

}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: '100%',
  },
});

const DocumentTree = ({ treeData, expandedTreeNodes, filteredTreeNodes, isFiltering, handleNodeToggle, handleSelectDocument, handleShowDocumentCard }) => {
  const classes = useStyles();
  
  return (
    <TreeView
      className={classes.root}
      expanded={expandedTreeNodes}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      onNodeToggle={(e, nodes) => handleNodeToggle(e, nodes)}
    >
      { treeData && treeData.map((treeItem) => {
        return (
          <StyledTreeItem
            key={treeItem.id}
            nodeId={treeItem.id.toString()}
            labelText={treeItem.name}
            data={treeItem}
            expandedTreeNodes={expandedTreeNodes}
            filteredTreeNodes={filteredTreeNodes}
            isFiltering={isFiltering}
            handleSelectDocument={handleSelectDocument}
            handleShowDocumentCard={handleShowDocumentCard}
          />
        );
      })}
    </TreeView>
  );
}

export default DocumentTree;

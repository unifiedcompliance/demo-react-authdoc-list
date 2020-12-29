import React from 'react';
import _ from 'lodash';
import * as actionTypes from '../actionTypes';
import {FileDocument} from "mdi-material-ui";
import {Folder, FolderOpen} from "@material-ui/icons";

const initialState = {
  documents:[],
  geographyTreeList: [],
  selectedDocuments: [],
  subjectMatters: [],
  isFiltering: false,
  isLoadingStatus: false
};

const documentList = (state = initialState, action={}) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.FETCH_GEOGRAPHY_HIERARCHY_START: {
      const { isFiltering } = payload;
      return {
        ...state,
        isFiltering,
        isLoadingStatus: true
      }
    }
    case actionTypes.FETCH_GEOGRAPHY_HIERARCHY_FINISHED: {
      const documents = [...payload];
      const treeList = structureGeographyTree(payload);
      return {
        ...state,
        documents,
        geographyTreeList: treeList,
        isLoadingStatus: false
      }
    }
    case actionTypes.FETCH_SM_HIERARCHY_START: {
      const { isFiltering } = payload;
      return {
        ...state,
        isFiltering,
        isLoadingStatus: true
      };
    }
    case actionTypes.FETCH_SM_HIERARCHY_FINISHED: {
      const { subjectMatters, adSubjectMatters } = payload;
      const documents = [...adSubjectMatters];
      const treeList = structureSubjectMatterTree(subjectMatters, adSubjectMatters);
      return {
        ...state,
        documents,
        geographyTreeList: treeList,
        isLoadingStatus: false
      }
    }
    default: return state;
  }
}

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

function structureSubjectMatterTree(subjectMatters, documents) {
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

  for (const item of subjectMatters) {
    treeList.push({
      id: 'sm-' + item.id,
      name: item.name,
      icon: <Folder />,
      iconOpen: <FolderOpen />,
      info: false,
      selectable: false,
      selected: false,
      has_children: true,
      children: []
    });
  }
  for (const item of dataTree) {
    if (!item.SubjectMattersStub['@set'] || item.SubjectMattersStub['@set'].length === 0) {
      treeList.push(item);
      continue;
    }
    for (const sm of item.SubjectMattersStub['@set']) {
      for (const subject of treeList) {
        if ('sm-' + sm.sm_id === subject.id) {
          item.id = item.authority_document_fk;
          subject.children.push(item);
        }
      }
    }
  }

  return treeList;
}

export default documentList;

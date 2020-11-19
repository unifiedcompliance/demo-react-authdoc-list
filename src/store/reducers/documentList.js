import * as actionTypes from '../actionTypes';
import _ from 'lodash';
import { HIERARCHY_GEOGRAPHY, HIERARCHY_SUBJECT_MATTER } from '../constant';

const initialState = {
  documents:[],
  geographyTreeList: [],
  selectedDocuments: [],
  expandedTreeNodes: ["0"],
  filteredTreeNodes: ["0"],
  filteredDocuments: [],
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
      const { treeList, selectedList } = structureTreeList({
        subjectData: [], 
        adData: payload,
        selectedItems: state.selectedDocuments,
        hierarchy: HIERARCHY_GEOGRAPHY
      });
      const documents = [...payload];
      const expandedTreeNodes = getExpandedNodes({
        adData: payload,
        hierarchy: HIERARCHY_GEOGRAPHY,
        filteredDocuments: state.isFiltering ? state.filteredDocuments : selectedList
      });
      const filteredTreeNodes = [...expandedTreeNodes];
      return {
        ...state,
        documents,
        geographyTreeList: treeList,
        selectedDocuments: selectedList,
        expandedTreeNodes,
        filteredTreeNodes,
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
      const { treeList, selectedList } = structureTreeList({
        subjectData: subjectMatters,
        adData: adSubjectMatters, 
        selectedItems: state.selectedDocuments,
        hierarchy: HIERARCHY_SUBJECT_MATTER
      });
      const expandedTreeNodes = getExpandedNodes({
        adData: adSubjectMatters,
        hierarchy: HIERARCHY_SUBJECT_MATTER,
        filteredDocuments: state.isFiltering ? state.filteredDocuments : selectedList
      });
      const filteredTreeNodes = [...expandedTreeNodes];
      return {
        ...state,
        documents,
        subjectMatters,
        geographyTreeList: treeList,
        selectedDocuments: selectedList,
        expandedTreeNodes,
        filteredTreeNodes,
        isLoadingStatus: false
      }
    }
    case actionTypes.SET_ADD_DOCUMENT_TO_SELECTED: {
      const { selectedDocuments } = state;
      const idx = selectedDocuments.indexOf(payload);
      payload.selected = true;
      if (idx > -1) {
        selectedDocuments.splice(idx, 1);
      }
      selectedDocuments.push(payload);

      return {
        ...state,
        selectedDocuments
      }
    }

    case actionTypes.SET_REMOVE_DOCUMENT_FROM_SELECTED: {
      const { selectedDocuments } = state;
      const idx = selectedDocuments.indexOf(payload);
      selectedDocuments.splice(idx, 1);
      payload.selected = false;

      return {
        ...state,
        selectedDocuments
      }
    }

    case actionTypes.SET_EXPANDED_NODES_TOGGLE: {
      const { nodes } = payload;
      return {
        ...state,
        expandedTreeNodes: nodes
      }
    }

    case actionTypes.FILTER_DOCUMENTS: {
      const { searchKey, hierarchy } = payload;
      const filteredDocuments = searchKey === ''
        ? [...state.selectedDocuments]
        : _.filter(state.documents, function(o) { return o.authority_document_name.includes(searchKey) });

      const expandedTreeNodes = getExpandedNodes({
        adData: state.documents,
        hierarchy,
        filteredDocuments
      });
      
      const filteredTreeNodes = [...expandedTreeNodes];
      return {
        ...state,
        isFiltering: searchKey === '' ? false : true,
        expandedTreeNodes,
        filteredTreeNodes,
        filteredDocuments
      }
    }
    default: return state;
  }
}

const structureTreeList = ({ subjectData, adData, selectedItems, hierarchy }) => {
  const dataTree = [];
  const treeList = [];
  const selectedList = [];
  for (const item of adData) {
    const selected = isSelected(item, selectedItems);
    const treeItem = {
      id: item.authority_document_fk,
      name: item.authority_document_name,
      selected,
      ...item
    };
    dataTree.push(treeItem);
    if (selected) {
      selectedList.push(treeItem);
    }
  }

  switch (hierarchy) {
    case HIERARCHY_GEOGRAPHY:
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
            item.id = item.parent_id + '-' + item.authority_document_fk;
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
      break;
    case HIERARCHY_SUBJECT_MATTER:
      for (const item of subjectData) {
        treeList.push({
          ...item,
          has_children: true,
          children: []
        });
      }
      for (const item of dataTree) {
        if (
          !item.SubjectMattersStub['@set'] ||
          item.SubjectMattersStub['@set'].length === 0
        ) {
          treeList.push(item);
          continue;
        }
        for (const sm of item.SubjectMattersStub['@set']) {
          for (const subject of treeList) {
            if (sm.sm_id === subject.id) {
              item.id = sm.sm_id + '-' + item.authority_document_fk;
              subject.children.push(item);
            }
          }
        }
      }
      break;
    default:
      break;
  }

  return { treeList, selectedList };
}

function isSelected(item, selectedItems) {
  for (const sel of selectedItems) {
    if (sel.authority_document_fk === item.authority_document_fk) {
      return true;
    }
  }
  return false;
}

function getExpandedNodes({ adData, hierarchy, filteredDocuments }) {
  const expanded = [];
  const expandedNodes = [];
  
  switch (hierarchy) {
    case HIERARCHY_GEOGRAPHY:
      for (const leaf of filteredDocuments) {
        const leafID = leaf.authority_document_fk;
        const geoItem = _.find(adData, function (o) {
          return o.authority_document_fk === leafID;
        });
        let { parent_id } = geoItem;
        expanded.push(leafID);
        const parentNodeId =
          parent_id !== null
            ? parent_id + '-' + leafID
            : leafID.toString();
        expandedNodes.push(parentNodeId);

        const temp = true;
        while (temp) {
          if (parent_id === null) break;
          if (expanded.includes(parent_id)) break;
          
          const parent = _.find(adData, function (o) {
            return o.authority_document_fk === parent_id;
          });
          if (parent) {
            expanded.push(parent_id);
            parent_id = parent.parent_id;
            const parentNodeId =
              parent_id !== null
                ? parent_id + '-' + parent.authority_document_fk
                : parent.authority_document_fk.toString();
            expandedNodes.push(parentNodeId); //id means tree node id
          } else {
            break;
          }
        }
      }
      return expandedNodes;
    case HIERARCHY_SUBJECT_MATTER:
      for (const leaf of filteredDocuments) {
        const smItem = _.find(adData, function (o) {
          return o.authority_document_fk === leaf.authority_document_fk;
        });
        expanded.push(leaf.authority_document_fk.toString());

        if (
          !smItem ||
          !smItem.SubjectMattersStub['@set'] ||
          smItem.SubjectMattersStub['@set'].length === 0
        ) {
          expandedNodes.push(leaf.authority_document_fk.toString());
          continue;
        }
        for (const node of smItem.SubjectMattersStub['@set']) {
          const { sm_id } = node;
          expanded.push(sm_id);
          expandedNodes.push(sm_id.toString());
          expandedNodes.push(sm_id + '-' + leaf.authority_document_fk)
        }
      }
      return expandedNodes;
    default:
      return expandedNodes;
  }
}

export default documentList;

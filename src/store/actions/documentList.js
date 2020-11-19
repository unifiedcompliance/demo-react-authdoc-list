import * as actionTypes from '../actionTypes';

export const fetchGeographyHierarchyStart = (payload) => {
  return {
    type: actionTypes.FETCH_GEOGRAPHY_HIERARCHY_START,
    payload
  }
};

export const fetchGeographyHierarchyFinished = (payload) => {
  return {
    type: actionTypes.FETCH_GEOGRAPHY_HIERARCHY_FINISHED,
    payload
  }
};

export const fetchSMHierarchyStart = (payload) => ({
  type: actionTypes.FETCH_SM_HIERARCHY_START,
  payload
});

export const fetchSMHierarchyFinished = (payload) => ({
  type: actionTypes.FETCH_SM_HIERARCHY_FINISHED,
  payload
});

export const addDocumentToSelected = (payload) => ({
  type: actionTypes.SET_ADD_DOCUMENT_TO_SELECTED,
  payload
});

export const removeDocumentFromSelected = (payload) => ({
  type: actionTypes.SET_REMOVE_DOCUMENT_FROM_SELECTED,
  payload
});

export const filterDocuments = (payload) => ({
  type: actionTypes.FILTER_DOCUMENTS,
  payload
});

export const setExpandedNodesToggle = (payload) => ({
  type: actionTypes.SET_EXPANDED_NODES_TOGGLE,
  payload
})

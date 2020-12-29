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

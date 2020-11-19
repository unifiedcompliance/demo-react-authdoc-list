import * as actionTypes from '../actionTypes';

export const fetchAuthorityDocumentStart = (payload) => {
  return {
    type: actionTypes.FETCH_AUTHORITY_DOCUMENT_START,
    payload
  }
}

export const fetchAuthorityDocumentFinished = (payload) => {
  return {
    type: actionTypes.FETCH_AUTHORITY_DOCUMENT_FINISHED,
    payload
  }
}

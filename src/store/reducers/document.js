import * as actionTypes from '../actionTypes';

const initialState = {
  authorityDocument: {}
}

const document = (state = initialState, action={}) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.FETCH_AUTHORITY_DOCUMENT_START: {
      return { ...state }
    }
    case actionTypes.FETCH_AUTHORITY_DOCUMENT_FINISHED: {
      return {
        ...state,
        authorityDocument: payload
      }
    }
    default: return state;
  }
}

export default document;

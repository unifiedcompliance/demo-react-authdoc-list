import { takeLatest, put } from 'redux-saga/effects'
import * as actionTypes from '../actionTypes'
import axiosInst from '../../plugins/axios-inst';

import {
  fetchAuthorityDocumentFinished
} from '../actions/document'


function* getAuthorityDocumentFinished(action) {
  const { payload: { cardDocId } } = action;
  try {
    const res = yield axiosInst.get(`/AuthorityDocument/${cardDocId}`);
    const { data } = res ;
    yield put(fetchAuthorityDocumentFinished(data));

  } catch (error) {
    console.log('[Error]', error);
  }
}

export default function* watchDocumentList() {
  yield takeLatest(actionTypes.FETCH_AUTHORITY_DOCUMENT_START, getAuthorityDocumentFinished);
}
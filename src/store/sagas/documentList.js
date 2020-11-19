import { takeLatest, put } from 'redux-saga/effects'
import * as actionTypes from '../actionTypes'
import axiosInst from '../../plugins/axios-inst';

import {
  fetchGeographyHierarchyFinished,
  fetchSMHierarchyFinished
} from '../actions/documentList'


function* getGeographyHierarchy(action) {
  try {
    const resp = yield axiosInst.get("/ADHierarchy")
    const { data } = resp ;
    yield put(fetchGeographyHierarchyFinished(data));

  } catch (error) {
    console.log('[Error]', error);
  }
}

function* getSMHierarchy(action) {
  try {
    const subjectMattersRes = yield axiosInst.get("/SubjectMatters");
    const adSubjectMattersRes = yield axiosInst.get('/ADSubjectMatters');

    const subjectMatters = subjectMattersRes.data;
    const adSubjectMatters = adSubjectMattersRes.data;
    yield put(fetchSMHierarchyFinished({subjectMatters, adSubjectMatters}));

  } catch (error) {
    console.log('[Error]', error)
  }
}

export default function* watchDocumentList() {
  yield takeLatest(actionTypes.FETCH_GEOGRAPHY_HIERARCHY_START, getGeographyHierarchy);
  yield takeLatest(actionTypes.FETCH_SM_HIERARCHY_START, getSMHierarchy)
}
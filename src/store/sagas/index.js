import { all } from 'redux-saga/effects';

import documentList from './documentList';
import document from './document';

function* rootSaga() {
  yield all([
    ...documentList(),
    ...document()
  ]);
}

export default rootSaga;

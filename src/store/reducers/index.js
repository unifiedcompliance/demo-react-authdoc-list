import { combineReducers } from 'redux';

import documentList from './documentList';
import document from './document';

export default combineReducers({
  documentList,
  document
});

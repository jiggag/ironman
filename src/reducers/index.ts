import { combineReducers } from '@reduxjs/toolkit';
import note from './note';
import voc from './voc';

export default combineReducers({
  note,
  voc,
});

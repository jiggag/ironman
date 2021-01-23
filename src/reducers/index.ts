import { combineReducers } from '@reduxjs/toolkit';
import note from './note';
import user from './user';
import voc from './voc';

export default combineReducers({
  note,
  voc,
  user,
});

import { combineReducers } from '@reduxjs/toolkit';
import note from './note';
import voc from './voc';
import user from './user';

export default combineReducers({
  note,
  voc,
  user,
});

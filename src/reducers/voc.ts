import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import { VocReducer } from '../types';

const vocSlice = createSlice<VocReducer, SliceCaseReducers<VocReducer>, 'voc'>({
  name: 'voc',
  initialState: {
    isLoading: false,
    list: [],
  },
  reducers: {
    sendVocRequest: (state, action) => {
      state.isLoading = true;
    },
    sendVocFailure: (state) => {
      state.isLoading = false;
    },
    sendVocSuccess: (state) => {
      state.isLoading = false;
    },
    getVocRequest: (state) => {
      state.isLoading = true;
    },
    getVocFailure: (state) => {
      state.isLoading = false;
    },
    getVocSuccess: (state, action) => {
      state.isLoading = false;
      state.list = action.payload;
    },
  },
});

export const {
  sendVocRequest,
  sendVocFailure,
  sendVocSuccess,
  getVocFailure,
  getVocRequest,
  getVocSuccess,
} = vocSlice.actions;

export default vocSlice.reducer;

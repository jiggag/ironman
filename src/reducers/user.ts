import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import { UserReducer } from '../types';

const userSlice = createSlice<UserReducer, SliceCaseReducers<UserReducer>, 'user'>({
  name: 'user',
  initialState: {
    isLoading: false,
    auth: '',
  },
  reducers: {
    getUserRequest: (state, action) => {
      state.auth = '';
      state.isLoading = true;
    },
    getUserFailure: (state) => {
      state.isLoading = false;
    },
    getUserSuccess: (state, action) => {
      state.auth = action.payload.auth;
      state.isLoading = false;
    },
    postUserRequest: (state, action) => {
      state.auth = '';
      state.isLoading = true;
    },
    postUserFailure: (state) => {
      state.isLoading = false;
    },
    postUserSuccess: (state, action) => {
      state.auth = action.payload.auth;
      state.isLoading = false;
    },
  },
});

export const {
  getUserRequest,
  getUserFailure,
  getUserSuccess,
  postUserRequest,
  postUserFailure,
  postUserSuccess,
} = userSlice.actions;

export default userSlice.reducer;

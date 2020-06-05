import { createSlice } from '@reduxjs/toolkit';

const vocSlice = createSlice({
  name: 'voc',
  initialState: {
    isLoading: false,
  },
  reducers: {
    sendVocRequest: () => {
    },
    sendVocFailure: () => {
    },
    sendVocSuccess: () => {
    },
  },
});

export const {
  sendVocRequest,
  sendVocFailure,
  sendVocSuccess,
} = vocSlice.actions;

export default vocSlice.reducer;

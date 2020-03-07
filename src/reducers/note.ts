import { createSlice } from '@reduxjs/toolkit';

const noteSlice = createSlice({
  name: 'note',
  initialState: {
    isLoading: false,
    list: [],
    graph: [],
    note: {},
  },
  reducers: {
    getListRequest: (state, action) => {
      state.isLoading = true;
    },
    getListSuccess: (state, action) => {
      const { list, graph } = action.payload;
      state.list = list;
      state.graph = graph;
      state.isLoading = false;
    },
    getListFailure: state => {
      state.isLoading = false;
    },
    getNoteRequest: (state, action) => {
      state.isLoading = true;
    },
    getNoteSuccess: (state, action) => {
      state.note = action.payload;
      state.isLoading = false;
    },
    getNoteFailure: state => {
      state.isLoading = false;
    },
    createNoteRequest: (state, action) => {
      state.isLoading = true;
    },
    createNoteSuccess: (state, action) => {
      state.list.push(action.payload);
      state.isLoading = false;
    },
    createNoteFailure: state => {
      state.isLoading = false;
    },
    updateNoteRequest: (state, action) => {
      state.isLoading = true;
    },
    updateNoteSuccess: (state, action) => {
      const { id: noteId, title, date, image, state: faceState, weather, food, done, etc } = action.payload;
      const updateNote = state.list.find(({ id }) => id === noteId);
      updateNote.title = title;
      updateNote.date = date;
      updateNote.image = image;
      updateNote.state = faceState;
      updateNote.weather = weather;
      updateNote.food = food;
      updateNote.done = done;
      updateNote.etc = etc;
      state.isLoading = false;
    },
    updateNoteFailure: state => {
      state.isLoading = false;
    },
    deleteNoteRequest: (state, action) => {
      state.isLoading = true;
    },
    deleteNoteSuccess: (state, action) => {
      const noteId = action.payload;
      state.list.filter(({ id }) => id !== noteId);
      state.isLoading = false;
    },
    deleteNoteFailure: state => {
      state.isLoading = false;
    },
  },
});

export const {
  getListRequest,
  getListSuccess,
  getListFailure,
  getNoteRequest,
  getNoteSuccess,
  getNoteFailure,
  createNoteRequest,
  createNoteSuccess,
  createNoteFailure,
  updateNoteRequest,
  updateNoteSuccess,
  updateNoteFailure,
  deleteNoteRequest,
  deleteNoteSuccess,
  deleteNoteFailure,
} = noteSlice.actions;

export default noteSlice.reducer;

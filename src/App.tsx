import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';
import { Intro, ListNote, CreateNote, DetailNote } from './pages';

const App = () => (
  <Router>
    <Stack key="root" hideNavBar>
      <Scene key="intro" component={Intro} type="reset" initial />
      <Scene key="listNote" component={ListNote} type="push" />
      <Scene key="createNote" component={CreateNote} type="push" />
      <Scene key="detailNote" component={DetailNote} type="push" />
    </Stack>
  </Router>
);

export default App;

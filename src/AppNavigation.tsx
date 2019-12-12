import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { Intro, ListNote, CreateNote, DetailNote, UpdateNote } from './pages';

const AppNavigator = createStackNavigator({
  Intro,
  ListNote,
  CreateNote,
  DetailNote,
  UpdateNote,
},
{
  initialRouteName: 'Intro',
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />
  }
};

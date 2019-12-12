import React from 'react';
import { Provider } from 'react-redux';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import store from './store';
import { Intro, ListNote, CreateNote, DetailNote, UpdateNote } from './pages';

const createStack = screen => {
  return {
    screen,
    navigationOptions: {
      header: null,
    },
  }
};

const AppNavigator = createStackNavigator({
  Intro: createStack(Intro),
  ListNote: createStack(ListNote),
  CreateNote: createStack(CreateNote),
  DetailNote: createStack(DetailNote),
  UpdateNote: createStack(UpdateNote),
},
{
  initialRouteName: 'Intro',
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
};

import React from 'react';
import { Provider } from 'react-redux';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import store from './store';
import {
  Intro, ListNote, CreateNote, DetailNote, UpdateNote,
} from './pages';

// TODO: 리액트 네비게이션 v5 업데이트
//
// 리액트 네비게이션 버전 업데이트 진행
//
// - react-navigation -> @react-navigation/native
// - react-navigation-stack -> @react-navigation/stack
//
// https://reactnavigation.org/docs/upgrading-from-4.x
// https://reactnavigation.org/docs/getting-started

const createStack = screen => {
  return {
    screen,
    navigationOptions: {
      header: null,
    },
  };
};

const AppNavigator = createStackNavigator(
  {
    Intro: createStack(Intro),
    ListNote: createStack(ListNote),
    CreateNote: createStack(CreateNote),
    DetailNote: createStack(DetailNote),
    UpdateNote: createStack(UpdateNote),
  },
  {
    initialRouteName: 'Intro',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

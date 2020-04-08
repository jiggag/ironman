import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Config from 'react-native-config';
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

if (Config.IS_DEBUG) {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  const ReactRedux = require('react-redux');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    trackExtraHooks: [
      [ReactRedux, 'useSelector']
    ]
  });
}

const Stack = createStackNavigator();

export default class App extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator headerMode="none" initialRouteName="Intro">
            <Stack.Screen name="Intro" component={Intro} />
            <Stack.Screen name="ListNote" component={ListNote} />
            <Stack.Screen name="CreateNote" component={CreateNote} />
            <Stack.Screen name="DetailNote" component={DetailNote} />
            <Stack.Screen name="UpdateNote" component={UpdateNote} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

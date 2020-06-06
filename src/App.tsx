import React from 'react';
import { Platform } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import messaging from '@react-native-firebase/messaging';
import admob, { MaxAdContentRating, BannerAdSize, BannerAd } from '@react-native-firebase/admob';
import Config from 'react-native-config';
import store from './store';
import {
  Intro, ListNote, CreateNote, DetailNote, UpdateNote, SendVoc, ListVoc
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

if (__DEV__) {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  const ReactRedux = require('react-redux');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    trackExtraHooks: [
      [ReactRedux, 'useSelector'],
    ],
  });
}

const Stack = createStackNavigator();

export default class App extends React.PureComponent {
  state = {
    isShowBanner: false,
  };

  async componentDidMount() {
    await messaging().requestPermission();

    messaging().onMessage(async remoteMessage => {
      const { notification: { body, title }} = remoteMessage;
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    
    // Register background handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });


    admob()
      .setRequestConfiguration({
        maxAdContentRating: MaxAdContentRating.G,
        tagForChildDirectedTreatment: false,
        tagForUnderAgeOfConsent: false,
      })
      .then(() => {
        this.setState({
          isShowBanner: true,
        });
      })
      .catch(() => {});
  }
  
  render() {
    const { isShowBanner } = this.state;

    return (
      <>
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator headerMode="none" initialRouteName="Intro">
              <Stack.Screen name="Intro" component={Intro} />
              <Stack.Screen name="ListNote" component={ListNote} />
              <Stack.Screen name="CreateNote" component={CreateNote} />
              <Stack.Screen name="DetailNote" component={DetailNote} />
              <Stack.Screen name="UpdateNote" component={UpdateNote} />
              <Stack.Screen name="SendVoc" component={SendVoc} />
              <Stack.Screen name="ListVoc" component={ListVoc} />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      {isShowBanner && (
        <BannerAd
          unitId={Platform.OS === 'ios' ? Config.ADMOB_UNIT_ID_IOS : Config.ADMOB_UNIT_ID_AOS}
          size={BannerAdSize.FULL_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      )}
      </>
    );
  }
}

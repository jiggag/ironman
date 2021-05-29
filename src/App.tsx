import React from 'react';
import { Platform } from 'react-native';
import admob, { MaxAdContentRating, BannerAdSize, BannerAd } from '@react-native-firebase/admob';
import messaging from '@react-native-firebase/messaging';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Config from 'react-native-config';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {
  Intro, ListNote, CreateNote, DetailNote, UpdateNote, SendVoc, ListVoc,
} from './pages';
import { store, persistor } from './store';

// TODO: 리액트 네비게이션 v5 업데이트
//
// 리액트 네비게이션 버전 업데이트 진행
//
// - react-navigation -> @react-navigation/native
// - react-navigation-stack -> @react-navigation/stack
//
// https://reactnavigation.org/docs/upgrading-from-4.x
// https://reactnavigation.org/docs/getting-started

if (__DEV__ && false) {
  // eslint-disable-next-line import/no-extraneous-dependencies
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  const ReactRedux = require('react-redux');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    trackExtraHooks: [[ReactRedux, 'useSelector']],
  });
}

const Stack = createStackNavigator();

interface State {
  isShowBanner: boolean;
}
export default class App extends React.PureComponent<undefined, State> {
  constructor(props) {
    super(props);
    this.state = {
      isShowBanner: false,
    };
  }

  async componentDidMount() {
    await messaging().requestPermission();

    // 포그라운드 상태에서 푸시 받았을때
    messaging().onMessage(async (remoteMessage) => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    // 백그라운드 상테에서 푸시 받았을때
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('Message handled in the background!', remoteMessage);
    });

    // 앱 종로 상태에서 푸시 눌렀을떄
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log('Notification caused app to open from quit state:', remoteMessage);
        }
        return remoteMessage;
      })
      .catch((err) => {
        console.log('Error', err);
      });

    admob()
      .setRequestConfiguration({
        maxAdContentRating: MaxAdContentRating.G,
        tagForChildDirectedTreatment: false,
        tagForUnderAgeOfConsent: false,
      })
      .then((res) => {
        return res;
      })
      .catch((e) => {
        console.log('>>> admob request error', e);
      });
  }

  onAdClosed = () => {
    console.log('>>> onAdClosed');
  };

  onAdFailedToLoad = () => {
    console.log('>>> onAdFailedToLoad');
  };

  onAdLeftApplication = () => {
    console.log('>>> onAdLeftApplication');
  };

  onAdLoaded = () => {
    console.log('>>> onAdLoaded');
  };

  onAdOpened = () => {
    console.log('>>> onAdOpened');
  };

  setShowBanner = (isShowBanner: boolean) => {
    this.setState({
      isShowBanner,
    });
  };

  render() {
    const { isShowBanner } = this.state;

    return (
      <>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <NavigationContainer>
              <Stack.Navigator headerMode="none" initialRouteName="Intro">
                <Stack.Screen name="Intro">
                  {(props) => <Intro setShowBanner={this.setShowBanner} {...props} />}
                </Stack.Screen>
                <Stack.Screen name="ListNote">
                  {(props) => <ListNote setShowBanner={this.setShowBanner} {...props} />}
                </Stack.Screen>
                <Stack.Screen name="CreateNote" component={CreateNote} />
                <Stack.Screen name="DetailNote" component={DetailNote} />
                <Stack.Screen name="UpdateNote" component={UpdateNote} />
                <Stack.Screen name="SendVoc" component={SendVoc} />
                <Stack.Screen name="ListVoc" component={ListVoc} />
              </Stack.Navigator>
            </NavigationContainer>
          </PersistGate>
        </Provider>
        {isShowBanner && (
          <BannerAd
            unitId={Platform.OS === 'ios' ? Config.ADMOB_UNIT_ID_IOS : Config.ADMOB_UNIT_ID_AOS}
            size={BannerAdSize.SMART_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
            onAdClosed={this.onAdClosed}
            onAdFailedToLoad={this.onAdFailedToLoad}
            onAdLeftApplication={this.onAdLeftApplication}
            onAdLoaded={this.onAdLoaded}
            onAdOpened={this.onAdOpened}
          />
        )}
      </>
    );
  }
}

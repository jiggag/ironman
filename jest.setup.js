global.beforeAll(() => {

});

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));
jest.mock('@react-navigation/stack', () => ({
  createStackNavigator: jest.fn(),
}));
jest.mock('@react-native-firebase/messaging', () => {

});
jest.mock('@react-native-firebase/admob', () => {

});
jest.mock('@sentry/react-native', () => {

});
jest.mock('@react-native-seoul/kakao-login', () => {

});
jest.mock('react-native-simple-toast', () => {

});

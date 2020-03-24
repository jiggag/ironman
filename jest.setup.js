jest.mock('NativeModules', () => ({
  StatusBarManager: {
    getHeight: jest.fn(),
  },
  RNGestureHandlerModule: {
    attachGestureHandler: jest.fn(),
    createGestureHandler: jest.fn(),
    dropGestureHandler: jest.fn(),
    updateGestureHandler: jest.fn(),
    State: {},
    Directions: {},
  },
  UIManager: {
    RCTView: () => ({
      directEventTypes: {},
    }),
  },
  KeyboardObserver: {},
  PlatformConstants: {
    forceTouchAvailable: false,
  },
}));

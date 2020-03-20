const testCreateStack = screen => {
  return {
    screen,
    navigationOptions: {
      header: null,
    },
  }
};

it('Create Navigation Stack Object', () => {
  expect(testCreateStack('Intro')).toMatchObject({
    screen: 'Intro',
    navigationOptions: {
      header: null,
    },
  });
});
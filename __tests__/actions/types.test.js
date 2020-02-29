
const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

const createRequestType = req => {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${req}_${type}`;
    return acc;
  }, {});
};

it('Create Action Request Type', () => {
  expect(createRequestType('ACTION')).toMatchObject({
    REQUEST: 'ACTION_REQUEST',
    SUCCESS: 'ACTION_SUCCESS',
    FAILURE: 'ACTION_FAILURE',
  });
});

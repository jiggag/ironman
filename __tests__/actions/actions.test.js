
const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

const createRequestType = req => {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${req}_${type}`;
    return acc;
  }, {});
};

const action = (type, payload = {}) => {
  return { type, payload };
};

const createActionFunc = type => payload => {
  return action(type, payload);
}

const createAction = type => {
  return {
    REQUEST: type[REQUEST],
    SUCCESS: type[SUCCESS],
    FAILURE: type[FAILURE],
  };
};

it('Create Request Type', () => {
  expect(createRequestType('GET_LIST')).toMatchObject({
    REQUEST: 'GET_LIST_REQUEST',
    SUCCESS: 'GET_LIST_SUCCESS',
    FAILURE: 'GET_LIST_FAILURE',
  });
});

it('Create Action', () => {
  expect(createAction(createRequestType('GET_LIST'))).toMatchObject({
    REQUEST: 'GET_LIST_REQUEST',
    SUCCESS: 'GET_LIST_SUCCESS',
    FAILURE: 'GET_LIST_FAILURE',
  });
  
  expect(createActionFunc('GET_LIST_REQUEST')(null)).toMatchObject({
    type: 'GET_LIST_REQUEST',
    payload: null,
  });
})
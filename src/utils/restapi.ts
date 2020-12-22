import Sentry from '@sentry/react-native';
import axios, { Method } from 'axios';
import Q from 'q';
import Config from 'react-native-config';
import { getAccessToken } from './auth';

export const RETURN_CODE = Object.freeze({
  SUCCESS: 200,
  NETWORK_ERROR: 500,
});

export const METHOD = Object.freeze({
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
});
const createInstance = async () => {
  const token = await getAccessToken();
  const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    Accept: 'application/json;charset=UTF-8',
    token,
  };
  if (!token) {
    delete headers.token;
  }
  try {
    const instance = axios.create({
      baseURL: Config.API_URL,
      headers,
    });
    return instance;
  } catch (e) {
    Sentry.captureException(e);
    throw Error(e);
  }
};
export default (method: Method, url: string, params?: unknown) => {
  try {
    const deferred = Q.defer();
    createInstance()
      .then(instance => {
        const config = {
          method,
          url,
        };
        switch (method) {
          case METHOD.GET:
            return instance({
              ...config,
              params,
            });
          case METHOD.PUT:
          case METHOD.POST:
            return instance({
              ...config,
              data: params,
            });
          default:
            throw Error('Headrs Method is invalid!');
        }
      })
      .then(({ data }) => {
        return deferred.resolve(data);
      })
      .catch(err => {
        deferred.reject(err);
      });
    return deferred.promise;
  } catch (error) {
    Sentry.captureException(error);
    console.error(error);
    throw Error(error);
  }
};

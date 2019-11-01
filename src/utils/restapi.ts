import axios, { Method } from 'axios';
import Q from 'q';
import Config from 'react-native-config';

export const METHOD = Object.freeze({
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
});
const createInstance = async () => {
  try {
    const instance = axios.create({
      baseURL: Config.API_URL,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Accept: 'application/json;charset=UTF-8',
      }
    });
    return instance;
  } catch (e) {
    throw Error(e);
  }
};
export default (method: Method, url: string, params?: object) => {
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
      // console.log('suc', data);
      // data: { return_code, return_message, return_data }
        deferred.resolve(data);
      })
      .catch(err => {
      // console.error('err', err);
        deferred.reject(err);
      });
    return deferred.promise;
  } catch (error) {
    console.error(error);
    throw Error(error);
  }
};
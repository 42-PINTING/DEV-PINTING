import axios, { AxiosError } from 'axios';
import { cookies } from 'next/headers.js';

const baseURL = `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}`;

const instance = axios.create({ baseURL });

instance.interceptors.request.use(
  function setConfig(config) {
    const pintingAccessToken = cookies().get('pintingAccessToken')?.value;

    if (config.headers) {
      config.headers['Content-Type'] = 'application/json';
      config.headers['Authorization'] = `${pintingAccessToken}`;
    }
    config.withCredentials = true;

    return config;
  },
  function getError(error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function getResponse(response) {
    return response;
  },
  function getError(error) {
    return Promise.reject(error);
  }
);

function isAxiosError<ErrorPayload>(
  error: unknown
): error is AxiosError<ErrorPayload> {
  return axios.isAxiosError(error);
}

export { instance, isAxiosError };

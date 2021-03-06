import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { apiUrl, tenant, userToken } from '../config';

const anonApiConfig: AxiosRequestConfig = {
  baseURL: apiUrl,
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${userToken}`,
  },
};

const apiConfig: AxiosRequestConfig = {
  baseURL: apiUrl,
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${userToken}`,
    'X-Tenant': tenant,
    'Content-Type': 'application/json',
  },
};

const responseInterceptor = (response: AxiosResponse) => {
  return response.data;
};

const errorInterceptor = (error: any) => {
  const {
    response: { statusText },
  } = error;

  throw new Error(statusText);
};

export const api = axios.create(apiConfig);
api.interceptors.response.use(responseInterceptor, errorInterceptor);

export const anonymousApi = axios.create(anonApiConfig);
anonymousApi.interceptors.response.use(responseInterceptor, errorInterceptor);

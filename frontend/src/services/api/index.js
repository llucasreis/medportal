import axios from 'axios';
// eslint-disable-next-line import/no-cycle
import { getToken } from '../../store/context/auth';
import apiRoutes from './apiRoutes';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND,
});

api.interceptors.request.use(async config => {
  const {
    url: { route, auth },
  } = config;

  console.log(route, auth);

  config.url = route;

  if (auth === 'BEARER') {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  console.log(config);

  return config;
});

export { api, apiRoutes };

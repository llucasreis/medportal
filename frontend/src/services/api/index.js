import axios from 'axios';
import apiRoutes from './apiRoutes';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND,
});

export { api, apiRoutes };

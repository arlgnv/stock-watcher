import axios from 'axios';

import { convertSecondsToMilliseconds } from '@/utilities';

import { API_URL } from './constants';

const api = axios.create({
  baseURL: API_URL,
  timeout: convertSecondsToMilliseconds(5),
});

export default api;

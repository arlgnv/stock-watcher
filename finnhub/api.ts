import axios from 'axios';

import { FINNHUB_API_URL } from '@/constants';
import environment from '@/environment';
import { convertSecondsToMilliseconds } from '@/utilities';

const api = axios.create({
  baseURL: FINNHUB_API_URL,
  timeout: convertSecondsToMilliseconds(5),
  headers: {
    'X-Finnhub-Token': environment.FINNHUB_API_KEY,
  },
});

export default api;

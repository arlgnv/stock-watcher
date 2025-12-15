import axios from 'axios';

import environment from '@/environment';
import { convertSecondsToMilliseconds } from '@/utilities';

const api = axios.create({
  baseURL: 'https://finnhub.io/api/v1',
  timeout: convertSecondsToMilliseconds(5),
  headers: {
    'X-Finnhub-Token': environment.FINNHUB_API_KEY,
  },
});

export default api;

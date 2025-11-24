import axios from 'axios';

import { convertSecondsToMilliseconds } from '@/utilities';

if (!process.env.FINNHUB_API_KEY) {
  throw new Error('FINNHUB_API_KEY environment variable is not defined');
}

const api = axios.create({
  baseURL: 'https://finnhub.io/api/v1',
  timeout: convertSecondsToMilliseconds(5),
  headers: {
    'X-Finnhub-Token': process.env.FINNHUB_API_KEY,
  },
});

export default api;

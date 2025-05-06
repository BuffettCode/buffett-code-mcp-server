import createClient from 'openapi-fetch';
import { paths } from './api.js';

export const createBuffetteCodeClient = (baseUrl: string, apiKey: string) => {
  return createClient<paths>({
    baseUrl,
    headers: {
      'x-api-key': apiKey,
    },
  });
};

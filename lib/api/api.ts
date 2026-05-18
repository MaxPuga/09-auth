import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + '/api',
  withCredentials: true,
});

api.interceptors.request.use(config => {
  const token =
    typeof window !== 'undefined'
      ? document.cookie
          .split('; ')
          .find(row => row.startsWith('accessToken='))
          ?.split('=')[1]
      : null;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

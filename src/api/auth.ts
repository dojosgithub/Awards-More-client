import useSWR from 'swr';
import { useMemo } from 'react';
// utils
import axios, { fetcher, endpoints } from 'src/utils/axios';
// types

export async function forgotPasswordApi(data: any) {
  console.log('apidata', data); // { email: 'user@example.com' }
  const url = endpoints.auth.forgotPassword;
  const response = await axios.post(url, data); // sends JSON by default

  return response.data;
}

export async function setNewPasswordApi(data: any) {
  console.log('apidata', data);
  const url = endpoints.auth.new;
  const response = await axios.post(url, data);

  return response.data;
}

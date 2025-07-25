import axios, { endpoints } from 'src/utils/axios';

export async function createPromoCode(formData: {
  [k: string]: string | number | boolean | string[] | null;
}) {
  console.log('apidata', formData);
  const url = endpoints.promocode.add;
  const response = await axios.post(url);

  return response.data;
}

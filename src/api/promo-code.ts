import { useMemo } from 'react';
import useSWR from 'swr';
import axios, { endpoints, fetcher } from 'src/utils/axios';
import { IPromoCode, IPromoCodeTableFilters } from 'src/types/promo-codes';

function buildQueryParams(filters: IPromoCodeTableFilters) {
  const params = new URLSearchParams();

  if (filters.code) params.append('search', filters.code);
  if (filters.role && filters.role !== 'all') params.append('role', filters.role);
  if (filters.type) params.append('type', filters.type);
  if (filters.createdFor) params.append('createdFor', filters.createdFor);

  if (filters.page) params.append('page', filters.page.toString());
  if (filters.limit) params.append('limit', filters.limit.toString());

  return params.toString();
}

export function useGetPromoCodes(filters: IPromoCodeTableFilters) {
  const query = buildQueryParams(filters);
  const URL = `${endpoints.promocode.list}?${query}`;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      promocodes: (data?.docs as IPromoCode[]) || [],
      totalDocs: data?.totalDocs || 0,
      promocodesLoading: isLoading,
      promocodesError: error,
      promocodesValidating: isValidating,
      promocodesEmpty: !isLoading && !data?.docs.length,
      mutatePromocodes: mutate,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

export async function createPromoCode(formData: {
  [k: string]: string | number | boolean | string[] | null;
}) {
  console.log('apidata', formData);
  const url = endpoints.promocode.add;
  const response = await axios.post(url, formData);

  return response.data;
}

export function useGetPromoCodeProducts() {
  const URL = endpoints.promocode.promocodeproduct;
  const { data } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      promoCodeproducts: data,
    }),
    [data]
  );

  return memoizedValue;
}

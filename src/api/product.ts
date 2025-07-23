import useSWR from 'swr';
import { useMemo } from 'react';
// utils
import { fetcher, endpoints } from 'src/utils/axios';
// types
import { IProduct, IProductFilters, IProductItem, IProductTableFilters } from 'src/types/product';

// ----------------------------------------------------------------------

function buildQueryParams(filters: IProductTableFilters) {
  const params = new URLSearchParams();

  if (filters.name) params.append('search', filters.name);
  if (filters.role && filters.role !== 'all') params.append('role', filters.role);
  if (filters.startDate) params.append('startDate', filters.startDate.toISOString());
  if (filters.endDate) params.append('endDate', filters.endDate.toISOString());

  return params.toString();
}
export function useGetProducts(filters: IProductTableFilters) {
  const query = buildQueryParams(filters);
  const URL = `${endpoints.product.list}?${query}`;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      products: (data?.docs as IProduct[]) || [],
      totalDocs: data?.totalDocs || 0,
      productsLoading: isLoading,
      productsError: error,
      productsValidating: isValidating,
      productsEmpty: !isLoading && !data?.docs.length,
      mutateProducts: mutate,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}
// ----------------------------------------------------------------------

export function useGetProduct(productId: string) {
  const URL = productId ? [endpoints.product.details, { params: { productId } }] : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      product: data?.product as IProductItem,
      productLoading: isLoading,
      productError: error,
      productValidating: isValidating,
    }),
    [data?.product, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useSearchProducts(query: string) {
  const URL = query ? [endpoints.product.search, { params: { query } }] : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, {
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: (data?.results as IProductItem[]) || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !data?.results.length,
    }),
    [data?.results, error, isLoading, isValidating]
  );

  return memoizedValue;
}

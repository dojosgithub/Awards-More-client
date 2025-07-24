import useSWR from 'swr';
import { useMemo } from 'react';
// utils
import axios, { fetcher, endpoints } from 'src/utils/axios';
// types
import {
  IProduct,
  IProductFilters,
  IProductFormItems,
  IProductItem,
  IProductTableFilters,
} from 'src/types/product';

// ----------------------------------------------------------------------

function buildQueryParams(filters: IProductTableFilters) {
  const params = new URLSearchParams();

  if (filters.name) params.append('search', filters.name);
  if (filters.role && filters.role !== 'all') params.append('role', filters.role);
  if (filters.startDate) params.append('startDate', filters.startDate.toISOString());
  if (filters.endDate) params.append('endDate', filters.endDate.toISOString());
  if (filters.page) params.append('page', filters.page.toString());
  if (filters.limit) params.append('limit', filters.limit.toString());
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

export function useGetProduct(id: string) {
  const URL = id ? endpoints.product.details.replace(':id', id) : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      product: data?.data as IProductFormItems,
      productLoading: isLoading,
      productError: error,
      productValidating: isValidating,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// add Product
export async function createProduct(formData: FormData) {
  console.log('apidata', formData);
  const url = endpoints.product.add;
  const response = await axios.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
}
// update Product
export async function updateProduct(formData: FormData, categoryId: string) {
  console.log('apidata', formData);

  const url = endpoints.product.update.replace(':id', categoryId);

  const response = await axios.put(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
}

export function useGetProductCategories() {
  const URL = endpoints.product.productCategories;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      productCategories: data,
      productLoading: isLoading,
      productError: error,
      productValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// delete Product
export async function deleteProduct(productId: string) {
  const url = endpoints.product.delete.replace(':id', productId);

  const response = await axios.delete(url);

  return response.data;
}

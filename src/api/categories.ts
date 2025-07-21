import useSWR from 'swr';
import { useMemo } from 'react';
// utils
import axios, { fetcher, endpoints } from 'src/utils/axios';
// types
import { IPostItem } from 'src/types/blog';
import { ICategory, ICategoryItem, ICategoryTableFilters } from 'src/types/category';

// ----------------------------------------------------------------------
function buildQueryParams(filters: ICategoryTableFilters) {
  const params = new URLSearchParams();

  if (filters.name) params.append('search', filters.name);
  if (filters.role && filters.role !== 'all') params.append('role', filters.role);
  if (filters.startDate) params.append('startDate', filters.startDate.toISOString());
  if (filters.endDate) params.append('endDate', filters.endDate.toISOString());

  return params.toString();
}
export function useGetCategories(filters: ICategoryTableFilters) {
  const query = buildQueryParams(filters);
  const URL = `${endpoints.category.list}?${query}`;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      category: (data?.docs as ICategory[]) || [],
      totalDocs: data?.totalDocs || 0,
      categoryLoading: isLoading,
      categoryError: error,
      categoryValidating: isValidating,
      categoryEmpty: !isLoading && !data?.docs.length,
      mutateCategory: mutate,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------
// add category
export async function createCategory(formData: FormData) {
  console.log('apidata', formData);
  const url = endpoints.category.add;
  const response = await axios.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
}
// update category
export async function updateCategory(formData: FormData, categoryId: string) {
  console.log('apidata', formData);

  const url = endpoints.category.update.replace(':id', categoryId);

  const response = await axios.put(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
}

// single category
export function useGetCategory(id: string) {
  const URL = id ? endpoints.category.details.replace(':id', id) : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      category: data?.data as ICategoryItem,
      categoryLoading: isLoading,
      categoryError: error,
      categoryValidating: isValidating,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// delete category
export async function deleteCategory(categoryId: string) {
  const url = endpoints.category.delete.replace(':id', categoryId);

  const response = await axios.delete(url);

  return response.data;
}

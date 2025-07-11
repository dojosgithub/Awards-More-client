import useSWR from 'swr';
import { useMemo } from 'react';
// utils
import axios, { fetcher, endpoints } from 'src/utils/axios';
// types
import { IPostItem } from 'src/types/blog';
import { IEmployee, IEmployeeItem, IEmployeeTableFilters } from 'src/types/employees';

// ----------------------------------------------------------------------

function buildQueryParams(filters: IEmployeeTableFilters) {
  const params = new URLSearchParams();

  if (filters.name) params.append('search', filters.name);
  if (filters.role && filters.role !== 'all') params.append('role', filters.role);
  if (filters.startDate) params.append('startDate', filters.startDate.toISOString());
  if (filters.endDate) params.append('endDate', filters.endDate.toISOString());

  return params.toString();
}

export function useGetEmployees(filters: IEmployeeTableFilters) {
  const query = buildQueryParams(filters);
  const URL = `${endpoints.employee.list}?${query}`;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  return useMemo(
    () => ({
      employees: (data?.docs as IEmployee[]) || [],
      employeesLoading: isLoading,
      employeesError: error,
      employeesValidating: isValidating,
    }),
    [data?.docs, error, isLoading, isValidating]
  );
}

// add employee
export async function postFormData(url: string, formData: FormData) {
  console.log('apidata', formData);

  const response = await axios.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
}

// ----------------------------------------------------------------------

export function useGetEmployee(id: string) {
  const URL = id ? endpoints.employee.details.replace(':id', id) : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      employee: data?.data as IEmployeeItem,
      employeeLoading: isLoading,
      employeeError: error,
      employeeValidating: isValidating,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetLatestPosts(title: string) {
  const URL = title ? [endpoints.post.latest, { params: { title } }] : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      latestPosts: (data?.latestPosts as IPostItem[]) || [],
      latestPostsLoading: isLoading,
      latestPostsError: error,
      latestPostsValidating: isValidating,
      latestPostsEmpty: !isLoading && !data?.latestPosts.length,
    }),
    [data?.latestPosts, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useSearchPosts(query: string) {
  const URL = query ? [endpoints.post.search, { params: { query } }] : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, {
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: (data?.results as IPostItem[]) || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !data?.results.length,
    }),
    [data?.results, error, isLoading, isValidating]
  );

  return memoizedValue;
}

import useSWR from 'swr';
import { useMemo } from 'react';
// utils
import axios, { fetcher, endpoints } from 'src/utils/axios';
// types

import { ICustomer, ICustomerTableFilters } from 'src/types/customers';

// ----------------------------------------------------------------------

function buildQueryParams(filters: ICustomerTableFilters) {
  const params = new URLSearchParams();

  if (filters.name) params.append('search', filters.name);
  if (filters.role && filters.role !== 'all') params.append('role', filters.role);
  if (filters.startDate) params.append('startDate', filters.startDate.toISOString());
  if (filters.endDate) params.append('endDate', filters.endDate.toISOString());
  if (filters.page) params.append('page', filters.page.toString());
  if (filters.limit) params.append('limit', filters.limit.toString());
  return params.toString();
}

export function useGetCustomers(filters: ICustomerTableFilters) {
  const query = buildQueryParams(filters);
  const URL = `${endpoints.customer.list}?${query}`;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  return useMemo(
    () => ({
      customers: (data?.docs as ICustomer[]) || [],
      totalDocs: data?.totalDocs || 0,
      customersLoading: isLoading,
      customersError: error,
      customersValidating: isValidating,
      mutateCustomers: mutate,
    }),
    [data, isLoading, error, isValidating, mutate]
  );
}

export function useGetCustomer(id: string) {
  const URL = id ? endpoints.customer.details.replace(':id', id) : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      customer: data?.data as ICustomer,
      customerLoading: isLoading,
      customerError: error,
      customerValidating: isValidating,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
// add employee
export async function createEmployee(formData: FormData) {
  console.log('apidata', formData);
  const url = endpoints.employee.add;
  const response = await axios.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
}
// update employee
export async function updateEmployee(formData: FormData, employeeId: string) {
  console.log('apidata', formData);

  // Replace :id with actual employeeId in the URL
  const url = endpoints.employee.update.replace(':id', employeeId);

  const response = await axios.put(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
}
// delete employee
export async function deleteEmployee(employeeId: string) {
  // Replace :id with actual employeeId in the URL
  const url = endpoints.employee.delete.replace(':id', employeeId);

  const response = await axios.delete(url);

  return response.data;
}

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

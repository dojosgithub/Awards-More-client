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
  // 🔥 Add these lines
  if (filters.page) params.append('page', filters.page.toString());
  if (filters.limit) params.append('limit', filters.limit.toString());
  return params.toString();
}

export function useGetEmployees(filters: IEmployeeTableFilters) {
  const query = buildQueryParams(filters);
  const URL = `${endpoints.employee.list}?${query}`;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  return useMemo(
    () => ({
      employees: (data?.docs as IEmployee[]) || [],
      totalDocs: data?.totalDocs || 0,
      employeesLoading: isLoading,
      employeesError: error,
      employeesValidating: isValidating,
      mutateEmployees: mutate,
    }),
    [data, isLoading, error, isValidating, mutate]
  );
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

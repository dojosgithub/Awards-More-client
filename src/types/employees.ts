export type IEmployee = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  employeeId: string;
  imageUrl: string;
  role: string;
  createdAt: string; // or `Date` if you parse it into Date objects
  updatedAt: string; // or `Date`
};

export type IEmployeeTableFilters = {
  service: string;
  status: string;
  name: string;
  role: string;
  startDate: Date | null;
  endDate: Date | null;
  page?: number;
  limit?: number;
};
export type IEmployeeItem = {
  employeeId: string;
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  email: string;
  file: any;
  imageUrl?: string;
};

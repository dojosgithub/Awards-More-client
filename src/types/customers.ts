export type ICustomer = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  quickbooksId: string;
  password: string;
  account_Type: 'application_account' | string; // You can narrow this if only specific values are allowed
  orders: any[]; // You can define a more specific type for order if needed
  role: string;
  imageUrl?: string; // Optional since it's not in the example object
  createdAt: string;
  updatedAt: string;
};

export type ICustomerTableFilters = {
  service: string;
  status: string;
  name: string;
  role: string;
  startDate: Date | null;
  endDate: Date | null;
  page?: number;
  limit?: number;
};
export type ICustomerItem = {
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

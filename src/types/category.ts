import { IAddressItem } from './address';

// ----------------------------------------------------------------------

export type IInvoiceTableFilterValue = string | string[] | Date | null;

export type ICategoryTableFilters = {
  name: string;
  service: string[];
  status: string;
  startDate: Date | null;
  endDate: Date | null;
  role: string;
  search?: string;
  page?: number;
  limit?: number;
};

// ----------------------------------------------------------------------

export type IInvoiceItem = {
  id: string;
  title: string;
  price: number;
  total: number;
  service: string;
  quantity: number;
  description: string;
};

export type IInvoice = {
  id: string;
  sent: number;
  dueDate: Date;
  taxes: number;
  status: string;
  subTotal: number;
  createDate: Date;
  discount: number;
  shipping: number;
  totalAmount: number;
  invoiceNumber: string;
  items: IInvoiceItem[];
  invoiceTo: IAddressItem;
  invoiceFrom: IAddressItem;
};

export type ICategory = {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  status: 'Active' | 'Inactive';
  createdAt: string;
  updatedAt: string;
};

export type ICategoryItem = {
  title: string;
  description: string;
  _id: string;
  file: any;
  imageUrl?: string;
};

import { IAddressItem } from './address';

// ----------------------------------------------------------------------

export type IPromoCodeTableFilters = {
  _id: string;
  code: string;
  type: string;

  createdFor: string;
  discountAmount: number;
  role: string;
  search?: string;
  page?: number;
  limit?: number;
};

// ----------------------------------------------------------------------

export type IPromoCode = {
  _id: string;
  code: string;
  type: string;

  createdFor: string;
  discountAmount: number;
};

export type IPromoCodeItem = {
  code: string;
  createdFor: string;
  type: 'percentage' | 'fixed amount';
  discountAmount: number;
  isNewUser: boolean;
  isredemptionLimit: boolean;
  hasExpirationDate: boolean;

  isProductSpecific: boolean;
  products: string[] | null;
  redeemptionLimit: number | null;
  expiryDate: string | null; // ISO date string, e.g., '2025-12-31'
  expiryTime: string | null; // e.g., '23:59'
};

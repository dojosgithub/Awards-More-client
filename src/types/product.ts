// ----------------------------------------------------------------------

export type IProductFilterValue = string | string[] | number | number[];

export type IProductFilters = {
  rating: string;
  gender: string[];
  category: string;
  colors: string[];
  priceRange: number[];
};

// ----------------------------------------------------------------------

export type IProductReviewNewForm = {
  rating: number | null;
  review: string;
  name: string;
  email: string;
};

export type IProductReview = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  helpful: number;
  avatarUrl: string;
  isPurchased: boolean;
  attachments?: string[];
  postedAt: Date;
};

export type IProductItem = {
  id: string;
  sku: string;
  name: string;
  code: string;
  price: number;
  taxes: number;
  tags: string[];
  gender: string;
  sizes: string[];
  publish: string;
  coverUrl: string;
  images: string[];
  colors: string[];
  quantity: number;
  category: string;
  available: number;
  totalSold: number;
  description: string;
  totalRatings: number;
  totalReviews: number;
  inventoryType: string;
  subDescription: string;
  priceSale: number | null;
  reviews: IProductReview[];
  createdAt: Date;
  ratings: {
    name: string;
    starCount: number;
    reviewCount: number;
  }[];
  saleLabel: {
    enabled: boolean;
    content: string;
  };
  newLabel: {
    enabled: boolean;
    content: string;
  };
};

export type IProductTableFilterValue = string | string[];

export type IProductTableFilters = {
  name: string;
  stock: string[];
  publish: string[];
  role: string;
  startDate: Date | null;
  endDate: Date | null;
  search?: string;
  page?: number;
  limit?: number;
  service?: string;
  status: string;
};

export type IProductCategory = {
  _id: string;
  title: string;
};
export type IProduct = {
  _id: string;
  imageUrl: string;
  title: string;
  category: IProductCategory;

  sku: string;
  price: string;
  minimumOrderQuantity: number;
  description: string;
  quickbooksItemId: string;
  qtyOnHand: number;
  createdAt: string;
  updatedAt: string;
};

export type IProductFormItems = {
  _id: string;
  files: any;
  imageUrls?: any;

  title: string;
  category: string;

  sku: string;
  price: string;
  minimumOrderQuantity: number;
  description: string;
  quickbooksItemId: string;
  qtyOnHand: number;
  createdAt: string;
  updatedAt: string;
};

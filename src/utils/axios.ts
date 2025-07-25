import axios, { AxiosRequestConfig } from 'axios';
// config
import { HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  auth: {
    me: '/api/admin/profile',
    login: '/api/admin/log-in',
    register: '/api/auth/register',
    forgotPassword: '/api/admin/forgot-password',
    new: '/api/admin/verify-otp',
  },
  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels',
  },
  promocode: {
    add: '/api/admin/add-promo-code',
  },
  category: {
    list: '/api/admin/categories',
    add: '/api/admin/add-category',
    update: '/api/admin/category/:id',
    delete: '/api/admin/category/:id',

    details: '/api/admin/category/:id',

    latest: '/api/post/latest',
    search: '/api/post/search',
  },
  employee: {
    add: '/api/admin/add-employee',
    update: '/api/admin/employee/:id',
    delete: '/api/admin/employee/:id',

    list: '/api/admin/employees',

    details: '/api/admin/employee/:id',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },
  customer: {
    list: '/api/customer/customers',
    details: '/api/customer/customer/:id',
  },
  product: {
    list: '/api/admin/products',
    add: '/api/admin/add-product',
    update: '/api/admin/product/:id',
    delete: '/api/admin/product/:id',
    productCategories: '/api/admin/product-category',
    details: '/api/admin/product/:id',

    latest: '/api/post/latest',
    search: '/api/post/search',
  },
};

import axios from 'axios';

// Use the relative path since we're using nginx proxy
const API_URL = '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for API calls
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response Error:', {
        data: error.response.data,
        status: error.response.status,
        headers: error.response.headers,
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Request Error:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
    }
    const originalRequest = error.config;

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export const authApi = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  register: (userData: any) =>
    api.post('/auth/register', userData),
  getProfile: () =>
    api.get('/auth/profile'),
  updateProfile: (userData: any) =>
    api.put('/auth/profile', userData),
};

export const productApi = {
  getProducts: (params?: any) =>
    api.get('/products', { params }),
  getProduct: (id: string) =>
    api.get(`/products/${id}`),
  createProduct: (productData: any) =>
    api.post('/products', productData),
  updateProduct: (id: string, productData: any) =>
    api.put(`/products/${id}`, productData),
  deleteProduct: (id: string) =>
    api.delete(`/products/${id}`),
  updateInventory: (id: string, inventoryData: any) =>
    api.put(`/products/${id}/inventory`, inventoryData),
};

export const categoryApi = {
  getCategories: (params?: any) =>
    api.get('/categories', { params }),
  getCategory: (id: string) =>
    api.get(`/categories/${id}`),
  createCategory: (categoryData: any) =>
    api.post('/categories', categoryData),
  updateCategory: (id: string, categoryData: any) =>
    api.put(`/categories/${id}`, categoryData),
  deleteCategory: (id: string) =>
    api.delete(`/categories/${id}`),
};

export const orderApi = {
  getOrders: (params?: any) =>
    api.get('/orders', { params }),
  getOrder: (id: string) =>
    api.get(`/orders/${id}`),
  updateOrder: (id: string, orderData: any) =>
    api.put(`/orders/${id}`, orderData),
};

export default api;

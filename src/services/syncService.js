import axios from 'axios';
import { API_BASE_URL } from '../config';

class SyncService {
  constructor() {
    this.api = axios.create({
      baseURL: `${API_BASE_URL}/sync`,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  // Set auth token for requests
  setAuthToken(token) {
    this.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  // Sync products across all platforms
  async syncProducts() {
    const response = await this.api.post('/products');
    return response.data;
  }

  // Import products from a specific platform
  async importProducts(platform) {
    const response = await this.api.post(`/import/${platform}`);
    return response.data;
  }

  // Get sync status
  async getSyncStatus() {
    const response = await this.api.get('/status');
    return response.data;
  }

  // Get sync history
  async getSyncHistory() {
    const response = await this.api.get('/history');
    return response.data;
  }
}

export default new SyncService();

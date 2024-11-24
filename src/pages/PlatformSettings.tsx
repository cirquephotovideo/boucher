import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Grid,
  IconButton,
  Divider,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Save as SaveIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import axios from 'axios';

interface PlatformConfig {
  [key: string]: {
    fields: {
      name: string;
      key: string;
      type: string;
      required: boolean;
      placeholder?: string;
    }[];
    name: string;
  };
}

const platformConfigs: PlatformConfig = {
  woocommerce: {
    name: 'WooCommerce',
    fields: [
      { name: 'Store URL', key: 'url', type: 'text', required: true, placeholder: 'https://your-store.com' },
      { name: 'Consumer Key', key: 'consumerKey', type: 'text', required: true },
      { name: 'Consumer Secret', key: 'consumerSecret', type: 'password', required: true },
    ],
  },
  shopify: {
    name: 'Shopify',
    fields: [
      { name: 'Shop Name', key: 'shopName', type: 'text', required: true, placeholder: 'your-shop.myshopify.com' },
      { name: 'Access Token', key: 'accessToken', type: 'password', required: true },
    ],
  },
  ubereats: {
    name: 'Uber Eats',
    fields: [
      { name: 'Client ID', key: 'clientId', type: 'text', required: true },
      { name: 'Client Secret', key: 'clientSecret', type: 'password', required: true },
    ],
  },
  prestashop: {
    name: 'PrestaShop',
    fields: [
      { name: 'Store URL', key: 'url', type: 'text', required: true, placeholder: 'https://your-store.com' },
      { name: 'API Key', key: 'apiKey', type: 'password', required: true },
    ],
  },
  odoo: {
    name: 'Odoo',
    fields: [
      { name: 'Server URL', key: 'url', type: 'text', required: true, placeholder: 'https://your-server.odoo.com' },
      { name: 'Database', key: 'database', type: 'text', required: true },
      { name: 'Username', key: 'username', type: 'text', required: true },
      { name: 'Password', key: 'password', type: 'password', required: true },
    ],
  },
  deliveroo: {
    name: 'Deliveroo',
    fields: [
      { name: 'API Key', key: 'apiKey', type: 'password', required: true },
      { name: 'Restaurant ID', key: 'restaurantId', type: 'text', required: true },
    ],
  },
};

interface NotificationType {
  type: 'success' | 'error' | 'warning';
  message: string;
}

const PlatformSettings: React.FC = () => {
  const { platformId } = useParams<{ platformId: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<NotificationType | null>(null);

  useEffect(() => {
    loadSettings();
  }, [platformId]);

  const loadSettings = async () => {
    if (!platformId || !platformConfigs[platformId]) {
      navigate('/sync');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`/api/platforms/${platformId}/settings`);
      setFormData(response.data || {});
    } catch (error: any) {
      setNotification({
        type: 'error',
        message: `Failed to load settings: ${error?.message || 'Unknown error'}`,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!platformId) return;

    setSaving(true);
    try {
      await axios.post(`/api/platforms/${platformId}/settings`, formData);
      setNotification({
        type: 'success',
        message: 'Settings saved successfully',
      });
    } catch (error: any) {
      setNotification({
        type: 'error',
        message: `Failed to save settings: ${error?.message || 'Unknown error'}`,
      });
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  if (!platformId || !platformConfigs[platformId]) {
    return null;
  }

  const config = platformConfigs[platformId];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate('/sync')} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4">{config.name} Settings</Typography>
      </Box>

      {notification && (
        <Alert 
          severity={notification.type} 
          sx={{ mb: 3 }}
          onClose={() => setNotification(null)}
        >
          {notification.message}
        </Alert>
      )}

      <Card>
        <CardContent>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={3}>
              {config.fields.map((field) => (
                <Grid item xs={12} sm={6} key={field.key}>
                  <TextField
                    fullWidth
                    label={field.name}
                    type={field.type}
                    required={field.required}
                    placeholder={field.placeholder}
                    value={formData[field.key] || ''}
                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                  />
                </Grid>
              ))}
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => navigate('/sync')}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={saving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                    onClick={handleSave}
                    disabled={saving}
                  >
                    {saving ? 'Saving...' : 'Save Settings'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default PlatformSettings;

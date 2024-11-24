import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  CircularProgress,
  Snackbar,
  Alert,
  IconButton,
} from '@mui/material';
import {
  ShoppingCart as WooCommerceIcon,
  Store as ShopifyIcon,
  LocalShipping as UberEatsIcon,
  Store as PrestashopIcon,
  Business as OdooIcon,
  LocalShipping as DeliverooIcon,
  Sync as SyncIcon,
  Store,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Platform {
  id: string;
  name: string;
  icon: JSX.Element;
  connected: boolean;
  lastSync: string;
}

interface SyncResult {
  platform: string;
  success: boolean;
  message: string;
}

interface ConnectResult {
  platform: string;
  success: boolean;
  error?: string;
}

interface NotificationType {
  type: 'success' | 'error' | 'warning';
  message: string;
}

const initialPlatforms: Platform[] = [
  {
    id: 'woocommerce',
    name: 'WooCommerce',
    icon: <WooCommerceIcon />,
    connected: false,
    lastSync: 'Never',
  },
  {
    id: 'shopify',
    name: 'Shopify',
    icon: <ShopifyIcon />,
    connected: false,
    lastSync: 'Never',
  },
  {
    id: 'ubereats',
    name: 'Uber Eats',
    icon: <UberEatsIcon />,
    connected: false,
    lastSync: 'Never',
  },
  {
    id: 'prestashop',
    name: 'PrestaShop',
    icon: <PrestashopIcon />,
    connected: false,
    lastSync: 'Never',
  },
  {
    id: 'odoo',
    name: 'Odoo',
    icon: <OdooIcon />,
    connected: false,
    lastSync: 'Never',
  },
  {
    id: 'deliveroo',
    name: 'Deliveroo',
    icon: <DeliverooIcon />,
    connected: false,
    lastSync: 'Never',
  },
];

const Sync: React.FC = () => {
  const [platforms, setPlatforms] = useState<Platform[]>(initialPlatforms);
  const [syncing, setSyncing] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [notification, setNotification] = useState<NotificationType | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkConnections();
  }, []);

  const checkConnections = async () => {
    try {
      const response = await axios.get('/api/platforms/status');
      const updatedPlatforms = platforms.map(platform => ({
        ...platform,
        connected: response.data[platform.id]?.connected || false,
        lastSync: response.data[platform.id]?.lastSync || 'Never',
      }));
      setPlatforms(updatedPlatforms);
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Failed to fetch platform status',
      });
    }
  };

  const handleToggleConnection = async (platformId: string) => {
    try {
      const currentPlatform = platforms.find(p => p.id === platformId);
      if (!currentPlatform) return;

      const action = currentPlatform.connected ? 'disconnect' : 'connect';
      const response = await axios.post(`/api/platforms/${platformId}/${action}`);

      if (response.data.success) {
        const updatedPlatforms = platforms.map(p =>
          p.id === platformId ? { ...p, connected: !p.connected } : p
        );
        setPlatforms(updatedPlatforms);
        setNotification({
          type: 'success',
          message: `Successfully ${action}ed ${currentPlatform.name}`,
        });
      } else {
        throw new Error(response.data.message);
      }
    } catch (error: any) {
      const currentPlatform = platforms.find(p => p.id === platformId);
      setNotification({
        type: 'error',
        message: `Failed to ${currentPlatform?.connected ? 'disconnect' : 'connect'} ${currentPlatform?.name}: ${error?.message || 'Unknown error'}`,
      });
    }
  };

  const handleConnectAll = async () => {
    setConnecting(true);
    try {
      const disconnectedPlatforms = platforms.filter(p => !p.connected);
      const results: ConnectResult[] = [];

      for (const platform of disconnectedPlatforms) {
        try {
          const response = await axios.post(`/api/platforms/${platform.id}/connect`);
          if (response.data.success) {
            results.push({
              platform: platform.name,
              success: true,
            });
          } else {
            throw new Error(response.data.message);
          }
        } catch (error: any) {
          results.push({
            platform: platform.name,
            success: false,
            error: error?.message || 'Unknown error',
          });
        }
      }

      const successCount = results.filter(r => r.success).length;
      
      // Update platforms state
      const updatedPlatforms = platforms.map(platform => {
        const result = results.find(r => r.platform === platform.name);
        return result?.success ? { ...platform, connected: true } : platform;
      });
      setPlatforms(updatedPlatforms);

      // Show notification
      setNotification({
        type: successCount === disconnectedPlatforms.length ? 'success' : 'warning',
        message: `Connected ${successCount}/${disconnectedPlatforms.length} platforms successfully`,
      });

    } catch (error: any) {
      setNotification({
        type: 'error',
        message: `Failed to connect platforms: ${error?.message || 'Unknown error'}`,
      });
    } finally {
      setConnecting(false);
      checkConnections(); // Refresh status
    }
  };

  const handleSync = async () => {
    setSyncing(true);
    try {
      const connectedPlatforms = platforms.filter(p => p.connected);
      const results: SyncResult[] = [];

      for (const platform of connectedPlatforms) {
        try {
          const response = await axios.post(`/api/platforms/${platform.id}/sync`);
          results.push({
            platform: platform.name,
            success: response.data.success,
            message: response.data.message,
          });
        } catch (error: any) {
          results.push({
            platform: platform.name,
            success: false,
            message: error?.message || 'Unknown error',
          });
        }
      }

      const successCount = results.filter(r => r.success).length;
      
      // Show notification
      setNotification({
        type: successCount === connectedPlatforms.length ? 'success' : 'error',
        message: `Sync completed: ${successCount}/${connectedPlatforms.length} platforms synced successfully`,
      });

      // Refresh connection status and last sync times
      checkConnections();
    } catch (error: any) {
      setNotification({
        type: 'error',
        message: `Sync failed: ${error?.message || 'Unknown error'}`,
      });
    } finally {
      setSyncing(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Platform Sync</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={connecting ? <CircularProgress size={20} color="inherit" /> : <Store />}
            onClick={handleConnectAll}
            disabled={connecting || syncing || platforms.every(p => p.connected)}
          >
            {connecting ? 'Connecting...' : 'Connect All'}
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={syncing ? <CircularProgress size={20} color="inherit" /> : <SyncIcon />}
            onClick={handleSync}
            disabled={syncing || connecting || !platforms.some(p => p.connected)}
          >
            {syncing ? 'Syncing...' : 'Sync All'}
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <List>
                {platforms.map((platform) => (
                  <ListItem key={platform.id}>
                    <ListItemIcon>{platform.icon}</ListItemIcon>
                    <ListItemText
                      primary={platform.name}
                      secondary={`Last sync: ${platform.lastSync}`}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton
                        color="primary"
                        onClick={() => navigate(`/platform-settings/${platform.id}`)}
                        disabled={syncing || connecting}
                      >
                        <SettingsIcon />
                      </IconButton>
                      <Switch
                        edge="end"
                        checked={platform.connected}
                        onChange={() => handleToggleConnection(platform.id)}
                        disabled={syncing || connecting}
                      />
                    </Box>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={!!notification}
        autoHideDuration={6000}
        onClose={() => setNotification(null)}
      >
        <Alert
          onClose={() => setNotification(null)}
          severity={notification?.type || 'error'}
          sx={{ width: '100%' }}
        >
          {notification?.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Sync;

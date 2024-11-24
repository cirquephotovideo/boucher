import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Sync as SyncIcon,
  CloudDownload,
  History,
  CheckCircle,
  Error,
  Refresh
} from '@mui/icons-material';
import syncService from '../services/syncService';
import { useSnackbar } from 'notistack';

const platforms = [
  { name: 'WooCommerce', id: 'woocommerce' },
  { name: 'Shopify', id: 'shopify' },
  { name: 'PrestaShop', id: 'prestashop' },
  { name: 'UberEats', id: 'ubereats' },
  { name: 'Deliveroo', id: 'deliveroo' }
];

const Sync = () => {
  const [syncing, setSyncing] = useState(false);
  const [syncHistory, setSyncHistory] = useState([]);
  const [syncStatus, setSyncStatus] = useState({});
  const [error, setError] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const loadSyncHistory = async () => {
    try {
      const history = await syncService.getSyncHistory();
      setSyncHistory(history);
    } catch (err) {
      console.error('Error loading sync history:', err);
      setError('Failed to load sync history');
    }
  };

  const loadSyncStatus = async () => {
    try {
      const status = await syncService.getSyncStatus();
      setSyncStatus(status);
    } catch (err) {
      console.error('Error loading sync status:', err);
      setError('Failed to load sync status');
    }
  };

  useEffect(() => {
    loadSyncHistory();
    loadSyncStatus();
  }, []);

  const handleSync = async () => {
    try {
      setSyncing(true);
      setError(null);
      await syncService.syncProducts();
      enqueueSnackbar('Sync started successfully', { variant: 'success' });
      await loadSyncStatus();
      await loadSyncHistory();
    } catch (err) {
      console.error('Sync error:', err);
      setError('Failed to start sync');
      enqueueSnackbar('Failed to start sync', { variant: 'error' });
    } finally {
      setSyncing(false);
    }
  };

  const handleImport = async (platform) => {
    try {
      setSyncing(true);
      setError(null);
      await syncService.importProducts(platform);
      enqueueSnackbar(`Import from ${platform} started successfully`, { variant: 'success' });
      await loadSyncStatus();
      await loadSyncHistory();
    } catch (err) {
      console.error(`Import error for ${platform}:`, err);
      setError(`Failed to import from ${platform}`);
      enqueueSnackbar(`Failed to import from ${platform}`, { variant: 'error' });
    } finally {
      setSyncing(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Platform Synchronization
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Sync Actions */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Sync Actions
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={syncing ? <CircularProgress size={20} /> : <SyncIcon />}
                  onClick={handleSync}
                  disabled={syncing}
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  Sync All Platforms
                </Button>
                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                  Import from specific platform:
                </Typography>
                {platforms.map((platform) => (
                  <Button
                    key={platform.id}
                    variant="outlined"
                    startIcon={<CloudDownload />}
                    onClick={() => handleImport(platform.id)}
                    disabled={syncing}
                    fullWidth
                    sx={{ mb: 1 }}
                  >
                    {platform.name}
                  </Button>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Sync Status */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  Current Status
                </Typography>
                <Tooltip title="Refresh Status">
                  <IconButton onClick={loadSyncStatus} disabled={syncing}>
                    <Refresh />
                  </IconButton>
                </Tooltip>
              </Box>
              <List>
                {platforms.map((platform) => (
                  <React.Fragment key={platform.id}>
                    <ListItem>
                      <ListItemIcon>
                        {syncStatus[platform.id]?.success ? (
                          <CheckCircle color="success" />
                        ) : (
                          <Error color="error" />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={platform.name}
                        secondary={syncStatus[platform.id]?.lastSync
                          ? `Last sync: ${new Date(syncStatus[platform.id].lastSync).toLocaleString()}`
                          : 'Never synced'}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Sync History */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  Sync History
                </Typography>
                <Tooltip title="Refresh History">
                  <IconButton onClick={loadSyncHistory} disabled={syncing}>
                    <History />
                  </IconButton>
                </Tooltip>
              </Box>
              <List>
                {syncHistory.map((item, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemIcon>
                        {item.success ? (
                          <CheckCircle color="success" />
                        ) : (
                          <Error color="error" />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={`${item.type} - ${item.platform}`}
                        secondary={`${new Date(item.timestamp).toLocaleString()} - ${item.message}`}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Sync;

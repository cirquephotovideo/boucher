import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  Category as CategoryIcon,
  Inventory as InventoryIcon,
  Sync as SyncIcon,
} from '@mui/icons-material';

interface DashboardStats {
  totalOrders: number;
  totalProducts: number;
  totalCategories: number;
  lastSync: string;
}

const Dashboard: React.FC = () => {
  const stats: DashboardStats = {
    totalOrders: 0,
    totalProducts: 0,
    totalCategories: 0,
    lastSync: 'Never',
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <ShoppingCartIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Total Orders</Typography>
              </Box>
              <Typography variant="h4">{stats.totalOrders}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <InventoryIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Products</Typography>
              </Box>
              <Typography variant="h4">{stats.totalProducts}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <CategoryIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Categories</Typography>
              </Box>
              <Typography variant="h4">{stats.totalCategories}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <SyncIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Last Sync</Typography>
              </Box>
              <Typography variant="h6">{stats.lastSync}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Orders */}
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Recent Orders" />
            <CardContent>
              <Typography color="textSecondary">
                No recent orders to display.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Platform Status */}
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Platform Status" />
            <CardContent>
              <Typography color="textSecondary">
                No platform status information available.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;

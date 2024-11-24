import React from 'react';
import { Box, Grid, Card, CardContent, Typography, CardHeader } from '@mui/material';
import { ShoppingCart, Inventory, Category, Sync } from '@mui/icons-material';

const statCards = [
  {
    title: 'Total Orders',
    value: '0',
    icon: <ShoppingCart sx={{ fontSize: 40, color: 'primary.main' }} />,
  },
  {
    title: 'Total Products',
    value: '0',
    icon: <Inventory sx={{ fontSize: 40, color: 'success.main' }} />,
  },
  {
    title: 'Categories',
    value: '0',
    icon: <Category sx={{ fontSize: 40, color: 'warning.main' }} />,
  },
  {
    title: 'Last Sync',
    value: 'Never',
    icon: <Sync sx={{ fontSize: 40, color: 'info.main' }} />,
  },
];

const Dashboard = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {statCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                {card.icon}
                <Typography variant="h6" sx={{ mt: 2 }}>
                  {card.title}
                </Typography>
                <Typography variant="h4">
                  {card.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Recent Orders" />
            <CardContent>
              <Typography variant="body1" color="textSecondary">
                No recent orders to display.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Platform Status" />
            <CardContent>
              <Typography variant="body1" color="textSecondary">
                No platform status available.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;

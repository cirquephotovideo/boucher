import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
  Grid,
  InputAdornment,
  DialogContentText,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import api from '../services/api';
import ProductCard from '../components/Products/ProductCard';
import LoadingAnimation from '../components/Common/LoadingAnimation';
import { animations } from '../theme/butcherTheme';

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  sku: string;
  stock: number;
  categoryId: string;
  weight?: number;
  imageUrl?: string;
}

interface Category {
  id: string;
  name: string;
}

interface NotificationType {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

const emptyProduct: Product = {
  id: '',
  name: '',
  description: '',
  price: 0,
  sku: '',
  stock: 0,
  categoryId: '',
  weight: 0,
  imageUrl: '',
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product>(emptyProduct);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [notification, setNotification] = useState<NotificationType | null>(null);

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error: any) {
      setNotification({
        type: 'error',
        message: `Failed to load products: ${error.response?.data?.error || error.message}`,
      });
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch (error: any) {
      setNotification({
        type: 'error',
        message: `Failed to load categories: ${error.response?.data?.error || error.message}`,
      });
    }
  };

  const handleAddProduct = () => {
    setEditingProduct(emptyProduct);
    setOpenModal(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setOpenModal(true);
  };

  const handleDeleteProduct = (product: Product) => {
    setSelectedProduct(product);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedProduct) return;

    try {
      await api.delete(`/products/${selectedProduct.id}`);
      await loadProducts();
      setNotification({
        type: 'success',
        message: 'Product deleted successfully',
      });
    } catch (error: any) {
      setNotification({
        type: 'error',
        message: `Failed to delete product: ${error.response?.data?.error || error.message}`,
      });
    } finally {
      setDeleteConfirmOpen(false);
      setSelectedProduct(null);
    }
  };

  const handleSaveProduct = async () => {
    try {
      if (!editingProduct.categoryId) {
        throw new Error('Please select a category');
      }

      if (editingProduct.id) {
        await api.put(`/products/${editingProduct.id}`, editingProduct);
      } else {
        await api.post('/products', editingProduct);
      }

      await loadProducts();
      setNotification({
        type: 'success',
        message: `Product ${editingProduct.id ? 'updated' : 'added'} successfully`,
      });
      setOpenModal(false);
    } catch (error: any) {
      setNotification({
        type: 'error',
        message: `Failed to ${editingProduct.id ? 'update' : 'add'} product: ${error.response?.data?.error || error.message}`,
      });
    }
  };

  const handleInputChange = (field: keyof Product, value: string | number) => {
    setEditingProduct(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component={motion.h4} variants={animations.fadeIn}>
          Products
        </Typography>
        <Button
          component={motion.button}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddProduct}
        >
          Add Product
        </Button>
      </Box>

      <Grid
        container
        spacing={3}
        component={motion.div}
        variants={animations.staggerContainer}
        initial="initial"
        animate="animate"
      >
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductCard
              product={product}
              onEdit={() => handleEditProduct(product)}
              onDelete={() => handleDeleteProduct(product)}
            />
          </Grid>
        ))}
      </Grid>

      {/* Product Form Dialog */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingProduct.id ? 'Edit Product' : 'Add Product'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Name"
              value={editingProduct.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              fullWidth
            />
            <TextField
              label="Description"
              value={editingProduct.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              fullWidth
              multiline
              rows={3}
            />
            <TextField
              label="Price"
              type="number"
              value={editingProduct.price}
              onChange={(e) => handleInputChange('price', Number(e.target.value))}
              fullWidth
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />
            <TextField
              label="SKU"
              value={editingProduct.sku}
              onChange={(e) => handleInputChange('sku', e.target.value)}
              fullWidth
            />
            <TextField
              label="Stock"
              type="number"
              value={editingProduct.stock}
              onChange={(e) => handleInputChange('stock', Number(e.target.value))}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={editingProduct.categoryId}
                onChange={(e) => handleInputChange('categoryId', e.target.value)}
                label="Category"
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Weight (g)"
              type="number"
              value={editingProduct.weight}
              onChange={(e) => handleInputChange('weight', Number(e.target.value))}
              fullWidth
            />
            <TextField
              label="Image URL"
              value={editingProduct.imageUrl}
              onChange={(e) => handleInputChange('imageUrl', e.target.value)}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>
          <Button onClick={handleSaveProduct} variant="contained" color="primary">
            {editingProduct.id ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete {selectedProduct?.name}? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification Snackbar */}
      <Snackbar
        open={!!notification}
        autoHideDuration={6000}
        onClose={() => setNotification(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setNotification(null)} 
          severity={notification?.type || 'info'} 
          sx={{ width: '100%', display: notification ? 'flex' : 'none' }}
        >
          {notification?.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Products;

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  Alert,
  Snackbar,
  Zoom,
  Fade,
  styled,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Category as CategoryIcon,
} from '@mui/icons-material';
import api from '../config/api';

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[8],
  },
}));

const CategoryCount = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  fontWeight: 'bold',
}));

const ActionButton = styled(IconButton)(({ theme }) => ({
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.1)',
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  },
}));

interface Category {
  id: string;
  name: string;
  description: string;
  _count?: {
    products: number;
  };
}

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await api.get('/categories');
      if (response.data) {
        setCategories(response.data);
      } else {
        showNotification('error', 'No data received from server');
      }
    } catch (error: any) {
      console.error('Error loading categories:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Unknown error';
      showNotification('error', `Failed to load categories: ${errorMessage}`);
    }
  };

  const handleOpen = (category?: Category) => {
    if (category) {
      setSelectedCategory(category);
      setFormData({ name: category.name, description: category.description });
    } else {
      setSelectedCategory(null);
      setFormData({ name: '', description: '' });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCategory(null);
    setFormData({ name: '', description: '' });
  };

  const handleSubmit = async () => {
    try {
      if (selectedCategory) {
        await api.put(`/categories/${selectedCategory.id}`, formData);
        showNotification('success', 'Category updated successfully');
      } else {
        await api.post('/categories', formData);
        showNotification('success', 'Category created successfully');
      }
      await loadCategories();
      handleClose();
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || error.message || 'Unknown error';
      showNotification('error', `Failed to ${selectedCategory ? 'update' : 'create'} category: ${errorMessage}`);
    }
  };

  const handleDelete = async (category: Category) => {
    setSelectedCategory(category);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/categories/${selectedCategory?.id}`);
      showNotification('success', 'Category deleted successfully');
      loadCategories();
      setDeleteDialogOpen(false);
      setSelectedCategory(null);
    } catch (error: any) {
      showNotification('error', `Failed to delete category: ${error.message}`);
    }
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CategoryIcon sx={{ color: 'primary.main' }} />
          Categories
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
          }}
        >
          Add Category
        </Button>
      </Box>

      <Grid container spacing={3}>
        {categories.map((category) => (
          <Zoom in key={category.id} style={{ transitionDelay: '100ms' }}>
            <Grid item xs={12} sm={6} md={4}>
              <StyledCard>
                <CardContent sx={{ position: 'relative', height: '100%' }}>
                  <CategoryCount
                    label={`${category._count?.products || 0} Products`}
                    size="small"
                  />
                  <Typography variant="h6" gutterBottom>
                    {category.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2, minHeight: '2.5em' }}
                  >
                    {category.description}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', mt: 'auto' }}>
                    <ActionButton
                      size="small"
                      color="primary"
                      onClick={() => handleOpen(category)}
                    >
                      <EditIcon />
                    </ActionButton>
                    <ActionButton
                      size="small"
                      color="error"
                      onClick={() => handleDelete(category)}
                    >
                      <DeleteIcon />
                    </ActionButton>
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
          </Zoom>
        ))}
      </Grid>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <Fade in={open}>
          <Box>
            <DialogTitle>
              {selectedCategory ? 'Edit Category' : 'Add Category'}
            </DialogTitle>
            <DialogContent>
              <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  fullWidth
                  label="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={!formData.name}
              >
                {selectedCategory ? 'Update' : 'Create'}
              </Button>
            </DialogActions>
          </Box>
        </Fade>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the category "{selectedCategory?.name}"?
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button color="error" onClick={confirmDelete}>Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Notification Snackbar */}
      <Snackbar
        open={!!notification}
        autoHideDuration={6000}
        onClose={() => setNotification(null)}
      >
        <Alert
          onClose={() => setNotification(null)}
          severity={notification?.type}
          sx={{ width: '100%' }}
        >
          {notification?.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Categories;

import React from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Chip,
  useTheme,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { animations } from '../../theme/butcherTheme';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description?: string;
    price: number;
    stock: number;
    imageUrl?: string;
    category?: string;
  };
  onEdit: (product: any) => void;
  onDelete: (product: any) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete }) => {
  const theme = useTheme();

  return (
    <Card
      component={motion.div}
      variants={animations.scaleUp}
      initial="initial"
      animate="animate"
      exit="exit"
      whileHover={{ scale: 1.02 }}
      sx={{
        position: 'relative',
        overflow: 'visible',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: theme.palette.primary.main,
          borderRadius: '4px 4px 0 0',
        },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="200"
          image={product.imageUrl || '/default-meat.jpg'}
          alt={product.name}
          sx={{
            objectFit: 'cover',
            borderRadius: '4px 4px 0 0',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            display: 'flex',
            gap: 1,
          }}
        >
          <IconButton
            component={motion.button}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onEdit(product)}
            sx={{
              bgcolor: 'background.paper',
              '&:hover': { bgcolor: 'background.paper' },
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            component={motion.button}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDelete(product)}
            sx={{
              bgcolor: 'background.paper',
              '&:hover': { bgcolor: 'background.paper' },
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
      <CardContent>
        <Typography variant="h6" gutterBottom component="div">
          {product.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {product.description}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 2,
          }}
        >
          <Typography
            variant="h6"
            color="primary"
            component={motion.div}
            whileHover={{ scale: 1.05 }}
          >
            ${product.price.toFixed(2)}
          </Typography>
          <Chip
            label={`Stock: ${product.stock}`}
            color={product.stock > 0 ? 'success' : 'error'}
            size="small"
            sx={{
              borderRadius: '4px',
              '& .MuiChip-label': {
                px: 2,
              },
            }}
          />
        </Box>
        {product.category && (
          <Chip
            label={product.category}
            size="small"
            sx={{
              mt: 1,
              bgcolor: theme.palette.secondary.light,
              color: theme.palette.secondary.contrastText,
              borderRadius: '4px',
              '& .MuiChip-label': {
                px: 2,
              },
            }}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;

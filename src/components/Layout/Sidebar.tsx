import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  useTheme,
  alpha,
  useMediaQuery,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Restaurant as ButcherIcon,
  Category as CategoryIcon,
  ShoppingCart as OrdersIcon,
  Sync as SyncIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { slideIn, staggerContainer, defaultTransition } from '../../theme';

const drawerWidth = 240;

const menuItems = [
  { path: '/dashboard', label: 'Dashboard', icon: DashboardIcon },
  { path: '/products', label: 'Products', icon: ButcherIcon },
  { path: '/categories', label: 'Categories', icon: CategoryIcon },
  { path: '/orders', label: 'Orders', icon: OrdersIcon },
  { path: '/sync', label: 'Sync', icon: SyncIcon },
  { path: '/platform-settings', label: 'Settings', icon: SettingsIcon },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleNavigate = (path: string) => {
    navigate(path);
    if (isMobile) {
      onClose();
    }
  };

  const drawerProps = isMobile
    ? {
        variant: 'temporary' as const,
        open,
        onClose,
      }
    : {
        variant: 'permanent' as const,
        open: true,
      };

  return (
    <Drawer
      {...drawerProps}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          borderRight: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
          background: theme.palette.background.paper,
        },
      }}
    >
      <Box sx={{ height: 64 }} /> {/* Toolbar spacer */}
      <List component={motion.div} variants={staggerContainer}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <ListItem
              key={item.path}
              component={motion.div}
              variants={slideIn}
              transition={defaultTransition}
              whileHover={{ x: 6 }}
              button
              onClick={() => handleNavigate(item.path)}
              sx={{
                mb: 0.5,
                mx: 1,
                borderRadius: 1,
                backgroundColor: isActive
                  ? alpha(theme.palette.primary.main, 0.08)
                  : 'transparent',
                color: isActive
                  ? theme.palette.primary.main
                  : theme.palette.text.primary,
                '&:hover': {
                  backgroundColor: isActive
                    ? alpha(theme.palette.primary.main, 0.12)
                    : alpha(theme.palette.primary.main, 0.04),
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActive
                    ? theme.palette.primary.main
                    : theme.palette.text.primary,
                  minWidth: 40,
                }}
              >
                <Icon />
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: isActive ? 600 : 400,
                }}
              />
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;

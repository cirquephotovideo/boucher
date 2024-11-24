import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  useTheme,
  alpha,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { slideDown, defaultTransition } from '../../theme';

interface TopBarProps {
  onMenuClick: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onMenuClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar
      position="fixed"
      component={motion.div}
      variants={slideDown}
      initial="initial"
      animate="animate"
      transition={defaultTransition}
      sx={{
        backgroundColor: alpha(theme.palette.background.paper, 0.95),
        backdropFilter: 'blur(6px)',
        borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
        color: theme.palette.text.primary,
        boxShadow: 'none',
      }}
    >
      <Toolbar>
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onMenuClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        
        <Box 
          component="img"
          src="/logo.png"
          alt="Butcher Shop Logo"
          sx={{ 
            height: 40,
            width: 'auto',
            mr: 2,
            display: { xs: 'none', sm: 'block' }
          }}
        />

        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: 600,
            letterSpacing: '0.5px',
          }}
        >
          Butcher Shop Dashboard
        </Typography>

        <IconButton color="inherit" sx={{ ml: 1 }}>
          <NotificationsIcon />
        </IconButton>

        <IconButton color="inherit" sx={{ ml: 1 }}>
          <AccountIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;

import React from 'react';
import { motion } from 'framer-motion';
import { Box, CssBaseline, useTheme, alpha } from '@mui/material';
import { pageTransition, defaultTransition } from '../../theme';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

interface AnimatedLayoutProps {
  children: React.ReactNode;
}

const AnimatedLayout: React.FC<AnimatedLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <TopBar onMenuClick={handleDrawerToggle} />
      <Sidebar open={mobileOpen} onClose={handleDrawerToggle} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: '100vh',
          backgroundColor: theme.palette.background.default,
          position: 'relative',
          overflow: 'hidden',
          pt: { xs: 7, sm: 8 },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '300px',
            background: `linear-gradient(135deg, 
              ${alpha(theme.palette.primary.main, 0.15)} 0%, 
              ${alpha(theme.palette.secondary.main, 0.1)} 100%
            )`,
            zIndex: 0,
          }}
        />
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageTransition}
          transition={defaultTransition}
          style={{
            padding: theme.spacing(4),
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            [theme.breakpoints.up('sm')]: {
              paddingLeft: theme.spacing(3),
              paddingRight: theme.spacing(3),
            },
            position: 'relative',
            zIndex: 1,
            maxWidth: theme.breakpoints.values.xl,
            margin: '0 auto',
          }}
        >
          {children}
        </motion.div>
      </Box>
    </Box>
  );
};

export default AnimatedLayout;

import React from 'react';
import { motion } from 'framer-motion';
import { Box, useTheme } from '@mui/material';

const LoadingAnimation: React.FC = () => {
  const theme = useTheme();

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const circleVariants = {
    initial: {
      y: 0,
    },
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <Box
      component={motion.div}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      sx={{
        display: 'flex',
        gap: 2,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '200px',
      }}
    >
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          variants={circleVariants}
          style={{
            width: 20,
            height: 20,
            borderRadius: '50%',
            backgroundColor: theme.palette.primary.main,
            opacity: 0.8 - i * 0.2,
          }}
        />
      ))}
    </Box>
  );
};

export default LoadingAnimation;

import { createTheme, alpha } from '@mui/material/styles';
import { Shadows } from '@mui/material/styles/shadows';
import { Variants, Transition } from 'framer-motion';

// Butcher shop color palette
const colors = {
  primary: {
    main: '#8B0000', // Deep blood red
    light: '#B22222', // Lighter red
    dark: '#560000', // Darker red
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#4A3228', // Rich brown
    light: '#6B4B3C', // Lighter brown
    dark: '#2C1810', // Darker brown
    contrastText: '#FFFFFF',
  },
  background: {
    default: '#FBF7F4', // Warm off-white
    paper: '#FFFFFF',
    accent: '#F9ECEC', // Light pink tint
  },
  meat: {
    fresh: '#FF4D4D', // Fresh meat red
    aged: '#8B2323', // Aged meat brown
    marble: '#FFF0F0', // Marbled texture
  },
  text: {
    primary: '#2C1810', // Deep brown
    secondary: '#5D4037', // Medium brown
    disabled: '#9E9E9E',
  },
  error: {
    main: '#D32F2F',
    light: '#EF5350',
    dark: '#C62828',
  },
  warning: {
    main: '#ED6C02',
    light: '#FF9800',
    dark: '#E65100',
  },
  success: {
    main: '#2E7D32',
    light: '#4CAF50',
    dark: '#1B5E20',
  },
};

// Animation configurations
interface Animations {
  transition: Transition;
  fadeIn: Variants;
  slideIn: Variants;
  scaleUp: Variants;
  staggerContainer: Variants;
}

export const animations: Animations = {
  transition: {
    duration: 0.4,
    ease: [0.4, 0, 0.2, 1],
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideIn: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  },
  scaleUp: {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.95, opacity: 0 },
  },
  staggerContainer: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
};

// Custom shadows
const customShadows = Array(25).fill('none') as Shadows;
customShadows[1] = '0 2px 4px ' + alpha(colors.primary.main, 0.08);
customShadows[2] = '0 4px 8px ' + alpha(colors.primary.main, 0.12);
customShadows[3] = '0 8px 16px ' + alpha(colors.primary.main, 0.16);
customShadows[4] = '0 12px 24px ' + alpha(colors.primary.main, 0.20);

// Create theme
const butcherTheme = createTheme({
  palette: {
    mode: 'light',
    primary: colors.primary,
    secondary: colors.secondary,
    background: colors.background,
    text: colors.text,
    error: colors.error,
    warning: colors.warning,
    success: colors.success,
  },
  typography: {
    fontFamily: "'Playfair Display', 'Roboto', 'Arial', sans-serif",
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      color: colors.text.primary,
      letterSpacing: '-0.01562em',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      color: colors.text.primary,
      letterSpacing: '-0.00833em',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
      color: colors.text.primary,
      letterSpacing: '0em',
    },
    h4: {
      fontWeight: 500,
      fontSize: '1.5rem',
      color: colors.text.primary,
      letterSpacing: '0.00735em',
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.25rem',
      color: colors.text.primary,
      letterSpacing: '0em',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1rem',
      color: colors.text.primary,
      letterSpacing: '0.0075em',
    },
    subtitle1: {
      fontSize: '1rem',
      color: colors.text.secondary,
      letterSpacing: '0.00938em',
    },
    subtitle2: {
      fontSize: '0.875rem',
      color: colors.text.secondary,
      letterSpacing: '0.00714em',
    },
    body1: {
      fontSize: '1rem',
      color: colors.text.primary,
      letterSpacing: '0.00938em',
    },
    body2: {
      fontSize: '0.875rem',
      color: colors.text.primary,
      letterSpacing: '0.01071em',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: colors.background.default,
          color: colors.text.primary,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
          padding: '8px 24px',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
          },
        },
        contained: {
          boxShadow: customShadows[1],
          '&:hover': {
            boxShadow: customShadows[2],
          },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
            backgroundColor: alpha(colors.primary.main, 0.04),
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: customShadows[1],
          '&:hover': {
            boxShadow: customShadows[2],
          },
          transition: 'all 0.3s ease-in-out',
          backgroundColor: colors.background.paper,
          border: `1px solid ${alpha(colors.primary.main, 0.08)}`,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: colors.background.paper,
          backgroundImage: 'none',
        },
        elevation1: {
          boxShadow: customShadows[1],
        },
        elevation2: {
          boxShadow: customShadows[2],
        },
        elevation3: {
          boxShadow: customShadows[3],
        },
        elevation4: {
          boxShadow: customShadows[4],
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(colors.background.paper, 0.95),
          backdropFilter: 'blur(8px)',
          color: colors.text.primary,
          boxShadow: customShadows[1],
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: colors.background.paper,
          borderRight: `1px solid ${alpha(colors.primary.main, 0.08)}`,
          boxShadow: customShadows[2],
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: alpha(colors.primary.main, 0.08),
        },
        head: {
          fontWeight: 600,
          backgroundColor: colors.background.accent,
          color: colors.text.primary,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: colors.background.accent,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        filled: {
          backgroundColor: alpha(colors.primary.main, 0.12),
          color: colors.primary.dark,
          '&:hover': {
            backgroundColor: alpha(colors.primary.main, 0.2),
          },
        },
        outlined: {
          borderColor: alpha(colors.primary.main, 0.4),
          '&:hover': {
            backgroundColor: alpha(colors.primary.main, 0.04),
          },
        },
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: customShadows,
});

export default butcherTheme;

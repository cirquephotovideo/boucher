import { Components, Theme } from '@mui/material';
import { alpha } from '@mui/material/styles';

export const components = (theme: Theme): Components => ({
  MuiButton: {
    styleOverrides: {
      root: {
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none',
        },
      },
      contained: {
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.main, 0.9),
        },
      },
      outlined: {
        borderColor: alpha(theme.palette.primary.main, 0.2),
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.main, 0.04),
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        boxShadow: `0 2px 4px ${alpha(theme.palette.primary.main, 0.08)}`,
        '&:hover': {
          boxShadow: `0 4px 8px ${alpha(theme.palette.primary.main, 0.12)}`,
        },
        transition: 'box-shadow 0.3s ease-in-out',
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: 'none',
      },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      root: {
        borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
      },
    },
  },
  MuiTableHead: {
    styleOverrides: {
      root: {
        backgroundColor: alpha(theme.palette.primary.main, 0.04),
        '.MuiTableCell-root': {
          color: theme.palette.text.secondary,
          fontSize: '0.875rem',
          fontWeight: 600,
        },
      },
    },
  },
  MuiTableRow: {
    styleOverrides: {
      root: {
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.main, 0.04),
        },
      },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        padding: 8,
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.main, 0.04),
        },
      },
    },
  },
});

import { PaletteOptions } from '@mui/material';

export const palette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: '#8B0000',
    light: '#B22222',
    dark: '#560000',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#4A3228',
    light: '#6B4B3C',
    dark: '#2C1810',
    contrastText: '#FFFFFF',
  },
  background: {
    default: '#FBF7F4',
    paper: '#FFFFFF',
  },
  text: {
    primary: '#2C1810',
    secondary: '#5D4037',
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

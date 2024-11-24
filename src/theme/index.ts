import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { palette } from './palette';
import { typography } from './typography';
import { components } from './components';

// Create the base theme
const baseTheme = createTheme({
  palette,
  typography,
  shape: {
    borderRadius: 8,
  },
});

// Add responsive font sizes
const responsiveTheme = responsiveFontSizes(baseTheme);

// Add component overrides
const theme = createTheme(responsiveTheme, {
  components: components(responsiveTheme),
});

export default theme;

// Export other theme-related utilities
export * from './animations';
export type { Theme } from '@mui/material';

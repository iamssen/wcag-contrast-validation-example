import { createMuiTheme, Theme } from '@material-ui/core';

export const dark: Theme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      default: '#212121',
      paper: '#333333',
    },
    primary: {
      main: '#2d4d62',
    },
    secondary: {
      main: '#c63c6e',
    },
    error: {
      main: '#69413b',
    },
    warning: {
      main: '#ff9800',
    },
    info: {
      main: '#2196f3',
    },
    success: {
      main: '#4caf50',
    },
  },
});

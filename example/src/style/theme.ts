import { createMuiTheme, Theme } from '@material-ui/core';

export const dark: Theme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      default: '#212121',
      paper: '#333333',
    },
    primary: {
      main: '#2b4158',
    },
    secondary: {
      main: '#c14473',
    },
    error: {
      main: '#f44336',
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

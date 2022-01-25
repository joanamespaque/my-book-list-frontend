import React from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    application: {
      purple: '#9F15CF',
      green: '#2DD7CC',
      yellow: '#F8D93B',
      orange: '#EF9C17',
    },
    fonts: {
      text: '#464646',
    },
    messages: {
      error: '#FF5C5C',
      info: '#18A3DE',
      success: '#17B962',
    },
  },
  fontSizes: {
    small: '1em',
    medium: '2em',
    large: '3em',
  },
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;

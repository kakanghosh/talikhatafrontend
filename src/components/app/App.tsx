import React from 'react';
import './App.scss';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import routes from '../../routes/Routes';
import theme from '../../theme';
import GlobalStyles from '../../theme/GlobalStyle';

function App() {
  const routing = useRoutes(routes);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
}

export default App;

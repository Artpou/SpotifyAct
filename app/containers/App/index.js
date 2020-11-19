/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import CallbackPage from 'containers/CallbackPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import GlobalStyle from '../../global-styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1ED760',
    },
    secondary: {
      main: '#11cb5f',
    },
    background: {
      main: '#121212',
    },
    white: {
      main: '#fff',
    },
    gray: {
      main: '#3E3E3E',
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/callback" component={CallbackPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </ThemeProvider>
  );
}

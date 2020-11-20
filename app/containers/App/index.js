/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */
import React, { useEffect, useState } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import CallbackPage from 'containers/CallbackPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import { getArtists, getAlbums, getSingles } from './requests';

import GlobalStyle from '../../global-styles';
import ResponsiveDrawer from '../Template/ResponsiveDrawer';

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
  const [data, setData] = useState({
    artists: [],
    albums: [],
    singles: [],
    loading: false,
    loadingProgress: 'artists',
    loaded: false,
  });

  useEffect(() => {
    if (!data.loading && !data.loaded) {
      console.log(`load ${data.loadingProgress}`);
      switch (data.loadingProgress) {
        case 'artists':
          getArtists(setData);
          break;

        case 'albums':
          getAlbums(data.artists, setData);
          break;

        case 'single':
          getSingles(data.artists, setData);
          break;

        case 'finish':
          console.log(data);
          setData(prevState => ({
            ...prevState,
            loaded: true,
          }));
          break;

        default:
          break;
      }
    }
  }, [data]);

  const connected =
    localStorage.getItem('token') && localStorage.getItem('token') !== '';

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ResponsiveDrawer connected={connected}>
          <GlobalStyle />
          <Switch>
            <Route exact path="/" render={props => <HomePage data={data} />} />
            <Route exact path="/callback" component={CallbackPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </ResponsiveDrawer>
      </BrowserRouter>
    </ThemeProvider>
  );
}

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
import NotFoundPage from 'containers/NotFoundPage';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import { makeStyles } from '@material-ui/core';
import { getUser, getArtists, getAlbums, getSingles } from './requests';
import GlobalStyle from '../../global-styles';
import ResponsiveDrawer from '../Template/ResponsiveDrawer';
import AlbumsPage from '../AlbumsPage';
import SinglesPage from '../SinglesPage';
import ConnexionPage from '../ConnexionPage';

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

const useStyles = makeStyles({
  main: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
});

export default function App() {
  const classes = useStyles();
  const param = window.location.pathname;
  const connected =
    localStorage.getItem('token') && localStorage.getItem('token') !== '';

  const [data, setData] = useState({
    user: [],
    artists: [],
    albums: [],
    singles: [],
    loading: false,
    loadingProgress: 'user',
    loaded: false,
  });

  useEffect(() => {
    console.log(window.location.search);
    if (
      connected &&
      window.location.pathname !== '/callback' &&
      !data.loading &&
      !data.loaded
    ) {
      console.log(`load ${data.loadingProgress}`);
      switch (data.loadingProgress) {
        case 'user':
          getUser(setData);
          break;

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

        case 'error':
          console.log('error');
          break;

        default:
          break;
      }
    }
  }, [data]);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ResponsiveDrawer connected={connected}>
          <GlobalStyle />
          {connected ? (
            <Switch>
              <Route exact path="/" render={() => <HomePage data={data} />} />
              <Route
                exact
                path="/Albums"
                render={() => <AlbumsPage data={data} />}
              />
              <Route
                exact
                path="/Singles"
                render={() => <SinglesPage data={data} />}
              />
              <Route component={NotFoundPage} />
            </Switch>
          ) : (
            <Switch>
              <Route exact path="/callback" component={CallbackPage} />
              <Route component={() => <ConnexionPage />} />
            </Switch>
          )}
        </ResponsiveDrawer>
      </BrowserRouter>
    </ThemeProvider>
  );
}

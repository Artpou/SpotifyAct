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

import { Container, makeStyles } from '@material-ui/core';
import { getUser, getArtists, getAlbums, getSingles } from './requests';
import GlobalStyle from '../../global-styles';
import ResponsiveDrawer from './ResponsiveDrawer';
import AlbumsPage from '../AlbumsPage';
import SinglesPage from '../SinglesPage';
import ConnexionPage from '../ConnexionPage';
import NotificationBar from '../../components/NotificationBar';
import { NotificationProvider, useNotificationState } from './NotificationContext';

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
  root: {
    marginTop: '20px',
  },
});

export const SendNotificationContext = React.createContext();

export default function App() {
  const classes = useStyles();
  const [notification, setNotification] = React.useState({
    type: '',
    text: '',
  });

  const connected =
  sessionStorage.getItem('token') && sessionStorage.getItem('token') !== '';

  const [data, setData] = useState({
    user: [],
    artists: [],
    albums: [],
    singles: [],
    notification: 'test',
    loading: false,
    loadingProgress: 'user',
    loaded: false,
  });

  useEffect(() => {
    console.log(data);
    if (
      connected &&
      window.location.pathname !== '/callback' &&
      !data.loading &&
      !data.loaded
    ) {
      console.log(`load ${data.loadingProgress}`);
      switch (data.loadingProgress) {
        case 'user':
          getUser(setData, setNotification);
          break;

        case 'artists':
          getArtists(setData);
          break;

        case 'albums':
          getAlbums(data.artists, setData, setNotification);
          break;

        case 'single':
          getSingles(data.artists, setData, setNotification);
          break;

        case 'finish':
          setData(prevState => ({
            ...prevState,
            loaded: true,
          }));
          setNotification({type: 'success', text: 'chargement terminé !'})
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
          <Container className={classes.root}>
            <GlobalStyle />
            <SendNotificationContext.Provider value={setNotification}>
              <NotificationBar notification={notification} />
              {connected ? (
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={() => <HomePage data={data} />}
                  />
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
            </SendNotificationContext.Provider>
          </Container>
        </ResponsiveDrawer>
      </BrowserRouter>
    </ThemeProvider>
  );
}

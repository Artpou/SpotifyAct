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
import GlobalStyle from '../../global-styles';
import ResponsiveDrawer from './ResponsiveDrawer';
import AlbumsPage from '../AlbumsPage';
import SinglesPage from '../SinglesPage';
import ArtistsPage from '../ArtistsPage';
import ConnexionPage from '../ConnexionPage';
import NotificationBar from '../../components/NotificationBar';
import {
  NotificationProvider,
  useNotificationState,
} from './NotificationContext';

import { getUser, getArtists, getAlbums, getSingles } from '../../utils/requests';

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
    loaded: false,
  });

  const [loading, setLoading] = useState({
    text: "Chargement de l'utilsateur",
    progress: 0,
  });

  useEffect(() => {
    if (connected && window.location.pathname !== '/callback') {
      getUser().then(user => {
        setData(prevState => ({
          ...prevState,
          user,
        }));
        setLoading({
          text: "Chargement des artistes",
          progress: 5,
        });
        getArtists().then(artists => {
          setData(prevState => ({
            ...prevState,
            artists,
            progress: 20,
          }));
          setLoading({
            text: `Chargement des nouveaux albums`,
            progress: 5,
          });
          getAlbums(artists, setNotification, setLoading).then(albums => {
            setData(prevState => ({
              ...prevState,
              albums,
            }));
            setLoading(old => ({
              text: `Chargement des nouveaux singles`,
              progress: 60,
            }));
            getSingles(artists, setNotification, setLoading).then(singles => {
              setData(prevState => ({
                ...prevState,
                singles,
                loaded: true,
              }));
              setLoading({
                text: `Chargement terminé !`,
                progress: 100,
              });
              setNotification({
                type: 'success',
                text: '',
              })});
          });
        });
      });
    }
  }, []);

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
                    render={() => <HomePage data={data} loading={loading} />}
                  />
                  <Route
                    exact
                    path="/Albums"
                    render={() => <AlbumsPage data={data} loading={loading} />}
                  />
                  <Route
                    exact
                    path="/Singles"
                    render={() => <SinglesPage data={data} loading={loading} />}
                  />
                  <Route
                    exact
                    path="/Artists"
                    render={() => <ArtistsPage data={data} />}
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

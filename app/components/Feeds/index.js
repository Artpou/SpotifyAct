/**
 *
 * Feeds
 *
 */
import React, { useState, useEffect } from 'react';
import {
  Button,
  Grid,
  Container,
  CardContent,
  CircularProgress,
} from '@material-ui/core';
import axios from 'axios';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ListIcon from '@material-ui/icons/FormatListBulleted';
import GridIcon from '@material-ui/icons/Apps';

import test from './test';
import test2 from './test2';

// import PropTypes from 'prop-types';
// import styled from 'styled-components';

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  grid: {
    padding: '20px 0',
  },
  loadingGrid: {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '80vh',
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  loader: {
    padding: '50px',
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: '#121212',
    color: '#fff',
  },
  cardMedia: {
    paddingTop: '100%',
    transitionDuration: '0.35s',
    '&:hover, &:focus': {
      backgroundColor: '#000',
      opacity: 0.3,
    },
  },
  cardContent: {
    flexGrow: 1,
  },
  title: {
    color: '#fff',
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

function Feeds() {
  const [artists, setArtists] = useState();
  const [loadingArtists, setloadingArtists] = useState(true);
  const [albums, setAlbums] = useState([]);
  const [loadingAlbum, setloadingAlbum] = useState(true);
  const [single, setSingle] = useState([]);
  const [loadingSingle, setLoadingSingle] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(
    'chargement des artistes',
  );

  const classes = useStyles();

  function getAlbums(setList, setLoading, type = 'album', unloaded = artists) {
    const list = [];
    let loaded = 0;
    console.log(`${type} LOAD ALL`);
    artists.forEach(function iterate(artist, index) {
      const url = `https://api.spotify.com/v1/artists/${
        artist.id
      }/albums?offset=0&limit=3&include_groups=${type}&market=FR`;
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then(res => {
          // console.log(res);
          res.data.items.forEach(album => {
            if (new Date(album.release_date) > new Date('2020-11')) {
              if (!list.some(a => a.id === album.id)) {
                list.push(album);
              }
            }
          });
        })
        .catch(error => {
          console.log(`${type} ERROR ${index} : ${loaded}`);
          console.error(error);
          // setLoading(false);
        })
        .finally(() => {
          loaded++;
          unloaded.pop();
          // for the last request
          if (loaded === artists.length - 1) {
            list.sort((o1, o2) => {
              if (new Date(o1.release_date) < new Date(o2.release_date)) {
                return 1;
              }
              if (new Date(o1.release_date) > new Date(o2.release_date)) {
                return -1;
              }
              return 0;
            });
            setLoading(false);
            console.log(unloaded);
            console.log('END LOAD');
            setList(list);
          }
        });
    });
  }

  useEffect(() => {
    console.log('load artists');
    test().then(res => {
      setArtists(res);
      setloadingArtists(false);
    });
  }, []);

  useEffect(() => {
    if (loadingAlbum) {
      console.log(artists);
      // getAlbums(setAlbums, setloadingAlbum, 'album');
      test2(artists, 'albums');
      setLoadingProgress('chargement des albums');
      console.log('chargement des albums');
    }
  }, [loadingArtists]);

  useEffect(() => {
    if (loadingSingle && !loadingAlbum) {
      //getAlbums(setSingle, setLoadingSingle, 'single');
      setLoadingProgress('chargement des singles');
      console.log('chargement des singles');
    }
  }, [loadingAlbum]);

  const ListCards = props => (
    <Grid container className={classes.grid} spacing={4}>
      {props.list &&
        Array.from(props.list).map(album => (
          <Grid item key={album.id} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={album.images[1].url}
                title="Image title"
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  <a
                    className={classes.title}
                    href={album.external_urls.spotify}
                  >
                    {album.name}
                  </a>
                </Typography>
                <Typography>
                  Artiste(s) :
                  {Array.from(album.artists).map(artist => (
                    <div>
                      <a href={artist.external_urls.spotify}>{artist.name}</a>
                      <br />
                    </div>
                  ))}
                </Typography>
              </CardContent>
              <CardActions>
                <Typography>
                  {new Date(album.release_date).toLocaleDateString('fr-FR', {
                    month: 'long',
                    day: 'numeric',
                  })}
                </Typography>
              </CardActions>
            </Card>
          </Grid>
        ))}
    </Grid>
  );

  return (
    <div>
      {loadingSingle ? (
        <Container className={classes.loadingGrid}>
          <Container className={classes.loader}>
            <CircularProgress color="#1DB954" size={100} padding={100} />
          </Container>
          {loadingProgress}
        </Container>
      ) : (
        <Container className={classes.cardGrid} maxWidth="md">
          <h1>Nouvelles Sorties</h1>
          <h2>Nouveaux Albums</h2>
          <a>
            <ListIcon />
          </a>
          <GridIcon />
          <hr />
          <ListCards list={albums} />
          <h2>Nouveaux Singles</h2>
          <a>
            <ListIcon />
          </a>
          <GridIcon />
          <hr />
          <ListCards list={single} />
        </Container>
      )}
    </div>
  );
}

Feeds.propTypes = {};

export default Feeds;

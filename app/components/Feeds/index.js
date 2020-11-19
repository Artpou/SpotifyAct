/**
 *
 * Feeds
 *
 */
import React, { useState, useEffect } from 'react';
import {
  Grid,
  Container,
  CardContent,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core';

import {getAlbums, getArtists} from './requests';
import axios from 'axios';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ListIcon from '@material-ui/icons/FormatListBulleted';
import GridIcon from '@material-ui/icons/Apps';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const useStyles = makeStyles(theme => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
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
  toggleButton: {
    color: '#fff',
    padding: '4px',
    height: 'fit-content',
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
  listItem: {
    color: '#fff',
    background: '#121212',
    borderRadius: '4px',
    margin: '8px',
  },
  inline: {
    color: '#3E3E3E',
  },
  itemImg: {
    margin: '0 16px',
  },
  itemDate: {
    color: '#3E3E3E',
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
  const classes = useStyles();

  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [single, setSingle] = useState([]);

  const [loadingArtists, setloadingArtists] = useState(true);
  const [loadingAlbum, setloadingAlbum] = useState(true);
  const [loadingSingle, setLoadingSingle] = useState(true);
  const [displayList, setDisplayList] = useState('grid');

  const [loadingProgress, setLoadingProgress] = useState(
    'chargement des artistes',
  );

  useEffect(() => {
    console.log('load artists');
    getArtists(setArtists, setloadingArtists);
  }, []);

  useEffect(() => {
    if (loadingAlbum && !loadingArtists) {
      console.log('chargement des albums');
      getAlbums(artists, setAlbums, setloadingAlbum, 'album');
      setLoadingProgress('chargement des albums');
    }
  }, [loadingArtists]);

  useEffect(() => {
    if (loadingSingle && !loadingAlbum) {
      getAlbums(artists, setSingle, setLoadingSingle, 'single');
      setLoadingProgress('chargement des singles');
      console.log('chargement des singles');
    }
  }, [loadingAlbum]);

  const handleDisplayList = (event, value) => {
    if (value) {
      setDisplayList(value);
    }
  };

  const handlePlayButton = (event, value) => {
    if (value) {
      setDisplayList(value);
    }
  };

  const toggleDisplayList = (
    <ToggleButtonGroup
      value={displayList}
      exclusive
      onChange={handleDisplayList}
      aria-label="text alignment"
    >
      <ToggleButton
        className={classes.toggleButton}
        value="list"
        checked={displayList === 'list'}
      >
        <ListIcon />
      </ToggleButton>
      <ToggleButton
        className={classes.toggleButton}
        value="grid"
        checked={displayList === 'grid'}
      >
        <GridIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );

  const ListCards = props => (
    <Grid container className={classes.grid} spacing={4}>
      {props.list &&
        Array.from(props.list).map(album => (
          <Grid item key={album.id} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <a href={album.external_urls.spotify}>
                <CardMedia
                  className={classes.cardMedia}
                  image={album.images[1].url}
                  title="Image title"
                />
              </a>
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  <a
                    className={classes.title}
                    href={album.external_urls.spotify}
                  >
                    {album.name}
                  </a>
                </Typography>
                <Typography component="span">
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
                <Typography component="span">
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

  const ListItems = props => (
    <List className={classes.root}>
      {props.list &&
        Array.from(props.list).map(album => (
          <ListItem key={album.id} className={classes.listItem} disableGutters>
            <ListItemAvatar className={classes.itemImg}>
              <a href={album.external_urls.spotify}>
                <CardMedia
                  className={classes.cardMedia}
                  image={album.images[1].url}
                  title="Image title"
                />
              </a>
            </ListItemAvatar>
            <ListItemText
              primary={
                <React.Fragment>
                  <a
                    className={classes.title}
                    href={album.external_urls.spotify}
                  >
                    {album.name}
                  </a>
                </React.Fragment>
              }
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {Array.from(album.artists).map((artist, index) => (
                      <span>
                        <a href={artist.external_urls.spotify}>{artist.name}</a>
                        {index < album.artists.length - 1 && ', '}
                      </span>
                    ))}
                  </Typography>
                  <br />
                  <span className={classes.itemDate}>
                    {new Date(album.release_date).toLocaleDateString('fr-FR', {
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </React.Fragment>
              }
            />
          </ListItem>
        ))}
    </List>
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
          <div className={classes.header}>
            <h2>Nouveaux Albums</h2>
            {toggleDisplayList}
          </div>
          <hr />
          {displayList === 'grid' ? (
            <ListCards list={albums} />
          ) : (
            <ListItems list={albums} />
          )}

          <div className={classes.header}>
            <h2>Nouveaux Singles</h2>
            {toggleDisplayList}
          </div>
          <hr />
          {displayList === 'grid' ? (
            <ListCards list={single} />
          ) : (
            <ListItems list={single} />
          )}
        </Container>
      )}
    </div>
  );
}

Feeds.propTypes = {};

export default Feeds;

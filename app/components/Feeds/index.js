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
  Button,
  Tooltip,
  Link,
} from '@material-ui/core';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ListIcon from '@material-ui/icons/FormatListBulleted';
import GridIcon from '@material-ui/icons/Apps';
import PlayIcon from '@material-ui/icons/PlayCircleOutline';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { putPlayMusic } from '../../utils/requests';

const useStyles = makeStyles(theme => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  icon: {
    fontSize: '32px',
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
      content: 'hihi',
    },
  },
  cardContent: {
    flexGrow: 1,
  },
  cardFooter: {
    justifyContent: 'space-between',
    padding: '12px',
  },
  cardFooterInner: {
    marginRight: '8px',
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
    margin: '0 12px',
    minWidth: '64px',
  },
  itemDate: {
    color: '#3E3E3E',
  },
  playButton: {
    margin: '0 16px 0 8px',
    fontSize: '32px',
  },
  title: {
    color: '#fff',
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export function ListCards(props) {
  const classes = useStyles();
  return (
    <Grid container className={classes.grid} spacing={4}>
      {props.list &&
        Array.from(props.max ? props.list.slice(0, props.max) : props.list).map(
          album => (
            <Grid item key={album.id} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <button type="button" onClick={() => putPlayMusic(album.uri)}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={album.images[1].url}
                  />
                </button>
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
                <CardActions className={classes.cardFooter}>
                  <Button
                    color="primary"
                    onClick={() => putPlayMusic(album.uri)}
                  >
                    play
                  </Button>
                  <Typography
                    component="span"
                    className={classes.cardFooterInner}
                  >
                    {new Date(album.release_date).toLocaleDateString('fr-FR', {
                      month: 'long',
                      day: 'numeric',
                    })}
                  </Typography>
                </CardActions>
              </Card>
            </Grid>
          ),
        )}
    </Grid>
  );
}

function ListItems(props) {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      {props.list &&
        Array.from(props.max ? props.list.slice(0, props.max) : props.list).map(
          album => (
            <ListItem
              key={album.id}
              className={classes.listItem}
              disableGutters
            >
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
                          <a href={artist.external_urls.spotify}>
                            {artist.name}
                          </a>
                          {index < album.artists.length - 1 && ', '}
                        </span>
                      ))}
                    </Typography>
                    <br />
                    <span className={classes.itemDate}>
                      {new Date(album.release_date).toLocaleDateString(
                        'fr-FR',
                        {
                          month: 'long',
                          day: 'numeric',
                        },
                      )}
                    </span>
                  </React.Fragment>
                }
              />
              <button type="button" onClick={() => putPlayMusic(album.uri)}>
                <PlayIcon color="primary" className={classes.playButton} />
              </button>
            </ListItem>
          ),
        )}
    </List>
  );
}

function Feeds(props) {
  const classes = useStyles();
  const [displayList, setDisplayList] = useState('grid');

  const handleDisplayList = (event, value) => {
    if (value) {
      setDisplayList(value);
    }
  };

  const resultList = (
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
        <ListIcon className={classes.icon} />
      </ToggleButton>
      <ToggleButton
        className={classes.toggleButton}
        value="grid"
        checked={displayList === 'grid'}
      >
        <GridIcon className={classes.icon} />
      </ToggleButton>
    </ToggleButtonGroup>
  );

  return (
    <div>
      {!props.data.loaded ? (
        <Container className={classes.loadingGrid}>
          <Container className={classes.loader}>
            <CircularProgress color="#1DB954" size={100} padding={100} />
          </Container>
          {`chargement des ${props.data.loadingProgress}`}
        </Container>
      ) : (
        <Container className={classes.cardGrid} maxWidth="md">
          <Typography color="primary">
            <h1>Nouvelles Sorties</h1>
          </Typography>
          <div className={classes.header}>
            <h2>Nouveaux Albums ({props.data.albums.length})</h2>
            {resultList}
          </div>
          <hr />
          {displayList === 'grid' ? (
            <ListCards list={props.data.albums} max={3} />
          ) : (
            <ListItems list={props.data.albums} />
          )}

          <div className={classes.header}>
            <h2>Nouveaux Singles ({props.data.singles.length})</h2>
            {resultList}
          </div>
          <hr />
          {displayList === 'grid' ? (
            <ListCards list={props.data.singles} />
          ) : (
            <ListItems list={props.data.singles} />
          )}
        </Container>
      )}
    </div>
  );
}

Feeds.propTypes = {};

export default Feeds;

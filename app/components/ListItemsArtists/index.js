/**
 *
 * ListItemsArtists
 *
 */

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import PlayIcon from '@material-ui/icons/PlayCircleFilled';
import { PlayCircleFilled } from '@material-ui/icons';
import { SendNotificationContext } from '../../containers/App';
import { putPlayMusic } from '../../utils/requests';

const useStyles = makeStyles(theme => ({
  grid: {
    padding: '20px 0',
  },
  gridItem: {
    // minWidth: '200px',
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
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: '#121212',
    color: '#fff',
  },
  cardContent: {
    flexGrow: 1,
  },
  title: {
    color: '#fff',
  },
  cardNew: {
    margin: '10px 0',
    padding: '10px 2px',
    backgroundColor: '#181818',
    color: '#fff',
  },
  cardFooter: {
    justifyContent: 'space-between',
    padding: '12px',
  },
  cardFooterInner: {
    marginRight: '8px',
    display: 'flex',
    alignContent: 'space-between',
  },
  btnNew: {
    width: '100%',
    textAlign: 'justify',
  },
  playBtn: {
    color: '#1ED760',
    marginRight: '8px',
  },
}));

function ListItemsArtists(props) {
  const classes = useStyles();
  const [artists, setArtists] = React.useState([]);
  const setNotification = React.useContext(SendNotificationContext);

  React.useEffect(() => {
    // setArtists(props.data.artists);
    let sort = [];
    props.data.albums.map(album => {
      sort = [...sort, album.artists[0].id];
    });
    props.data.singles.map(single => {
      sort = [...sort, single.artists[0].id];
    });

    /* var filtered = props.data.artists.filter(function(value, index, arr){ 
      return sort.includes(value.id);
    }); */

    const tmp = props.data.artists;
    tmp.forEach(function sortByNew(item, i) {
      if (sort.includes(item.id)) {
        tmp.splice(i, 1);
        tmp.unshift(item);
      }
    });
    setArtists(tmp);
  }, []);

  function AlbumCard(props) {
    const album = props.data.albums.find(obj => obj.artists[0].id === props.id);
    return (
      <button
        className={classes.btnNew}
        type="button"
        onClick={() =>
          putPlayMusic(album.uri).then(res =>
            setNotification({
              type: 'play',
              text: `${album.name} de ${album.artists[0].name}`,
            }),
          )
        }
      >
        <Card className={classes.cardNew}>
          <PlayIcon className={classes.playBtn} />
          Nouvelle album
        </Card>
      </button>
    );
  }

  function SingleCard(props) {
    const single = props.data.singles.find(
      obj => obj.artists[0].id === props.id,
    );
    return (
      <button
        className={classes.btnNew}
        type="button"
        onClick={() =>
          putPlayMusic(single.uri).then(res =>
            setNotification({
              type: 'play',
              text: `${single.name} de ${single.artists[0].name}`,
            }),
          )
        }
      >
        <Card className={classes.cardNew}>
          <PlayIcon className={classes.playBtn} />
          Nouveau single
        </Card>
      </button>
    );
  }

  return (
    <Grid container className={classes.grid} spacing={2}>
      {artists &&
        Array.from(artists).map(artist => (
          <Grid
            item
            key={artist.id}
            xs={12}
            sm={12}
            md={4}
            lg={props.reduced ? 4 : 3}
            xl={props.reduced ? 4 : 2}
          >
            <Card className={classes.card}>
              <a href={artist.external_urls.spotify}>
                <CardMedia
                  className={classes.cardMedia}
                  height={300}
                  image={artist.images[1].url}
                />
              </a>
              <CardContent className={classes.cardContent}>
                <Typography>
                  <a
                    className={classes.title}
                    href={artist.external_urls.spotify}
                  >
                    {artist.name}
                  </a>
                </Typography>
                {props.data.albums.some(e => e.artists[0].id === artist.id) && (
                  <AlbumCard data={props.data} id={artist.id} />
                )}
                {props.data.singles.some(
                  e => e.artists[0].id === artist.id,
                ) && <SingleCard data={props.data} id={artist.id} />}
              </CardContent>
              <CardActions className={classes.cardFooter}>
                <Button
                  color="primary"
                  onClick={() =>
                    putPlayMusic(album.uri, setNotification).then(res =>
                      setNotification({
                        type: 'play',
                        text: `${album.name} de ${album.artists[0].name}`,
                      }),
                    )
                  }
                >
                  play
                </Button>
                <Typography style={{ textAlign: 'end' }}>
                  {artist.followers.total
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}{' '}
                  followers
                </Typography>
              </CardActions>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
}

ListItemsArtists.propTypes = {};

export default ListItemsArtists;

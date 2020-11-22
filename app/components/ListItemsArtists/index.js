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
  cardFooter: {
    justifyContent: 'space-between',
    padding: '12px',
  },
  cardFooterInner: {
    marginRight: '8px',
    display: 'flex',
    alignContent: 'space-between',
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
                  <Card>Nouvelle Album !</Card>
                )}
                {props.data.singles.some(
                  e => e.artists[0].id === artist.id,
                ) && <Card>Nouveau Single !</Card>}
              </CardContent>
              <CardActions className={classes.cardFooter}>
                <Button
                  color="primary"
                  /* onClick={() =>
                      putPlayMusic(album.uri, setNotification).then(res =>
                        setNotification({
                          type: 'play',
                          text: `${album.name} de ${album.artists[0].name}`,
                        }),
                      )
                    } */
                >
                  play
                </Button>
                {artist.followers.total
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}{' '}
                followers
              </CardActions>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
}

ListItemsArtists.propTypes = {};

export default ListItemsArtists;

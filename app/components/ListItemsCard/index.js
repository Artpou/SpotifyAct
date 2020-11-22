/**
 *
 * ListItemsCard
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
import { useNotificationState } from '../../containers/App/NotificationContext';
import { putPlayMusic } from '../../utils/requests';
import messages from './messages';

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
  },
}));

function ListItemsCard(props) {
  const classes = useStyles();

  return (
    <Grid container className={classes.grid} spacing={2}>
      {props.list &&
        Array.from(props.reduced ? props.list.slice(0, 3) : props.list).map(
          album => (
            <Grid
              item
              key={album.id}
              xs={12}
              sm={12}
              md={4}
              lg={props.reduced ? 4 : 3}
              xl={props.reduced ? 4 : 2}
            >
              <Card className={classes.card}>
                <button
                  type="button"
                  onClick={() => putPlayMusic(album.uri, props.data)}
                >
                  <CardMedia
                    className={classes.cardMedia}
                    height={300}
                    image={album.images[1].url}
                  />
                </button>
                <CardContent className={classes.cardContent}>
                  <Typography>
                    <a
                      className={classes.title}
                      href={album.external_urls.spotify}
                    >
                      {album.name}
                    </a>
                  </Typography>
                  <Typography component="span">
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
                      month: 'numeric',
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

ListItemsCard.propTypes = {};

export default ListItemsCard;

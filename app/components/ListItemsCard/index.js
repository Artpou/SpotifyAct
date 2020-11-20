/**
 *
 * ListItemsCard
 *
 */

import { Button, Card, CardActions, CardContent, CardMedia, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import { putPlayMusic } from '../../utils/requests';
import messages from './messages';

const useStyles = makeStyles(theme => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  grid: {
    padding: '20px 0',
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
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

ListItemsCard.propTypes = {};

export default ListItemsCard;

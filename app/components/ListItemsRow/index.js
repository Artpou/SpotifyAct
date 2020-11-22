/**
 *
 * ListItemsRow
 *
 */

import {
  CardMedia,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import PlayIcon from '@material-ui/icons/PlayCircleOutline';
import { putPlayMusic } from '../../utils/requests';
import { SendNotificationContext } from '../../containers/App';

const useStyles = makeStyles(() => ({
  cardMedia: {
    paddingTop: '100%',
    transitionDuration: '0.35s',
    '&:hover, &:focus': {
      backgroundColor: '#000',
      opacity: 0.3,
      content: 'hihi',
    },
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
}));

function ListItemsRow(props) {
  const classes = useStyles();
  const setNotification = React.useContext(SendNotificationContext);

  return (
    <List className={classes.root}>
      {props.list &&
        Array.from(props.reduced ? props.list.slice(0, 3) : props.list).map(
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

              <button
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
                <PlayIcon color="primary" className={classes.playButton} />
              </button>
            </ListItem>
          ),
        )}
    </List>
  );
}

ListItemsRow.propTypes = {};

export default ListItemsRow;

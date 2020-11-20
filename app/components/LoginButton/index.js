/**
 *
 * LoginButton
 *
 */

import React from 'react';
import { Button } from '@material-ui/core';
import querystring from 'querystring';
import { makeStyles } from '@material-ui/core/styles';
import { SpotifyData } from '../../utils/spotify';

const useStyles = makeStyles(() => ({
  button: {
    margin: '20px',
    background: '#1DB954',
  },
}));

function LoginButton() {
  const classes = useStyles();

  function connect() {
    window.location.href = `https://accounts.spotify.com/authorize?${querystring.stringify(
      {
        response_type: SpotifyData.response_type,
        client_id: SpotifyData.clientId,
        scope: SpotifyData.scope,
        redirect_uri: SpotifyData.redirect_uri,
        state: SpotifyData.state,
      },
    )}`;
  }

  return (
    <Button className={classes.button} variant="contained" onClick={connect}>
      Login
    </Button>
  );
}

LoginButton.propTypes = {};

export default LoginButton;

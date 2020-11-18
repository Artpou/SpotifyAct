/**
 *
 * LoginButton
 *
 */

import React from 'react';
import { Button } from '@material-ui/core';
import querystring from 'querystring';
import { SpotifyData } from '../../utils/spotify';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function LoginButton() {
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
    <div>
      <Button variant="contained" onClick={connect}>
        Login
      </Button>
    </div>
  );
}

LoginButton.propTypes = {};

export default LoginButton;

/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useState } from 'react';
import { Container, Typography } from '@material-ui/core';
import Loader from '../../components/Loader';
import LoginButton from '../../components/LoginButton';
import ListItems from '../../components/ListItems';
import { Link } from 'react-router-dom';

function Homi(props) {
  const [albums, setAlbums] = useState(props.data.albums);

  return (
    <div>
      <Typography color="primary">
        <h1>Nouveaux Albums</h1>
      </Typography>
      {!props.data.loaded ? (
        <Loader text={props.data.loadingProgress} />
      ) : (
        <div>
          <ListItems name="albums" list={albums} max={3} />
        </div>
      )}
    </div>
  );
}

export default function AlbumsPage(props) {
  const connected =
    localStorage.getItem('token') && localStorage.getItem('token') !== '';

  return (
    <Container>
      {connected ? (
        <Homi data={props.data} />
      ) : (
        <h1>
          Connectez-vous avec votre compte Spotify pour commencer à utiliser
          SpotifyActivity
          <LoginButton />
        </h1>
      )}
    </Container>
  );
}

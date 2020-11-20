/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import Loader from '../../components/Loader';
import LoginButton from '../../components/LoginButton';
import ListItems from '../../components/ListItems';
import { Typography } from '@material-ui/core';

function Homi(props) {
  return (
    <div>
      <Typography color="primary">
        <h1>Nouvelles Sorties</h1>
      </Typography>
      {!props.data.loaded ? (
        <Loader text={props.data.loadingProgress} />
      ) : (
        <ListItems data={props.data} max={3} />
      )}
    </div>
  );
}

export default function HomePage(props) {
  const connected =
    localStorage.getItem('token') && localStorage.getItem('token') !== '';

  return (
    <div>
      {connected ? (
        <Homi data={props.data} />
      ) : (
        <h1>
          Connectez-vous avec votre compte Spotify pour commencer à utiliser
          SpotifyActivity
          <LoginButton />
        </h1>
      )}
    </div>
  );
}

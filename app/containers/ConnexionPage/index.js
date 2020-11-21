/**
 *
 * ConnexionPage
 *
 */
import { Container } from '@material-ui/core';
import React from 'react';
import LoginButton from '../../components/LoginButton';

export function ConnexionPage() {
  return (
    <Container>
      Connectez-vous avec Spotify pour commencer à utiliser Spotify Activity
      <br />
      <LoginButton />
    </Container>
  );
}

export default ConnexionPage;

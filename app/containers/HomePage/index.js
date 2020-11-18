/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import styled from 'styled-components';
import CarouselTitle from '../../components/Carousel';
import Feeds from '../../components/Feeds';
import LoginButton from '../../components/LoginButton';
import ResponsiveDrawer from '../Template/ResponsiveDrawer';

const Title = styled.h1`
  text-align: center;
  padding: 50px;
`;

export default function HomePage() {
  const connected =
    localStorage.getItem('token') && localStorage.getItem('token') !== '';

  const content = connected ? (
    <div>
      <Feeds />
    </div>
  ) : (
    <Title>
      Connectez-vous avec votre compte Spotify pour commencer à utiliser
      SpotifyActivity
      <LoginButton />
    </Title>
  );

  console.log(localStorage.getItem('token'));
  return <ResponsiveDrawer content={content} />;
}

/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import ListItems from '../../components/ListItems';

export default function HomePage(props) {
  return (
    <Container>
      <Typography color="primary">
        <h1>Nouvelles Sorties</h1>
      </Typography>
      {!props.data.loaded ? (
        <Loader text={props.data.loadingProgress} />
      ) : (
        <div>
          <ListItems name="albums" list={props.data.albums} max={3} />
          <Link to="/Albums">
            <h2>Tout voir</h2>
          </Link>
          <ListItems name="singles" list={props.data.singles} max={3} />
          <Link to="/Singles">
            <h2>Tout voir</h2>
          </Link>
        </div>
      )}
    </Container>
  );
}

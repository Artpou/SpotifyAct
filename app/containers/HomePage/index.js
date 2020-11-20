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
          <ListItems name="albums" list={props.data.albums} reduced />
          <Link to="/Albums">
            <Typography color="primary">
              <h1>Tout voir</h1>
            </Typography>
          </Link>
          <ListItems name="singles" list={props.data.singles} reduced />
          <Link to="/Singles">
            <Typography color="primary">
              <h1>Tout voir</h1>
            </Typography>
          </Link>
        </div>
      )}
    </Container>
  );
}

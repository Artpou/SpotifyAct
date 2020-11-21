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
      {!props.data.loaded ? (
        <Loader text={props.data.loadingProgress} />
      ) : (
        <div>
          <Typography color="primary">
            <h1>Nouvelles Sorties</h1>
          </Typography>
          <ListItems
            name="albums"
            link="/Albums"
            list={props.data.albums}
            reduced
          />
          <ListItems
            name="singles"
            link="/Singles"
            list={props.data.singles}
            reduced
          />
        </div>
      )}
    </Container>
  );
}

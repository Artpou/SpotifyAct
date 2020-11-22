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
  function Home() {
    return props.data.artists.length > 0 ? (
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
    ) : (
      <div>
        <Typography color="primary">
          <h1>Vous ne suivez aucun artistes !</h1>
        </Typography>
        <span>Rendez-vous sur spotify pour suivre vos artistes préférés ! </span>
      </div>
    );
  }

  return !props.data.loaded ? (
    <Loader text={props.data.loadingProgress} />
  ) : (
    <Home />
  );
}

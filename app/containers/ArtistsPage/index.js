/*
 * ArtistsPage
 *
 *
 */
import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import ListItems from '../../components/ListItems';
import ListItemsArtists from '../../components/ListItemsArtists';

export default function ArtistsPage(props) {
  return !props.data.loaded ? (
    <Loader />
  ) : (
    <ListItemsArtists data={props.data}/>
  );
}

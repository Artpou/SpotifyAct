/*
 * AlbumsPage
 *
 *
 */
import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import ListItems from '../../components/ListItems';

export default function AlbumsPage(props) {
  return !props.data.loaded ? (
    <Loader />
  ) : (
    <div>
      <ListItems name="albums" list={props.data.albums} />
    </div>
  );
}

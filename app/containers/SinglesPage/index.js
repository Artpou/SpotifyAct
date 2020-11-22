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

export default function SinglesPage(props) {
  return !props.data.loaded ? (
    <Loader text={props.data.loadingProgress} />
  ) : (
    <div>
      <ListItems name="singles" list={props.data.singles} />
    </div>
  );
}

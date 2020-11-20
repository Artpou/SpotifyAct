/**
 *
 * Loader
 *
 */
import { CircularProgress, Container, makeStyles } from '@material-ui/core';
import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

const useStyles = makeStyles(theme => ({
  loaderContainer: {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '60vh',
  },
  loader: {
    padding: '50px',
  },
}));

function Loader(props) {
  const classes = useStyles();
  return (
    <Container className={classes.loaderContainer}>
      <Container className={classes.loader}>
        <CircularProgress color="#1DB954" size={100} padding={100} />
      </Container>
      {`chargement des ${props.text}`}
    </Container>
  );
}

Loader.propTypes = {};

export default Loader;

/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import messages from './messages';
import { Container } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    background: '#181818',
    color: '#fff',
    minHeight: '100vh',
    justifyContent: 'center',
    textAlign: 'center',
  },
}));

export default function NotFound() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h1>
        <FormattedMessage {...messages.header} />
      </h1>
    </div>
  );
}

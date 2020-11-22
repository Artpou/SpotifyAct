/**
 *
 * NotificationBar
 *
 */

import { makeStyles, Snackbar, Toolbar } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { Alert } from '@material-ui/lab';
import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';

// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

const useStyles = makeStyles(theme => ({
  bar: {
    top: 0,
    width: '100%',
    position: 'static',
    transform: 'none',
    margin: '10px 0',
  },
  alert: {
    width: '75%',
    backgroundColor: '#1ED760',
  },
}));

function NotificationBar(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (props.notification && props.notification.text !== '') {
      setOpen(true);
    }
  }, [props.notification]);

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <Snackbar
        open={open}
        className={classes.bar}
        autoHideDuration={3500}
        onClose={handleClose}
      >
        <Alert className={classes.alert} variant="outline" severity={props.notification.type} onClose={handleClose}>
          {props.notification.text}
        </Alert>
      </Snackbar>
    </div>
  );
}

NotificationBar.propTypes = {};

export default NotificationBar;

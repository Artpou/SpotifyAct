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
import PlayIcon from '@material-ui/icons/PlayCircleOutline';
import LoopIcon from '@material-ui/icons/Loop';
import CheckIcon from '@material-ui/icons/Check';

// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { drawerWidth } from '../../containers/App/ResponsiveDrawer';

const useStyles = makeStyles(theme => ({
  bar: {
    transform: 'none',
    margin: '20px 0',
    left: 0,
    bottom: 0,
    width: '100%',
    height: 'fit-content',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: drawerWidth,
    },
  },
  alert: {
    width: '75%',
    color: '#000',
    backgroundColor: '#1ED760',
  },
  icon: {
    color: '#000',
    alignSelf: 'center',
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

  function renderSwitch(alert) {
    switch(alert) {
      case 'play':
        return <PlayIcon className={classes.icon} />;
      case 'reload':
        return <LoopIcon className={classes.icon} />;
      default:
        return <CheckIcon className={classes.icon} />;
    }
  }

  return (
    <div>
      <Snackbar
        open={open}
        className={classes.bar}
        autoHideDuration={2500}
        onClose={handleClose}
      >
        <Alert
          className={classes.alert}
          severity={props.notification.type}
          onClose={handleClose}
          icon={renderSwitch(props.notification.type)}
        >
          {props.notification.text}
        </Alert>
      </Snackbar>
    </div>
  );
}

NotificationBar.propTypes = {};

export default NotificationBar;

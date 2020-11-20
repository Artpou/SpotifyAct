/**
 *
 * LogoutButton
 *
 */

import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

const useStyles = makeStyles(() => ({
  profil: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  profilName: {
    color: '#1DB954',
    padding: '20px',
    fontSize: '1.25rem',
    textAlign: 'center',
    '&:hover, &:focus': {
      color: '#1DB954',
    },
  },
}));

function LogoutButton() {
  const [, setUser] = useState('');

  function disconnect() {
    localStorage.setItem('token', '');
    window.location.reload(false);
  }

  /*
  <Container className={classes.profil}>
      <a href={user.href} className={classes.profilName}>
        {user.display_name}
      </a>
  </Container>
  */
  return (
    <Button variant="contained" onClick={disconnect}>
      Logout
    </Button>
  );
}

LogoutButton.propTypes = {};

export default LogoutButton;

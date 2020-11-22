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

  function disconnect() {
    sessionStorage.setItem('token', '');
    sessionStorage.setItem('refresh_token', '');
    sessionStorage.setItem('show_dialog', false);
    window.location.reload(false);
  }

  return (
    <Button variant="contained" onClick={disconnect}>
      Logout
    </Button>
  );
}

LogoutButton.propTypes = {};

export default LogoutButton;

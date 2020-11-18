/**
 *
 * LogoutButton
 *
 */

import React, { useState, useEffect } from 'react';
import { Button, Container } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import axios from 'axios';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

const useStyles = makeStyles(theme => ({
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
  const classes = useStyles();
  const [user, setUser] = useState('');

  function disconnect() {
    localStorage.setItem('token', '');
    window.location.reload(false);
  }

  function getProfil(next = '') {
    const nextPath = next !== '' ? `&after=${next}` : '';
    const url = `https://api.spotify.com/v1/me`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(res => {
        console.log(res);
        setUser(res.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  useEffect(() => {
    getProfil();
  }, []);

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

/**
 *
 * LogoutButton
 *
 */

import React from 'react';
import { Button } from '@material-ui/core';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function LogoutButton() {
  function disconnect() {
    localStorage.setItem('token', '');
    window.location.reload(false);
  }

  return (
    <div>
      <Button variant="contained" onClick={disconnect}>
        Logout
      </Button>
    </div>
  );
}

LogoutButton.propTypes = {};

export default LogoutButton;

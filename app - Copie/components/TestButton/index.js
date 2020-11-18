/**
 *
 * TestButton
 *
 */

import React from 'react';
import { GetArtists } from '../../utils/request/spotifyArtist';

// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function TestButton() {
  return (
    <div>
      <GetArtists />
      <div>test</div>
    </div>
  );
}

TestButton.propTypes = {};

export default TestButton;

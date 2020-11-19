/**
 *
 * HeaderFeeds
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function HeaderFeeds() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

HeaderFeeds.propTypes = {};

export default HeaderFeeds;

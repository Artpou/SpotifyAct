/**
 *
 * CallbackPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectCallbackPage from './selectors';
import reducer from './reducer';
import saga from './saga';

export function CallbackPage() {
  useInjectReducer({ key: 'callbackPage', reducer });
  useInjectSaga({ key: 'callbackPage', saga });

  return <div />;
}

CallbackPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  callbackPage: makeSelectCallbackPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(CallbackPage);

/**
 *
 * CallbackPage
 *
 */
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import axios from 'axios';
import qs from 'qs';
import { SpotifyData } from '../../utils/spotify';
import Loader from '../../components/Loader';

export function CallbackPage(props) {
  const code = props.location.search
    .substr(1)
    .replace('code=', '')
    .replace(/&state=.*/, '');

  const url = 'https://accounts.spotify.com/api/token';

  const headers = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    auth: {
      username: SpotifyData.clientId,
      password: SpotifyData.clientSecret,
    },
  };
  const data = {
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: SpotifyData.redirect_uri,
  };

  axios
    .post(url, qs.stringify(data), headers)
    .then(res => {
      console.log(res);
      localStorage.setItem('token', res.data.access_token);
      localStorage.setItem('refreshToken', res.data.refresh_token);
      document.location.replace('/');
    })
    .catch(err => {
      console.log("failed load token");
    });

  return <Loader text="connexion" />;
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(CallbackPage);

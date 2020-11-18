/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import LoginButton from '../../components/LoginButton';
import LogoutButton from '../../components/LogoutButton';
import messages from './messages';
import TestButton from '../../components/TestButton';


const Title = styled.h1`
  text-align: center;
`;

export default function HomePage() {
  console.log(localStorage.getItem('token'));
  return (
    <div>
      <Title>
        <FormattedMessage {...messages.header} />{' '}
      </Title>
      {localStorage.getItem('token') === '' ? (
        <LoginButton />
      ) : (
        <div>
          <LogoutButton />
          <TestButton />
        </div>
      )}
    </div>
  );
}

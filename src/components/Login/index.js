import React, {Component} from 'react';
import styled from 'styled-components';
import Store from '../../state/Store';

import { fetchAPI, createAPIUrl } from '../../state/utils';
import { useAuth0 } from "../../utils/auth0";

import ButtonRound from '../ButtonRound/';

const Login = p => {
  const { isAuthenticated, getTokenSilently, loginWithRedirect, logout, loading, user } = useAuth0();

  const handleClick = (type) => {
    if (type == 'login') {
      loginWithRedirect({})
    } else if (type == 'logout') {
      logout();
    }
  }

  return (
    <>
      { !isAuthenticated && (<ButtonRound toggle={() => handleClick('login')}>Registrieren / Einloggen</ButtonRound>)}
      { isAuthenticated && (<ButtonRound toggle={() => handleClick('logout')}>Ausloggen</ButtonRound>)}
    </>
  )
}

export default Login;
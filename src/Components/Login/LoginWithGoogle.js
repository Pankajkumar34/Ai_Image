"use client"

import React, { useState, useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';

const clientId = process.env.REACT_APP_GOOGLE_OATH_CLIENT_ID;

const LoginWithGoogle = ({ tryForFree = () => {}, setModalOpen = () => {} }) => {
  const [isLogin, setIsLogin] = useState(false);

  const loadGapi = async () => {
    if (typeof window !== 'undefined') {
      await import('gapi-script').then((gapi ) => {
        gapi.load('client:auth2', () => {
          gapi.client.init({
            clientId: clientId,
            scope: '',
          });
        });
      });
    }
  };

  useEffect(() => {
    loadGapi();
  }, []);

  const onSuccess = async (res) => {
    const data = res;
    const userData = { email: data.profileObj.email };

    // register free requests
    const isRegistered = await tryForFree(data.profileObj.email);
    if (!isRegistered) {
      return alert('Register free requests server error, please try later');
    }

    // store user registered data in local storage
    if (typeof window !== 'undefined') {
      localStorage.setItem('userData', JSON.stringify(userData));
    }
    setIsLogin(true);
    setModalOpen(false);
  };

  const onFailure = (err) => {
    console.log('failed:', err);
  };

  return (
    <>
      {!isLogin ? (
        <GoogleLogin
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
        />
      ) : null}
    </>
  );
};

export default LoginWithGoogle;


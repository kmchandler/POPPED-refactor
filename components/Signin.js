import React from 'react';
import Image from 'next/image';
import { signIn } from '../utils/auth';
import logo2 from './logo2.png';

function Signin() {
  return (
    <div className="loginPage">
      <h1 className="loginWelcome">welcome to</h1>
      <Image src={logo2} className="logoSignIn" />
      <br />
      <h3 className="loginTagline">pick your flick before the popcorn&apos;s ready</h3>
      <br />
      <button type="button" className="loginButton" onClick={signIn}>
        sign in here
      </button>
    </div>
  );
}

export default Signin;

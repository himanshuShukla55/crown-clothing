import { useState, useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import {
  auth,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInWithGoogleRedirect,
  signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './sign-in-form.style.scss';

const SignIn = () => {
  const defaultLoginCredentials = {
    email: '',
    password: '',
  };
  const [loginCredentials, setLoginCredentials] = useState(
    defaultLoginCredentials
  );
  const { email, password } = loginCredentials;

  const handleChange = ({ target }) => {
    setLoginCredentials({ ...loginCredentials, [target.name]: target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      setLoginCredentials(defaultLoginCredentials);
    } catch (error) {
      if (error.code == 'auth/wrong-password') alert('Invalid Password');
      else if (error.code == 'auth/user-not-found')
        alert('Invalid Username, user does not exist');
      else console.log(error.message);
    }
  };

  useEffect(() => {
    (async () => {
      const response = await getRedirectResult(auth);
      if (response && response.hasOwnProperty('user')) {
        const userDocRef = await createUserDocumentFromAuth(response.user);
      }
    })();
  }, []);

  const logGoogleUser = async () => {
    await signInWithGooglePopup();
  };

  const logGoogleRedirectUser = async () => {
    const response = await signInWithGoogleRedirect();
  };

  return (
    <div className='sign-in-container'>
      <h2> I already have an account </h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='email'
          type='email'
          name='email'
          value={email}
          onChange={handleChange}
          required
        />
        <FormInput
          label='password'
          type='password'
          name='password'
          value={password}
          onChange={handleChange}
          required
        />
        <div className='buttons-container'>
          <Button type='submit'>LOG IN</Button>
          <Button type='button' buttonType='google' onClick={logGoogleUser}>
            GOOGLE SIGN IN
          </Button>
        </div>
      </form>

      {/* <button onClick={logGoogleRedirectUser}>
        Sign in with google Redirect
      </button> */}
    </div>
  );
};

export default SignIn;

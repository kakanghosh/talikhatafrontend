import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import SignIn from '../../components/sign-in/SignIn';
import SignUp from '../../components/sign-up/SignUp';

const AuthenticationView = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const [isSignin] = useState(query.get('signin') === 'true');
  return (
    <div>
      {isSignin && <SignIn />}
      {!isSignin && <SignUp />}
    </div>
  );
};

export default AuthenticationView;

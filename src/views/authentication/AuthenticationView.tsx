import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SignIn from '../../components/sign-in/SignIn';
import SignUp from '../../components/sign-up/SignUp';
import ROUTES from '../../routes/application-routes';

const AuthenticationView = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const [isSignin, setIsSignin] = useState(query.get('signin') === 'true');

  const navigateToAuthPage = (value: boolean) => {
    navigate(`${ROUTES.AUTHENTICATION}?signin=${value}`);
    setIsSignin(value);
  };

  return (
    <div>
      {isSignin && <SignIn />}
      {!isSignin && <SignUp gotoSigninPage={navigateToAuthPage} />}
    </div>
  );
};

export default AuthenticationView;

import React, { useState } from 'react';
import {
  Avatar,
  CssBaseline,
  Paper,
  Box,
  Grid,
  Typography,
  makeStyles,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useTranslation } from 'react-i18next';
import SignInForm from '../signin/Signin';
import SignUp from '../signup/Signup';
import CopyRight from '../copyright/CopyRight';

const useStyles = makeStyles((theme) => ({
  auth: {
    height: '100vh',
  },
  auth__image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  auth__paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  auth__avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function Authentication() {
  const classes = useStyles();
  const [isSignin, setSignIn] = useState(true);
  const { t } = useTranslation();

  function showSignUpForm() {
    setSignIn(false);
  }

  function showSignInForm() {
    setSignIn(true);
  }

  return (
    <Grid container component="main" className={classes.auth}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.auth__image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.auth__paper}>
          <Avatar className={classes.auth__avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {isSignin ? t('sign in') : t('sign up')}
          </Typography>
          {isSignin ? (
            <SignInForm goToSignUpForm={showSignUpForm} />
          ) : (
            <SignUp goToSignInForm={showSignInForm} />
          )}
          <Box mt={5}>
            <CopyRight />
          </Box>
        </div>
      </Grid>
    </Grid>
  );
}

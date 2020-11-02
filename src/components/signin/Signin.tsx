import React from 'react';
import { Button, TextField, Link, Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  signUpButton: {
    textTransform: 'none',
  },
}));

interface SignInFormProps {
  goToSignUpForm: () => void;
}

const SignInForm = ({ goToSignUpForm }: SignInFormProps) => {
  const classes = useStyles();

  const onFormSubmit = () => {
    console.log('working');
  };

  return (
    <form
      className={classes.form}
      noValidate
      onSubmit={(e) => e.preventDefault()}
    >
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={onFormSubmit}
      >
        Sign In
      </Button>
      <Grid container>
        <Grid item xs>
          <Link href="#/" variant="body2">
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Button
            onClick={goToSignUpForm}
            color="primary"
            className={classes.signUpButton}
          >
            Don&apos;t have an account? Sign Up
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SignInForm;

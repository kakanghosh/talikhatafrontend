import React from 'react';
import { Button, TextField, Link, Grid, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

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

export default function SignInForm({ goToSignUpForm }: SignInFormProps) {
  const classes = useStyles();
  const { t } = useTranslation();

  const onFormSubmit = () => {
    // console.log('working');
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
        label={t('email address')}
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
        label={t('password')}
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
        {t('sign in')}
      </Button>
      <Grid container>
        <Grid item xs>
          <Link href="#/" variant="body2">
            {t('forgot password')}
          </Link>
        </Grid>
        <Grid item>
          <Button
            onClick={goToSignUpForm}
            color="primary"
            className={classes.signUpButton}
          >
            {t('do not have an account')}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

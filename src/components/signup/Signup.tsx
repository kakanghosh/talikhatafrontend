import React from 'react';
import { Button, TextField, Grid, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  signInButton: {
    textTransform: 'none',
  },
}));

interface SignUpFormProps {
  goToSignInForm: () => void;
}

export default function SignUp({ goToSignInForm }: SignUpFormProps) {
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
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="fname"
            name="firstName"
            variant="outlined"
            required
            fullWidth
            id="firstName"
            label={t('first name')}
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="lastName"
            label={t('last name')}
            name="lastName"
            autoComplete="lname"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="email"
            label={t('email address')}
            name="email"
            autoComplete="email"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="password"
            label={t('password')}
            type="password"
            id="password"
            autoComplete="current-password"
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={onFormSubmit}
      >
        {t('sign up')}
      </Button>
      <Grid container justify="flex-end">
        <Grid item>
          <Button
            onClick={goToSignInForm}
            color="primary"
            className={classes.signInButton}
          >
            {t('already have an account')}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

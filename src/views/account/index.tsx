import { Container, makeStyles } from '@material-ui/core';
import React from 'react';
import Page from '../../components/page/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const AccountView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Account">
      <Container maxWidth={false}>
        <div>Account Page is coming soon!</div>
      </Container>
    </Page>
  );
};

export default AccountView;

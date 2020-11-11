import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Page from '../../components/page/Page';
import AddDealerForm from './AddDealerForm';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const AddDealerView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Add Dealers">
      <Container maxWidth={false}>
        <AddDealerForm />
      </Container>
    </Page>
  );
};

export default AddDealerView;

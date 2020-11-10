import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Page from '../../components/page/Page';
import AddVendorForm from './AddVendorForm';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const AddVendorView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Add Vendor">
      <Container maxWidth={false}>
        <AddVendorForm />
      </Container>
    </Page>
  );
};

export default AddVendorView;

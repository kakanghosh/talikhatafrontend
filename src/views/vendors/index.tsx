import React, { useState } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from '../../components/page/Page';
import Results from './Result';
import Toolbar from '../../components/feature-toolbar/FeatureToolbar';
import data from './data';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const VendorListView = () => {
  const classes = useStyles();
  const [vendors] = useState(data);

  return (
    <Page className={classes.root} title="Vendor List">
      <Container maxWidth={false}>
        <Toolbar
          resourceName="Vendor"
          resourceCreateLink="/app/vendors/create"
        />
        <Box mt={3}>
          <Results vendros={vendors} />
        </Box>
      </Container>
    </Page>
  );
};

export default VendorListView;

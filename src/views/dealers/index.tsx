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

const DealerListView = () => {
  const classes = useStyles();
  const [dealers] = useState(data);

  return (
    <Page className={classes.root} title="Dealer List">
      <Container maxWidth={false}>
        <Toolbar
          resourceName="dealer"
          resourceCreateLink="/app/dealers/create"
        />
        <Box mt={3}>
          <Results dealers={dealers} />
        </Box>
      </Container>
    </Page>
  );
};

export default DealerListView;

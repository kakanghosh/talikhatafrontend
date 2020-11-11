import React, { useState } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from '../../components/page/Page';
import Results from './Result';
import Toolbar from '../../components/feature-toolbar/FeatureToolbar';
import data from './data';
import ROUTES from '../../routes/application-routes';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

type VendorListViewProps = {
  showDealer?: boolean;
};

const VendorListView: React.FunctionComponent<VendorListViewProps> = ({
  showDealer = false,
}: VendorListViewProps) => {
  const classes = useStyles();
  const [vendors] = useState(data);

  return (
    <Page className={classes.root} title="Vendor List">
      <Container maxWidth={false}>
        <Toolbar
          resourceName="Vendor"
          resourceCreateLink={ROUTES.ADD_VENDORS}
        />
        <Box mt={3}>
          <Results showDealer={showDealer} vendros={vendors} />
        </Box>
      </Container>
    </Page>
  );
};

VendorListView.defaultProps = {
  showDealer: false,
};

export default VendorListView;

import React, { useEffect, useState } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import { gql, useLazyQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import Page from '../../components/page/Page';
import Results from './Result';
import Toolbar from '../../components/feature-toolbar/FeatureToolbar';
import ROUTES from '../../routes/application-routes';
import { Vendor } from '../../core/models/Models';

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

const GET_VENDORS_REQUEST = gql`
  query GetVendors {
    vendors {
      id
      name
      address
      createdAt
      emailAddress
      phoneNumber
      dealerShip {
        id
        name
      }
    }
  }
`;

const GET_VENDORS_BY_DEALERSHIP_REQUEST = gql`
  query GetVendorsByDealership($dealerShipId: Int!) {
    getVendorsByDealerShip(dealerShipId: $dealerShipId) {
      id
      name
      address
      createdAt
      emailAddress
      phoneNumber
      dealerShip {
        id
        name
      }
    }
  }
`;

const VendorListView: React.FunctionComponent<VendorListViewProps> = ({
  showDealer = false,
}: VendorListViewProps) => {
  const classes = useStyles();
  const { dealerId: dealerShipId } = useParams();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [getVendors, { loading: loadingGetVendors }] = useLazyQuery<{
    vendors: Vendor[];
  }>(GET_VENDORS_REQUEST, {
    errorPolicy: 'all',
    onCompleted: (data) => {
      if (data && data.vendors) {
        setVendors(data.vendors);
      }
    },
  });

  const [
    getVendorsByDealerShip,
    { loading: loadingGetVendorsByDealerShip },
  ] = useLazyQuery<{
    getVendorsByDealerShip: Vendor[];
  }>(GET_VENDORS_BY_DEALERSHIP_REQUEST, {
    errorPolicy: 'all',
    onCompleted: (data) => {
      if (data && data.getVendorsByDealerShip) {
        setVendors(data.getVendorsByDealerShip);
      }
    },
  });

  useEffect(() => {
    if (dealerShipId) {
      getVendorsByDealerShip({
        variables: { dealerShipId },
      });
    } else {
      getVendors();
    }
  }, [dealerShipId, getVendors, getVendorsByDealerShip]);

  return (
    <Page className={classes.root} title="Vendor List">
      <Container maxWidth={false}>
        <Toolbar
          resourceName="Vendor"
          resourceCreateLink={ROUTES.ADD_VENDORS}
        />
        {((dealerShipId && !loadingGetVendorsByDealerShip) ||
          !loadingGetVendors) && (
          <Box mt={3}>
            <Results showDealer={showDealer} vendros={vendors} />
          </Box>
        )}
      </Container>
    </Page>
  );
};

VendorListView.defaultProps = {
  showDealer: false,
};

export default VendorListView;

import React, { useState } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import { gql, useQuery } from '@apollo/client';
import Page from '../../components/page/Page';
import Results from './Result';
import Toolbar from '../../components/feature-toolbar/FeatureToolbar';
import { Dealership } from '../../core/models/Models';
import ROUTES from '../../routes/application-routes';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const GET_DEALERSHIPS_REQUEST = gql`
  query GetDealerShips {
    dealers {
      id
      name
      address
      createdAt
      emailAddress
      phoneNumber
    }
  }
`;

const DealerListView = () => {
  const classes = useStyles();
  const [dealers, setDealerShip] = useState<Dealership[]>([]);
  const { loading } = useQuery<{ dealers: Dealership[] }>(
    GET_DEALERSHIPS_REQUEST,
    {
      errorPolicy: 'all',
      onCompleted: (data) => {
        if (data && data.dealers) {
          setDealerShip(data.dealers);
        }
      },
    }
  );

  return (
    <Page className={classes.root} title="Dealer List">
      <Container maxWidth={false}>
        <Toolbar
          resourceName="dealer"
          resourceCreateLink={ROUTES.ADD_DEALERS}
        />
        {!loading && (
          <Box mt={3}>
            <Results dealers={dealers} />
          </Box>
        )}
      </Container>
    </Page>
  );
};

export default DealerListView;

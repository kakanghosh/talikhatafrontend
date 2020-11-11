import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import Shop from '@material-ui/icons/Shop';
import Page from '../../components/page/Page';
import TotalResourceCard from '../../components/total-resource-card/TotalResourceCard';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const DashboardView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Dashboard">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalResourceCard
              resourceName="Dealer"
              totalItems={10}
              icon={<ShoppingBasket />}
            />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalResourceCard
              resourceName="Vendor"
              totalItems={156}
              icon={<Shop />}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default DashboardView;

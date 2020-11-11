import React, { useEffect, useState } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from '../../components/page/Page';
import Toolbar from './Toolbar';
import TransactionTable from './ShowTransaction';
import PurchaseDepositeDialog from './PurchaseDepositeDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  toolbarMargin: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
}));

const VendorTransactionView = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [depositeMode, setDepositeMode] = useState(false);
  const [purchaseMode, setpurchaseMode] = useState(false);

  const onClickPurchase = () => {
    setpurchaseMode(true);
    setDepositeMode(false);
    setOpen(true);
  };

  const onClickDeposite = () => {
    setpurchaseMode(false);
    setDepositeMode(true);
    setOpen(true);
  };

  useEffect(() => {
    if (depositeMode) {
      setTitle('Add new deposite');
    }

    if (purchaseMode) {
      setTitle('Add new purchase');
    }
  }, [depositeMode, purchaseMode]);

  return (
    <Page className={classes.root} title="Vendor Transaction">
      <Container maxWidth={false}>
        <Box display="flex" justifyContent="space-between">
          <div>
            <h2>Vendor Transaction</h2>
          </div>
          <div>
            <p>Total purchase: $8562</p>
            <p>Total deposite: $5215</p>
          </div>
        </Box>

        <Toolbar
          onClickPurchase={onClickPurchase}
          onClickDeposite={onClickDeposite}
          className={classes.toolbarMargin}
        />
        <TransactionTable />
        <PurchaseDepositeDialog title={title} open={open} setOpen={setOpen} />
      </Container>
    </Page>
  );
};

export default VendorTransactionView;

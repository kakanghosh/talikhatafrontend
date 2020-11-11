import React from 'react';
import clsx from 'clsx';
import { Box, Button, makeStyles } from '@material-ui/core';
import ActionBar from './ActionBar';

const useStyles = makeStyles((theme) => ({
  root: {},
  purchaseButton: {
    marginRight: theme.spacing(1),
  },
  depositeButton: {
    marginRight: theme.spacing(1),
  },
  marginBottom: {
    marginBottom: theme.spacing(1),
  },
}));

type ToolbarProps = {
  className?: string;
  onClickPurchase: () => void;
  onClickDeposite: () => void;
};

const Toolbar: React.FunctionComponent<ToolbarProps> = ({
  className,
  onClickPurchase,
  onClickDeposite,
}: ToolbarProps) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <Box
        className={classes.marginBottom}
        display="flex"
        justifyContent="flex-end"
      >
        <Button
          className={classes.purchaseButton}
          color="secondary"
          variant="outlined"
          onClick={onClickPurchase}
        >
          Add Purchase
        </Button>
        <Button color="primary" variant="outlined" onClick={onClickDeposite}>
          Add Deposite
        </Button>
      </Box>
      <ActionBar />
    </div>
  );
};

Toolbar.defaultProps = {
  className: '',
};

export default Toolbar;

import React, { ChangeEvent, useState } from 'react';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

type PurchaseDepositeDialogProps = {
  open: boolean;
  setOpen: (state: boolean) => void;
  title: string;
};

const PurchaseDepositeDialog = ({
  open,
  setOpen,
  title,
}: PurchaseDepositeDialogProps) => {
  const [values, setValues] = useState({
    date: '',
    amount: '',
    description: '',
  });

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date()
  );

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {title}
        </DialogTitle>
        <DialogContent dividers>
          <form autoComplete="off" noValidate>
            <Card>
              <CardContent>
                <Grid container spacing={3}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid item md={6} xs={12}>
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Choose date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>

                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Amount"
                      name="amount"
                      onChange={handleChange}
                      value={values.amount}
                      variant="outlined"
                      type="number"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Description"
                      name="description"
                      onChange={handleChange}
                      type="text"
                      value={values.description}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <Box display="flex" justifyContent="flex-end" p={2}>
                <DialogActions>
                  <Button autoFocus onClick={handleClose} color="primary">
                    cancel
                  </Button>
                  <Button autoFocus onClick={handleClose} color="primary">
                    Save
                  </Button>
                </DialogActions>
              </Box>
            </Card>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PurchaseDepositeDialog;

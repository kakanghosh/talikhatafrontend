import React from 'react';
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
import { useFormik } from 'formik';
import * as Yup from 'yup';

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

type PurchaseDepositeForm = {
  date: Date;
  amount: number;
  description?: string;
};

const PurchaseDepositeDialog = ({
  open,
  setOpen,
  title,
}: PurchaseDepositeDialogProps) => {
  const validationSchema = Yup.object<PurchaseDepositeForm>({
    date: Yup.date().required('Date is required'),
    amount: Yup.number()
      .min(1, 'Amount must be greater than 0')
      .required('Amount is required'),
    description: Yup.string().trim().notRequired(),
  });

  const formik = useFormik<PurchaseDepositeForm>({
    initialValues: {
      date: new Date(),
      amount: 1,
      description: '',
    },
    validationSchema,
    onSubmit: (values: PurchaseDepositeForm, { resetForm }) => {
      // eslint-disable-next-line no-console
      console.log(values);
      resetForm();
    },
  });

  const {
    values,
    touched,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    resetForm,
  } = formik;

  const handleClose = () => {
    setOpen(false);
    resetForm();
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
          <form onSubmit={handleSubmit} autoComplete="off" noValidate>
            <Card>
              <CardContent>
                <Grid container spacing={3}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid item md={6} xs={12}>
                      <KeyboardDatePicker
                        disableFuture
                        name="date"
                        required
                        disableToolbar
                        variant="inline"
                        margin="normal"
                        format="dd/MM/yy"
                        id="date"
                        label="Choose date"
                        value={values.date}
                        onChange={(dateProp) => setFieldValue('date', dateProp)}
                        onBlur={handleBlur}
                        error={Boolean(errors.date) && Boolean(touched.date)}
                        helperText={touched.date && errors.date}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>

                  <Grid item md={6} xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Amount"
                      name="amount"
                      onChange={handleChange}
                      value={values.amount}
                      onBlur={handleBlur}
                      error={Boolean(errors.amount) && touched.amount}
                      helperText={touched.amount && errors.amount}
                      variant="outlined"
                      type="number"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Description"
                      name="description"
                      type="text"
                      onChange={handleChange}
                      value={values.description}
                      onBlur={handleBlur}
                      error={Boolean(errors.description) && touched.description}
                      helperText={touched.description && errors.description}
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
                  <Button type="submit" autoFocus color="primary">
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

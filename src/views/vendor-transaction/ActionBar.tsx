import { Grid, makeStyles, TextField } from '@material-ui/core';
import React, { ChangeEvent, useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  root: {},
  datePicker: {
    marginRight: theme.spacing(1),
  },
  typeSelecter: {
    boxSizing: 'border-box',
    paddingTop: '8px',
  },
}));

const ActionBar = () => {
  const classes = useStyles();
  const [fromDate, setFromDate] = React.useState<Date | null>(new Date());
  const [toDate, setToDate] = React.useState<Date | null>(new Date());
  const [types] = useState([
    {
      label: 'Purchase',
      value: 'purchase',
    },
    {
      label: 'Deposite',
      value: 'deposite',
    },
  ]);

  const [values, setValues] = useState({
    type: '',
  });

  const handleFromDateChange = (date: Date | null) => {
    setFromDate(date);
  };

  const handleToDateChange = (date: Date | null) => {
    setToDate(date);
  };

  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container alignItems="center" justify="space-around">
        <Grid item md={3} xs={12}>
          <KeyboardDatePicker
            fullWidth
            disableFuture
            className={classes.datePicker}
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-from-date"
            label="From Date"
            value={fromDate}
            onChange={handleFromDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            maxDate={toDate}
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <KeyboardDatePicker
            fullWidth
            disableFuture
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-to-date"
            label="To Date"
            value={toDate}
            onChange={handleToDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            minDate={fromDate}
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <TextField
            className={classes.typeSelecter}
            fullWidth
            label="Select Type"
            name="type"
            onChange={handleChange}
            select
            SelectProps={{ native: true }}
            value={values.type}
            variant="standard"
          >
            {types.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default ActionBar;

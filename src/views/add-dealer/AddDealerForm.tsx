import React, { ChangeEvent, useState } from 'react';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
} from '@material-ui/core';

const areas = [
  {
    value: 'uttor-para',
    label: 'Uttor Para',
  },
  {
    value: 'bus-stand',
    label: 'Bus Stand',
  },
  {
    value: 'savar-bazar',
    label: 'Savar Bazar',
  },
];

const useStyles = makeStyles(() => ({
  root: {},
}));

type AddDealerFormProps = {
  className?: string;
};

const AddDealerForm: React.FunctionComponent<AddDealerFormProps> = ({
  className,
}: AddDealerFormProps) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    dealerName: '',
    email: '',
    phone: '',
    area: '',
    address: '',
  });

  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
    >
      <Card>
        <CardHeader subheader="Add new Dealer" title="Dealer" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the dealer name"
                label="Dealer Name"
                name="dealerName"
                onChange={handleChange}
                required
                value={values.dealerName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                type="number"
                value={values.phone}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                onChange={handleChange}
                value={values.address}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Select Area"
                name="area"
                onChange={handleChange}
                select
                SelectProps={{ native: true }}
                value={values.area}
                variant="outlined"
              >
                {areas.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button color="primary" variant="contained">
            Save
          </Button>
        </Box>
      </Card>
    </form>
  );
};

AddDealerForm.defaultProps = {
  className: '',
};

export default AddDealerForm;
import React from 'react';
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
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { PartialDealer, Vendor } from '../../core/models/Models';
import ROUTES from '../../routes/application-routes';

const useStyles = makeStyles(() => ({
  root: {},
}));

type AddVendorFormProps = {
  className?: string;
};

type VendorForm = {
  name: string;
  dealerShipId: number;
  emailAddress?: string;
  phoneNumber?: string;
  address?: string;
};

const GET_DEALERSHIP_REQUEST = gql`
  query GetDealerShip {
    dealers {
      id
      name
    }
  }
`;

const CREATE_VENDOR_REQUEST = gql`
  mutation CreateVendor(
    $name: String!
    $dealerShipId: Int!
    $emailAddress: String
    $phoneNumber: String
    $address: String
  ) {
    createVendor(
      input: {
        name: $name
        dealerShipId: $dealerShipId
        emailAddress: $emailAddress
        phoneNumber: $phoneNumber
        address: $address
      }
    ) {
      id
      name
    }
  }
`;

const AddVendorForm: React.FunctionComponent<AddVendorFormProps> = ({
  className,
}: AddVendorFormProps) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const validationSchema = Yup.object<VendorForm>({
    name: Yup.string().trim().required('Vendor is required'),
    dealerShipId: Yup.number().required('Dealership is required'),
  });

  const [addVendor, { loading: createVendorLoading, error }] = useMutation<{
    createVendor: Vendor;
  }>(CREATE_VENDOR_REQUEST, {
    errorPolicy: 'all',
    onCompleted: (data) => {
      if (data && data.createVendor) {
        navigate(ROUTES.VENDORS);
      }
    },
  });

  const onSubmit = (vendorFromValues: VendorForm) => {
    addVendor({
      variables: {
        ...vendorFromValues,
      },
    });
  };

  const formik = useFormik<VendorForm>({
    initialValues: {
      name: '',
      dealerShipId: 0,
      emailAddress: '',
      phoneNumber: '',
      address: '',
    },
    validationSchema,
    onSubmit,
  });

  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = formik;

  const { data: dealerShips, loading } = useQuery<{ dealers: PartialDealer[] }>(
    GET_DEALERSHIP_REQUEST,
    {
      errorPolicy: 'all',
      onCompleted: (data) => {
        if (data && data.dealers && data.dealers.length > 0) {
          setFieldValue('dealerShipId', data.dealers[0].id);
        }
      },
    }
  );

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader subheader="Add new Vendor" title="Vendor" />
        <p>{error && error.message}</p>
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Vendor Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.name) && touched.name}
                helperText={touched.name && errors.name}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="emailAddress"
                value={values.emailAddress}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.emailAddress) && touched.emailAddress}
                helperText={touched.emailAddress && errors.emailAddress}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={values.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.phoneNumber) && touched.phoneNumber}
                helperText={touched.phoneNumber && errors.phoneNumber}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.address) && touched.address}
                helperText={touched.address && errors.address}
                variant="outlined"
              />
            </Grid>
            {!loading && (
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Select DealerShip"
                  name="dealerShipId"
                  select
                  SelectProps={{ native: true }}
                  value={values.dealerShipId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.dealerShipId) && touched.dealerShipId}
                  helperText={touched.dealerShipId && errors.dealerShipId}
                  variant="outlined"
                >
                  {dealerShips?.dealers.map((dealerShip) => (
                    <option key={dealerShip.id} value={dealerShip.id}>
                      {dealerShip.name}
                    </option>
                  ))}
                </TextField>
              </Grid>
            )}
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button
            disabled={createVendorLoading}
            color="primary"
            variant="contained"
            type="submit"
          >
            Save
          </Button>
        </Box>
      </Card>
    </form>
  );
};

AddVendorForm.defaultProps = {
  className: '',
};

export default AddVendorForm;

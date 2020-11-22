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
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../routes/application-routes';
import { Dealership } from '../../core/models/Models';

const useStyles = makeStyles(() => ({
  root: {},
}));

type AddDealerFormProps = {
  className?: string;
};

type AddDealerShipForm = {
  name: string;
  emailAddress?: string;
  phoneNumber?: string;
  address?: string;
};

const CREATE_DEALERSHIP_REQUEST = gql`
  mutation CreateDealerShip(
    $name: String!
    $emailAddress: String
    $phoneNumber: String
    $address: String
  ) {
    createDealerShip(
      input: {
        name: $name
        emailAddress: $emailAddress
        phoneNumber: $phoneNumber
        address: $address
      }
    ) {
      id
      name
      emailAddress
      phoneNumber
      address
      createdAt
    }
  }
`;

const AddDealerForm: React.FunctionComponent<AddDealerFormProps> = ({
  className,
}: AddDealerFormProps) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [addDealership, { loading, error }] = useMutation<{
    createDealerShip: Dealership;
  }>(CREATE_DEALERSHIP_REQUEST, {
    errorPolicy: 'all',
    onCompleted: (data) => {
      if (data && data.createDealerShip) {
        navigate(ROUTES.DEALERS);
      }
    },
  });

  const onSubmit = (values: AddDealerShipForm) => {
    addDealership({
      variables: { ...values },
    });
  };

  const validationSchema = Yup.object<AddDealerShipForm>({
    name: Yup.string().trim().required('Dealership name is required'),
  });

  const formik = useFormik<AddDealerShipForm>({
    initialValues: {
      name: '',
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
  } = formik;

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader subheader="Add new Dealer" title="Dealer" />
        <p>{error && error.message}</p>
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Dealer Name"
                name="name"
                required
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.name) && touched.name}
                helperText={touched.name && errors.name}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="emailAddress"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.emailAddress}
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
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phoneNumber}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button
            disabled={loading}
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

AddDealerForm.defaultProps = {
  className: '',
};

export default AddDealerForm;

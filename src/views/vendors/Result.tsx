import React, { ChangeEvent, useState, MouseEvent } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles,
} from '@material-ui/core';
import getInitials from '../../utils/getInitials';
import { Vendor } from './data';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2),
  },
}));

type ResultProps = {
  className?: string;
  vendros: Vendor[];
};

const Results: React.FunctionComponent<ResultProps> = ({
  className,
  vendros,
}: ResultProps) => {
  const classes = useStyles();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState<string[]>([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    let newSelectedCustomerIds: string[];

    if (checked) {
      newSelectedCustomerIds = vendros.map((vendor) => vendor.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (
    event: ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds: string[] = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(1)
      );
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLimit(Number(event.target.value));
  };

  const handlePageChange = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  return (
    <Card className={clsx(classes.root, className)}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === vendros.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0 &&
                      selectedCustomerIds.length < vendros.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Registration date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vendros.slice(0, limit).map((vendor) => (
                <TableRow
                  hover
                  key={vendor.id}
                  selected={selectedCustomerIds.indexOf(vendor.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(vendor.id) !== -1}
                      onChange={(event) => handleSelectOne(event, vendor.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box alignItems="center" display="flex">
                      <Avatar className={classes.avatar} src={vendor.avatarUrl}>
                        {getInitials(vendor.name)}
                      </Avatar>
                      <Typography color="textPrimary" variant="body1">
                        {vendor.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{vendor.email}</TableCell>
                  <TableCell>
                    {`${vendor.address.city}, ${vendor.address.state}, ${vendor.address.country}`}
                  </TableCell>
                  <TableCell>{vendor.phone}</TableCell>
                  <TableCell>
                    {moment(vendor.createdAt).format('DD/MM/YYYY')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={vendros.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.defaultProps = {
  className: '',
};

export default Results;

import React, { ChangeEvent, useState, MouseEvent } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
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
import { useNavigate } from 'react-router-dom';
import { Dealership } from '../../core/models/Models';
import ROUTES from '../../routes/application-routes';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2),
  },
  cellCursorPointer: {
    cursor: 'pointer',
  },
}));

type ResultProps = {
  className?: string;
  dealers: Dealership[];
};

const Results: React.FunctionComponent<ResultProps> = ({
  className,
  dealers,
}: ResultProps) => {
  const classes = useStyles();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState<number[]>([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  const handleSelectAll = (
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    let newSelectedCustomerIds: number[];

    if (checked) {
      newSelectedCustomerIds = dealers.map((dealer) => dealer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (
    event: ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds: number[] = [];

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
                    checked={selectedCustomerIds.length === dealers.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0 &&
                      selectedCustomerIds.length < dealers.length
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
              {dealers.slice(0, limit).map((dealer) => (
                <TableRow
                  hover
                  key={dealer.id}
                  selected={selectedCustomerIds.indexOf(dealer.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(dealer.id) !== -1}
                      onChange={(event) => handleSelectOne(event, dealer.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell
                    className={classes.cellCursorPointer}
                    onClick={() =>
                      navigate(ROUTES.VENDORS_OF_DEALER(dealer.id))
                    }
                  >
                    <Box alignItems="center" display="flex">
                      <Typography color="textPrimary" variant="body1">
                        {dealer.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{dealer.emailAddress}</TableCell>
                  <TableCell>{`${dealer.address}`}</TableCell>
                  <TableCell>{dealer.phoneNumber}</TableCell>
                  <TableCell>
                    {moment(dealer.createdAt).format('DD/MM/YYYY')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={dealers.length}
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

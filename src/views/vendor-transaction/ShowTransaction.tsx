import React, { useState } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import faker from 'faker';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles,
} from '@material-ui/core';
import moment from 'moment';

const tranactions: {
  id: number;
  date: Date;
  description: string;
  amount: number;
  type: string;
}[] = [];

for (let i = 0; i < 50; i += 1) {
  tranactions.push({
    id: faker.random.number(500),
    date: faker.date.between('2020-01-01', '2020-11-05'),
    description: faker.lorem.sentences(1),
    amount: faker.random.number(6528985),
    type: faker.helpers.randomize(['Deposite', 'Purchase']),
  });
}

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2),
  },
  cellCursorPointer: {
    cursor: 'pointer',
  },
  depoback: {
    backgroundColor: '#b3b3b3',
  },
  textColor: {
    color: theme.palette.common.white,
  },
}));

type TransactionTableProps = {
  className?: string;
};

const TransactionTable: React.FunctionComponent<TransactionTableProps> = ({
  className,
}: TransactionTableProps) => {
  const classes = useStyles();
  const [limit] = useState(10);

  return (
    <Card className={clsx(classes.root, className)}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow className={classes.depoback}>
                <TableCell className={classes.textColor}>Date</TableCell>
                <TableCell className={classes.textColor}>Description</TableCell>
                <TableCell className={classes.textColor}>Amount</TableCell>
                <TableCell className={classes.textColor}>Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tranactions.slice(0, limit).map((tran) => (
                <TableRow hover key={tran.id}>
                  <TableCell className={classes.cellCursorPointer}>
                    <Box alignItems="center" display="flex">
                      {moment(tran.date).format('DD/MM/YYYY')}
                    </Box>
                  </TableCell>
                  <TableCell>{tran.description}</TableCell>
                  <TableCell>${tran.amount}</TableCell>
                  <TableCell>{tran.type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

TransactionTable.defaultProps = {
  className: '',
};

export default TransactionTable;

import React from 'react';
import clsx from 'clsx';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  colors,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
  },
  avatar: {
    backgroundColor: colors.indigo[600],
    height: 56,
    width: 56,
  },
}));

type TotalResourceCardProps = {
  className?: string;
  resourceName: string;
  totalItems: number;
  icon: React.ReactNode;
};

const TotalResourceCard: React.FunctionComponent<TotalResourceCardProps> = ({
  className,
  resourceName,
  totalItems,
  icon,
}: TotalResourceCardProps) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              TOTAL {resourceName}
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {totalItems}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>{icon}</Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TotalResourceCard.defaultProps = {
  className: '',
};

export default TotalResourceCard;

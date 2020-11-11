import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { AppBar, Box, Toolbar, makeStyles } from '@material-ui/core';
import Logo from '../../components/logo/Logo';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60,
  },
}));

interface TopBarProps {
  className?: string;
}

const TopBar: React.FunctionComponent<TopBarProps> = ({
  className,
}: TopBarProps) => {
  const classes = useStyles();

  return (
    <AppBar className={clsx(classes.root, className)} elevation={0}>
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Box flexGrow={1} />
      </Toolbar>
    </AppBar>
  );
};

TopBar.defaultProps = {
  className: '',
};

export default TopBar;

import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles,
} from '@material-ui/core';
import {
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  Users as UsersIcon,
} from 'react-feather';
import NavItem from './NavItem';

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  name: 'Kakan Ghosh',
};

const items = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard',
  },
  {
    href: '/app/dealers',
    icon: UsersIcon,
    title: 'Dealers',
  },
  {
    href: '/app/vendors',
    icon: ShoppingBagIcon,
    title: 'Vendors',
  },
  {
    href: '/app/account',
    icon: UserIcon,
    title: 'Account',
  },
  {
    href: '/app/settings',
    icon: SettingsIcon,
    title: 'Settings',
  },
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)',
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64,
  },
}));

interface NavBarProps {
  onMobileClose?: () => void;
  openMobile?: boolean;
}

const NavBar: React.FunctionComponent<NavBarProps> = ({
  onMobileClose,
  openMobile,
}: NavBarProps) => {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={user.avatar}
          to="/app/account"
        />
        <Typography color="textPrimary" variant="h5">
          {user.name}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default NavBar;

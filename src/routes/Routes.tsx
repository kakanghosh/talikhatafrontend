import React from 'react';
import { Navigate } from 'react-router-dom';
import AppLayout from '../layouts/app-layout';
import DashboardLayout from '../layouts/Dashboardlayout';
import AccountView from '../views/account';
import AddDealerView from '../views/add-dealer';
import AddVendorView from '../views/add-vendor';
import AuthenticationView from '../views/authentication/AuthenticationView';
import DashboardView from '../views/dashboard';
import DealersView from '../views/dealers';
import NotFoundView from '../views/errors/NotFoundView';
import SettingsView from '../views/settings';
import VendorListView from '../views/vendors';

const routes = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/app/dashboard" />,
      },
      {
        path: '/authentication',
        element: <AuthenticationView />,
      },
      {
        path: '/404',
        element: <NotFoundView />,
      },
    ],
  },
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      {
        path: 'dashboard',
        element: <DashboardView />,
      },
      {
        path: 'dealers',
        element: <DealersView />,
      },
      {
        path: 'dealers/create',
        element: <AddDealerView />,
      },
      {
        path: 'vendors',
        element: <VendorListView />,
      },
      {
        path: 'vendors/create',
        element: <AddVendorView />,
      },
      {
        path: 'account',
        element: <AccountView />,
      },
      {
        path: 'settings',
        element: <SettingsView />,
      },
      {
        path: '*',
        element: <Navigate to="/404" />,
      },
    ],
  },
];
export default routes;

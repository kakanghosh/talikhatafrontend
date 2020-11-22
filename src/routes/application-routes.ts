const ROUTES = {
  ROOT: '/',
  AUTHENTICATION: '/authentication',
  DASHBOARD: '/app/dashboard',
  DEALERS: '/app/dealers',
  VENDORS_OF_DEALER: (dealerId: number) => `/app/dealers/${dealerId}/vendors`,
  ADD_DEALERS: '/app/dealers/create',
  VENDORS: '/app/vendors',
  ADD_VENDORS: '/app/vendors/create',
  VENDOR_TRANSACTION: (dealerId: number, vendorID: number) =>
    `/app/dealers/${dealerId}/vendors/${vendorID}/transaction`,
  ACCOUNT: '/app/account',
  SETTINGS: '/app/settings',
};

export default ROUTES;

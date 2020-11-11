const ROUTES = {
  ROOT: '/',
  DASHBOARD: '/app/dashboard',
  DEALERS: '/app/dealers',
  VENDORS_OF_DEALER: (dealerId: string) => `/app/dealers/${dealerId}/vendors`,
  ADD_DEALERS: '/app/dealers/create',
  VENDORS: '/app/vendors',
  ADD_VENDORS: '/app/vendors/create',
  VENDOR_TRANSACTION: (dealerId: string, vendorID: string) =>
    `/app/dealers/${dealerId}/vendors/${vendorID}/transaction`,
};

export default ROUTES;

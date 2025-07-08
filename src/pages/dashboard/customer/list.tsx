import { Helmet } from 'react-helmet-async';
// sections
import CustomerListView from 'src/sections/customer/view/customer-list-view';

// ----------------------------------------------------------------------

export default function CustomerListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Customer List</title>
      </Helmet>

      <CustomerListView />
    </>
  );
}

import { Helmet } from 'react-helmet-async';
// sections
import { CustomerCreateView } from 'src/sections/customer/view';

// ----------------------------------------------------------------------

export default function CustomerCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new Customer</title>
      </Helmet>

      <CustomerCreateView />
    </>
  );
}

import { Helmet } from 'react-helmet-async';
// routes
import { useParams } from 'src/routes/hooks';
// sections
import CustomerDetailsView from 'src/sections/customer/view/customer-details-view';

// ----------------------------------------------------------------------

export default function CustomerDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Customer Details</title>
      </Helmet>

      <CustomerDetailsView id={`${id}`} />
    </>
  );
}

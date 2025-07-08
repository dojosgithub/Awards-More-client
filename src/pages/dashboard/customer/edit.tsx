import { Helmet } from 'react-helmet-async';
// routes
import { useParams } from 'src/routes/hooks';
// sections
import CustomerEditView from 'src/sections/customer/view/customer-edit-view';

// ----------------------------------------------------------------------

export default function CustomerEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Dashboard: Customer Edit</title>
      </Helmet>

      <CustomerEditView id={`${id}`} />
    </>
  );
}

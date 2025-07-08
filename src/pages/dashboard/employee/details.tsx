import { Helmet } from 'react-helmet-async';
// routes
import { useParams } from 'src/routes/hooks';
// sections
import EmployeeDetailsView from 'src/sections/employee/view/employee-details-view';

// ----------------------------------------------------------------------

export default function EmployeeDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Employee Details</title>
      </Helmet>

      <EmployeeDetailsView id={`${id}`} />
    </>
  );
}

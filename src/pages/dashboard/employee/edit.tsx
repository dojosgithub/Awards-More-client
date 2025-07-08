import { Helmet } from 'react-helmet-async';
// routes
import { useParams } from 'src/routes/hooks';
// sections
import EmployeeEditView from 'src/sections/employee/view/employee-edit-view';

// ----------------------------------------------------------------------

export default function EmployeeEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Employee Edit</title>
      </Helmet>

      <EmployeeEditView id={`${id}`} />
    </>
  );
}

import { Helmet } from 'react-helmet-async';
// sections
import EmployeeCreateView from 'src/sections/employee/view/employee-create-view';

// ----------------------------------------------------------------------

export default function EmployeeCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new Employee</title>
      </Helmet>

      <EmployeeCreateView />
    </>
  );
}

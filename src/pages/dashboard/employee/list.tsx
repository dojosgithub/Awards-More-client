import { Helmet } from 'react-helmet-async';
// sections
import EmployeeListView from 'src/sections/employee/view/employee-list-view';

// ----------------------------------------------------------------------

export default function EmployeeListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Employee List</title>
      </Helmet>

      <EmployeeListView />
    </>
  );
}

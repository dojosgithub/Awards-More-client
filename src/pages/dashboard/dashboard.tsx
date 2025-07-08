import { Helmet } from 'react-helmet-async';
import DashboardView from 'src/sections/dashboard/view/dashoard-view';
// sections

// ----------------------------------------------------------------------

export default function DashboardPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard</title>
      </Helmet>

      <DashboardView />
    </>
  );
}

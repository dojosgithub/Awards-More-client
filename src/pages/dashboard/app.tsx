import { Helmet } from 'react-helmet-async';
import DashboardView from 'src/sections/dashboard/view/dashoard-view';
// sections
import { OverviewAppView } from 'src/sections/overview/app/view';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: App</title>
      </Helmet>

      <DashboardView />
    </>
  );
}

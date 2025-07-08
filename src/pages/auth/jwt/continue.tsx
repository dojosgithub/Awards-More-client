import { Helmet } from 'react-helmet-async';
import { ContinueToDashboard } from 'src/sections/auth/jwt';
// sections

// ----------------------------------------------------------------------

export default function ContinueDashoboardPage() {
  return (
    <>
      <Helmet>
        <title> Continue To Dashboard</title>
      </Helmet>

      <ContinueToDashboard />
    </>
  );
}

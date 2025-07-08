import { Helmet } from 'react-helmet-async';
// sections
import { JwtForgotPasswordView } from 'src/sections/auth/jwt';

// ----------------------------------------------------------------------

export default function ForgotPsswordPage() {
  return (
    <>
      <Helmet>
        <title> Jwt: Forgot Password</title>
      </Helmet>

      <JwtForgotPasswordView />
    </>
  );
}

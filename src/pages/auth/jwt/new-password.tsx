import { Helmet } from 'react-helmet-async';
import JwtNewPasswordSet from 'src/sections/auth/jwt/jwt-new-password';
// sections

// ----------------------------------------------------------------------

export default function NewPasswordPage() {
  return (
    <>
      <Helmet>
        <title> Jwt: New Password</title>
      </Helmet>

      <JwtNewPasswordSet />
    </>
  );
}

import { Helmet } from 'react-helmet-async';
// sections
import JwtPasswordCodeView from 'src/sections/auth/jwt/jwt-password-code';

// ----------------------------------------------------------------------

export default function PasswordCodePage() {
  return (
    <>
      <Helmet>
        <title> Jwt: Code</title>
      </Helmet>

      <JwtPasswordCodeView />
    </>
  );
}

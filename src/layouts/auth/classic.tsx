// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
// auth
import { useLocation, useParams } from 'react-router';
import { useAuthContext } from 'src/auth/hooks';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';

// ----------------------------------------------------------------------

type Props = {
  title?: string;
  image?: string;
  children: React.ReactNode;
};

export default function AuthClassicLayout({ children, image, title }: Props) {
  const { method } = useAuthContext();

  const theme = useTheme();
  const upMd = useResponsive('up', 'md');
  const location = useLocation();
  const currentPath = location.pathname;
  const forgotPaths = [
    '/auth/jwt/new-password',
    '/auth/jwt/password-code',
    '/auth/jwt/forgot-password',
  ];

  const isForgotPage = forgotPaths.includes(currentPath);
  const backgroundImageUrl = isForgotPage
    ? '/assets/illustrations/forgotImage.png'
    : '/assets/illustrations/loginImage.png';
  // const ifPicture=
  const renderContent = (
    <Stack
      sx={{
        // justifyContent: "center",
        width: 1,
        mx: 'auto',
        maxWidth: { md: 340, lg: 700, xl: 550 },
        px: { xs: 2, sm: 6, lg: 6 },
        py: { xs: 15, md: 10 },
        background: '#FFFFFF',
      }}
    >
      {children}
    </Stack>
  );

  const renderSection = (
    <Stack
      flexGrow={1}
      alignItems="flex-start"
      justifyContent="flex-start"
      spacing={2}
      sx={{
        px: { md: 8, lg: 14, xl: 18 },
        pt: { md: 20, lg: 24 },
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center center',
        height: '100vh',
      }}
    >
      {/* You can add content here */}
    </Stack>
  );

  return (
    <Stack
      component="main"
      direction="row"
      sx={{
        // minHeight: '100vh',
        height: '100vh',
        // overflow: 'hidden',
      }}
    >
      {renderContent}
      {upMd && renderSection}
    </Stack>
  );
}

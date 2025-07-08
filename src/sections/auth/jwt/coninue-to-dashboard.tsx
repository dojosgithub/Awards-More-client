import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
// auth
import { useAuthContext } from 'src/auth/hooks';
// assets
import { PasswordIcon } from 'src/assets/icons';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { PATH_AFTER_LOGIN } from 'src/config-global';

// ----------------------------------------------------------------------

export default function ContinueToDashboard() {
  const router = useRouter();

  const onSubmit = async () => {
    try {
      // await forgotPassword?.(data.email);

      // const searchParams = new URLSearchParams({
      //   email: data.email,
      // }).toString();

      // const href = `${paths.auth.firebase.verify}?${searchParams}`;
      router.push(paths.dashboard.root);
    } catch (error) {
      console.error(error);
    }
  };

  const renderForm = (
    <Stack spacing={3} alignItems="center">
      <LoadingButton
        onClick={onSubmit}
        sx={{
          backgroundColor: '#4491CE',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#357bb0',
          },
        }}
        fullWidth
        type="submit"
        size="large"
      >
        Continue
      </LoadingButton>

      <Link
        component={RouterLink}
        href={paths.auth.jwt.login}
        color="inherit"
        variant="subtitle2"
        sx={{
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        <Iconify icon="eva:arrow-ios-back-fill" width={16} />
        Return to sign in
      </Link>
    </Stack>
  );

  const renderHead = (
    <>
      {/* <PasswordIcon sx={{ height: 96 }} /> */}

      <Stack spacing={1} sx={{ my: 5 }}>
        <Typography variant="h3">Continue TO Dashboard</Typography>

        {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Please enter the email address associated with your account and We will email you a link
          to reset your password.
        </Typography> */}
      </Stack>
    </>
  );

  return (
    <>
      {renderHead}

      {renderForm}
    </>
  );
}

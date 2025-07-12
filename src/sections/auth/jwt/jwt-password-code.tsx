import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// routes
import { useLocation } from 'react-router';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useDispatch } from 'react-redux';
import { paths } from 'src/routes/paths';
import { useParams, useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
// auth
import { useAuthContext } from 'src/auth/hooks';
// assets
import { PasswordIcon } from 'src/assets/icons';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { setNewPasswordApi } from 'src/api/auth';
import { setSession } from 'src/auth/context/jwt/utils';
import { setCredentials } from 'src/redux/slices/authSlice';

// ----------------------------------------------------------------------

export default function JwtPasswordCodeView() {
  const { forgotPassword } = useAuthContext();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');

  console.log('params', email);
  const dispatch = useDispatch();
  const router = useRouter();

  const CodeOtpSchema = Yup.object().shape({
    code: Yup.string().required('Code is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string().required('Confirm Password is required'),
  });

  const defaultValues = {
    code: '',
    password: '',
    confirmPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(CodeOtpSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const payload = {
        email,
        code: data.code,
        password: data.password,
      };
      const res = await setNewPasswordApi?.(payload);
      // setSession(res?.tokens?.accessToken);
      dispatch(setCredentials({ email, password: data.password }));
      router.push(paths.auth.jwt.continue);
    } catch (error) {
      console.error(error);
    }
  });

  const renderForm = (
    <Stack spacing={3} alignItems="center">
      <RHFTextField name="code" label="Enter Code" />
      <RHFTextField name="password" label="New Password" />

      <RHFTextField name="confirmPassword" label="Confirm Password" />

      <LoadingButton
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
        loading={isSubmitting}
      >
        Send Request
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
        <Typography variant="h3">Enter the Code</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Please enter the email address associated with your account and We will email you a link
          to reset your password.
        </Typography>
      </Stack>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}

      {renderForm}
    </FormProvider>
  );
}

import * as Yup from 'yup';
import { useCallback, useMemo, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
// hooks

import { useResponsive } from 'src/hooks/use-responsive';
// routes
import { useRouter } from 'src/routes/hooks';
// components
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFUpload, RHFTextField } from 'src/components/hook-form';
import { IEmployeeItem } from 'src/types/employees';
import { postFormData } from 'src/api/employee';
import { endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

type Props = {
  currentEmployee?: IEmployeeItem;
};
type FormValuesProps = {
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  file: any;
};

export default function EmployeeNewEditForm({ currentEmployee }: Props) {
  const router = useRouter();
  const mdUp = useResponsive('up', 'md');
  const { enqueueSnackbar } = useSnackbar();

  const NewEmployeeSchema = Yup.object({
    employeeId: Yup.string().required('Employee ID is required'),
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phoneNumber: Yup.string().required('Phone Number is required'),
    address: Yup.string().required('Address is required'),
    file: Yup.mixed<File>()
      .required('File is required')
      .test('fileType', 'Unsupported File Format', (value) => {
        if (!value) return false;
        return ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
      })
      .defined(),
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const defaultValues: FormValuesProps = {
    employeeId: currentEmployee?.employeeId || '',
    firstName: currentEmployee?.firstName || '',
    lastName: currentEmployee?.lastName || '',
    email: currentEmployee?.email || '',
    phoneNumber: currentEmployee?.phoneNumber?.toString() || '',
    address: currentEmployee?.address || '',
    file: null,
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewEmployeeSchema),
    defaultValues,
  });

  const {
    watch,
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();
  console.log(values);

  useEffect(() => {
    if (currentEmployee) {
      reset(defaultValues);
    }
  }, [currentEmployee, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();

    try {
      // Append string fields
      formData.append('employeeId', data.employeeId);
      formData.append('firstName', data.firstName);
      formData.append('lastName', data.lastName);
      formData.append('email', data.email);
      formData.append('phoneNumber', data.phoneNumber);
      formData.append('address', data.address);

      if (data.file && typeof data.file === 'object' && 'type' in data.file) {
        formData.append('file', data.file as File); // Safe cast to File
      } else {
        formData.append('file', '');
      }

      // Debug log
      formData.forEach((value, key) => {
        console.log(`${key}:`, value);
      });

      await postFormData(endpoints.employee.add, formData);
      enqueueSnackbar('Employee created successfully!');
      router.push('/dashboard/employees');
    } catch (error) {
      enqueueSnackbar('Error creating employee', { variant: 'error' });
      console.error('Submission error:', error);
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      const fileWithPreview = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      setValue('file', fileWithPreview as unknown as File, { shouldValidate: true });
    },
    [setValue]
  );

  const handleRemoveFile = useCallback(() => setValue('file', null), [setValue]);

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <Card>
            {!mdUp && <CardHeader title="Details" />}
            <Stack spacing={3} sx={{ p: 3 }}>
              <RHFTextField name="employeeId" label="Employee ID" />
              <RHFTextField name="firstName" label="First Name" />
              <RHFTextField name="lastName" label="Last Name" />
              <RHFTextField name="email" label="Email" />
              <RHFTextField name="phoneNumber" label="Phone Number" />
              <RHFTextField name="address" label="Address (comma-separated)" />

              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Image</Typography>
                <RHFUpload
                  name="file"
                  maxSize={3145728}
                  onDrop={handleDrop}
                  onDelete={handleRemoveFile}
                />
              </Stack>
            </Stack>
          </Card>
        </Grid>

        <Grid xs={12} md={8}>
          <LoadingButton
            fullWidth
            type="submit"
            size="large"
            loading={isSubmitting}
            variant="contained"
            sx={{
              backgroundColor: '#4491CE',
              color: '#FFFFFF',
              '&:hover': {
                backgroundColor: '#357bb0',
              },
            }}
          >
            {currentEmployee ? 'Save Changes' : 'Create Employee'}
          </LoadingButton>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

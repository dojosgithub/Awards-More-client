import * as Yup from 'yup';
import { useCallback, useMemo, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
// @mui
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import LoadingButton from '@mui/lab/LoadingButton';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
// assets
import { countries } from 'src/assets/data';
// _mock
import { _tourGuides, TOUR_SERVICE_OPTIONS, _tags } from 'src/_mock';
// components
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFEditor,
  RHFUpload,
  RHFTextField,
  RHFAutocomplete,
  RHFMultiCheckbox,
} from 'src/components/hook-form';
import { ITourItem } from 'src/types/tour';
// types

// ----------------------------------------------------------------------

type Props = {
  currentTour?: ITourItem;
};

export default function EmployeeNewEditForm({ currentTour }: Props) {
  const router = useRouter();

  const mdUp = useResponsive('up', 'md');

  const { enqueueSnackbar } = useSnackbar();

  const NewTourSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    content: Yup.string().required('Content is required'),
    images: Yup.array().min(1, 'Images is required'),
    //
    tourGuides: Yup.array().min(1, 'Must have at least 1 guide'),
    durations: Yup.string().required('Duration is required'),
    tags: Yup.array().min(2, 'Must have at least 2 tags'),
    services: Yup.array().min(2, 'Must have at least 2 services'),
    destination: Yup.string().required('Destination is required'),
    available: Yup.object().shape({
      startDate: Yup.mixed<any>().nullable().required('Start date is required'),
      endDate: Yup.mixed<any>()
        .required('End date is required')
        .test(
          'date-min',
          'End date must be later than start date',
          (value, { parent }) => value.getTime() > parent.startDate.getTime()
        ),
    }),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentTour?.name || '',
      content: currentTour?.content || '',
      images: currentTour?.images || [],
      //
      tourGuides: currentTour?.tourGuides || [],
      tags: currentTour?.tags || [],
      durations: currentTour?.durations || '',
      destination: currentTour?.destination || '',
      services: currentTour?.services || [],
      available: {
        startDate: currentTour?.available.startDate || null,
        endDate: currentTour?.available.endDate || null,
      },
    }),
    [currentTour]
  );

  const methods = useForm({
    resolver: yupResolver(NewTourSchema),
    defaultValues,
  });

  const {
    watch,
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (currentTour) {
      reset(defaultValues);
    }
  }, [currentTour, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(currentTour ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.employee.root);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const files = values.images || [];

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setValue('images', [...files, ...newFiles], { shouldValidate: true });
    },
    [setValue, values.images]
  );

  const handleRemoveFile = useCallback(
    (inputFile: File | string) => {
      const filtered = values.images && values.images?.filter((file) => file !== inputFile);
      setValue('images', filtered);
    },
    [setValue, values.images]
  );

  const handleRemoveAllFiles = useCallback(() => {
    setValue('images', []);
  }, [setValue]);

  const renderDetails = (
    <Grid xs={12} md={8}>
      <Card>
        {!mdUp && <CardHeader title="Details" />}

        <Stack spacing={3} sx={{ p: 3 }}>
          <Stack spacing={1.5}>
            <RHFTextField name="name" placeholder="Employee Id" />
          </Stack>
          <Stack spacing={1.5}>
            <RHFTextField name="name" placeholder="Name" />
          </Stack>
          <Stack spacing={1.5}>
            <RHFTextField name="name" placeholder="Address" />
          </Stack>
          <Stack spacing={1.5}>
            <RHFTextField name="name" placeholder="email" />
          </Stack>
          <Stack spacing={1.5}>
            <RHFTextField name="name" placeholder="Phone Number" />
          </Stack>

          <Stack spacing={1.5}>
            <Typography variant="subtitle2">Image</Typography>
            <RHFUpload
              multiple
              thumbnail
              name="images"
              maxSize={3145728}
              onDrop={handleDrop}
              onRemove={handleRemoveFile}
              onRemoveAll={handleRemoveAllFiles}
              onUpload={() => console.info('ON UPLOAD')}
            />
          </Stack>
        </Stack>
      </Card>
    </Grid>
  );
  const renderActions = (
    <>
      {mdUp && <Grid md={4} />}
      <Grid xs={12} md={8} sx={{ display: 'flex', alignItems: 'center' }}>
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
          variant="contained"
        >
          {!currentTour ? 'Create Tour' : 'Save Changes'}
        </LoadingButton>
      </Grid>
    </>
  );
  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {renderDetails}
        {renderActions}
      </Grid>
    </FormProvider>
  );
}

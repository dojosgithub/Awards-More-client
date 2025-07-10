import { useCallback, useMemo } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Stack from '@mui/material/Stack';
import { Button, Typography } from '@mui/material';

import { LoadingButton } from '@mui/lab';
import { useRouter } from 'src/routes/hooks';
import FormProvider, { RHFTextField, RHFUpload } from 'src/components/hook-form';

// ✅ Step 1: Yup Schema
const CategorySchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  coverUrl: Yup.mixed<any>().nullable().required('Cover is required'),
});

// ✅ Step 2: Infer FormValues from schema directly
type FormValues = Yup.InferType<typeof CategorySchema>;

export default function CategoryNewEditForm() {
  const router = useRouter();

  const defaultValues = useMemo<FormValues>(
    () => ({
      title: '',
      description: '',
      coverUrl: null,
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(CategorySchema),
  });
  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValues) => {
    try {
      console.log('Form submitted:', data);
      // your API call here...

      reset();
    } catch (error) {
      console.error('Submit failed:', error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      setValue('coverUrl', newFile, { shouldValidate: true });
    },
    [setValue]
  );

  const handleRemoveFile = useCallback(() => {
    setValue('coverUrl', null);
  }, [setValue]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="title" label="Title" />
        <RHFTextField name="description" label="Description" multiline rows={3} />

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Copload Picture</Typography>
          <RHFUpload
            name="coverUrl"
            maxSize={3145728}
            onDrop={handleDrop}
            onDelete={handleRemoveFile}
          />
        </Stack>

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
          Submit Now
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}

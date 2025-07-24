import { useCallback, useEffect, useMemo } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Stack from '@mui/material/Stack';
import { Button, Typography } from '@mui/material';

import { LoadingButton } from '@mui/lab';
import { enqueueSnackbar } from 'notistack';
import { useRouter } from 'src/routes/hooks';
import FormProvider, { RHFTextField, RHFUpload } from 'src/components/hook-form';
import { createCategory, updateCategory } from 'src/api/categories';
import { ICategoryItem } from 'src/types/category';
import { paths } from 'src/routes/paths';

type Props = {
  currentCategory?: ICategoryItem;
  handleClose?: () => void;
  mutateCategory?: () => void;
};
type FormValuesProps = {
  title: string;
  description: string;

  file: any;
};

export default function PromoCodeNewEditForm({
  currentCategory,
  handleClose,
  mutateCategory,
}: Props) {
  const router = useRouter();

  const CategorySchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    file: Yup.mixed<File>()
      .required('File is required')
      .test('fileType', 'Unsupported File Format', (value) => {
        if (!value) return false;
        return ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
      })
      .defined(),
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const defaultValues = useMemo<FormValuesProps>(
    () => ({
      title: currentCategory?.title || '',
      description: currentCategory?.description || '',
      file: currentCategory?.imageUrl || null,
    }),
    [currentCategory]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CategorySchema),
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
    // Reset form when currentCategory or defaultValues change
    reset(defaultValues);
  }, [currentCategory, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();

    try {
      // Append string fields
      formData.append('title', data.title);
      formData.append('description', data.description);

      if (data.file && typeof data.file === 'object' && 'type' in data.file) {
        formData.append('file', data.file as File);
      } else {
        formData.append('file', '');
      }

      // Debug log
      formData.forEach((value, key) => {
        console.log(`${key}:`, value);
      });

      if (currentCategory) {
        await updateCategory(formData, currentCategory._id);
        enqueueSnackbar('Category updated successfully!');
      } else {
        await createCategory(formData);
        enqueueSnackbar('Category created successfully!');
        if (mutateCategory) {
          mutateCategory();
        }
        if (handleClose) {
          handleClose();
        }
      }

      // Redirect in both cases
      router.push(paths.dashboard.category.root);
    } catch (error) {
      enqueueSnackbar('Error saving employee. Please try again.', { variant: 'error' });
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
      <Stack spacing={3}>
        <RHFTextField name="title" label="Title" />
        <RHFTextField name="description" label="Description" multiline rows={3} />

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Upload Picture</Typography>
          <RHFUpload
            name="file"
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

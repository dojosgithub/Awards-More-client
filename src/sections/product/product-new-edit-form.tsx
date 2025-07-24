import * as Yup from 'yup';
import { useCallback, useMemo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
// routes
import { paths } from 'src/routes/paths';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// _mock
import { _roles } from 'src/_mock';
// components
import { useSnackbar } from 'src/components/snackbar';
import { useRouter } from 'src/routes/hooks';
import FormProvider, {
  RHFEditor,
  RHFUpload,
  RHFTextField,
  RHFAutocomplete,
} from 'src/components/hook-form';
// types
import { IProduct, IProductFormItems } from 'src/types/product';
import { createProduct, updateProduct, useGetProductCategories } from 'src/api/product';

// ----------------------------------------------------------------------

type Props = {
  currentProduct?: IProductFormItems;
};
type ProductFormValues = {
  title: string;
  description: string;
  sku: string;
  price: string;
  minimumOrderQuantity: number;
  files: (string | File)[];
  category: string;
};
type CustomFile = File & {
  preview?: string;
};

export default function ProductNewEditForm({ currentProduct }: Props) {
  const router = useRouter();

  const mdUp = useResponsive('up', 'md');

  const { enqueueSnackbar } = useSnackbar();
  const { productCategories } = useGetProductCategories();
  // console.log('productCategories', productCategories);

  const NewProductSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    sku: Yup.string().required('SKU is required'),
    price: Yup.string()
      .required('Price is required')
      .test('is-positive', 'Price must be greater than 0', (value) => Number(value) > 0),

    minimumOrderQuantity: Yup.number().required('Minimum Order Quantity is required').min(1),
    files: Yup.array()
      .of(Yup.mixed<string | File>().required()) // <--- Enforce non-undefined items
      .required('At least one image is required')
      .min(1, 'At least one image is required'),

    category: Yup.string().required('Category is required'),
  });
  // console.log('currentProduct?.files', currentProduct?.imageUrls);

  const defaultValues = useMemo(
    () => ({
      title: currentProduct?.title || '',
      description: currentProduct?.description || '',
      sku: currentProduct?.sku || '',
      price: currentProduct?.price || '',
      minimumOrderQuantity: currentProduct?.minimumOrderQuantity || 1,
      files: currentProduct?.imageUrls || [],

      category: currentProduct?.category || '',
    }),
    [currentProduct]
  );

  const methods = useForm<ProductFormValues>({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (currentProduct) {
      reset(defaultValues);
    }
  }, [currentProduct, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    try {
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('sku', data.sku);
      formData.append('price', Number(data.price).toString());

      formData.append('minimumOrderQuantity', data.minimumOrderQuantity.toString());
      formData.append('category', data.category);

      // Append images
      (data.files || []).forEach((file: File | string) => {
        if (typeof file === 'object') {
          formData.append('files', file as File);
        }
      });

      if (currentProduct) {
        await updateProduct(formData, currentProduct._id);
        enqueueSnackbar('Product updated successfully!');
      } else {
        await createProduct(formData);
        enqueueSnackbar('Product created successfully!');
      }

      router.push(paths.dashboard.product.root);
    } catch (error) {
      enqueueSnackbar('Error saving product. Please try again.', { variant: 'error' });
      console.error('Submission error:', error);
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const files = values.files || [];

      const newFiles: CustomFile[] = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setValue('files', [...files, ...newFiles], { shouldValidate: true });
    },
    [setValue, values.files]
  );

  const handleRemoveFile = useCallback(
    (inputFile: File | string) => {
      const filtered = values.files?.filter((file) => file !== inputFile);
      setValue('files', filtered);
    },
    [setValue, values.files]
  );

  const handleRemoveAllFiles = useCallback(() => {
    setValue('files', []);
  }, [setValue]);

  const renderDetails = (
    <Grid xs={12} md={8}>
      <Card>
        <Stack spacing={3} sx={{ p: 3 }}>
          <RHFTextField name="title" label="Title" />
          <RHFTextField name="sku" label="SKU" />
          <RHFTextField name="price" label="Price" type="number" />
          <RHFTextField name="minimumOrderQuantity" label="Minimum Order Quantity" type="number" />
          <RHFAutocomplete
            name="category"
            label="Category"
            options={productCategories}
            getOptionLabel={(option) =>
              typeof option === 'string'
                ? productCategories.find((cat: { _id: string }) => cat._id === option)?.title || ''
                : option.title
            }
            renderOption={(props, option) => (
              <li {...props} key={option._id}>
                {option.title}
              </li>
            )}
            isOptionEqualToValue={(option, value) =>
              typeof value === 'string' ? option._id === value : option._id === value._id
            }
            onChange={(_, newValue) => {
              setValue('category', newValue?._id || '', { shouldValidate: true });
            }}
            value={
              productCategories.find((cat: { _id: string }) => cat._id === watch('category')) ||
              null
            }
          />

          <RHFEditor simple name="description" />

          <Stack spacing={1.5}>
            <Typography variant="subtitle2">Upload Pictures</Typography>
            <RHFUpload
              multiple
              thumbnail
              name="files"
              maxSize={3145728}
              onDrop={handleDrop}
              onRemove={handleRemoveFile}
              onRemoveAll={handleRemoveAllFiles}
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
        >
          {!currentProduct ? 'Submit Now' : 'Save Changes'}
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

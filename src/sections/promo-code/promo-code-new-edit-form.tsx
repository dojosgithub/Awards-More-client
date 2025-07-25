import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useMemo,
} from 'react';
import * as Yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { Resolver } from 'react-hook-form';
import Stack from '@mui/material/Stack';
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Chip,
  OutlinedInput,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { enqueueSnackbar } from 'notistack';
import { useRouter } from 'src/routes/hooks';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { paths } from 'src/routes/paths';
import type { IPromoCodeItem } from 'src/types/promo-codes';
import { createPromoCode, useGetPromoCodeProducts } from 'src/api/promo-code';

type Props = {
  currentCategory?: IPromoCodeItem;
  handleClose?: () => void;
  mutateCategory?: () => void;
};

type FormValuesProps = {
  code: string;
  createdFor: string;
  type: 'percentage' | 'fixed amount';
  discountAmount: number;
  isNewUser: boolean;
  isredemptionLimit: boolean;
  isProductSpecific: boolean;
  products: string[];
  redeemptionLimit: number | null;
  expiryDate: Date | null;
  expiryTime: Date | null;
  hasExpirationDate: boolean;
};

export default function PromoCodeNewEditForm({ handleClose, mutateCategory }: Props) {
  const router = useRouter();
  const { promoCodeproducts } = useGetPromoCodeProducts();
  const PromoCodeSchema = Yup.object({
    code: Yup.string().required('Promo code is required'),
    createdFor: Yup.string().required('Created for is required'),
    type: Yup.string().oneOf(['percentage', 'fixed amount']).required('Type is required'),
    discountAmount: Yup.number()
      .positive('Discount amount must be positive')
      .required('Discount amount is required'),

    // Explicitly required booleans (since FormValuesProps expects them to be non-null)
    isNewUser: Yup.boolean().required(),
    isredemptionLimit: Yup.boolean().required(),
    isProductSpecific: Yup.boolean().required(),
    hasExpirationDate: Yup.boolean().required(),

    products: Yup.array()
      .of(Yup.string().required('Product ID is required')) // Ensure each item is a required string
      .required('Products array is required'),

    redeemptionLimit: Yup.number()
      .nullable()
      .when('isredemptionLimit', {
        is: true,
        then: (schema) =>
          schema
            .positive('Redemption limit must be positive')
            .required('Redemption limit is required'),
        otherwise: (schema) => schema.notRequired(),
      }),

    expiryDate: Yup.date().nullable(),
    expiryTime: Yup.date().nullable(),
  });

  const resolver = yupResolver(PromoCodeSchema) as Resolver<FormValuesProps>;
  const methods = useForm<FormValuesProps>({
    resolver,
    defaultValues: {
      code: '',
      createdFor: '',
      type: 'percentage',
      discountAmount: 0,
      isNewUser: false,
      isredemptionLimit: false,
      isProductSpecific: false,
      products: [],
      redeemptionLimit: null,
      expiryDate: null,
      expiryTime: null,
      hasExpirationDate: false,
    },
  });

  const {
    control,
    watch,
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();
  console.log('values', values);

  const onSubmit = async (data: FormValuesProps) => {
    try {
      // Format the data to match the expected API structure
      const payload = {
        code: data.code,
        createdFor: data.createdFor,
        type: data.type,
        discountAmount: data.discountAmount,
        isNewUser: data.isNewUser,
        isredemptionLimit: data.isredemptionLimit,
        isProductSpecific: data.isProductSpecific,
        products: data.isProductSpecific ? data.products : [],
        redeemptionLimit: data.isredemptionLimit ? data.redeemptionLimit : 0,
        expiryDate:
          data.hasExpirationDate && data.expiryDate
            ? data.expiryDate.toISOString().split('T')[0]
            : null,
        expiryTime:
          data.hasExpirationDate && data.expiryTime
            ? data.expiryTime.toTimeString().split(' ')[0].substring(0, 5)
            : null,
      };

      // Remove null values if not needed
      const cleanPayload = Object.fromEntries(
        Object.entries(payload).filter(([_, value]) => value !== null && value !== undefined)
      );

      console.log('Sending payload:', cleanPayload);

      await createPromoCode(cleanPayload);
      enqueueSnackbar('Promo code created successfully!');
      mutateCategory?.();
      handleClose?.();
      router.push(paths.dashboard.category.root);
    } catch (error) {
      enqueueSnackbar('Error creating promo code. Please try again.', { variant: 'error' });
      console.error('Submission error:', error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Typography sx={{ fontSize: '22px', fontWeight: 600 }}>Add Promo Code</Typography>

        <RHFTextField name="code" label="Promo Code" placeholder="e.g., WELCOME30" />

        <RHFTextField name="createdFor" label="Created For" placeholder="e.g., new users" />

        <Controller
          name="type"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <FormControl fullWidth error={!!error}>
              <InputLabel>Discount Type</InputLabel>
              <Select {...field} label="Discount Type">
                <MenuItem value="percentage">Percentage</MenuItem>
                <MenuItem value="fixed amount">Fixed Amount</MenuItem>
              </Select>
            </FormControl>
          )}
        />

        <RHFTextField
          name="discountAmount"
          label="Discount Amount"
          type="number"
          placeholder={values.type === 'percentage' ? 'e.g., 30' : 'e.g., 100'}
        />

        <Typography sx={{ fontSize: '20px', fontWeight: 600 }}>Settings</Typography>

        <Controller
          name="isNewUser"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Eligible for first-time order only"
            />
          )}
        />

        <Controller
          name="isProductSpecific"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Limit to specific Products"
            />
          )}
        />

        {values.isProductSpecific && (
          <Controller
            name="products"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Select Products</InputLabel>
                <Select
                  {...field}
                  multiple
                  input={<OutlinedInput label="Select Products" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {(selected as string[]).map((value) => {
                        const product = promoCodeproducts.find(
                          (p: { _id: string }) => p._id === value
                        );
                        return <Chip key={value} label={product?.title || value} />;
                      })}
                    </Box>
                  )}
                >
                  {promoCodeproducts.map((product: { _id: string; title: string }) => (
                    <MenuItem key={product._id} value={product._id}>
                      {product.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        )}

        <Controller
          name="isredemptionLimit"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Limit the number of times this code can be redeemed"
            />
          )}
        />

        {values.isredemptionLimit && (
          <>
            <Typography sx={{ fontSize: '18px', fontWeight: 600 }}>Redemption Limit</Typography>
            <RHFTextField
              name="redeemptionLimit"
              label="Maximum Redemptions"
              type="number"
              placeholder="e.g., 100"
            />
          </>
        )}

        <Controller
          name="hasExpirationDate"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Add an expiration date"
            />
          )}
        />

        {values.hasExpirationDate && (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Controller
              name="expiryDate"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DatePicker
                  label="Expiry Date"
                  value={field.value}
                  onChange={(newValue) => field.onChange(newValue)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!error,
                      helperText: error?.message,
                    },
                  }}
                />
              )}
            />

            <Controller
              name="expiryTime"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TimePicker
                  label="Expiry Time"
                  value={field.value}
                  onChange={(newValue) => field.onChange(newValue)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!error,
                      helperText: error?.message,
                    },
                  }}
                />
              )}
            />
          </Box>
        )}

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
          Create Promo Code
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}

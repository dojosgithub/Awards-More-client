// @mui
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
// types
import {
  IOrderCustomer,
  IOrderDelivery,
  IOrderPayment,
  IOrderShippingAddress,
} from 'src/types/order';
// components
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
  customer: IOrderCustomer;
  delivery: IOrderDelivery;
  payment: IOrderPayment;
  shippingAddress: IOrderShippingAddress;
};

export default function OrderDetailsInfo({ customer, delivery, payment, shippingAddress }: Props) {
  const renderCustomer = (
    <>
      <CardHeader title="Customer Info" />
      <Stack direction="row" sx={{ p: 3 }}>
        <Stack spacing={0.5} alignItems="flex-start" sx={{ typography: 'body2' }}>
          <Typography variant="subtitle2">{customer.name}</Typography>

          <Box sx={{ color: 'text.secondary' }}>{customer.email}</Box>

          <Box>
            IP Address:
            <Box component="span" sx={{ color: 'text.secondary', ml: 0.25 }}>
              {customer.ipAddress}
            </Box>
          </Box>
        </Stack>
      </Stack>
    </>
  );

  const renderDelivery = (
    <>
      <CardHeader title="Shipping" />
      <Stack spacing={1.5} sx={{ p: 3, typography: 'body2' }}>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            Address
          </Box>
          {delivery.shipBy}
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            Phone Number
          </Box>
          {delivery.speedy}
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            Email
          </Box>
          <Link underline="always" color="inherit">
            {delivery.trackingNumber}
          </Link>
        </Stack>
      </Stack>
    </>
  );

  const renderShipping = (
    <>
      <CardHeader
        title="Billing Address"
        action={
          <IconButton>
            <Iconify icon="solar:pen-bold" />
          </IconButton>
        }
      />
      <Stack spacing={1.5} sx={{ p: 3, typography: 'body2' }}>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            Address
          </Box>
          {shippingAddress.fullAddress}
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            Phone number
          </Box>
          {shippingAddress.phoneNumber}
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            Email
          </Box>
          email@emai;.com
        </Stack>
      </Stack>
    </>
  );

  const renderPayment = (
    <>
      <CardHeader
        title="Payment"
        action={
          <IconButton>
            <Iconify icon="solar:pen-bold" />
          </IconButton>
        }
      />
      <Stack direction="row" alignItems="center" sx={{ p: 3, typography: 'body2' }}>
        <Box component="span" sx={{ color: 'text.secondary', flexGrow: 1 }}>
          Phone number
        </Box>

        {payment.cardNumber}
        <Iconify icon="logos:mastercard" width={24} sx={{ ml: 0.5 }} />
      </Stack>
    </>
  );

  return (
    <Card>
      {renderCustomer}

      <Divider sx={{ borderStyle: 'dashed' }} />

      {renderDelivery}

      <Divider sx={{ borderStyle: 'dashed' }} />

      {renderShipping}

      {/* <Divider sx={{ borderStyle: 'dashed' }} />

      {renderPayment} */}
    </Card>
  );
}

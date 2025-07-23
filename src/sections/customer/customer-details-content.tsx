import React from 'react';
import {
  Avatar,
  Box,
  Card,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Using Grid v2
import { ICustomer } from 'src/types/customers';

type InfoRowProps = {
  label: string;
  value: string;
};
type Props = {
  customer: ICustomer;
};
const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => (
  <Stack direction="row" spacing={2} alignItems="flex-start">
    <Typography
      sx={{
        color: '#637381',
        minWidth: '120px',
        fontWeight: 400,
        fontSize: '14px',
        flexShrink: 0,
      }}
    >
      {label}
    </Typography>
    <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
      {value}
    </Typography>
  </Stack>
);

export default function CustomerDetailsContent({ customer }: Props) {
  const {
    _id,
    firstName,
    lastName,
    email,
    phoneNumber,
    address,
    quickbooksId,
    password,
    account_Type,
    orders,
    role,
    imageUrl,
    createdAt,
    updatedAt,
  } = customer;
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const customerProfileCard = (
    <Card
      sx={{
        width: '100%',
        maxWidth: 400,
        p: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', pb: 2 }}>
        <Avatar />
        <Typography pl={2} pt={1} fontWeight={600}>
          {`${firstName} ${lastName}`}
        </Typography>
      </Box>
      <Divider />
      <Stack spacing={2} pt={2}>
        <InfoRow label="Email" value={email} />
        <InfoRow label="Phone Number" value={phoneNumber} />
        <InfoRow label="Shipping Address" value={address} />
        <Divider />
        <InfoRow label="Billing Address" value={address} />
        <InfoRow label="Phone Number" value={phoneNumber} />
        <InfoRow label="Email" value={email} />
      </Stack>
    </Card>
  );

  return (
    <Grid container spacing={3}>
      <Grid xs={12} sm={8} md={6}>
        {customerProfileCard}
      </Grid>
    </Grid>
  );
}

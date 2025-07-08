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

type InfoRowProps = {
  label: string;
  value: string;
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

export default function CustomerDetailsContent() {
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
          Name
        </Typography>
      </Box>
      <Divider />
      <Stack spacing={2} pt={2}>
        <InfoRow label="Email" value="example@gmail.com" />
        <InfoRow label="Phone Number" value="032323323232" />
        <InfoRow label="Shipping Address" value="305 SE 3rd Ave. Mineral Wells, TX 76067" />
        <Divider />
        <InfoRow label="Billing Address" value="305 SE 3rd Ave. Mineral Wells, TX 76067" />
        <InfoRow label="Phone Number" value="323232323232" />
        <InfoRow label="Email" value="admin@dw.com" />
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

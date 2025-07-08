import React from 'react';
import { Card, CardContent, Typography, Grid, TextField } from '@mui/material';

interface CheckoutDeliveryProps {
  data: any;
  onChange: (field: string, value: string) => void;
}

const CheckoutDelivery: React.FC<CheckoutDeliveryProps> = ({ data, onChange }) => (
  <Card sx={{ mb: 3 }}>
    <CardContent>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
        Delivery
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="First name"
            value={data.firstName}
            onChange={(e) => onChange('firstName', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Last name"
            value={data.lastName}
            onChange={(e) => onChange('lastName', e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Address"
            value={data.address}
            onChange={(e) => onChange('address', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="City"
            value={data.city}
            onChange={(e) => onChange('city', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="State"
            value={data.state}
            onChange={(e) => onChange('state', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="ZIP code"
            value={data.zipCode}
            onChange={(e) => onChange('zipCode', e.target.value)}
          />
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default CheckoutDelivery;

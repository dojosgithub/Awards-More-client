import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Grid,
  TextField,
} from '@mui/material';
import Iconify from 'src/components/iconify';

interface CheckoutPaymentProps {
  paymentMethod: string;
  onPaymentMethodChange: (method: string) => void;
  data: any;
  onChange: (field: string, value: string) => void;
}

const CheckoutPayment: React.FC<CheckoutPaymentProps> = ({
  paymentMethod,
  onPaymentMethodChange,
  data,
  onChange,
}) => (
  <Card>
    <CardContent>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
        Payment
      </Typography>

      <FormControl component="fieldset" sx={{ mb: 3 }}>
        <RadioGroup value={paymentMethod} onChange={(e) => onPaymentMethodChange(e.target.value)}>
          <FormControlLabel
            value="card"
            control={<Radio />}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Iconify icon="mdi:cart" color="#31C5F4" /> Credit Card
              </Box>
            }
          />
          <FormControlLabel
            value="paypal"
            control={<Radio />}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Iconify icon="mdi:cart" color="#31C5F4" /> PayPal
              </Box>
            }
          />
        </RadioGroup>
      </FormControl>

      {paymentMethod === 'card' && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Card number"
              value={data.cardNumber}
              onChange={(e) => onChange('cardNumber', e.target.value)}
              placeholder="1234 5678 9012 3456"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Expiry date"
              value={data.expiryDate}
              onChange={(e) => onChange('expiryDate', e.target.value)}
              placeholder="MM/YY"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="CVV"
              value={data.cvv}
              onChange={(e) => onChange('cvv', e.target.value)}
              placeholder="123"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name on card"
              value={data.cardName}
              onChange={(e) => onChange('cardName', e.target.value)}
            />
          </Grid>
        </Grid>
      )}
    </CardContent>
  </Card>
);

export default CheckoutPayment;

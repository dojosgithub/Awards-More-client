import React from 'react';
import { Typography, Box, Divider, Paper, Button } from '@mui/material';
import { Item } from 'src/types/items';
import CheckoutOrder from './checkout-order-complete';

interface CheckoutSummaryProps {
  items: Item[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  onPlaceOrder: () => void;
}

const CheckoutSummary: React.FC<CheckoutSummaryProps> = ({
  items,
  subtotal,
  shipping,
  tax,
  total,
  onPlaceOrder,
}) => (
  <Paper sx={{ p: 3, position: 'sticky', top: 20 }}>
    <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
      Your Products
    </Typography>

    <Box sx={{ mb: 3 }}>
      {items.map((item, index) => (
        <CheckoutOrder key={item.id} item={item} showDivider={index < items.length - 1} />
      ))}
    </Box>

    <Divider sx={{ mb: 2 }} />

    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="body2">Subtotal</Typography>
        <Typography variant="body2">${subtotal.toFixed(2)}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="body2">Shipping</Typography>
        <Typography variant="body2">${shipping.toFixed(2)}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="body2">Tax</Typography>
        <Typography variant="body2">${tax.toFixed(2)}</Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6" fontWeight="bold">
          Total
        </Typography>
        <Typography variant="h6" fontWeight="bold">
          ${total.toFixed(2)}
        </Typography>
      </Box>
    </Box>

    <Button
      fullWidth
      variant="contained"
      size="large"
      onClick={onPlaceOrder}
      sx={{ py: 1.5, borderRadius: 2, textTransform: 'none', fontSize: '1rem', fontWeight: 'bold' }}
    >
      Place Order
    </Button>
  </Paper>
);

export default CheckoutSummary;

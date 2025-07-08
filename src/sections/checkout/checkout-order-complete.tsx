import React from 'react';
import { Box, Typography, Divider, Avatar, Chip } from '@mui/material';

interface OrderItemProps {
  item: {
    id: any;
    name: string;
    image?: string;
    price: number;
    quantity: number;
    color?: string;
    size?: string;
  };
  showDivider: boolean;
}

const CheckoutOrder: React.FC<OrderItemProps> = ({ item, showDivider }) => (
  <>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 2 }}>
      <Avatar
        src={item.image}
        alt={item.name}
        sx={{ width: 50, height: 50, borderRadius: 1 }}
        variant="rounded"
      />
      <Box sx={{ flex: 1 }}>
        <Typography variant="subtitle2" fontWeight="medium">
          {item.name}
        </Typography>
        <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5 }}>
          {item.color && <Chip label={item.color} size="small" variant="outlined" />}
          {item.size && <Chip label={item.size} size="small" variant="outlined" />}
        </Box>
        <Typography variant="body2" color="text.secondary">
          Qty: {item.quantity}
        </Typography>
      </Box>
      <Typography variant="subtitle2" fontWeight="bold">
        ${(item.price * item.quantity).toFixed(2)}
      </Typography>
    </Box>
    {showDivider && <Divider />}
  </>
);

export default CheckoutOrder;

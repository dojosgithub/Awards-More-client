'use client';

import type React from 'react';
import {
  Drawer,
  Box,
  Typography,
  Card,
  IconButton,
  Button,
  TextField,
  Divider,
  Avatar,
} from '@mui/material';
import { Icon } from '@iconify/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from 'src/redux/store';
import { removeFromCart, updateQuantity, setCartOpen } from 'src/redux/slices/cartSlice';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose }) => {
  const dispatch = useDispatch();

  const { cartItems, totalPrice } = useSelector((state: RootState) => state.cart);

  const router = useRouter();
  const discountPercent = 10;
  const discount = totalPrice * (discountPercent / 100);
  const finalTotal = totalPrice - discount;

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          width: { xs: 250, sm: 280, md: 400 },
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            borderBottom: '1px solid #f0f0f0',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 500, fontSize: '18px' }}>
            Your Cart
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{
              width: 24,
              height: 24,
              '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' },
            }}
          >
            <Icon icon="mdi:close" width={16} height={16} />
          </IconButton>
        </Box>

        {/* Cart Items */}
        <Box sx={{ flex: 1, overflow: 'auto', px: 2, py: 1 }}>
          {cartItems.length === 0 ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '200px',
                color: '#666',
              }}
            >
              <Icon
                icon="mdi:cart-outline"
                width={48}
                height={48}
                style={{ marginBottom: '16px' }}
              />
              <Typography sx={{ fontSize: '16px', fontWeight: 500 }}>Your cart is empty</Typography>
              <Typography sx={{ fontSize: '14px', color: '#999', mt: 1 }}>
                Add some items to get started
              </Typography>
            </Box>
          ) : (
            cartItems.map((item) => (
              <Card
                key={item.id}
                sx={{
                  mb: 2,
                  p: 2,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                }}
              >
                <Box sx={{ display: 'flex', gap: 2 }}>
                  {/* Product Image */}
                  <Box sx={{ flexShrink: 0 }}>
                    <Avatar
                      src={item.image || '/placeholder.svg?height=120&width=96'}
                      alt={item.name}
                      variant="square"
                      sx={{
                        width: '64px',
                        height: '80px',
                        borderRadius: '4px',
                      }}
                    />
                  </Box>

                  {/* Product Details */}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        mb: 1,
                      }}
                    >
                      <Typography sx={{ fontSize: '14px', fontWeight: 500, pr: 1 }}>
                        {item.name}
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-end',
                          gap: 0.5,
                        }}
                      >
                        <IconButton
                          onClick={() => handleRemoveItem(item.id)}
                          sx={{
                            width: 16,
                            height: 16,
                            border: '1px solid #d0d0d0',
                            borderRadius: '50%',
                            padding: 0,
                            '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' },
                          }}
                        >
                          <Icon icon="mdi:close" width={8} height={8} />
                        </IconButton>
                        <Typography sx={{ fontSize: '12px', fontWeight: 500 }}>
                          ${item.totalPrice.toFixed(2)}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ mb: 1 }}>
                      {item.size && (
                        <Typography sx={{ fontSize: '12px', color: '#666', mb: 0.5 }}>
                          Size: {item.size}
                        </Typography>
                      )}
                      {item.color && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Typography sx={{ fontSize: '12px', color: '#666' }}>Color:</Typography>
                          <Box
                            sx={{
                              width: 12,
                              height: 12,
                              borderRadius: '50%',
                              backgroundColor: item.color,
                              border: '1px solid #d0d0d0',
                            }}
                          />
                        </Box>
                      )}
                    </Box>

                    {/* Quantity Controls */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() =>
                          handleUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
                        }
                        disabled={item.quantity <= 1}
                        sx={{
                          width: 24,
                          height: 24,
                          border: '1px solid #d0d0d0',
                          borderRadius: '4px',
                          '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' },
                        }}
                      >
                        <Icon icon="mdi:minus" width={12} height={12} />
                      </IconButton>
                      <Typography
                        sx={{
                          fontSize: '14px',
                          fontWeight: 500,
                          minWidth: '20px',
                          textAlign: 'center',
                        }}
                      >
                        {item.quantity}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        sx={{
                          width: 24,
                          height: 24,
                          border: '1px solid #d0d0d0',
                          borderRadius: '4px',
                          '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' },
                        }}
                      >
                        <Icon icon="mdi:plus" width={12} height={12} />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </Card>
            ))
          )}

          {/* Add More Items */}
          {cartItems.length > 0 && (
            <Button
              fullWidth
              variant="text"
              startIcon={<Icon icon="mdi:plus" width={16} height={16} />}
              sx={{
                mb: 3,
                color: '#666',
                justifyContent: 'flex-start',
                textTransform: 'none',
                fontSize: '14px',
                fontWeight: 400,
                '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' },
              }}
            >
              Add More Items
            </Button>
          )}
          <Divider />

          {cartItems.length > 0 && (
            <Card
              elevation={2}
              sx={{
                p: 3,
                backgroundColor: '#fff',
                borderRadius: 2,
                mb: 4,
              }}
            >
              {/* Special Instructions */}
              <Box sx={{ mb: 3 }}>
                <Typography sx={{ fontSize: '14px', fontWeight: 500, color: '#333', mb: 1 }}>
                  Special Instructions
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder=""
                  variant="outlined"
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      fontSize: '14px',
                      backgroundColor: '#fafafa',
                    },
                  }}
                />
              </Box>

              {/* Promo Code */}
              <Box sx={{ mb: 3 }}>
                <Typography sx={{ fontSize: '14px', fontWeight: 500, color: '#333', mb: 1 }}>
                  Promo Code
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    fullWidth
                    placeholder=""
                    variant="outlined"
                    size="small"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        fontSize: '14px',
                        backgroundColor: '#fafafa',
                      },
                    }}
                  />
                  <Button
                    variant="text"
                    sx={{
                      color: '#999',
                      fontSize: '14px',
                      textTransform: 'none',
                      minWidth: 'auto',
                      px: 2,
                      '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' },
                    }}
                  >
                    Apply
                  </Button>
                </Box>
              </Box>

              {/* Order Summary */}
              <Box sx={{ borderTop: '1px solid #f0f0f0', pt: 2 }}>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography sx={{ fontSize: '14px', color: '#333' }}>Sub Total</Typography>
                    <Typography sx={{ fontSize: '14px', color: '#333' }}>
                      ${totalPrice.toFixed(2)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography sx={{ fontSize: '14px', color: '#333' }}>Tax</Typography>
                    <Typography sx={{ fontSize: '14px', color: '#333' }}>Inclusive</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography sx={{ fontSize: '14px', color: '#333' }}>Discount</Typography>
                    <Typography sx={{ fontSize: '14px', color: '#333' }}>
                      {discountPercent}%
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography sx={{ fontSize: '16px', fontWeight: 500, color: '#333' }}>
                      Total Price
                    </Typography>
                    <Typography sx={{ fontSize: '16px', fontWeight: 500, color: '#333' }}>
                      ${finalTotal.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>

                {/* Action Buttons */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Button
                    onClick={() => {
                      router.push(paths.product.checkout);
                      dispatch(setCartOpen(false));
                    }}
                    fullWidth
                    variant="contained"
                    sx={{
                      backgroundColor: '#4491CE',
                      height: '45px',
                      color: 'white',
                      textTransform: 'none',
                      fontSize: '16px',
                      fontWeight: 500,
                      py: 1.5,
                      '&:hover': { backgroundColor: '#1976D2' },
                    }}
                  >
                    Checkout
                  </Button>
                  <Button
                    onClick={() => {
                      router.push(paths.cart);
                      dispatch(setCartOpen(false));
                    }}
                    fullWidth
                    variant="outlined"
                    sx={{
                      borderColor: '#4491CE',
                      height: '45px',
                      color: '#4491CE',
                      textTransform: 'none',
                      fontSize: '16px',
                      fontWeight: 400,
                      py: 1.5,
                      '&:hover': {
                        backgroundColor: 'rgba(0,0,0,0.04)',
                        borderColor: '#d0d0d0',
                      },
                    }}
                  >
                    View Cart
                  </Button>
                </Box>
              </Box>
            </Card>
          )}
        </Box>
      </Box>
    </Drawer>
  );
};

export default CartDrawer;

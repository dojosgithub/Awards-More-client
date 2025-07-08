import type React from 'react';
import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Grid,
  Divider,
  TextField,
  Avatar,
  Chip,
  Container,
  CardMedia,
  Stack,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Iconify from 'src/components/iconify';
import { RootState } from 'src/redux/store';
import { removeFromCart, updateQuantity } from 'src/redux/slices/cartSlice';
import ProductCard from 'src/sections/product/product-card';

interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  color?: string;
  size?: string;
}

interface ShoppingCartProps {
  onCheckout?: () => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ onCheckout }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  const products = [
    {
      id: '1',

      image: '/assets/images/home/ourServices/ourService1.png',
      name: 'Product One',
      rating: 4.5,
      price: '$20',
      priceNumber: 20,

      colors: ['#FF0000', '#00FF00', '#0000FF'],
    },
    {
      id: '2',
      image: 'https://via.placeholder.com/362x316',
      name: 'Product Two',
      rating: 5,
      price: '$25',
      priceNumber: 25,

      colors: ['#000', '#888', '#CCC'],
    },
    {
      id: '3',
      image: 'https://via.placeholder.com/362x316',
      name: 'Product Three',
      rating: 4,
      price: '$30',
      priceNumber: 30,

      colors: ['#FDBA74', '#A78BFA', '#F472B6'],
    },
    {
      id: '4',
      image: 'https://via.placeholder.com/362x316/000/fff?text=Product+4',
      name: 'Product Four',
      rating: 3.5,
      price: '$18',
      priceNumber: 18,

      colors: ['#FFFFFF', '#FFD700', '#DC143C'],
    },
    {
      id: '5',
      image: 'https://via.placeholder.com/362x316/111/eee?text=Product+5',
      name: 'Product Five',
      rating: 4.2,
      price: '$22',
      priceNumber: 22,

      colors: ['#8B0000', '#006400', '#4682B4'],
    },
    {
      id: '6',
      image: 'https://via.placeholder.com/362x316/222/ddd?text=Product+6',
      name: 'Product Six',
      rating: 5,
      price: '$35',
      priceNumber: 35,

      colors: ['#FF69B4', '#00CED1', '#ADFF2F'],
    },
  ];

  const updateItemQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const removeItem = (id: string) => {
    dispatch(removeFromCart(id));
  };
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" sx={{ mb: 1, fontWeight: 'bold' }}>
            Your Cart
          </Typography>
          <Typography variant="body2" color="text.secondary">
            There are {cartItems.length} products in your cart
          </Typography>
        </Box>

        <Card sx={{ mb: 4 }}>
          <CardContent sx={{ p: 0 }}>
            {/* Cart Header */}
            <Box sx={{ p: 1, bgcolor: '#4491CE' }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={6}>
                  <Typography sx={{ fontWeight: 600, fontSize: '22px', color: '#FFFFFF' }}>
                    Product
                  </Typography>
                </Grid>
                <Grid item xs={2} textAlign="center">
                  <Typography sx={{ fontWeight: 600, fontSize: '22px', color: '#FFFFFF' }}>
                    Quantity
                  </Typography>
                </Grid>
                <Grid item xs={2} textAlign="center">
                  <Typography sx={{ fontWeight: 600, fontSize: '22px', color: '#FFFFFF' }}>
                    Total
                  </Typography>
                </Grid>
                <Grid item xs={2} />
              </Grid>
            </Box>

            <Divider />

            {/* Cart Items */}
            {cartItems.map((item, index) => (
              <Box key={item.id}>
                <Box sx={{ p: 3 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar
                          src={item.image}
                          alt={item.name}
                          sx={{ width: 60, height: 60, borderRadius: 2 }}
                          variant="rounded"
                        />
                        <Box>
                          <Typography sx={{ fontSize: '18px', fontWeight: 600 }}>
                            {item.name}
                          </Typography>
                          <Typography sx={{ fontSize: '16px', fontWeight: 400 }}>
                            Size{item.size}
                          </Typography>

                          {/* <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                          {item.color && (
                            <Chip label={item.color} size="small" variant="outlined" />
                          )}
                          {item.size && <Chip label={item.size} size="small" variant="outlined" />}
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                          ${item.price.toFixed(2)}
                        </Typography> */}
                        </Box>
                      </Box>
                    </Grid>

                    <Grid item xs={2}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: 1,
                          borderColor: 'grey.300',
                          borderRadius: 1,
                          overflow: 'hidden', // Ensures child elements fit nicely inside the border
                          width: '90px',
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                          sx={{
                            borderRadius: 0,
                            borderRight: 1,
                            borderColor: 'grey.300',
                          }}
                        >
                          <Iconify icon="ic:baseline-minus" />
                        </IconButton>
                        <TextField
                          value={item.quantity}
                          size="small"
                          variant="standard"
                          sx={{
                            width: 30,
                            '& .MuiInputBase-root': {
                              textAlign: 'center',
                              justifyContent: 'center',
                              padding: 0,
                            },
                            '& input': {
                              textAlign: 'center',
                              padding: '8px 0',
                            },
                          }}
                          inputProps={{
                            readOnly: true,
                          }}
                        />
                        <IconButton
                          size="small"
                          onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                          sx={{
                            borderRadius: 0,
                            borderLeft: 1,
                            borderColor: 'grey.300',
                          }}
                        >
                          <Iconify icon="ic:baseline-plus" />
                        </IconButton>
                      </Box>
                    </Grid>

                    <Grid item xs={2} textAlign="center">
                      <Typography sx={{ fontSize: '18px', fontWeight: 400, color: '#313131' }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </Typography>
                    </Grid>

                    <Grid item xs={2} textAlign="center">
                      <IconButton color="error" onClick={() => removeItem(item.id)}>
                        <Iconify icon="material-symbols:delete-outline" />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Box>
                {index < cartItems.length - 1 && <Divider />}
              </Box>
            ))}

            {/* Subtotal */}
            <Divider />
            <Box sx={{ p: 3, bgcolor: 'grey.50' }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <Box>
                  <Typography sx={{ fontSize: '22px', fontWeight: 500 }}>
                    Subtotal:<span style={{ fontSize: '15px' }}> ${subtotal.toFixed(2)}</span>
                  </Typography>
                  <Typography sx={{ fontSize: '12px', fontWeight: 400 }}>
                    Taxes and shipping calculated at checkout
                  </Typography>

                  <Button
                    variant="contained"
                    onClick={onCheckout}
                    sx={{
                      bgcolor: '#4491CE',
                      p: 1,
                      mt: 1,
                      width: '271px',
                      height: '43px',
                      borderRadius: 2,
                      textTransform: 'none',
                      fontSize: '1rem',
                    }}
                  >
                    Checkout
                  </Button>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
      {/* Best Selling Products */}
      <Grid container spacing={2} justifyContent="center" sx={{ height: '666px' }}>
        {products.slice(0, 3).map((product, index) => (
          <Grid item key={index}>
            <ProductCard {...product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ShoppingCart;

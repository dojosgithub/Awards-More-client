import React from 'react';
import {
  Box,
  Card,
  CardMedia,
  Typography,
  IconButton,
  Rating,
  Stack,
  useTheme,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import Iconify from 'src/components/iconify';
import { addToCart } from 'src/redux/slices/cartSlice';

type ProductCardProps = {
  id: string;
  image: string;
  name: string;
  rating: number;
  price: string;
  priceNumber: number;
  colors: string[];
};

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  name,
  rating,
  price,
  priceNumber,
  colors,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id,
        name,
        price: priceNumber,
        quantity: 1,
        image,
      })
    );
    alert('added to the cart');
  };

  return (
    <Card sx={{ width: 362, height: 470, boxShadow: 3 }}>
      <CardMedia component="img" image={image} alt={name} sx={{ height: 316, borderRadius: 1 }} />
      <Box mt={2} p={2}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Rating value={rating} precision={0.5} readOnly size="small" />
          <IconButton size="small" sx={{ p: 0 }} onClick={handleAddToCart}>
            <Iconify icon="mdi:cart" color="#31C5F4" width={17} />
          </IconButton>
        </Stack>

        <Typography mt={1} fontWeight={600} sx={{ fontSize: '20px' }}>
          {name}
        </Typography>

        <Stack direction="row" spacing={1} mt={1}>
          {colors.map((color, index) => (
            <Box
              key={index}
              sx={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                backgroundColor: color,
                border: `1px solid ${theme.palette.grey[400]}`,
              }}
            />
          ))}
        </Stack>

        <Typography sx={{ fontWeight: 400, fontSize: '20px', color: '#313131' }}>
          Starting at{' '}
          <span style={{ color: '#31C5F4', fontSize: '22px', fontWeight: 500 }}>{price}</span>
        </Typography>
      </Box>
    </Card>
  );
};

export default ProductCard;

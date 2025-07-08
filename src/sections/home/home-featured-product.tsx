import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { Icon } from '@iconify/react';

interface ProductCardProps {
  image: string;
  category: string;
  name: string;
  price: number;
  onAddToCart?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, category, name, price, onAddToCart }) => (
  <Box
    sx={{
      width: '100%',
      maxWidth: 288,
      height: 355,
      borderRadius: 2,
      backgroundColor: '#f5f5f5',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      boxShadow: 1,
      // p: 2,
      mx: 'auto',
    }}
  >
    <Box
      component="img"
      src={image}
      alt={name}
      sx={{
        height: 184,
        width: '100%',
        objectFit: 'cover',
        borderRadius: 1,
        mb: 1.5,
      }}
    />

    <Box sx={{ textAlign: 'center' }}>
      <Typography
        variant="caption"
        sx={{
          fontSize: '12px',
          color: '#313131',
          textTransform: 'uppercase',
          mb: 0.5,
        }}
      >
        {category}
      </Typography>

      <Typography
        variant="subtitle1"
        fontWeight={600}
        sx={{
          fontSize: '20px',
          color: '#313131',
          mb: 0.5,
        }}
      >
        {name}
      </Typography>

      <Typography
        variant="body1"
        fontWeight={500}
        sx={{
          fontSize: '18px',
          color: '#313131',
          mb: 1,
        }}
      >
        ${price.toFixed(2)}
      </Typography>
    </Box>

    <Button
      variant="contained"
      onClick={onAddToCart}
      startIcon={<Icon icon="mdi:cart" />}
      sx={{
        // mt: 'auto',
        m: 2,
        backgroundColor: '#4491CE',
        color: '#fff',
        '&:hover': {
          backgroundColor: '#357bb0',
        },
        textTransform: 'none',
      }}
    >
      Add to Cart
    </Button>
  </Box>
);

const products = [
  {
    image: '/assets/images/home/ourServices/ourService1.png',
    category: 'Apparel',
    name: 'Team Polo Shirt',
    price: 20,
  },
  {
    image: '/assets/images/products/product2.jpg',
    category: 'Accessories',
    name: 'Custom Cap',
    price: 15,
  },
  {
    image: '/assets/images/products/product3.jpg',
    category: 'Awards',
    name: 'Glass Trophy',
    price: 50,
  },
  {
    image: '/assets/images/products/product4.jpg',
    category: 'Merch',
    name: 'Branded Mug',
    price: 10,
  },
];

const HomeFeaturedProducts: React.FC = () => (
  <Box sx={{ px: { xs: 2, sm: 4, md: 6 }, py: 6, backgroundColor: '#DAE9F5' }}>
    <Typography
      sx={{ mb: 4, textAlign: 'center', fontWeight: 600, fontSize: '44px', color: '#313131' }}
    >
      Featured Products
    </Typography>

    <Grid container spacing={4} justifyContent="center">
      {products.map((product, idx) => (
        <Grid item xs={12} sm={6} md={3} key={idx}>
          <ProductCard
            {...product}
            onAddToCart={() => console.log(`Added ${product.name} to cart`)}
          />
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default HomeFeaturedProducts;

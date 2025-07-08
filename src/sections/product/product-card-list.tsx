import React from 'react';
import { Grid, Container } from '@mui/material';
import ProductCard from './product-card';

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

const ProductCardList = () => (
  <Container sx={{ py: 4 }}>
    <Grid container spacing={3} justifyContent="center">
      {products.map((product, index) => (
        <Grid item key={index}>
          <ProductCard {...product} />
        </Grid>
      ))}
    </Grid>
  </Container>
);

export default ProductCardList;

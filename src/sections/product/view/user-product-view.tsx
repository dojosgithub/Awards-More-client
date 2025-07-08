// @mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useSearchParams } from 'react-router-dom';
import Banner from 'src/components/banner/banner';
import ProductCardList from '../product-card-list';

// ----------------------------------------------------------------------

export default function UserProductsView() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  return (
    <>
      <Banner heading={category ?? ' Products'} subtext="Browse these all products" />
      <ProductCardList />
      {/* <UserCategoriesCard /> */}
      {/* <Container sx={{ py: 10 }}> */}

      {/* </Container> */}
    </>
  );
}

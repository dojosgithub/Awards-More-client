// @mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Banner from 'src/components/banner/banner';
import UserCategoriesCard from '../user-categories-card';

// ----------------------------------------------------------------------

export default function UserCategoriesView() {
  return (
    <>
      <Banner heading="Categories" subtext="Browse these all categories" />
      <UserCategoriesCard />
      {/* <Container sx={{ py: 10 }}> */}

      {/* </Container> */}
    </>
  );
}

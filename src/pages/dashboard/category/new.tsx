import { Helmet } from 'react-helmet-async';
// sections
import { CategoryCreateView } from 'src/sections/category/view';

// ----------------------------------------------------------------------

export default function CategoryCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new category</title>
      </Helmet>

      <CategoryCreateView />
    </>
  );
}

import { Helmet } from 'react-helmet-async';
import UserCategoriesView from 'src/sections/category/view/user-categories-view';
// sections

// ----------------------------------------------------------------------

export default function CategoriesPage() {
  return (
    <>
      <Helmet>
        <title> Categories</title>
      </Helmet>

      <UserCategoriesView />
    </>
  );
}

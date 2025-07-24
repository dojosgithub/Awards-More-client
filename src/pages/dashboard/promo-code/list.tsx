import { Helmet } from 'react-helmet-async';
// sections
import CategoryListView from 'src/sections/category/view/category-list-view';
import PromoCodeListView from 'src/sections/promo-code/view/promo-code-list-view';

// ----------------------------------------------------------------------

export default function PromoCodeListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Promo Code List</title>
      </Helmet>

      <PromoCodeListView />
    </>
  );
}

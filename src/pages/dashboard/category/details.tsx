import { Helmet } from 'react-helmet-async';
// routes
import { useParams } from 'src/routes/hooks';
import CategoryDetailsView from 'src/sections/category/view/category-details-view';
// sections

// ----------------------------------------------------------------------

export default function CategoryDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Category Details</title>
      </Helmet>

      <CategoryDetailsView id={`${id}`} />
    </>
  );
}

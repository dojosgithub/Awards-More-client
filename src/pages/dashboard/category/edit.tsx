import { Helmet } from 'react-helmet-async';
// routes
import { useParams } from 'src/routes/hooks';
// sections
import CategoryEditView from 'src/sections/category/view/category-edit-view';

// ----------------------------------------------------------------------

export default function CategoryEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Category Edit</title>
      </Helmet>

      <CategoryEditView id={`${id}`} />
    </>
  );
}

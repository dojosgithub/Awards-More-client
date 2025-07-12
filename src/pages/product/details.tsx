import { Helmet } from 'react-helmet-async';
// routes
import { useParams } from 'src/routes/hooks';
// sections

// ----------------------------------------------------------------------

export default function ProductShopDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Product: Details</title>
      </Helmet>
    </>
  );
}

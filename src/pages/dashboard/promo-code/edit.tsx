import { Helmet } from 'react-helmet-async';
// routes
import { useParams } from 'src/routes/hooks';
// sections
import PromoCodeEditView from 'src/sections/promo-code/view/promo-code-edit-view';

// ----------------------------------------------------------------------

export default function PromoCodeEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Promo Code Edit</title>
      </Helmet>

      <PromoCodeEditView id={`${id}`} />
    </>
  );
}

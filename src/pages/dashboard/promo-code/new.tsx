import { Helmet } from 'react-helmet-async';
// sections

import PromoCodeCreateView from 'src/sections/promo-code/view/promo-code-create-view';

// ----------------------------------------------------------------------

export default function PromoCodeCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new Promo Code</title>
      </Helmet>

      <PromoCodeCreateView />
    </>
  );
}

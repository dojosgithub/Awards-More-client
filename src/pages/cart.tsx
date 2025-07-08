import { Helmet } from 'react-helmet-async';
import ShoppingCart from 'src/sections/cart/view/cart-view';
// sections

// ----------------------------------------------------------------------

export default function CheckoutPage() {
  return (
    <>
      <Helmet>
        <title> Checkout</title>
      </Helmet>

      <ShoppingCart />
    </>
  );
}

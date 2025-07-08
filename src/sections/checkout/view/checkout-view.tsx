'use client';

import React, { useState } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { Item } from 'src/types/items';

import ContactForm from '../checkout-contact-form';
import CheckoutDelivery from '../checkout-delivery';
import CheckoutPayment from '../checkout-payment';
import CheckoutSummary from '../checkout-summary';

// interface CheckoutItem {
//   id: number;
//   name: string;
//   image: string;
//   price: number;
//   quantity: number;
//   color?: string;
//   size?: string;
// }

interface CheckoutProps {
  items?: Item[];
  onPlaceOrder?: (orderData: any) => void;
}

const CheckoutView: React.FC<CheckoutProps> = ({ items, onPlaceOrder }) => {
  const { cartItems, totalPrice } = useSelector((state: RootState) => state.cart);

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
  });

  const checkoutItems = cartItems;
  const subtotal = checkoutItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 10.0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePlaceOrder = () => {
    const orderData = {
      items: checkoutItems,
      customer: formData,
      paymentMethod,
      totals: { subtotal, shipping, tax, total },
    };
    onPlaceOrder?.(orderData);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
        Check Out
      </Typography>

      <Grid container spacing={4}>
        {/* Left Column */}
        <Grid item xs={12} md={8}>
          <ContactForm email={formData.email} onChange={handleInputChange} />
          <CheckoutDelivery data={formData} onChange={handleInputChange} />
          <CheckoutPayment
            paymentMethod={paymentMethod}
            onPaymentMethodChange={setPaymentMethod}
            data={formData}
            onChange={handleInputChange}
          />
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={4}>
          <CheckoutSummary
            items={checkoutItems as Item[]}
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            total={total}
            onPlaceOrder={handlePlaceOrder}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckoutView;

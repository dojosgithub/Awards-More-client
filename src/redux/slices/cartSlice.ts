// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: string;
  name: string; // Add this instead of 'title'
  price: number;
  quantity: number;
  image?: string;
  color?: string; // Add
  size?: string; // Add
  totalPrice: number;
}

interface CartState {
  cartItems: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  cartOpen: boolean;
}

const initialState: CartState = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
  cartOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'totalPrice'>>) => {
      const item = action.payload;
      const existingItem = state.cartItems.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += item.quantity;
        existingItem.totalPrice += item.price * item.quantity;
      } else {
        state.cartItems.push({
          ...item,
          totalPrice: item.price * item.quantity,
        });
      }

      state.totalQuantity += item.quantity;
      state.totalPrice += item.price * item.quantity;
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const existingItem = state.cartItems.find((i) => i.id === id);
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.totalPrice;
        state.cartItems = state.cartItems.filter((i) => i.id !== id);
      }
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const cartItem = state.cartItems.find((i) => i.id === id); // renamed from 'item' to 'cartItem'
      if (cartItem && quantity > 0) {
        const oldTotal = cartItem.totalPrice;
        cartItem.quantity = quantity;
        cartItem.totalPrice = cartItem.price * quantity;

        state.totalPrice += cartItem.totalPrice - oldTotal;
        state.totalQuantity += quantity - oldTotal / cartItem.price;
      }
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
    toggleCart: (state) => {
      state.cartOpen = !state.cartOpen;
    },
    setCartOpen: (state, action: PayloadAction<boolean>) => {
      state.cartOpen = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, toggleCart, setCartOpen } =
  cartSlice.actions;
export default cartSlice.reducer;

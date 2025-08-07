import { useState } from 'react';
import { CartContext } from './cart-context.js'; // Import from the new file

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // const addToCart = (item) => {
  //   setCartItems((prev) => {
  //     const existing = prev.find((i) => i._id === item._id);
  //     if (existing) {
  //       return prev.map((i) =>
  //         i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
  //       );
  //     }
  //     return [...prev, { ...item, quantity: 1 }];
  //   });
  // };
// Inside CartProvider
const addToCart = (item) => {
  setCartItems((prev) => {
    const existing = prev.find((i) => i._id === item._id);
    if (existing) {
      return prev.map((i) =>
        i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
      );
    }
    return [...prev, { ...item, quantity: 1 }]; // Preserve full item object including imageUrl
  });
};

  const updateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  const clearCart = () => setCartItems([]);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQuantity, removeItem, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

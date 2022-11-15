import { createContext, useState, useEffect } from 'react';

const updateCart = (cartItems, product, updateValue, remove) => {
  if (remove) return cartItems.filter((item) => item.id !== product.id);

  const productExists = cartItems.find(
    (cartItem) => cartItem.id === product.id
  );

  if (productExists)
    return cartItems.map((cartItem) => {
      return cartItem.id === product.id
        ? { ...cartItem, quantity: cartItem.quantity + updateValue }
        : cartItem;
    });

  return [...cartItems, { ...product, quantity: 1 }];
};

export const CartContext = createContext({
  visible: false,
  setVisible: () => null,
  cartItems: [],
  updateItemsInCart: () => {},
  totalQuantity: 0,
  setTotalQuantity: () => null,
});

const CartProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const [newTotalCount, newTotalPrice] = cartItems.reduce(
      ([count, price], cartItem) => {
        count = count + cartItem.quantity;
        price = price + cartItem.quantity * cartItem.price;
        return [count, price];
      },
      [0, 0]
    );
    setTotalQuantity(newTotalCount);
    setTotalPrice(newTotalPrice);
  }, [cartItems]);

  const updateItemsInCart = (product, updateValue = 1, remove = false) => {
    setCartItems(updateCart(cartItems, product, updateValue, remove));
  };

  const value = {
    visible,
    setVisible,
    cartItems,
    updateItemsInCart,
    totalQuantity,
    setTotalQuantity,
    totalPrice,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;

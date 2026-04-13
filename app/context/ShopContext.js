"use client";
import { createContext, useContext, useState } from "react";

const ShopContext = createContext();

export function ShopProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [favourites, setFavourites] = useState([]);

  function addToCart(product) {
    setCart((prev) => {
      const existing = prev.find(
        (i) => i.id === product.id && i.selectedColor === product.selectedColor
      );
      if (existing) {
        return prev.map((i) =>
          i.id === product.id && i.selectedColor === product.selectedColor
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }

  function removeFromCart(id, selectedColor) {
    setCart((prev) => prev.filter(
      (i) => !(i.id === id && i.selectedColor === selectedColor)
    ));
  }

  function updateQuantity(id, selectedColor, quantity) {
    if (quantity < 1) return removeFromCart(id, selectedColor);
    setCart((prev) =>
      prev.map((i) =>
        i.id === id && i.selectedColor === selectedColor
          ? { ...i, quantity }
          : i
      )
    );
  }

  function toggleFavourite(product) {
    setFavourites((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) return prev.filter((i) => i.id !== product.id);
      return [...prev, product];
    });
  }

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cart.reduce((sum, i) => {
    const price = parseInt(i.price.replace(/[^0-9]/g, ""));
    return sum + price * i.quantity;
  }, 0);

  return (
    <ShopContext.Provider value={{
      cart, favourites, totalItems, totalPrice,
      addToCart, removeFromCart, updateQuantity, toggleFavourite
    }}>
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  return useContext(ShopContext);
}
import React, { createContext, useState, useEffect } from 'react';

export const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storedNumber = localStorage.getItem('cart');
    const itemNumber = JSON.parse(storedNumber);
      return itemNumber? itemNumber : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
        }, [cart]);

  const handleChange = (newValue) => {
    setCart(newValue);
  };

  return (
    <MyContext.Provider value={{ cart, handleChange }}>
      {children}
    </MyContext.Provider>
  );
};
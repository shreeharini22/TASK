import React, { createContext, useContext, useState } from "react";
import "./App.css";
const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
const useCart = () => useContext(CartContext);
const ProductList = () => {
  const products = [
    { id: 1, name: "pant", price: "price:10" },
    { id: 2, name: "shirt", price: "price:20" },
    { id: 3, name: "jean", price: "price:30" },
    { id: 4, name: "skirt", price: "price:80" },
    { id: 5, name: "frock", price: "price:90" },
  ];
  const { addToCart } = useCart();

  return (
    <div className="product-list">
      <h2>Products</h2>
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <p>{product.name}</p>
          <p>{product.price}</p>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};
const Cart = () => {
  const { cart } = useCart();
  return (
    <div className="cart">
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cart.map((item, index) => (
          <div key={index} className="cart-item">
            <p>{item.name}</p>
            <p>{item.price}</p>
          </div>
        ))
      )}
    </div>
  );
};
const App = () => {
  return (
    <CartProvider>
      <div className="app">
        <h1>Products</h1>
      </div>
      <div className="container">
      <ProductList />
      <Cart />
    </div>
    </CartProvider>
  );
};

export default App;
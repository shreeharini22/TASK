import React, { useState, useMemo, useCallback } from "react";
import "./App.css"; // Import the CSS file

// Fake product data
const productsData = [
  { id: 1, name: "Smartphone", price: 699, image: "https://th.bing.com/th/id/OIP.1K5DUGko2noL-tbppBsDcQHaHa?w=187&h=187&c=7&r=0&o=5&dpr=1.5&pid=1.7" },
  { id: 2, name: "Laptop", price: 999, image: "http://ts4.mm.bing.net/th?id=OIP.1qlvdHkRA_ujj7QI3W_sUgHaEK&pid=15.1" },
  { id: 3, name: "Headphones", price: 199, image: "https://th.bing.com/th/id/OIP.OctJq06i6wIxTXsGBFIx9AHaHa?w=188&h=188&c=7&r=0&o=5&dpr=1.5&pid=1.7" },
  { id: 4, name: "Smartwatch", price: 249, image: "http://ts3.mm.bing.net/th?id=OIP.v1ePEptKd4FoTsvWNst8qQHaHa&pid=15.1" },
  { id: 5, name: "Camera", price: 799, image: "https://th.bing.com/th/id/OIP.0bE0PMM8Y5iYWEeyaqfXzAAAAA?w=284&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7" },
];

export default function ElectricStore() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);

  // Conversion rate for USD to INR
  const conversionRate = 82.5; // Assume $1 = ₹82.5

  // Memoized filtered products
  const filteredProducts = useMemo(() => {
    return productsData.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Add to cart handler
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // Remove from cart handler
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== id));
  };

  // Clear search input
  const clearSearch = useCallback(() => {
    setSearchTerm("");
  }, []);

  // Calculate total amount in the cart
  const totalAmount = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * conversionRate, 0);
  }, [cart]);

  return (
    <div>
      <h1>Electric Store</h1>

      {/* Search Section */}
      <div>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={clearSearch}>Clear Search</button>
      </div>

      {/* Filtered Product Count */}
      <h2>Products ({filteredProducts.length})</h2>

      {/* Product List */}
      <div className="product-container">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>₹{(product.price * conversionRate).toFixed(2)}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>

      {/* Cart Section */}
      <h2>Cart ({cart.length})</h2>
      {cart.length > 0 ? (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <span>{item.name} - ₹{(item.price * conversionRate).toFixed(2)}</span>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
          <h3>Total: ₹{totalAmount.toFixed(2)}</h3>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}
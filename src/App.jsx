import React, { useState, useEffect } from "react";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/data.json");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product, quantity) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.name === product.name);

      if (existingItem) {
        return prevItems.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...prevItems,
        {
          ...product,
          quantity: quantity,
          id: Date.now(),
        },
      ];
    });
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemId)
      );
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };



  return (
    <main className="p-5 min-h-screen bg-[#f4edeb]">
      <header className="px-4 mt-5 mb-8">
        <h1 className="font-bold text-3xl text-gray-800">Desserts</h1>
      </header>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Product grid section */}
        <section aria-labelledby="products-heading" className="flex-1">
          <h2 id="products-heading" className="sr-only">
            Product list
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product, index) => {
              const cartItem = cartItems.find(
                (item) => item.name === product.name
              );
              return (
                <ProductCard
                  key={index}
                  product={product}
                  onAddToCart={addToCart}
                  onUpdateQuantity={updateQuantity}
                  cartItem={cartItem}
                />
              );
            })}
          </div>
        </section>

        {/* Cart aside */}
        <aside aria-labelledby="cart-heading" className="lg:w-96">
          <h2 id="cart-heading" className="sr-only">
            Shopping cart
          </h2>
          <Cart
            cartItems={cartItems}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeFromCart}
            onClearCart={clearCart}
          />
        </aside>
      </div>
    </main>
  );
}

export default App;

import React, { createContext, useContext, useState } from 'react'
import axios from 'axios'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  function addToCart(product) {
  const exists = cart.find(item => item.product.id === product.id);
  if (exists) {
    const updated = cart.map(item =>
      item.product.id === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCart(updated);
  } else {
    const newItem = {
      id: Date.now(),  
      product,
      quantity: 1
    };
    setCart([...cart, newItem]);
  }
}

  const clearCart = () => setCart([])

  const checkout = async (customerName, paymentMethod, paymentDetails) => {
    const payload = {
      customer_name: customerName,
      payment_method: paymentMethod,
      payment_details: paymentDetails,
      items: cart.map(i => ({
        product_id: i.product.id,
        quantity: i.quantity
      }))
    }
    try {
      const { data } = await axios.post('http://localhost:6543/api/orders', payload)
      if (data.status === 'success') {
        clearCart()
        return { success: true }
      }
      return { success: false, message: data.error || 'Checkout gagal' }
    } catch (error) {
      return { success: false, message: error.message }
    }
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart, checkout,setCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)


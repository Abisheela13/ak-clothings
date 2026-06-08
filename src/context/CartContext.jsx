import React, { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({children}){
  const [cart, setCart] = useState([])

  function addToCart(product, qty=1){
    setCart(prev=>{
      const found = prev.find(p=>p.id===product.id)
      if(found) return prev.map(p=>p.id===product.id?{...p, quantity: p.quantity+qty}:p)
      return [...prev, {...product, quantity: qty}]
    })
  }

  function removeFromCart(id){
    setCart(prev=>prev.filter(p=>p.id!==id))
  }

  function updateQuantity(id, quantity){
    setCart(prev=>prev.map(p=>p.id===id?{...p, quantity}:p))
  }

  const total = cart.reduce((s,p)=>s + p.price * p.quantity,0)

  return (
    <CartContext.Provider value={{cart, addToCart, removeFromCart, updateQuantity, total}}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart(){ return useContext(CartContext) }

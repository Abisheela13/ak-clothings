import React from 'react'
import { useCart } from '../context/CartContext'
import QuantitySelector from '../components/QuantitySelector'
import { Link } from 'react-router-dom'

export default function CartPage(){
  const { cart, updateQuantity, removeFromCart, total } = useCart()

  return (
    <div className="container-max px-4 py-8">
      <h2 className="text-2xl">Cart</h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {cart.length===0 ? <p className="bg-white p-4 rounded">Your cart is empty.</p> : (
            <div className="space-y-3">
              {cart.map(item=> (
                <div key={item.id} className="bg-white p-3 rounded flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{item.title}</h4>
                    <div className="text-sm text-gray-500">${item.price}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <QuantitySelector value={item.quantity} onChange={(q)=>updateQuantity(item.id,q)} />
                    <button onClick={()=>removeFromCart(item.id)} className="text-sm text-red-600">Remove</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <aside className="bg-white p-4 rounded shadow">
          <h4 className="font-semibold">Order Summary</h4>
          <div className="mt-2">Total: <strong>${total.toFixed(2)}</strong></div>
          <Link to="/checkout" className="mt-3 inline-block px-4 py-2 bg-pink-600 text-white rounded">Checkout</Link>
        </aside>
      </div>
    </div>
  )
}

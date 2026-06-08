import React from 'react'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'

export default function Dashboard(){
  const { items } = useWishlist()
  const { cart } = useCart()

  return (
    <div className="container-max px-4 py-8">
      <h2 className="text-2xl">Dashboard</h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <div className="h-20 w-20 bg-pink-100 rounded-full mb-2" />
          <h4 className="font-semibold">Jane Doe</h4>
          <p className="text-sm">jane@example.com</p>
          <p className="text-sm">9786487217</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h4 className="font-semibold">Order History</h4>
          <p className="text-sm mt-2">No orders yet.</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h4 className="font-semibold">Wishlist ({items.length})</h4>
          <h4 className="font-semibold mt-2">Cart ({cart.length})</h4>
          <button className="mt-3 px-3 py-2 bg-pink-600 text-white rounded">Logout</button>
        </div>
      </div>
    </div>
  )
}

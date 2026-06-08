import React from 'react'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'

export default function WishlistPage(){
  const { items, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  return (
    <div className="container-max px-4 py-8">
      <h2 className="text-2xl">Wishlist</h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.length===0 ? <div className="bg-white p-4 rounded">No items in wishlist.</div> : items.map(i=> (
          <div key={i.id} className="bg-white p-4 rounded">
            <h4 className="font-semibold">{i.title}</h4>
            <div className="mt-2 flex gap-2">
              <button onClick={()=>{addToCart(i); removeFromWishlist(i.id)}} className="px-3 py-2 bg-pink-600 text-white rounded">Move to Cart</button>
              <button onClick={()=>removeFromWishlist(i.id)} className="px-3 py-2 bg-gray-200 rounded">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

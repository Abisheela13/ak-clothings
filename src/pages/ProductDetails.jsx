import React from 'react'
import { useParams } from 'react-router-dom'
import products from '../data/products'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

export default function ProductDetails(){
  const { id } = useParams()
  const product = products.find(p=>p.id===id)
  const { addToCart } = useCart()
  const { addToWishlist } = useWishlist()

  if(!product) return <div className="container-max px-4 py-8">Product not found</div>

  return (
    <div className="container-max px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-4 rounded">
        <div className="w-full h-80 overflow-hidden">
          <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-semibold">{product.title}</h2>
        <div className="text-pink-600 text-xl mt-2">${product.price}</div>
        <p className="mt-4 text-gray-700">{product.description}</p>
        <div className="mt-4 flex gap-3">
          <button onClick={()=>addToCart(product)} className="px-4 py-2 bg-pink-600 text-white rounded">Add to Cart</button>
          <button onClick={()=>addToWishlist(product)} className="px-4 py-2 bg-gray-100 rounded">Add to Wishlist</button>
        </div>
      </div>
    </div>
  )
}

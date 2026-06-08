import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHeart, FiShoppingCart } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

function ProductImage({src, title}){
  return (
    <div className="w-full h-40 flex items-center justify-center bg-white rounded-md overflow-hidden">
      <img src={src} alt={title} className="max-h-full w-auto object-contain" />
    </div>
  )
}

export default function ProductCard({product}){
  const { addToCart } = useCart()
  const { addToWishlist } = useWishlist()

  return (
    <motion.div whileHover={{y:-6}} className="bg-white rounded-lg p-3 shadow-sm">
      <Link to={`/product/${product.id}`}>
        <ProductImage src={product.image} title={product.title} />
      </Link>
      <div className="mt-2 flex items-center justify-between">
        <div>
          <h4 className="font-semibold text-sm">{product.title}</h4>
          <div className="text-xs text-gray-500">${product.price}</div>
        </div>
        <div className="flex flex-col gap-2">
          <button onClick={()=>addToWishlist(product)} className="p-2 rounded bg-pink-100 text-pink-600"><FiHeart/></button>
          <button onClick={()=>addToCart(product)} className="p-2 rounded bg-pink-600 text-white"><FiShoppingCart/></button>
        </div>
      </div>
    </motion.div>
  )
}

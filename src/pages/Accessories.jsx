import React from 'react'
import products from '../data/products'
import ProductCard from '../components/ProductCard'

export default function Accessories(){
  const list = products.filter(p=>p.category==='Accessories')
  return (
    <div className="container-max px-4 py-8">
      <h2 className="text-3xl font-semibold">Accessories</h2>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {list.map(p=> <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}

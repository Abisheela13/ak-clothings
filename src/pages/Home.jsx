import React from 'react'
import SnapAvatar from '../components/SnapAvatar'
import avatarImg from '../assets/avatar.png'
import ProductCard from '../components/ProductCard'
import products from '../data/products'
import { motion } from 'framer-motion'

export default function Home(){
  const featured = products.slice(0,6)

  return (
    <div className="container-max px-4 py-8">
      <section className="hero-bg rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="pr-4">
            <h1 className="font-elegant text-4xl md:text-5xl">AKS Clothings</h1>
            <p className="mt-4 text-lg text-gray-600">A world of style, grace and elegance awaits.</p>
            <a href="/dresses" className="inline-block mt-6 px-6 py-3 bg-pink-600 text-white rounded shadow">Shop Now</a>
          </div>
          <div className="relative flex justify-center md:justify-end">
            <div className="hero-card avatar-frame">
              <SnapAvatar src={avatarImg} />
            </div>
          </div>
        </div>
      </section>

      <motion.section className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">Featured Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {featured.map(p=> <ProductCard key={p.id} product={p} />)}
        </div>
      </motion.section>

      <section className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">New Arrivals</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {products.slice(6,14).map(p=> <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  )
}

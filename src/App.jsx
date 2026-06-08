import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Dresses from './pages/Dresses'
import Accessories from './pages/Accessories'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import CartPage from './pages/Cart'
import WishlistPage from './pages/Wishlist'
import ProductDetails from './pages/ProductDetails'
import Checkout from './pages/Checkout'
import NotFound from './pages/NotFound'
import { motion } from 'framer-motion'

export default function App(){
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <motion.main initial={{opacity:0}} animate={{opacity:1}} className="flex-1">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/dresses" element={<Dresses/>} />
          <Route path="/accessories" element={<Accessories/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/cart" element={<CartPage/>} />
          <Route path="/wishlist" element={<WishlistPage/>} />
          <Route path="/product/:id" element={<ProductDetails/>} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </motion.main>
      <Footer />
    </div>
  )
}

import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { FiHeart, FiShoppingCart, FiMenu, FiUser } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import MobileDrawer from './MobileDrawer'

export default function Navbar(){
  const { cart } = useCart()
  const { items } = useWishlist()
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-40 glass shadow-sm">
      <div className="container-max px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="md:hidden p-2" onClick={()=>setOpen(true)} aria-label="Open menu"><FiMenu size={22}/></button>
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="AKS Clothings" className="h-10" />
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-6 font-semibold">
          <NavLink to="/" className={({isActive})=>isActive?"text-pink-600":"hover:text-pink-600"}>Home</NavLink>
          <NavLink to="/dresses" className={({isActive})=>isActive?"text-pink-600":"hover:text-pink-600"}>Dresses</NavLink>
          <NavLink to="/accessories" className={({isActive})=>isActive?"text-pink-600":"hover:text-pink-600"}>Accessories</NavLink>
          <NavLink to="/about" className={({isActive})=>isActive?"text-pink-600":"hover:text-pink-600"}>About</NavLink>
          <NavLink to="/contact" className={({isActive})=>isActive?"text-pink-600":"hover:text-pink-600"}>Contact</NavLink>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/wishlist" className="relative p-2">
            <FiHeart size={20} />
            {items.length>0 && <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full px-1">{items.length}</span>}
          </Link>
          <Link to="/cart" className="relative p-2">
            <FiShoppingCart size={20} />
            {cart.length>0 && <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full px-1">{cart.length}</span>}
          </Link>
          <div className="relative">
            <Link to="/dashboard" className="p-2 rounded-full bg-white/60 border border-white/30 shadow-sm">
              <FiUser />
            </Link>
          </div>
        </div>
      </div>
      <MobileDrawer open={open} onClose={()=>setOpen(false)} />
    </nav>
  )
}

import React from 'react'
import { Link } from 'react-router-dom'

export default function MobileDrawer({open, onClose}){
  if(!open) return null
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/30" onClick={onClose}></div>
      <aside className="absolute left-0 top-0 bottom-0 w-72 bg-white p-6">
        <button className="mb-4" onClick={onClose}>Close</button>
        <nav className="flex flex-col gap-3">
          <Link to="/" onClick={onClose}>Home</Link>
          <Link to="/dresses" onClick={onClose}>Dresses</Link>
          <Link to="/accessories" onClick={onClose}>Accessories</Link>
          <Link to="/about" onClick={onClose}>About</Link>
          <Link to="/contact" onClick={onClose}>Contact</Link>
        </nav>
      </aside>
    </div>
  )
}

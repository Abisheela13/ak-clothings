import React from 'react'
import { Link } from 'react-router-dom'
import { FiInstagram, FiFacebook, FiMail } from 'react-icons/fi'

export default function Footer(){
  return (
    <footer className="bg-white/60 mt-8 py-8">
      <div className="container-max px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="font-elegant text-xl">AKS Clothings</h3>
          <p className="text-sm mt-2">Premium feminine fashion — soft pastels, tailored looks.</p>
        </div>
        <div>
          <h4 className="font-semibold">Quick Links</h4>
          <ul className="mt-2 space-y-1 text-sm">
            <li><Link to="/dresses">Dresses</Link></li>
            <li><Link to="/accessories">Accessories</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Contact</h4>
          <p className="text-sm mt-2">9786487217</p>
          <address className="text-sm not-italic mt-1">5/129-164, Sri Maruthi Nagar Phase 2, Vellanaipatti, Coimbatore – 641048</address>
          <div className="flex gap-3 mt-3">
            <FiInstagram />
            <FiFacebook />
            <FiMail />
          </div>
        </div>
      </div>
      <div className="text-center text-xs py-4">© {new Date().getFullYear()} AKS Clothings. All rights reserved.</div>
    </footer>
  )
}

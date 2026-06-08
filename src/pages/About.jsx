import React from 'react'
import team1 from '../assets/products/product-23.jpg'
import team2 from '../assets/products/Gold Bracelet.jpg'

export default function About(){
  return (
    <div className="container-max px-4 py-12">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-elegant mb-4">About AKS Clothings</h1>
          <p className="text-lg text-gray-700 mb-4">AKS Clothings curates elegant, feminine collections inspired by softness, craftsmanship, and confident silhouettes. We design wardrobe staples and statement pieces that blend comfort with couture-level detail.</p>
          <ul className="space-y-2 text-gray-600">
            <li>• Ethically sourced materials</li>
            <li>• Small-batch production</li>
            <li>• Tailored fits and thoughtful details</li>
          </ul>
          <a href="/dresses" className="inline-block mt-6 px-6 py-3 bg-pink-600 text-white rounded shadow">Explore Collections</a>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="grid grid-cols-2 gap-4">
            <img src={team1} alt="studio" className="w-full h-40 object-cover rounded" />
            <img src={team2} alt="studio" className="w-full h-40 object-cover rounded" />
          </div>
          <p className="mt-4 text-sm text-gray-500">Our studio blends artisanal techniques with modern silhouettes to craft thoughtful garments.</p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-lg shadow">
            <h4 className="font-semibold mb-2">Sustainability</h4>
            <p className="text-sm text-gray-600">We responsibly source fabrics and limit waste through considered production.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h4 className="font-semibold mb-2">Craftsmanship</h4>
            <p className="text-sm text-gray-600">Each piece is inspected for quality and enduring detail.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h4 className="font-semibold mb-2">Community</h4>
            <p className="text-sm text-gray-600">We support local makers and emerging designers.</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {name: 'Aisha', role: 'Founder', img: team1},
            {name: 'Kiran', role: 'Design Lead', img: team2},
            {name: 'Maya', role: 'Production', img: team1},
            {name: 'Rhea', role: 'Marketing', img: team2}
          ].map((m,idx)=> (
            <div key={idx} className="bg-white rounded-lg p-4 shadow text-center">
              <div className="w-28 h-28 mx-auto rounded-full overflow-hidden mb-3">
                <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
              </div>
              <div className="font-semibold">{m.name}</div>
              <div className="text-sm text-gray-500">{m.role}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

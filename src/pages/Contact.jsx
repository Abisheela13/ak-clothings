import React from 'react'

export default function Contact(){
  return (
    <div className="container-max px-4 py-8">
      <h2 className="text-3xl">Contact</h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <form className="bg-white p-4 rounded shadow">
          <label className="block">Name<input className="w-full border p-2 mt-1" /></label>
          <label className="block mt-2">Email<input className="w-full border p-2 mt-1" /></label>
          <label className="block mt-2">Message<textarea className="w-full border p-2 mt-1" rows="4"></textarea></label>
          <button className="mt-3 px-4 py-2 bg-pink-600 text-white rounded">Send</button>
        </form>
        <div>
          <h4 className="font-semibold">Contact Information</h4>
          <p className="mt-2">Phone: 9786487217</p>
          <address className="not-italic mt-1">5/129-164, Sri Maruthi Nagar Phase 2, Vellanaipatti, Coimbatore – 641048</address>
          <div className="mt-4">
            <iframe title="maps" src="https://www.google.com/maps?q=Coimbatore&output=embed" className="w-full h-48" />
          </div>
        </div>
      </div>
      <a href="https://wa.me/917986487217" className="fixed right-4 bottom-4 bg-green-500 text-white p-3 rounded-full">WhatsApp</a>
    </div>
  )
}

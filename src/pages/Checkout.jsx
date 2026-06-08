import React from 'react'

export default function Checkout(){
  return (
    <div className="container-max px-4 py-8">
      <h2 className="text-2xl">Checkout</h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <form className="bg-white p-4 rounded shadow">
          <h4 className="font-semibold">Shipping Address</h4>
          <label className="block mt-2">Full Name<input className="w-full border p-2 mt-1" /></label>
          <label className="block mt-2">Address<textarea className="w-full border p-2 mt-1" rows={3}></textarea></label>
        </form>
        <aside className="bg-white p-4 rounded shadow">
          <h4 className="font-semibold">Order Summary</h4>
          <p className="mt-2">Items: —</p>
          <p className="mt-2">Total: —</p>
          <button className="mt-3 px-4 py-2 bg-pink-600 text-white rounded">Place Order</button>
        </aside>
      </div>
    </div>
  )
}

import React from 'react'

export default function Register(){
  return (
    <div className="container-max px-4 py-8">
      <h2 className="text-2xl">Register</h2>
      <form className="mt-4 max-w-md bg-white p-4 rounded shadow">
        <label className="block">Name<input className="w-full border p-2 mt-1" /></label>
        <label className="block mt-2">Email<input className="w-full border p-2 mt-1" /></label>
        <label className="block mt-2">Phone<input className="w-full border p-2 mt-1" /></label>
        <label className="block mt-2">Password<input type="password" className="w-full border p-2 mt-1" /></label>
        <label className="block mt-2">Confirm Password<input type="password" className="w-full border p-2 mt-1" /></label>
        <button className="mt-3 px-4 py-2 bg-pink-600 text-white rounded">Register</button>
      </form>
    </div>
  )
}

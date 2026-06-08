import React, { useState } from 'react'

export default function Login(){
  const [method, setMethod] = useState('email')
  return (
    <div className="container-max px-4 py-8">
      <h2 className="text-2xl">Login</h2>
      <div className="mt-4 max-w-md">
        <div className="mb-4">
          <button onClick={()=>setMethod('email')} className={`px-3 py-2 ${method==='email'?'bg-pink-600 text-white':'bg-white'}`}>Email</button>
          <button onClick={()=>setMethod('phone')} className={`px-3 py-2 ml-2 ${method==='phone'?'bg-pink-600 text-white':'bg-white'}`}>Phone OTP</button>
        </div>
        {method==='email' ? (
          <form className="bg-white p-4 rounded shadow">
            <label>Email<input className="w-full border p-2 mt-1" /></label>
            <label className="block mt-2">Password<input type="password" className="w-full border p-2 mt-1" /></label>
            <div className="flex items-center mt-2"><input type="checkbox"/> <span className="ml-2">Remember Me</span></div>
            <button className="mt-3 px-4 py-2 bg-pink-600 text-white rounded">Login</button>
          </form>
        ) : (
          <form className="bg-white p-4 rounded shadow">
            <label>Phone<input className="w-full border p-2 mt-1" /></label>
            <button className="mt-3 px-4 py-2 bg-pink-600 text-white rounded">Send OTP</button>
          </form>
        )}
      </div>
    </div>
  )
}

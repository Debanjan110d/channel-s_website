import React from 'react'
import { useParams } from 'react-router-dom'

function User() {

  const {userid} = useParams();


  return (
    <div className="py-20 text-white px-4 sm:px-6 lg:px-10">
      <div className="max-w-4xl mx-auto rounded-3xl border border-white/10 bg-[#08142e]/50 backdrop-blur-md p-6 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
        <p className="text-xs uppercase tracking-[0.2em] text-orange-300">Profile Route</p>
        <h1 className="mt-3 text-3xl md:text-4xl font-bold">User: {userid}</h1>
        <p className="mt-4 text-gray-300">This page now follows the same visual style as the rest of the website.</p>
      </div>
    </div>
  )
}

export default User
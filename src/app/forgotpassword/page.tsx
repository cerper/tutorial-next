'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [user, setUser] = useState({
    email: '',
  })
  const [loading, setLoading] = useState(false)

  const sendEmail = async () => {
    try {
      setLoading(true)
      const resp = await axios.post('/api/users/forgotpassword', user)
      console.log(resp)
    } catch (error: any) {
      console.log(' Failed ', error.message)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? 'processing' : 'Enter an email'}</h1>

      <input
        type="text"
        value={user.email}
        id="email"
        placeholder="email"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <button
        onClick={sendEmail}
        className="p-3 border border-gray-300 rounded-lg mb-4 mt-4 bg-sky-500 hover:bg-sky-700"
        type="submit"
      >
        Send email
      </button>
    </div>
  )
}

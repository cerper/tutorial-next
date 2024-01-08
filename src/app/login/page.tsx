'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const [user, setUser] = React.useState({
    email: '',
    password: '',
  })
  const [buttonDisabled, setButtonDisabled] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()

  const OnLogin = async () => {
    try {
      setLoading(true)
      const response = await axios.post('/api/users/login', user)
      console.log('Login Success', response.data)
      toast.success('Login Success')
      router.push('/profile')
    } catch (error: any) {
      console.log(' Failed ', error.message)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? 'processing' : 'Login'}</h1>

      <label htmlFor="Email">Email</label>
      <input
        className="text-black p-3 border border-gray-300 rounded-lg mb-4 mt-4 focus:outline-none focus:border-gray-600"
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password">Password</label>
      <input
        className="p-3 border border-gray-300 rounded-lg mb-4 mt-4 focus:outline-none focus:border-gray-600"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />

      <button
        onClick={OnLogin}
        className="p-3 border border-gray-300 rounded-lg mb-4 mt-4 bg-sky-500 hover:bg-sky-700"
        type="submit"
      >
        {buttonDisabled ? 'Enter data' : 'Login'}
      </button>

      <Link href="/forgotpassword">Forgot Password?</Link>
      <Link href="/signup">Visit Signup page</Link>
    </div>
  )
}

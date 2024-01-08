'use client'

import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function ConfirmPasswordPage() {
  const router = useRouter()
  const [user, setUser] = useState({
    password: '',
    token: '',
    password2: '',
  })
  const [confirm, setConfirm] = useState(false)
  const [error, setError] = useState(false)
  const [buttonDisabled, setButtonDisabled] = React.useState(false)
  //llamando la api de confirm password

  const ConfirmPassword = async () => {
    try {
      await axios.post('/api/users/confirmpassword', user)
      setConfirm(true)
      router.push('/login')
      console.log(user.token)
    } catch (error: any) {
      setError(true)
      console.log(error.response)
    }
  }
  useEffect(() => {
    const urlToken = window.location.search.split('=')[1]
    setUser({ ...user, token: urlToken })
  }, [])
  useEffect(() => {
    if (user.password.length > 0 && user.password2.length > 0) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl ">Confirm your Password</h1>
      <h2 className="text-xl bg-sky-400 text-black">
        {user ? `${user.token}` : 'no user'}
      </h2>

      <label htmlFor="password">Confirm password</label>
      <input
        type="password"
        id="password"
        value={user.password}
        placeholder="confirm password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <label htmlFor="password">Enter password again</label>
      <input
        type="password"
        id="password2"
        value={user.password2}
        placeholder="confirm password"
        onChange={(e) => setUser({ ...user, password2: e.target.value })}
      />
      <button
        onClick={ConfirmPassword}
        type="submit"
        className="p-3 border border-gray-300 rounded-lg mb-4 mt-4 bg-sky-500 hover:bg-sky-700"
      >
        {buttonDisabled ? 'Enter password' : 'Confirm'}
      </button>
    </div>
  )
}

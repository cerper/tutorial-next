'use client'
import axios from 'axios'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = React.useState('nothing')
  const logout = async () => {
    try {
      await axios.get('api/users/logout')
      toast.success('Logout successful')
      router.push('/login')
    } catch (error: any) {
      console.log('Logout failed', error.message)
      toast.error(error.message)
    }
  }

  const getUserDetails = async () => {
    const response = await axios.get('/api/users/me')
    console.log(response.data)
    setUser(response.data.data._id)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile page</p>
      <h2 className="p-3 rounded bg-green-400">
        {user === 'nothing' ? (
          'Nothing'
        ) : (
          <Link href={`/profile/${user} `}>{user}</Link>
        )}
      </h2>
      <button
        className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
        onClick={logout}
      >
        Logout
      </button>

      <button
        className="bg-purple-800 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
        onClick={getUserDetails}
      >
        Get details
      </button>
    </div>
  )
}

import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect()

export async function POST(request: NextRequest) {
  try {
    //esperamos la respuesta de del json

    const reqBody = await request.json()
    //destructuramos el reqBody en su email y password que sera la info mandada del front del login

    const { email, password } = reqBody
    console.log(reqBody)

    //ver si el usuario existe en base al email usamos el user

    const user = await User.findOne({ email })

    if (!user) {
      return NextResponse.json('This user doesnt exist')
    }

    // Comparando los password

    const validPassword = await bcryptjs.compare(password, user.password)
    if (!validPassword) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 400 })
    }

    //create token data

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    }

    //create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: '1d',
    })

    const response = NextResponse.json({
      message: 'Login Successful',
      success: true,
    })

    response.cookies.set('token', token, {
      httpOnly: true,
    })

    return response
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

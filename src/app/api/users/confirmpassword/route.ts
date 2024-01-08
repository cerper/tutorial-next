import { connect } from '@/dbConfig/dbConfig'
import { NextResponse, NextRequest } from 'next/server'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'

connect()

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    const { password, password2, token } = reqBody

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    })
    if (password !== password2) {
      return NextResponse.json(
        { error: 'The password are not the same' },
        { status: 400 }
      )
    }

    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    user.password = hashedPassword
    await user.save()
    return NextResponse.json({
      message: 'User updated his password successfully',
      success: true,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}

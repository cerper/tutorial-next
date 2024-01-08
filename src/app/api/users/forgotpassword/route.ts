import { connect } from '@/dbConfig/dbConfig'
import { NextResponse, NextRequest } from 'next/server'
import User from '@/models/userModel'
import { sendEmail } from '@/helpers/mailer'

connect()

export async function POST(request: NextRequest) {
  try {
    //waiting el token del json
    const reqBody = await request.json()
    const { email } = reqBody
    console.log(email)

    //find user base on the forgotPassword token
    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json({ error: 'Invalid User' }, { status: 400 })
    }
    console.log(user)

    await sendEmail({ email, emailType: 'FORGOT', userId: user._id })

    await user.save()
    return NextResponse.json({
      message: 'Email successfully send',
      success: true,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

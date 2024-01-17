import nodemailer from 'nodemailer'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //created a hash token
    const hashToken = await bcryptjs.hash(userId.toString(), 10)
    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashToken,
        verifyTokenExpiry: Date.now() + 3600000,
      })
    } else if (emailType === 'FORGOT') {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      })
    }

    var transport = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'a28657cc4cd2bb',
        pass: '3c9e054143ed96',
      },
    })

    const mailOptions = {
      from: 'davidlovera16@gmail.com',
      to: email,
      subject:
        emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',

      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashToken}">here</a> to ${
        emailType === 'VERIFY' ? 'verify your email' : 'reset your password'
      } or copy and paste the link below in your browser.<br> ${
        process.env.DOMAIN
      }/verifyemail?token=${hashToken}</p>`,
    }
    const mailOptions2 = {
      from: 'davidlovera16@gmail.com',
      to: email,
      subject:
        emailType === 'FORGOT' ? 'Reset your Password' : 'Verify your email',
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/confirmpassword?token=${hashToken}">here</a> to ${
        emailType === 'FORGOT' ? 'Reset your Password' : 'Verify your email'
      } or copy and paste the link below in your browser.<br> ${
        process.env.DOMAIN
      }/confirmpassword?token=${hashToken}</p>`,
    }

    const mailResponse = await transport.sendMail(mailOptions)
    const mailResponse2 = await transport.sendMail(mailOptions2)
    if (mailResponse) {
      return mailResponse
    }
    if (mailResponse2) {
      return mailResponse2
    }
  } catch (error: any) {
    throw new Error(error.message)
  }
}

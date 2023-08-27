const nodemailer = require('nodemailer')
// require('dotenv').config()
export default async function page(req, res) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'shindongjin2016@gmail.com',
        pass: 'pwpcgpnrwfzwvkig',
      },
      tls: {
        rejectUnauthorized: false
    }
    })

    const mailData = {
      from: 'shindongjin2016@gmail.com',
      to: 'shindongjin2016@gmail.com',
      subject: `OTP`,
      text: req.searchParams.OTP,
    }
    transporter.sendMail(mailData, function (err, info) {
      if(err)
        console.log(err)
      else
        console.log(info)
    })
  }
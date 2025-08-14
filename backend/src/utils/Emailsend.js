import nodemailer from "nodemailer"
import dotenv from "dotenv"


dotenv.config()

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

  export const sendemail = async(Toemail , otp)=>{
    try {
           const info = await transporter.sendMail({
    from: '"Diagnostic" <asrarpersonal6666@gmail.com>',
    to: Toemail,
    subject: "Your OTP Code",
    text: String(otp), // plain‑text body
    html:  `<p>Your OTP code is: <b>${otp}</b></p>`, // HTML body
  });
    } catch (error) {
        console.log(error)
    }
  }
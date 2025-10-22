import nodemailer from "nodemailer"
import dotenv from "dotenv"


dotenv.config()

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

  export const sendemail = async(Toemail , otp)=>{
    try {
          console.log("Attempting to send email to:", Toemail);
    console.log("EMAIL_USER exists:", !!process.env.EMAIL_USER);
    console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);
           const info = await transporter.sendMail({
    from: '"Diagnostic" <asrarpersonal6666@gmail.com>',
    to: Toemail,
    subject: "Your OTP Code",
    text: String(otp), // plain‑text body
    html:  `<p>Your OTP code is: <b>${otp}</b></p>`, // HTML body
  });
   console.log("Email sent successfully:", info.messageId);
    return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error("Email sending failed:", error.message);
    throw new Error(`Failed to send email: ${error.message}`);
    }
  }
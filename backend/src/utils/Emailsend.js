import nodemailer from "nodemailer"

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

  export const sendemail = async(Toemail)=>{
    try {
           const info = await transporter.sendMail({
    from: '"Diagnostic" <asrarpersonal6666@gmail.com>',
    to: Toemail,
    subject: "Hello ✔",
    text: "Hello world?", // plain‑text body
    html: "<b>Hello world?</b>", // HTML body
  });
    } catch (error) {
        console.log(error)
    }
  }
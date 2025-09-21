import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { userRouter } from "./src/routes/user.route.js"
import testRouter from "./src/routes/test.route.js"
import { patientrouter } from "./src/routes/Patients.route.js"
import labrouter from "./src/routes/lab.route.js"
import slotRouter from "./src/routes/Slot.route.js"
import addressRouter from "./src/routes/Address.route.js"
import orderRoute from "./src/routes/Order.route.js"
import { errorHandler } from "./src/middlewares/error.middleware.js"
import paymentRouter from "./src/routes/payment.route.js"
import faqRoute from "./src/routes/Faq.route.js"
import testimonialRoute from "./src/routes/Testimonial.route.js"
import AiRoute from "./src/routes/Ai.route.js"
import RagRouter from "./src/routes/RagAns.route.js"


const app = express()
  

app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}
))



app.use(express.json())
app.use(cookieParser())

app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))

//routes

app.use("/api/v1/users" , userRouter)
app.use("/api/v1/tests" , testRouter)
app.use("/api/v1/patient" , patientrouter)
app.use("/api/v1/lab" , labrouter)
app.use("/api/v1/slot" , slotRouter)
app.use("/api/v1/address" , addressRouter)
app.use("/api/v1/order" , orderRoute)
app.use("/api/v1/payment" , paymentRouter)
app.use("/api/v1/faq" , faqRoute)
app.use("/api/v1/testimonial" , testimonialRoute)
app.use("/api/v1/Aichat/" , AiRoute)
app.use("/api/v1/rag/" , RagRouter)


app.use(errorHandler)



export default app
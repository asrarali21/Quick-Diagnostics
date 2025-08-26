import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { userRouter } from "./src/routes/user.route.js"
import testRouter from "./src/routes/test.route.js"
import { patientrouter } from "./src/routes/Patients.route.js"
import { Lab } from "./src/models/lab.model.js"
import labrouter from "./src/routes/lab.route.js"
import slotRouter from "./src/routes/Slot.route.js"
import addressRouter from "./src/routes/Address.route.js"


const app = express()
  

app.use(cors({
    origin: "http://localhost:5173",
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



export default app
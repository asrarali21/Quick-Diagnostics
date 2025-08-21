import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { userRouter } from "./src/routes/user.route.js"
import testRouter from "./src/routes/test.route.js"


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



export default app
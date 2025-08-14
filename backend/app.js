import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { urlencoded } from "express"
import { userRouter } from "./src/routes/user.route.js"


const app = express()
  

app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}
))



app.use(express.json())
app.use(cookieParser())

app.use(urlencoded({extended:true}))
app.use(express.static("public"))


app.use("/api/v1/users" , userRouter)



export default app
import { Router } from "express";
import { Addpatient, getPatientDetails } from "../controllers/Addpatient.controller.js";
import verifyUser from "../middlewares/verifyUser.js";



const patientrouter = Router()



patientrouter.route("/patientdetails").post(verifyUser,Addpatient)
patientrouter.route("/addPatients").get(verifyUser,getPatientDetails)


export {patientrouter}
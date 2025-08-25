
import express, { Router } from "express"
import { createSlots, getslot } from "../controllers/Slot.controller.js"

const  slotRouter = Router()



 slotRouter.route("/addSlot").post(createSlots)
 slotRouter.route("/getslot").get(getslot)



export default slotRouter

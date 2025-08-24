import mongoose, { Schema } from "mongoose";

const slotSchema = new Schema({
  lab: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lab",
    required: true,
  },
  date: {
    type: Date, // e.g. 2025-08-23
    required: true,
  },
  startTime: {
    type: String, // e.g. "07:00 AM"
    required: true,
  },
  endTime: {
    type: String, // e.g. "08:00 AM"
    required: true,
  },
  isBooked: {
    type: Boolean,
    default: false,
  }
});

export const Slot = mongoose.model("Slot", slotSchema);
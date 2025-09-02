import { Schema, model } from "mongoose";

const airportSchema = new Schema({
  code: { type: String, required: true, unique: true }, // ej: BOG
  name: { type: String, required: true },
  city: String,
  country: String,
  timezone: String,
  status: { type: String, enum: ["open", "closed", "maintenance"], default: "open" }
}, { timestamps: true });

export default model("Airport", airportSchema);

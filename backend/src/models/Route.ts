import { Schema, model } from "mongoose";

const routeSchema = new Schema({
  id_aeropuerto_origen: { type: Schema.Types.ObjectId, ref: "Airport", required: true },
  id_aeropuerto_destino: { type: Schema.Types.ObjectId, ref: "Airport", required: true },
  cantidad_km: { type: Number, required: true },
  precio: { type: Number, required: true }
}, { timestamps: true });

export default model("Route", routeSchema);

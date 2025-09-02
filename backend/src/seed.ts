import User from "./models/User";
import Airport from "./models/Airport";
import bcrypt from "bcryptjs";

export const runSeed = async () => {
  try {
    // Crear admin si no existe
    const adminEmail = "admin@example.com";
    const existing = await User.findOne({ email: adminEmail });
    if (!existing) {
      const hashed = await bcrypt.hash("password", 10);
      await User.create({ email: adminEmail, password: hashed, role: "admin" });
      console.log("✅ Usuario admin creado: admin@example.com / password");
    } else {
      console.log("ℹ️ Usuario admin ya existe");
    }

    // Crear aeropuertos de ejemplo si no existen
    const samples = [
      { code: "BOG", name: "Aeropuerto El Dorado", city: "Bogotá", country: "Colombia", timezone: "America/Bogota", status: "open" },
      { code: "CTG", name: "Aeropuerto Rafael Núñez", city: "Cartagena", country: "Colombia", timezone: "America/Bogota", status: "open" },
      { code: "MDE", name: "Aeropuerto José María Córdova", city: "Medellín", country: "Colombia", timezone: "America/Bogota", status: "open" }
    ];

    for (const a of samples) {
      const ex = await Airport.findOne({ code: a.code });
      if (!ex) {
        await Airport.create(a);
        console.log("✅ Aeropuerto creado:", a.code);
      } else {
        console.log("ℹ️ Aeropuerto ya existe:", a.code);
      }
    }

  } catch (err) {
    console.error("Seed error:", err);
  }
};
export default runSeed;

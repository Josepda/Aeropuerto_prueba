import app from "./app";
import dotenv from "dotenv";
import connectDB from "./config/db";
import runSeed from "./seed";

dotenv.config();
const PORT = process.env.PORT || 4000;

connectDB().then(async () => {
  await runSeed();
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error("Fallo al iniciar:", err);
});

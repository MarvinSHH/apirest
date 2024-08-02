//src/app.js
import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import repartidorAuthRoutes from "./routes/repartidorAuth.routes";
import repartidoresRoutes from "./routes/repartidores.routes";
import clientesRoutes from "./routes/clientes.routes";
import userRoutes from "./routes/user.routes"; // Importa las nuevas rutas
import recuperacionContrasenia from "./routes/enviarCodigo.routes";
import verifyToken from "./middleware/auth.middleware"; // Asegúrate de importar el middleware
import visitRoutes from "./routes/visit.routes";
import imgRoutes from "./routes/img.routes";
import historialRoutes from "./routes/historial.routes";
const app = express();

//settings
app.set("port", process.env.PORT || 4000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads")); // Permitir acceso a la carpeta uploads

app.use("/api/auth", authRoutes); //inicia sesion admin/repartidor y registra admin
app.use("/api/repartidorAuth", repartidorAuthRoutes); // registra repartidor
app.use("/api/repartidores", verifyToken, repartidoresRoutes);
app.use("/api/clientes", verifyToken, clientesRoutes);
app.use("/api/user", verifyToken, userRoutes); // Usa las nuevas rutas
app.use("/api/recuperar", recuperacionContrasenia);
app.use("/api/visita", visitRoutes);
app.use("/api/img", imgRoutes);
app.use("/api/historial", verifyToken, historialRoutes);

require("./resetDaily");

export default app;

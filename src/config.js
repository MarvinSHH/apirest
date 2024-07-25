//src/config.js

import { config } from "dotenv";

config();

export default {
  host: process.env.DB_HOST || "",
  database: process.env.DB_NAME || "",
  user: process.env.DB_USER || "",
  password: process.env.DB_PASSWORD || "",
  port: process.env.DB_PORT || "", // Asegúrate de incluir el puerto
};

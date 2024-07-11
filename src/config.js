//src/config.js

import { config } from "dotenv";

config();

export default {
  host: process.env.host || "",
  database: process.env.database || "",
  user: process.env.user || "",
  password: process.env.password || "",
  port: process.env.port || 3306, // Asegúrate de incluir el puerto
};

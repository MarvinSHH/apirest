//src/database/database.js

import mysql from "promise-mysql";
import config from "./../config";

const connection = mysql.createPool({
  host: config.host,
  database: config.database,
  user: config.user,
  password: config.password,
  port: config.port, // el puerto esté incluido
  connectionLimit: 10, // Añade un límite de conexión
});

const getConnection = () => {
  return connection;
};

export { getConnection };

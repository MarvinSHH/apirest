//src/controller/historial.controller.js
import { getConnection } from "./../database/database";

//obtener historial
const getHistorial = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query(
      "SELECT idasignacion, idcliente, idrepartidor, visitado, foto, historia FROM tblclientesasignadosarepartidores"
    );
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
export const methods = {
  getHistorial,
};

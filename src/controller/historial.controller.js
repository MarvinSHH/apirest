//src/controller/historial.controller.js
import { getConnection } from "./../database/database";

//obtener historial
const getHistorial = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query(
      `SELECT t1.idasignacion, t1.idcliente, t1.idrepartidor, t1.visitado, t1.foto, t1.historia, t2.nombre, t2.apaterno, t2.amaterno
      FROM tblclientesasignadosarepartidores t1
      JOIN tblcliente t2 ON t1.idcliente = t2.idcliente`
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

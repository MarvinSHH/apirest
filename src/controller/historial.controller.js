//src/controller/historial.controller.js
import { getConnection } from "./../database/database";

//obtener historial
const getHistorial = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query(
      `SELECT t1.idasignacion, t1.idcliente, t1.idrepartidor, t1.visitado, t1.foto, t1.historia, 
              t2.nombre AS cliente_nombre, t2.apaterno AS cliente_apaterno, t2.amaterno AS cliente_amaterno, 
              t3.nombre AS repartidor_nombre, t3.apaterno AS repartidor_apaterno, t3.amaterno AS repartidor_amaterno
       FROM tblclientesasignadosarepartidores t1
       JOIN tblcliente t2 ON t1.idcliente = t2.idcliente
       JOIN tblrepartidor t3 ON t1.idrepartidor = t3.idrepartidor`
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

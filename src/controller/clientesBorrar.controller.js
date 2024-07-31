//src/controller/clientes.controller.js
import { query } from "express";
import { getConnection } from "./../database/database";

//obtener todos los cliente
const getClientes = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query(
      "SELECT idcliente, nombre, apaterno, amaterno, email, contrasenia, telefono, direccion, qr, fotoperfil, coordenadas, repartidorasignado FROM tblcliente"
    );
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
//obtener un cliente por ID
const getCliente = async (req, res) => {
  try {
    console.log(req.params);
    const { idcliente } = req.params;
    const connection = await getConnection();
    const result = await connection.query(
      "SELECT idcliente, nombre, apaterno, amaterno, email, contrasenia, telefono, direccion, qr, fotoperfil, coordenadas, repartidorasignado FROM tblcliente WHERE idcliente=?",
      idcliente
    );
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

//eliminar un cliente
const DeleteCliente = async (req, res) => {
  try {
    console.log(req.params);
    const { idcliente } = req.params;
    const connection = await getConnection();
    const result = await connection.query(
      "DELETE FROM tblcliente WHERE idcliente=?",
      idcliente
    );
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

//actualizar un cliente
const updateCliente = async (req, res) => {
  try {
    const { idcliente } = req.params;
    const {
      nombre,
      apaterno,
      amaterno,
      email,
      contrasenia,
      telefono,
      direccion,
      qr,
    } = req.body;

    if (
      idcliente == undefined ||
      nombre == undefined ||
      apaterno == undefined ||
      amaterno == undefined ||
      email == undefined ||
      contrasenia == undefined ||
      telefono == undefined ||
      direccion == undefined ||
      qr == undefined
    ) {
      res
        .status(400)
        .json({ message: " error, campos faltantes o incorrectos" });
    }
    const cliente = {
      idcliente,
      nombre,
      apaterno,
      amaterno,
      email,
      contrasenia,
      telefono,
      direccion,
      qr,
    };
    const connection = await getConnection();
    const result = await connection.query(
      "UPDATE tblcliente SET ? WHERE idcliente=?",
      [cliente, idcliente]
    );
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

//agregar un cliente
const addCliente = async (req, res) => {
  try {
    const {
      nombre,
      apaterno,
      amaterno,
      email,
      contrasenia,
      telefono,
      direccion,
      qr,
    } = req.body;

    if (
      nombre == undefined ||
      apaterno == undefined ||
      amaterno == undefined ||
      email == undefined ||
      contrasenia == undefined ||
      telefono == undefined ||
      direccion == undefined ||
      qr == undefined
    ) {
      res
        .status(400)
        .json({ message: " error, campos faltantes o incorrectos" });
    }

    const cliente = {
      nombre,
      apaterno,
      amaterno,
      email,
      contrasenia,
      telefono,
      direccion,
      qr,
    };
    const connection = await getConnection();
    await connection.query("INSERT INTO tblcliente SET ?", cliente);
    res.json({ message: "cliente agregado" });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
// Asignar un cliente a un repartidor
const asignarCliente = async (req, res) => {
  try {
    const { idcliente, idrepartidor } = req.body;
    const connection = await getConnection();
    const result = await connection.query(
      "INSERT INTO tblclientesasignadosarepartidores (idcliente, idrepartidor) VALUES (?, ?)",
      [idcliente, idrepartidor]
    );
    res.json({ message: "Cliente asignado exitosamente", result });
  } catch (error) {
    res.status(500).json({ message: "Error al asignar cliente", error });
  }
};

// Asignar múltiples clientes a un repartidor
const asignarClientes = async (req, res) => {
  try {
    const { idrepartidor, clientes } = req.body;
    const connection = await getConnection();

    // Verificar si los clientes ya están asignados
    for (const idcliente of clientes) {
      const [existingAssignment] = await connection.query(
        "SELECT * FROM tblclientesasignadosarepartidores WHERE idcliente = ?",
        [idcliente]
      );
      if (existingAssignment) {
        return res.status(400).json({
          message: `El cliente con ID ${idcliente} ya está asignado a un repartidor.`,
        });
      }
    }

    // Asignar los clientes
    for (const idcliente of clientes) {
      await connection.query(
        "INSERT INTO tblclientesasignadosarepartidores (idcliente, idrepartidor) VALUES (?, ?)",
        [idcliente, idrepartidor]
      );
    }
    res.json({ message: "Clientes asignados exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al asignar clientes", error });
  }
};
// Obtener clientes asignados a un repartidor
const obtenerClientesAsignados = async (req, res) => {
  try {
    const { idrepartidor } = req.params;
    const connection = await getConnection();
    const result = await connection.query(
      "SELECT c.idcliente, c.nombre, c.apaterno, c.amaterno, c.direccion, c.qr, a.visitado " +
        "FROM tblcliente c JOIN tblclientesasignadosarepartidores a " +
        "ON c.idcliente = a.idcliente WHERE a.idrepartidor = ?",
      [idrepartidor]
    );
    res.json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener clientes asignados", error });
  }
};
// Obtener todos los repartidores con sus clientes asignados EN PRUEBAAA
const obtenerRepartidoresConClientes = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query(`
      SELECT 
        r.idrepartidor, r.nombre AS repartidor_nombre, r.apaterno AS repartidor_apaterno, r.amaterno AS repartidor_amaterno,
        c.idcliente, c.nombre AS cliente_nombre, c.apaterno AS cliente_apaterno, c.amaterno AS cliente_amaterno,
        a.visitado
      FROM 
        tblrepartidor r
      LEFT JOIN 
        tblclientesasignadosarepartidores a ON r.idrepartidor = a.idrepartidor
      LEFT JOIN 
        tblcliente c ON a.idcliente = c.idcliente
    `);

    console.log("Resultado de la consulta:", result);

    if (result.length === 0) {
      console.log("No se encontraron repartidores con clientes asignados.");
      return res.json([]);
    }

    const repartidores = {};

    result.forEach((row) => {
      if (!repartidores[row.idrepartidor]) {
        repartidores[row.idrepartidor] = {
          idrepartidor: row.idrepartidor,
          repartidor_nombre: row.repartidor_nombre,
          repartidor_apaterno: row.repartidor_apaterno,
          repartidor_amaterno: row.repartidor_amaterno,
          clientes: [],
        };
      }

      if (row.idcliente) {
        repartidores[row.idrepartidor].clientes.push({
          idcliente: row.idcliente,
          cliente_nombre: row.cliente_nombre,
          cliente_apaterno: row.cliente_apaterno,
          cliente_amaterno: row.cliente_amaterno,
          visitado: row.visitado,
        });
      }
    });

    const resultadoFinal = Object.values(repartidores);
    console.log(
      "Resultado estructurado:",
      JSON.stringify(resultadoFinal, null, 2)
    );

    res.json(resultadoFinal);
  } catch (error) {
    console.error("Error al obtener repartidores con clientes:", error);
    res
      .status(500)
      .json({ message: "Error al obtener repartidores con clientes", error });
  }
};

const eliminarAsignacionCliente = async (req, res) => {
  try {
    const { idcliente, idrepartidor } = req.params;
    const connection = await getConnection();
    const result = await connection.query(
      "DELETE FROM tblclientesasignadosarepartidores WHERE idcliente = ? AND idrepartidor = ?",
      [idcliente, idrepartidor]
    );
    if (result.affectedRows > 0) {
      res.json({ message: "Cliente asignado eliminado correctamente" });
    } else {
      res.status(404).json({ message: "Cliente asignado no encontrado" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar la asignación del cliente", error });
  }
};
// Confirmar visita
const confirmarVisita = async (req, res) => {
  try {
    const { idcliente } = req.params;
    const connection = await getConnection();
    const result = await connection.query(
      "UPDATE tblclientesasignadosarepartidores SET visitado = TRUE WHERE idcliente = ?",
      [idcliente]
    );
    if (result.affectedRows > 0) {
      res.json({
        message: "MSJ API Visita confirmada para el cliente: " + idcliente,
      });
    } else {
      res.status(404).json({
        message:
          "MSJ API Cliente no encontrado o no asignado a este repartidor",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "MSJ API Error al confirmar la visita", error });
  }
};

export const methods = {
  getClientes,
  getCliente,
  DeleteCliente,
  updateCliente,
  addCliente,
  obtenerClientesAsignados,
  eliminarAsignacionCliente,
  asignarCliente,
  asignarClientes,
  confirmarVisita,
  obtenerRepartidoresConClientes,
};

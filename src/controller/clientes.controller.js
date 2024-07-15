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
      "SELECT c.idcliente, c.nombre, c.apaterno, c.amaterno, c.direccion, c.qr" +
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
      res.json({ message: "Visita confirmada para el cliente: " + idcliente });
    } else {
      res.status(404).json({
        message: "Cliente no encontrado o no asignado a este repartidor",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al confirmar la visita", error });
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
};

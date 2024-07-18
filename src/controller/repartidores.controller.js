//src/controller/repartidores.controller.js

import { query } from "express";
import { getConnection } from "./../database/database";

//obtener todos los repartidores
const getRepartidores = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query(
      "SELECT idrepartidor, nombre, apaterno, amaterno, email, contrasenia, telefono, fotoperfil FROM tblrepartidor"
    );
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
//obtener un respartidor por ID
const getRepartidor = async (req, res) => {
  try {
    console.log(req.params);
    const { idrepartidor } = req.params;
    const connection = await getConnection();
    const result = await connection.query(
      "SELECT idrepartidor, nombre, apaterno, amaterno, email, contrasenia, telefono, fotoperfil FROM tblrepartidor WHERE idrepartidor=?",
      idrepartidor
    );
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

//eliminar un repartidor
const DeleteRepartidor = async (req, res) => {
  try {
    console.log(req.params);
    const { idrepartidor } = req.params;
    const connection = await getConnection();
    const result = await connection.query(
      "DELETE FROM tblrepartidor WHERE idrepartidor=?",
      idrepartidor
    );
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

//actualizar un repartidor
const updateRepartidor = async (req, res) => {
  try {
    const { idrepartidor } = req.params;
    const { nombre, apaterno, amaterno, email, contrasenia, telefono } =
      req.body;

    if (
      idrepartidor == undefined ||
      nombre == undefined ||
      apaterno == undefined ||
      amaterno == undefined ||
      email == undefined ||
      contrasenia == undefined ||
      telefono == undefined
    ) {
      res
        .status(400)
        .json({ message: " error, campos faltantes o incorrectos" });
    }
    const repartidor = {
      idrepartidor,
      nombre,
      apaterno,
      amaterno,
      email,
      contrasenia,
      telefono,
    };
    const connection = await getConnection();
    const result = await connection.query(
      "UPDATE tblrepartidor SET ? WHERE idrepartidor=?",
      [repartidor, idrepartidor]
    );
    res.json(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

//agregar un repartidor
const addRepartidor = async (req, res) => {
  try {
    const {
      nombre,
      apaterno,
      amaterno,
      email,
      contrasenia,
      telefono,
      respuestaSecreta,
      nuevaContrasenia,
    } = req.body;

    if (
      nombre == undefined ||
      apaterno == undefined ||
      amaterno == undefined ||
      email == undefined ||
      contrasenia == undefined ||
      telefono == undefined ||
      respuestaSecreta == undefined ||
      nuevaContrasenia == undefined
    ) {
      res
        .status(400)
        .json({ message: " error, campos faltantes o incorrectos" });
    }

    const repartidor = {
      nombre,
      apaterno,
      amaterno,
      email,
      contrasenia,
      telefono,
      respuestaSecreta,
      nuevaContrasenia,
    };
    const connection = await getConnection();
    await connection.query("INSERT INTO tblrepartidor SET ?", repartidor);
    res.json({ message: "Repartidor agregado" });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const methods = {
  getRepartidores,
  getRepartidor,
  addRepartidor,
  DeleteRepartidor,
  updateRepartidor,
};

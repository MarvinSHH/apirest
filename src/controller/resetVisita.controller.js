//src/controller/resetVisita.controller.js
import { query } from "express";
import { getConnection } from "./../database/database";

const resetVisitado = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query(
      "UPDATE tblclientesasignadosarepartidores SET visitado = 0"
    );
    res.json({ message: "Visit status reset successfully", result });
  } catch (error) {
    console.error("Error resetting visit status:", error);
    res
      .status(500)
      .json({ message: "Error resetting visit status", error: error.message });
  }
};

export const methods = {
  resetVisitado,
};

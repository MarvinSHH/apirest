//src/controller/visitad.controller.js
import { query } from "express";
import { getConnection } from "./../database/database";

const resetVisitado = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query(
      "UPDATE tblclientesasignadosarepartidores SET visitado = 0 WHERE visitado != 0"
    );
    res.json({
      message: "Visit status reset successfully",
      result,
      affectedRows: result.affectedRows, // Include affected rows in response
    });
  } catch (error) {
    console.error("Error resetting visit status:", error);
    res.status(500).json({ message: "Error resetting visit status", error });
  }
};

export const methods = {
  resetVisitado,
};

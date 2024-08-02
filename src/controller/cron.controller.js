import { getConnection } from "../database/database";

export const resetDailyData = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query(
      `UPDATE tblclientesasignadosarepartidores 
       SET visitado = 0, foto = NULL, historia = NULL`
    );
    res.json({
      message: `Datos reiniciados: ${result.affectedRows} filas afectadas`,
    });
  } catch (error) {
    console.error("Error reiniciando los datos:", error);
    res.status(500).json({ message: "Error reiniciando los datos" });
  }
};
export const methods = {
  resetDailyData,
};

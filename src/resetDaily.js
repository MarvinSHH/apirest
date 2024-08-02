const cron = require("node-cron");
const { getConnection } = require("./database/database");

cron.schedule("* * * * *", async () => {
  try {
    console.log("Intentando obtener la conexión a la base de datos...");
    const connection = await getConnection();
    console.log("Conexión obtenida, intentando ejecutar la consulta...");
    const result = await connection.query(
      `UPDATE tblclientesasignadosarepartidores 
       SET visitado = 0, foto = NULL, historia = NULL`
    );
    console.log("Datos reiniciados cada minuto:", result.affectedRows);
  } catch (error) {
    console.error("Error reiniciando los datos:", error);
  }
});

console.log(
  "Tarea programada para reiniciar datos cada minuto (para pruebas)."
);

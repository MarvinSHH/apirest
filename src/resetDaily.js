const cron = require("node-cron");
const { getConnection } = require("./database/database");

// Programa la tarea para que se ejecute cada día a la medianoche
cron.schedule("0 0 * * *", async () => {
  try {
    const connection = await getConnection();
    const result = await connection.query(
      `UPDATE tblclientesasignadosarepartidores 
       SET visitado = 0, foto = NULL, historia = NULL`
    );
    console.log("Datos reiniciados diariamente:", result.affectedRows);
  } catch (error) {
    console.error("Error reiniciando los datos:", error);
  }
});

console.log(
  "Tarea programada para reiniciar datos diariamente a medianocheeee."
);

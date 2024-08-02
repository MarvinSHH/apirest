import cron from "node-cron";
import { getConnection } from "./database/database";

// Programa la tarea para que se ejecute cada minuto (para pruebas)
cron.schedule("* * * * *", async () => {
  try {
    const connection = await getConnection();
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
import cron from "node-cron";
import { getConnection } from "./database/database";

// Programa la tarea para que se ejecute cada minuto (para pruebas)
cron.schedule("* * * * *", async () => {
  try {
    const connection = await getConnection();
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

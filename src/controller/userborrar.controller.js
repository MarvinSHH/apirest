import { getConnection } from "../database/database";

export const getUserData = async (req, res) => {
  const { id } = req.params;
  const type = req.userType; // Utilizar el tipo de usuario del token decodificado
  console.log(`Fetching data for user ID: ${id}, Type: ${type}`); // Log para depuración

  try {
    const connection = await getConnection();
    console.log("Database connection established"); // Log para depuración
    let query = "";

    if (type === "admin") {
      query =
        "SELECT nombre, apaterno, amaterno, email FROM tbladmin WHERE idadmin = ?";
    } else if (type === "repartidor") {
      query =
        "SELECT nombre, apaterno, amaterno, email FROM tblrepartidor WHERE idrepartidor = ?";
    } else {
      console.log("Tipo de usuario inválido");
      return res.status(400).json({ message: "Tipo de usuario inválido" });
    }

    console.log(`Executing query: ${query} with ID: ${id}`); // Log para depuración
    const [rows] = await connection.query(query, [id]);
    console.log(`Query result: ${JSON.stringify(rows)}`); // Log para depuración

    if (Array.isArray(rows) && rows.length > 0) {
      console.log(`User found: ${JSON.stringify(rows[0])}`); // Log para depuración
      return res.json(rows[0]);
    } else if (rows.length === undefined && Object.keys(rows).length > 0) {
      console.log(`User found: ${JSON.stringify(rows)}`); // Log para depuración
      return res.json(rows);
    } else {
      console.log("Usuario no encontrado");
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener los datos del usuario:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const updateUserData = async (req, res) => {
  const { id } = req.params;
  const type = req.userType; // Utilizar el tipo de usuario del token decodificado
  const { nombre, apaterno, amaterno, email } = req.body;
  try {
    const connection = await getConnection();
    let query = "";

    if (type === "admin") {
      query =
        "UPDATE tbladmin SET nombre = ?, apaterno = ?, amaterno = ?, email = ? WHERE idadmin = ?";
    } else if (type === "repartidor") {
      query =
        "UPDATE tblrepartidor SET nombre = ?, apaterno = ?, amaterno = ?, email = ? WHERE idrepartidor = ?";
    } else {
      return res.status(400).json({ message: "Tipo de usuario inválido" });
    }

    await connection.query(query, [nombre, apaterno, amaterno, email, id]);
    res.json({ message: "Datos actualizados correctamente" });
  } catch (error) {
    console.error("Error al actualizar los datos del usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const methods = {
  getUserData,
  updateUserData,
};

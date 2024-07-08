import { getConnection } from "../database/database";

export const getUserData = async (req, res) => {
  try {
    const { id, type } = req.params;
    const connection = await getConnection();
    const query = `SELECT * FROM tbl${type} WHERE id${type} = ?`;
    const [result] = await connection.query(query, [id]);
    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(result[0]);
  } catch (error) {
    console.error("Error getting user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUserData = async (req, res) => {
  try {
    const { id, type } = req.params;
    const userData = req.body;
    const connection = await getConnection();
    const query = `UPDATE tbl${type} SET ? WHERE id${type} = ?`;
    await connection.query(query, [userData, id]);
    res.json({ message: "User data updated successfully" });
  } catch (error) {
    console.error("Error updating user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const methods = {
  getUserData,
  updateUserData,
};

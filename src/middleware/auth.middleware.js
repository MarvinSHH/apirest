import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], "your_jwt_secret");
    req.userId = decoded.id;
    req.userType = decoded.role; // Asegúrate de que el role se extrae correctamente
    console.log(
      `Token verified. User ID: ${req.userId}, User Type: ${req.userType}`
    ); // Log para depuración
    next();
  } catch (error) {
    console.error("Error verifying token:", error); // Log para depuración
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default verifyToken;

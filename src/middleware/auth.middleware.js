import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const encoded = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(encoded, "jessyca");

    req.tipo = decoded.tipo;

    const user = await userModel.find(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
};

export default auth;

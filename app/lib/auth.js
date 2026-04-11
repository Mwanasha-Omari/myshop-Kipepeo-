import jwt from "jsonwebtoken";

export async function getUserFromToken(req) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    throw new Error("No token provided");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded; // contains user id
  } catch (err) {
    throw new Error("Invalid token");
  }
}
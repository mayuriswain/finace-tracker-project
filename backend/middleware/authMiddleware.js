// middleware/authMiddleware.js
import admin from "firebase-admin";
import serviceAccount from "../serviceAccountKey.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("Headers received:", req.headers);

    if (!authHeader) {
      console.log("No Authorization header provided");
      return res.status(401).json({ message: "No token provided" });
    }

    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      console.log("Authorization header is not in Bearer <token> format");
      return res.status(401).json({ message: "Invalid Authorization header format" });
    }

    const token = parts[1];
    console.log("Token received:", token);

    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log("Decoded token:", decodedToken);

    // Attach user info to request
    req.user = { uid: decodedToken.uid, email: decodedToken.email };
    console.log("User attached to request:", req.user);

    next();
  } catch (err) {
    console.error("Error verifying token:", err);
    res.status(401).json({ message: "Invalid token" });
  }
};

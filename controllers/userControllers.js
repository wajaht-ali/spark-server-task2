import { myDB } from "../config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    myDB.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      (err, results) => {
        if (err) {
          console.error("Database query error:", err);
          return res.status(500).json({ message: "Internal server error." });
        }

        if (results.length === 0) {
          return res
            .status(401)
            .json({ message: "Invalid email or password." });
        }

        const user = results[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            console.error("Error comparing passwords:", err);
            return res
              .status(500)
              .json({ success: false, message: "Internal server error." });
          }

          if (!isMatch) {
            return res
              .status(401)
              .json({ success: false, message: "Invalid email or password." });
          }
          const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );
          // Successful login
          res.status(200).json({
            success: true,
            message: "Login successful!",
            userId: user.id,
            token,
          });
        });
      }
    );
  } catch (error) {
    console.log(`Error with login controller: ${error}`);
    res.status(400).send({
      success: false,
      message: "Error with login controller",
      error,
    });
  }
};

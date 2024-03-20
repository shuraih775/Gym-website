const { promisify } = require("util");
const connectDB = require("./db"); 
const { Router } = require('express');
const router = Router();
const connection = connectDB();

const queryAsync = promisify(connection.query).bind(connection);

const login = async (req, res) => {
  try {
    const  username = req.body.username;
    const  pass  = req.body.password;
    const query = "SELECT * FROM users WHERE username = ? AND pass = ?";
    const rows = await queryAsync(query, [username, pass.toString()]);
    if (rows.length > 0) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (err) {
    console.error("Error querying database:", err);
    res.status(500).json({ error: "Failed to login. Please try again later." });
  }
};

router.post('/', login);
module.exports = router;

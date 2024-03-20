const { promisify } = require("util");
const connectDB = require("./db"); 
const { Router } = require('express');
const router = Router();
const connection = connectDB();


const queryAsync = promisify(connection.query).bind(connection);

const signup = async (req, res) => {
  try {
    const username = req.body.username;
    const pass = req.body.password;
    const  emailid = req.body.emailid;
    console.log(pass);
    const query = "INSERT INTO users (username, pass, emailid) VALUES (?, ?, ?)";
    await queryAsync(query, [username, pass.toString(), emailid]);
    res.status(200).json({ message: "Signup successful" });
  } catch (err) {
    console.error("Error inserting into database:", err);
    res.status(500).json({ error: "Failed to sign up. Please try again later." });
  }
};
router.post('/', signup);
module.exports = router;

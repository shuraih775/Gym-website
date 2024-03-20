const { promisify } = require("util");
const connectDB = require("./db"); 
const { Router } = require('express');
const router = Router();
const connection = connectDB();


const queryAsync = promisify(connection.query).bind(connection);

const personalize = async (req, res) => {
  try {
    const username = req.body.username;
    const age = req.body.age;
    const weight = req.body.weight;
    const  height = req.body.height;
    const  selected = req.body.selected;
    const  selectedVal = req.body.selectedVal;
    console.log(age,weight,height);
    const query = "INSERT INTO personal_info (username, age, weight, height, goals, frequency) VALUES (?, ?, ?, ?, ?, ?)";
    await queryAsync(query, [username, age, weight, height, selected.toString(), selectedVal.toString()]);
    res.status(200).json({ message: "storing successful" });
  } catch (err) {
    console.error("Error inserting into database:", err);
    res.status(500).json({ error: "Failed to store. Please try again later." });
  }
};
router.post('/', personalize);
module.exports = router;

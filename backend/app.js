const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const port = 3006; // Make sure to use the same port here

app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "erp",
});

db.connect((err) => {
  if (err) {
    console.error("DB connection error:", err);
    return;
  }
  console.log("Connected to MySQL DB");
});

app.get("/api/login", (req, res) => {
  const { LoginID, PasswordHash } = req.query;
  db.query("SELECT * FROM student WHERE LoginID = ? AND PasswordHash = ?", [LoginID, PasswordHash], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.json({ success: true, student: results[0] });
    } else {
      res.json({ success: false });
    }
  });
});


app.get("/api/data", (req, res) => {
  const {RollNO} = req.query;
  db.query("SELECT * FROM student WHERE RollNO = ?",[RollNO] ,  (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Start the server on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

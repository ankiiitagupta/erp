const express = require("express");
const mysql = require("mysql");
const app = express();
const port = 3006;

const db = mysql.createConnection({
  host: "192.168.224.78",
  user: "ankita",
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
const createTableQuery = `
    CREATE TABLE IF NOT EXISTS test123 (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE
    )
  `;

db.query(createTableQuery, (err, result) => {
  if (err) throw err;
  console.log("Table created or already exists");
});

app.get("/api/data", (req, res) => {
  db.query("SELECT * FROM student", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

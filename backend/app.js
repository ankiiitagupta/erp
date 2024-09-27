const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3006;

const db = mysql.createConnection({
  host: '10.0.16.174',
  user: 'sub2',
  password: 'admin',
  database: 'erp'
});

db.connect(err => {
  if (err) {
    console.error('DB connection error:', err);
    return;
  }
  console.log('Connected to MySQL DB');

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
    console.log('Table created or already exists');
  });


app.get('/api/data', (req, res) => {
  db.query('SELECT * FROM attendance', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
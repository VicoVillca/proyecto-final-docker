const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4000;

const dbConfig = {
  host: process.env.DB_HOST || 'database',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'rootpass',
  database: process.env.DB_NAME || 'cv_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

app.get('/cv', async (req, res) => {
  try {
  
    const [personaRows] = await pool.query('SELECT * FROM persona LIMIT 1');
    
    if (personaRows.length === 0) {
      return res.status(404).json({ message: 'No persona found' });
    }

    const persona = personaRows[0];
    const [formacionRows] = await pool.query('SELECT * FROM formacion WHERE persona_id = ?', [persona.id]);

    const result = {
      ...persona,
      formacion: formacionRows
    };

    res.json(result);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});

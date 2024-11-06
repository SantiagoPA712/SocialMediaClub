const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',            
  host: 'localhost',
  database: 'liquor_db',    
  password: 'santiago1',    
  port: 5432,              
});

pool.connect((err) => {
  if (err) {
    console.error('Error connecting to PostgreSQL database:', err);
  } else {
    console.log('Connected to PostgreSQL database');
  }
});

module.exports = pool;

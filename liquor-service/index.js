const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa CORS
const pool = require('./database');

const app = express();
const PORT = 3001;

app.use(cors()); // Habilita CORS para todas las rutas
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Liquor Service API');
});

// Rutas CRUD para la tabla orders
app.get('/orders', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM orders');
    res.json({ orders: result.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/orders', async (req, res) => {
  const { LiquorType, Quantity, StockLevel, OrderDate, SupplierContact, ReorderThreshold, EventServed } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO orders (LiquorType, Quantity, StockLevel, OrderDate, SupplierContact, ReorderThreshold, EventServed) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING OrderID',
      [LiquorType, Quantity, StockLevel, OrderDate, SupplierContact, ReorderThreshold, EventServed]
    );
    res.json({ OrderID: result.rows[0].orderid });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/orders/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query('SELECT * FROM orders WHERE OrderID = $1', [id]);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/orders/:id', async (req, res) => {
  const { LiquorType, Quantity, StockLevel, OrderDate, SupplierContact, ReorderThreshold, EventServed } = req.body;
  const id = req.params.id;
  try {
    await pool.query(
      'UPDATE orders SET LiquorType = $1, Quantity = $2, StockLevel = $3, OrderDate = $4, SupplierContact = $5, ReorderThreshold = $6, EventServed = $7 WHERE OrderID = $8',
      [LiquorType, Quantity, StockLevel, OrderDate, SupplierContact, ReorderThreshold, EventServed, id]
    );
    res.json({ message: 'Order updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/orders/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await pool.query('DELETE FROM orders WHERE OrderID = $1', [id]);
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Liquor service running on http://localhost:${PORT}`);
});

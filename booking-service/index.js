const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa CORS
const db = require('./database');

const app = express();
const PORT = 3002;

app.use(cors()); // Habilita CORS para todas las rutas
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Booking Service API');
});


app.get('/bookings', (req, res) => {
  db.all('SELECT * FROM bookings', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ bookings: rows });
    }
  });
});

app.post('/bookings', (req, res) => {
  const { EventName, EventDate, GuestName, GuestEmail, GuestCount, SpecialRequests } = req.body;
  db.run(
    'INSERT INTO bookings (EventName, EventDate, GuestName, GuestEmail, GuestCount, SpecialRequests) VALUES (?, ?, ?, ?, ?, ?)',
    [EventName, EventDate, GuestName, GuestEmail, GuestCount, SpecialRequests],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
      } else {
        res.json({ EventID: this.lastID });
      }
    }
  );
});

app.get('/bookings/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM bookings WHERE EventID = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(row);
    }
  });
});

app.put('/bookings/:id', (req, res) => {
  const { EventName, EventDate, GuestName, GuestEmail, GuestCount, SpecialRequests } = req.body;
  const id = req.params.id;
  db.run(
    'UPDATE bookings SET EventName = ?, EventDate = ?, GuestName = ?, GuestEmail = ?, GuestCount = ?, SpecialRequests = ? WHERE EventID = ?',
    [EventName, EventDate, GuestName, GuestEmail, GuestCount, SpecialRequests, id],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
      } else {
        res.json({ message: 'Booking updated successfully' });
      }
    }
  );
});

app.delete('/bookings/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM bookings WHERE EventID = ?', id, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
      res.json({ message: 'Booking deleted successfully' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Booking service running on http://localhost:${PORT}`);
});

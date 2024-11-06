const sqlite3 = require('sqlite3').verbose();
const path = require('path');


const dbPath = path.resolve(__dirname, 'booking.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
    db.run(`
      CREATE TABLE IF NOT EXISTS bookings (
        EventID INTEGER PRIMARY KEY AUTOINCREMENT,
        EventName TEXT,
        EventDate TEXT,
        GuestName TEXT,
        GuestEmail TEXT,
        GuestCount INTEGER,
        SpecialRequests TEXT
      )
    `);
  }
});

module.exports = db;


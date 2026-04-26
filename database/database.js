// database.js
// ─────────────────────────────────────────────
// Creates a PostgreSQL connection pool and
// exports it so every route file can reuse it.
// pg uses async/await — all queries return Promises.

require("dotenv").config();
const { Pool } = require("pg");

const db = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Test the connection on startup
db.connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("Database connection failed:", err.message));

module.exports = db;

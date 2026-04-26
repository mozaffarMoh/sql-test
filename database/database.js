// database.js
// ─────────────────────────────────────────────
// Opens a single connection to bookstore.db and
// exports it so every route file can reuse it.
// better-sqlite3 is synchronous — no callbacks
// or promises needed, which makes the code simple.

const Database = require("better-sqlite3");
const path = require("path");

// The .db file lives in the same folder as this file
const DB_PATH = path.join(__dirname, "bookstore.db");

const db = new Database(DB_PATH);

// Enable foreign key enforcement (off by default in SQLite)
db.pragma("foreign_keys = ON");

module.exports = db;

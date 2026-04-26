// routes/books.js
const express = require("express");
const router = express.Router();
const db = require("../database/database");

// ─────────────────────────────────────────────
// GET /books
// Returns all books with their author name
// SQL used: SELECT with JOIN
// ─────────────────────────────────────────────
router.get("/", async (req, res) => {
  const { rows } = await db.query(`
    SELECT b.id, b.title, b.genre, b.price, b.published_year,
           a.name AS author
    FROM books b
    JOIN authors a ON b.author_id = a.id
    ORDER BY b.title
  `);
  res.json(rows);
});

// ─────────────────────────────────────────────
// GET /books/:id
// Returns one book by its ID
// SQL used: SELECT with WHERE
// ─────────────────────────────────────────────
router.get("/:id", async (req, res) => {
  const { rows } = await db.query(
    `
    SELECT b.id, b.title, b.genre, b.price, b.published_year,
           a.name AS author, a.country AS author_country
    FROM books b
    JOIN authors a ON b.author_id = a.id
    WHERE b.id = $1
    `,
    [req.params.id],
  );

  if (rows.length === 0) {
    return res.status(404).json({ error: "Book not found" });
  }

  res.json(rows[0]);
});

// ─────────────────────────────────────────────
// POST /books
// Add a new book
// SQL used: INSERT INTO ... RETURNING
// Body: { title, author_id, genre, price, published_year }
// ─────────────────────────────────────────────
router.post("/", async (req, res) => {
  const { title, author_id, genre, price, published_year } = req.body;

  if (!title || !author_id || !price) {
    return res.status(400).json({ error: "title, author_id and price are required" });
  }

  const { rows } = await db.query(
    `INSERT INTO books (title, author_id, genre, price, published_year)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id`,
    [title, author_id, genre, price, published_year],
  );

  res.status(201).json({ id: rows[0].id, message: "Book created" });
});

// ─────────────────────────────────────────────
// PUT /books/:id
// Update a book's price or genre
// SQL used: UPDATE ... SET ... WHERE
// Body: { price, genre }
// ─────────────────────────────────────────────
router.put("/:id", async (req, res) => {
  const { price, genre } = req.body;

  const { rowCount } = await db.query(
    `UPDATE books
     SET price = COALESCE($1, price),
         genre = COALESCE($2, genre)
     WHERE id = $3`,
    [price, genre, req.params.id],
  );

  if (rowCount === 0) {
    return res.status(404).json({ error: "Book not found" });
  }

  res.json({ message: "Book updated" });
});

// ─────────────────────────────────────────────
// DELETE /books/:id
// Remove a book
// SQL used: DELETE FROM ... WHERE
// ─────────────────────────────────────────────
router.delete("/:id", async (req, res) => {
  const { rowCount } = await db.query("DELETE FROM books WHERE id = $1", [req.params.id]);

  if (rowCount === 0) {
    return res.status(404).json({ error: "Book not found" });
  }

  res.json({ message: "Book deleted" });
});

module.exports = router;

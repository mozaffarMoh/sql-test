// routes/books.js
const express = require("express");
const router = express.Router();
const db = require("../database/database");

// ─────────────────────────────────────────────
// GET /books
// Returns all books with their author name
// SQL used: SELECT with JOIN
// ─────────────────────────────────────────────
router.get("/", (req, res) => {
  const books = db
    .prepare(
      `
    SELECT b.id, b.title, b.genre, b.price, b.published_year,
           a.name AS author
    FROM books b
    JOIN authors a ON b.author_id = a.id
    ORDER BY b.title
  `,
    )
    .all();

  res.json(books);
});

// ─────────────────────────────────────────────
// GET /books/:id
// Returns one book by its ID
// SQL used: SELECT with WHERE
// ─────────────────────────────────────────────
router.get("/:id", (req, res) => {
  const book = db
    .prepare(
      `
    SELECT b.id, b.title, b.genre, b.price, b.published_year,
           a.name AS author, a.country AS author_country
    FROM books b
    JOIN authors a ON b.author_id = a.id
    WHERE b.id = ?
  `,
    )
    .get(req.params.id); // .get() returns one row or undefined

  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  res.json(book);
});

// ─────────────────────────────────────────────
// POST /books
// Add a new book
// SQL used: INSERT INTO
// Body: { title, author_id, genre, price, published_year }
// ─────────────────────────────────────────────
router.post("/", (req, res) => {
  const { title, author_id, genre, price, published_year } = req.body;

  if (!title || !author_id || !price) {
    return res.status(400).json({ error: "title, author_id and price are required" });
  }

  const result = db
    .prepare(
      `
    INSERT INTO books (title, author_id, genre, price, published_year)
    VALUES (?, ?, ?, ?, ?)
  `,
    )
    .run(title, author_id, genre, price, published_year);

  res.status(201).json({ id: result.lastInsertRowid, message: "Book created" });
});

// ─────────────────────────────────────────────
// PUT /books/:id
// Update a book's price or genre
// SQL used: UPDATE ... SET ... WHERE
// Body: { price, genre }
// ─────────────────────────────────────────────
router.put("/:id", (req, res) => {
  const { price, genre } = req.body;

  const result = db
    .prepare(
      `
    UPDATE books
    SET price = COALESCE(?, price),
        genre = COALESCE(?, genre)
    WHERE id = ?
  `,
    )
    .run(price, genre, req.params.id);

  if (result.changes === 0) {
    return res.status(404).json({ error: "Book not found" });
  }

  res.json({ message: "Book updated" });
});

// ─────────────────────────────────────────────
// DELETE /books/:id
// Remove a book
// SQL used: DELETE FROM ... WHERE
// ─────────────────────────────────────────────
router.delete("/:id", (req, res) => {
  const result = db.prepare("DELETE FROM books WHERE id = ?").run(req.params.id);

  if (result.changes === 0) {
    return res.status(404).json({ error: "Book not found" });
  }

  res.json({ message: "Book deleted" });
});

module.exports = router;

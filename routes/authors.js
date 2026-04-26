// routes/authors.js
const express = require("express");
const router = express.Router();
const db = require("../database/database");

// ─────────────────────────────────────────────
// GET /authors
// Returns all authors with their book count
// SQL used: SELECT with LEFT JOIN + GROUP BY
// ─────────────────────────────────────────────
router.get("/", (req, res) => {
  const authors = db
    .prepare(
      `
    SELECT a.id, a.name, a.country, a.birth_year,
           COUNT(b.id) AS books_in_store
    FROM authors a
    LEFT JOIN books b ON b.author_id = a.id
    GROUP BY a.id
    ORDER BY a.name
  `,
    )
    .all();

  res.json(authors);
});

// ─────────────────────────────────────────────
// GET /authors/:id/books
// Returns one author and all their books
// SQL used: SELECT with WHERE + JOIN
// ─────────────────────────────────────────────
router.get("/:id/books", (req, res) => {
  const author = db.prepare("SELECT * FROM authors WHERE id = ?").get(req.params.id);

  if (!author) {
    return res.status(404).json({ error: "Author not found" });
  }

  const books = db
    .prepare(
      `
    SELECT id, title, genre, price, published_year
    FROM books
    WHERE author_id = ?
    ORDER BY published_year
  `,
    )
    .all(req.params.id);

  res.json({ author, books });
});

module.exports = router;

// routes/authors.js
const express = require("express");
const router = express.Router();
const db = require("../database/database");

// ─────────────────────────────────────────────
// GET /authors
// Returns all authors with their book count
// SQL used: SELECT with LEFT JOIN + GROUP BY
// ─────────────────────────────────────────────
router.get("/", async (req, res) => {
  const { rows } = await db.query(`
    SELECT a.id, a.name, a.country, a.birth_year,
           COUNT(b.id) AS books_in_store
    FROM authors a
    LEFT JOIN books b ON b.author_id = a.id
    GROUP BY a.id
    ORDER BY a.name
  `);
  res.json(rows);
});

// ─────────────────────────────────────────────
// GET /authors/:id/books
// Returns one author and all their books
// SQL used: SELECT with WHERE + JOIN
// ─────────────────────────────────────────────
router.get("/:id/books", async (req, res) => {
  const { rows: authorRows } = await db.query("SELECT * FROM authors WHERE id = $1", [req.params.id]);

  if (authorRows.length === 0) {
    return res.status(404).json({ error: "Author not found" });
  }

  const { rows: books } = await db.query(
    `SELECT id, title, genre, price, published_year
     FROM books
     WHERE author_id = $1
     ORDER BY published_year`,
    [req.params.id],
  );

  res.json({ author: authorRows[0], books });
});

module.exports = router;

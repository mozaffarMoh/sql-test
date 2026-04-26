// routes/authors.js
const express = require("express");
const router = express.Router();
const authorRepo = require("../repositories/authorRepository");

router.get("/", async (req, res) => {
  const authors = await authorRepo.getAll();
  res.json(authors);
});

router.get("/:id/books", async (req, res) => {
  const author = await authorRepo.getById(req.params.id);
  if (!author) return res.status(404).json({ error: "Author not found" });

  const books = await authorRepo.getBooksByAuthor(req.params.id);
  res.json({ author, books });
});

module.exports = router;

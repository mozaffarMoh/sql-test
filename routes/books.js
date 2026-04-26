// routes/books.js
const express = require("express");
const router = express.Router();
const bookRepo = require("../repositories/bookRepository");

router.get("/", async (req, res) => {
  const books = await bookRepo.getAll();
  res.json(books);
});

router.get("/:id", async (req, res) => {
  const book = await bookRepo.getById(req.params.id);
  if (!book) return res.status(404).json({ error: "Book not found" });
  res.json(book);
});

router.post("/", async (req, res) => {
  const { title, author_id, price } = req.body;
  if (!title || !author_id || !price) {
    return res.status(400).json({ error: "title, author_id and price are required" });
  }
  const book = await bookRepo.create(req.body);
  res.status(201).json({ id: book.id, message: "Book created" });
});

router.put("/:id", async (req, res) => {
  const rowCount = await bookRepo.update(req.params.id, req.body);
  if (rowCount === 0) return res.status(404).json({ error: "Book not found" });
  res.json({ message: "Book updated" });
});

router.delete("/:id", async (req, res) => {
  const rowCount = await bookRepo.remove(req.params.id);
  if (rowCount === 0) return res.status(404).json({ error: "Book not found" });
  res.json({ message: "Book deleted" });
});

module.exports = router;

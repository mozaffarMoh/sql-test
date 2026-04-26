// server.js — entry point
const express = require("express");
const app = express();

// Parse incoming JSON request bodies
app.use(express.json());

// ── Routes ──────────────────────────────────
app.use("/books", require("./routes/books"));
app.use("/authors", require("./routes/authors"));
app.use("/orders", require("./routes/orders"));

// ── Root route — quick overview of available endpoints ──
app.get("/", (req, res) => {
  res.json({
    message: "Bookstore API",
    endpoints: {
      books: {
        "GET  /books": "List all books",
        "GET  /books/:id": "Get one book",
        "POST /books": "Add a new book",
        "PUT  /books/:id": "Update book price or genre",
        "DELETE /books/:id": "Delete a book",
      },
      authors: {
        "GET  /authors": "List all authors with book count",
        "GET  /authors/:id/books": "Get one author and their books",
      },
      orders: {
        "GET  /orders": "List all orders with totals",
        "GET  /orders/:id": "Get one order with all items",
        "POST /orders": "Create a new order",
      },
    },
  });
});

// ── Start server ─────────────────────────────
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Bookstore API running at http://localhost:${PORT}`);
});

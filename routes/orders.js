// routes/orders.js
const express = require("express");
const router = express.Router();
const db = require("../database/database");

// ─────────────────────────────────────────────
// GET /orders
// Returns all orders with customer name and total cost
// SQL used: SELECT with multi-table JOIN + GROUP BY
// ─────────────────────────────────────────────
router.get("/", async (req, res) => {
  const { rows } = await db.query(`
    SELECT
      o.id          AS order_id,
      o.order_date,
      c.name        AS customer,
      c.city,
      COUNT(oi.id)               AS total_items,
      SUM(b.price * oi.quantity) AS total_cost
    FROM orders o
    JOIN customers   c  ON o.customer_id = c.id
    JOIN order_items oi ON oi.order_id   = o.id
    JOIN books       b  ON b.id          = oi.book_id
    GROUP BY o.id, o.order_date, c.name, c.city
    ORDER BY o.order_date DESC
  `);
  res.json(rows);
});

// ─────────────────────────────────────────────
// GET /orders/:id
// Returns one order with all its books
// SQL used: two queries — one for the order, one for items
// ─────────────────────────────────────────────
router.get("/:id", async (req, res) => {
  const { rows: orderRows } = await db.query(
    `SELECT o.id, o.order_date, c.name AS customer, c.email, c.city
     FROM orders o
     JOIN customers c ON o.customer_id = c.id
     WHERE o.id = $1`,
    [req.params.id],
  );

  if (orderRows.length === 0) {
    return res.status(404).json({ error: "Order not found" });
  }

  const { rows: items } = await db.query(
    `SELECT b.title, b.genre, b.price, oi.quantity,
            (b.price * oi.quantity) AS subtotal
     FROM order_items oi
     JOIN books b ON b.id = oi.book_id
     WHERE oi.order_id = $1`,
    [req.params.id],
  );

  const total = items.reduce((sum, item) => sum + parseFloat(item.subtotal), 0);

  res.json({ order: orderRows[0], items, total });
});

// ─────────────────────────────────────────────
// POST /orders
// Create a new order with items
// SQL used: INSERT INTO orders, then INSERT INTO order_items
// Body: { customer_id, items: [{ book_id, quantity }] }
// ─────────────────────────────────────────────
router.post("/", async (req, res) => {
  const { customer_id, items } = req.body;

  if (!customer_id || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "customer_id and items array are required" });
  }

  // Use a client from the pool so we can run BEGIN/COMMIT/ROLLBACK
  const client = await db.connect();
  try {
    await client.query("BEGIN");

    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const { rows } = await client.query(
      "INSERT INTO orders (customer_id, order_date) VALUES ($1, $2) RETURNING id",
      [customer_id, today],
    );
    const orderId = rows[0].id;

    for (const item of items) {
      await client.query("INSERT INTO order_items (order_id, book_id, quantity) VALUES ($1, $2, $3)", [
        orderId,
        item.book_id,
        item.quantity || 1,
      ]);
    }

    await client.query("COMMIT");
    res.status(201).json({ order_id: orderId, message: "Order created" });
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release(); // return client back to the pool
  }
});

module.exports = router;

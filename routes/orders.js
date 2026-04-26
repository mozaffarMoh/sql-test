// routes/orders.js
const express = require("express");
const router = express.Router();
const db = require("../database/database");

// ─────────────────────────────────────────────
// GET /orders
// Returns all orders with customer name and total cost
// SQL used: SELECT with multi-table JOIN + GROUP BY
// ─────────────────────────────────────────────
router.get("/", (req, res) => {
  const orders = db
    .prepare(
      `
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
    GROUP BY o.id
    ORDER BY o.order_date DESC
  `,
    )
    .all();

  res.json(orders);
});

// ─────────────────────────────────────────────
// GET /orders/:id
// Returns one order with all its books
// SQL used: two queries — one for the order, one for items
// ─────────────────────────────────────────────
router.get("/:id", (req, res) => {
  const order = db
    .prepare(
      `
    SELECT o.id, o.order_date, c.name AS customer, c.email, c.city
    FROM orders o
    JOIN customers c ON o.customer_id = c.id
    WHERE o.id = ?
  `,
    )
    .get(req.params.id);

  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  const items = db
    .prepare(
      `
    SELECT b.title, b.genre, b.price, oi.quantity,
           (b.price * oi.quantity) AS subtotal
    FROM order_items oi
    JOIN books b ON b.id = oi.book_id
    WHERE oi.order_id = ?
  `,
    )
    .all(req.params.id);

  const total = items.reduce((sum, item) => sum + item.subtotal, 0);

  res.json({ order, items, total });
});

// ─────────────────────────────────────────────
// POST /orders
// Create a new order with items
// SQL used: INSERT INTO orders, then INSERT INTO order_items
// Body: { customer_id, items: [{ book_id, quantity }] }
// ─────────────────────────────────────────────
router.post("/", (req, res) => {
  const { customer_id, items } = req.body;

  if (!customer_id || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "customer_id and items array are required" });
  }

  // Use a transaction so both inserts succeed or both fail together
  const createOrder = db.transaction((customerId, orderItems) => {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    const order = db
      .prepare("INSERT INTO orders (customer_id, order_date) VALUES (?, ?)")
      .run(customerId, today);

    const insertItem = db.prepare("INSERT INTO order_items (order_id, book_id, quantity) VALUES (?, ?, ?)");

    for (const item of orderItems) {
      insertItem.run(order.lastInsertRowid, item.book_id, item.quantity || 1);
    }

    return order.lastInsertRowid;
  });

  const orderId = createOrder(customer_id, items);
  res.status(201).json({ order_id: orderId, message: "Order created" });
});

module.exports = router;

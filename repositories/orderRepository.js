// repositories/orderRepository.js
// ─────────────────────────────────────────────
// No SQL here — Prisma generates the queries for us.

const prisma = require("../database/prisma");

const getAll = async () => {
  // include = JOIN, _count = COUNT
  return prisma.orders.findMany({
    include: {
      customers: { select: { name: true, city: true } },
      order_items: {
        include: { books: { select: { price: true } } },
      },
    },
    orderBy: { order_date: "desc" },
  });
};

const getById = async (id) => {
  return prisma.orders.findUnique({
    where: { id: parseInt(id) },
    include: {
      customers: { select: { name: true, email: true, city: true } },
    },
  });
};

const getItemsByOrderId = async (orderId) => {
  return prisma.order_items.findMany({
    where: { order_id: parseInt(orderId) },
    include: {
      books: { select: { title: true, genre: true, price: true } },
    },
  });
};

// Prisma.$transaction = all operations succeed or all fail together
const create = async (customer_id, items) => {
  const today = new Date().toISOString().split("T")[0];

  const order = await prisma.$transaction(async (tx) => {
    const newOrder = await tx.orders.create({
      data: {
        customer_id: parseInt(customer_id),
        order_date: today,
      },
    });

    await tx.order_items.createMany({
      data: items.map((item) => ({
        order_id: newOrder.id,
        book_id: parseInt(item.book_id),
        quantity: item.quantity || 1,
      })),
    });

    return newOrder;
  });

  return order.id;
};

module.exports = { getAll, getById, getItemsByOrderId, create };

const getAll = async () => {
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
  return rows;
};

const getById = async (id) => {
  const { rows } = await db.query(
    `SELECT o.id, o.order_date, c.name AS customer, c.email, c.city
     FROM orders o
     JOIN customers c ON o.customer_id = c.id
     WHERE o.id = $1`,
    [id],
  );
  return rows[0] || null;
};

const getItemsByOrderId = async (orderId) => {
  const { rows } = await db.query(
    `SELECT b.title, b.genre, b.price, oi.quantity,
            (b.price * oi.quantity) AS subtotal
     FROM order_items oi
     JOIN books b ON b.id = oi.book_id
     WHERE oi.order_id = $1`,
    [orderId],
  );
  return rows;
};

// Uses a transaction: all inserts succeed together or all fail together
const create = async (customer_id, items) => {
  const client = await db.connect();
  try {
    await client.query("BEGIN");

    const today = new Date().toISOString().split("T")[0];
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
    return orderId;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

module.exports = { getAll, getById, getItemsByOrderId, create };

// repositories/bookRepository.js
// ─────────────────────────────────────────────
// No SQL here — Prisma generates the queries for us.

const prisma = require("../database/prisma");

const getAll = async () => {
  // include: { authors: true } = JOIN authors table
  return prisma.books.findMany({
    include: { authors: true },
    orderBy: { title: "asc" },
  });
};

const getById = async (id) => {
  return prisma.books.findUnique({
    where: { id: parseInt(id) },
    include: { authors: true },
  });
};

const create = async ({ title, author_id, genre, price, published_year }) => {
  return prisma.books.create({
    data: {
      title,
      author_id: parseInt(author_id),
      genre,
      price: parseFloat(price),
      published_year: parseInt(published_year),
    },
  });
};

const update = async (id, { price, genre }) => {
  try {
    await prisma.books.update({
      where: { id: parseInt(id) },
      data: {
        ...(price !== undefined && { price: parseFloat(price) }),
        ...(genre !== undefined && { genre }),
      },
    });
    return 1;
  } catch {
    return 0; // record not found
  }
};

const remove = async (id) => {
  try {
    await prisma.books.delete({ where: { id: parseInt(id) } });
    return 1;
  } catch {
    return 0; // record not found
  }
};

module.exports = { getAll, getById, create, update, remove };

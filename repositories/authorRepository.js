// repositories/authorRepository.js
// ─────────────────────────────────────────────
// No SQL here — Prisma generates the queries for us.

const prisma = require("../database/prisma");

const getAll = async () => {
  // _count: { books: true } = COUNT of related books
  return prisma.authors.findMany({
    include: { _count: { select: { books: true } } },
    orderBy: { name: "asc" },
  });
};

const getById = async (id) => {
  return prisma.authors.findUnique({
    where: { id: parseInt(id) },
  });
};

const getBooksByAuthor = async (authorId) => {
  return prisma.books.findMany({
    where: { author_id: parseInt(authorId) },
    select: { id: true, title: true, genre: true, price: true, published_year: true },
    orderBy: { published_year: "asc" },
  });
};

module.exports = { getAll, getById, getBooksByAuthor };

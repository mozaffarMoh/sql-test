// database/prisma.js
// ─────────────────────────────────────────────
// Creates a single PrismaClient instance and
// exports it so every repository can reuse it.

const { PrismaClient } = require("../../generated/prisma");

const prisma = new PrismaClient();

module.exports = prisma;

-- ============================================================
-- STEP 1: CREATE TABLES
-- Project: Bookstore Database
-- ============================================================
-- A database is made of tables. Each table holds one type of data.
-- Think of a table like a spreadsheet with rows and columns.

-- First, clean up old tables if they exist (useful when re-running)
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS authors;

-- -------------------------------------------------------
-- TABLE: authors
-- Stores information about book authors
-- -------------------------------------------------------
CREATE TABLE authors (
    id          INTEGER     PRIMARY KEY,  -- unique ID for each author
    name        TEXT        NOT NULL,     -- author's full name (required)
    country     TEXT,                     -- where they are from
    birth_year  INTEGER                   -- year they were born
);

-- -------------------------------------------------------
-- TABLE: books
-- Stores information about each book
-- -------------------------------------------------------
CREATE TABLE books (
    id              INTEGER     PRIMARY KEY,
    title           TEXT        NOT NULL,
    author_id       INTEGER     NOT NULL,   -- links to authors.id
    genre           TEXT,
    price           REAL        NOT NULL,   -- price in USD
    published_year  INTEGER,
    FOREIGN KEY (author_id) REFERENCES authors(id)  -- relationship rule
);

-- -------------------------------------------------------
-- TABLE: customers
-- Stores people who buy books
-- -------------------------------------------------------
CREATE TABLE customers (
    id      INTEGER PRIMARY KEY,
    name    TEXT    NOT NULL,
    email   TEXT    UNIQUE NOT NULL,    -- each email must be unique
    city    TEXT
);

-- -------------------------------------------------------
-- TABLE: orders
-- Each order belongs to one customer
-- -------------------------------------------------------
CREATE TABLE orders (
    id          INTEGER PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    order_date  TEXT    NOT NULL,   -- stored as YYYY-MM-DD
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

-- -------------------------------------------------------
-- TABLE: order_items
-- Each row = one book inside one order
-- An order can have many books (many-to-many via this table)
-- -------------------------------------------------------
CREATE TABLE order_items (
    id          INTEGER PRIMARY KEY,
    order_id    INTEGER NOT NULL,
    book_id     INTEGER NOT NULL,
    quantity    INTEGER NOT NULL DEFAULT 1,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (book_id)  REFERENCES books(id)
);

-- -------------------------------------------------------
-- KEY CONCEPTS LEARNED IN THIS FILE:
--   CREATE TABLE   - defines a new table and its columns
--   DROP TABLE     - deletes a table
--   PRIMARY KEY    - unique identifier for each row
--   FOREIGN KEY    - links one table to another
--   NOT NULL       - the column cannot be empty
--   UNIQUE         - no two rows can have the same value
--   DEFAULT        - used when no value is provided
--   Data types: INTEGER, TEXT, REAL
-- -------------------------------------------------------

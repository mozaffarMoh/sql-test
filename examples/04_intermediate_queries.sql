-- ============================================================
-- STEP 4: INTERMEDIATE QUERIES
-- ============================================================

-- -------------------------------------------------------
-- 4.1  AGGREGATE FUNCTIONS
-- -------------------------------------------------------
-- These functions calculate a single value from many rows.

-- COUNT - how many rows?
SELECT COUNT(*) AS total_books FROM books;

-- How many books per genre?
SELECT genre, COUNT(*) AS num_books
FROM books
GROUP BY genre;

-- SUM - add up values
SELECT SUM(price) AS total_value_of_all_books FROM books;

-- AVG - average value
SELECT AVG(price) AS average_book_price FROM books;

-- MIN and MAX
SELECT MIN(price) AS cheapest, MAX(price) AS most_expensive FROM books;

-- -------------------------------------------------------
-- 4.2  GROUP BY - group rows to apply aggregate functions
-- -------------------------------------------------------
-- Total price of books per genre
SELECT genre, SUM(price) AS total_price, AVG(price) AS avg_price
FROM books
GROUP BY genre;

-- Count how many books each author has written
SELECT author_id, COUNT(*) AS books_written
FROM books
GROUP BY author_id;

-- -------------------------------------------------------
-- 4.3  HAVING - filter groups (like WHERE but for GROUP BY)
-- -------------------------------------------------------
-- Genres that have more than 1 book
SELECT genre, COUNT(*) AS num_books
FROM books
GROUP BY genre
HAVING COUNT(*) > 1;

-- -------------------------------------------------------
-- 4.4  JOIN - combine data from multiple tables
-- -------------------------------------------------------
-- INNER JOIN: only rows that match in BOTH tables

-- Show book titles with their author name (not just author_id)
SELECT books.title, authors.name AS author_name
FROM books
INNER JOIN authors ON books.author_id = authors.id;

-- More readable using aliases (b and a)
SELECT b.title, b.genre, b.price, a.name AS author, a.country
FROM books b
JOIN authors a ON b.author_id = a.id;

-- -------------------------------------------------------
-- 4.5  JOIN multiple tables
-- -------------------------------------------------------
-- Show each order: customer name, date, book title, quantity
SELECT
    c.name        AS customer,
    o.order_date,
    b.title       AS book,
    oi.quantity
FROM orders o
JOIN customers   c  ON o.customer_id = c.id
JOIN order_items oi ON oi.order_id   = o.id
JOIN books       b  ON oi.book_id    = b.id
ORDER BY o.order_date;

-- -------------------------------------------------------
-- 4.6  LEFT JOIN - include all rows from the left table
--      even if there is no match in the right table
-- -------------------------------------------------------
-- Show all authors, and any books they have (NULL if none)
SELECT a.name AS author, b.title AS book
FROM authors a
LEFT JOIN books b ON b.author_id = a.id;

-- -------------------------------------------------------
-- 4.7  Useful combined queries
-- -------------------------------------------------------

-- Total amount spent per customer
SELECT
    c.name AS customer,
    SUM(b.price * oi.quantity) AS total_spent
FROM customers c
JOIN orders      o  ON o.customer_id = c.id
JOIN order_items oi ON oi.order_id   = o.id
JOIN books       b  ON b.id          = oi.book_id
GROUP BY c.id, c.name
ORDER BY total_spent DESC;

-- Best selling books (by quantity ordered)
SELECT
    b.title,
    SUM(oi.quantity) AS total_sold
FROM books b
JOIN order_items oi ON oi.book_id = b.id
GROUP BY b.id, b.title
ORDER BY total_sold DESC;

-- Authors ordered by number of books in the store
SELECT
    a.name AS author,
    COUNT(b.id) AS num_books
FROM authors a
LEFT JOIN books b ON b.author_id = a.id
GROUP BY a.id, a.name
ORDER BY num_books DESC;

-- -------------------------------------------------------
-- 4.8  UPDATE - change existing data
-- -------------------------------------------------------
-- Increase price of all Sci-Fi books by $1
UPDATE books
SET price = price + 1.00
WHERE genre = 'Sci-Fi';

-- Fix a customer's city
UPDATE customers
SET city = 'Manchester'
WHERE email = 'bob@email.com';

-- -------------------------------------------------------
-- 4.9  DELETE - remove rows
-- -------------------------------------------------------
-- Remove a specific order item (be careful with DELETE!)
-- DELETE FROM order_items WHERE id = 10;

-- -------------------------------------------------------
-- KEY CONCEPTS LEARNED IN THIS FILE:
--   COUNT, SUM, AVG, MIN, MAX  - aggregate functions
--   GROUP BY                   - group rows for aggregation
--   HAVING                     - filter after grouping
--   INNER JOIN                 - combine matching rows from 2 tables
--   LEFT JOIN                  - all left rows + matching right rows
--   Multi-table JOIN           - chain multiple joins
--   UPDATE ... SET             - modify existing rows
--   DELETE FROM                - remove rows
-- -------------------------------------------------------

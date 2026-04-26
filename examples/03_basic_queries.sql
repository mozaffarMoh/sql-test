-- ============================================================
-- STEP 3: BASIC QUERIES (SELECT)
-- ============================================================
-- SELECT is used to read/fetch data from a table.
-- It is the most used SQL command.

-- -------------------------------------------------------
-- 3.1  SELECT ALL COLUMNS
-- -------------------------------------------------------
-- The * means "all columns"
SELECT * FROM authors;

SELECT * FROM books;

-- -------------------------------------------------------
-- 3.2  SELECT SPECIFIC COLUMNS
-- -------------------------------------------------------
-- Name only the columns you want
SELECT name, country FROM authors;

SELECT title, genre, price FROM books;

-- -------------------------------------------------------
-- 3.3  WHERE - filter rows by a condition
-- -------------------------------------------------------
-- Get only books that cost more than $10
SELECT title, price
FROM books
WHERE price > 10;

-- Get authors from the United Kingdom
SELECT name, birth_year
FROM authors
WHERE country = 'United Kingdom';

-- Get books published after 1960
SELECT title, published_year
FROM books
WHERE published_year > 1960;

-- -------------------------------------------------------
-- 3.4  AND / OR - combine multiple conditions
-- -------------------------------------------------------
-- Books that are cheap AND published recently
SELECT title, price, published_year
FROM books
WHERE price < 10 AND published_year > 1940;

-- Books that are Fantasy OR Sci-Fi
SELECT title, genre
FROM books
WHERE genre = 'Fantasy' OR genre = 'Sci-Fi';

-- -------------------------------------------------------
-- 3.5  ORDER BY - sort results
-- -------------------------------------------------------
-- Sort books by price from cheapest to most expensive
SELECT title, price
FROM books
ORDER BY price ASC;   -- ASC = ascending (low to high)

-- Sort books by price most expensive first
SELECT title, price
FROM books
ORDER BY price DESC;  -- DESC = descending (high to low)

-- -------------------------------------------------------
-- 3.6  LIMIT - only return a set number of rows
-- -------------------------------------------------------
-- Get the 3 most expensive books
SELECT title, price
FROM books
ORDER BY price DESC
LIMIT 3;

-- -------------------------------------------------------
-- 3.7  LIKE - search with patterns
-- -------------------------------------------------------
-- % means "any characters"
-- Find all books with "Harry" in the title
SELECT title FROM books WHERE title LIKE '%Harry%';

-- Find authors whose name starts with 'A'
SELECT name FROM authors WHERE name LIKE 'A%';

-- -------------------------------------------------------
-- 3.8  IN - match a list of values
-- -------------------------------------------------------
-- Get authors from UK or USA
SELECT name, country
FROM authors
WHERE country IN ('United Kingdom', 'United States');

-- -------------------------------------------------------
-- 3.9  IS NULL / IS NOT NULL - check for empty values
-- -------------------------------------------------------
-- Find books missing a genre
SELECT title FROM books WHERE genre IS NULL;

-- Find books that have a genre
SELECT title, genre FROM books WHERE genre IS NOT NULL;

-- -------------------------------------------------------
-- 3.10 Aliases with AS - rename a column in output
-- -------------------------------------------------------
SELECT title AS book_title, price AS cost_usd
FROM books;

-- -------------------------------------------------------
-- KEY CONCEPTS LEARNED IN THIS FILE:
--   SELECT          - choose which columns to show
--   FROM            - which table to read from
--   WHERE           - filter rows by condition
--   AND / OR        - combine conditions
--   ORDER BY        - sort rows (ASC / DESC)
--   LIMIT           - cap the number of rows returned
--   LIKE            - pattern matching (% = wildcard)
--   IN              - match multiple values at once
--   IS NULL         - check for missing data
--   AS              - rename a column in the result
-- -------------------------------------------------------

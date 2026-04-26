-- ============================================================
-- STEP 5: PRACTICE CHALLENGES
-- ============================================================
-- Try to write each query yourself before looking at the answer!
-- The answers are hidden below each challenge using comments.

-- -------------------------------------------------------
-- BEGINNER CHALLENGES
-- -------------------------------------------------------

-- Challenge 1:
-- List all books that cost less than $10.00
-- Show: title and price

-- YOUR QUERY HERE:


-- Answer (highlight to reveal):
-- SELECT title, price FROM books WHERE price < 10.00;


-- -------------------------------------------------------
-- Challenge 2:
-- List all customers who live in 'New York'

-- YOUR QUERY HERE:


-- Answer:
-- SELECT name, email FROM customers WHERE city = 'New York';


-- -------------------------------------------------------
-- Challenge 3:
-- List all books ordered by published_year from newest to oldest

-- YOUR QUERY HERE:


-- Answer:
-- SELECT title, published_year FROM books ORDER BY published_year DESC;


-- -------------------------------------------------------
-- Challenge 4:
-- How many books are in the database?

-- YOUR QUERY HERE:


-- Answer:
-- SELECT COUNT(*) AS total_books FROM books;


-- -------------------------------------------------------
-- Challenge 5:
-- What is the most expensive book? Show its title and price.

-- YOUR QUERY HERE:


-- Answer:
-- SELECT title, price FROM books ORDER BY price DESC LIMIT 1;


-- -------------------------------------------------------
-- INTERMEDIATE CHALLENGES
-- -------------------------------------------------------

-- Challenge 6:
-- Show each book's title alongside the author's full name
-- (You'll need a JOIN)

-- YOUR QUERY HERE:


-- Answer:
-- SELECT b.title, a.name AS author
-- FROM books b
-- JOIN authors a ON b.author_id = a.id;


-- -------------------------------------------------------
-- Challenge 7:
-- How many books has each author written?
-- Show: author name and book count
-- Order by book count descending

-- YOUR QUERY HERE:


-- Answer:
-- SELECT a.name, COUNT(b.id) AS books_written
-- FROM authors a
-- LEFT JOIN books b ON b.author_id = a.id
-- GROUP BY a.id, a.name
-- ORDER BY books_written DESC;


-- -------------------------------------------------------
-- Challenge 8:
-- What is the average price of books per genre?
-- Only show genres where the average price is above $9

-- YOUR QUERY HERE:


-- Answer:
-- SELECT genre, AVG(price) AS avg_price
-- FROM books
-- GROUP BY genre
-- HAVING AVG(price) > 9;


-- -------------------------------------------------------
-- Challenge 9:
-- List all books ordered by customer 'Alice Johnson'
-- Show: book title, quantity, and order date

-- YOUR QUERY HERE:


-- Answer:
-- SELECT b.title, oi.quantity, o.order_date
-- FROM customers c
-- JOIN orders      o  ON o.customer_id = c.id
-- JOIN order_items oi ON oi.order_id   = o.id
-- JOIN books       b  ON b.id          = oi.book_id
-- WHERE c.name = 'Alice Johnson';


-- -------------------------------------------------------
-- Challenge 10:
-- Which book has been ordered the most times (by total quantity)?
-- Show: book title and total quantity

-- YOUR QUERY HERE:


-- Answer:
-- SELECT b.title, SUM(oi.quantity) AS total_ordered
-- FROM books b
-- JOIN order_items oi ON oi.book_id = b.id
-- GROUP BY b.id, b.title
-- ORDER BY total_ordered DESC
-- LIMIT 1;


-- -------------------------------------------------------
-- BONUS CHALLENGES (harder)
-- -------------------------------------------------------

-- Bonus 1:
-- Find customers who have placed more than 1 order

-- Bonus 2:
-- Show the total revenue (price * quantity) per genre

-- Bonus 3:
-- Find any authors who have NOT had any books ordered yet
-- (Hint: use LEFT JOIN and check for NULL)

-- -------------------------------------------------------
-- BONUS ANSWERS (try yourself first!)
-- -------------------------------------------------------

-- Bonus 1:
-- SELECT c.name, COUNT(o.id) AS order_count
-- FROM customers c
-- JOIN orders o ON o.customer_id = c.id
-- GROUP BY c.id, c.name
-- HAVING COUNT(o.id) > 1;

-- Bonus 2:
-- SELECT b.genre, SUM(b.price * oi.quantity) AS revenue
-- FROM books b
-- JOIN order_items oi ON oi.book_id = b.id
-- GROUP BY b.genre
-- ORDER BY revenue DESC;

-- Bonus 3:
-- SELECT a.name AS author
-- FROM authors a
-- LEFT JOIN books b ON b.author_id = a.id
-- LEFT JOIN order_items oi ON oi.book_id = b.id
-- WHERE oi.id IS NULL;

-- ============================================================
-- STEP 2: INSERT SAMPLE DATA
-- ============================================================
-- INSERT INTO adds rows into a table.
-- Syntax: INSERT INTO table_name (col1, col2) VALUES (val1, val2);

-- -------------------------------------------------------
-- Authors
-- -------------------------------------------------------
INSERT INTO authors (id, name, country, birth_year) VALUES
    (1, 'George Orwell',      'United Kingdom', 1903),
    (2, 'J.K. Rowling',       'United Kingdom', 1965),
    (3, 'Frank Herbert',      'United States',  1920),
    (4, 'Agatha Christie',    'United Kingdom', 1890),
    (5, 'Gabriel Garcia Marquez', 'Colombia',   1927);

-- -------------------------------------------------------
-- Books
-- -------------------------------------------------------
INSERT INTO books (id, title, author_id, genre, price, published_year) VALUES
    (1,  '1984',                          1, 'Dystopian',  9.99,  1949),
    (2,  'Animal Farm',                   1, 'Satire',     7.99,  1945),
    (3,  'Harry Potter and the Sorcerer''s Stone', 2, 'Fantasy', 12.99, 1997),
    (4,  'Harry Potter and the Chamber of Secrets', 2, 'Fantasy', 12.99, 1998),
    (5,  'Dune',                          3, 'Sci-Fi',     14.99, 1965),
    (6,  'Murder on the Orient Express',  4, 'Mystery',    8.99,  1934),
    (7,  'And Then There Were None',      4, 'Mystery',    8.99,  1939),
    (8,  'One Hundred Years of Solitude', 5, 'Magical Realism', 11.99, 1967);

-- -------------------------------------------------------
-- Customers
-- -------------------------------------------------------
INSERT INTO customers (id, name, email, city) VALUES
    (1, 'Alice Johnson', 'alice@email.com',  'New York'),
    (2, 'Bob Smith',     'bob@email.com',    'London'),
    (3, 'Carol White',   'carol@email.com',  'Paris'),
    (4, 'David Brown',   'david@email.com',  'New York'),
    (5, 'Eva Green',     'eva@email.com',    'Berlin');

-- -------------------------------------------------------
-- Orders
-- -------------------------------------------------------
INSERT INTO orders (id, customer_id, order_date) VALUES
    (1, 1, '2026-01-05'),
    (2, 2, '2026-01-10'),
    (3, 1, '2026-02-14'),
    (4, 3, '2026-02-20'),
    (5, 4, '2026-03-01'),
    (6, 5, '2026-03-15');

-- -------------------------------------------------------
-- Order Items (which books are in each order)
-- -------------------------------------------------------
INSERT INTO order_items (id, order_id, book_id, quantity) VALUES
    (1,  1, 1, 1),  -- Alice ordered: 1984
    (2,  1, 5, 1),  -- Alice ordered: Dune
    (3,  2, 3, 2),  -- Bob ordered: Harry Potter x2
    (4,  3, 2, 1),  -- Alice ordered: Animal Farm
    (5,  3, 6, 1),  -- Alice ordered: Orient Express
    (6,  4, 8, 1),  -- Carol ordered: 100 Years of Solitude
    (7,  5, 1, 1),  -- David ordered: 1984
    (8,  5, 7, 1),  -- David ordered: And Then There Were None
    (9,  6, 4, 1),  -- Eva ordered: Harry Potter 2
    (10, 6, 5, 1);  -- Eva ordered: Dune

-- -------------------------------------------------------
-- KEY CONCEPTS LEARNED IN THIS FILE:
--   INSERT INTO ... VALUES  - adds one or more rows
--   Multi-row insert        - multiple value sets separated by commas
--   Escaping quotes         - use '' (two single quotes) inside a string
-- -------------------------------------------------------

# Learn SQL — Bookstore Project

A hands-on beginner SQL project. You will build a small **bookstore database** from scratch, learning every core SQL concept along the way.

---

## What You Will Build

A database with 5 related tables:

```
authors ──< books ──< order_items >── orders >── customers
```

| Table         | What it stores                 |
| ------------- | ------------------------------ |
| `authors`     | Author names and info          |
| `books`       | Book titles, prices, genres    |
| `customers`   | People who buy books           |
| `orders`      | Each purchase a customer makes |
| `order_items` | Which books are in each order  |

---

## Prerequisites

You need a tool to run SQL. Pick one:

### Option A — SQLite (recommended for beginners, no install needed online)

1. Go to **[https://sqliteOnline.com](https://sqliteonline.com)** in your browser
2. Click **SQLite** on the left panel
3. Paste and run the SQL files in order — done!

### Option B — SQLite on your machine

```bash
# Install on Ubuntu/Debian
sudo apt install sqlite3

# Create and open your database
sqlite3 bookstore.db
```

Then run each file:

```bash
sqlite3 bookstore.db < 01_create_tables.sql
sqlite3 bookstore.db < 02_insert_data.sql
```

### Option C — DBeaver (free GUI tool)

1. Download from **[https://dbeaver.io](https://dbeaver.io)**
2. Create a new **SQLite** connection and point it to a new file `bookstore.db`
3. Open each `.sql` file and press **Run**

---

## Learning Path — Do These in Order

### Step 1 — Create the Tables

**File:** [01_create_tables.sql](01_create_tables.sql)

Run this file first. It creates all 5 empty tables.

**You will learn:**

- `CREATE TABLE` — define a table with columns
- `DROP TABLE` — delete a table
- `PRIMARY KEY` — unique ID for each row
- `FOREIGN KEY` — link tables together
- `NOT NULL`, `UNIQUE`, `DEFAULT` — column constraints
- Data types: `INTEGER`, `TEXT`, `REAL`

---

### Step 2 — Insert Sample Data

**File:** [02_insert_data.sql](02_insert_data.sql)

Populate the tables with real data to query.

**You will learn:**

- `INSERT INTO ... VALUES` — add rows to a table
- How to insert multiple rows at once
- Escaping single quotes inside strings

---

### Step 3 — Basic Queries

**File:** [03_basic_queries.sql](03_basic_queries.sql)

Start reading data with `SELECT`.

**You will learn:**

- `SELECT * FROM` — get all data
- `SELECT col1, col2` — choose specific columns
- `WHERE` — filter rows by condition
- `AND` / `OR` — combine conditions
- `ORDER BY` — sort results (`ASC` / `DESC`)
- `LIMIT` — return only N rows
- `LIKE` — search with `%` wildcard patterns
- `IN` — match a list of values
- `IS NULL` / `IS NOT NULL` — handle missing data
- `AS` — rename columns in output

---

### Step 4 — Intermediate Queries

**File:** [04_intermediate_queries.sql](04_intermediate_queries.sql)

Combine tables and calculate summaries.

**You will learn:**

- `COUNT`, `SUM`, `AVG`, `MIN`, `MAX` — aggregate functions
- `GROUP BY` — group rows before aggregating
- `HAVING` — filter groups (like `WHERE` but for `GROUP BY`)
- `JOIN` / `INNER JOIN` — combine rows from two tables
- `LEFT JOIN` — include rows even with no match
- Chaining multiple `JOIN`s
- `UPDATE ... SET` — modify existing rows
- `DELETE FROM` — remove rows

---

### Step 5 — Practice Challenges

**File:** [05_challenges.sql](05_challenges.sql)

10 challenges + 3 bonus challenges. Each has a hidden answer.

**Try to solve each one yourself before revealing the answer!**

---

## SQL Cheat Sheet

```sql
-- Read data
SELECT column1, column2 FROM table_name;
SELECT * FROM table_name WHERE condition;
SELECT * FROM table_name ORDER BY column DESC LIMIT 10;

-- Filter
WHERE price > 10
WHERE name = 'Alice'
WHERE genre IN ('Fantasy', 'Sci-Fi')
WHERE title LIKE '%Harry%'
WHERE description IS NULL

-- Aggregate
SELECT COUNT(*), SUM(price), AVG(price), MIN(price), MAX(price)
FROM books;

-- Group
SELECT genre, COUNT(*) FROM books GROUP BY genre;
SELECT genre, COUNT(*) FROM books GROUP BY genre HAVING COUNT(*) > 1;

-- Join two tables
SELECT b.title, a.name
FROM books b
JOIN authors a ON b.author_id = a.id;

-- Insert
INSERT INTO table_name (col1, col2) VALUES (val1, val2);

-- Update
UPDATE table_name SET column = value WHERE condition;

-- Delete
DELETE FROM table_name WHERE condition;
```

---

## Project File Overview

```
SQL/
├── README.md                 ← You are here
├── 01_create_tables.sql      ← Step 1: Define all tables
├── 02_insert_data.sql        ← Step 2: Fill tables with data
├── 03_basic_queries.sql      ← Step 3: SELECT, WHERE, ORDER BY
├── 04_intermediate_queries.sql  ← Step 4: JOIN, GROUP BY, UPDATE
└── 05_challenges.sql         ← Step 5: Practice exercises
```

---

## What to Do After This Project

Once you finish all 5 steps, here are good next topics:

| Topic                | What it covers                                    |
| -------------------- | ------------------------------------------------- |
| **Subqueries**       | A `SELECT` inside another `SELECT`                |
| **Views**            | Save a query as a virtual table                   |
| **Indexes**          | Speed up queries on large tables                  |
| **Transactions**     | Group operations so they succeed or fail together |
| **Window functions** | `ROW_NUMBER`, `RANK`, running totals              |

### Recommended free resources

- [SQLZoo](https://sqlzoo.net) — interactive exercises
- [Mode SQL Tutorial](https://mode.com/sql-tutorial) — real-world focused
- [PostgreSQL official docs](https://www.postgresql.org/docs/) — when ready for production SQL

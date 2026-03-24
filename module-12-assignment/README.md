# 📚 Books API

A secure, production-ready RESTful API for managing a book collection, built with **Node.js**, **Express**, and **MongoDB**.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [GET /api/books](#1-get-all-books)
  - [GET /api/books/:id](#2-get-book-by-id)
  - [POST /api/books](#3-create-a-book)
  - [PUT /api/books/:id](#4-update-a-book)
  - [DELETE /api/books/:id](#5-delete-a-book)
  - [GET /health](#6-health-check)
- [Running Tests](#running-tests)
- [Production Deployment](#production-deployment)
- [Security](#security)

---

## Features

- Full CRUD for books
- Security hardened with `helmet`, strict `cors`, rate limiting, NoSQL injection protection, and HPP
- Jest + Supertest test suite (11 tests)
- PM2 cluster-mode ready
- Nginx reverse proxy config included

---

## Tech Stack

| Layer       | Technology                                                    |
| ----------- | ------------------------------------------------------------- |
| Runtime     | Node.js 18+                                                   |
| Framework   | Express 4                                                     |
| Database    | MongoDB + Mongoose 8                                          |
| Security    | helmet, cors, express-rate-limit, express-mongo-sanitize, hpp |
| Testing     | Jest, Supertest                                               |
| Process Mgr | PM2 (cluster mode)                                            |
| Proxy       | Nginx                                                         |

---

## Getting Started

```bash
# 1. Clone the repo
git clone <repo-url> && cd books-api

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Edit .env with your MongoDB URI

# 4. Start development server
npm run dev

# 5. Run tests
npm test
```

---

## Environment Variables

| Variable          | Default                                  | Description                              |
| ----------------- | ---------------------------------------- | ---------------------------------------- |
| `PORT`            | `3000`                                   | Port the server listens on               |
| `NODE_ENV`        | `development`                            | Environment (`development`/`production`) |
| `MONGO_URI`       | `mongodb://localhost:27017/booksdb`      | MongoDB connection string                |
| `TEST_MONGO_URI`  | `mongodb://localhost:27017/booksdb_test` | MongoDB URI for test runs                |
| `ALLOWED_ORIGINS` | `http://localhost:3000`                  | Comma-separated CORS allowed origins     |

---

## API Endpoints

### Base URL

```
http://localhost:3000/api
```

All endpoints accept and return **JSON**. Set the header:

```
Content-Type: application/json
```

---

### 1. Get All Books

Retrieve all books, sorted by creation date (newest first).

| Field      | Value        |
| ---------- | ------------ |
| **URL**    | `/api/books` |
| **Method** | `GET`        |
| **Auth**   | None         |

**Request**

```bash
curl -X GET http://localhost:3000/api/books
```

**Success Response — 200 OK**

```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "665f1a2b3c4d5e6f7a8b9c0d",
      "title": "Clean Code",
      "author": "Robert C. Martin",
      "genre": "Programming",
      "publishedYear": 2008,
      "description": "A handbook of agile software craftsmanship.",
      "createdAt": "2024-06-04T10:00:00.000Z",
      "updatedAt": "2024-06-04T10:00:00.000Z"
    },
    {
      "_id": "665f1a2b3c4d5e6f7a8b9c0e",
      "title": "The Pragmatic Programmer",
      "author": "Andrew Hunt",
      "genre": "Programming",
      "publishedYear": 1999,
      "createdAt": "2024-06-04T09:00:00.000Z",
      "updatedAt": "2024-06-04T09:00:00.000Z"
    }
  ]
}
```

---

### 2. Get Book by ID

Retrieve a single book by its MongoDB ObjectId.

| Field          | Value                   |
| -------------- | ----------------------- |
| **URL**        | `/api/books/:id`        |
| **Method**     | `GET`                   |
| **Auth**       | None                    |
| **URL Params** | `id` — MongoDB ObjectId |

**Request**

```bash
curl -X GET http://localhost:3000/api/books/665f1a2b3c4d5e6f7a8b9c0d
```

**Success Response — 200 OK**

```json
{
  "success": true,
  "data": {
    "_id": "665f1a2b3c4d5e6f7a8b9c0d",
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "genre": "Programming",
    "publishedYear": 2008,
    "description": "A handbook of agile software craftsmanship.",
    "createdAt": "2024-06-04T10:00:00.000Z",
    "updatedAt": "2024-06-04T10:00:00.000Z"
  }
}
```

**Error Response — 404 Not Found**

```json
{
  "success": false,
  "message": "Book not found"
}
```

---

### 3. Create a Book

Add a new book to the collection.

| Field                | Value                            |
| -------------------- | -------------------------------- |
| **URL**              | `/api/books`                     |
| **Method**           | `POST`                           |
| **Auth**             | None                             |
| **Required Headers** | `Content-Type: application/json` |

**Request Body**

| Field           | Type   | Required | Description                          |
| --------------- | ------ | -------- | ------------------------------------ |
| `title`         | String | ✅ Yes   | Book title (max 200 chars)           |
| `author`        | String | ✅ Yes   | Author name (max 100 chars)          |
| `isbn`          | String | No       | ISBN (must be unique if provided)    |
| `genre`         | String | No       | Genre / category                     |
| `publishedYear` | Number | No       | Year published (1000 – current year) |
| `description`   | String | No       | Short description (max 1000 chars)   |

**Example Request**

```bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "genre": "Programming",
    "publishedYear": 2008,
    "description": "A handbook of agile software craftsmanship."
  }'
```

**Success Response — 201 Created**

```json
{
  "success": true,
  "data": {
    "_id": "665f1a2b3c4d5e6f7a8b9c0d",
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "genre": "Programming",
    "publishedYear": 2008,
    "description": "A handbook of agile software craftsmanship.",
    "createdAt": "2024-06-04T10:00:00.000Z",
    "updatedAt": "2024-06-04T10:00:00.000Z"
  }
}
```

**Error Response — 400 Bad Request** (missing required fields)

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Title is required and must be a non-empty string",
    "Author is required and must be a non-empty string"
  ]
}
```

---

### 4. Update a Book

Replace fields on an existing book.

| Field                | Value                            |
| -------------------- | -------------------------------- |
| **URL**              | `/api/books/:id`                 |
| **Method**           | `PUT`                            |
| **Auth**             | None                             |
| **Required Headers** | `Content-Type: application/json` |
| **URL Params**       | `id` — MongoDB ObjectId          |

**Example Request**

```bash
curl -X PUT http://localhost:3000/api/books/665f1a2b3c4d5e6f7a8b9c0d \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Clean Code (Updated Edition)",
    "author": "Robert C. Martin"
  }'
```

**Success Response — 200 OK**

```json
{
  "success": true,
  "data": {
    "_id": "665f1a2b3c4d5e6f7a8b9c0d",
    "title": "Clean Code (Updated Edition)",
    "author": "Robert C. Martin",
    "genre": "Programming",
    "publishedYear": 2008,
    "updatedAt": "2024-06-04T11:00:00.000Z"
  }
}
```

**Error Response — 404 Not Found**

```json
{
  "success": false,
  "message": "Book not found"
}
```

---

### 5. Delete a Book

Permanently remove a book by ID.

| Field          | Value                   |
| -------------- | ----------------------- |
| **URL**        | `/api/books/:id`        |
| **Method**     | `DELETE`                |
| **Auth**       | None                    |
| **URL Params** | `id` — MongoDB ObjectId |

**Example Request**

```bash
curl -X DELETE http://localhost:3000/api/books/665f1a2b3c4d5e6f7a8b9c0d
```

**Success Response — 204 No Content**

```
(empty body)
```

**Error Response — 404 Not Found**

```json
{
  "success": false,
  "message": "Book not found"
}
```

---

### 6. Health Check

Verify the server is running.

| Field      | Value     |
| ---------- | --------- |
| **URL**    | `/health` |
| **Method** | `GET`     |
| **Auth**   | None      |

**Request**

```bash
curl http://localhost:3000/health
```

**Response — 200 OK**

```json
{
  "status": "ok",
  "uptime": 123.456
}
```

---

## Running Tests

Tests use Jest + Supertest and connect to a separate test database. **No running server required.**

```bash
npm test
```

The suite covers:

| #   | Test                                                 | Expected |
| --- | ---------------------------------------------------- | -------- |
| 1   | `GET /api/books` — returns array                     | 200      |
| 2   | `GET /api/books` — returns empty array when no books | 200      |
| 3   | `POST /api/books` — valid body creates book          | 201      |
| 4   | `POST /api/books` — missing both fields              | 400      |
| 5   | `POST /api/books` — missing title                    | 400      |
| 6   | `POST /api/books` — missing author                   | 400      |
| 7   | `GET /api/books/:id` — non-existent ObjectId         | 404      |
| 8   | `GET /api/books/:id` — invalid ID format             | 404      |
| 9   | `GET /api/books/:id` — existing book                 | 200      |
| 10  | `DELETE /api/books/:id` — existing book              | 204      |
| 11  | `DELETE /api/books/:id` — non-existent book          | 404      |

---

## Production Deployment

### With PM2 (cluster mode)

```bash
# Install PM2 globally
npm install -g pm2

# Start in production cluster mode
pm2 start ecosystem.config.js --env production

# Monitor
pm2 monit

# Save process list and enable auto-restart on reboot
pm2 save
pm2 startup
```

### With Nginx

Copy `nginx.conf` to `/etc/nginx/sites-available/books-api`, then:

```bash
sudo ln -s /etc/nginx/sites-available/books-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## Security

| Measure                    | Library / Technique                                      |
| -------------------------- | -------------------------------------------------------- |
| Secure HTTP headers        | `helmet`                                                 |
| CORS origin whitelist      | `cors` with explicit `allowedOrigins`                    |
| General rate limiting      | `express-rate-limit` — 100 req / 15 min                  |
| Strict write rate limiting | `express-rate-limit` — 20 req / 15 min (POST/PUT/DELETE) |
| NoSQL injection prevention | `express-mongo-sanitize`                                 |
| HTTP Parameter Pollution   | `hpp`                                                    |
| Body size cap              | `express.json({ limit: '10kb' })`                        |
| Vulnerability audit        | `npm audit` — zero high-severity issues                  |

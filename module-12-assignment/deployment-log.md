# Deployment Log — Books API

**Date:** 2026-03-24  
**Environment:** macOS (local), Node.js + Express + MongoDB  
**Project:** `module-12-assignment`

---

## 1. Test Suite — All 5 Tests Passing

```
npm test

> module-12-assignment@1.0.0 test
> jest --detectOpenHandles

 PASS  tests/book.test.js
  Books API
    ✓ GET /api/books → 200 (95 ms)
    ✓ POST /api/books valid → 201 (45 ms)
    ✓ POST invalid → 400 (23 ms)
    ✓ GET non-existent ID → 404 (15 ms)
    ✓ DELETE → 204 (31 ms)

Test Suites: 1 passed, 1 total
Tests:       5 passed, 5 total
Snapshots:   0 total
Time:        1.388 s, estimated 2 s
```

---

## 2. Server Start — Production Mode

```
NODE_ENV=production node server.js

[dotenv] injecting env (3) from .env
Server running on http://localhost:3000
MongoDB Connected: 127.0.0.1
```

---

## 3. Endpoint Verification via curl

### GET /api/books — 200 OK

```bash
curl -s http://localhost:3000/api/books
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "69c226252bd110971ba88947",
      "title": "1984",
      "author": "George Orwell",
      "year": 1949,
      "genre": "Fiction",
      "pages": 328,
      "price": 13.5,
      "inStock": true
    },
    {
      "_id": "69c226252bd110971ba88946",
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "year": 1925,
      "genre": "Fiction",
      "pages": 218,
      "price": 11.99,
      "inStock": true
    }
  ],
  "total": 10,
  "page": 1,
  "pages": 1
}
```

---

### POST /api/books — 201 Created (valid body)

```bash
curl -s -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{"title":"The Pragmatic Programmer","author":"Andrew Hunt","year":1999,"genre":"Technology","pages":352,"price":35}'
```

**Response:**

```json
{
  "success": true,
  "data": {
    "title": "The Pragmatic Programmer",
    "author": "Andrew Hunt",
    "year": 1999,
    "genre": "Technology",
    "pages": 352,
    "price": 35,
    "inStock": true,
    "_id": "69c258e4c3a3f2cde37e58b9"
  }
}
```

---

### POST /api/books — 400 Bad Request (missing fields)

```bash
curl -s -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{"title":"No Author"}'
```

**Response:**

```json
{
  "success": false,
  "message": "Title and author are required."
}
```

---

### GET /api/books/:id — 200 OK (existing book)

```bash
curl -s http://localhost:3000/api/books/69c226252bd110971ba88947
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "69c226252bd110971ba88947",
    "title": "1984",
    "author": "George Orwell",
    "year": 1949,
    "genre": "Fiction",
    "pages": 328,
    "price": 13.5,
    "inStock": true
  }
}
```

---

### GET /api/books/:id — 404 Not Found (non-existent ID)

```bash
curl -s http://localhost:3000/api/books/507f1f77bcf86cd799439011
```

**Response:**

```json
{
  "success": false,
  "message": "Book not found."
}
```

---

### PATCH /api/books/:id — 200 OK (update book)

```bash
curl -s -X PATCH http://localhost:3000/api/books/69c25adac3a3f2cde37e58c5 \
  -H "Content-Type: application/json" \
  -d '{"title":"Clean Code","author":"Robert C. Martin","year":2008,"genre":"Technology","pages":431,"price":45}'
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "69c25adac3a3f2cde37e58c5",
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "year": 2008,
    "genre": "Technology",
    "pages": 431,
    "price": 45,
    "inStock": true
  }
}
```

---

### DELETE /api/books/:id — 204 No Content

```bash
curl -s -X DELETE http://localhost:3000/api/books/69c25adac3a3f2cde37e58c5 \
  -w "\nHTTP Status: %{http_code}\n"
```

**Response:**

```
HTTP Status: 204
```

---

## 4. Security Audit

```
npm audit

found 0 vulnerabilities
```

---

## 5. Security Hardening Summary

| Measure                       | Implementation                                 |
| ----------------------------- | ---------------------------------------------- |
| Secure HTTP headers           | `helmet()`                                     |
| CORS origin restriction       | `cors({ origin: 'http://localhost:3000' })`    |
| General rate limiting         | `express-rate-limit` — 100 requests / 15 min   |
| Strict rate limiting (writes) | `express-rate-limit` — 20 requests / 15 min    |
| NoSQL injection protection    | Custom inline sanitizer (Express 5 compatible) |
| HTTP Parameter Pollution      | `hpp()`                                        |
| Request body size cap         | `express.json({ limit: '10kb' })`              |
| Dependency vulnerabilities    | `npm audit` — 0 vulnerabilities                |

---

## 6. Submission Checklist

- [x] `helmet`, `cors`, and `rate-limit` applied correctly
- [x] `app.js` and `server.js` separated
- [x] All 5 Jest/Supertest tests pass with `npm test`
- [x] `README.md` documents all endpoints with request/response examples
- [x] `ecosystem.config.js` created for PM2 with cluster mode
- [x] `nginx.conf` included
- [x] `npm audit` shows zero high-severity vulnerabilities

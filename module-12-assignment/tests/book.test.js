const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");

const TEST_DB =
  process.env.TEST_MONGO_URI || "mongodb://127.0.0.1:27017/booksdb_test";

beforeAll(async () => {
  await mongoose.connect(TEST_DB);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("Books API", () => {
  it("GET /api/books → 200", async () => {
    const res = await request(app).get("/api/books");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("POST /api/books valid → 201", async () => {
    const res = await request(app).post("/api/books").send({
      title: "Test Book",
      author: "Test Author",
      year: 2020,
      genre: "Fiction",
      pages: 200,
      price: 10,
    });

    expect(res.statusCode).toBe(201);
  });

  it("POST invalid → 400", async () => {
    const res = await request(app).post("/api/books").send({ title: "Bad" });

    expect(res.statusCode).toBe(400);
  });

  it("GET non-existent ID → 404", async () => {
    const res = await request(app).get("/api/books/507f1f77bcf86cd799439011");

    expect(res.statusCode).toBe(404);
  });

  it("DELETE → 204", async () => {
    const create = await request(app).post("/api/books").send({
      title: "Delete Me",
      author: "Test",
      year: 2020,
      genre: "Fiction",
      pages: 100,
      price: 10,
    });

    const id = create.body.data._id;

    const res = await request(app).delete(`/api/books/${id}`);
    expect(res.statusCode).toBe(204);
  });
});

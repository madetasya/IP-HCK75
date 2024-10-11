const {
  beforeAll,
  afterAll,
  expect,
  describe,
  test,
} = require("@jest/globals");
const { User, sequelize } = require("../models");
const request = require("supertest");
const app = require("../app");
const { restart } = require("nodemon");
const { hashing } = require("../helpers/bcrypt");
const { INTEGER } = require("sequelize");

beforeAll(async () => {
  try {
    await User.destroy({
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
    const data = require("../data/users.json").map((e) => {
      e.password = hashing(e.password);
      e.createdAt = e.updatedAt = new Date();
      return e;
    });

    await sequelize.queryInterface.bulkInsert("Users", data, {});
  } catch (error) {
    console.log(error, "beforeALl");
  }
});

test("POST/login succes", async () => {
  const res = await request(app).post("/login").send({
    email: "piring@gmail.com",
    password: "c3l4n@",
  });
  console.log(res.status, res.body);
  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty([]);
});

describe("POST /login failed", () => {
  test("Email/Password Invalid", async () => {
    const res = await request(app).post("/login").send({
      email: "piring@gmail.com",
      password: "c3l4n",
    });
    console.log(res.status, res.body);
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message", "Invalid email/password");
  });

  test("Email/Password Invalid", async () => {
    const res = await request(app).post("/login").send({
      email: "",
      password: "c3l4n@",
    });
    console.log(res.status, res.body);
    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("message", "Email is required");
  });

  test("Email/Password Invalid", async () => {
    const res = await request(app).post("/login").send({
      email: "piring@gmail.com",
      password: "",
    });
    console.log(res.status, res.body);
    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("message", "internal server error");
  });
});

test("POST/register", async () => {
  const res = await request(app).post("/register").send({
    userName: "IndahKatsuri",
    email: [],
    password: "k@s7uR1",
    role: "Admin",
  });
  console.log(res.status, res.body);
  expect(res.status).toBe(201);
  expect(res.body).toHaveProperty("email", expect.any(String));
  expect(res.body).toHaveProperty("id", expect.any(Number));
});

describe("Register failed", () => {
  test("Email/Password Invalid", async () => {
    const res = await request(app).post("/register").send({
      email: "",
      password: "kkkkk",
    });
    console.log(res.status, res.body);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Username is required");
  });

  test("Email/Password Invalid", async () => {
    const res = await request(app).post("/register").send({
      email: "fdumbar0@biblegatewa.com",
    });
    console.log(res.status, res.body);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Username is required");
  });
});

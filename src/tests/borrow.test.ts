import request from "supertest";
import { Application } from "express";
import { App } from "../app";
import { after } from "node:test";

let app: Application;
let server: any;

beforeAll(() => {
    app = new App().app;
    server = app.listen(3000);
});

afterAll((done) => {
    server.close(done);
});

describe("Borrow Routes", () => {
  test("POST /borrow/borrowBook should borrow a book", async () => {
    const response = await request(app).post("/borrow/borrowBook/2/1");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Book borrowed successfully");
  });

  test("POST /borrow/returnBook should return a book", async () => {
    const response = await request(app)
        .post("/borrow/returnBook/2/1")

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Book returned successfully");
  });
});

afterAll(() => {
    app.disable('trust proxy');
    });

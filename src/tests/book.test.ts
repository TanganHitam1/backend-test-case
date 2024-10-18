import request from "supertest";
import { Application } from "express";
import { App } from "../app";

let app: Application;
let server: any;

beforeAll(() => {
    app = new App().app;
    server = app.listen(3002);
});

afterAll((done) => {
    server.close(done);
});

describe("Book Routes", () => {
    test("GET /books should return all books", async () => {
        const response = await request(app).get("/books");

        expect(response.status).toBe(200);
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    code: expect.any(String),
                    title: expect.any(String),
                    author: expect.any(String),
                    stock: expect.any(Number),
                })
            ])
        );
    }
    );
});

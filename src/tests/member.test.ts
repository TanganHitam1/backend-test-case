import request from "supertest";
import { Application } from "express";
import { App } from "../app";
import { after } from "node:test";

let app: Application;
let server: any;

beforeAll(() => {
    app = new App().app;
    server = app.listen(3001);
});

afterAll((done) => {
    server.close(done);
});

describe("Member Routes", () => {
    test("GET /members should return all members", async () => {
        const response = await request(app).get("/members");

        expect(response.status).toBe(200);
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    code: expect.any(String),
                    name: expect.any(String),
                    isPenalized: expect.any(Boolean),
                    penalty: expect.any(Number),
                    borrowedBooks: expect.any(Array)
                })
            ])
        );
    });
});
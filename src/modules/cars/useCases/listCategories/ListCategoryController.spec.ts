import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuid } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;
describe("Create Category Controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();
        const id = uuid();
        const passwordHash = await hash("admin", 8);
        await connection.query(`
            INSERT INTO USERS(id , name , email , password , "isAdmin" , driver_license , created_at ) 
            VALUES('${id}' , 'admin' , 'admin@rentx.com.br' , '${passwordHash}' , true , 'XXXXXX' , 'now()' )
        `);
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close;
    });
    it("Should be able to list all categories", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@rentx.com.br",
            password: "admin",
        });
        const { token } = responseToken.body;
        await request(app)
            .post("/categories")
            .send({
                name: "Category supertest",
                description: "Category Supertest",
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        const response = await request(app).get("/categories");

        console.log(response);

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0]).toHaveProperty("id");
        expect(response.body[0].name).toEqual("Category supertest");
    });
});

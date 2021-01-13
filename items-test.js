process.env.NODE_ENV = "test";
const request = require('supertest');
const app = require('./app');
let items = require('./fakeDb');

let popcorn = {name: "Popcorn" };

beforeEach(function() {
    items.push(popcorn);
});

afterEach(function() {
    items.length = 0;
});

describe("GET /items", function(){
    test("Gets a list of items", async function () {
        const resp = await request(app).get('/items');
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({items: [popcorn]});
    });
});

describe("Get /items/:name", function() {
    test("Get a single item", async function(){
        const resp = await request(app).get(`/items/${popcorn.name}`)
        expect(resp.statusCode).toBe(200);

        expect(resp.body).toEqual({item: popcorn});
    });
});

describe("POST /items", function(){
    test("Create a new item", async function(){
        const resp = await request(app)
        .post('/items')
        .send({
            name: "Chips"
        });
        expect(resp.statusCode).toBe(201);
        expect(resp.body).toEqual({
            item: { name: "Chips"}
        });
    });
});

describe("PATCH /items/:name", function () {
    test("Updates a single cat", async function(){
        const resp = await request(app)
        .patch(`/items/${popcorn.name}`)
        .send({
            name: "Dogfood"
        });
        expect(resp.body).toEqual({
            item: { name: "Dogfood"}
        });
    });
});

describe("DELETE /items/:name", function() {
    test("Delete a single cat", async function(){
        const resp = await request(app).delete(`/items/${popcorn.name}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual( {message: "Deleted"});
    });
});






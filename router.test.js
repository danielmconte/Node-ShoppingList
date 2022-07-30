process.env.NODE_ENV = "test";
const request = require('supertest');
const app = require('./app');
let boats = require('./fakeDb');


describe("GET /boat-slips", function(){
    test("Gets a list of boat slips", async function () {
        const resp = await request(app).get('/boat-slips');
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({boats});
    });
});


describe("POST /boat-slips", function(){
    test("Dock a new boat", async function(){
        const resp = await request(app)
        .post('/boat-slips')
        .send({
            vesselName: "Sea Chips"
        });
        expect(resp.statusCode).toBe(200);
        console.log(resp.body);
        expect(resp.body).toEqual({ slipNumber: 1 });
        expect(boats[0].vesselName).toEqual("Sea Chips");
        expect(boats[0].vacant).toEqual(false);

    });
});

describe("PUT /:slip/vacate", function () {
    test("Vacate slip number", async function(){
        const resp = await request(app)
        .put('/boat-slips/1/vacate')
        expect(resp.statusCode).toBe(204);
        expect(boats[0].vacant).toEqual(true);
    });
});








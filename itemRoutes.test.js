const request = require("supertest");

const app = require("./app");
let db = require("./fakeDb");

let popsicle = { name: "popsicle", price: 1.45 };

beforeEach(function () {
  db.items.push(popsicle);
});

afterEach(function () {
  while (db.items.length > 0) {
    db.items.pop();
  }
});

/** GET /items/ - returns `{items: [{name: popsicle...}...]}` */
describe("GET /items/", function () {
  it("Gets list of items", async function () {
    const resp = await request(app).get("/items/");

    expect(resp.body).toEqual({
      items: [
        { name: "popsicle", price: 1.45 }
      ]
    });
  });
});

describe("POST /items/", function () {
  it("Adds item to list of items", async function () {

    const resp = await request(app)
      .post("/items/")
      .send({ name: "cheerios", price: 3.40 });

    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({ added: { name: "cheerios", price: 3.40 } });
    expect(db.items).toContain({ name: "cheerios", price: 3.40 });
  });
});



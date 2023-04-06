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

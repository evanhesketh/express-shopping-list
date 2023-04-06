const request = require("supertest");

const app = require("./app");
let db = require("./fakeDb");



beforeEach(function () {
  let popsicle = { name: "popsicle", price: 1.45 };
  db.items.push(popsicle);
});

afterEach(function () {
  console.log("after each ran");
  console.log("db.items before", db.items)
  while (db.items.length > 0){
    db.items.pop();
  }
  console.log("db.items after", db.items)
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

/** POST /items/ - returns `{added:{name: popsicle, ...}}` */
describe("POST /items/", function () {
  it("Adds item to list of items", async function () {

    const resp = await request(app)
      .post("/items/")
      .send({ name: "cheerios", price: 3.40 });

    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({ added: { name: "cheerios", price: 3.40 } });
    expect(db.items).toContainEqual({ name: "cheerios", price: 3.40 });
  });
});

/** GET /items/ - returns `{name: popsicle, ...}` */
describe("GET /items/:name", function () {
  it("Gets an item", async function () {
    const resp = await request(app).get("/items/popsicle");
    expect(resp.body).toEqual(
      { name: "popsicle", price: 1.45 });
  });
});

describe("PATCH /items/:name", function () {
  it("Updates an items name", async function () {
    const resp = await request(app)
      .patch("/items/popsicle")
      .send({ name: "new popsicle" });
    expect(resp.body).toEqual(
      { updated: {name: "new popsicle", price: 1.45} });
  });
  it("Updates an items price", async function () {
    const resp = await request(app)
      .patch("/items/popsicle")
      .send({ price: 1.01 });
    expect(resp.body).toEqual(
      { updated: {name: "popsicle", price: 1.01} });
  });
});

describe("DELETE /items/:name", function () {
  it("Deletes an item", async function () {
    console.log("items", db.items);
    const resp = await request(app).delete("/items/popsicle");
    expect(resp.body).toEqual(
      { message: "Deleted" });
    expect(db.items.length).toEqual(0);
  });
  it("Throws an error if item does not exist", async function (){
    const resp = await request(app).delete("/items/taco");
    expect(resp.statusCode).toEqual(404);
  })
});






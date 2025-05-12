import supertest from "supertest";
import { ContactTest, UserTest } from "./test-util";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";
import { log } from "winston";


describe("POST /api/contacts", () => {

  beforeEach(async () => {
    await UserTest.create();
  });

  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should create new contact", async() => {
    const response = await supertest(web)
      .post("/api/contacts")
      .set("X-API-TOKEN", "test")
      .send({
        first_name: "Adam Bas",
        last_name: "Chris",
        email: "adambchris@mail.com",
        phone: "1234567890"
      });

      logger.debug(response.body);
      expect(response.status).toBe(200);
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.first_name).toBe("Adam Bas");
      expect(response.body.data.last_name).toBe("Chris");
      expect(response.body.data.email).toBe("adambchris@mail.com");
      expect(response.body.data.phone).toBe("1234567890");
  });

  it("should reject create new contact if data is invalid", async() => {
    const response = await supertest(web)
      .post("/api/contacts")
      .set("X-API-TOKEN", "test")
      .send({
        first_name: "",
        last_name: "",
        email: "adam",
        phone: "1234567890123456789012345678901234567890"
      });

      logger.debug(response.body);
      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
  });

});

describe("GET /api/contacts:contactId", () => {

  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  });

  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to get contact", async() => {
    const contact = await ContactTest.get();
    
    const response = await supertest(web)
      .get(`/api/contacts/${contact.id}`)
      .set("X-API-TOKEN", "test")

      logger.debug(response.body);
      expect(response.status).toBe(200);
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.first_name).toBe(contact.first_name);
      expect(response.body.data.last_name).toBe(contact.last_name);
      expect(response.body.data.email).toBe(contact.email);
      expect(response.body.data.phone).toBe(contact.phone);
  });

  it("should reject to get contact if contact is not found", async() => {
    const contact = await ContactTest.get();
    
    const response = await supertest(web)
      .get(`/api/contacts/${contact.id + 1}`)
      .set("X-API-TOKEN", "test")

      logger.debug(response.body);
      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
  });

});

describe("PUT /api/contacts:contactId", () => {

  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  });

  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to update contact", async() => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .put(`/api/contacts/${contact.id}`)
      .set("X-API-TOKEN", "test")
      .send({
        first_name: "Adam Bas",
        last_name: "Chris",
        email: "adambchris@mail.com",
        phone: "1234567890"
      });

      logger.debug(response.body);
      expect(response.status).toBe(200);
      expect(response.body.data.id).toBe(contact.id);
      expect(response.body.data.first_name).toBe("Adam Bas");
      expect(response.body.data.last_name).toBe("Chris");
      expect(response.body.data.email).toBe("adambchris@mail.com");
      expect(response.body.data.phone).toBe("1234567890");
  });

  it("should reject to update contact if request is invalid", async() => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .put(`/api/contacts/${contact.id}`)
      .set("X-API-TOKEN", "test")
      .send({
        first_name: "",
        last_name: "",
        email: "adambchris",
        phone: ""
      });

      logger.debug(response.body);
      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
  });

});

describe("DELETE /api/contacts/:contactId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  });

  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to remove contact", async() => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .delete(`/api/contacts/${contact.id}`)
      .set("X-API-TOKEN", "test");
    
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data).toBe("OK");
  });

  it("should reject to remove contact", async() => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .delete(`/api/contacts/${contact.id + 1}`)
      .set("X-API-TOKEN", "test");
    
    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
});

describe("GET /api/contacts", () => {

  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  });

  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to search contact", async() => {
    const response = await supertest(web)
      .get("/api/contacts")
      .set("X-API-TOKEN", "test");
    
      logger.debug(response.body);
      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(1);
      expect(response.body.paging.current_page).toBe(1);
      expect(response.body.paging.page_size).toBe(10);
      expect(response.body.paging.total_results).toBe(1);
      expect(response.body.paging.total_pages).toBe(1);
  });

  it("should be able to search contact using name", async() => {
    const response = await supertest(web)
      .get("/api/contacts")
      .set("X-API-TOKEN", "test")
      .query({
        name: "es"
      });
    
      logger.debug(response.body);
      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(1);
      expect(response.body.paging.current_page).toBe(1);
      expect(response.body.paging.page_size).toBe(10);
      expect(response.body.paging.total_results).toBe(1);
      expect(response.body.paging.total_pages).toBe(1);
  });

  it("should be able to search contact using email", async() => {
    const response = await supertest(web)
      .get("/api/contacts")
      .set("X-API-TOKEN", "test")
      .query({
        email: ".com"
      });
    
      logger.debug(response.body);
      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(1);
      expect(response.body.paging.current_page).toBe(1);
      expect(response.body.paging.page_size).toBe(10);
      expect(response.body.paging.total_results).toBe(1);
      expect(response.body.paging.total_pages).toBe(1);
  });

  it("should be able to search contact using phone", async() => {
    const response = await supertest(web)
      .get("/api/contacts")
      .set("X-API-TOKEN", "test")
      .query({
        phone: "456"
      });
    
      logger.debug(response.body);
      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(1);
      expect(response.body.paging.current_page).toBe(1);
      expect(response.body.paging.page_size).toBe(10);
      expect(response.body.paging.total_results).toBe(1);
      expect(response.body.paging.total_pages).toBe(1);
  });

  it("should be able to search contact no result", async() => {
    const response = await supertest(web)
      .get("/api/contacts")
      .set("X-API-TOKEN", "test")
      .query({
        name: "wrong"
      });
    
      logger.debug(response.body);
      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(0);
      expect(response.body.paging.current_page).toBe(1);
      expect(response.body.paging.page_size).toBe(10);
      expect(response.body.paging.total_results).toBe(0);
      expect(response.body.paging.total_pages).toBe(0);
  });

  it("should be able to search contact with paging", async() => {
    const response = await supertest(web)
      .get("/api/contacts")
      .set("X-API-TOKEN", "test")
      .query({
        page: 2,
        size: 1
      });
    
      logger.debug(response.body);
      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(0);
      expect(response.body.paging.current_page).toBe(2);
      expect(response.body.paging.page_size).toBe(1);
      expect(response.body.paging.total_results).toBe(1);
      expect(response.body.paging.total_pages).toBe(1);
  });
});

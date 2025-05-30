import { prismaClient } from "../src/application/database";
import bcrypt from "bcrypt";
import { User } from "../src/generated/prisma";


export class UserTest {
  
  static async delete() {
    await prismaClient.user.deleteMany({
      where: {
        username: "test"
      }
    });
  }

  static async create() {
    await prismaClient.user.create({
      data: {
        username: "test",
        password: await bcrypt.hash("test", 10),
        name: "test",
        token: "test"
      }
    });
  }

  static async get(): Promise<User> {
    const user = await prismaClient.user.findUnique({
      where: {
        username: "test"
      }
    });

    if (!user) {
      throw new Error("User is not found");
    }

    return user;
  }

}

export class ContactTest {

  static async deleteAll() {
    await prismaClient.contact.deleteMany({
      where: {
        username: "test"
      }
    });
  }

  static async create() {
    await prismaClient.contact.create({
      data: {
        first_name: "test",
        last_name: "test",
        email: "test@mail.com",
        phone: "1234567890",
        username: "test"
      }
    });
  }
  
  static async get() {
    const contact = await prismaClient.contact.findFirst({
      where: {
        username: "test"
      }
    });

    if (!contact) {
      throw new Error("Contact is not found");
    }

    return contact;
  }

}

export class AddressTest {

  static async deleteAll() {
    await prismaClient.address.deleteMany({
      where: {
        contact: {
          username: "test"
        }
      }
    });
  }

  static async create() {
    const contact = await ContactTest.get();
    await prismaClient.address.create({
      data: {
        contact_id: contact.id,
        street: "test street",
        city: "test city",
        province: "test province",
        country: "test country",
        postal_code: "123456"
      }
    });
  }

  static async get() {
    const address = await prismaClient.address.findFirst({
      where: {
        contact: {
          username: "test"
        }
      }
    });

    if (!address) {
      throw new Error("Address is not found");
    }

    return address;
  }

}

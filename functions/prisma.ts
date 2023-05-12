import { Prisma, PrismaClient } from "@prisma/client";
import { execSync } from "child_process";

export function getPrisma(dbname: string = "guest_process") {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: `mysql://root:123456@localhost:3306/${dbname}`,
      },
    },
  });
  return prisma;
}

export async function createSchema(name: string) {
  await Prisma.sql`CREATE DATABASE ${Prisma.raw(name)}`;
}

export async function dropSchema(name: string) {
  await Prisma.sql`DROP DATABASE ${Prisma.raw(name)} CASCADE`;
}

export function useSchema(name: string = "guest_process") {
  let db_url = process.env.DATABASE_URL?.split("/");
  db_url?.pop();
  process.env.DATABASE_URL = db_url?.join("/") + "/" + name;
}

export async function createSystem(name: string) {
  await createSchema(name); // create database
  useSchema(name); // set DATABASE_URL to the new db

  execSync("npx prisma db push"); // configure tables in db

  const new_prisma = new PrismaClient({
    datasources: {
      db: {
        url: "mysql://root:123456@localhost:3306/" + name,
      },
    },
  });

  useSchema(); //reset DATABASE_URL to default value in .env

  return new_prisma;
}

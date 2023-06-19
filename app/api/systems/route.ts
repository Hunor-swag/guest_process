import { query } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
<<<<<<< HEAD
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { hotel_name, person_name, contact_email, contact_phone, password } =
=======
import { query } from "../../../lib/db";

export async function GET(req: NextRequest) {
  const queryString = "SELECT * FROM hotel_systems";
  const results = (await query("control_panel", queryString, [])) as [];

  let json_response = {
    status: "success",
    results: results.length,
    data: results,
  };

  return new NextResponse(JSON.stringify(json_response), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req: NextRequest) {
  try {
<<<<<<< HEAD
    const queryString =
      "INSERT INTO hotel_systems (name, contact_email, contact_phone) VALUES (?, ?, ?)";

    const { name, contact_email, contact_phone } = await req.json();

    const results = (await query("control_panel", queryString, [
      name,
      contact_email,
      contact_phone,
    ])) as [];

    return new NextResponse(JSON.stringify(results), {
      status: 201,
=======
    const { hotel_name, person_name, email, phone_number, password } =
>>>>>>> 7bf0eb26a9886289a7cf69331781400627656bd0
      await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(
      hotel_name,
      person_name,
      contact_email,
      contact_phone,
      hashedPassword
    );

    const createDatabaseQueryString = `
      CREATE DATABASE IF NOT EXISTS ${hotel_name};
    `;

    const createTableQueryString = `
      CREATE TABLE IF NOT EXISTS users (
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone_number VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
      );
    `;

    const insertQueryString = `
      INSERT INTO users (name, email, phone_number, password)
      VALUES (?, ?, ?, ?);
    `;

    await query("control_panel", createDatabaseQueryString, []);

    await query(hotel_name, createTableQueryString, []);

    const results = await query(hotel_name, insertQueryString, [
      person_name,
      contact_email,
      contact_phone,
      hashedPassword,
    ]);

    return new NextResponse(JSON.stringify(results), {
      status: 200,
>>>>>>> 340fe035944751a5ef2ef93a38377c3c98919af0
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      let error_response = {
        status: "fail",
        message: "Database already exists, please give a different name",
      };
      return new NextResponse(JSON.stringify(error_response), {
        status: 409,
        headers: { "Content-Type": "application/json" },
      });
    }

    let error_response = {
      status: "error",
      message: error.message,
    };
    console.log(error_response);
    return new NextResponse(JSON.stringify(error_response), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

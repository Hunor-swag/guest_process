import { query } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { hotel_name, person_name, email, phone_number, password } =
      await req.json();

    const queryString = `CREATE SCHEMA IF NOT EXISTS ?;
      CREATE TABLE IF NOT EXISTS ?.users (
          id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
          email VARCHAR(255) NOT NULL,
          phone_number VARCHAR(255) NOT NULL,
          password VARCHAR(255) NOT NULL,
      INSERT INTO ?.users (name, email, phone_number, password) VALUES (?, ?, ?, ?)
        `;

    const results = (await query("control_panel", queryString, [
      hotel_name,
      hotel_name,
      hotel_name,
      person_name,
      email,
      phone_number,
      password,
    ])) as [];

    return new NextResponse(JSON.stringify(results), {
      status: 200,
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
    return new NextResponse(JSON.stringify(error_response), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

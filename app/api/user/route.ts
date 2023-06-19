import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { hotel_name, email } = await req.json();

    const queryString = `
      SELECT * FROM ${hotel_name}.users WHERE email = ?;
    `;

    const results = await query(hotel_name, queryString, [email]);
    const user = results[0];

    if (!user) {
      return new NextResponse(JSON.stringify({ message: "No user found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new NextResponse(JSON.stringify(user), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new NextResponse(JSON.stringify(err), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

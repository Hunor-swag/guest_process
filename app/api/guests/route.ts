import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../lib/db";

export async function GET(req: NextRequest) {
  const queryString = "SELECT * FROM guests";

  const results = (await query("control_panel", queryString, [])) as [];

  let json_response = {
    status: "success",
    results: results.length,
    data: results,
  };

  return new NextResponse(JSON.stringify(json_response), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req: NextRequest) {
  const queryString =
    "INSERT INTO guests (name, email, address, id_number) VALUES (?, ?, ?, ?)";

  const { name, email, address, id_number } = await req.json();

  const results = (await query("control_panel", queryString, [
    name,
    email,
    address,
    id_number,
  ])) as [];
}

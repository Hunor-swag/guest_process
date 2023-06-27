import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../lib/db";

export async function GET(req: NextRequest) {
  const subdomain = req.headers.get("host")?.split(".")[0];

  if (!subdomain) {
    return new NextResponse("No host", {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const db_name = subdomain?.replaceAll("-", "_");

  console.log(subdomain);

  const queryString = "SELECT * FROM guests";
  const results = (await query(db_name, queryString, [])) as [];

  let json_response = {
    status: "success",
    results: results.length,
    data: results,
  };

  return new NextResponse(JSON.stringify(json_response), {
    status: 201,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const queryString =
      "INSERT INTO guests (name, email, address, id_number) VALUES (?, ?, ?, ?)";

    const { name, email, address, id_number } = await req.json();

    const results = (await query("control_panel", queryString, [
      name,
      email,
      address,
      id_number,
    ])) as [];

    return new NextResponse(JSON.stringify(results), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

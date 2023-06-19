import { NextRequest, NextResponse } from "next/server";
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

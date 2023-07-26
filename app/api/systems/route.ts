import { query } from "../../../lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log(`GET ${req.headers.get("host")?.split(".")[0]}/api/systems`);
  try {
    const queryString = `
      SELECT * FROM hotel_systems ORDER BY name ASC;
    `;

    const results = await query("control_panel", queryString, []);

    return new NextResponse(JSON.stringify(results), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
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

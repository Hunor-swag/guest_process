import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../lib/db";

export async function GET(req: NextRequest) {
  try {
    const subdomain = req.headers.get("host")?.split(".")[0];

    if (!subdomain) {
      return new NextResponse("No host", {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const db_name = subdomain?.replace(/-/g, "_");

    // console.log(db_name);

    const queryString = "SELECT * FROM guests WHERE hidden='0'";
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
  } catch (error) {
    console.log("Error: ", error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const subdomain = req.headers.get("host")?.split(".")[0];

    if (!subdomain) {
      return new NextResponse("No host", {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const db_name = subdomain?.replace(/-/g, "_");

    const queryString =
      "INSERT INTO guests (name, email, country, postal_code, city, street, number) VALUES (?, ?, ?, ?)";

    const { name, email, country, postal_code, city, street, number } =
      await req.json();

    const results = (await query(db_name, queryString, [
      name,
      email,
      country,
      postal_code,
      city,
      street,
      number,
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

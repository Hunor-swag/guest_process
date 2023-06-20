import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  let json_response = {
    status: "success",
  };
  return NextResponse.json(json_response);
}

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();

    let json_response = {
      status: "success",
    };

    return new NextResponse(JSON.stringify(json_response), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      let error_response = {
        status: "fail",
        message: "User already exists",
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

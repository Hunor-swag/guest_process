import { getPrisma } from "@/functions/prisma";
import { NextRequest, NextResponse } from "next/server";

const prisma = getPrisma("guest_process");

export async function GET() {
  const users = await prisma.user.findMany();

  let json_response = {
    status: "success",
    results: users.length,
    users,
  };
  return NextResponse.json(json_response);
}

export async function POST(req: NextRequest) {
  console.log(req);
  try {
    const json = await req.json();

    const user = await prisma.user.create({
      data: json,
    });

    let json_response = {
      status: "success",
      data: {
        user,
      },
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

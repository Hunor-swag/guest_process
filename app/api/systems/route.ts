import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const prisma = new PrismaClient();

    const json = await req.json();

    useSchema("guest_process");

    const system = await prisma.system.create({
      data: json,
    });

    const new_prisma = await createSystem(json.name);

    await new_prisma.user.create({
      data: {
        email: json.contact_email,
        name: json.name,
      },
    });

    let json_response = {
      status: "success",
      data: {
        system,
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

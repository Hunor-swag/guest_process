import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../../lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const queryString = `SELECT * FROM guests WHERE id=?`;

  const result = await query("control_panel", queryString, [params.id]);

  return new NextResponse(JSON.stringify(result), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { name, email, address, id_number } = await req.json();

    const queryString = `UPDATE guests SET name='${name}', email='${email}', address='${address}', id_number='${id_number}' WHERE id=${params.id}`;

    const result = await query("control_panel", queryString, []);

    return new NextResponse(JSON.stringify(result), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const queryString = `DELETE FROM guests WHERE id=${params.id}`;

    const result = await query("control_panel", queryString, []);

    return new NextResponse(JSON.stringify(result), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

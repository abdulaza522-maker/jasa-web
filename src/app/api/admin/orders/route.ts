import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

async function authed() {
  return (await cookies()).get("jw_admin")?.value === process.env.ADMIN_PASSWORD;
}

export async function GET() {
  if (!(await authed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const orders = await prisma.order.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ orders });
}

export async function DELETE(req: Request) {
  if (!(await authed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = (await req.json().catch(() => ({}))) as { id?: string };
  if (!id) return NextResponse.json({ error: "id wajib." }, { status: 400 });
  await prisma.order.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}

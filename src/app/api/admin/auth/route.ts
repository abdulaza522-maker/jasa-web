import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const COOKIE = "jw_admin";

export async function POST(req: Request) {
  const { password } = (await req.json().catch(() => ({}))) as { password?: string };
  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Password salah." }, { status: 401 });
  }
  (await cookies()).set(COOKIE, process.env.ADMIN_PASSWORD, {
    httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7,
  });
  return NextResponse.json({ ok: true });
}

export async function GET() {
  const authed = (await cookies()).get(COOKIE)?.value === process.env.ADMIN_PASSWORD;
  return NextResponse.json({ authed });
}

export async function DELETE() {
  (await cookies()).delete(COOKIE);
  return NextResponse.json({ ok: true });
}

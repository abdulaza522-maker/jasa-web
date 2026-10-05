import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const SERVICES = ["Landing Page", "Company Profile", "Toko Online", "Web App Custom"];

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Body harus JSON valid." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const contact = String(body.contact ?? "").trim();
  const service = String(body.service ?? "").trim();
  const budget = String(body.budget ?? "").trim();
  const brief = String(body.brief ?? "").trim();

  if (name.length < 2) return NextResponse.json({ error: "Nama minimal 2 karakter." }, { status: 400 });
  if (contact.length < 5) return NextResponse.json({ error: "Kontak (email/WA) wajib diisi." }, { status: 400 });
  if (!SERVICES.includes(service)) return NextResponse.json({ error: "Pilih jenis layanan yang valid." }, { status: 400 });
  if (brief.length < 10) return NextResponse.json({ error: "Ceritakan kebutuhanmu minimal 10 karakter." }, { status: 400 });

  const order = await prisma.order.create({
    data: { name, contact, service, budget: budget || null, brief },
  });
  return NextResponse.json({ ok: true, id: order.id }, { status: 201 });
}

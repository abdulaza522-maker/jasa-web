import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const orders = [
  {
    name: "Andi Pratama",
    contact: "andi@example.com",
    service: "Landing Page",
    budget: "Rp200.000",
    brief: "Landing page untuk produk kopi, ada hero, testimoni, dan form pemesanan.",
  },
  {
    name: "Sari Dewi",
    contact: "0812-3456-7890",
    service: "Toko Online",
    budget: "Rp500.000",
    brief: "Toko kain batik online, butuh katalog produk + checkout sederhana.",
  },
];

async function main() {
  console.log("Seeding orders...");
  for (const o of orders) {
    await prisma.order.create({ data: o });
  }
  console.log("Done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

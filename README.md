# JasaWebsite

Template website jualan **jasa pembuatan website** — Next.js + Prisma + SQLite.

## Fitur

- Landing page: hero, paket harga, proses, form pemesanan
- Form pemesanan → tersimpan ke database
- Admin panel (lihat & hapus pesanan), login pakai password
- Desain dark, mobile-friendly, tanpa framework CSS

## Cara jalankan

```bash
npm install
npm run db:push      # buat tabel database
npm run db:seed     # isi 2 contoh pesanan (opsional)
npm run dev         # buka http://localhost:3000
```

Admin: buka `/admin`, password ada di `.env` (default `changeme`).

## Ganti konten

- **Paket harga & proses**: edit `src/app/page.tsx`
- **Nama brand & teks hero**: edit `src/app/page.tsx`
- **Warna/tema**: edit `src/app/globals.css` bagian `:root`
- **Password admin**: ubah `ADMIN_PASSWORD` di `.env` (GANTI sebelum deploy!)

## Deploy ke Vercel

1. Push project ke GitHub
2. Import ke Vercel
3. Ganti `provider` SQLite → PostgreSQL di `prisma/schema.prisma` dan set `DATABASE_URL` di Vercel
4. Set `ADMIN_PASSWORD` di environment variables Vercel
5. Jalankan `prisma db push` (Vercel akan otomatis jalan saat build)

## Struktur

```
src/
  app/
    page.tsx              # landing page
    admin/page.tsx       # admin panel (login + lihat/hapus pesanan)
    api/
      order/route.ts         # POST form pemesanan
      admin/auth/route.ts    # login/logout admin
      admin/orders/route.ts  # GET/DELETE pesanan (butuh login)
  components/
    OrderForm.tsx        # form pemesanan (client component)
  lib/
    prisma.ts            # koneksi database
prisma/
  schema.prisma         # definisi tabel Order
  seed.mjs              # data contoh
```

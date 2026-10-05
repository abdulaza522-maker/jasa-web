import OrderForm from "@/components/OrderForm";

const services = [
  {
    title: "Landing Page",
    price: "Rp150.000",
    tag: "Biasa",
    items: ["1 halaman utama", "Mobile responsive", "SEO dasar", "Contact form"],
  },
  {
    title: "Company Profile",
    price: "Rp250.000",
    tag: "Premium",
    items: ["Tentang & layanan", "Portfolio / karya", "Tim & kontak", "Google Maps embed"],
  },
  {
    title: "Toko Online",
    price: "Rp400.000",
    tag: "Premium",
    items: ["Katalog produk", "Keranjang & checkout", "Integrasi pembayaran", "Notifikasi WhatsApp"],
  },
  {
    title: "Web App Custom",
    price: "Rp800.000",
    tag: "Pro",
    items: ["Fungsi custom", "Login & dashboard", "Database internal", "Integrasi API"],
  },
];

const steps = [
  ["Diskusi & Briefing", "Kami tanyakan kebutuhan, target, dan budget-mu lewat WhatsApp atau email."],
  ["Desain & Konsep", "Wireframe dan mockup disetujui dulu sebelum masuk development."],
  ["Development & Test", "Website dibangun, diuji di mobile dan desktop, lalu disiapkan untuk live."],
  ["Launch & Dukungan", "Website live. Dukungan 30 hari untuk perbaikan bug minor."],
];

export default function Home() {
  return (
    <>
      <header className="nav">
        <div className="nav-inner">
          <a href="/" className="brand">
            Jasa<span>Website</span>
          </a>
          <nav className="nav-links">
            <a href="#harga">Harga</a>
            <a href="#proses">Proses</a>
            <a href="#order">Order</a>
            <a href="/admin">Admin</a>
          </nav>
        </div>
      </header>

      <main className="wrap">
        <section className="hero">
          <h1>
            Website untuk <em>bisnismu</em>, jadi dalam hitungan hari.
          </h1>
          <p>
            Jasa pembuatan website cepat, mobile-friendly, dan rapi. Dari landing page sederhana
            sampai toko online lengkap — harga jelas, proses transparan.
          </p>
          <div className="hero-cta">
            <a href="#order" className="btn">
              Minta Penawaran
            </a>
            <a href="#harga" className="btn btn-ghost">
              Lihat Paket Harga
            </a>
          </div>
          <div className="badges">
            <span className="badge">Mobile-first</span>
            <span className="badge">SEO dasar</span>
            <span className="badge">Loading cepat</span>
            <span className="badge">Garansi 30 hari</span>
          </div>
        </section>

        <section className="block" id="harga">
          <h2>Paket Harga</h2>
          <p className="sub">Harga mulai, finalnya tergantung jumlah halaman dan fitur.</p>
          <div className="grid">
            {services.map((s) => (
              <article className="card" key={s.title}>
                <span className="tag">{s.tag}</span>
                <h3>{s.title}</h3>
                <p className="price">Mulai {s.price}</p>
                <ul>
                  {s.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
                <p style={{ marginTop: 18 }}>
                  <a href="#order" className="btn btn-ghost">
                    Pilih paket ini
                  </a>
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="block" id="proses">
          <h2>Proses Pengerjaan</h2>
          <p className="sub">Empat langkah, tanpa kejutan di tengah jalan.</p>
          <div className="steps">
            {steps.map(([title, desc]) => (
              <div className="step" key={title}>
                <div>
                  <b>{title}</b>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="block" id="order">
          <h2>Form Pemesanan</h2>
          <p className="sub">Isi form di bawah, kami balas maksimal 1×24 jam.</p>
          <OrderForm />
        </section>
      </main>

      <footer>
        <div className="wrap">
          <p>© {new Date().getFullYear()} JasaWebsite. Ganti nama, harga, dan kontak sesuai bisnismu.</p>
        </div>
      </footer>
    </>
  );
}
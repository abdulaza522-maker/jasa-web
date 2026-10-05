"use client";

import { useEffect, useState } from "react";

type Order = {
  id: string;
  name: string;
  contact: string;
  service: string;
  budget: string | null;
  brief: string;
  createdAt: string;
};

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);

  async function loadOrders() {
    const res = await fetch("/api/admin/orders");
    if (res.ok) {
      const data = await res.json();
      setOrders(data.orders);
    }
  }

  useEffect(() => {
    fetch("/api/admin/auth")
      .then((r) => r.json())
      .then((d) => setAuthed(d.authed));
  }, []);

  useEffect(() => {
    if (authed) loadOrders();
  }, [authed]);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setPassword("");
      setAuthed(true);
    } else {
      setErr("Password salah.");
    }
  }

  async function logout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setAuthed(false);
    setOrders([]);
  }

  async function remove(id: string) {
    await fetch("/api/admin/orders", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    loadOrders();
  }

  if (authed === null) return <main className="wrap" style={{ padding: 60 }}>Memuat…</main>;

  if (!authed) {
    return (
      <main className="wrap" style={{ padding: "60px 20px" }}>
        <h1 style={{ fontSize: "1.5rem" }}>Login Admin</h1>
        <form className="login-box" onSubmit={login} style={{ marginTop: 16 }}>
          <label>
            Password admin
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {err && <span className="form-err">{err}</span>}
          <button className="btn" type="submit">
            Masuk
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="wrap" style={{ padding: "40px 20px" }}>
      <div className="admin-bar">
        <h1 style={{ fontSize: "1.5rem", margin: 0 }}>Pesanan Masuk ({orders.length})</h1>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-ghost" onClick={loadOrders}>
            Refresh
          </button>
          <button className="btn btn-ghost" onClick={logout}>
            Keluar
          </button>
        </div>
      </div>
      {orders.length === 0 ? (
        <p style={{ color: "var(--muted)" }}>Belum ada pesanan.</p>
      ) : (
        <table className="orders">
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Nama</th>
              <th>Kontak</th>
              <th>Layanan</th>
              <th>Budget</th>
              <th>Kebutuhan</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>{new Date(o.createdAt).toLocaleString("id-ID")}</td>
                <td>{o.name}</td>
                <td>{o.contact}</td>
                <td>{o.service}</td>
                <td>{o.budget ?? "—"}</td>
                <td style={{ maxWidth: 320, whiteSpace: "pre-wrap" }}>{o.brief}</td>
                <td>
                  <button className="btn btn-ghost" onClick={() => remove(o.id)}>
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <p style={{ marginTop: 24 }}>
        <a href="/">← Kembali ke situs</a>
      </p>
    </main>
  );
}

"use client";

import { useState } from "react";

export default function OrderForm() {
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setBusy(true);
    setStatus("Mengirim...");
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = await res.json();
      setStatus(data.ok ? "Order diterima! Kami akan balas dalam 24 jam." : data.error || "Gagal mengirim.");
      if (data.ok) form.reset();
    } catch {
      setStatus("Gagal terhubung ke server.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <form className="order" onSubmit={onSubmit}>
        <label>
          Nama lengkap
          <input name="name" required minLength={2} placeholder="Nama kamu" />
        </label>
        <label>
          Email atau WhatsApp
          <input name="contact" required minLength={5} placeholder="email@contoh.com atau 08xx" />
        </label>
        <label>
          Pilih layanan
          <select name="service" required defaultValue="">
            <option value="" disabled>Pilih layanan</option>
            <option>Landing Page</option>
            <option>Company Profile</option>
            <option>Toko Online</option>
            <option>Web App Custom</option>
          </select>
        </label>
        <label>
          Budget (opsional)
          <input name="budget" placeholder="Contoh: Rp300.000" />
        </label>
        <label>
          Kebutuhan websitemu
          <textarea name="brief" required minLength={10} placeholder="Ceritakan target, fitur, dan referensi desain..." />
        </label>
        <button type="submit" className="btn" disabled={busy}>
          {busy ? "Mengirim..." : "Kirim Order"}
        </button>
      </form>
      {status && <p className={status.startsWith("Order diterima") ? "form-ok-inline" : "form-err"}>{status}</p>}
    </>
  );
}

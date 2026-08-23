"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChefHat, Clock, Flame, Leaf, Printer, Search, AlertTriangle, CheckCircle2, Droplets, BookOpen } from "lucide-react";
import jamuData from "@/data/jamu.json";
type JamuItem = (typeof jamuData)[number];

export default function ResepPage() {
  const [selectedJamu, setSelectedJamu] = useState<JamuItem | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Semua");

  const filtered = jamuData.filter((j) => {
    const ms = j.nama.toLowerCase().includes(search.toLowerCase()) || j.cara_pembuatan.toLowerCase().includes(search.toLowerCase());
    const mf = filter === "Semua" || j.kategori === filter;
    return ms && mf && j.tersedia;
  });

  const printRecipe = (jamu: JamuItem) => {
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(`<html><head><title>${jamu.nama}</title><style>body{font-family:Arial;max-width:600px;margin:0 auto;padding:20px}h1{color:#0891b2;border-bottom:2px solid #0891b2}h2{color:#7c3aed;margin-top:20px}.tag{background:#f0f4f8;color:#0891b2;padding:2px 8px;border-radius:12px;font-size:12px}.danger{background:#fff1f2;border-left:4px solid #e11d48;padding:10px;margin:10px 0}.warning{background:#fef9ef;border-left:4px solid #ea580c;padding:10px;margin:10px 0}.footer{margin-top:30px;font-size:11px;color:#999;border-top:1px solid #eee;padding-top:10px}</style></head><body><h1>🌿 ${jamu.nama}</h1><p><em>${jamu.nama_latin}</em> <span class="tag">${jamu.kategori}</span></p><h2>📋 Komposisi</h2><ul>${jamu.komposisi.map(k=>`<li>${k}</li>`).join("")}</ul><h2>👨‍🍳 Cara Pembuatan</h2><p>${jamu.cara_pembuatan}</p><h2>💊 Dosis</h2><p><strong>${jamu.dosis}</strong></p><h2>✅ Manfaat</h2><ul>${jamu.manfaat.map(m=>`<li>${m}</li>`).join("")}</ul><div class="danger"><strong>⚠️ Kontraindikasi:</strong> ${jamu.kontraindikasi.join(", ")}</div><div class="warning"><strong>Disclaimer:</strong> Bukan pengganti konsultasi dokter.</div><div class="footer">${jamu.sumber} · Pojok Herbal Pintar</div></body></html>`);
    w.document.close(); w.print();
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-nature">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-border text-text-secondary text-sm font-medium mb-4 shadow-sm"><ChefHat className="w-4 h-4 text-warm" /> Resep Digital</span>
          <h1 className="text-3xl md:text-5xl font-black text-text mb-4">Resep <span className="gradient-text-warm">Herbal Digital</span></h1>
          <p className="text-text-secondary max-w-xl mx-auto">Resep herbal lengkap dengan cara pengolahan, dosis aman, dan panduan berdasarkan Kemenkes RI.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-10 max-w-2xl mx-auto">
          <div className="relative mb-4"><Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" /><input type="text" placeholder="Cari resep herbal..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-12 pr-4 py-3.5 bg-white/70 backdrop-blur-sm border border-border rounded-xl text-text placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all shadow-sm" /></div>
          <div className="flex flex-wrap justify-center gap-2">
            {["Semua", "Teh Herbal", "Wedang", "Jamu"].map((cat) => (<button key={cat} onClick={() => setFilter(cat)} className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${filter === cat ? "bg-gradient-to-r from-primary to-emerald text-white shadow-lg" : "bg-white/70 border border-border text-text-secondary hover:text-primary hover:border-primary/30"}`}>{cat}</button>))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((jamu, index) => (
            <motion.div key={jamu.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="glass-card rounded-2xl overflow-hidden group">
              <div className="h-28 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${jamu.warna_tema}25, ${jamu.warna_tema}55)` }}>
                <div className="absolute top-3 left-3"><span className="px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs font-medium text-primary border border-primary/10 shadow-sm">{jamu.kategori}</span></div>
                <div className="absolute bottom-3 left-4"><h3 className="text-xl font-bold text-text drop-shadow-sm">{jamu.nama}</h3><p className="text-xs text-text-muted italic">{jamu.nama_latin}</p></div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 mb-4 text-xs text-text-muted">
                  <span className="flex items-center gap-1 bg-warm/5 px-2.5 py-1 rounded-md border border-warm/15"><Flame className="w-3.5 h-3.5 text-warm" /> 15-20 min</span>
                  <span className="flex items-center gap-1 bg-primary/5 px-2.5 py-1 rounded-md border border-primary/15"><Droplets className="w-3.5 h-3.5 text-primary" /> {jamu.komposisi.length} bahan</span>
                  <span className="flex items-center gap-1 bg-emerald/5 px-2.5 py-1 rounded-md border border-emerald/15"><CheckCircle2 className="w-3.5 h-3.5 text-emerald" /> Mudah</span>
                </div>
                <div className="mb-4"><h4 className="text-sm font-semibold text-text mb-2 flex items-center gap-1.5"><Leaf className="w-3.5 h-3.5 text-primary" /> Bahan</h4><div className="flex flex-wrap gap-1.5">{jamu.komposisi.map((k) => (<span key={k} className="px-2.5 py-1 bg-bg text-xs text-text-secondary border border-border rounded-md">{k}</span>))}</div></div>
                <div className="mb-4"><h4 className="text-sm font-semibold text-text mb-2 flex items-center gap-1.5"><ChefHat className="w-3.5 h-3.5 text-warm" /> Cara Membuat</h4><p className="text-sm text-text-secondary leading-relaxed bg-bg p-3 rounded-lg border border-border">{jamu.cara_pembuatan}</p></div>
                <div className="mb-4 p-3 bg-primary/5 rounded-lg border border-primary/15"><p className="text-xs font-semibold text-primary flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5" /> Dosis: {jamu.dosis}</p></div>
                <div className="flex gap-2">
                  <button onClick={() => setSelectedJamu(jamu)} className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-primary to-emerald text-white rounded-xl text-sm font-medium shadow-lg shadow-primary/20 hover:shadow-xl transition-all"><BookOpen className="w-4 h-4" /> Lihat Detail</button>
                  <button onClick={() => printRecipe(jamu)} className="flex items-center justify-center px-4 py-2.5 bg-bg text-text-secondary rounded-xl text-sm font-medium hover:text-primary transition-colors border border-border"><Printer className="w-4 h-4" /></button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        {filtered.length === 0 && <div className="text-center py-20"><ChefHat className="w-16 h-16 text-text-muted/30 mx-auto mb-4" /><p className="text-text-secondary">Tidak ditemukan resep.</p></div>}
      </div>

      <AnimatePresence>
        {selectedJamu && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-md" onClick={() => setSelectedJamu(null)}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-border">
              <div className="h-36 relative" style={{ background: `linear-gradient(135deg, ${selectedJamu.warna_tema}35, ${selectedJamu.warna_tema}65)` }}>
                <div className="absolute bottom-4 left-6"><span className="px-3 py-1 bg-white/80 rounded-full text-xs font-medium text-primary mb-2 inline-block border border-primary/10 shadow-sm">{selectedJamu.kategori}</span><h2 className="text-2xl font-bold text-text">{selectedJamu.nama}</h2><p className="text-sm text-text-muted italic">{selectedJamu.nama_latin}</p></div>
                <button onClick={() => setSelectedJamu(null)} className="absolute top-4 right-4 w-9 h-9 bg-white/80 rounded-full flex items-center justify-center text-text border border-border shadow-sm">✕</button>
                <button onClick={() => printRecipe(selectedJamu)} className="absolute top-4 right-16 w-9 h-9 bg-white/80 rounded-full flex items-center justify-center text-text border border-border shadow-sm"><Printer className="w-4 h-4" /></button>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 bg-bg rounded-lg border border-border"><Clock className="w-5 h-5 text-primary mx-auto mb-1" /><p className="text-xs font-medium text-text">15-20 min</p></div>
                  <div className="text-center p-3 bg-bg rounded-lg border border-border"><Flame className="w-5 h-5 text-warm mx-auto mb-1" /><p className="text-xs font-medium text-text">Mudah</p></div>
                  <div className="text-center p-3 bg-bg rounded-lg border border-border"><Droplets className="w-5 h-5 text-accent mx-auto mb-1" /><p className="text-xs font-medium text-text">{selectedJamu.komposisi.length} Bahan</p></div>
                </div>
                <div><h3 className="font-semibold text-text flex items-center gap-2 mb-3"><Leaf className="w-4 h-4 text-primary" /> Komposisi</h3><div className="space-y-2">{selectedJamu.komposisi.map((k, i) => (<div key={k} className="flex items-center gap-3 p-3 bg-bg rounded-lg border border-border"><span className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent text-white text-xs flex items-center justify-center font-medium">{i + 1}</span><span className="text-sm text-text">{k}</span></div>))}</div></div>
                <div><h3 className="font-semibold text-text flex items-center gap-2 mb-3"><ChefHat className="w-4 h-4 text-warm" /> Cara Pembuatan</h3><div className="p-4 bg-bg rounded-lg border border-border"><p className="text-sm text-text-secondary leading-relaxed">{selectedJamu.cara_pembuatan}</p></div></div>
                <div><h3 className="font-semibold text-text mb-3">Dosis & Indikasi</h3><div className="p-4 bg-primary/5 rounded-lg border border-primary/15 mb-3"><p className="text-sm font-semibold text-primary">💊 {selectedJamu.dosis}</p></div><div className="space-y-1.5">{selectedJamu.indikasi.map((ind) => (<div key={ind} className="flex items-center gap-2 text-sm text-text-secondary"><CheckCircle2 className="w-3.5 h-3.5 text-emerald" /> {ind}</div>))}</div></div>
                <div className="p-4 bg-warm/5 rounded-lg border border-warm/15"><h3 className="font-semibold text-warm flex items-center gap-2 mb-2"><AlertTriangle className="w-4 h-4" /> Kontraindikasi</h3><div className="space-y-1">{selectedJamu.kontraindikasi.map((k) => (<div key={k} className="flex items-center gap-2 text-sm text-warm"><div className="w-1.5 h-1.5 bg-warm/50 rounded-full" /> {k}</div>))}</div></div>
                <p className="text-xs text-text-muted italic">Sumber: {selectedJamu.sumber}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

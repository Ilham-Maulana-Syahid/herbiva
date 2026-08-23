"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Leaf, Heart, AlertTriangle, BookOpen, X, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import jamuData from "@/data/jamu.json";
type JamuItem = (typeof jamuData)[number];
const categories = ["Semua", "Teh Herbal", "Wedang", "Jamu"];

export default function KatalogPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedJamu, setSelectedJamu] = useState<JamuItem | null>(null);

  const filteredJamu = useMemo(() => {
    return jamuData.filter((item) => {
      const matchSearch = item.nama.toLowerCase().includes(search.toLowerCase()) || item.manfaat.some((m) => m.toLowerCase().includes(search.toLowerCase()));
      const matchCategory = selectedCategory === "Semua" || item.kategori === selectedCategory;
      return matchSearch && matchCategory && item.tersedia;
    });
  }, [search, selectedCategory]);

  return (
    <div className="min-h-screen pt-24 pb-16 bg-nature">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-border text-text-secondary text-sm font-medium mb-4 shadow-sm">
            <Leaf className="w-4 h-4 text-primary" /> Katalog Herbal
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-text mb-4">Jelajahi <span className="gradient-text">Herbal Indonesia</span></h1>
          <p className="text-text-secondary max-w-xl mx-auto">Informasi lengkap herbal berdasarkan panduan resmi Kemenkes RI.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-10">
          <div className="relative max-w-lg mx-auto mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input type="text" placeholder="Cari herbal, manfaat, atau kategori..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-12 pr-4 py-3.5 bg-white/70 backdrop-blur-sm border border-border rounded-xl text-text placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all shadow-sm" />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <motion.button key={cat} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setSelectedCategory(cat)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${selectedCategory === cat ? "bg-gradient-to-r from-primary to-emerald text-white shadow-lg shadow-primary/20" : "bg-white/70 border border-border text-text-secondary hover:text-primary hover:border-primary/30"}`}>
                {cat}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="mb-6 text-sm text-text-muted">Menampilkan {filteredJamu.length} dari {jamuData.filter(j => j.tersedia).length} herbal</div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredJamu.map((item, index) => (
              <motion.div key={item.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: index * 0.05 }} whileHover={{ y: -6 }} onClick={() => setSelectedJamu(item)} className="glass-card rounded-2xl overflow-hidden cursor-pointer group">
                <div className="h-40 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${item.warna_tema}20, ${item.warna_tema}45)` }}>
                  <Image src={item.gambar} alt={item.nama} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute top-3 right-3"><span className="px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs font-medium text-primary border border-primary/10 shadow-sm">{item.kategori}</span></div>
                  <div className="absolute bottom-3 left-3 right-3"><h3 className="text-xl font-bold text-white" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.6), 0 0 8px rgba(0,0,0,0.3)" }}>{item.nama}</h3></div>
                </div>
                <div className="p-5">
                  <p className="text-xs text-text-muted italic mb-3">{item.nama_latin}</p>
                  <div className="space-y-2 mb-4">
                    {item.manfaat.slice(0, 3).map((m) => (<div key={m} className="flex items-start gap-2 text-sm text-text-secondary"><Heart className="w-3.5 h-3.5 text-warm mt-0.5 flex-shrink-0" />{m}</div>))}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <span className="text-xs text-primary font-medium bg-primary/5 px-2.5 py-1 rounded-md">{item.dosis}</span>
                    <span className="text-xs text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">Lihat Detail <ArrowRight className="w-3 h-3" /></span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredJamu.length === 0 && <div className="text-center py-20"><Search className="w-16 h-16 text-text-muted/30 mx-auto mb-4" /><p className="text-text-secondary">Tidak ditemukan herbal yang sesuai.</p></div>}

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16 text-center glass-card rounded-2xl p-8">
          <Sparkles className="w-10 h-10 text-accent mx-auto mb-4" />
          <h3 className="text-xl font-bold text-text mb-2">Punya Pertanyaan tentang Herbal?</h3>
          <p className="text-text-secondary mb-6 max-w-md mx-auto">Gunakan Herbal AI kami untuk berkonsultasi.</p>
          <Link href="/ai" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent to-warm text-white rounded-xl font-medium shadow-lg shadow-accent/20 hover:shadow-xl transition-all"><Sparkles className="w-5 h-5" /> Buka Herbal AI</Link>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedJamu && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-md" onClick={() => setSelectedJamu(null)}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-border">
              <div className="h-32 relative" style={{ background: `linear-gradient(135deg, ${selectedJamu.warna_tema}35, ${selectedJamu.warna_tema}65)` }}>
                <button onClick={() => setSelectedJamu(null)} className="absolute top-4 right-4 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-text border border-border shadow-sm z-10"><X className="w-4 h-4" /></button>
                <div className="absolute -bottom-6 left-6 z-10"><div className="w-14 h-14 rounded-xl overflow-hidden shadow-lg border-2 border-white"><Image src={selectedJamu.gambar} alt={selectedJamu.nama} width={56} height={56} className="w-full h-full object-cover" /></div></div>
              </div>
              <div className="p-6 pt-10">
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-2xl font-bold text-text">{selectedJamu.nama}</h2>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">{selectedJamu.kategori}</span>
                </div>
                <p className="text-sm text-text-muted italic mb-6">{selectedJamu.nama_latin}</p>
                <div className="mb-6"><h3 className="font-semibold text-text flex items-center gap-2 mb-3"><Heart className="w-4 h-4 text-warm" /> Manfaat</h3><div className="grid grid-cols-2 gap-2">{selectedJamu.manfaat.map((m) => (<div key={m} className="flex items-start gap-2 p-2.5 bg-bg rounded-lg text-sm text-text-secondary border border-border"><Heart className="w-3 h-3 text-warm mt-0.5 flex-shrink-0" />{m}</div>))}</div></div>
                <div className="mb-6"><h3 className="font-semibold text-text flex items-center gap-2 mb-3"><Leaf className="w-4 h-4 text-primary" /> Komposisi</h3><div className="flex flex-wrap gap-2">{selectedJamu.komposisi.map((k) => (<span key={k} className="px-3 py-1.5 bg-bg rounded-lg text-sm text-text-secondary border border-border">{k}</span>))}</div></div>
                <div className="mb-6"><h3 className="font-semibold text-text flex items-center gap-2 mb-3"><BookOpen className="w-4 h-4 text-warm" /> Cara Pembuatan</h3><p className="text-sm text-text-secondary bg-bg p-4 rounded-lg leading-relaxed border border-border">{selectedJamu.cara_pembuatan}</p></div>
                <div className="mb-6 p-4 bg-primary/5 rounded-lg border border-primary/15"><h3 className="font-semibold text-primary flex items-center gap-2 mb-1"><AlertTriangle className="w-4 h-4" /> Dosis Aman</h3><p className="text-sm text-text font-medium">{selectedJamu.dosis}</p></div>
                <div className="mb-6"><h3 className="font-semibold text-text mb-3">Indikasi Medis</h3><div className="space-y-2">{selectedJamu.indikasi.map((ind) => (<div key={ind} className="flex items-center gap-2 text-sm text-text-secondary"><div className="w-1.5 h-1.5 bg-emerald rounded-full flex-shrink-0" />{ind}</div>))}</div></div>
                <div className="mb-6 p-4 bg-warm/5 rounded-lg border border-warm/15"><h3 className="font-semibold text-warm flex items-center gap-2 mb-2"><AlertTriangle className="w-4 h-4" /> Kontraindikasi</h3><div className="space-y-1">{selectedJamu.kontraindikasi.map((k) => (<div key={k} className="flex items-center gap-2 text-sm text-warm"><div className="w-1.5 h-1.5 bg-warm/50 rounded-full flex-shrink-0" />{k}</div>))}</div></div>
                <p className="text-xs text-text-muted italic">Sumber: {selectedJamu.sumber}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

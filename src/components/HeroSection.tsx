"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Leaf, Sparkles, Heart, ArrowRight, BookOpen, MessageCircle, ChevronDown, Shield, Droplets, Sun, Zap } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const features = [
  { icon: BookOpen, title: "Katalog Herbal Lengkap", desc: "Informasi herbal berdasarkan panduan resmi Kemenkes RI dengan dosis aman.", gradient: "from-primary to-emerald", shadow: "shadow-primary/20" },
  { icon: MessageCircle, title: "Herbal AI Assistant", desc: "Tanyakan tentang herbal, manfaat, dan cara pengolahannya dengan AI generative.", gradient: "from-accent to-warm", shadow: "shadow-accent/20" },
  { icon: Shield, title: "Resep Digital Aman", desc: "Resep herbal dengan indikasi medis dan panduan pengolahan yang aman.", gradient: "from-moss to-primary-light", shadow: "shadow-moss/20" },
  { icon: Heart, title: "Edukasi Gratis", desc: "Pengetahuan herbal untuk kemandirian kesehatan masyarakat Indonesia.", gradient: "from-earth to-warm", shadow: "shadow-earth/20" },
];

export default function HeroSection() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.95]);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <div className="relative overflow-hidden">
      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-nature-strong">
        {/* Animated nature orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div animate={{ x: [0, 40, -20, 0], y: [0, -50, 30, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[8%] left-[8%] w-[500px] h-[500px] bg-primary/8 rounded-full blur-[120px]" />
          <motion.div animate={{ x: [0, -50, 40, 0], y: [0, 40, -40, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[25%] right-[5%] w-[450px] h-[450px] bg-accent/8 rounded-full blur-[120px]" />
          <motion.div animate={{ x: [0, 30, -40, 0], y: [0, -30, 50, 0] }} transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[10%] left-[30%] w-[400px] h-[400px] bg-emerald/6 rounded-full blur-[120px]" />
          <motion.div animate={{ x: [0, -30, 20, 0], y: [0, 30, -20, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[55%] right-[20%] w-[350px] h-[350px] bg-moss/5 rounded-full blur-[120px]" />
        </div>

        {/* Floating nature particles */}
        {mounted && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 12 }, (_, i) => (
              <motion.div key={i} className="absolute rounded-full" style={{ left: `${5 + Math.random() * 90}%`, width: 4 + Math.random() * 5, height: 4 + Math.random() * 5, background: ["#2d6a4f", "#40916c", "#b7791f", "#059669", "#4d7c0f", "#78350f"][i % 6] }} animate={{ y: ["100vh", "-10vh"], opacity: [0, 0.5, 0.5, 0], scale: [0.5, 1, 1, 0.5] }} transition={{ duration: 14 + Math.random() * 8, delay: Math.random() * 12, repeat: Infinity, ease: "linear" }} />
            ))}
          </div>
        )}

        {/* Floating leaves */}
        {mounted && Array.from({ length: 6 }, (_, i) => (
          <motion.div key={`leaf-${i}`} className="absolute" style={{ left: `${10 + i * 16}%`, top: "-5%", color: ["#2d6a4f", "#40916c", "#b7791f", "#059669", "#4d7c0f", "#78350f"][i] }} animate={{ y: ["0vh", "105vh"], rotate: [0, 360], opacity: [0, 0.2, 0.2, 0] }} transition={{ duration: 18 + i * 3, delay: i * 5, repeat: Infinity, ease: "linear" }}>
            <Leaf style={{ width: 18 + i * 5, height: 18 + i * 5 }} />
          </motion.div>
        ))}

        <motion.div style={{ y, opacity, scale }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/60 backdrop-blur-xl rounded-full border border-white/80 shadow-lg shadow-primary/5 text-sm font-medium text-text-secondary mb-8">
            <motion.span animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 3, repeat: Infinity }}><Sparkles className="w-4 h-4 text-primary" /></motion.span>
            Inovasi Herbal Berbasis Sains & Kemenkes RI
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="text-4xl sm:text-6xl md:text-8xl font-black leading-[1.05] mb-6">
            <span className="text-text">Pojok{" "}</span>
            <span className="gradient-text">Herbal</span>
            <br className="hidden sm:block" />
            <span className="text-text">{" "}Pintar</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
            Inovasi herbal untuk{" "}
            <span className="font-semibold text-primary">kemandirian kesehatan masyarakat</span>.{" "}
            Edukasi visual & mini-bar herbal di area tunggu Posyandu dan Puskesmas.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/katalog" className="btn-glow group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-emerald text-white rounded-2xl font-bold text-base shadow-lg shadow-primary/25 hover:shadow-xl transition-all hover:-translate-y-1 relative z-10">
              <Leaf className="w-5 h-5 group-hover:rotate-12 transition-transform" />Jelajahi Herbal<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/ai" className="btn-glow group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent to-warm text-white rounded-2xl font-bold text-base shadow-lg shadow-accent/25 hover:shadow-xl transition-all hover:-translate-y-1 relative z-10">
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />Tanya Herbal AI
            </Link>
          </motion.div>

          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="mt-16 text-text-muted"><ChevronDown className="w-6 h-6 mx-auto" /></motion.div>
        </motion.div>
      </section>

      {/* ═══════ FEATURES ═══════ */}
      <section className="relative py-24 bg-nature">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-border text-text-secondary text-sm font-medium mb-4 shadow-sm"><Zap className="w-4 h-4 text-accent" /> Fitur Unggulan</span>
            <h2 className="text-3xl md:text-4xl font-black text-text mb-4">Mengapa <span className="gradient-text">Pojok Herbal Pintar?</span></h2>
            <p className="text-text-secondary max-w-xl mx-auto">Platform lengkap untuk edukasi dan pemanfaatan herbal bagi kesehatan masyarakat</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => {
              const I = f.icon;
              return (
                <motion.div key={f.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }} whileHover={{ y: -8, scale: 1.02 }} className="glass-card rounded-2xl p-6 text-center group cursor-pointer">
                  <motion.div whileHover={{ rotate: 5, scale: 1.1 }} className={`w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${f.gradient} flex items-center justify-center shadow-lg ${f.shadow} group-hover:shadow-xl transition-shadow`}><I className="w-7 h-7 text-white" /></motion.div>
                  <h3 className="text-base font-bold text-text mb-2">{f.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ HOW IT WORKS ═══════ */}
      <section className="relative py-24 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-border text-text-secondary text-sm font-medium mb-4 shadow-sm"><Droplets className="w-4 h-4 text-primary" /> Cara Kerja</span>
            <h2 className="text-3xl md:text-4xl font-black text-text mb-4">Bagaimana <span className="gradient-text">Pojok Herbal Pintar</span> Bekerja?</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Kunjungi Posyandu", desc: "Datang ke Posyandu atau Puskesmas terdekat dan nikmati minuman herbal gratis dari kader kesehatan.", icon: Droplets, color: "from-primary to-emerald" },
              { step: "02", title: "Edukasi Herbal", desc: "Dapatkan edukasi dosis aman, manfaat, dan cara mengolah herbal langsung dari kader yang terlatih.", icon: Sun, color: "from-accent to-warm" },
              { step: "03", title: "Resep Digital", desc: "Terima resep digital herbal lengkap dengan panduan mengolah dan indikasi medis berdasarkan Kemenkes.", icon: BookOpen, color: "from-moss to-primary-light" },
            ].map((item, index) => {
              const I = item.icon;
              return (
                <motion.div key={item.step} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.15 }}>
                  <div className="glass-card rounded-2xl p-8 h-full group">
                    <div className="text-6xl font-black text-text/[0.04] mb-4">{item.step}</div>
                    <motion.div whileHover={{ rotate: 5 }} className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 shadow-lg`}><I className="w-6 h-6 text-white" /></motion.div>
                    <h3 className="text-xl font-bold text-text mb-3">{item.title}</h3>
                    <p className="text-text-secondary leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-nature-strong opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/3 to-emerald/5" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 6, repeat: Infinity }} className="inline-block mb-6"><Leaf className="w-14 h-14 text-primary" /></motion.div>
            <h2 className="text-3xl md:text-4xl font-black text-text mb-6">Mulai Jelajahi Dunia Herbal</h2>
            <p className="text-text-secondary text-lg mb-10 max-w-2xl mx-auto">Tanyakan apapun tentang herbal kepada AI kami, atau jelajahi katalog herbal untuk menemukan manfaat dari tanaman obat Indonesia.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/ai" className="btn-glow group flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-emerald text-white rounded-2xl font-bold text-lg shadow-lg shadow-primary/25 hover:shadow-xl transition-all hover:-translate-y-1 relative z-10"><MessageCircle className="w-5 h-5" />Mulai Konsultasi AI<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></Link>
              <Link href="/katalog" className="flex items-center justify-center gap-2 px-8 py-4 bg-white/80 backdrop-blur-sm border border-border text-text rounded-2xl font-bold text-lg shadow-sm hover:bg-white hover:shadow-md transition-all hover:-translate-y-1"><BookOpen className="w-5 h-5" />Lihat Katalog</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

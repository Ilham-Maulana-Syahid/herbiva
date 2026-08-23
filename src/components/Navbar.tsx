"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Menu, X, Sparkles, Home, BookOpen, MessageCircle, Users, ChefHat } from "lucide-react";

const navLinks = [
  { href: "/", label: "Beranda", icon: Home },
  { href: "/katalog", label: "Katalog Herbal", icon: BookOpen },
  { href: "/resep", label: "Resep Digital", icon: ChefHat },
  { href: "/ai", label: "Herbal AI", icon: Sparkles },
  { href: "/tentang", label: "Tentang Kami", icon: Users },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activePath, setActivePath] = useState("/");

  useEffect(() => {
    setActivePath(window.location.pathname);
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/75 backdrop-blur-2xl border-b border-border shadow-md shadow-primary/[0.04]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-[72px]">
          <Link href="/" className="flex items-center gap-2.5">
            <motion.div whileHover={{ rotate: 10, scale: 1.08 }} transition={{ type: "spring", stiffness: 300 }} className="w-10 h-10 rounded-xl overflow-hidden shadow-lg glow-green">
              <Image src="/logo.png" alt="Pojok Herbal Pintar" width={40} height={40} className="w-full h-full object-cover" priority />
            </motion.div>
            <div className="flex flex-col leading-tight">
              <span className="text-base font-bold text-text tracking-tight">Pojok Herbal</span>
              <span className="text-[10px] text-primary font-semibold tracking-widest uppercase">Pintar</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => {
              const I = l.icon;
              const a = activePath === l.href;
              return (
                <Link key={l.href} href={l.href} onClick={() => setActivePath(l.href)} className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 ${a ? "text-primary bg-primary/10" : "text-text-secondary hover:text-primary hover:bg-primary/5"}`}>
                  <I className="w-4 h-4" />{l.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:block">
            <Link href="/ai" className="btn-glow flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-emerald text-white rounded-xl font-medium text-sm shadow-lg shadow-primary/20 hover:shadow-xl transition-all relative z-10">
              <MessageCircle className="w-4 h-4" />Tanya Herbal AI
            </Link>
          </div>

          <motion.button whileTap={{ scale: 0.9 }} onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2.5 rounded-xl bg-surface border border-border text-text">
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }} className="md:hidden bg-white/95 backdrop-blur-2xl border-t border-border overflow-hidden">
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((l) => {
                const I = l.icon;
                const a = activePath === l.href;
                return (
                  <Link key={l.href} href={l.href} onClick={() => { setActivePath(l.href); setIsOpen(false); }} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${a ? "text-primary bg-primary/10" : "text-text-secondary hover:text-primary hover:bg-primary/5"}`}>
                    <I className="w-5 h-5" />{l.label}
                  </Link>
                );
              })}
              <Link href="/ai" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-primary to-emerald text-white rounded-xl text-sm font-medium mt-2">
                <MessageCircle className="w-5 h-5" />Tanya Herbal AI
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

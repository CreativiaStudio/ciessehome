"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Flame, Maximize2, ChefHat, Calendar, Mail, Phone, User, Send, Check, Menu, X } from "lucide-react";
import { kitchens } from "./data/kitchens";
export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    kitchenId: "",
    notes: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Stato per l'effetto Spotlight nella Hero
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHoveringHero, setIsHoveringHero] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Lead submitted:", formData);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <img src="/Loghi/logo-04.png" alt="Ciesse Home" className="h-6 w-auto" />
            <span className="ml-3 hidden sm:inline-block text-xs bg-[#ad9271]/20 text-[#ad9271] px-2 py-0.5 rounded-full font-medium tracking-wide">
              OUTLET
            </span>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
            <a href="#catalog" className="hover:text-[#ad9271] transition-colors">Rinnovo Esposizione</a>
            <a href="#about" className="hover:text-[#ad9271] transition-colors">L&apos;Esposizione</a>
            <a href="#contact" className="hover:text-[#ad9271] transition-colors">Prenota Visita</a>
          </nav>
          
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="hidden sm:inline-flex bg-[#ad9271] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#967d5f] transition-colors"
            >
              Richiedi Info
            </a>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-[#0e1f2b] p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-slate-200 shadow-lg py-4 px-4 flex flex-col gap-4 z-40">
            <a 
              href="#catalog" 
              className="text-[#0e1f2b] font-medium py-2 border-b border-slate-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Rinnovo Esposizione
            </a>
            <a 
              href="#about" 
              className="text-[#0e1f2b] font-medium py-2 border-b border-slate-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              L&apos;Esposizione
            </a>
            <a 
              href="#contact" 
              className="text-[#0e1f2b] font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Prenota Visita
            </a>
            <a
              href="#contact"
              className="bg-[#ad9271] text-white px-4 py-3 rounded-lg text-center font-semibold hover:bg-[#967d5f] transition-colors mt-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Richiedi Info
            </a>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section 
          className="relative overflow-hidden bg-[#0e1f2b] py-20 lg:py-32"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHoveringHero(true)}
          onMouseLeave={() => setIsHoveringHero(false)}
        >
          {/* Spotlight dinamico al passaggio del mouse */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 ease-in-out"
            animate={{ opacity: isHoveringHero ? 1 : 0 }}
            style={{
              background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(173, 146, 113, 0.12), transparent 40%)`
            }}
          />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
              <motion.div 
                className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-7 lg:text-left"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-[#ad9271] border border-[#ad9271]/30 mb-6">
                  <Flame className="w-4 h-4 text-[#ad9271]" />
                  Sconti Straordinari Fino al 50%
                </div>
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-serif leading-tight">
                  Rinnovo Showroom:
                  <span className="block text-[#ad9271] mt-1 lg:mt-2">Cucine Premium al 50% di sconto</span>
                </h1>
                <p className="mt-4 text-base text-slate-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl leading-relaxed">
                  Per rinnovo locali, proponiamo 16 splendide cucine di design da esposizione a condizioni esclusive. Finiture di lusso ed elettrodomestici di marca inclusi, pronte per essere installate a casa tua.
                </p>
                <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-[#0e1f2b] bg-[#ad9271] hover:bg-[#967d5f] hover:text-white transition-colors shadow-md hover:shadow-lg"
                  >
                    Blocca la tua offerta
                  </a>
                </div>
              </motion.div>
              <div className="mt-12 lg:mt-0 lg:col-span-5">
                <motion.div 
                  className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="aspect-[4/3] sm:aspect-video w-full bg-slate-200 rounded-lg overflow-hidden relative shadow-inner">
                    <img src="/immagini/Showroom.jpg" alt="Il nostro Showroom" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="mt-6 flex justify-around text-center text-slate-600 text-sm">
                    <div>
                      <span className="block text-2xl font-bold text-slate-950">16</span>
                      Modelli Disponibili
                    </div>
                    <div className="border-l border-slate-200 h-10 my-auto"></div>
                    <div>
                      <span className="block text-2xl font-bold text-slate-950">-50%</span>
                      Prezzo di Listino
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Catalog Section */}
        <section id="catalog" className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-extrabold text-[#0e1f2b] sm:text-4xl font-serif">
                La Nostra Selezione in Esposizione
              </h2>
              <p className="mt-4 text-lg text-slate-500">
                Scopri i modelli attualmente in esposizione, disponibili a prezzi irripetibili. Contattaci per bloccare il tuo affare.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {kitchens.map((kitchen) => (
                <motion.div 
                  key={kitchen.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <div className="aspect-[2/3] w-full bg-slate-100 relative overflow-hidden rounded-t-2xl">
                    <video 
                      src={kitchen.videoSrc} 
                      className="w-full h-full object-cover"
                      muted 
                      loop 
                      playsInline
                      onMouseOver={(e) => (e.target as HTMLVideoElement).play()}
                      onMouseOut={(e) => {
                        const v = e.target as HTMLVideoElement;
                        v.pause();
                        v.currentTime = 0;
                      }}
                    />
                    <div className="absolute top-4 right-4 bg-[#ad9271] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      -50%
                    </div>
                    <div className="absolute top-4 left-4 bg-[#0e1f2b]/90 backdrop-blur-sm text-[#ad9271] border border-[#ad9271]/20 text-xs font-semibold px-3 py-1 rounded-full">
                      {kitchen.category}
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow border-t border-slate-100 rounded-b-2xl bg-white">
                    <h3 className="text-xl font-bold text-[#0e1f2b] font-serif leading-tight group-hover:text-[#ad9271] transition-colors">
                      {kitchen.name}
                    </h3>
                    {kitchen.description && (
                      <p className="text-sm text-slate-500 mt-1">{kitchen.description}</p>
                    )}
                    
                    <div className="mt-4 mb-4 flex-grow relative">
                      <div className="group/features inline-block">
                        <span className="inline-flex items-center text-xs font-bold text-[#ad9271] uppercase tracking-wider cursor-pointer border-b border-dashed border-[#ad9271] hover:text-[#0e1f2b] transition-colors">
                          Vedi Scheda Tecnica
                        </span>
                        
                        <div className="absolute left-0 bottom-full w-full min-w-[260px] bg-[#0e1f2b] p-5 rounded-xl shadow-2xl opacity-0 invisible group-hover/features:opacity-100 group-hover/features:visible transition-all z-20 mb-3 border border-[#ad9271]/30 pointer-events-none">
                          <h4 className="text-xs font-bold text-[#ad9271] uppercase tracking-wider mb-3">Caratteristiche</h4>
                          <ul className="space-y-2">
                            {kitchen.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start text-xs text-slate-300">
                                <Check className="w-3 h-3 text-[#ad9271] mr-1.5 flex-shrink-0 mt-0.5" />
                                <span className="leading-snug">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-slate-100 flex items-end justify-between mt-auto">
                      <div>
                        <p className="text-xs text-slate-400 font-medium line-through mb-0.5">Listino: € {kitchen.price * 2}</p>
                        <p className="text-2xl font-bold text-[#ad9271] leading-none">
                          € {kitchen.price.toLocaleString("it-IT")}
                        </p>
                      </div>
                      <a
                        href="#contact"
                        onClick={() => setFormData({ ...formData, kitchenId: kitchen.name })}
                        className="text-sm font-semibold text-[#0e1f2b] border border-[#ad9271] hover:bg-[#ad9271] hover:text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        Richiedi
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact" className="relative py-24 border-t border-[#ad9271]/20 bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/immagini/showroom2.jpg')" }}>
          <div className="absolute inset-0 bg-[#0e1f2b]/80 backdrop-blur-[2px]"></div>
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-white/20">
              <div className="bg-[#0e1f2b] py-6 px-8 text-white border-b-4 border-[#ad9271]">
                <h3 className="text-2xl font-bold font-serif text-[#ad9271]">Richiedi Informazioni o Prenota una Visita</h3>
                <p className="mt-1 text-slate-300 text-sm">Compila il modulo per fissare un appuntamento e ricevere il catalogo prezzi completo.</p>
              </div>
              <div className="p-8">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900">Richiesta Inviata con Successo!</h4>
                    <p className="mt-2 text-slate-600">Grazie per l&apos;interesse. Un consulente Ciesse Home ti contatterà al più presto per confermare l&apos;appuntamento.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1.5">
                        <User className="w-4 h-4 text-slate-400" /> Nome Completo
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#ad9271] focus:border-[#ad9271] outline-none transition-shadow"
                        placeholder="Es. Mario Rossi"
                      />
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1.5">
                          <Mail className="w-4 h-4 text-slate-400" /> Email
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#ad9271] focus:border-[#ad9271] outline-none transition-shadow"
                          placeholder="mario.rossi@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1.5">
                          <Phone className="w-4 h-4 text-slate-400" /> Telefono
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#ad9271] focus:border-[#ad9271] outline-none transition-shadow"
                          placeholder="333 1234567"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-slate-400" /> Modello di Interesse (Opzionale)
                      </label>
                      <select
                        value={formData.kitchenId}
                        onChange={(e) => setFormData({ ...formData, kitchenId: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#ad9271] focus:border-[#ad9271] outline-none bg-white transition-shadow"
                      >
                        <option value="">Seleziona un modello o chiedi informazioni generali</option>
                        {kitchens.map((k) => (
                          <option key={k.id} value={k.name}>{k.name} - € {k.price}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Note o Messaggio
                      </label>
                      <textarea
                        rows={4}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#ad9271] focus:border-[#ad9271] outline-none transition-shadow"
                        placeholder="Dicci quando preferisci venire a trovarci o quali sono le tue richieste..."
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#ad9271] hover:bg-[#967d5f] text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Invia Richiesta
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0e1f2b] text-slate-400 py-12 border-t border-[#0e1f2b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm flex flex-col items-center">
          <img src="/Loghi/logo-05.png" alt="Ciesse Home" className="h-8 w-auto mb-6 opacity-80 hover:opacity-100 transition-opacity" />
          <p>© {new Date().getFullYear()} Ciesse Home. Tutti i diritti riservati.</p>
          <p className="mt-2 text-slate-500">Promozione rinnovo locali soggetta a disponibilità limitata.</p>
        </div>
      </footer>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
import Script from "next/script";
import { Play, X, Star, Check, ArrowRight, ShieldCheck, Clock, Flame, ChevronRight, Menu, Send, MapPin, Phone, Mail, User, Maximize2, ChefHat, Calendar, Truck } from "lucide-react";
import { kitchens } from "./data/kitchens";

const VideoPlayer = ({ src }: { src: string }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Su mobile riproduciamo automaticamente
            if (window.innerWidth < 1024) {
              videoRef.current?.play().catch(() => {});
            }
          } else {
            if (window.innerWidth < 1024) {
              videoRef.current?.pause();
              // Quando esce, lo riportiamo a 3 secondi (il frame figo)
              if (videoRef.current) videoRef.current.currentTime = 3.0;
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full h-full group">
      <video
        ref={videoRef}
        src={`${src}#t=3.0`}
        preload="metadata"
        className="w-full h-full object-cover"
        muted
        loop
        playsInline
        onMouseOver={(e) => {
          // Su desktop, quando entra l'hover facciamo ripartire il video da 0
          if (window.innerWidth >= 1024) {
            e.currentTarget.currentTime = 0;
            e.currentTarget.play().catch(() => {});
          }
        }}
        onMouseOut={(e) => {
          // Quando esce l'hover su desktop, mettiamo in pausa e torniamo al frame a 3s
          if (window.innerWidth >= 1024) {
            e.currentTarget.pause();
            e.currentTarget.currentTime = 3.0;
          }
        }}
      />
      
      {/* Icona Play centrale: visibile solo su desktop e nascosta al passaggio del mouse */}
      <div className="absolute inset-0 hidden lg:flex items-center justify-center pointer-events-none transition-opacity duration-300 group-hover:opacity-0">
        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 shadow-[0_0_20px_rgba(0,0,0,0.1)]">
          <Play className="w-6 h-6 text-white ml-1 drop-shadow-md" fill="currentColor" />
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    kitchenId: "",
    notes: "",
    wantsCatalog: false,
    privacyAccepted: false
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Genera UUID per deduplicazione Meta (Client + Server)
    const eventId = uuidv4();
    
    // 1. Invia a GTM (Client-Side Meta Pixel)
    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: "custom_lead",
        eventID: eventId,
        content_name: "Richiesta Rinnovo Showroom"
      });
    }

    // 2. Invia al Webhook di N8N (Server-Side Meta CAPI)
    try {
      await fetch("https://n8n.creativiastudio.com/webhook/47ff0a28-48b5-427e-8173-5e932468dfb3", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_name: "Lead",
          event_id: eventId,
          event_time: Math.floor(Date.now() / 1000),
          event_source_url: window.location.href,
          user_data: {
            fn: formData.firstName,
            ln: formData.lastName,
            em: formData.email,
            ph: formData.phone
          },
          custom_data: {
            kitchen_id: formData.kitchenId,
            wants_catalog: formData.wantsCatalog,
            notes: formData.notes,
            utm_source: new URLSearchParams(window.location.search).get('utm_source') || "",
            utm_medium: new URLSearchParams(window.location.search).get('utm_medium') || "",
            utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign') || "Nessuna / Organico"
          }
        })
      });
    } catch (err) {
      console.error("Errore invio webhook:", err);
    }

    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <img src="/Loghi/logo-04.png" alt="Ciesse Home" className="h-6 w-auto" />
            <span className="ml-3 hidden sm:inline-block text-xs bg-[#ad9271]/20 text-[#ad9271] px-2 py-0.5 rounded-full font-bold tracking-wide uppercase">
              Rinnovo Showroom
            </span>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
            <a href="#catalog" className="hover:text-[#ad9271] transition-colors">Rinnovo Esposizione</a>
            <a href="#showroom" className="hover:text-[#ad9271] transition-colors">L&apos;Esposizione</a>
            <a href="#contact" className="hover:text-[#ad9271] transition-colors">Contatti</a>
          </nav>
          
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="hidden sm:inline-flex bg-[#ad9271] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#967d5f] transition-colors"
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
              href="#showroom" 
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
              Contatti
            </a>
            <a
              href="#contact"
              className="bg-[#ad9271] text-white px-4 py-3 rounded-lg text-center font-bold hover:bg-[#967d5f] transition-colors mt-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Richiedi Informazioni
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
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-serif leading-none lg:leading-[1.1]">
                  Rinnovo Showroom:
                  <span className="block text-[#ad9271]">Cucine Sartoriali al 50% di sconto</span>
                </h1>
                <p className="mt-4 text-base text-slate-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl leading-relaxed">
                  Dal produttore direttamente a casa tua. Per rinnovo locali, la nostra fabbrica propone {kitchens.length} splendide cucine sartoriali da esposizione a condizioni esclusive. Finiture di lusso ed elettrodomestici di marca inclusi.
                </p>
                <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-bold rounded-lg text-[#0e1f2b] bg-[#ad9271] hover:bg-[#967d5f] hover:text-white transition-colors shadow-md hover:shadow-lg"
                  >
                    Blocca l'Extra 10% Ora
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
                    <img src="/Immagini/Showroom.jpg" alt="Il nostro Showroom" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="mt-6 flex justify-around text-center text-slate-600 text-sm">
                    <div>
                      <span className="block text-2xl font-bold text-slate-950">{kitchens.length}</span>
                      Modelli Disponibili
                    </div>
                    <div className="border-l border-slate-200 h-10 my-auto"></div>
                    <div>
                      <span className="block text-2xl font-bold text-slate-950">-50%</span>
                      Prezzo di Listino
                    </div>
                  </div>
                  <div className="mt-6 bg-[#ad9271]/10 rounded-xl p-3 flex items-center justify-center gap-2 text-[#ad9271] font-bold text-sm">
                    <Truck className="w-5 h-5" /> Trasporto e Montaggio Inclusi
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
              <p className="mt-4 text-lg text-slate-600 font-medium">
                Ogni cucina che vedi è un <span className="text-[#ad9271] font-bold">Pezzo Unico</span> attualmente montato in showroom. <br className="hidden sm:block" />Chi prima si prenota, se lo aggiudica bloccando tutti i bonus.
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
                    {(kitchen as any).imageSrc ? (
                      <img src={(kitchen as any).imageSrc} alt={kitchen.name} className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${(kitchen as any).soldOut ? 'grayscale opacity-60' : ''}`} />
                    ) : (
                      <div className={`w-full h-full ${(kitchen as any).soldOut ? 'grayscale opacity-60' : ''}`}>
                        <VideoPlayer src={(kitchen as any).videoSrc} />
                      </div>
                    )}
                    
                    {(kitchen as any).soldOut ? (
                      <div className="absolute top-4 right-4 bg-slate-800/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1 border border-slate-600 uppercase tracking-wide">
                        VENDUTO
                      </div>
                    ) : (
                      <div className="absolute top-4 right-4 bg-red-600/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1 border border-red-500 uppercase tracking-wide">
                        <Flame className="w-3.5 h-3.5" /> Solo 1 Rimasta
                      </div>
                    )}
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
                    
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 gap-2">
                      <div className="min-w-0">
                        <p className="text-xs text-slate-400 line-through whitespace-nowrap truncate">Listino: € {kitchen.price * 2}</p>
                        <p className="text-xl sm:text-2xl font-bold text-[#ad9271] whitespace-nowrap flex items-baseline gap-1">
                          <span className="text-base sm:text-lg">€</span>
                          <span>{kitchen.price.toLocaleString("it-IT")}</span>
                        </p>
                      </div>
                      {(kitchen as any).soldOut ? (
                        <div className="text-xs sm:text-sm font-bold text-slate-500 bg-slate-200 px-3 sm:px-4 py-2.5 rounded-lg whitespace-nowrap shrink-0 border border-slate-300 uppercase cursor-not-allowed text-center">
                          Esaurito
                        </div>
                      ) : (
                        <a
                          href="#contact"
                          onClick={() => setFormData({ ...formData, kitchenId: kitchen.name })}
                          className="text-xs sm:text-sm font-bold text-white bg-[#0e1f2b] hover:bg-[#ad9271] px-3 sm:px-4 py-2.5 rounded-lg transition-colors shadow-md whitespace-nowrap shrink-0"
                        >
                          Richiedi Dettagli
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Identità e Showroom Section */}
        <section id="showroom" className="py-20 sm:py-24 bg-white relative border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0e1f2b] font-serif mb-6 leading-tight">
                  Una vera e propria<br/><span className="text-[#ad9271]">casa della cucina</span>
                </h2>
                <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                  <p>
                    Immagina un posto dove poter nutrire le tue idee di design e arredamento, uno spazio dove toccare da vicino i tuoi desideri. Il nostro showroom con i suoi <strong>2000 mq</strong>, ti accoglie in un piacevole viaggio nel mondo Ciesse.
                  </p>
                  <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-[#ad9271]">
                    <h3 className="text-xl font-bold text-[#0e1f2b] mb-2">Formula Produzione + Vendita Diretta</h3>
                    <p className="text-base m-0">
                      Siamo produttori dal 1968, costruiamo in sede la cucina che acquisterai in Showroom. Il taglio di ogni intermediario comporta un vantaggio ineguagliabile, che stimiamo in un <strong>risparmio di circa il 60%</strong> rispetto a un prodotto di pari caratteristiche e qualità.
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 mt-8">
                  <img src="/Immagini/showroom-1.jpg" alt="Showroom Ciesse" className="rounded-2xl shadow-lg w-full h-[250px] object-cover" />
                  <img src="/Immagini/showroom-2.jpg" alt="Cucine esposte" className="rounded-2xl shadow-lg w-full h-[200px] object-cover" />
                </div>
                <div className="space-y-4">
                  <img src="/Immagini/showroom-3.jpg" alt="Dettagli showroom" className="rounded-2xl shadow-lg w-full h-[300px] object-cover" />
                  <div className="bg-[#0e1f2b] rounded-2xl shadow-lg p-6 flex flex-col justify-center items-center text-center h-[150px]">
                    <span className="text-4xl font-bold text-[#ad9271] mb-1">50+</span>
                    <span className="text-white text-sm uppercase tracking-wider">Anni di<br/>Esperienza</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recensioni Elfsight Section */}
        <section className="py-20 sm:py-24 bg-slate-50 relative border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0e1f2b] font-serif mb-4">
                Cosa dicono i nostri clienti
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                La soddisfazione di chi ha già scelto Ciesse Home è la nostra garanzia più grande.
              </p>
            </div>
            <div className="bg-white p-4 sm:p-8 rounded-2xl shadow-xl border border-slate-100">
              <style dangerouslySetInnerHTML={{__html: `
                .elfsight-app-04e5f5df-92af-4c4f-b2f9-c605cd4b28c7 [class*="Header"] [class*="Button"],
                .elfsight-app-04e5f5df-92af-4c4f-b2f9-c605cd4b28c7 [class*="Header"] a[target="_blank"] {
                  color: #0e1f2b !important;
                }
                .elfsight-app-04e5f5df-92af-4c4f-b2f9-c605cd4b28c7 [class*="Button"] {
                  /* Assicuriamoci che il tasto Carica Altro resti leggibile (bianco su scuro) */
                }
                .elfsight-app-04e5f5df-92af-4c4f-b2f9-c605cd4b28c7 [class*="LoadMore"] {
                  color: #ffffff !important;
                }
                .elfsight-app-04e5f5df-92af-4c4f-b2f9-c605cd4b28c7 [class*="ReviewText"] a {
                  color: #ad9271 !important;
                }
              `}} />
              <Script src="https://apps.elfsight.com/p/platform.js" strategy="lazyOnload" />
              <div className="elfsight-app-04e5f5df-92af-4c4f-b2f9-c605cd4b28c7"></div>
            </div>
          </div>
        </section>

        {/* Mappa Sede Section */}
        <section className="py-20 sm:py-24 bg-white relative border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 h-[400px] rounded-2xl overflow-hidden shadow-lg border border-slate-200 relative group cursor-pointer bg-slate-100">
                <a href="https://www.google.com/maps/dir/?api=1&destination=Ciesse+Home+S.r.l.%2C+Nocera+Inferiore" target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                  <div className="absolute inset-0 bg-[#0e1f2b]/5 group-hover:bg-[#0e1f2b]/20 transition-colors z-10 flex items-center justify-center">
                    <div className="bg-white/95 backdrop-blur text-[#0e1f2b] font-bold px-6 py-3 rounded-full shadow-xl opacity-90 group-hover:opacity-100 transition-all transform group-hover:scale-105 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-[#ad9271]" />
                      Avvia Navigatore
                    </div>
                  </div>
                  <img 
                    src="/Immagini/mappa-ciesse.jpg" 
                    alt="Mappa Ciesse Home" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => { e.currentTarget.src = 'https://placehold.co/800x600/f1f5f9/94a3b8?text=Inserisci+Screenshot+Mappa' }} 
                  />
                </a>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0e1f2b] font-serif mb-6 leading-tight">
                  Vieni a toccare con mano
                </h2>
                <p className="text-lg text-slate-600 mb-8">
                  Fissa un appuntamento o passa a trovarci. Il nostro team di interior designer ti aspetta per progettare insieme la cucina dei tuoi sogni.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#ad9271]/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-[#ad9271]" />
                    </div>
                    <div>
                      <h4 className="text-[#0e1f2b] font-bold text-lg mb-1">Sede Operativa e Showroom</h4>
                      <p className="text-slate-600">Località Fosso Imperatore, Lotto 14<br/>84014 Nocera Inferiore (SA)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#ad9271]/10 flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-[#ad9271]" />
                    </div>
                    <div>
                      <h4 className="text-[#0e1f2b] font-bold text-lg mb-1">Telefono</h4>
                      <p className="text-slate-600">081 277 8023</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact" className="relative py-24 border-t border-[#ad9271]/20 bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/Immagini/showroom2.jpg')" }}>
          <div className="absolute inset-0 bg-[#0e1f2b]/80 backdrop-blur-[2px]"></div>
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-white/20">
              <div className="bg-[#0e1f2b] py-8 px-8 text-white border-b-4 border-[#ad9271]">
                {formData.kitchenId ? (
                  <>
                    <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#ad9271]">Scopri di più sul modello {formData.kitchenId}</h3>
                    <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                      Compilare il modulo <strong className="text-white bg-white/10 px-1 rounded">non ti vincola all&apos;acquisto</strong>. Lello ti contatterà su WhatsApp per mandarti <strong>foto reali e dettagli</strong> di questa cucina esatta, bloccando per te l&apos;<strong>Extra 10% di sconto</strong> (che si somma al -50% di listino) e il <strong>Trasporto e Montaggio Gratuiti</strong>.
                    </p>
                  </>
                ) : (
                  <>
                    <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#ad9271]">Richiedi Informazioni e Sblocca i Bonus</h3>
                    <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                      Compilare il modulo <strong className="text-white bg-white/10 px-1 rounded">non ti vincola all&apos;acquisto</strong>. Un nostro consulente ti invierà tutte le informazioni su WhatsApp e avrai automaticamente bloccato l&apos;<strong>Extra 10% di sconto</strong> (che si somma al -50% di listino) e il <strong>Trasporto e Montaggio Gratuiti</strong> se deciderai di venirci a trovare.
                    </p>
                  </>
                )}
              </div>
              <div className="p-8">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900">Ottima Scelta! Richiesta Inviata.</h4>
                    <p className="mt-2 text-slate-600">Riceverai a brevissimo un messaggio WhatsApp da Lello con tutte le informazioni.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1.5">
                          <User className="w-4 h-4 text-slate-400" /> Nome
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#ad9271] focus:border-[#ad9271] outline-none transition-shadow"
                          placeholder="Es. Mario"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1.5">
                          <User className="w-4 h-4 text-slate-400" /> Cognome (Opzionale)
                        </label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#ad9271] focus:border-[#ad9271] outline-none transition-shadow"
                          placeholder="Es. Rossi"
                        />
                      </div>
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
                    <div>
                      <label className="flex items-start gap-3 cursor-pointer p-2 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-100">
                        <input
                          type="checkbox"
                          checked={formData.wantsCatalog}
                          onChange={(e) => setFormData({ ...formData, wantsCatalog: e.target.checked })}
                          className="mt-0.5 w-5 h-5 text-[#ad9271] focus:ring-[#ad9271] border-slate-300 rounded cursor-pointer accent-[#ad9271]"
                        />
                        <span className="text-sm text-slate-600 leading-snug font-semibold mt-0.5">
                          Voglio ricevere anche il Catalogo Cucine in PDF su WhatsApp
                        </span>
                      </label>
                    </div>
                    <div>
                      <label className="flex items-start gap-3 cursor-pointer p-2 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-100">
                        <input
                          type="checkbox"
                          required
                          checked={formData.privacyAccepted}
                          onChange={(e) => setFormData({ ...formData, privacyAccepted: e.target.checked })}
                          className="mt-0.5 w-5 h-5 text-[#ad9271] focus:ring-[#ad9271] border-slate-300 rounded cursor-pointer accent-[#ad9271]"
                        />
                        <span className="text-sm text-slate-600 leading-snug">
                          Ho letto e accetto la <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-[#ad9271] font-semibold hover:underline">Privacy Policy</a>. Acconsento al trattamento dei miei dati personali per gestire la richiesta.
                        </span>
                      </label>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#ad9271] hover:bg-[#967d5f] text-white font-bold py-4 px-6 rounded-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 cursor-pointer text-lg uppercase tracking-wide mt-2"
                    >
                      {formData.kitchenId ? "Richiedi Info su WhatsApp" : "Richiedi Info e Blocca lo Sconto"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Sticky Bottom Bar for Mobile Only */}
      <div className="fixed bottom-0 left-0 w-full bg-[#ad9271] text-[#0e1f2b] py-3 px-4 z-50 shadow-[0_-4px_15px_rgba(0,0,0,0.15)] flex md:hidden justify-between items-center border-t border-white/20">
        <p className="text-xs sm:text-sm font-bold truncate">🎁 Blocca il modello: -50% + Extra -10% + Trasporto!</p>
        <a href="#contact" className="shrink-0 bg-[#0e1f2b] text-white text-xs sm:text-sm px-4 py-2 rounded-lg font-bold hover:bg-slate-800 transition-colors shadow-md">
          Richiedi Info
        </a>
      </div>

      <footer className="bg-[#0e1f2b] text-slate-400 py-12 pb-24 border-t border-[#0e1f2b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm flex flex-col items-center">
          <img src="/Loghi/logo-05.png" alt="Ciesse Home" className="h-8 w-auto mb-6 opacity-80 hover:opacity-100 transition-opacity" />
          <p>© {new Date().getFullYear()} Ciesse Home. Tutti i diritti riservati.</p>
          <p className="mt-2 text-slate-500">Promozione rinnovo locali soggetta a disponibilità limitata.</p>
        </div>
      </footer>
    </div>
  );
}

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Ciesse Home",
  description: "Informativa sulla Privacy di Ciesse Home",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#0e1f2b] font-sans selection:bg-[#ad9271] selection:text-white pb-20">
      {/* Simple Header */}
      <header className="bg-white border-b border-slate-200 py-6 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-[#ad9271] hover:text-[#967d5f] font-bold transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Torna alla pagina principale
          </Link>
          <div className="font-bold text-xl tracking-tight uppercase">Ciesse Home</div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-slate-100">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-8">
            Informativa sulla <span className="text-[#ad9271]">Privacy</span>
          </h1>
          
          <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-[#0e1f2b] prose-a:text-[#ad9271]">
            <p className="text-lg text-slate-600 mb-8">
              La presente Informativa sulla Privacy descrive le modalità di gestione del sito web in riferimento al trattamento dei dati personali degli utenti che lo consultano.
            </p>

            <div id="privacy-content">
              {/* Privacy Content will be injected here */}
              <p>Il titolare del trattamento dei dati è Ciesse Cucine. P.Iva 04540620657.</p>
              <h2>1. Finalità del Trattamento</h2>
              <p>I dati personali forniti dagli utenti sono utilizzati al solo fine di eseguire il servizio o la prestazione richiesta, in particolare per gestire le richieste di contatto, prenotazioni visite in showroom e l'invio di preventivi.</p>
              
              <h2>2. Modalità del Trattamento</h2>
              <p>Il trattamento dei dati avviene mediante strumenti informatici e/o telematici, con logiche strettamente correlate alle finalità indicate e, in ogni caso, in modo da garantire la sicurezza e la riservatezza dei dati stessi.</p>
              
              <h2>3. Conservazione dei Dati</h2>
              <p>I dati personali saranno conservati per il tempo strettamente necessario al conseguimento delle finalità per cui sono stati raccolti e nel rispetto dei termini di legge.</p>
              
              <h2>4. Diritti degli Interessati</h2>
              <p>I soggetti cui si riferiscono i dati personali hanno il diritto in qualunque momento di ottenere la conferma dell'esistenza o meno dei medesimi dati e di conoscerne il contenuto e l'origine, verificarne l'esattezza o chiederne l'integrazione o l'aggiornamento, oppure la rettificazione.</p>
              
              <p className="mt-8 text-sm text-slate-500">
                Ultimo aggiornamento: Luglio 2026. Per ulteriori dettagli sulla Privacy Policy completa di Ciesse Home, contatta il titolare del trattamento all'indirizzo email dedicato.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

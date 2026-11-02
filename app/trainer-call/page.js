'use client';

import TrainerVideoCall from '@/components/TrainerVideoCall';
import Link from 'next/link';
import { Dumbbell, PhoneCall, ArrowLeft, Video, ShieldCheck } from 'lucide-react';

export default function TrainerCallPage() {
  const WHATSAPP_NUMBER = '7981452169';
  const FORMATTED_PHONE = '+91 7981452169';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-lime-400 selection:text-slate-950 font-sans flex flex-col justify-between">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-900 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-lime-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-lime-500/20 group-hover:scale-105 transition-transform">
              <Dumbbell className="text-slate-950 w-5 h-5" />
            </div>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              ELITEFIT <span className="text-lime-400">HUB</span>
            </span>
          </Link>

          <nav className="flex items-center gap-4 sm:gap-6">
            <Link
              href="/"
              className="text-xs sm:text-sm font-semibold text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Link>

            <a
              href={`https://wa.me/91${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                'Hello Coach Raja! I would like to start a direct WhatsApp Video Call session for my fitness training.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-slate-950 font-extrabold bg-gradient-to-r from-[#25D366] to-emerald-400 hover:from-[#20bd5a] hover:to-emerald-300 transition-all text-xs sm:text-sm shadow-md shadow-[#25D366]/20 flex items-center gap-2"
            >
              <Video className="w-4 h-4 text-slate-950" />
              <span>Call WhatsApp: {WHATSAPP_NUMBER}</span>
            </a>
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 flex-1 w-full">
        <TrainerVideoCall isStandalone={true} />
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-900 py-10 px-6 bg-slate-950/60">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-lime-400/10 flex items-center justify-center">
              <Dumbbell className="text-lime-400 w-4 h-4" />
            </div>
            <span className="font-bold text-white">EliteFit Hub • Trainer Video Line</span>
          </div>
          <p className="text-xs text-slate-400">
            Direct WhatsApp Trainer Line: <strong className="text-lime-400">{FORMATTED_PHONE}</strong> • Available 7 Days a Week
          </p>
          <div className="flex gap-4 text-xs">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/trainer-call" className="hover:text-white transition-colors text-lime-400">Video Call</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

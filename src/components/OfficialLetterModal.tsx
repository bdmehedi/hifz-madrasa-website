import React from 'react';
import { X, Printer, FileText, CheckCircle2 } from 'lucide-react';
import { OfficialLetter, Language } from '../types';

interface OfficialLetterModalProps {
  lang: Language;
  letter: OfficialLetter;
  onClose: () => void;
}

export const OfficialLetterModal: React.FC<OfficialLetterModalProps> = ({
  lang,
  letter,
  onClose
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-sm print:p-0 print:bg-white overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-4 sm:p-8 shadow-2xl border border-slate-200 my-auto print:shadow-none print:border-none print:m-0 print:p-0">
        
        {/* Top Control Bar - Hidden during printing */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 print:hidden">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
              <FileText className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-800">
                {lang === 'bn' ? 'অফিসিয়াল চিঠি ও দাপ্তরিক স্মারকপত্র' : 'Official Administrative Letter / Memo'}
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                স্মারক নং: {letter.smarakNo} | তারিখ: {letter.date}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-sm transition"
            >
              <Printer className="w-4 h-4" />
              <span>{lang === 'bn' ? 'লেটারহেড প্রিন্ট / PDF' : 'Print Letterhead'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ================= Printable Authentic Madrasa Letterhead Pad ================= */}
        <div className="mt-4 p-6 sm:p-10 bg-white border border-slate-300 rounded-2xl shadow-sm text-slate-900 print:border-none print:shadow-none print:p-0 print:m-0 min-h-[600px] flex flex-col justify-between">
          
          <div>
            {/* Top Official Letterhead Header */}
            <div className="text-center pb-4 border-b-2 border-emerald-900">
              <p className="font-serif text-lg text-emerald-950 font-bold mb-1">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                <div className="text-left sm:text-left">
                  <h1 className="text-2xl font-black text-emerald-950 font-serif tracking-tight">
                    দারুল কুরআন একাডেমি
                  </h1>
                  <p className="text-xs font-bold text-slate-600">
                    তাহফিজুল কুরআনুল কারীম ও কওমি দ্বীনি শিক্ষাবোর্ড
                  </p>
                  <p className="text-[10px] text-slate-500 font-mono">
                    গভ. রেজি নং: DQA-2018/902 | বেফাক অন্তর্ভুক্তি: ৭২২১
                  </p>
                </div>
                
                <div className="text-right sm:text-right text-[11px] text-slate-600 space-y-0.5 border-t sm:border-t-0 pt-1 sm:pt-0">
                  <p className="font-semibold text-slate-800">উত্তরা মডেল টাউন, ঢাকা-১২৩০</p>
                  <p>ফোন: +৮৮০ ১৭১১-১১২২৩৩, ০১৮২২-৩৩৪৪৫৫</p>
                  <p>ইমেইল: info@darulquran.edu.bd</p>
                  <p className="text-emerald-800 font-mono text-[10px]">www.darulquran.edu.bd</p>
                </div>
              </div>
            </div>

            {/* Decorative Gold/Emerald Accent Line */}
            <div className="h-1 bg-gradient-to-r from-emerald-800 via-amber-500 to-emerald-800 my-1"></div>

            {/* Smarak No & Date Reference Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs py-3 border-b border-slate-200 text-slate-700 font-semibold gap-1">
              <div>
                স্মারক নং: <span className="font-bold text-emerald-900 font-mono">{letter.smarakNo}</span>
              </div>
              <div className="text-right">
                তারিখ: <span className="font-bold text-slate-900">{letter.date} খ্রিস্টাব্দ</span>
                {letter.hijriDate && (
                  <span className="text-slate-500 ml-1 font-normal">({letter.hijriDate})</span>
                )}
              </div>
            </div>

            {/* Recipient Block */}
            <div className="mt-5 space-y-0.5 text-xs sm:text-sm text-slate-800">
              <p className="font-bold text-slate-900">বরাবর,</p>
              <p className="font-extrabold text-emerald-950">{letter.recipient}</p>
              {letter.recipientAddress && (
                <p className="text-slate-600">{letter.recipientAddress}</p>
              )}
            </div>

            {/* Subject Line */}
            <div className="mt-4 pb-1 text-xs sm:text-sm">
              <span className="font-bold text-slate-900 underline decoration-2 decoration-emerald-800 underline-offset-4">
                বিষয়: {letter.subject}
              </span>
            </div>

            {/* Salutation */}
            <div className="mt-4 text-xs sm:text-sm text-slate-800">
              <p className="font-semibold">মুহতারাম,</p>
              <p className="italic font-serif text-slate-700 mt-1">
                আসসালামু আলাইকুম ওয়া রাহমাতুল্লাহি ওয়া বারাকাতুহ্।
              </p>
            </div>

            {/* Letter Main Content Body */}
            <div className="mt-4 space-y-3 text-xs sm:text-sm text-slate-800 leading-relaxed text-justify whitespace-pre-line">
              {letter.content}
            </div>

          </div>

          {/* Bottom Section: Footer, Signatures & Copies */}
          <div className="mt-12 pt-4">
            
            {/* Signatory Block */}
            <div className="flex items-end justify-between">
              
              {/* Left: Official Circular Seal */}
              <div className="w-20 h-20 rounded-full border-2 border-dashed border-emerald-700 bg-emerald-50/30 flex flex-col items-center justify-center p-1 text-center select-none">
                <span className="text-[9px] font-black text-emerald-900">দারুল কুরআন একাডেমি</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-700 my-0.5" />
                <span className="text-[7px] text-slate-500 uppercase font-mono">OFFICIAL SEAL</span>
              </div>

              {/* Right: Sender Signature */}
              <div className="text-right space-y-1">
                <p className="text-xs text-slate-600 italic">ওয়াসসালাম ও দোয়াপ্রার্থী,</p>
                <div className="h-10 flex items-end justify-end">
                  <span className="font-serif italic text-base font-black text-emerald-950 border-b border-slate-500 pb-0.5 px-4 inline-block">
                    {letter.sender}
                  </span>
                </div>
                <p className="text-xs font-bold text-slate-900">{letter.senderTitle}</p>
                <p className="text-[11px] text-slate-500">দারুল কুরআন একাডেমি, ঢাকা</p>
              </div>

            </div>

            {/* Copies To (অনুলিপি) */}
            {letter.copiesTo && letter.copiesTo.length > 0 && (
              <div className="mt-8 pt-3 border-t border-slate-200 text-[11px] text-slate-600">
                <p className="font-bold text-slate-700 mb-1">অবগতি ও প্রয়োজনীয় ব্যবস্থা গ্রহণের জন্য অনুলিপি প্রেরিত হলো:</p>
                <ol className="list-decimal list-inside space-y-0.5 text-slate-600">
                  {letter.copiesTo.map((copy, idx) => (
                    <li key={idx}>{copy}</li>
                  ))}
                </ol>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  ExternalLink, 
  Copy, 
  Check, 
  Phone, 
  Clock, 
  Car, 
  Train, 
  Bus, 
  Building2, 
  Layers, 
  Compass,
  Sparkles,
  Info
} from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../utils/translations';

interface MadrasaMapLocationProps {
  lang: Language;
}

export const MadrasaMapLocation: React.FC<MadrasaMapLocationProps> = ({ lang }) => {
  const [mapType, setMapType] = useState<'m' | 'k' | 'h'>('m'); // m: roadmap, k: satellite, h: hybrid
  const [copied, setCopied] = useState<boolean>(false);

  // Exact coordinates for Mirpur-11, Block-D, Road-5, Dhaka
  const latitude = 23.822340;
  const longitude = 90.365420;
  const addressBn = 'বাড়ি-১৪, রোড-০৫, ব্লক-ডি, মিরপুর-১১, ঢাকা-১২১৬';
  const addressEn = 'House-14, Road-05, Block-D, Mirpur-11, Dhaka-1216';
  const madrasaNameBn = 'হিফজ মাদ্রাসা';
  const madrasaNameEn = 'Hifz Madrasa';

  const fullAddress = lang === 'bn' ? addressBn : addressEn;
  const madrasaName = lang === 'bn' ? madrasaNameBn : madrasaNameEn;

  // Direct Google Maps navigation URL (turn-by-turn directions from user's current location)
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
  
  // Direct Google Maps search/view URL
  const viewMapUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  // Interactive embed URL with customizable view type
  const embedUrl = `https://maps.google.com/maps?q=${latitude},${longitude}+(${encodeURIComponent(madrasaName + ' - ' + fullAddress)})&t=${mapType}&z=16&ie=UTF8&iwloc=&output=embed`;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="madrasa-map-location" className="space-y-6">
      {/* Section Title & Context */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-emerald-800">
            <Compass className="w-5 h-5 text-emerald-700 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
              {lang === 'bn' ? 'ক্যাম্পাস পরিচিতি ও লোকেশন' : 'Campus Location & Directions'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            {lang === 'bn' ? 'গুগল ম্যাপে মাদ্রাসার অবস্থান ও যাতায়াত নির্দেশিকা' : 'Madrasa Location & Google Map Navigation'}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {lang === 'bn'
              ? 'অভিভাবক ও শুভানুধ্যায়ীদের সরাসরি ক্যাম্পাসে আগমনের জন্য সহজ পথনির্দেশ ও লাইভ গুগল ম্যাপ'
              : 'Easily navigate and visit our campus via Google Maps turn-by-turn directions'}
          </p>
        </div>

        {/* Action Button: Get Directions */}
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          <Navigation className="w-4 h-4 text-emerald-300" />
          <span>{lang === 'bn' ? 'গুগল ম্যাপে দিকনির্দেশনা পান' : 'Get Directions on Google Maps'}</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-80" />
        </a>
      </div>

      {/* Main Map & Contact Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Interactive Google Map Frame (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-3">
          
          {/* Map Top Bar Controls */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                <span>{lang === 'bn' ? 'মিরপুর-১১ ক্যাম্পাস' : 'Mirpur-11 Campus'}</span>
              </span>
            </div>

            {/* Map Style Controls (Roadmap vs Satellite) */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-[11px] font-bold">
              <button
                type="button"
                onClick={() => setMapType('m')}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                  mapType === 'm' ? 'bg-white text-emerald-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lang === 'bn' ? 'ম্যাপ' : 'Map'}
              </button>
              <button
                type="button"
                onClick={() => setMapType('k')}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                  mapType === 'k' ? 'bg-white text-emerald-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lang === 'bn' ? 'স্যাটেলাইট' : 'Satellite'}
              </button>
              <button
                type="button"
                onClick={() => setMapType('h')}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                  mapType === 'h' ? 'bg-white text-emerald-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lang === 'bn' ? 'হাইব্রিড' : 'Hybrid'}
              </button>
            </div>
          </div>

          {/* Embedded Google Map */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner">
            <iframe
              src={embedUrl}
              title={lang === 'bn' ? 'মাদ্রাসার গুগল ম্যাপ লোকেশন' : 'Madrasa Google Map Location'}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />

            {/* Floating Quick Action Overlay inside Map */}
            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              <a
                href={viewMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-white/95 hover:bg-white text-slate-800 text-xs font-bold rounded-xl shadow-md border border-slate-200 flex items-center gap-1.5 transition backdrop-blur-xs cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5 text-emerald-700" />
                <span>{lang === 'bn' ? 'বড় ম্যাপে দেখুন' : 'View Larger Map'}</span>
              </a>
            </div>
          </div>

          {/* Bottom Bar: Address & Quick Copy */}
          <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-start gap-2 text-slate-700">
              <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block">{madrasaName}</span>
                <span className="text-slate-600">{fullAddress}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopyAddress}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition flex items-center justify-center gap-1.5 self-start sm:self-auto shrink-0 cursor-pointer border ${
                copied 
                  ? 'bg-emerald-100 border-emerald-300 text-emerald-800' 
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{lang === 'bn' ? 'ঠিকানা কপি হয়েছে!' : 'Address Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>{lang === 'bn' ? 'ঠিকানা কপি' : 'Copy Address'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right: How to Reach & Commute Guide (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Commute Options Cards */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Navigation className="w-4 h-4 text-emerald-700" />
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                {lang === 'bn' ? 'মাদ্রাসায় সহজে আসার উপায়' : 'How to Reach the Madrasa'}
              </h3>
            </div>

            <div className="space-y-3">
              {/* Option 1: Metro Rail */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Train className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-950">
                      {lang === 'bn' ? 'মেট্রোরেল (এমআরটি লাইন-৬)' : 'Metro Rail (MRT Line-6)'}
                    </span>
                    <span className="px-1.5 py-0.2 bg-emerald-200 text-emerald-900 text-[10px] font-black rounded">
                      {lang === 'bn' ? 'মাত্র ৩ মিনিট' : '3 mins'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {lang === 'bn'
                      ? 'মিরপুর-১১ মেট্রোরেল স্টেশনে নেমে পূর্ব পাশের এক্সিট দিয়ে বের হয়ে ৫ নং রোডে ঢুকলেই হাতের বামে ১৪ নং বাড়ি।'
                      : 'Exit at Mirpur-11 Metro Station (East Exit), enter Road-5, House-14 on the left.'}
                  </p>
                </div>
              </div>

              {/* Option 2: Public Bus */}
              <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Bus className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-amber-950">
                    {lang === 'bn' ? 'পাবলিক বাস সার্ভিস' : 'Public Bus Service'}
                  </span>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {lang === 'bn'
                      ? 'মিরপুর ১০ বা ১২ গামী যেকোনো বাসে মিরপুর-১১ বাসস্ট্যান্ডে নামতে হবে। সেখান থেকে রিকশায় ৫ মিনিট অথবা পায়ে হেঁটে মাত্র ৮ মিনিট।'
                      : 'Take any bus to Mirpur-11 Bus Stand. 5 minutes by rickshaw or 8 minutes walking distance.'}
                  </p>
                </div>
              </div>

              {/* Option 3: Private Car / Bike / CNG */}
              <div className="p-3.5 rounded-2xl bg-teal-50/60 border border-teal-200/80 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-teal-700 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Car className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-teal-950">
                    {lang === 'bn' ? 'ব্যক্তিগত গাড়ি, বাইক ও সিএনজি' : 'Car, Bike & CNG Parking'}
                  </span>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {lang === 'bn'
                      ? 'মিরপুর মেইন এভিনিউ থেকে সরাসরি ব্লক-ডি ৫ নং রোড। মাদ্রাসার নিজস্ব আঙিনায় নিরাপদ গাড়ি ও মোটরসাইকেল পার্কিং ব্যবস্থা রয়েছে।'
                      : 'Direct road access to Block-D, Road-5. Safe dedicated parking available in campus grounds.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Landmark Box */}
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-1">
              <span className="font-bold text-slate-900 flex items-center gap-1.5 text-[11px]">
                <Building2 className="w-3.5 h-3.5 text-slate-600" />
                <span>{lang === 'bn' ? 'নিকটবর্তী সুপরিচিত ল্যান্ডমার্ক:' : 'Nearby Landmarks:'}</span>
              </span>
              <p className="text-[11px] text-slate-600">
                {lang === 'bn'
                  ? 'মিরপুর-১১ নান্না বিরিয়ানি মোড় থেকে ২০০ মিটার পূর্ব দিকে এবং বায়তুল মামুর জামে মসজিদ সংলগ্ন।'
                  : '200m east of Nanna Biryani circle, adjacent to Baitul Ma’mur Jame Mosque.'}
              </p>
            </div>
          </div>

          {/* Visiting Hours & Helpline Card */}
          <div className="bg-gradient-to-br from-emerald-900 to-teal-950 text-white rounded-3xl p-5 shadow-sm space-y-3 border border-emerald-700/40">
            <div className="flex items-center justify-between pb-2 border-b border-emerald-800/80">
              <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'সাক্ষাৎ ও অফিস সময়' : 'Visiting & Office Hours'}</span>
              </span>
              <span className="text-[10px] bg-emerald-800 text-emerald-200 px-2 py-0.5 rounded-full font-bold">
                {lang === 'bn' ? 'শনি - বৃহস্পতি' : 'Sat - Thu'}
              </span>
            </div>

            <div className="space-y-1.5 text-xs text-emerald-100">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-300">{lang === 'bn' ? 'অফিস খোলা:' : 'Office Open:'}</span>
                <span className="font-bold text-white">{lang === 'bn' ? 'সকাল ৮:০০ - বিকাল ৫:০০' : '8:00 AM - 5:00 PM'}</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-300">{lang === 'bn' ? 'অভিভাবক সাক্ষাৎ:' : 'Parent Visiting:'}</span>
                <span className="font-bold text-amber-300">{lang === 'bn' ? 'আসর হতে মাগরিব / জুমার পর' : 'Asr to Maghrib / Post-Jummah'}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-emerald-800/80 flex items-center justify-between gap-2">
              <a
                href="tel:+8801712345678"
                className="flex-1 py-2 px-3 bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold text-xs rounded-xl text-center transition flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Phone className="w-3.5 h-3.5 text-amber-900" />
                <span>{lang === 'bn' ? 'সরাসরি কল দিন' : 'Call Campus'}</span>
              </a>

              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-3 bg-emerald-800/80 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl text-center transition flex items-center justify-center gap-1 border border-emerald-700"
                title={lang === 'bn' ? 'গুগল ম্যাপে নেভিগেশন' : 'Google Maps Navigation'}
              >
                <Navigation className="w-3.5 h-3.5 text-emerald-300" />
                <span>{lang === 'bn' ? 'ম্যাপে যান' : 'Maps'}</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

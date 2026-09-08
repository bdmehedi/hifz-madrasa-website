import React from 'react';
import { 
  BookOpen, 
  MapPin, 
  Phone, 
  Mail, 
  Heart, 
  ShieldCheck, 
  Calendar, 
  CheckCircle,
  CreditCard
} from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../utils/translations';

interface FooterProps {
  lang: Language;
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t-4 border-emerald-600">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        
        {/* Col 1: Madrasa Bio & Mission */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-amber-300 font-bold shadow-md">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white leading-snug">{getTranslation(lang, 'madrasaName')}</h2>
              <p className="text-xs text-emerald-400 font-['Amiri']">دَارُ الْقُرْآنِ الْكَرِيمِ</p>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            {lang === 'bn' 
              ? 'আন্তর্জাতিক মানের সহীহ তাজবীদে হিফজুল কুরআন, নূরানী মক্তব ও শিক্ষার্থীদের চারিত্রিক গুণাবলী অর্জনে নিবেদিত একটি আধুনিক দ্বীনি শিক্ষাপ্রতিষ্ঠান।' 
              : 'Dedicated to authentic Quran memorization with Tajweed, Noorani foundational Maktab, and moral character development in a modern digital Islamic learning environment.'}
          </p>
          <div className="flex items-center gap-2 text-xs text-amber-400 bg-emerald-950/60 p-2.5 rounded-lg border border-emerald-800/60">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{lang === 'bn' ? 'বেফাকুল মাদারিসিল আরাবিয়া অধিভুক্ত' : 'Affiliated with Certified Islamic Madrasa Board'}</span>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-700 pb-1.5 flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span>{lang === 'bn' ? 'প্রয়োজনীয় লিংক' : 'Quick Navigation'}</span>
          </h3>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => onNavigate('diary')} className="hover:text-emerald-400 transition flex items-center gap-1.5">
                <span className="text-emerald-500">›</span> {getTranslation(lang, 'navDiary')}
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('gallery')} className="hover:text-emerald-400 transition flex items-center gap-1.5">
                <span className="text-emerald-500">›</span> {getTranslation(lang, 'navGallery')}
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('blog')} className="hover:text-emerald-400 transition flex items-center gap-1.5">
                <span className="text-emerald-500">›</span> {getTranslation(lang, 'navBlog')}
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('result')} className="hover:text-emerald-400 transition flex items-center gap-1.5">
                <span className="text-emerald-500">›</span> {getTranslation(lang, 'navResult')}
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('admission')} className="hover:text-emerald-400 transition flex items-center gap-1.5">
                <span className="text-emerald-500">›</span> {getTranslation(lang, 'navAdmission')}
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('fees')} className="hover:text-emerald-400 transition flex items-center gap-1.5">
                <span className="text-emerald-500">›</span> {getTranslation(lang, 'navFees')}
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('notices')} className="hover:text-emerald-400 transition flex items-center gap-1.5">
                <span className="text-emerald-500">›</span> {getTranslation(lang, 'navNotices')}
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('routine')} className="hover:text-emerald-400 transition flex items-center gap-1.5">
                <span className="text-emerald-500">›</span> {getTranslation(lang, 'navRoutine')}
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Contact & Office */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-700 pb-1.5 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-emerald-500" />
            <span>{lang === 'bn' ? 'যোগাযোগ ও ঠিকানা' : 'Contact & Campus'}</span>
          </h3>
          <ul className="space-y-2.5 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{getTranslation(lang, 'address')}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{getTranslation(lang, 'phone')}</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{getTranslation(lang, 'email')}</span>
            </li>
            <li className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{lang === 'bn' ? 'অফিস খোলা: শনি - বৃহস্পতি (সকাল ৮:০০ - বিকাল ৫:০০)' : 'Office Hours: Sat - Thu (8:00 AM - 5:00 PM)'}</span>
            </li>
          </ul>
        </div>

        {/* Col 4: Sadqah Jariyah & Online Fee Portal */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-700 pb-1.5 flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-rose-400" />
            <span>{lang === 'bn' ? 'সাদক্বায়ে জারিয়া ও অনুদান' : 'Donation & Sadqah'}</span>
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            {lang === 'bn'
              ? 'অসহায় এতিম হাফেজ শিক্ষার্থীদের পড়াশোনা ও হিফজ স্পনসরশিপের জন্য আপনার যাকাত ও সদকা প্রদান করুন।'
              : 'Sponsor orphan and underprivileged Huffaz students through your Zakat and voluntary Sadqah.'}
          </p>
          <div className="p-3 bg-slate-800/90 rounded-xl border border-slate-700 space-y-1.5 text-xs">
            <div className="flex items-center justify-between text-slate-300">
              <span className="font-semibold">{lang === 'bn' ? 'বিকাশ / নগদ (মার্চেন্ট):' : 'bKash / Nagad:'}</span>
              <span className="font-mono text-amber-300 font-bold">01712-345678</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="font-semibold">{lang === 'bn' ? 'ইসলামী ব্যাংক হিসাব:' : 'Islami Bank A/C:'}</span>
              <span className="font-mono text-emerald-400 font-bold">20501234567890</span>
            </div>
          </div>
          <button
            onClick={() => onNavigate('fees')}
            className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm"
          >
            <CreditCard className="w-3.5 h-3.5 text-amber-300" />
            <span>{lang === 'bn' ? 'অনলাইন ফি ও ডোনেশন প্রদান' : 'Pay Online Fees / Sadqah'}</span>
          </button>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 pt-6 border-t border-slate-800 text-center flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
        <p>
          © {new Date().getFullYear()} {getTranslation(lang, 'madrasaName')}. {lang === 'bn' ? 'সর্বস্বত্ব সংরক্ষিত।' : 'All Rights Reserved.'}
        </p>
        <div className="flex items-center gap-4 text-slate-400">
          <span>{lang === 'bn' ? 'গোপনীয়তা নীতি' : 'Privacy Policy'}</span>
          <span>•</span>
          <span>{lang === 'bn' ? 'ব্যবহারের শর্তাবলী' : 'Terms of Service'}</span>
          <span>•</span>
          <span className="text-emerald-400">{lang === 'bn' ? 'নিরাপদ SSL এনক্রিপ্টযুক্ত পোর্টাল' : '256-Bit Encrypted Portal'}</span>
        </div>
      </div>
    </footer>
  );
};

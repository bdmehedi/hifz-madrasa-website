import React from 'react';
import { BookOpen, Award, CheckCircle2, Shield, Heart, Sparkles, Star } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../utils/translations';

interface AboutMadrasaProps {
  lang: Language;
}

export const AboutMadrasa: React.FC<AboutMadrasaProps> = ({ lang }) => {
  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-emerald-700/40">
        <div className="max-w-2xl space-y-3">
          <span className="px-3 py-1 bg-amber-400 text-amber-950 font-bold text-xs rounded-full inline-block">
            {lang === 'bn' ? 'মাদ্রাসার পরিচয় ও শিক্ষানীতি' : 'About Our Academy'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold">
            {getTranslation(lang, 'madrasaName')}
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            {lang === 'bn' 
              ? 'কুরআনুল কারীম মুখস্থকরণের সাথে সাথে সহীহ তাজবীদ, চরিত্র গঠন ও ডিজিটাল মনিটরিংয়ের মাধ্যমে একদল আলোকিত হাফেজে কুরআন গড়ে তোলাই আমাদের মূল লক্ষ্য।'
              : 'Nurturing sincere, well-grounded Huffaz through authentic Tajweed, continuous revision, and character refinement.'}
          </p>
        </div>
      </div>

      {/* 3 Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">সহীহ মাখরাজ ও তাজবীদ</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            আন্তর্জাতিক ক্বিরাআত স্ট্যান্ডার্ড অনুযায়ী লাহনে জলী (বড় ভুল) ও লাহনে খফী (সূক্ষ্ম ভুল) মুক্ত করে বিশুদ্ধ তিলাওয়াত শিক্ষা দেওয়া হয়।
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">মজবুত আমোখতা (দৌর) পদ্ধতি</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            শুধু নতুন সবক নয়, পেছনের সবকী ও সম্পূর্ণ মঞ্জিল নিয়মিত প্রতিদিন রিভিশন দিয়ে কুরআনকে আজীবন অন্তরে ধারণ করার নিশ্চয়তা।
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">ডিজিটাল ডায়েরি ও অভিভাবক সংযোগ</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            অভিভাবকদের জন্য সম্পূর্ণ স্বয়ংক্রিয় অনলাইন ড্যাশবোর্ড, রোজনামচা ট্র্যাকিং, ডিজিটাল উপস্থিতি ও ফি পরিশোধের আধুনিক সুবিধা।
          </p>
        </div>
      </div>

      {/* Facilities */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-slate-900">মাদ্রাসার বিশেষ সুযোগ-সুবিধাসমূহ</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>সম্পূর্ণ শীতাতপ নিয়ন্ত্রিত (AC) ও সিসিটিভি ক্যামেরায় সার্বক্ষণিক নিরাপত্তা ব্যবস্থা</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>পুষ্টিকর ৩ বেলার উন্নত স্বাস্থ্যসম্মত খাবার ও বিশুদ্ধ ফিল্টারকৃত পানি</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>হিফজের পাশাপাশি প্রাথমিক বাংলা, ইংরেজি ও গণিত শিক্ষা</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>প্রতি মাসে ডাক্তার দ্বারা ফ্রি স্বাস্থ্য পরীক্ষা ও প্রাথমিক চিকিৎসা</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>অভিভাবকদের সাথে নিয়মিত মাসিক মতবিনিময় সভা ও মূল্যায়ন</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>হিফজ সমাপনীতে আন্তর্জাতিক সনদপত্র ও সম্মাননা পাগড়ি (দস্তারবন্দী) প্রদান</span>
          </div>
        </div>
      </div>
    </div>
  );
};

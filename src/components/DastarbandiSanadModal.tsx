import React from 'react';
import { X, Printer, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { DastarbandiSanad, Language } from '../types';

interface DastarbandiSanadModalProps {
  lang: Language;
  sanad: DastarbandiSanad;
  onClose: () => void;
}

export const DastarbandiSanadModal: React.FC<DastarbandiSanadModalProps> = ({
  lang,
  sanad,
  onClose
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-sm print:p-0 print:bg-white overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-4 sm:p-8 shadow-2xl border border-slate-200 my-auto print:shadow-none print:border-none print:m-0 print:p-0">
        
        {/* Top Action Bar (Hidden during print) */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 print:hidden">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
              <Award className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-800">
                {lang === 'bn' ? 'দস্তারবন্দী ও হিফজুল কুরআন সমাপনী সম্মাননা সনদপত্র' : 'Hifzul Quran Graduation & Sanad Certificate'}
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                সনদ নং: {sanad.sanadNo} | রেজি: {sanad.registrationNo}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-sm transition"
            >
              <Printer className="w-4 h-4" />
              <span>{lang === 'bn' ? 'সনদ প্রিন্ট / PDF সংরক্ষণ' : 'Print / Save PDF'}</span>
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

        {/* ================= Printable Authentic Islamic Sanad Certificate ================= */}
        <div className="mt-4 p-4 sm:p-8 bg-[#fbf9f4] border-[10px] border-double border-emerald-900 rounded-2xl relative overflow-hidden shadow-inner print:m-0 print:border-[8px] print:border-emerald-950 print:bg-white">
          
          {/* Ornamental Inner Border Frame */}
          <div className="border border-emerald-700/40 p-4 sm:p-6 rounded-lg relative">
            
            {/* Corner Decorative Ornaments */}
            <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-amber-600"></div>
            <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-amber-600"></div>
            <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-amber-600"></div>
            <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-amber-600"></div>

            {/* Faint Center Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
              <span className="text-[130px] font-bold text-emerald-950 font-serif">القرآن</span>
            </div>

            {/* Top Bismillah and Calligraphy */}
            <div className="text-center space-y-1.5 pb-4 border-b border-emerald-800/20 relative z-10">
              <p className="font-serif text-xl sm:text-2xl text-emerald-950 font-bold tracking-wide">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
              <p className="text-xs sm:text-sm text-emerald-900 font-semibold font-serif italic">
                "إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ" (سورة الحجر: ٩)
              </p>
              <div className="inline-block px-3 py-0.5 bg-amber-100/80 text-amber-900 text-[11px] font-bold rounded border border-amber-300/60 mt-1">
                "খায়রুকুম মান তা'আল্লামাল কুরআনা ওয়া আল্লামাহ্" — শ্রেষ্ঠ ব্যক্তি সে, যে নিজে কুরআন শিখে ও অন্যকে শেখায়
              </div>

              {/* Madrasa Official Name */}
              <div className="pt-2">
                <h1 className="text-xl sm:text-3xl font-black text-emerald-950 tracking-tight font-serif">
                  দারুল কুরআন একাডেমি তাহফিজুল কুরআন মাদ্রাসা
                </h1>
                <p className="text-xs sm:text-sm font-bold text-slate-700 mt-0.5">
                  উত্তরা মডেল টাউন, ঢাকা-১২৩০ | বাংলাদেশ
                </p>
                <p className="text-[11px] text-emerald-800 font-semibold">
                  (বেফাকুল মাদারিসিল আরাবিয়া বাংলাদেশ অধিভুক্ত ও তাহফিজুল কুরআন শিক্ষা বোর্ড কর্তৃক সনদপ্রাপ্ত)
                </p>
              </div>

              {/* Certificate Title Badge */}
              <div className="pt-3">
                <span className="px-6 py-1.5 bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 text-amber-100 text-sm sm:text-base font-extrabold rounded-full tracking-wider uppercase border border-amber-400/50 shadow inline-block">
                  দস্তারবন্দী ও হিফজুল কুরআন সমাপনী সম্মাননা সনদপত্র
                </span>
              </div>
            </div>

            {/* Certificate Serial and Reg No Row */}
            <div className="flex items-center justify-between text-xs py-3 border-b border-slate-200/80 text-slate-600 font-semibold relative z-10">
              <div>
                স্মারক ও সনদ নং: <span className="font-bold text-emerald-900 font-mono">{sanad.sanadNo}</span>
              </div>
              <div>
                রেজিস্ট্রেশন নং: <span className="font-bold text-slate-800 font-mono">{sanad.registrationNo}</span>
              </div>
              <div>
                ইস্যুর তারিখ: <span className="font-bold text-slate-800">{sanad.issueDate}</span>
              </div>
            </div>

            {/* Main Certificate Statement Body */}
            <div className="py-6 sm:py-8 text-center space-y-4 relative z-10">
              <p className="text-slate-600 text-xs sm:text-sm">
                আল্লাহ সুবহানাহু ওয়া তায়ালার অশেষ মেহেরবানীতে প্রত্যয়ন করা যাইতেছে যে—
              </p>

              {/* Student Name Highlight */}
              <div className="py-2">
                <span className="text-xl sm:text-3xl font-black text-emerald-900 border-b-2 border-dashed border-emerald-600 pb-1 px-4 inline-block font-serif">
                  {sanad.studentName}
                </span>
                {sanad.studentNameEn && (
                  <span className="block text-xs sm:text-sm text-slate-500 font-sans tracking-wide mt-1">
                    ({sanad.studentNameEn})
                  </span>
                )}
              </div>

              {/* Father, Mother & District Info */}
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed max-w-2xl mx-auto">
                পিতা: <span className="font-bold text-slate-900">{sanad.fatherName}</span>
                {sanad.motherName && <>, মাতা: <span className="font-bold text-slate-900">{sanad.motherName}</span></>}
                {sanad.district && <>, জেলা: <span className="font-bold text-slate-900">{sanad.district}</span></>},
                {' '}শিক্ষার্থী রোল: <span className="font-bold font-mono text-emerald-900">{sanad.studentRoll}</span>।
              </p>

              {/* Core Achievement Text */}
              <div className="bg-emerald-50/60 p-4 sm:p-5 rounded-xl border border-emerald-200/80 max-w-2xl mx-auto text-xs sm:text-sm text-slate-800 leading-relaxed">
                অত্র প্রতিষ্ঠানের তাহফিজুল কুরআনুল কারীম বিভাগ হইতে ইলমে তাজবীদ, মাখরাজ ও সিফাত সহকারে তারতীলের সাথে সহীহ শুদ্ধভাবে পবিত্র কুরআনুল কারীমের সম্পূর্ণ{' '}
                <span className="font-extrabold text-emerald-900 underline decoration-emerald-500 underline-offset-4">
                  ৩০ (ত্রিশ) পারা হিফজ
                </span>{' '}
                কৃতিত্বের সহিত সম্পন্ন করিয়াছেন।
                <br />
                তাহার নিরলস সাধনা ও মহৎ অর্জনের স্বীকৃতিস্বরূপ অত্র প্রতিষ্ঠানের বার্ষিক দস্তারবন্দী সমাবর্তন সম্মেলনে তাঁহাকে এই সম্মাননা পাগড়ি ও দস্তারবন্দী সনদপত্র প্রদান করা হইল।
              </div>

              {/* Remarks or Specific Honors */}
              {sanad.remarks && (
                <p className="text-xs text-slate-600 italic">
                  মূল্যায়ন মন্তব্য: "{sanad.remarks}"
                </p>
              )}
            </div>

            {/* Achievement Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs bg-white/80 p-3 rounded-xl border border-emerald-100 relative z-10 mb-8">
              <div>
                <span className="text-slate-400 block text-[10px]">হিফজের পরিমাণ:</span>
                <span className="font-extrabold text-emerald-900">{sanad.completedParas} পারা (সম্পূর্ণ কুরআন)</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">সমাপনী তারিখ:</span>
                <span className="font-bold text-slate-800">{sanad.completionDate}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">ফলাফলের মান / গ্রেড:</span>
                <span className="font-extrabold text-emerald-700">{sanad.grade}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">সনদের স্থিতি:</span>
                <span className="font-bold text-emerald-800 flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline" /> বৈধ ও সত্যায়িত
                </span>
              </div>
            </div>

            {/* Official Signatures and Seals Section */}
            <div className="pt-6 border-t border-emerald-800/20 grid grid-cols-3 gap-4 text-center text-xs relative z-10">
              
              {/* Signature 1: Head of Hifz */}
              <div className="space-y-1 flex flex-col items-center">
                <div className="h-10 flex items-end">
                  <span className="font-serif italic text-slate-700 text-sm font-bold border-b border-slate-400 pb-0.5 px-3">
                    ক্বারী আব্দুল্লাহ আল-মামুন
                  </span>
                </div>
                <span className="font-bold text-slate-800 block text-[11px] mt-1">হিফজ বিভাগীয় প্রধান</span>
                <span className="text-[10px] text-slate-500">তাহফিজুল কুরআন একাডেমি</span>
              </div>

              {/* Seal in Middle */}
              <div className="flex flex-col items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-dashed border-emerald-800/60 bg-emerald-50/50 flex flex-col items-center justify-center p-1 text-center shadow-sm">
                  <ShieldCheck className="w-6 h-6 text-emerald-800" />
                  <span className="text-[8px] font-extrabold text-emerald-950 uppercase mt-0.5">অফিসিয়াল সিল</span>
                  <span className="text-[7px] text-emerald-700">প্রতিষ্ঠিত ২০১৭</span>
                </div>
              </div>

              {/* Signature 2: Principal / Muhtamim */}
              <div className="space-y-1 flex flex-col items-center">
                <div className="h-10 flex items-end">
                  <span className="font-serif italic text-emerald-950 text-sm font-bold border-b border-slate-400 pb-0.5 px-3">
                    মুফতী মাহমুদ হাসান
                  </span>
                </div>
                <span className="font-bold text-emerald-900 block text-[11px] mt-1">প্রধান মুহতামিম ও পরিচালক</span>
                <span className="text-[10px] text-slate-500">দারুল কুরআন একাডেমি, ঢাকা</span>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Helper text for user */}
        <div className="mt-4 text-center text-xs text-slate-400 print:hidden">
          এই সনদটি A4 সাইজ পেপারে কালার প্রিন্ট করার জন্য উপযুক্ত করে প্রস্তুত করা হয়েছে।
        </div>

      </div>
    </div>
  );
};

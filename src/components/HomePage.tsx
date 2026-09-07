import React, { useState } from 'react';
import { 
  BookOpen, 
  Award, 
  GraduationCap, 
  CreditCard, 
  ClipboardList, 
  FileText, 
  Calendar, 
  ShieldCheck, 
  CheckCircle, 
  ArrowRight, 
  Phone, 
  Users, 
  Sparkles, 
  Heart,
  ChevronRight,
  Star,
  Quote,
  Image as ImageIcon,
  Maximize2,
  X
} from 'lucide-react';
import { Language, Student, Notice, SabaqDiaryEntry, Teacher, HeroSlide, GalleryItem } from '../types';
import { getTranslation } from '../utils/translations';
import { HeroSlider } from './HeroSlider';

interface HomePageProps {
  lang: Language;
  onNavigate: (view: string) => void;
  students: Student[];
  notices: Notice[];
  diaries: SabaqDiaryEntry[];
  teachers: Teacher[];
  slides?: HeroSlide[];
  galleryItems?: GalleryItem[];
}

export const HomePage: React.FC<HomePageProps> = ({
  lang,
  onNavigate,
  students,
  notices,
  diaries,
  teachers,
  slides = [],
  galleryItems = []
}) => {
  const latestNotices = notices.slice(0, 3);
  const activeSabaqs = diaries.slice(0, 3);
  const featuredGallery = galleryItems.slice(0, 4);

  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);

  return (
    <div className="space-y-12">
      
      {/* 1. Hero Slider Banner */}
      {slides.length > 0 ? (
        <HeroSlider 
          slides={slides} 
          lang={lang} 
          onNavigate={onNavigate} 
        />
      ) : (
        <section className="relative rounded-3xl bg-gradient-to-br from-emerald-900 via-teal-900 to-emerald-950 text-white p-6 sm:p-12 shadow-2xl overflow-hidden border border-emerald-700/40">
          <div className="relative z-10 max-w-3xl space-y-6">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              {getTranslation(lang, 'madrasaName')}
            </h1>
          </div>
        </section>
      )}

      {/* 2. Key Statistics Counters */}

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-emerald-100 shadow-sm text-center space-y-1 hover:shadow-md transition">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto mb-2 font-bold">
            <Users className="w-5 h-5" />
          </div>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">৩৫০+</span>
          <span className="text-xs text-slate-500 block font-semibold">{getTranslation(lang, 'totalStudents')}</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-amber-100 shadow-sm text-center space-y-1 hover:shadow-md transition">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto mb-2 font-bold">
            <Award className="w-5 h-5" />
          </div>
          <span className="text-2xl sm:text-3xl font-extrabold text-amber-600 font-mono">১২০+</span>
          <span className="text-xs text-slate-500 block font-semibold">{getTranslation(lang, 'totalHafiz')}</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-teal-100 shadow-sm text-center space-y-1 hover:shadow-md transition">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mx-auto mb-2 font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="text-2xl sm:text-3xl font-extrabold text-teal-700 font-mono">১২ জন</span>
          <span className="text-xs text-slate-500 block font-semibold">{getTranslation(lang, 'totalTeachers')}</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-blue-100 shadow-sm text-center space-y-1 hover:shadow-md transition">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mx-auto mb-2 font-bold">
            <CheckCircle className="w-5 h-5" />
          </div>
          <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono">১০০%</span>
          <span className="text-xs text-slate-500 block font-semibold">{getTranslation(lang, 'passRate')}</span>
        </div>
      </section>

      {/* 3. Quick Feature Cards */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              {lang === 'bn' ? 'আমাদের প্রধান সেবাসমূহ ও পোর্টাল' : 'Key Portals & Services'}
            </h2>
            <p className="text-xs text-slate-500">
              {lang === 'bn' ? 'অভিভাবক, শিক্ষক ও শিক্ষার্থীদের জন্য সমন্বিত ডিজিটাল সুযোগ-সুবিধা' : 'Integrated digital features for parents, teachers and students'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Digital Diary */}
          <div 
            onClick={() => onNavigate('diary')}
            className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-amber-400 transition cursor-pointer group space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
              <ClipboardList className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-700 transition">
              {lang === 'bn' ? 'দৈনিক ডিজিটাল ডায়েরি (সবক ট্র্যাকার)' : 'Digital Daily Sabaq Diary'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {lang === 'bn'
                ? 'প্রতিদিনের নতুন সবক, পেছনের সবকী ও আমোখতা রিভিশন মান সরাসরি অভিভাবকের মোবাইলে লাইভ দেখুন এবং ডিজিটাল স্বাক্ষর দিন।'
                : 'Track daily new Sabaq, Sabqi, and Amokhta revision with instant guardian digital signature.'}
            </p>
            <div className="flex items-center text-xs font-bold text-amber-700 gap-1 pt-1">
              <span>{lang === 'bn' ? 'ডায়েরি দেখুন' : 'View Diary'}</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 2: Online Fee & Receipts */}
          <div 
            onClick={() => onNavigate('fees')}
            className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-400 transition cursor-pointer group space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
              <CreditCard className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition">
              {lang === 'bn' ? 'অনলাইন ফি পেমেন্ট ও অটো-রসিদ' : 'Online Fee & Automatic Receipts'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {lang === 'bn'
                ? 'বিকাশ, নগদ বা ব্যাংকের মাধ্যমে যেকোনো সময় মাদ্রাসার মাসিক বেতন ও বোর্ডিং ফি নিরাপদে পরিশোধ করুন এবং অফিসিয়াল ভাউচার ডাউনলোড করুন।'
                : 'Pay monthly tuition and boarding fees securely via bKash, Nagad, and download instant receipts.'}
            </p>
            <div className="flex items-center text-xs font-bold text-emerald-700 gap-1 pt-1">
              <span>{lang === 'bn' ? 'ফি পরিশোধ করুন' : 'Pay Online'}</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 3: Exam Results */}
          <div 
            onClick={() => onNavigate('result')}
            className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-teal-400 transition cursor-pointer group space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition">
              {lang === 'bn' ? 'অনলাইন পরীক্ষার ফলাফল ও ট্রান্সক্রিপ্ট' : 'Exam Results & Marksheets'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {lang === 'bn'
                ? 'শিক্ষার্থীর রোল নম্বর দিয়ে ১ম সাময়িক, ২য় সাময়িক ও বার্ষিক পরীক্ষার সম্পূর্ণ নম্বরপত্র, গ্রেড ও উস্তাদের মন্তব্য সহজে ডাউনলোড ও প্রিন্ট করুন।'
                : 'Search results by student roll and download official detailed academic transcripts.'}
            </p>
            <div className="flex items-center text-xs font-bold text-teal-700 gap-1 pt-1">
              <span>{lang === 'bn' ? 'ফলাফল অনুসন্ধান' : 'Check Results'}</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Live Sabaq Highlight & Notice Board Preview Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Today's Sabaq Feed (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-700" />
              <h3 className="text-base font-bold text-slate-900">
                {lang === 'bn' ? 'আজকের হিফজ ক্লাসের সবক অগ্রগতি লাইভ' : "Today's Live Sabaq Highlights"}
              </h3>
            </div>
            <button
              onClick={() => onNavigate('diary')}
              className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
            >
              <span>{lang === 'bn' ? 'সকল ডায়েরি' : 'View All'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {activeSabaqs.map((entry) => {
              const st = students.find(s => s.id === entry.studentId);
              return (
                <div key={entry.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img 
                      src={st?.photoUrl || 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=100&auto=format&fit=crop&q=80'} 
                      alt={entry.studentId}
                      className="w-11 h-11 rounded-xl object-cover border"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-xs">{st?.name || 'শিক্ষার্থী'}</span>
                        <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                          পারা {entry.sabaqPara}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">
                        {entry.sabaqSurah} • {entry.sabaqPagesOrAyat}
                      </p>
                      <span className="text-[11px] text-slate-400">
                        মুয়াল্লিম: {entry.ustadName}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 inline-block">
                      {entry.sabaqQuality === 'excellent' ? 'ممتاز (অতি উত্তম)' : 'جيد جداً (উত্তম)'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Notice Board Preview (1 Col) */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-600" />
              <h3 className="text-base font-bold text-slate-900">
                {getTranslation(lang, 'navNotices')}
              </h3>
            </div>
            <button
              onClick={() => onNavigate('notices')}
              className="text-xs font-bold text-amber-700 hover:underline flex items-center gap-1"
            >
              <span>{lang === 'bn' ? 'সকল' : 'All'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {latestNotices.map((n) => (
              <div 
                key={n.id}
                onClick={() => onNavigate('notices')}
                className="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-200/80 hover:bg-amber-100/60 transition cursor-pointer space-y-1"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-mono text-slate-500">{n.date}</span>
                  {n.isPinned && (
                    <span className="px-1.5 py-0.2 bg-rose-500 text-white font-bold text-[9px] rounded">
                      জরুরি
                    </span>
                  )}
                </div>
                <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2">
                  {n.title}
                </h4>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* 5. Academic Departments Showcase */}
      <section className="space-y-4">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
            {lang === 'bn' ? 'পাঠদান বিভাগসমূহ' : 'Academic Departments'}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            {lang === 'bn' ? 'সহীহ কুরআন ও আদর্শ ইসলামী পাঠ্যক্রম' : 'Authentic Quranic Curriculum'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              ১
            </div>
            <h3 className="text-sm font-bold text-slate-900">{getTranslation(lang, 'deptHifz')}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              আন্তর্জাতিক সনদপ্রাপ্ত হাফেজ ও ক্বারীদের দ্বারা সম্পূর্ণ ৩০ পারা নির্ভুল হিফজ ও মজবুত আমোখতা পদ্ধতি।
            </p>
          </div>

          <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
              ২
            </div>
            <h3 className="text-sm font-bold text-slate-900">{getTranslation(lang, 'deptMaktab')}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              নূরানী কায়দা, আমপারা নাজেরা, মাখরাজ মস্ক, প্রয়োজনীয় মাসআলা, দৈনন্দিন দোয়া ও সালাতের বুনিয়াদি শিক্ষা।
            </p>
          </div>

          <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              ৩
            </div>
            <h3 className="text-sm font-bold text-slate-900">{getTranslation(lang, 'deptTajweed')}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              লাহনে জলী ও লাহনে খফী বর্জন, সিফাতে লাযিমাহ ও আরিদ্বাহ, সুললিত কণ্ঠে আন্তর্জাতিক ক্বিরাআত মস্ক।
            </p>
          </div>

          <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold">
              ৪
            </div>
            <h3 className="text-sm font-bold text-slate-900">{getTranslation(lang, 'deptKitab')}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              হিফজ সম্পন্নকারী ছাত্রদের জন্য আরবি ভাষা, ব্যাকরণ, হাদিস শরীফ ও কিতাব বিভাগের প্রাথমিক প্রস্তুতি।
            </p>
          </div>
        </div>
      </section>

      {/* 6. Featured Photo Gallery Highlights */}
      {featuredGallery.length > 0 && (
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1">
            <div>
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-emerald-700" />
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  {lang === 'bn' ? 'মাদ্রাসার ফটো ও কার্যক্রম গ্যালারি' : 'Campus & Photo Gallery Highlights'}
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {lang === 'bn' ? 'হিফজ ক্লাস, দস্তারবন্দী সমাবর্তন, পুরস্কার বিতরণী ও ক্যাম্পাস পরিবেশের নির্বাচিত ছবি' : 'Glimpses of Hifz classes, convocation, award ceremonies, and campus facilities'}
              </p>
            </div>

            <button
              onClick={() => onNavigate('gallery')}
              className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold rounded-xl transition flex items-center gap-1.5 self-start sm:self-auto shadow-sm"
            >
              <span>{lang === 'bn' ? 'সকল ছবি দেখুন' : 'View Full Gallery'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredGallery.map((item) => (
              <div
                key={item.id}
                onClick={() => setLightboxImage(item)}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg hover:border-emerald-400 transition cursor-pointer flex flex-col transform hover:-translate-y-0.5"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-sm text-amber-300 text-[10px] font-bold">
                      {lang === 'bn' ? item.categoryLabel : item.categoryLabelEn}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-9 h-9 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                </div>
                <div className="p-3.5 space-y-1">
                  <h3 className="text-xs font-bold text-slate-900 line-clamp-1 group-hover:text-emerald-800 transition">
                    {lang === 'bn' ? item.title : item.titleEn}
                  </h3>
                  <p className="text-[11px] text-slate-500 line-clamp-2">
                    {lang === 'bn' ? item.description : item.descriptionEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. Guardians Testimonial Quote */}
      <section className="rounded-3xl bg-amber-50/70 border border-amber-200/80 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-amber-800">
          <Quote className="w-6 h-6" />
          <h3 className="text-base font-bold">
            {lang === 'bn' ? 'অভিভাবকদের আন্তরিক অনুভূতি' : "Guardians' Testimonials"}
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
          “দারুল কুরআন মাদ্রাসার ডিজিটাল ডায়েরি সিস্টেমের কারণে আমরা ঘরে বসেই প্রতিদিনের সবক ও উস্তাদের মন্তব্য দেখতে পাই। অনলাইনে ফি দেওয়া এবং পরীক্ষার ফলাফল মার্কশিটসহ ডাউনলোড করা অত্যন্ত সহজ হয়েছে। উস্তাদদের আন্তরিক মেহনত ও যত্নে আমার সন্তান মাত্র ১ বছরে ১৪ পারা হিফজ সম্পন্ন করেছে। আলহামদুলিল্লাহ!”
        </p>
        <div className="flex items-center gap-3 pt-2">
          <div className="w-9 h-9 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center font-bold text-xs">
            র
          </div>
          <div>
            <span className="text-xs font-bold text-slate-900 block">মোহাম্মদ রফিকুল ইসলাম</span>
            <span className="text-[11px] text-slate-500">হিফজ বিভাগের শিক্ষার্থী আব্দুল্লাহর পিতা</span>
          </div>
        </div>
      </section>

      {/* Lightbox Preview Modal */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in"
          onClick={() => setLightboxImage(null)}
        >
          <div 
            className="bg-slate-950 text-white rounded-3xl overflow-hidden max-w-3xl w-full border border-emerald-800 shadow-2xl space-y-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 bg-slate-900 flex items-center justify-between border-b border-slate-800">
              <span className="px-2.5 py-1 rounded bg-emerald-800 text-amber-300 text-xs font-bold">
                {lang === 'bn' ? lightboxImage.categoryLabel : lightboxImage.categoryLabelEn}
              </span>
              <button
                onClick={() => setLightboxImage(null)}
                className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="max-h-[60vh] bg-black flex items-center justify-center">
              <img
                src={lightboxImage.imageUrl}
                alt={lightboxImage.title}
                className="max-h-[60vh] w-auto object-contain"
              />
            </div>
            <div className="p-4 bg-slate-900 space-y-1">
              <h3 className="text-sm font-bold text-emerald-300">
                {lang === 'bn' ? lightboxImage.title : lightboxImage.titleEn}
              </h3>
              <p className="text-xs text-slate-300">
                {lang === 'bn' ? lightboxImage.description : lightboxImage.descriptionEn}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};


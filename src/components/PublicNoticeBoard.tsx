import React, { useState } from 'react';
import { 
  FileText, 
  Calendar, 
  Search, 
  Tag, 
  Pin, 
  ChevronRight, 
  User, 
  X,
  Share2
} from 'lucide-react';
import { Language, Notice } from '../types';
import { getTranslation } from '../utils/translations';

interface PublicNoticeBoardProps {
  lang: Language;
  notices: Notice[];
}

export const PublicNoticeBoard: React.FC<PublicNoticeBoardProps> = ({
  lang,
  notices
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeNotice, setActiveNotice] = useState<Notice | null>(null);

  const filteredNotices = notices.filter(n => {
    const matchCategory = selectedCategory === 'all' || n.category === selectedCategory;
    const matchSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-800 via-amber-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-700/40">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center font-bold text-xl shadow">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">
              {getTranslation(lang, 'noticeTitle')}
            </h1>
            <p className="text-xs text-amber-200 mt-0.5">
              {getTranslation(lang, 'noticeDesc')}
            </p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-3 items-center justify-between">
        
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {['all', 'exam', 'holiday', 'hifz_sanad', 'admission', 'general'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                selectedCategory === cat
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' && 'সকল নোটিশ'}
              {cat === 'exam' && 'পরীক্ষা সংক্রান্ত'}
              {cat === 'holiday' && 'ছুটির বিজ্ঞপ্তি'}
              {cat === 'hifz_sanad' && 'দস্তারবন্দী ও সনদ'}
              {cat === 'admission' && 'ভর্তি সার্কুলার'}
              {cat === 'general' && 'সাধারণ'}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="নোটিশ খুঁজুন..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500"
          />
        </div>

      </div>

      {/* Notices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredNotices.map((n) => (
          <div
            key={n.id}
            onClick={() => setActiveNotice(n)}
            className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-amber-400 transition cursor-pointer flex flex-col justify-between space-y-3 group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
                  <Calendar className="w-3.5 h-3.5" />
                  {n.date}
                </span>

                <div className="flex items-center gap-1">
                  {n.isPinned && (
                    <span className="px-2 py-0.5 bg-rose-500 text-white rounded text-[10px] font-bold flex items-center gap-1">
                      <Pin className="w-3 h-3" />
                      জরুরি
                    </span>
                  )}
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-900 rounded text-[10px] font-bold">
                    {n.category}
                  </span>
                </div>
              </div>

              <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-800 transition leading-snug">
                {n.title}
              </h3>

              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {n.content}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400 font-semibold">
                প্রকাশনায়: {n.author}
              </span>
              <span className="text-amber-700 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>বিস্তারিত পড়ুন</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Notice Detail Modal */}
      {activeNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-150">
            
            <div className="flex items-start justify-between pb-3 border-b border-slate-200">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 bg-amber-100 text-amber-900 rounded text-[10px] font-bold">
                  {activeNotice.category.toUpperCase()}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {activeNotice.title}
                </h3>
                <span className="text-xs text-slate-400 font-mono block">
                  প্রকাশের তারিখ: {activeNotice.date} | প্রকাশক: {activeNotice.author}
                </span>
              </div>
              <button
                onClick={() => setActiveNotice(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-amber-50/30 p-4 rounded-2xl border border-amber-100">
              {activeNotice.content}
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-[11px] text-slate-400 font-medium">
                দারুল কুরআন হিফজুল কুরআন মাদ্রাসা
              </span>
              <button
                onClick={() => setActiveNotice(null)}
                className="px-5 py-2 bg-slate-800 text-white font-bold text-xs rounded-xl"
              >
                বন্ধ করুন
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

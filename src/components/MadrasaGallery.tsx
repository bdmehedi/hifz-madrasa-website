import React, { useState, useEffect } from 'react';
import { 
  Image as ImageIcon, 
  Search, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  Tag, 
  Plus, 
  Sparkles,
  Download,
  Share2,
  Filter
} from 'lucide-react';
import { Language, GalleryItem, User } from '../types';

interface MadrasaGalleryProps {
  items: GalleryItem[];
  lang: Language;
  currentUser: User | null;
  onAddNewItem?: (item: GalleryItem) => void;
}

export const MadrasaGallery: React.FC<MadrasaGalleryProps> = ({
  items,
  lang,
  currentUser,
  onAddNewItem
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New item form state
  const [newTitle, setNewTitle] = useState('');
  const [newTitleEn, setNewTitleEn] = useState('');
  const [newCategory, setNewCategory] = useState<'hifz' | 'dastarbandi' | 'campus' | 'award' | 'programs'>('hifz');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newDescriptionEn, setNewDescriptionEn] = useState('');

  const categories = [
    { id: 'all', labelBn: 'সকল ছবি', labelEn: 'All Photos' },
    { id: 'hifz', labelBn: 'হিফজুল কুরআন ও ক্লাস', labelEn: 'Hifz & Classes' },
    { id: 'dastarbandi', labelBn: 'দস্তারবন্দী ও সমাবর্তন', labelEn: 'Dastarbandi' },
    { id: 'award', labelBn: 'পুরস্কার ও প্রতিযোগিতা', labelEn: 'Awards & Honors' },
    { id: 'campus', labelBn: 'ক্যাম্পাস ও পরিবেশ', labelEn: 'Campus & Facilities' },
    { id: 'programs', labelBn: 'দোয়া ও মাহফিল', labelEn: 'Du\'a & Programs' },
  ];

  const filteredItems = items.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === 'Escape') {
        setActiveLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setActiveLightboxIndex((prev) => 
          prev !== null ? (prev + 1) % filteredItems.length : null
        );
      } else if (e.key === 'ArrowLeft') {
        setActiveLightboxIndex((prev) => 
          prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, filteredItems.length]);

  const activePhoto = activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null;

  const handleNextPhoto = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % filteredItems.length);
    }
  };

  const handlePrevPhoto = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const handleCreateItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newImageUrl.trim()) return;

    const catObj = categories.find(c => c.id === newCategory);

    const newItem: GalleryItem = {
      id: `gal-${Date.now()}`,
      title: newTitle.trim(),
      titleEn: newTitleEn.trim() || newTitle.trim(),
      category: newCategory,
      categoryLabel: catObj?.labelBn || 'অন্যান্য',
      categoryLabelEn: catObj?.labelEn || 'General',
      imageUrl: newImageUrl.trim(),
      date: new Date().toISOString().split('T')[0],
      description: newDescription.trim() || 'দারুল কুরআন একাডেমির কার্যক্রম।',
      descriptionEn: newDescriptionEn.trim() || 'Darul Quran Academy activities.'
    };

    if (onAddNewItem) {
      onAddNewItem(newItem);
    }

    // Reset & close
    setNewTitle('');
    setNewTitleEn('');
    setNewImageUrl('');
    setNewDescription('');
    setNewDescriptionEn('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Top Banner & Title */}
      <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-emerald-700/50 relative overflow-hidden">
        <div className="absolute right-4 -bottom-6 opacity-10 text-[140px] font-['Amiri'] select-none pointer-events-none hidden md:block">
          صُوَرٌ
        </div>

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-400/40 text-amber-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'মাদ্রাসা কার্যক্রম ও স্মৃতিচিহ্ন' : 'Madrasa Activities & Visual Archives'}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
            {lang === 'bn' ? 'ফটো ও মিডিয়া গ্যালারি' : 'Photo & Media Gallery'}
          </h1>

          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            {lang === 'bn'
              ? 'হিফজ মাদ্রাসার পাঠদান, বার্ষিক দস্তারবন্দী পাগড়ি প্রদান, জাতীয় ক্বিরাআত প্রতিযোগিতা, সুপরিসর ক্যাম্পাস ও দ্বীনি অনুষ্ঠানের মনোরম স্থিরচিত্র।'
              : 'Memorable moments of Quran memorization circles, annual convocation, campus facilities, and national award ceremonies.'}
          </p>

          {/* Admin Add Button */}
          {currentUser?.role === 'admin' && (
            <div className="pt-2">
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold text-xs rounded-xl shadow-lg transition flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>{lang === 'bn' ? 'নতুন ছবি যোগ করুন' : 'Add New Photo'}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Categories Tab Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-emerald-800 text-white shadow-md shadow-emerald-800/20'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <Tag className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-300' : 'text-slate-400'}`} />
                  <span>{lang === 'bn' ? cat.labelBn : cat.labelEn}</span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'bn' ? 'ছবি বা বিষয় অনুসন্ধান...' : 'Search photo or topic...'}
              className="w-full pl-9 pr-4 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none transition shadow-sm"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>

        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span>
            {lang === 'bn' 
              ? `মোট প্রদর্শিত ছবি: ${filteredItems.length} টি` 
              : `Showing ${filteredItems.length} photos`}
          </span>
          <span className="text-[11px] text-slate-400">
            {lang === 'bn' ? 'যেকোনো ছবিতে ক্লিক করে বড় করে দেখুন' : 'Click any photo to view in high resolution'}
          </span>
        </div>
      </div>

      {/* Photos Grid */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <ImageIcon className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-800">
            {lang === 'bn' ? 'কোনো ছবি খুঁজে পাওয়া যায়নি' : 'No photos found'}
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {lang === 'bn' ? 'অনুগ্রহ করে অন্য ক্যাটাগরি বা অনুসন্ধানী শব্দ দিয়ে চেষ্টা করুন।' : 'Try selecting another category or refining your search keywords.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxIndex(index)}
              className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-400 transition-all duration-300 cursor-pointer flex flex-col transform hover:-translate-y-1"
            >
              {/* Image Container with Zoom & Badge */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 backdrop-blur-md text-amber-300 text-[11px] font-bold border border-emerald-500/30 shadow-sm">
                    {lang === 'bn' ? item.categoryLabel : item.categoryLabelEn}
                  </span>
                </div>

                {/* Hover Overlay with Maximize Icon */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-11 h-11 rounded-full bg-white/90 text-emerald-950 flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>

                {/* Date Tag */}
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[10px] text-slate-200 font-mono flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-amber-400" />
                  <span>{item.date}</span>
                </div>
              </div>

              {/* Caption & Content */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2 group-hover:text-emerald-800 transition">
                    {lang === 'bn' ? item.title : item.titleEn}
                  </h3>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                    {lang === 'bn' ? item.description : item.descriptionEn}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-emerald-700 font-bold">
                  <span>{lang === 'bn' ? 'পূর্ণাঙ্গ ভিউ' : 'View Full Image'}</span>
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* High-Resolution Lightbox Modal */}
      {activePhoto !== null && activeLightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveLightboxIndex(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-emerald-900/60 flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar with Title & Close */}
            <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-white z-10">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-800 text-amber-300 text-xs font-bold">
                  {lang === 'bn' ? activePhoto.categoryLabel : activePhoto.categoryLabelEn}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {activeLightboxIndex + 1} / {filteredItems.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveLightboxIndex(null)}
                  className="p-2 rounded-full bg-slate-800 hover:bg-rose-900/70 text-slate-300 hover:text-white transition"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Image Area with Previous/Next controls */}
            <div className="relative flex-1 bg-black flex items-center justify-center min-h-[300px] max-h-[60vh] overflow-hidden">
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.title}
                className="max-h-full max-w-full object-contain select-none"
              />

              {/* Prev Button */}
              <button
                onClick={handlePrevPhoto}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-emerald-700 text-white border border-white/20 transition transform hover:scale-110"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                onClick={handleNextPhoto}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-emerald-700 text-white border border-white/20 transition transform hover:scale-110"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Caption Info */}
            <div className="p-5 bg-slate-900 text-white space-y-2 border-t border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h2 className="text-base sm:text-lg font-bold text-emerald-300">
                  {lang === 'bn' ? activePhoto.title : activePhoto.titleEn}
                </h2>
                <span className="text-xs text-slate-400 font-mono flex items-center gap-1 shrink-0">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  {activePhoto.date}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                {lang === 'bn' ? activePhoto.description : activePhoto.descriptionEn}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Admin Add New Photo Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-2xl border border-emerald-100 max-w-lg w-full overflow-hidden">
            <div className="bg-emerald-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-amber-300" />
                <h3 className="font-bold text-base">
                  {lang === 'bn' ? 'গ্যালারিতে নতুন ছবি যুক্ত করুন' : 'Add Photo to Gallery'}
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-emerald-200 hover:text-white rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateItem} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'bn' ? 'ছবির শিরোনাম (বাংলা)' : 'Title (Bengali)'}
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="যেমন: হিফজ সমাপনী ছাত্রদের পাগড়ি প্রদান"
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'bn' ? 'ছবির শিরোনাম (ইংরেজি)' : 'Title (English)'}
                </label>
                <input
                  type="text"
                  value={newTitleEn}
                  onChange={(e) => setNewTitleEn(e.target.value)}
                  placeholder="e.g. Annual Dastarbandi Ceremony"
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'bn' ? 'ক্যাটাগরি' : 'Category'}
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="hifz">হিফজ ও ক্লাস</option>
                    <option value="dastarbandi">দস্তারবন্দী ও সমাবর্তন</option>
                    <option value="award">পুরস্কার ও প্রতিযোগিতা</option>
                    <option value="campus">ক্যাম্পাস ও পরিবেশ</option>
                    <option value="programs">দোয়া ও মাহফিল</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'bn' ? 'ছবির লিংক (URL)' : 'Image URL'}
                  </label>
                  <input
                    type="url"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'bn' ? 'বিস্তারিত বিবরণ' : 'Description'}
                </label>
                <textarea
                  rows={2}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="ছবি সম্পর্কিত সংক্ষিপ্ত বিবরণ লিখুন..."
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl"
                >
                  {lang === 'bn' ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-md"
                >
                  {lang === 'bn' ? 'সংরক্ষণ করুন' : 'Save Photo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

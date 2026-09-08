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
  Play, 
  Video, 
  Film, 
  Clock, 
  ExternalLink,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { Language, GalleryItem, User } from '../types';

interface MadrasaGalleryProps {
  items: GalleryItem[];
  lang: Language;
  currentUser: User | null;
  onAddNewItem?: (item: GalleryItem) => void;
}

// Helpers for YouTube URL parsing
export function getYouTubeVideoId(url?: string): string | null {
  if (!url) return null;
  const regExp = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

export function getYouTubeEmbedUrl(url?: string): string | null {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) return null;
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
}

export function getEffectiveThumbnail(item: GalleryItem): string {
  if (item.imageUrl && item.imageUrl.trim()) {
    return item.imageUrl;
  }
  const ytId = getYouTubeVideoId(item.videoUrl);
  if (ytId) {
    return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
  }
  return 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=1000&auto=format&fit=crop&q=80';
}

export const MadrasaGallery: React.FC<MadrasaGalleryProps> = ({
  items,
  lang,
  currentUser,
  onAddNewItem
}) => {
  // Filters
  const [mediaTypeFilter, setMediaTypeFilter] = useState<'all' | 'image' | 'video'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Lightbox
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  
  // Add Media Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formMediaType, setFormMediaType] = useState<'image' | 'video'>('video');
  const [newTitle, setNewTitle] = useState('');
  const [newTitleEn, setNewTitleEn] = useState('');
  const [newCategory, setNewCategory] = useState<'hifz' | 'dastarbandi' | 'campus' | 'award' | 'programs' | 'recitation'>('dastarbandi');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [newDuration, setNewDuration] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newDescriptionEn, setNewDescriptionEn] = useState('');

  const categories = [
    { id: 'all', labelBn: 'সকল বিষয়', labelEn: 'All Topics' },
    { id: 'dastarbandi', labelBn: 'দস্তারবন্দী ও সমাবর্তন', labelEn: 'Dastarbandi Convocation' },
    { id: 'recitation', labelBn: 'ক্বিরাআত ও তিলাওয়াত', labelEn: 'Qiraat & Recitation' },
    { id: 'hifz', labelBn: 'হিফজুল কুরআন ও ক্লাস', labelEn: 'Hifz & Classes' },
    { id: 'award', labelBn: 'পুরস্কার ও প্রতিযোগিতা', labelEn: 'Awards & Honors' },
    { id: 'campus', labelBn: 'ক্যাম্পাস ও পরিবেশ', labelEn: 'Campus & Facilities' },
    { id: 'programs', labelBn: 'দোয়া ও মাহফিল', labelEn: 'Du\'a & Programs' },
  ];

  // Count photos & videos
  const totalPhotos = items.filter(i => (i.mediaType || 'image') === 'image').length;
  const totalVideos = items.filter(i => i.mediaType === 'video').length;

  const filteredItems = items.filter((item) => {
    const itemType = item.mediaType || 'image';
    const matchesMediaType = mediaTypeFilter === 'all' || itemType === mediaTypeFilter;
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.categoryLabel && item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesMediaType && matchesCat && matchesSearch;
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

  const activeItem = activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null;

  const handleNextItem = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % filteredItems.length);
    }
  };

  const handlePrevItem = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  // Auto-fill thumbnail from YouTube link if empty
  const handleVideoUrlChange = (url: string) => {
    setNewVideoUrl(url);
    if (!newImageUrl.trim()) {
      const ytId = getYouTubeVideoId(url);
      if (ytId) {
        setNewImageUrl(`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`);
      }
    }
  };

  const handleCreateItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    if (formMediaType === 'image' && !newImageUrl.trim()) return;
    if (formMediaType === 'video' && !newVideoUrl.trim() && !newImageUrl.trim()) return;

    const catObj = categories.find(c => c.id === newCategory);

    // If video and no custom thumbnail given, try extract from youtube
    let finalImageUrl = newImageUrl.trim();
    if (formMediaType === 'video' && !finalImageUrl && newVideoUrl.trim()) {
      const ytId = getYouTubeVideoId(newVideoUrl.trim());
      if (ytId) {
        finalImageUrl = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
      } else {
        finalImageUrl = 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=1000&auto=format&fit=crop&q=80';
      }
    }

    const newItem: GalleryItem = {
      id: `gal-${Date.now()}`,
      mediaType: formMediaType,
      title: newTitle.trim(),
      titleEn: newTitleEn.trim() || newTitle.trim(),
      category: newCategory,
      categoryLabel: catObj?.labelBn || 'সাধারণ',
      categoryLabelEn: catObj?.labelEn || 'General',
      imageUrl: finalImageUrl,
      videoUrl: formMediaType === 'video' ? newVideoUrl.trim() : undefined,
      duration: formMediaType === 'video' && newDuration.trim() ? newDuration.trim() : undefined,
      date: new Date().toISOString().split('T')[0],
      description: newDescription.trim() || (lang === 'bn' ? 'দারুল কুরআন একাডেমির মনোরম আয়োজন।' : 'Darul Quran Academy activities.'),
      descriptionEn: newDescriptionEn.trim() || 'Darul Quran Academy activities.'
    };

    if (onAddNewItem) {
      onAddNewItem(newItem);
    }

    // Reset & close
    setNewTitle('');
    setNewTitleEn('');
    setNewImageUrl('');
    setNewVideoUrl('');
    setNewDuration('');
    setNewDescription('');
    setNewDescriptionEn('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Top Banner & Title */}
      <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-emerald-700/50 relative overflow-hidden">
        <div className="absolute right-4 -bottom-6 opacity-10 text-[140px] font-['Amiri'] select-none pointer-events-none hidden md:block">
          مَرْئِيَّات
        </div>

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-400/40 text-amber-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'মাদ্রাসা কার্যক্রম ও মাল্টিমিডিয়া আর্কাইভ' : 'Madrasa Activities & Multimedia Archives'}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {lang === 'bn' ? 'ফটো ও ভিডিও গ্যালারি' : 'Photo & Video Gallery'}
          </h1>

          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed max-w-2xl">
            {lang === 'bn'
              ? 'হিফজুল কুরআন প্রশিক্ষণ, বার্ষিক দস্তারবন্দী পাগড়ি প্রদান, জাতীয় ক্বিরাআত প্রতিযোগিতা, মধুর তিলাওয়াত, প্রাত্যহিক সবক রুটিন ও ক্যাম্পাসের আকর্ষণীয় ছবি ও ভিডিও সমন্বিত তথ্যচিত্র।'
              : 'Memorable video documentaries, Quran recitation clips, annual graduation convocations, and vibrant photo records of daily Madrasa life.'}
          </p>

          {/* Quick Metrics & Admin Action */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-emerald-950/70 border border-emerald-600/40 px-3 py-1.5 rounded-xl text-xs text-emerald-200">
              <Film className="w-3.5 h-3.5 text-amber-400" />
              <span>
                {lang === 'bn' ? `ভিডিও: ${totalVideos} টি` : `Videos: ${totalVideos}`}
              </span>
              <span className="text-emerald-500">|</span>
              <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                {lang === 'bn' ? `স্থিরচিত্র: ${totalPhotos} টি` : `Photos: ${totalPhotos}`}
              </span>
            </div>

            {/* Admin Add Button */}
            {currentUser?.role === 'admin' && (
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold text-xs rounded-xl shadow-lg transition flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{lang === 'bn' ? 'নতুন ছবি / ভিডিও যোগ করুন' : 'Add New Photo/Video'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filter, Media Switcher & Search Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-4">
        
        {/* Row 1: Primary Media Type Tabs (All / Photos / Videos) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-2xl w-fit">
            <button
              onClick={() => setMediaTypeFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                mediaTypeFilter === 'all'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'সকল মিডিয়া' : 'All Media'}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${mediaTypeFilter === 'all' ? 'bg-emerald-950/60 text-amber-300' : 'bg-slate-200 text-slate-600'}`}>
                {items.length}
              </span>
            </button>

            <button
              onClick={() => setMediaTypeFilter('video')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                mediaTypeFilter === 'video'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Video className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'bn' ? 'ভিডিও গ্যালারি' : 'Videos'}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${mediaTypeFilter === 'video' ? 'bg-emerald-950/60 text-amber-300' : 'bg-slate-200 text-slate-600'}`}>
                {totalVideos}
              </span>
            </button>

            <button
              onClick={() => setMediaTypeFilter('image')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                mediaTypeFilter === 'image'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5 text-emerald-300" />
              <span>{lang === 'bn' ? 'ফটো গ্যালারি' : 'Photos'}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${mediaTypeFilter === 'image' ? 'bg-emerald-950/60 text-amber-300' : 'bg-slate-200 text-slate-600'}`}>
                {totalPhotos}
              </span>
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'bn' ? 'ভিডিও বা বিষয় অনুসন্ধান...' : 'Search video, photo or topic...'}
              className="w-full pl-9 pr-4 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none transition shadow-sm bg-slate-50/50 focus:bg-white"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Row 2: Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <Tag className={`w-3 h-3 ${isSelected ? 'text-amber-400' : 'text-slate-400'}`} />
                <span>{lang === 'bn' ? cat.labelBn : cat.labelEn}</span>
              </button>
            );
          })}
        </div>

        {/* Results Counter & Instructions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span>
            {lang === 'bn' 
              ? `মোট প্রদর্শিত আইটেম: ${filteredItems.length} টি (${mediaTypeFilter === 'all' ? 'ভিডিও ও ছবি মিলিয়ে' : mediaTypeFilter === 'video' ? 'শুধুমাত্র ভিডিও' : 'শুধুমাত্র ছবি'})` 
              : `Showing ${filteredItems.length} items (${mediaTypeFilter === 'all' ? 'Videos & Photos' : mediaTypeFilter === 'video' ? 'Videos Only' : 'Photos Only'})`}
          </span>
          <span className="text-[11px] text-slate-400 flex items-center gap-1">
            <Play className="w-3 h-3 text-emerald-600" />
            {lang === 'bn' ? 'ভিডিও দেখতে কার্ডে ক্লিক করুন' : 'Click any card to play video or view photo'}
          </span>
        </div>
      </div>

      {/* Media Grid */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            {mediaTypeFilter === 'video' ? (
              <Video className="w-8 h-8 text-slate-400" />
            ) : (
              <ImageIcon className="w-8 h-8 text-slate-400" />
            )}
          </div>
          <h3 className="text-base font-bold text-slate-800">
            {lang === 'bn' ? 'কোনো কন্টেন্ট খুঁজে পাওয়া যায়নি' : 'No media items found'}
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {lang === 'bn' ? 'অনুগ্রহ করে ফিল্টার পরিবর্তন করুন বা অন্য অনুসন্ধানী শব্দ দিয়ে চেষ্টা করুন।' : 'Try changing category filter or search keywords.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredItems.map((item, index) => {
            const isVideo = item.mediaType === 'video';
            const thumbnailSrc = getEffectiveThumbnail(item);

            return (
              <div
                key={item.id}
                onClick={() => setActiveLightboxIndex(index)}
                className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-400 transition-all duration-300 cursor-pointer flex flex-col transform hover:-translate-y-1"
              >
                {/* Image/Video Thumbnail Container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                  <img
                    src={thumbnailSrc}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-95 group-hover:opacity-100"
                    loading="lazy"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5">
                    {/* Media Type Badge */}
                    {isVideo ? (
                      <span className="px-2 py-0.5 rounded-md bg-rose-600/90 backdrop-blur-md text-white text-[10px] font-extrabold shadow flex items-center gap-1 border border-rose-400/40">
                        <Video className="w-3 h-3" />
                        <span>{lang === 'bn' ? 'ভিডিও' : 'Video'}</span>
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-950/80 backdrop-blur-md text-emerald-300 text-[10px] font-bold shadow flex items-center gap-1 border border-emerald-500/30">
                        <ImageIcon className="w-3 h-3" />
                        <span>{lang === 'bn' ? 'স্থিরচিত্র' : 'Photo'}</span>
                      </span>
                    )}

                    {/* Category Badge */}
                    <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-amber-300 text-[10px] font-medium border border-white/10">
                      {lang === 'bn' ? item.categoryLabel : item.categoryLabelEn}
                    </span>
                  </div>

                  {/* Center Play Button for Video / Zoom for Photo */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    {isVideo ? (
                      <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-2xl transform group-hover:scale-115 transition-all group-hover:bg-emerald-500 border-2 border-white/80">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-white/90 text-emerald-950 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  {/* Bottom Duration / Date Tags */}
                  <div className="absolute bottom-2 inset-x-2 flex items-center justify-between pointer-events-none">
                    {isVideo && item.duration ? (
                      <div className="px-2 py-0.5 rounded bg-black/75 backdrop-blur-sm text-[10px] font-mono text-amber-300 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{item.duration}</span>
                      </div>
                    ) : <div />}

                    <div className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[10px] text-slate-200 font-mono flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-amber-400" />
                      <span>{item.date}</span>
                    </div>
                  </div>
                </div>

                {/* Card Caption & Meta */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2 group-hover:text-emerald-800 transition leading-snug">
                      {lang === 'bn' ? item.title : item.titleEn}
                    </h3>
                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
                      {lang === 'bn' ? item.description : item.descriptionEn}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold">
                    {isVideo ? (
                      <span className="text-emerald-700 flex items-center gap-1">
                        <Play className="w-3 h-3 fill-current" />
                        <span>{lang === 'bn' ? 'ভিডিও প্লে করুন' : 'Watch Video'}</span>
                      </span>
                    ) : (
                      <span className="text-slate-600 flex items-center gap-1">
                        <Maximize2 className="w-3 h-3" />
                        <span>{lang === 'bn' ? 'ছবি বড় করুন' : 'View Full Photo'}</span>
                      </span>
                    )}

                    <span className="text-slate-400 text-[10px]">
                      {isVideo ? (lang === 'bn' ? 'অনলাইন প্লেয়ার' : 'Web Player') : (lang === 'bn' ? 'হাই-রেজোলিউশন' : 'High-Res')}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Interactive Media Lightbox Modal (Supports both Videos & Images) */}
      {activeItem !== null && activeLightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveLightboxIndex(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-emerald-900/60 flex flex-col max-h-[94vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar with Title, Badges & Controls */}
            <div className="p-4 bg-slate-900/95 border-b border-slate-800 flex items-center justify-between text-white z-10">
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                {activeItem.mediaType === 'video' ? (
                  <span className="px-2.5 py-1 rounded-lg bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 shadow">
                    <Video className="w-3.5 h-3.5" />
                    <span>{lang === 'bn' ? 'ভিডিও প্রদর্শনী' : 'Video Player'}</span>
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-800 text-amber-300 text-xs font-bold flex items-center gap-1.5 shadow">
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>{lang === 'bn' ? 'স্থিরচিত্র ভিউয়ার' : 'Photo Viewer'}</span>
                  </span>
                )}

                <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700">
                  {lang === 'bn' ? activeItem.categoryLabel : activeItem.categoryLabelEn}
                </span>

                <span className="text-xs text-slate-400 font-mono">
                  {activeLightboxIndex + 1} / {filteredItems.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* External link for YouTube videos */}
                {activeItem.mediaType === 'video' && activeItem.videoUrl && (
                  <a
                    href={activeItem.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-slate-800 hover:bg-emerald-800 text-slate-300 hover:text-white transition hidden sm:flex items-center gap-1 text-xs"
                    title={lang === 'bn' ? 'ইউটিউব বা ব্রাউজারে খুলুন' : 'Open in new tab'}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}

                <button
                  onClick={() => setActiveLightboxIndex(null)}
                  className="p-2 rounded-full bg-slate-800 hover:bg-rose-900/70 text-slate-300 hover:text-white transition cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Media Area (Video Player or High-Res Image) */}
            <div className="relative flex-1 bg-black flex items-center justify-center min-h-[320px] max-h-[64vh] overflow-hidden">
              {activeItem.mediaType === 'video' ? (
                // VIDEO PLAYER
                <div className="w-full h-full flex items-center justify-center bg-black">
                  {getYouTubeEmbedUrl(activeItem.videoUrl) ? (
                    <iframe
                      src={getYouTubeEmbedUrl(activeItem.videoUrl)!}
                      title={activeItem.title}
                      className="w-full aspect-video max-h-[60vh] border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : activeItem.videoUrl && activeItem.videoUrl.endsWith('.mp4') ? (
                    <video
                      src={activeItem.videoUrl}
                      controls
                      autoPlay
                      className="w-full max-h-[60vh] object-contain"
                    />
                  ) : (
                    // Fallback player card with thumbnail and direct play button
                    <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center">
                      <img
                        src={getEffectiveThumbnail(activeItem)}
                        alt={activeItem.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-30"
                      />
                      <div className="relative z-10 space-y-4 max-w-md bg-slate-950/80 p-6 rounded-2xl border border-slate-800">
                        <div className="w-16 h-16 rounded-full bg-rose-600 text-white flex items-center justify-center mx-auto shadow-xl">
                          <Play className="w-8 h-8 fill-current ml-1" />
                        </div>
                        <h4 className="text-base font-bold text-white">
                          {lang === 'bn' ? activeItem.title : activeItem.titleEn}
                        </h4>
                        {activeItem.videoUrl && (
                          <a
                            href={activeItem.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition shadow-lg"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span>{lang === 'bn' ? 'ইউটিউবে ভিডিওটি সরাসরি দেখুন' : 'Watch Video on YouTube'}</span>
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // IMAGE VIEWER
                <img
                  src={activeItem.imageUrl}
                  alt={activeItem.title}
                  className="max-h-[60vh] max-w-full object-contain select-none"
                />
              )}

              {/* Prev Button */}
              <button
                onClick={handlePrevItem}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-emerald-700 text-white border border-white/20 transition transform hover:scale-110 cursor-pointer z-20"
                aria-label="Previous item"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                onClick={handleNextItem}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-emerald-700 text-white border border-white/20 transition transform hover:scale-110 cursor-pointer z-20"
                aria-label="Next item"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Caption & Meta Info */}
            <div className="p-5 bg-slate-900 text-white space-y-2 border-t border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h2 className="text-base sm:text-lg font-bold text-emerald-300">
                  {lang === 'bn' ? activeItem.title : activeItem.titleEn}
                </h2>
                <div className="flex items-center gap-3 shrink-0 text-xs text-slate-400 font-mono">
                  {activeItem.duration && (
                    <span className="flex items-center gap-1 text-amber-400">
                      <Clock className="w-3.5 h-3.5" />
                      {activeItem.duration}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    {activeItem.date}
                  </span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                {lang === 'bn' ? activeItem.description : activeItem.descriptionEn}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Admin Add New Media (Photo or Video) Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-2xl border border-emerald-100 max-w-xl w-full overflow-hidden">
            <div className="bg-emerald-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-300" />
                <h3 className="font-bold text-base">
                  {lang === 'bn' ? 'গ্যালারিতে নতুন মিডিয়া যুক্ত করুন' : 'Add Media to Gallery'}
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-emerald-200 hover:text-white rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateItem} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              
              {/* Media Type Chooser: Video vs Image */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {lang === 'bn' ? 'মিডিয়ার ধরন নির্বাচন করুন' : 'Select Media Type'}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormMediaType('video')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
                      formMediaType === 'video'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/30'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Video className={`w-4 h-4 ${formMediaType === 'video' ? 'text-rose-600' : 'text-slate-400'}`} />
                    <span>{lang === 'bn' ? '🎥 ভিডিও (ইউটিউব/ভিডিও)' : '🎥 Video Clip'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormMediaType('image')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
                      formMediaType === 'image'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/30'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <ImageIcon className={`w-4 h-4 ${formMediaType === 'image' ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <span>{lang === 'bn' ? '📷 স্থিরচিত্র (ছবি)' : '📷 Still Photo'}</span>
                  </button>
                </div>
              </div>

              {/* Video Specific Fields */}
              {formMediaType === 'video' && (
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      {lang === 'bn' ? 'ভিডিও লিংক / YouTube URL' : 'Video URL / YouTube Link'} *
                    </label>
                    <input
                      type="url"
                      value={newVideoUrl}
                      onChange={(e) => handleVideoUrlChange(e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=... বা https://youtu.be/..."
                      className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                      required={formMediaType === 'video'}
                    />
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      {lang === 'bn' 
                        ? '💡 যেকোনো ইউটিউব লিংক দিলে স্বয়ংক্রিয়ভাবে ভিডিওর কভার থাম্বনেইল চলে আসবে।' 
                        : '💡 Entering YouTube URL will automatically extract video thumbnail.'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        {lang === 'bn' ? 'ভিডিওর দৈর্ঘ্য / Duration' : 'Duration (e.g. 08:30 min)'}
                      </label>
                      <input
                        type="text"
                        value={newDuration}
                        onChange={(e) => setNewDuration(e.target.value)}
                        placeholder="যেমন: ০৮:১৫ মি."
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        {lang === 'bn' ? 'কাস্টম কভার ফটো (ঐচ্ছিক)' : 'Custom Cover Image'}
                      </label>
                      <input
                        type="url"
                        value={newImageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)}
                        placeholder="খালি রাখলে ইউটিউব থাম্বনেইল আসবে"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Photo Specific Field */}
              {formMediaType === 'image' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'bn' ? 'ছবির লিংক (Image URL)' : 'Image URL'} *
                  </label>
                  <input
                    type="url"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    required={formMediaType === 'image'}
                  />
                </div>
              )}

              {/* Common Fields: Titles */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'bn' ? 'মিডিয়ার শিরোনাম (বাংলা)' : 'Title (Bengali)'} *
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder={formMediaType === 'video' ? 'যেমন: বার্ষিক দস্তারবন্দী পাগড়ি পরিধান অনুষ্ঠানের ভিডিও' : 'যেমন: হিফজ সমাপনী ছাত্রদের পাগড়ি প্রদান'}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'bn' ? 'শিরোনাম (ইংরেজি)' : 'Title (English)'}
                </label>
                <input
                  type="text"
                  value={newTitleEn}
                  onChange={(e) => setNewTitleEn(e.target.value)}
                  placeholder="e.g. Annual Dastarbandi Ceremony Video"
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'bn' ? 'বিষয় / ক্যাটাগরি' : 'Category'}
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="dastarbandi">দস্তারবন্দী ও সমাবর্তন</option>
                  <option value="recitation">ক্বিরাআত ও তিলাওয়াত</option>
                  <option value="hifz">হিফজ ও ক্লাস</option>
                  <option value="award">পুরস্কার ও প্রতিযোগিতা</option>
                  <option value="campus">ক্যাম্পাস ও পরিবেশ</option>
                  <option value="programs">দোয়া ও মাহফিল</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'bn' ? 'বিস্তারিত বিবরণ' : 'Description'}
                </label>
                <textarea
                  rows={2}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder={lang === 'bn' ? 'ভিডিও বা ছবির পটভূমি ও সংক্ষিপ্ত বিবরণ...' : 'Provide brief description...'}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
                >
                  {lang === 'bn' ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'সংরক্ষণ করুন' : 'Save Media'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

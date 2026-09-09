import React, { useState } from 'react';
import {
  Sliders,
  FileText,
  Image as ImageIcon,
  Building,
  Edit,
  Trash2,
  Plus,
  CheckCircle2,
  Eye,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Save,
  X,
  Play,
  Video,
  Clock,
  BookOpen,
  Tag,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { Language, HeroSlide, GalleryItem, BlogPost } from '../types';

interface AdminContentManagerProps {
  lang: Language;
  slides: HeroSlide[];
  onUpdateSlide: (slide: HeroSlide) => void;
  onAddSlide: (slide: HeroSlide) => void;
  onDeleteSlide: (id: string) => void;
  galleryItems: GalleryItem[];
  onAddGalleryItem: (item: GalleryItem) => void;
  onUpdateGalleryItem: (item: GalleryItem) => void;
  onDeleteGalleryItem: (id: string) => void;
  blogs: BlogPost[];
  onAddBlog: (post: BlogPost) => void;
  onUpdateBlog: (post: BlogPost) => void;
  onDeleteBlog: (id: string) => void;
  onNavigate?: (view: string) => void;
}

export const AdminContentManager: React.FC<AdminContentManagerProps> = ({
  lang,
  slides,
  onUpdateSlide,
  onAddSlide,
  onDeleteSlide,
  galleryItems,
  onAddGalleryItem,
  onUpdateGalleryItem,
  onDeleteGalleryItem,
  blogs,
  onAddBlog,
  onUpdateBlog,
  onDeleteBlog,
  onNavigate
}) => {
  const [contentTab, setContentTab] = useState<'sliders' | 'blogs' | 'gallery' | 'branding'>('sliders');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Edit State for Slides
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [isNewSlide, setIsNewSlide] = useState<boolean>(false);

  // Edit State for Blogs
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [isNewBlog, setIsNewBlog] = useState<boolean>(false);

  // Edit State for Gallery
  const [editingGallery, setEditingGallery] = useState<GalleryItem | null>(null);
  const [isNewGallery, setIsNewGallery] = useState<boolean>(false);

  // Branding State Demo (Stored in localStorage or state)
  const [brandInfo, setBrandInfo] = useState({
    madrasaName: 'দারুল কুরআন একাডেমি ও হিফজ মাদ্রাসা',
    madrasaTagline: 'আন্তর্জাতিক মানের তাজবীদের সমন্বয়ে হিফজুল কুরআন ও দ্বীনি তারবিয়াত',
    principalName: 'মুফতী মাহমুদ হাসান (মুহতামিম)',
    principalMessage: 'কুরআনুল কারীম বক্ষে ধারণ করার মাধ্যমে কোমলমতি শিক্ষার্থীদের আদর্শ ও নিষ্ঠাবান মুসলিম হিসেবে গড়ে তোলাই আমাদের একমাত্র অঙ্গীকার।',
    phone: '+৮৮০ ১৭ ১২৩৪ ৫৬৭৮',
    email: 'principal@darulquran.edu.bd',
    address: 'বাড়ি-১৪, রোড-০৫, ব্লক-ডি, মিরপুর-১১, ঢাকা-১২১৬',
    admissionHelpline: '০১৭১১-২২৩৩৪৪ (ভর্তি শাখা)',
    affiliation: 'বেফাকুল মাদারিসিল আরাবিয়া অধিভুক্ত কোড: BEFAQ-489'
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Quick Demo Simulator: Pre-fill a sample change and apply it immediately to show admin how it works!
  const handleRunDemoChange = () => {
    if (slides.length > 0) {
      const targetSlide = slides[0];
      const updated = {
        ...targetSlide,
        badge: '★ বিশেষ নোটিশ: নতুন শিক্ষাবর্ষের ভর্তি কার্যক্রম শুরু!',
        title: 'হিফজুল কুরআনের আলোকিত ভুবনে আপনাকে স্বাগতম'
      };
      onUpdateSlide(updated);
      showToast('ডেমো আপডেট সফল! প্রথম স্লাইডারের শিরোনাম ও ব্যাজ পরিবর্তিত হয়েছে। মূল হোমপেজে গিয়ে দেখুন!');
    }
  };

  // Save Slider
  const handleSaveSlide = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSlide) return;

    if (isNewSlide) {
      onAddSlide(editingSlide);
      showToast('নতুন ব্যানার স্লাইডার সফলভাবে হোমপেজে যুক্ত হয়েছে!');
    } else {
      onUpdateSlide(editingSlide);
      showToast('ব্যানার স্লাইডারের তথ্য সফলভাবে আপডেট হয়েছে!');
    }
    setEditingSlide(null);
  };

  // Save Blog
  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog) return;

    if (isNewBlog) {
      onAddBlog(editingBlog);
      showToast('নতুন ব্লগ আর্টিকেল সফলভাবে প্রকাশিত হয়েছে!');
    } else {
      onUpdateBlog(editingBlog);
      showToast('ব্লগ আর্টিকেলের কনটেন্ট সফলভাবে আপডেট হয়েছে!');
    }
    setEditingBlog(null);
  };

  // Save Gallery Item
  const handleSaveGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGallery) return;

    if (isNewGallery) {
      onAddGalleryItem(editingGallery);
      showToast('নতুন ফটো/ভিডিও গ্যালারিতে সফলভাবে যুক্ত হয়েছে!');
    } else {
      onUpdateGalleryItem(editingGallery);
      showToast('গ্যালারি আইটেম সফলভাবে আপডেট হয়েছে!');
    }
    setEditingGallery(null);
  };

  // Save Branding
  const handleSaveBranding = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('মাদ্রাসার প্রাথমিক পরিচিতি ও যোগাযোগের তথ্য সফলভাবে সংরক্ষণ করা হয়েছে!');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="bg-emerald-950 text-white p-4 rounded-2xl border-2 border-emerald-400 shadow-xl flex items-center justify-between gap-3 animate-bounce">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
            <span className="text-xs sm:text-sm font-bold text-emerald-100">{toastMessage}</span>
          </div>
          {onNavigate && (
            <button
              onClick={() => onNavigate('home')}
              className="px-3 py-1 bg-amber-400 hover:bg-amber-300 text-amber-950 text-xs font-bold rounded-lg shrink-0 flex items-center gap-1 cursor-pointer transition shadow"
            >
              <span>হোমপেজে দেখুন</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Interactive Workflow Guide Card */}
      <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-teal-950 text-white rounded-3xl p-6 sm:p-8 border border-emerald-700/50 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-400/40 text-amber-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ওয়েবসাইট কনটেন্ট কন্ট্রোল প্যানেল (CMS Demo)</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleRunDemoChange}
                className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>দ্রুত ডেমো পরিবর্তন পরীক্ষা করুন</span>
              </button>
              {onNavigate && (
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl border border-emerald-500/50 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>লাইভ ওয়েবসাইট</span>
                </button>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              অ্যাডমিন কীভাবে ওয়েবসাইটের কনটেন্ট পরিবর্তন করবে?
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-3xl mt-1">
              এই ড্যাশবোর্ড থেকে আপনি কোডিং ছাড়াই সম্পূর্ণ ওয়েবসাইটের হোমপেজ ব্যানার স্লাইডার, ইসলামিক ব্লগ প্রবন্ধ, ফটো ও ভিডিও গ্যালারি এবং মাদ্রাসার মৌলিক তথ্য সরাসরি এডিট, নতুন যুক্ত বা পরিবর্তন করতে পারবেন।
            </p>
          </div>

          {/* 3-Step Visual Workflow Stepper */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            <div className="bg-emerald-900/40 border border-emerald-600/40 rounded-2xl p-3.5 space-y-1">
              <span className="w-6 h-6 rounded-full bg-amber-400 text-amber-950 font-bold text-xs flex items-center justify-center">১</span>
              <h4 className="text-xs font-bold text-amber-300">সেকশন বেছে নিন</h4>
              <p className="text-[11px] text-slate-300">নিচের ট্যাবগুলো থেকে যে অংশটি পরিবর্তন করতে চান (ব্যানার, ব্লগ, গ্যালারি) সেটি ক্লিক করুন।</p>
            </div>

            <div className="bg-emerald-900/40 border border-emerald-600/40 rounded-2xl p-3.5 space-y-1">
              <span className="w-6 h-6 rounded-full bg-amber-400 text-amber-950 font-bold text-xs flex items-center justify-center">২</span>
              <h4 className="text-xs font-bold text-amber-300">সম্পাদনা ও তথ্য পূরণ</h4>
              <p className="text-[11px] text-slate-300">'সম্পাদনা' বাটনে চাপ দিয়ে যেকোনো শিরোনাম, কুরআনের আয়াত, ছবি বা ভিডিও লিঙ্ক পরিবর্তন করুন।</p>
            </div>

            <div className="bg-emerald-900/40 border border-emerald-600/40 rounded-2xl p-3.5 space-y-1">
              <span className="w-6 h-6 rounded-full bg-amber-400 text-amber-950 font-bold text-xs flex items-center justify-center">৩</span>
              <h4 className="text-xs font-bold text-amber-300">সংরক্ষণ ও লাইভ ফলাফল</h4>
              <p className="text-[11px] text-slate-300">'সংরক্ষণ করুন' এ ক্লিক করলেই তাৎক্ষণিকভাবে ওয়েবসাইটের মূল পেজে পরিবর্তন দৃশ্যমান হবে।</p>
            </div>
          </div>
        </div>
      </div>

      {/* Module Navigation Tabs */}
      <div className="flex border-b border-slate-200 bg-white rounded-2xl p-1.5 shadow-sm gap-1 overflow-x-auto text-xs font-bold">
        <button
          onClick={() => setContentTab('sliders')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition shrink-0 cursor-pointer ${
            contentTab === 'sliders' ? 'bg-emerald-800 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>হোমপেজ ব্যানার স্লাইডার ({slides.length})</span>
        </button>

        <button
          onClick={() => setContentTab('blogs')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition shrink-0 cursor-pointer ${
            contentTab === 'blogs' ? 'bg-emerald-800 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>ইসলামিক ব্লগ ও প্রবন্ধ ({blogs.length})</span>
        </button>

        <button
          onClick={() => setContentTab('gallery')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition shrink-0 cursor-pointer ${
            contentTab === 'gallery' ? 'bg-emerald-800 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>ফটো ও ভিডিও গ্যালারি ({galleryItems.length})</span>
        </button>

        <button
          onClick={() => setContentTab('branding')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition shrink-0 cursor-pointer ${
            contentTab === 'branding' ? 'bg-emerald-800 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>মাদ্রাসার পরিচিতি ও ব্র্যান্ডিং</span>
        </button>
      </div>

      {/* -------------------------------------------------------------
          MODULE 1: HERO SLIDERS CMS
         ------------------------------------------------------------- */}
      {contentTab === 'sliders' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
            <div>
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-700" />
                <span>হোমপেজ ব্যানার স্লাইডার কন্ট্রোল</span>
              </h3>
              <p className="text-xs text-slate-500">হোমপেজের শীর্ষ ব্যানার স্লাইডারের ছবি, টাইটেল ও আয়াত পরিবর্তন করুন</p>
            </div>

            <button
              onClick={() => {
                setIsNewSlide(true);
                setEditingSlide({
                  id: `slide-${Date.now()}`,
                  title: '',
                  titleEn: '',
                  subtitle: '',
                  subtitleEn: '',
                  quranVerse: '',
                  quranVerseMeaning: '',
                  badge: 'ভর্তি চলছে',
                  badgeEn: 'Admission Open',
                  imageUrl: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=1200&auto=format&fit=crop&q=80',
                  primaryActionLabel: 'ভর্তি আবেদন',
                  primaryActionLabelEn: 'Apply Now',
                  primaryActionTarget: 'admission'
                });
              }}
              className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>নতুন ব্যানার যুক্ত করুন</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[21/9] w-full bg-slate-900 overflow-hidden">
                    <img src={slide.imageUrl} alt={slide.title} className="w-full h-full object-cover opacity-85" />
                    <div className="absolute top-2 left-2">
                      <span className="px-2 py-0.5 rounded bg-emerald-900/90 text-amber-300 text-[10px] font-bold border border-emerald-500/40">
                        স্লাইড #{index + 1}: {slide.badge}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <h4 className="text-sm font-bold text-slate-900 leading-snug">
                      {slide.title}
                    </h4>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {slide.subtitle}
                    </p>
                    {slide.quranVerse && (
                      <div className="p-2 bg-emerald-50 rounded-xl text-[11px] text-emerald-900 font-['Amiri'] border border-emerald-100">
                        {slide.quranVerse}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono">
                    অ্যাকশন বাটন: {slide.primaryActionLabel} ({slide.primaryActionTarget})
                  </span>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setIsNewSlide(false);
                        setEditingSlide({ ...slide });
                      }}
                      className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg transition flex items-center gap-1 cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>সম্পাদনা</span>
                    </button>
                    {slides.length > 1 && (
                      <button
                        onClick={() => {
                          if (window.confirm('আপনি কি এই স্লাইডারটি মুছে ফেলতে চান?')) {
                            onDeleteSlide(slide.id);
                            showToast('স্লাইডার সফলভাবে মুছে ফেলা হয়েছে!');
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition cursor-pointer"
                        title="মুছে ফেলুন"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          MODULE 2: BLOG POSTS CMS
         ------------------------------------------------------------- */}
      {contentTab === 'blogs' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
            <div>
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-700" />
                <span>ইসলামিক ব্লগ ও গবেষণা প্রবন্ধ ব্যবস্থাপনা</span>
              </h3>
              <p className="text-xs text-slate-500">ওয়েবসাইটের সকল আর্টিকেল এডিট করুন, নতুন প্রবন্ধ প্রকাশ করুন বা মুছুন</p>
            </div>

            <button
              onClick={() => {
                setIsNewBlog(true);
                setEditingBlog({
                  id: `blog-${Date.now()}`,
                  title: '',
                  titleEn: '',
                  slug: 'new-article',
                  category: 'quran_hifz',
                  categoryLabel: 'হিফজ ও কুরআন শিক্ষা',
                  categoryLabelEn: 'Quran & Hifz',
                  author: 'মাওলানা মুফতী আব্দুল্লাহ আল মামুন',
                  authorRole: 'মুহতামিম ও শায়খুত তাজবীদ',
                  publishDate: new Date().toISOString().split('T')[0],
                  readTime: '৫ মিনিট পাঠ',
                  coverImage: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1200&auto=format&fit=crop&q=80',
                  summary: '',
                  summaryEn: '',
                  content: '',
                  contentEn: '',
                  tags: ['হিফজ', 'পরামর্শ'],
                  viewsCount: 1,
                  likesCount: 0,
                  comments: []
                });
              }}
              className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>নতুন প্রবন্ধ লিখুন</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {blogs.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/9] w-full bg-slate-100 overflow-hidden">
                    <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/75 text-amber-300 text-[10px] font-bold">
                      {post.categoryLabel}
                    </span>
                    <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/70 text-slate-200 text-[10px] font-mono">
                      {post.readTime}
                    </span>
                  </div>

                  <div className="p-4 space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                      <span>{post.publishDate}</span>
                      <span>লেখক: {post.author}</span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug">
                      {post.title}
                    </h4>

                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                      {post.summary}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-[11px] text-slate-400 font-mono">
                    ভিউ: {post.viewsCount} • লাইক: {post.likesCount}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setIsNewBlog(false);
                        setEditingBlog({ ...post });
                      }}
                      className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg transition flex items-center gap-1 cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>সম্পাদনা</span>
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('আপনি কি এই ব্লগ পোস্টটি মুছে ফেলতে চান?')) {
                          onDeleteBlog(post.id);
                          showToast('ব্লগ পোস্ট সফলভাবে মুছে ফেলা হয়েছে!');
                        }
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition cursor-pointer"
                      title="মুছে ফেলুন"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          MODULE 3: GALLERY MEDIA CMS
         ------------------------------------------------------------- */}
      {contentTab === 'gallery' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
            <div>
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-emerald-700" />
                <span>ফটো ও ভিডিও গ্যালারি ব্যবস্থাপনা</span>
              </h3>
              <p className="text-xs text-slate-500">ওয়েবসাইটের গ্যালারির ছবি, ভিডিও লিঙ্ক, শিরোনাম ও বিভাগ পরিবর্তন করুন</p>
            </div>

            <button
              onClick={() => {
                setIsNewGallery(true);
                setEditingGallery({
                  id: `gal-${Date.now()}`,
                  mediaType: 'image',
                  title: '',
                  titleEn: '',
                  category: 'campus',
                  categoryLabel: 'ক্যাম্পাস ও পরিবেশ',
                  categoryLabelEn: 'Campus & Facilities',
                  imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=1200&auto=format&fit=crop&q=80',
                  date: new Date().toISOString().split('T')[0],
                  description: '',
                  descriptionEn: ''
                });
              }}
              className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>নতুন ফটো/ভিডিও যুক্ত করুন</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full bg-slate-900 overflow-hidden">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2 flex items-center gap-1">
                      {item.mediaType === 'video' ? (
                        <span className="px-2 py-0.5 rounded bg-rose-600 text-white text-[10px] font-bold flex items-center gap-1">
                          <Video className="w-3 h-3" />
                          <span>ভিডিও</span>
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-emerald-800 text-amber-300 text-[10px] font-bold flex items-center gap-1">
                          <ImageIcon className="w-3 h-3" />
                          <span>ছবি</span>
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded bg-black/60 text-slate-200 text-[10px]">
                        {item.categoryLabel}
                      </span>
                    </div>

                    {item.mediaType === 'video' && item.duration && (
                      <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-amber-300 text-[10px] font-mono">
                        {item.duration}
                      </span>
                    )}
                  </div>

                  <div className="p-4 space-y-1">
                    <span className="text-[10px] text-slate-400 font-mono block">{item.date}</span>
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-1 leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 line-clamp-2">
                      {item.description}
                    </p>
                    {item.videoUrl && (
                      <p className="text-[10px] text-rose-600 truncate font-mono">
                        YouTube: {item.videoUrl}
                      </p>
                    )}
                  </div>
                </div>

                <div className="p-4 pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    onClick={() => {
                      setIsNewGallery(false);
                      setEditingGallery({ ...item });
                    }}
                    className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg transition flex items-center gap-1 cursor-pointer"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>সম্পাদনা</span>
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('আপনি কি এই মিডিয়া আইটেমটি মুছে ফেলতে চান?')) {
                        onDeleteGalleryItem(item.id);
                        showToast('গ্যালারি আইটেম সফলভাবে মুছে ফেলা হয়েছে!');
                      }
                    }}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition cursor-pointer"
                    title="মুছে ফেলুন"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          MODULE 4: INSTITUTIONAL BRANDING & INFO CMS
         ------------------------------------------------------------- */}
      {contentTab === 'branding' && (
        <form onSubmit={handleSaveBranding} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Building className="w-5 h-5 text-emerald-700" />
              <span>মাদ্রাসার প্রাথমিক তথ্য ও যোগাযোগের বিবরণ</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              ওয়েবসাইটের হেডার, ফুটার এবং পরিচিতি পেজে প্রদর্শিত প্রতিষ্ঠানের নাম, স্লোগান ও ফোন নম্বর এডিট করুন
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">মাদ্রাসার নাম (বাংলা)</label>
              <input
                type="text"
                value={brandInfo.madrasaName}
                onChange={(e) => setBrandInfo({ ...brandInfo, madrasaName: e.target.value })}
                className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">প্রতিষ্ঠানের মূল স্লোগান / মূলমন্ত্র</label>
              <input
                type="text"
                value={brandInfo.madrasaTagline}
                onChange={(e) => setBrandInfo({ ...brandInfo, madrasaTagline: e.target.value })}
                className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">মুহতামিম / প্রিন্সিপালের নাম</label>
              <input
                type="text"
                value={brandInfo.principalName}
                onChange={(e) => setBrandInfo({ ...brandInfo, principalName: e.target.value })}
                className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">অধিভুক্তি কোড ও রেজিস্ট্রেশন</label>
              <input
                type="text"
                value={brandInfo.affiliation}
                onChange={(e) => setBrandInfo({ ...brandInfo, affiliation: e.target.value })}
                className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">প্রধান যোগাযোগ নম্বর (হটলাইন)</label>
              <input
                type="text"
                value={brandInfo.phone}
                onChange={(e) => setBrandInfo({ ...brandInfo, phone: e.target.value })}
                className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">ভর্তি শাখা হেল্পলাইন</label>
              <input
                type="text"
                value={brandInfo.admissionHelpline}
                onChange={(e) => setBrandInfo({ ...brandInfo, admissionHelpline: e.target.value })}
                className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">অফিসিয়াল ইমেইল</label>
              <input
                type="email"
                value={brandInfo.email}
                onChange={(e) => setBrandInfo({ ...brandInfo, email: e.target.value })}
                className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">ক্যাম্পাস ঠিকানা</label>
              <input
                type="text"
                value={brandInfo.address}
                onChange={(e) => setBrandInfo({ ...brandInfo, address: e.target.value })}
                className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">মুহতামিম সাহেবের সংক্ষিপ্ত বাণী</label>
            <textarea
              rows={3}
              value={brandInfo.principalMessage}
              onChange={(e) => setBrandInfo({ ...brandInfo, principalMessage: e.target.value })}
              className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>পরিবর্তন সংরক্ষণ করুন</span>
            </button>
          </div>
        </form>
      )}

      {/* -------------------------------------------------------------
          MODAL: EDIT HERO SLIDE
         ------------------------------------------------------------- */}
      {editingSlide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-2xl border border-emerald-100 max-w-2xl w-full overflow-hidden">
            <div className="bg-emerald-950 text-white p-5 flex items-center justify-between border-b border-emerald-800">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-amber-300" />
                <h3 className="font-bold text-base">
                  {isNewSlide ? 'নতুন ব্যানার স্লাইডার যোগ করুন' : 'ব্যানার স্লাইডার সম্পাদনা (Edit Slide)'}
                </h3>
              </div>
              <button
                onClick={() => setEditingSlide(null)}
                className="p-1 text-emerald-200 hover:text-white rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSlide} className="p-6 space-y-4 max-h-[82vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ব্যানার ব্যাজ টেক্সট (যেমন: ভর্তি চলছে)</label>
                  <input
                    type="text"
                    value={editingSlide.badge}
                    onChange={(e) => setEditingSlide({ ...editingSlide, badge: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">অ্যাকশন বাটন টেক্সট</label>
                  <input
                    type="text"
                    value={editingSlide.primaryActionLabel}
                    onChange={(e) => setEditingSlide({ ...editingSlide, primaryActionLabel: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">স্লাইডারের প্রধান শিরোনাম (Title)</label>
                <input
                  type="text"
                  value={editingSlide.title}
                  onChange={(e) => setEditingSlide({ ...editingSlide, title: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">সাব-টাইটেল / সংক্ষিপ্ত বিবরণ</label>
                <textarea
                  rows={2}
                  value={editingSlide.subtitle}
                  onChange={(e) => setEditingSlide({ ...editingSlide, subtitle: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">কুরআনের আয়াত (আরবি - ঐচ্ছিক)</label>
                  <input
                    type="text"
                    value={editingSlide.quranVerse || ''}
                    onChange={(e) => setEditingSlide({ ...editingSlide, quranVerse: e.target.value })}
                    placeholder="وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا"
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-['Amiri']"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">আয়াতের অর্থ</label>
                  <input
                    type="text"
                    value={editingSlide.quranVerseMeaning || ''}
                    onChange={(e) => setEditingSlide({ ...editingSlide, quranVerseMeaning: e.target.value })}
                    placeholder="এবং কুরআন তিলাওয়াত করো ধীরস্থিরভাবে তারতীলের সাথে।"
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">কভার ছবির ইউআরএল (Cover Image URL)</label>
                <input
                  type="url"
                  value={editingSlide.imageUrl}
                  onChange={(e) => setEditingSlide({ ...editingSlide, imageUrl: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">বাটনে ক্লিক করলে কোথায় যাবে? (Target Route)</label>
                <select
                  value={editingSlide.primaryActionTarget}
                  onChange={(e) => setEditingSlide({ ...editingSlide, primaryActionTarget: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="admission">অনলাইন ভর্তি ফরম (admission)</option>
                  <option value="diary">লাইভ সবক ডায়েরি (diary)</option>
                  <option value="result">পরীক্ষার ফলাফল (result)</option>
                  <option value="gallery">ফটো ও ভিডিও গ্যালারি (gallery)</option>
                  <option value="blog">ইসলামিক ব্লগ ও প্রবন্ধ (blog)</option>
                  <option value="about">মাদ্রাসা পরিচিতি (about)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingSlide(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>সংরক্ষণ করুন</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          MODAL: EDIT BLOG POST
         ------------------------------------------------------------- */}
      {editingBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-2xl border border-emerald-100 max-w-2xl w-full overflow-hidden">
            <div className="bg-emerald-950 text-white p-5 flex items-center justify-between border-b border-emerald-800">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-300" />
                <h3 className="font-bold text-base">
                  {isNewBlog ? 'নতুন ইসলামিক প্রবন্ধ লিখুন' : 'ব্লগ প্রবন্ধ সম্পাদনা (Edit Blog)'}
                </h3>
              </div>
              <button
                onClick={() => setEditingBlog(null)}
                className="p-1 text-emerald-200 hover:text-white rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBlog} className="p-6 space-y-4 max-h-[82vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">প্রবন্ধের শিরোনাম (বাংলা)</label>
                <input
                  type="text"
                  value={editingBlog.title}
                  onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ক্যাটাগরি</label>
                  <select
                    value={editingBlog.category}
                    onChange={(e) => {
                      const val = e.target.value as any;
                      const labels: Record<string, string> = {
                        quran_hifz: 'হিফজ ও কুরআন শিক্ষা',
                        tajweed: 'তাজবীদ ও কিরাত',
                        parenting: 'প্যারেন্টিং ও তারবিয়াত',
                        student_guidance: 'ছাত্র দিকনির্দেশনা ও স্বাস্থ্য',
                        madrasa_news: 'মাদ্রাসা ও শিক্ষা ভাবনা'
                      };
                      setEditingBlog({
                        ...editingBlog,
                        category: val,
                        categoryLabel: labels[val] || 'সাধারণ'
                      });
                    }}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="quran_hifz">কুরআন ও হিফজ</option>
                    <option value="tajweed">তাজবীদ ও কিরাত</option>
                    <option value="parenting">প্যারেন্টিং ও তারবিয়াত</option>
                    <option value="student_guidance">ছাত্র দিকনির্দেশনা ও স্বাস্থ্য</option>
                    <option value="madrasa_news">মাদ্রাসা ও শিক্ষা ভাবনা</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">পড়ার সময়</label>
                  <input
                    type="text"
                    value={editingBlog.readTime}
                    onChange={(e) => setEditingBlog({ ...editingBlog, readTime: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">লেখকের নাম</label>
                  <input
                    type="text"
                    value={editingBlog.author}
                    onChange={(e) => setEditingBlog({ ...editingBlog, author: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">লেখকের পদবী</label>
                  <input
                    type="text"
                    value={editingBlog.authorRole}
                    onChange={(e) => setEditingBlog({ ...editingBlog, authorRole: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">কভার ছবির ইউআরএল</label>
                <input
                  type="url"
                  value={editingBlog.coverImage}
                  onChange={(e) => setEditingBlog({ ...editingBlog, coverImage: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">সারসংক্ষেপ (Summary)</label>
                <textarea
                  rows={2}
                  value={editingBlog.summary}
                  onChange={(e) => setEditingBlog({ ...editingBlog, summary: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">মূল কনটেন্ট (Article Content)</label>
                <textarea
                  rows={6}
                  value={editingBlog.content}
                  onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-sans"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingBlog(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>সংরক্ষণ ও প্রকাশ করুন</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          MODAL: EDIT GALLERY ITEM
         ------------------------------------------------------------- */}
      {editingGallery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-2xl border border-emerald-100 max-w-2xl w-full overflow-hidden">
            <div className="bg-emerald-950 text-white p-5 flex items-center justify-between border-b border-emerald-800">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-amber-300" />
                <h3 className="font-bold text-base">
                  {isNewGallery ? 'নতুন গ্যালারি আইটেম যোগ করুন' : 'গ্যালারি আইটেম সম্পাদনা (Edit Media)'}
                </h3>
              </div>
              <button
                onClick={() => setEditingGallery(null)}
                className="p-1 text-emerald-200 hover:text-white rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveGallery} className="p-6 space-y-4 max-h-[82vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">মিডিয়া টাইপ</label>
                  <select
                    value={editingGallery.mediaType || 'image'}
                    onChange={(e) => setEditingGallery({ ...editingGallery, mediaType: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="image">স্থিরচিত্র (Photo)</option>
                    <option value="video">ভিডিও (YouTube Video)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">বিভাগ (Category)</label>
                  <select
                    value={editingGallery.category}
                    onChange={(e) => {
                      const val = e.target.value as any;
                      const labels: Record<string, string> = {
                        hifz: 'হিফজুল কুরআন বিভাগ',
                        dastarbandi: 'দস্তারবন্দী ও সমাবর্তন',
                        campus: 'ক্যাম্পাস ও পরিবেশ',
                        programs: 'দোয়া ও অনুষ্ঠান'
                      };
                      setEditingGallery({
                        ...editingGallery,
                        category: val,
                        categoryLabel: labels[val] || 'ক্যাম্পাস'
                      });
                    }}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="hifz">হিফজুল কুরআন বিভাগ</option>
                    <option value="dastarbandi">দস্তারবন্দী ও সমাবর্তন</option>
                    <option value="campus">ক্যাম্পাস ও পরিবেশ</option>
                    <option value="programs">দোয়া ও অনুষ্ঠান</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">শিরোনাম</label>
                <input
                  type="text"
                  value={editingGallery.title}
                  onChange={(e) => setEditingGallery({ ...editingGallery, title: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>

              {editingGallery.mediaType === 'video' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">ইউটিউব ভিডিও লিঙ্ক (YouTube URL)</label>
                    <input
                      type="url"
                      value={editingGallery.videoUrl || ''}
                      onChange={(e) => setEditingGallery({ ...editingGallery, videoUrl: e.target.value })}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">ভিডিওর সময়কাল (যেমন: ০৫:১০ মি.)</label>
                    <input
                      type="text"
                      value={editingGallery.duration || ''}
                      onChange={(e) => setEditingGallery({ ...editingGallery, duration: e.target.value })}
                      placeholder="০৫:১০ মি."
                      className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>
              ) : null}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {editingGallery.mediaType === 'video' ? 'ভিডিও থাম্বনেইল ছবির লিঙ্ক' : 'ছবির লিঙ্ক (Image URL)'}
                </label>
                <input
                  type="url"
                  value={editingGallery.imageUrl}
                  onChange={(e) => setEditingGallery({ ...editingGallery, imageUrl: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">সংক্ষিপ্ত বিবরণ</label>
                <textarea
                  rows={2}
                  value={editingGallery.description}
                  onChange={(e) => setEditingGallery({ ...editingGallery, description: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingGallery(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>সংরক্ষণ করুন</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

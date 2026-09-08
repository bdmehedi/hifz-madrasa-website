import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  Calendar,
  Clock,
  User as UserIcon,
  Heart,
  MessageSquare,
  Share2,
  ArrowLeft,
  Tag,
  Plus,
  X,
  CheckCircle2,
  Sparkles,
  Bookmark,
  Eye,
  Send,
  Flame,
  Check
} from 'lucide-react';
import { Language, BlogPost, BlogComment, User } from '../types';

interface MadrasaBlogProps {
  posts: BlogPost[];
  lang: Language;
  currentUser: User | null;
  onAddNewPost?: (post: BlogPost) => void;
  onUpdatePost?: (post: BlogPost) => void;
  initialSelectedPostId?: string | null;
}

export const MadrasaBlog: React.FC<MadrasaBlogProps> = ({
  posts,
  lang,
  currentUser,
  onAddNewPost,
  onUpdatePost,
  initialSelectedPostId
}) => {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(initialSelectedPostId || null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  
  // Comment Form State
  const [commenterName, setCommenterName] = useState(currentUser?.name || '');
  const [commentText, setCommentText] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);

  // New Post Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTitleEn, setNewTitleEn] = useState('');
  const [newCategory, setNewCategory] = useState<BlogPost['category']>('quran_hifz');
  const [newAuthor, setNewAuthor] = useState(currentUser?.name || 'মাওলানা মুফতী আব্দুল্লাহ আল মামুন');
  const [newAuthorRole, setNewAuthorRole] = useState('সিনিয়র উস্তাদ');
  const [newCoverImage, setNewCoverImage] = useState('https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1200&auto=format&fit=crop&q=80');
  const [newReadTime, setNewReadTime] = useState('৫ মিনিট পাঠ');
  const [newSummary, setNewSummary] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTags, setNewTags] = useState('হিফজ, কুরআন শিক্ষা, পরামর্শ');

  // Categories list
  const categories = [
    { id: 'all', labelBn: 'সকল প্রবন্ধ', labelEn: 'All Articles' },
    { id: 'quran_hifz', labelBn: 'কুরআন ও হিফজ', labelEn: 'Quran & Hifz' },
    { id: 'tajweed', labelBn: 'তাজবীদ ও কিরাত', labelEn: 'Tajweed & Qiraat' },
    { id: 'parenting', labelBn: 'প্যারেন্টিং ও তারবিয়াত', labelEn: 'Parenting & Tarbiyah' },
    { id: 'student_guidance', labelBn: 'ছাত্র দিকনির্দেশনা ও স্বাস্থ্য', labelEn: 'Student Well-being' },
    { id: 'madrasa_news', labelBn: 'মাদ্রাসা ও শিক্ষা ভাবনা', labelEn: 'Madrasa Philosophy' },
  ];

  // Active post calculation
  const activePost = useMemo(() => {
    return posts.find((p) => p.id === selectedPostId) || null;
  }, [posts, selectedPostId]);

  // Filtered posts
  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.titleEn.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q));
      return matchesCat && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  // Featured post for hero
  const featuredPost = useMemo(() => {
    return posts.find((p) => p.featured) || posts[0] || null;
  }, [posts]);

  // Handle Like
  const handleLike = (e: React.MouseEvent, post: BlogPost) => {
    e.stopPropagation();
    if (!onUpdatePost) return;
    const updated: BlogPost = {
      ...post,
      likesCount: post.likesCount + 1
    };
    onUpdatePost(updated);
  };

  // Handle Share
  const handleShare = async (post: BlogPost) => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: lang === 'bn' ? post.title : post.titleEn,
          text: lang === 'bn' ? post.summary : post.summaryEn,
          url: shareUrl,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      // ignore
    }
  };

  // Handle Submit Comment
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePost || !commentText.trim() || !onUpdatePost) return;

    const newComment: BlogComment = {
      id: `comm-${Date.now()}`,
      authorName: commenterName.trim() || (lang === 'bn' ? 'শুভাকাঙ্ক্ষী অভিভাবক' : 'Guardian/Visitor'),
      authorRole: currentUser?.role === 'parent' ? (lang === 'bn' ? 'অভিভাবক' : 'Guardian') : (lang === 'bn' ? 'পাঠক' : 'Reader'),
      comment: commentText.trim(),
      date: new Date().toISOString().split('T')[0]
    };

    const updatedPost: BlogPost = {
      ...activePost,
      comments: [newComment, ...(activePost.comments || [])]
    };

    onUpdatePost(updatedPost);
    setCommentText('');
    setCommentSuccess(true);
    setTimeout(() => setCommentSuccess(false), 3000);
  };

  // Handle Create New Post
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const catObj = categories.find((c) => c.id === newCategory);
    const generatedSlug = newTitle
      .toLowerCase()
      .replace(/[^\w\s\u0980-\u09FF-]/g, '')
      .replace(/\s+/g, '-');

    const createdPost: BlogPost = {
      id: `blog-${Date.now()}`,
      title: newTitle.trim(),
      titleEn: newTitleEn.trim() || newTitle.trim(),
      slug: generatedSlug,
      category: newCategory,
      categoryLabel: catObj?.labelBn || 'সাধারণ',
      categoryLabelEn: catObj?.labelEn || 'General',
      author: newAuthor.trim() || 'উস্তাদ',
      authorRole: newAuthorRole.trim() || 'শিক্ষক',
      publishDate: new Date().toISOString().split('T')[0],
      readTime: newReadTime.trim() || '৫ মিনিট পাঠ',
      coverImage: newCoverImage.trim() || 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1200&auto=format&fit=crop&q=80',
      summary: newSummary.trim() || newTitle.trim(),
      summaryEn: newTitleEn.trim() || newTitle.trim(),
      content: newContent.trim(),
      contentEn: newContent.trim(),
      tags: newTags.split(',').map((t) => t.trim()).filter(Boolean),
      viewsCount: 1,
      likesCount: 0,
      featured: false,
      comments: []
    };

    if (onAddNewPost) {
      onAddNewPost(createdPost);
    }

    setIsAddModalOpen(false);
    setSelectedPostId(createdPost.id);
  };

  // Render Formatted Content (detects headings and quotes)
  const renderFormattedContent = (content: string) => {
    const paragraphs = content.split('\n\n');
    return paragraphs.map((para, idx) => {
      const trimmed = para.trim();
      if (!trimmed) return null;

      // Heading 3
      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-lg sm:text-xl font-extrabold text-emerald-950 mt-6 mb-3 border-l-4 border-emerald-600 pl-3">
            {trimmed.replace('### ', '')}
          </h3>
        );
      }

      // Hadith or Quote
      if (trimmed.startsWith('"') || trimmed.startsWith('“') || trimmed.includes('সাল্লাল্লাহু আলাইহি ওয়াসাল্লাম ইরশাদ করেছেন') || trimmed.includes('ইরশাদ হয়েছে')) {
        return (
          <blockquote key={idx} className="my-5 p-4 rounded-2xl bg-emerald-50/90 border border-emerald-200 text-emerald-900 italic leading-relaxed text-sm sm:text-base relative shadow-sm">
            <div className="absolute top-2 right-3 text-2xl text-emerald-300 font-serif select-none pointer-events-none">❝</div>
            {trimmed}
          </blockquote>
        );
      }

      // Bullet List
      if (trimmed.includes('\n* ') || trimmed.startsWith('* ')) {
        const lines = trimmed.split('\n');
        return (
          <ul key={idx} className="my-3 space-y-1.5 pl-5 list-disc text-slate-700 text-sm sm:text-base leading-relaxed">
            {lines.map((l, lIdx) => (
              <li key={lIdx}>{l.replace(/^\*\s*/, '')}</li>
            ))}
          </ul>
        );
      }

      // Standard Paragraph
      return (
        <p key={idx} className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4">
          {trimmed}
        </p>
      );
    });
  };

  // -------------------------------------------------------------
  // DETAIL VIEW: FULL ARTICLE READER
  // -------------------------------------------------------------
  if (activePost) {
    const relatedPosts = posts
      .filter((p) => p.id !== activePost.id && (p.category === activePost.category || p.featured))
      .slice(0, 3);

    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200 pb-12">
        {/* Navigation & Controls Bar */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => setSelectedPostId(null)}
            className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 hover:text-emerald-800 border border-slate-200 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{lang === 'bn' ? 'সকল প্রবন্ধে ফিরে যান' : 'Back to All Articles'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleShare(activePost)}
              className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm cursor-pointer"
              title="Share article"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">{lang === 'bn' ? 'লিংক কপি হয়েছে!' : 'Link Copied!'}</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>{lang === 'bn' ? 'শেয়ার করুন' : 'Share'}</span>
                </>
              )}
            </button>

            <button
              onClick={(e) => handleLike(e, activePost)}
              className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 fill-current text-rose-500" />
              <span>{activePost.likesCount}</span>
            </button>
          </div>
        </div>

        {/* Article Container */}
        <article className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Header & Meta */}
          <div className="p-6 sm:p-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-extrabold">
                {lang === 'bn' ? activePost.categoryLabel : activePost.categoryLabelEn}
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-500 font-mono">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                {activePost.readTime}
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1 text-xs text-slate-500 font-mono">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {activePost.publishDate}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              {lang === 'bn' ? activePost.title : activePost.titleEn}
            </h1>

            {/* Author Profile Card */}
            <div className="flex items-center justify-between border-t border-b border-slate-100 py-4 mt-4">
              <div className="flex items-center gap-3">
                {activePost.authorAvatar ? (
                  <img
                    src={activePost.authorAvatar}
                    alt={activePost.author}
                    className="w-12 h-12 rounded-2xl object-cover border border-emerald-200 shadow-sm"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                    <UserIcon className="w-6 h-6" />
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{activePost.author}</h4>
                  <p className="text-xs text-emerald-700 font-medium">{activePost.authorRole}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  {activePost.viewsCount + 12}
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5" />
                  {activePost.comments?.length || 0}
                </span>
              </div>
            </div>
          </div>

          {/* Featured Cover Image */}
          {activePost.coverImage && (
            <div className="aspect-[21/9] w-full bg-slate-100 overflow-hidden relative">
              <img
                src={activePost.coverImage}
                alt={activePost.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content Body */}
          <div className="p-6 sm:p-10 max-w-none">
            {renderFormattedContent(lang === 'bn' ? activePost.content : activePost.contentEn)}

            {/* Tags */}
            {activePost.tags && activePost.tags.length > 0 && (
              <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
                <Tag className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-bold text-slate-500 mr-1">{lang === 'bn' ? 'ট্যাগসমূহ:' : 'Tags:'}</span>
                {activePost.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium hover:bg-slate-200 transition"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </article>

        {/* Comments Section */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-emerald-700" />
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                {lang === 'bn' ? 'পাঠক মন্তব্য ও প্রশ্নোত্তর' : 'Reader Comments & Discussions'}
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
                {activePost.comments?.length || 0}
              </span>
            </div>
          </div>

          {/* Add Comment Form */}
          <form onSubmit={handleAddComment} className="space-y-3 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
            <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{lang === 'bn' ? 'আপনার মূল্যবান মন্তব্য বা প্রশ্ন প্রকাশ করুন' : 'Leave your thoughtful comment or question'}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder={lang === 'bn' ? 'আপনার নাম' : 'Your Name'}
                value={commenterName}
                onChange={(e) => setCommenterName(e.target.value)}
                className="px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                required
              />
            </div>

            <textarea
              rows={3}
              placeholder={lang === 'bn' ? 'প্রবন্ধ সম্পর্কে আপনার মতামত বা জিজ্ঞাসা লিখুন...' : 'Write your comment here...'}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
              required
            />

            <div className="flex items-center justify-between pt-1">
              {commentSuccess ? (
                <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  {lang === 'bn' ? 'মন্তব্য সফলভাবে যুক্ত হয়েছে!' : 'Comment published successfully!'}
                </span>
              ) : <div />}

              <button
                type="submit"
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'মন্তব্য পাঠান' : 'Post Comment'}</span>
              </button>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-3">
            {(!activePost.comments || activePost.comments.length === 0) ? (
              <p className="text-xs text-slate-400 text-center py-4">
                {lang === 'bn' ? 'এখনো কোনো মন্তব্য নেই। প্রথম মন্তব্যটি আপনিই করুন!' : 'No comments yet. Be the first to share your thoughts!'}
              </p>
            ) : (
              activePost.comments.map((comment) => (
                <div key={comment.id} className="p-4 rounded-2xl bg-white border border-slate-100 shadow-2xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
                        {comment.authorName[0]}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">{comment.authorName}</span>
                        {comment.authorRole && (
                          <span className="text-[10px] text-slate-400">{comment.authorRole}</span>
                        )}
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">{comment.date}</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed pl-9">
                    {comment.comment}
                  </p>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="space-y-4 pt-4">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-emerald-700" />
              <span>{lang === 'bn' ? 'আরও পড়ুন (সম্পর্কিত প্রবন্ধ)' : 'Related Articles'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedPosts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => {
                    setSelectedPostId(rel.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md hover:border-emerald-400 transition cursor-pointer flex flex-col"
                >
                  <div className="aspect-[16/9] w-full overflow-hidden bg-slate-100">
                    <img src={rel.coverImage} alt={rel.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3.5 space-y-1.5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-emerald-700 uppercase">
                        {lang === 'bn' ? rel.categoryLabel : rel.categoryLabelEn}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-2 mt-1">
                        {lang === 'bn' ? rel.title : rel.titleEn}
                      </h4>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">{rel.publishDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }

  // -------------------------------------------------------------
  // LIST VIEW: ALL ARTICLES & SEARCH / HERO
  // -------------------------------------------------------------
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-emerald-700/50 relative overflow-hidden">
        <div className="absolute right-4 -bottom-6 opacity-10 text-[130px] font-['Amiri'] select-none pointer-events-none hidden md:block">
          مَقَالَات
        </div>

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-400/40 text-amber-300 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'দারুল কুরআন একাডেমি ইসলামিক ব্লগ ও গবেষণা' : 'Darul Quran Academy Research & Islamic Blog'}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {lang === 'bn' ? 'ইসলামিক প্রবন্ধ, হিফজ নির্দেশিকা ও ব্লগ' : 'Articles, Hifz Guidance & Blog'}
          </h1>

          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed max-w-2xl">
            {lang === 'bn'
              ? 'কুরআন মুখস্থের বৈজ্ঞানিক কৌশল, বিশুদ্ধ তাজবীদ শিক্ষা, সন্তানের দ্বীনি তারবিয়াত ও আদর্শ ইসলামী সমাজ গঠনে আমাদের সম্মানিত উস্তাদদের প্রামাণ্য দিকনির্দেশনা ও গবেষণা।'
              : 'Scholarly reflections, proven memorization techniques, Tajweed fundamentals, and Islamic parenting guidance authored by our respected faculty.'}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-emerald-950/70 border border-emerald-600/40 px-3.5 py-1.5 rounded-xl text-xs text-emerald-200">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'bn' ? `মোট প্রবন্ধ: ${posts.length} টি` : `Total Articles: ${posts.length}`}</span>
            </div>

            {/* Admin Add Article Button */}
            {(currentUser?.role === 'admin' || currentUser?.role === 'teacher') && (
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold text-xs rounded-xl shadow-lg transition flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{lang === 'bn' ? 'নতুন প্রবন্ধ লিখুন' : 'Write New Article'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-700" />
            <h2 className="text-sm font-bold text-slate-800">
              {lang === 'bn' ? 'বিষয় ও ক্যাটাগরি অনুযায়ী ফিল্টার' : 'Filter by Topic'}
            </h2>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'bn' ? 'প্রবন্ধ বা লেখক খুঁজুন...' : 'Search articles or authors...'}
              className="w-full pl-9 pr-4 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none transition shadow-sm bg-slate-50/60 focus:bg-white"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 cursor-pointer ${
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
      </div>

      {/* Featured / Hero Article Highlight (if no specific search query) */}
      {!searchQuery && selectedCategory === 'all' && featuredPost && (
        <div
          onClick={() => setSelectedPostId(featuredPost.id)}
          className="group bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-400 transition-all duration-300 cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-0"
        >
          <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-slate-900">
            <img
              src={featuredPost.coverImage}
              alt={featuredPost.title}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full bg-amber-500 text-amber-950 text-xs font-extrabold shadow flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'বিশেষ নির্বাচিত প্রবন্ধ' : 'Featured Editorial'}</span>
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900 font-bold text-[11px]">
                  {lang === 'bn' ? featuredPost.categoryLabel : featuredPost.categoryLabelEn}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  {featuredPost.readTime}
                </span>
              </div>

              <h3 className="text-lg sm:text-2xl font-extrabold text-slate-900 group-hover:text-emerald-800 transition leading-snug">
                {lang === 'bn' ? featuredPost.title : featuredPost.titleEn}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                {lang === 'bn' ? featuredPost.summary : featuredPost.summaryEn}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
                  {featuredPost.author[0]}
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block">{featuredPost.author}</span>
                  <span className="text-[10px] text-slate-400">{featuredPost.publishDate}</span>
                </div>
              </div>

              <span className="text-xs font-bold text-emerald-700 group-hover:underline flex items-center gap-1">
                <span>{lang === 'bn' ? 'সম্পূর্ণ পড়ুন' : 'Read Article'}</span>
                <span>→</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Blog Cards Grid */}
      {filteredPosts.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
          <BookOpen className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">
            {lang === 'bn' ? 'কোনো প্রবন্ধ খুঁজে পাওয়া যায়নি' : 'No articles found'}
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {lang === 'bn' ? 'অনুগ্রহ করে অন্য কোনো শব্দ দিয়ে অনুসন্ধান করুন অথবা অন্য ক্যাটাগরি নির্বাচন করুন।' : 'Try changing your search query or selecting a different category.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPostId(post.id)}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-400 transition-all duration-300 cursor-pointer flex flex-col justify-between transform hover:-translate-y-1"
            >
              {/* Image & Badges */}
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-950/85 backdrop-blur-sm text-amber-300 text-[10px] font-bold border border-emerald-500/30">
                      {lang === 'bn' ? post.categoryLabel : post.categoryLabelEn}
                    </span>
                  </div>

                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/75 backdrop-blur-sm text-[10px] font-mono text-slate-200 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-emerald-600" />
                      {post.publishDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {post.viewsCount}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition line-clamp-2 leading-snug">
                    {lang === 'bn' ? post.title : post.titleEn}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {lang === 'bn' ? post.summary : post.summaryEn}
                  </p>
                </div>
              </div>

              {/* Author & Interactions Bottom Bar */}
              <div className="p-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] flex items-center justify-center">
                    {post.author[0]}
                  </div>
                  <span className="font-semibold text-slate-700 text-[11px] truncate max-w-[130px]">
                    {post.author}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-slate-400">
                  <button
                    onClick={(e) => handleLike(e, post)}
                    className="flex items-center gap-1 hover:text-rose-600 transition"
                  >
                    <Heart className="w-3.5 h-3.5 text-rose-500" />
                    <span className="text-[11px] font-mono">{post.likesCount}</span>
                  </button>

                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-[11px] font-mono">{post.comments?.length || 0}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Admin Add New Article Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-2xl border border-emerald-100 max-w-2xl w-full overflow-hidden">
            <div className="bg-emerald-950 text-white p-5 flex items-center justify-between border-b border-emerald-800">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-300" />
                <h3 className="font-bold text-base">
                  {lang === 'bn' ? 'নতুন ইসলামিক প্রবন্ধ / ব্লগ পোস্ট লিখুন' : 'Compose New Article / Post'}
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-emerald-200 hover:text-white rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="p-6 space-y-4 max-h-[82vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'bn' ? 'প্রবন্ধের শিরোনাম (বাংলা)' : 'Article Title (Bengali)'} *
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="যেমন: হিফজুল কুরআনের স্মৃতিশক্তি বৃদ্ধির কার্যকরী সুন্নতি আমল"
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'bn' ? 'শিরোনাম (ইংরেজি - ঐচ্ছিক)' : 'Title in English'}
                </label>
                <input
                  type="text"
                  value={newTitleEn}
                  onChange={(e) => setNewTitleEn(e.target.value)}
                  placeholder="e.g. Effective Sunnah Habits for Enhancing Quran Memorization"
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'bn' ? 'ক্যাটাগরি / বিষয়' : 'Category'} *
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
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
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'bn' ? 'পাঠের আনুমানিক সময়' : 'Estimated Read Time'}
                  </label>
                  <input
                    type="text"
                    value={newReadTime}
                    onChange={(e) => setNewReadTime(e.target.value)}
                    placeholder="যেমন: ৫ মিনিট পাঠ"
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'bn' ? 'লেখকের নাম' : 'Author Name'} *
                  </label>
                  <input
                    type="text"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="উস্তাদের নাম"
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'bn' ? 'লেখকের পদবী' : 'Author Role'}
                  </label>
                  <input
                    type="text"
                    value={newAuthorRole}
                    onChange={(e) => setNewAuthorRole(e.target.value)}
                    placeholder="যেমন: মুহতামিম / সিনিয়র উস্তাদ"
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'bn' ? 'কভার ছবির লিংক (Cover Image URL)' : 'Cover Image URL'}
                </label>
                <input
                  type="url"
                  value={newCoverImage}
                  onChange={(e) => setNewCoverImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'bn' ? 'সংক্ষিপ্ত সারসংক্ষেপ (Summary)' : 'Short Summary'} *
                </label>
                <textarea
                  rows={2}
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  placeholder="প্রবন্ধের মূল বক্তব্য বা সারাংশ ২-৩ বাক্যে লিখুন..."
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'bn' ? 'প্রবন্ধের মূল বিষয়বস্তু (Content)' : 'Full Article Content'} *
                </label>
                <textarea
                  rows={6}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="সম্পূর্ণ প্রবন্ধ এখানে লিখুন। সাব-হেডিং দেওয়ার জন্য লাইনের শুরুতে '### ' ব্যবহার করতে পারেন..."
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-sans"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'bn' ? 'ট্যাগসমূহ (কমা দিয়ে আলাদা করুন)' : 'Tags (comma separated)'}
                </label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="হিফজ, তাজবীদ, স্মৃতিশক্তি, সুন্নাহ"
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
                >
                  {lang === 'bn' ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'প্রবন্ধ প্রকাশ করুন' : 'Publish Article'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

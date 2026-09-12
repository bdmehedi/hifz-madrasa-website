import React, { useState } from 'react';
import { 
  Shield, 
  Users, 
  GraduationCap, 
  CreditCard, 
  FileText, 
  Plus, 
  CheckCircle, 
  XCircle, 
  Calendar, 
  Search, 
  UserPlus, 
  Printer, 
  Clock, 
  Eye,
  Edit,
  Trash2,
  Sliders,
  Sparkles,
  ArrowRight,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  LayoutDashboard,
  ExternalLink,
  Award,
  FileCheck
} from 'lucide-react';
import { 
  Language, 
  Student, 
  Teacher, 
  FeeInvoice, 
  AdmissionApplication, 
  Notice,
  HeroSlide,
  GalleryItem,
  BlogPost,
  DastarbandiSanad,
  OfficialLetter,
  ExamResult
} from '../types';
import { getTranslation } from '../utils/translations';
import { AdminContentManager } from './AdminContentManager';
import { OfficialDocumentsManager } from './OfficialDocumentsManager';

interface AdminDashboardProps {
  lang: Language;
  students: Student[];
  onAddStudent: (st: Student) => void;
  teachers: Teacher[];
  invoices: FeeInvoice[];
  onUpdateInvoiceStatus: (id: string, status: 'paid' | 'unpaid') => void;
  admissions: AdmissionApplication[];
  onUpdateAdmissionStatus: (id: string, status: 'approved' | 'rejected' | 'interview_scheduled', interviewDate?: string) => void;
  notices: Notice[];
  onAddNotice: (notice: Notice) => void;
  slides?: HeroSlide[];
  onUpdateSlide?: (slide: HeroSlide) => void;
  onAddSlide?: (slide: HeroSlide) => void;
  onDeleteSlide?: (id: string) => void;
  galleryItems?: GalleryItem[];
  onAddGalleryItem?: (item: GalleryItem) => void;
  onUpdateGalleryItem?: (item: GalleryItem) => void;
  onDeleteGalleryItem?: (id: string) => void;
  blogs?: BlogPost[];
  onAddBlog?: (post: BlogPost) => void;
  onUpdateBlog?: (post: BlogPost) => void;
  onDeleteBlog?: (id: string) => void;
  onNavigate?: (view: string) => void;
  sanads?: DastarbandiSanad[];
  onAddSanad?: (sanad: DastarbandiSanad) => void;
  onDeleteSanad?: (id: string) => void;
  letters?: OfficialLetter[];
  onAddLetter?: (letter: OfficialLetter) => void;
  onDeleteLetter?: (id: string) => void;
  results?: ExamResult[];
  onOpenMarksheet?: (result: ExamResult) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  lang,
  students,
  onAddStudent,
  teachers,
  invoices,
  onUpdateInvoiceStatus,
  admissions,
  onUpdateAdmissionStatus,
  notices,
  onAddNotice,
  slides = [],
  onUpdateSlide = () => {},
  onAddSlide = () => {},
  onDeleteSlide = () => {},
  galleryItems = [],
  onAddGalleryItem = () => {},
  onUpdateGalleryItem = () => {},
  onDeleteGalleryItem = () => {},
  blogs = [],
  onAddBlog = () => {},
  onUpdateBlog = () => {},
  onDeleteBlog = () => {},
  onNavigate,
  sanads = [],
  onAddSanad = () => {},
  onDeleteSanad = () => {},
  letters = [],
  onAddLetter = () => {},
  onDeleteLetter = () => {},
  results = [],
  onOpenMarksheet = () => {}
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'admissions' | 'fees' | 'notices' | 'content' | 'documents'>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // New Student Modal state
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [newStudent, setNewStudent] = useState<Partial<Student>>({
    name: '',
    nameEn: '',
    fatherName: '',
    guardianPhone: '',
    department: 'hifz',
    groupOrClass: 'হিফজ বিভাগ (গ্রুপ-ক)',
    completedParas: 0,
    currentPara: 1,
    currentSurah: 'সূরা আল-ফাতিহা ও আল-বাকারা',
    currentAyatRange: 'পৃষ্ঠা ১-২',
    monthlyFee: 4500,
    status: 'active',
    bloodGroup: 'B+',
    address: 'মিরপুর, ঢাকা'
  });

  // New Notice state
  const [showAddNotice, setShowAddNotice] = useState(false);
  const [newNotice, setNewNotice] = useState<Partial<Notice>>({
    title: '',
    titleEn: '',
    content: '',
    contentEn: '',
    category: 'general',
    isPinned: false,
    author: 'মুহতামিম কার্যালয়',
    targetRole: 'all'
  });

  const totalCollected = invoices.filter(i => i.status === 'paid').reduce((a, b) => a + b.amount, 0);
  const totalPending = invoices.filter(i => i.status === 'unpaid').reduce((a, b) => a + b.amount, 0);

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.guardianPhone) return;

    const studentToAdd: Student = {
      id: 'ST-' + (100 + students.length + 1),
      roll: (100 + students.length + 1).toString(),
      name: newStudent.name || '',
      nameEn: newStudent.nameEn || newStudent.name || '',
      fatherName: newStudent.fatherName || 'মুহাম্মদ অভিভাবক',
      motherName: 'মোসাম্মৎ মাতা',
      guardianPhone: newStudent.guardianPhone || '',
      department: newStudent.department || 'hifz',
      groupOrClass: newStudent.groupOrClass || 'হিফজ বিভাগ',
      assignedUstadId: 'T-101',
      assignedUstadName: 'হাফেজ ক্বারী আব্দুল্লাহ আল-মামুন',
      admissionDate: new Date().toISOString().split('T')[0],
      birthDate: '2014-01-01',
      bloodGroup: newStudent.bloodGroup || 'B+',
      address: newStudent.address || 'ঢাকা',
      photoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80',
      status: 'active',
      completedParas: Number(newStudent.completedParas) || 0,
      currentPara: Number(newStudent.currentPara) || 1,
      currentSurah: newStudent.currentSurah || 'সূরা আল-বাকারা',
      currentAyatRange: newStudent.currentAyatRange || 'পৃষ্ঠা ১-৫',
      monthlyFee: Number(newStudent.monthlyFee) || 4500
    };

    onAddStudent(studentToAdd);
    setShowAddStudent(false);
  };

  const handleCreateNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNotice.title || !newNotice.content) return;

    const noticeToAdd: Notice = {
      id: 'NOT-' + Date.now(),
      title: newNotice.title || '',
      titleEn: newNotice.titleEn || newNotice.title || '',
      content: newNotice.content || '',
      contentEn: newNotice.contentEn || newNotice.content || '',
      category: newNotice.category || 'general',
      date: new Date().toISOString().split('T')[0],
      isPinned: Boolean(newNotice.isPinned),
      author: newNotice.author || 'মুহতামিম কার্যালয়',
      targetRole: (newNotice.targetRole as any) || 'all'
    };

    onAddNotice(noticeToAdd);
    setShowAddNotice(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Admin Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-700/40 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-700 border-2 border-amber-400 flex items-center justify-center text-amber-300 font-bold text-2xl shadow">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <span className="px-2.5 py-0.5 bg-amber-400 text-amber-950 rounded text-xs font-bold">
                {lang === 'bn' ? 'মুহতামিম ও প্রধান প্রশাসন প্যানেল' : 'Principal & Head Administration'}
              </span>
              <h1 className="text-xl sm:text-2xl font-bold mt-1 text-white">
                {lang === 'bn' ? 'দারুল কুরআন কেন্দ্রীয় ব্যবস্থাপনা কন্ট্রোল' : 'Central Management Dashboard'}
              </h1>
              <p className="text-xs text-emerald-200 mt-0.5">
                {getTranslation(lang, 'madrasaName')}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('content')}
              className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl border border-emerald-400/40 shadow transition flex items-center gap-1.5 cursor-pointer"
            >
              <Sliders className="w-4 h-4 text-amber-300" />
              <span>{lang === 'bn' ? 'ওয়েবসাইট কনটেন্ট (CMS)' : 'Website CMS'}</span>
            </button>
            <button
              onClick={() => setShowAddStudent(true)}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5"
            >
              <UserPlus className="w-4 h-4" />
              <span>{lang === 'bn' ? 'নতুন শিক্ষার্থী ভর্তি' : 'New Admission'}</span>
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className="px-4 py-2 bg-teal-800 hover:bg-teal-700 text-white font-bold text-xs rounded-xl border border-teal-600 transition flex items-center gap-1.5 shadow-xs"
            >
              <Award className="w-4 h-4 text-amber-300" />
              <span>{lang === 'bn' ? 'সনদ ও অফিসিয়াল চিঠি' : 'Sanad & Letters'}</span>
            </button>
            <button
              onClick={() => setShowAddNotice(true)}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl border border-emerald-500 transition flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>{lang === 'bn' ? 'নোটিশ প্রকাশ' : 'New Notice'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Toggle Bar */}
      <div className="lg:hidden bg-white rounded-2xl p-3 border border-slate-200 shadow-sm flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-emerald-800 text-white flex items-center justify-center shrink-0">
            {activeTab === 'overview' && <LayoutDashboard className="w-4 h-4" />}
            {activeTab === 'documents' && <Award className="w-4 h-4 text-amber-300" />}
            {activeTab === 'content' && <Sliders className="w-4 h-4 text-amber-300" />}
            {activeTab === 'students' && <Users className="w-4 h-4" />}
            {activeTab === 'admissions' && <GraduationCap className="w-4 h-4" />}
            {activeTab === 'fees' && <CreditCard className="w-4 h-4" />}
            {activeTab === 'notices' && <FileText className="w-4 h-4" />}
          </div>
          <div className="truncate">
            <div className="text-xs font-bold text-slate-900 truncate">
              {activeTab === 'overview' && (lang === 'bn' ? 'সারসংক্ষেপ ও পরিসংখ্যান' : 'Overview')}
              {activeTab === 'documents' && (lang === 'bn' ? 'দস্তারবন্দী সনদ, চিঠি ও মার্কশিট' : 'Sanad, Letters & Marksheets')}
              {activeTab === 'content' && (lang === 'bn' ? 'ওয়েবসাইট কনটেন্ট (CMS Demo)' : 'Website Content')}
              {activeTab === 'students' && (lang === 'bn' ? `শিক্ষার্থী তালিকা (${students.length})` : `Students (${students.length})`)}
              {activeTab === 'admissions' && (lang === 'bn' ? `ভর্তি আবেদন (${admissions.length})` : `Admissions (${admissions.length})`)}
              {activeTab === 'fees' && (lang === 'bn' ? 'ফি ও আয়-ব্যয়' : 'Fees & Accounts')}
              {activeTab === 'notices' && (lang === 'bn' ? `নোটিশ ব্যবস্থাপনা (${notices.length})` : `Notices (${notices.length})`)}
            </div>
            <div className="text-[10px] text-slate-500">
              {lang === 'bn' ? 'বর্তমান সক্রিয় সেকশন' : 'Current Section'}
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shrink-0 cursor-pointer"
        >
          <Menu className="w-3.5 h-3.5 text-emerald-800" />
          <span>{mobileMenuOpen ? (lang === 'bn' ? 'বন্ধ করুন' : 'Close') : (lang === 'bn' ? 'সব মেনু দেখুন' : 'All Menus')}</span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${mobileMenuOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Main Dashboard Layout: Sidebar + Content Area */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        
        {/* Left Sidebar Navigation */}
        <aside className={`w-full lg:w-72 xl:w-80 shrink-0 space-y-4 lg:sticky lg:top-20 transition-all ${
          mobileMenuOpen ? 'block' : 'hidden lg:block'
        }`}>
          <div className="bg-white rounded-3xl p-3 sm:p-4 border border-slate-200 shadow-sm space-y-3">
            
            {/* Sidebar Header */}
            <div className="flex items-center justify-between px-2 pt-1 pb-2 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-700 block">
                  {lang === 'bn' ? 'প্রশাসন কন্ট্রোল মেনু' : 'ADMIN CONTROL MENU'}
                </span>
                <span className="text-xs font-bold text-slate-800">
                  {lang === 'bn' ? 'ম্যানেজমেন্ট কনসোল' : 'Management Console'}
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
                ৭টি মডিউল
              </span>
            </div>

            {/* Vertical Menu Buttons */}
            <nav className="space-y-1">
              {[
                {
                  id: 'overview' as const,
                  label: lang === 'bn' ? 'সারসংক্ষেপ ও পরিসংখ্যান' : 'Overview & Analytics',
                  subtitle: lang === 'bn' ? 'সাধারণ পরিসংখ্যান ও মেট্রিক্স' : 'General metrics & quick view',
                  icon: LayoutDashboard,
                  badge: null
                },
                {
                  id: 'documents' as const,
                  label: lang === 'bn' ? 'সনদ, চিঠি ও মার্কশিট' : 'Sanad, Letters & Marksheets',
                  subtitle: lang === 'bn' ? 'দস্তারবন্দী সনদ, অফিসিয়াল চিঠি ও ফলাফল' : 'Certificates, memos & marksheets',
                  icon: Award,
                  badge: { text: `${sanads.length + letters.length} টি`, isHighlight: true, isAlert: false }
                },
                {
                  id: 'content' as const,
                  label: lang === 'bn' ? 'ওয়েবসাইট কনটেন্ট (CMS)' : 'Website Content (CMS)',
                  subtitle: lang === 'bn' ? 'ব্যানার, ব্লগ, গ্যালারি ও তথ্য' : 'Banners, blogs, gallery & info',
                  icon: Sliders,
                  badge: { text: 'CMS Demo', isHighlight: false, isAlert: false }
                },
                {
                  id: 'students' as const,
                  label: lang === 'bn' ? 'শিক্ষার্থী ডাটাবেজ' : 'Student Database',
                  subtitle: lang === 'bn' ? 'সকল ছাত্র ও হিফজ প্রগ্রেস' : 'All students & records',
                  icon: Users,
                  badge: { text: `${students.length} জন`, isHighlight: false, isAlert: false }
                },
                {
                  id: 'admissions' as const,
                  label: lang === 'bn' ? 'ভর্তি আবেদনসমূহ' : 'Admission Applications',
                  subtitle: lang === 'bn' ? 'অনলাইন ফরম ও অনুমোদন' : 'Applications & review',
                  icon: GraduationCap,
                  badge: admissions.some(a => a.status === 'pending')
                    ? { text: `${admissions.filter(a => a.status === 'pending').length} পেন্ডিং`, isHighlight: true, isAlert: true }
                    : { text: `${admissions.length} টি`, isHighlight: false, isAlert: false }
                },
                {
                  id: 'fees' as const,
                  label: lang === 'bn' ? 'ফি ও হিসাব-নিকাশ' : 'Fee & Financials',
                  subtitle: lang === 'bn' ? 'মাসিক বেতন ও বকেয়া ট্র্যাকিং' : 'Invoices & dues tracking',
                  icon: CreditCard,
                  badge: { text: 'হিসাব', isHighlight: false, isAlert: false }
                },
                {
                  id: 'notices' as const,
                  label: lang === 'bn' ? 'নোটিশ ও বিজ্ঞপ্তি' : 'Notice Board',
                  subtitle: lang === 'bn' ? 'মাদ্রাসার অফিসিয়াল সার্কুলার' : 'Official circulars',
                  icon: FileText,
                  badge: { text: `${notices.length} টি`, isHighlight: false, isAlert: false }
                }
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-2xl text-left transition-all duration-150 cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-emerald-800 to-teal-800 text-white shadow-md shadow-emerald-950/15'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-emerald-900'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition ${
                          isActive
                            ? 'bg-white/20 text-amber-300'
                            : 'bg-emerald-50 text-emerald-700 group-hover:bg-emerald-100'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <div className="text-xs font-bold truncate leading-tight">
                          {item.label}
                        </div>
                        <div
                          className={`text-[10px] truncate leading-tight mt-0.5 ${
                            isActive ? 'text-emerald-200' : 'text-slate-400'
                          }`}
                        >
                          {item.subtitle}
                        </div>
                      </div>
                    </div>

                    {item.badge && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ml-1.5 ${
                          isActive
                            ? 'bg-white/25 text-white'
                            : item.badge.isAlert
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : item.badge.isHighlight
                            ? 'bg-amber-400 text-amber-950 shadow-sm'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {item.badge.text}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Quick Actions in Sidebar */}
            <div className="pt-2 border-t border-slate-100 space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 block">
                {lang === 'bn' ? 'দ্রুত শর্টকাট' : 'Quick Actions'}
              </span>
              <button
                onClick={() => {
                  setShowAddStudent(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200/80 transition cursor-pointer"
              >
                <UserPlus className="w-3.5 h-3.5 text-amber-700" />
                <span>{lang === 'bn' ? 'নতুন শিক্ষার্থী ভর্তি' : 'New Admission'}</span>
              </button>
              <button
                onClick={() => {
                  setShowAddNotice(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-200/80 transition cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-emerald-700" />
                <span>{lang === 'bn' ? 'নোটিশ প্রকাশ' : 'New Notice'}</span>
              </button>
              {onNavigate && (
                <button
                  onClick={() => {
                    onNavigate('home');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200 transition cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                    <span>{lang === 'bn' ? 'মূল ওয়েবসাইট দেখুন' : 'View Public Website'}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              )}
            </div>

            {/* Institutional Accreditation Footnote */}
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-slate-50 to-emerald-50/50 border border-slate-100 text-center">
              <span className="text-[10px] text-slate-500 font-semibold block">
                {lang === 'bn' ? 'দারুল কুরআন একাডেমি' : 'Darul Quran Academy'}
              </span>
              <span className="text-[9px] text-emerald-800 font-bold block mt-0.5">
                {lang === 'bn' ? 'অধিভুক্তি: বেফাকুল মাদারিস • ২০২৬' : 'Wafaq Affiliated • 2026'}
              </span>
            </div>
          </div>
        </aside>

        {/* Right Main Content Area */}
        <main className="flex-1 min-w-0 w-full space-y-6">

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs text-slate-500 font-semibold">বর্তমান সক্রিয় ছাত্র</span>
              <div className="text-2xl font-black text-slate-900 font-mono">{students.length} জন</div>
              <span className="text-[11px] text-emerald-600 font-bold">হিফজ ও মক্তব বিভাগ</span>
            </div>
            <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs text-slate-500 font-semibold">যোগ্য শিক্ষক মণ্ডলী</span>
              <div className="text-2xl font-black text-teal-800 font-mono">{teachers.length} জন</div>
              <span className="text-[11px] text-teal-600 font-bold">সকল ক্বারী ও মুফতী</span>
            </div>
            <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs text-slate-500 font-semibold">মাসিক ফি আদায়</span>
              <div className="text-2xl font-black text-emerald-700 font-mono">৳ {totalCollected.toLocaleString()}</div>
              <span className="text-[11px] text-emerald-600 font-bold">অনলাইন ও ক্যাশ প্রাপ্ত</span>
            </div>
            <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs text-slate-500 font-semibold">বকেয়া ফি পাওনা</span>
              <div className="text-2xl font-black text-rose-600 font-mono">৳ {totalPending.toLocaleString()}</div>
              <span className="text-[11px] text-rose-500 font-bold">তাগাদা পাঠানো প্রয়োজন</span>
            </div>
          </div>

          {/* CMS Demo Highlight Banner */}
          <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-md border border-emerald-700/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-bold border border-amber-400/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>অ্যাডমিন কনটেন্ট পরিবর্তন ডেমো</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                ওয়েবসাইটের ব্যানার, ইসলামিক ব্লগ, গ্যালারি ও তথ্য পরিবর্তন করতে চান?
              </h3>
              <p className="text-xs text-emerald-200/80 max-w-2xl leading-relaxed">
                কোনো কোডিং ছাড়া সরাসরি অ্যাডমিন ড্যাশবোর্ড থেকে হোমপেজ ব্যানার স্লাইডার, ইসলামিক গবেষণা প্রবন্ধ, ফটো ও ভিডিও গ্যালারি এবং মাদ্রাসার পরিচিতি এডিট ও লাইভ আপডেট করুন।
              </p>
            </div>
            <button
              onClick={() => setActiveTab('content')}
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold text-xs rounded-xl shadow transition flex items-center gap-2 shrink-0 cursor-pointer self-start md:self-auto"
            >
              <span>কনটেন্ট পরিবর্তন ডেমো দেখুন</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Official Documents & Sanad Banner */}
          <div className="bg-gradient-to-r from-teal-900 via-emerald-900 to-emerald-950 text-white rounded-3xl p-5 sm:p-6 shadow-md border border-teal-700/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-[11px] font-bold border border-emerald-400/30">
                <Award className="w-3.5 h-3.5 text-amber-300" />
                <span>অফিসিয়াল ডকুমেন্টস ও প্রিন্ট হাব</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                দস্তারবন্দী হিফজ সনদ, অফিশিয়াল লেটারহেড চিঠি ও মার্কশিট
              </h3>
              <p className="text-xs text-teal-200/80 max-w-2xl leading-relaxed">
                হিফজ সমাপ্ত শিক্ষার্থীদের রাজকীয় ইসলামিক বর্ডারের সনদপত্র ইস্যু ও প্রিন্ট করুন, অফিসিয়াল সার্কুলার চিঠি লিখুন এবং পরীক্ষার প্রকাশিত মার্কশিট ডাউনলোড করুন।
              </p>
            </div>
            <button
              onClick={() => setActiveTab('documents')}
              className="px-5 py-2.5 bg-white hover:bg-emerald-50 text-emerald-950 font-bold text-xs rounded-xl shadow transition flex items-center gap-2 shrink-0 cursor-pointer self-start md:self-auto"
            >
              <span>সনদ, চিঠি ও মার্কশিট দেখুন</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Pending Admissions */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-base font-bold text-slate-800 mb-4">
              {lang === 'bn' ? 'নতুন ভর্তি আবেদন পর্যালোচনা' : 'Recent Admission Applications'}
            </h3>
            <div className="space-y-3">
              {admissions.map(adm => (
                <div key={adm.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      {adm.applicationNo}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-1">{adm.studentName}</h4>
                    <p className="text-xs text-slate-500">
                      পিতা: {adm.fatherName} | মোবাইল: {adm.guardianPhone} | পূর্বে মুখস্থ: {adm.memorizedParasBefore} পারা
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateAdmissionStatus(adm.id, 'approved')}
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition"
                    >
                      অনুমোদন করুন
                    </button>
                    <button
                      onClick={() => onUpdateAdmissionStatus(adm.id, 'interview_scheduled', '২০২৬-০৯-০৫ সকাল ১০:০০ টা')}
                      className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl transition"
                    >
                      ইন্টারভিউ শিডিউল
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Students Tab */}
      {activeTab === 'students' && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-800">সকল শিক্ষার্থীর ডেটাবেজ</h3>
            <button
              onClick={() => setShowAddStudent(true)}
              className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>নতুন ছাত্র যুক্ত করুন</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                  <th className="p-3">রোল ও নাম</th>
                  <th className="p-3">বিভাগ</th>
                  <th className="p-3">হিফজ সম্পন্ন</th>
                  <th className="p-3">চলমান সবক</th>
                  <th className="p-3">অভিভাবক ফোন</th>
                  <th className="p-3">মাসিক ফি</th>
                  <th className="p-3 text-center">স্ট্যাটাস</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {students.map(st => (
                  <tr key={st.id} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">{st.name} (রোল: {st.roll})</td>
                    <td className="p-3 text-slate-600">{st.groupOrClass}</td>
                    <td className="p-3 font-mono font-bold text-emerald-700">{st.completedParas} / ৩০ পারা</td>
                    <td className="p-3 font-medium text-slate-800">পারা {st.currentPara}</td>
                    <td className="p-3 font-mono text-slate-600">{st.guardianPhone}</td>
                    <td className="p-3 font-mono font-bold">৳ {st.monthlyFee}</td>
                    <td className="p-3 text-center">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded text-[10px] font-bold">সক্রিয়</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Admissions Tab */}
      {activeTab === 'admissions' && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
          <h3 className="text-base font-bold text-slate-800">অনলাইন ভর্তি আবেদন তালিকা</h3>
          <div className="space-y-3">
            {admissions.map(adm => (
              <div key={adm.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-emerald-800">{adm.applicationNo}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      adm.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {adm.status}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mt-1">{adm.studentName}</h4>
                  <p className="text-xs text-slate-500">
                    পিতা: {adm.fatherName} | এনআইডি: {adm.guardianNid} | ঠিকানা: {adm.presentAddress}
                  </p>
                  {adm.interviewDate && (
                    <p className="text-xs text-amber-700 font-semibold mt-1">ইন্টারভিউ: {adm.interviewDate}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {adm.status !== 'approved' && (
                    <button
                      onClick={() => onUpdateAdmissionStatus(adm.id, 'approved')}
                      className="px-3 py-1.5 bg-emerald-700 text-white text-xs font-bold rounded-xl"
                    >
                      ভর্তি চূড়ান্ত করুন
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fees Tab */}
      {activeTab === 'fees' && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
          <h3 className="text-base font-bold text-slate-800">ফি আদায় ও বকেয়া খতিয়ান</h3>
          <div className="space-y-2">
            {invoices.map(inv => (
              <div key={inv.id} className="p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <span className="font-mono text-[11px] text-slate-400">{inv.invoiceNo}</span>
                  <div className="font-bold text-slate-900">{inv.studentName} - {inv.title}</div>
                  <span className="text-slate-500">শেষ সময়: {inv.dueDate}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold font-mono">৳ {inv.amount}</span>
                  {inv.status === 'paid' ? (
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg font-bold">পরিশোধিত</span>
                  ) : (
                    <button
                      onClick={() => onUpdateInvoiceStatus(inv.id, 'paid')}
                      className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl"
                    >
                      ক্যাশে আদায় মার্ক করুন
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notices Tab */}
      {activeTab === 'notices' && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-800">নোটিশ বোর্ড সার্কুলার</h3>
            <button
              onClick={() => setShowAddNotice(true)}
              className="px-3 py-1.5 bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>নতুন সার্কুলার দিন</span>
            </button>
          </div>

          <div className="space-y-3">
            {notices.map(n => (
              <div key={n.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-800">{n.title}</span>
                  <span className="text-slate-400 font-mono">{n.date}</span>
                </div>
                <p className="text-xs text-slate-600">{n.content}</p>
                <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-200">
                  প্রকাশক: {n.author}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Content Management (CMS) Tab */}
      {activeTab === 'content' && (
        <AdminContentManager
          lang={lang}
          slides={slides}
          onUpdateSlide={onUpdateSlide}
          onAddSlide={onAddSlide}
          onDeleteSlide={onDeleteSlide}
          galleryItems={galleryItems}
          onAddGalleryItem={onAddGalleryItem}
          onUpdateGalleryItem={onUpdateGalleryItem}
          onDeleteGalleryItem={onDeleteGalleryItem}
          blogs={blogs}
          onAddBlog={onAddBlog}
          onUpdateBlog={onUpdateBlog}
          onDeleteBlog={onDeleteBlog}
          onNavigate={onNavigate}
        />
      )}

      {/* Official Documents, Sanad & Marksheet Tab */}
      {activeTab === 'documents' && (
        <OfficialDocumentsManager
          lang={lang}
          sanads={sanads}
          letters={letters}
          results={results}
          students={students}
          onAddSanad={onAddSanad}
          onDeleteSanad={onDeleteSanad}
          onAddLetter={onAddLetter}
          onDeleteLetter={onDeleteLetter}
          onOpenMarksheet={onOpenMarksheet}
        />
      )}

        </main>
      </div>

      {/* Add Student Modal */}
      {showAddStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150">
            <h3 className="text-base font-bold text-slate-900 mb-3">নতুন শিক্ষার্থী ভর্তি ফরম</h3>
            <form onSubmit={handleCreateStudent} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">শিক্ষার্থীর নাম</label>
                <input
                  type="text"
                  required
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  placeholder="যেমন: মুহাম্মদ রায়হান আহমেদ"
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">পিতার নাম</label>
                  <input
                    type="text"
                    value={newStudent.fatherName}
                    onChange={(e) => setNewStudent({ ...newStudent, fatherName: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">অভিভাবকের ফোন</label>
                  <input
                    type="tel"
                    required
                    value={newStudent.guardianPhone}
                    onChange={(e) => setNewStudent({ ...newStudent, guardianPhone: e.target.value })}
                    placeholder="017XXXXXXXX"
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">বিভাগ</label>
                  <select
                    value={newStudent.department}
                    onChange={(e) => setNewStudent({ ...newStudent, department: e.target.value as any })}
                    className="w-full px-3 py-2 border rounded-xl"
                  >
                    <option value="hifz">হিফজুল কুরআন বিভাগ</option>
                    <option value="maktab">নূরানী মক্তব বিভাগ</option>
                    <option value="tajweed">তাজবীদ ও ক্বিরাআত</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">পূর্বে মুখস্থ পারা</label>
                  <input
                    type="number"
                    min={0}
                    max={30}
                    value={newStudent.completedParas}
                    onChange={(e) => setNewStudent({ ...newStudent, completedParas: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddStudent(false)}
                  className="px-4 py-2 bg-slate-100 rounded-xl"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-700 text-white font-bold rounded-xl"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Notice Modal */}
      {showAddNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150">
            <h3 className="text-base font-bold text-slate-900 mb-3">জরুরি নোটিশ প্রকাশ করুন</h3>
            <form onSubmit={handleCreateNotice} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">নোটিশের শিরোনাম</label>
                <input
                  type="text"
                  required
                  value={newNotice.title}
                  onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                  placeholder="যেমন: পবিত্র রমজান উপলক্ষ্যে মাদ্রাসা বন্ধের নোটিশ"
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">নোটিশের বিবরণ</label>
                <textarea
                  rows={4}
                  required
                  value={newNotice.content}
                  onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                ></textarea>
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddNotice(false)}
                  className="px-4 py-2 bg-slate-100 rounded-xl"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-700 text-white font-bold rounded-xl"
                >
                  প্রকাশ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Globe, 
  LogIn, 
  LogOut, 
  Menu, 
  X, 
  Phone, 
  Clock, 
  Award, 
  Calendar, 
  CreditCard, 
  ClipboardList, 
  GraduationCap, 
  FileText, 
  Shield, 
  LayoutDashboard,
  User as UserIcon,
  Image as ImageIcon
} from 'lucide-react';
import { Language, User } from '../types';
import { getTranslation } from '../utils/translations';

interface NavbarProps {
  lang: Language;
  onLanguageChange?: (lang: Language) => void;
  onToggleLang?: () => void;
  currentUser: User | null;
  onLoginClick?: () => void;
  onOpenAuth?: () => void;
  onLogoutClick?: () => void;
  onLogout?: () => void;
  currentView: string;
  onNavigate: (view: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onLanguageChange,
  onToggleLang,
  currentUser,
  onLoginClick,
  onOpenAuth,
  onLogoutClick,
  onLogout,
  currentView,
  onNavigate
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');

  const triggerAuth = () => {
    if (onLoginClick) onLoginClick();
    else if (onOpenAuth) onOpenAuth();
  };

  const triggerLogout = () => {
    if (onLogoutClick) onLogoutClick();
    else if (onLogout) onLogout();
  };

  const triggerToggleLang = () => {
    if (onToggleLang) {
      onToggleLang();
    } else if (onLanguageChange) {
      onLanguageChange(lang === 'bn' ? 'en' : 'bn');
    }
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString(lang === 'bn' ? 'bn-BD' : 'en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [lang]);

  const navLinks = [
    { id: 'home', label: getTranslation(lang, 'navHome'), icon: BookOpen },
    { id: 'admission', label: getTranslation(lang, 'navAdmission'), icon: GraduationCap, highlight: true },
    { id: 'result', label: getTranslation(lang, 'navResult'), icon: Award },
    { id: 'diary', label: getTranslation(lang, 'navDiary'), icon: ClipboardList, badge: lang === 'bn' ? 'লাইভ' : 'Live' },
    { id: 'gallery', label: getTranslation(lang, 'navGallery'), icon: ImageIcon },
    { id: 'fees', label: getTranslation(lang, 'navFees'), icon: CreditCard },
    { id: 'notices', label: getTranslation(lang, 'navNotices'), icon: FileText },
    { id: 'routine', label: getTranslation(lang, 'navRoutine'), icon: Calendar },
    { id: 'teachers', label: getTranslation(lang, 'navTeachers'), icon: UserIcon },
    { id: 'about', label: getTranslation(lang, 'navAbout'), icon: Shield },
  ];

  const handleNav = (viewId: string) => {
    onNavigate(viewId);
    setMobileMenuOpen(false);
  };

  const handleUserDashboard = () => {
    if (!currentUser) {
      triggerAuth();
      return;
    }
    if (currentUser.role === 'parent') {
      handleNav('parent_dashboard');
    } else if (currentUser.role === 'teacher') {
      handleNav('teacher_dashboard');
    } else if (currentUser.role === 'admin') {
      handleNav('admin_dashboard');
    }
  };

  const getRoleBadge = () => {
    if (!currentUser) return null;
    switch (currentUser.role) {
      case 'parent': return lang === 'bn' ? 'অভিভাবক' : 'Guardian';
      case 'teacher': return lang === 'bn' ? 'উস্তাদ' : 'Teacher';
      case 'admin': return lang === 'bn' ? 'মুহতামিম' : 'Admin';
      default: return null;
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-emerald-100">
      {/* Top Utility Bar */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 text-emerald-100 text-xs px-4 py-1.5 font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <span className="flex items-center gap-1.5 text-emerald-200">
              <Phone className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'হেল্পলাইন:' : 'Helpline:'}</span>
              <a href="tel:+8801712345678" className="text-amber-300 font-bold hover:underline">+৮৮০ ১৭১২ ৩৪৫৬৭৮</a>
            </span>
            <span className="hidden sm:inline-block text-emerald-400/50">|</span>
            <span className="hidden sm:flex items-center gap-1.5 text-emerald-200">
              <Clock className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'সময়:' : 'Time:'}</span>
              <span className="text-white font-mono font-bold">{currentTime}</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Switch Button */}
            <button
              onClick={triggerToggleLang}
              className="flex items-center gap-1 px-2.5 py-0.5 bg-emerald-800/80 hover:bg-emerald-700 text-amber-300 rounded border border-emerald-600 font-semibold transition text-xs"
              title="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'English' : 'বাংলা'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Branding Header */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 sm:py-3 flex items-center justify-between">
        <div 
          onClick={() => handleNav('home')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white flex items-center justify-center shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform border border-emerald-400/30">
            <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-['Amiri'] text-emerald-700 font-bold text-sm sm:text-base tracking-wide">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
            </div>
            <h1 className="text-base sm:text-xl font-bold text-emerald-950 leading-tight group-hover:text-emerald-700 transition">
              {getTranslation(lang, 'madrasaName')}
            </h1>
            <p className="text-[11px] sm:text-xs text-slate-500 hidden sm:block">
              {getTranslation(lang, 'madrasaTagline')}
            </p>
          </div>
        </div>

        {/* Right Side: Single Unified Login / Authenticated User Profile */}
        <div className="hidden lg:flex items-center gap-3">
          {currentUser ? (
            <div className="flex items-center gap-3">
              {/* Single Role-Aware Dashboard Button */}
              <button
                onClick={handleUserDashboard}
                className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-emerald-700/25 transition transform hover:-translate-y-0.5"
              >
                <LayoutDashboard className="w-4 h-4 text-amber-300" />
                <span>{lang === 'bn' ? 'আমার ড্যাশবোর্ড' : 'My Dashboard'}</span>
              </button>

              {/* User Profile Info */}
              <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
                <img 
                  src={currentUser.avatar || 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=100&auto=format&fit=crop&q=80'} 
                  alt={currentUser.name} 
                  className="w-9 h-9 rounded-full object-cover border-2 border-emerald-500 shadow-sm"
                />
                <div className="text-left leading-tight">
                  <div className="text-xs font-bold text-slate-900 max-w-[130px] truncate">{currentUser.name}</div>
                  <span className="inline-block px-1.5 py-0.2 bg-emerald-100 text-emerald-800 font-bold text-[10px] rounded-md mt-0.5">
                    {getRoleBadge()}
                  </span>
                </div>
                <button
                  onClick={triggerLogout}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition ml-1"
                  title={lang === 'bn' ? 'লগআউট করুন' : 'Sign Out'}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Single Login Button */
            <button
              onClick={triggerAuth}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-700/25 transition hover:-translate-y-0.5 active:translate-y-0"
            >
              <LogIn className="w-4 h-4 text-amber-300" />
              <span>{lang === 'bn' ? 'লগইন করুন' : 'Sign In'}</span>
            </button>
          )}
        </div>

        {/* Mobile Hamburger & Quick Login */}
        <div className="flex items-center gap-2 lg:hidden">
          {currentUser ? (
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleUserDashboard}
                className="px-3 py-1.5 rounded-xl bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 shadow-sm"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-amber-300" />
                <span>{lang === 'bn' ? 'ড্যাশবোর্ড' : 'Dashboard'}</span>
              </button>
              <button
                onClick={triggerLogout}
                className="p-1.5 text-slate-500 hover:text-rose-600 rounded"
                title={lang === 'bn' ? 'লগআউট' : 'Logout'}
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={triggerAuth}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow"
            >
              <LogIn className="w-3.5 h-3.5 text-amber-300" />
              <span>{lang === 'bn' ? 'লগইন' : 'Login'}</span>
            </button>
          )}
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-emerald-50 text-emerald-900 hover:bg-emerald-100 transition"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Desktop Secondary Navigation Bar */}
      <nav className="hidden lg:block bg-emerald-900/5 border-t border-emerald-100/70">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-1 rtl:space-x-reverse py-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className={`relative px-3.5 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all ${
                    isActive
                      ? 'bg-emerald-700 text-white shadow-sm font-bold'
                      : link.highlight
                      ? 'text-emerald-900 bg-amber-100/80 hover:bg-amber-200 font-bold border border-amber-300/60'
                      : 'text-slate-700 hover:text-emerald-800 hover:bg-emerald-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-emerald-600'}`} />
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="ml-1 px-1.5 py-0.2 bg-amber-400 text-amber-950 font-bold text-[9px] rounded-full animate-pulse">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-emerald-200 shadow-xl px-4 py-4 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium flex items-center justify-between transition ${
                    isActive
                      ? 'bg-emerald-700 text-white font-bold'
                      : 'text-slate-700 hover:bg-emerald-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-emerald-600'}`} />
                    <span>{link.label}</span>
                  </div>
                  {link.badge && (
                    <span className="px-2 py-0.5 bg-amber-400 text-amber-950 font-bold text-[10px] rounded-full">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={triggerToggleLang}
              className="text-xs text-emerald-900 font-bold flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200"
            >
              <Globe className="w-4 h-4" />
              <span>{lang === 'bn' ? 'Switch to English' : 'বাংলা ভাষায় দেখুন'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

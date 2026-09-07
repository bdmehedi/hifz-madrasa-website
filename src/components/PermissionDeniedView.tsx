import React from 'react';
import { ShieldAlert, ArrowLeft, LogIn, Lock } from 'lucide-react';
import { Language, UserRole } from '../types';

interface PermissionDeniedViewProps {
  lang: Language;
  requiredRole: UserRole;
  userRole?: UserRole | 'guest';
  onNavigate: (view: string) => void;
  onOpenLogin: () => void;
}

export const PermissionDeniedView: React.FC<PermissionDeniedViewProps> = ({
  lang,
  requiredRole,
  userRole = 'guest',
  onNavigate,
  onOpenLogin
}) => {
  const getRoleTitle = (role: UserRole) => {
    switch (role) {
      case 'admin': return lang === 'bn' ? 'মুহতামিম / কেন্দ্রীয় প্রশাসন' : 'Principal / Central Admin';
      case 'teacher': return lang === 'bn' ? 'সম্মানিত উস্তাদ / শিক্ষক' : 'Respected Teacher / Faculty';
      case 'parent': return lang === 'bn' ? 'সম্মানিত অভিভাবক' : 'Honorable Guardian / Parent';
      default: return lang === 'bn' ? 'অনুমোদিত ব্যবহারকারী' : 'Authorized User';
    }
  };

  const getCurrentRoleTitle = () => {
    if (userRole === 'guest') return lang === 'bn' ? 'সাধারণ দর্শনার্থী (লগইন করা নেই)' : 'Guest (Not Signed In)';
    return getRoleTitle(userRole as UserRole);
  };

  return (
    <div className="max-w-2xl mx-auto my-12 p-8 bg-white rounded-3xl border border-rose-200 shadow-xl text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
      <div className="w-20 h-20 rounded-3xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto shadow-inner">
        <ShieldAlert className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <span className="inline-block px-3 py-1 bg-rose-100 text-rose-800 rounded-full text-xs font-bold tracking-wide">
          {lang === 'bn' ? 'অনুমতি সংরক্ষিত (Role-Protected)' : 'Permission Restricted'}
        </span>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
          {lang === 'bn' ? 'এই প্যানেলে প্রবেশের অনুমতি নেই' : 'Access Restricted to this Panel'}
        </h2>
        <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
          {lang === 'bn'
            ? `এই বিভাগটি শুধুমাত্র "${getRoleTitle(requiredRole)}"-এর জন্য সংরক্ষিত। আপনার বর্তমান রোল: "${getCurrentRoleTitle()}"।`
            : `This section is restricted to "${getRoleTitle(requiredRole)}". Your current role is: "${getCurrentRoleTitle()}".`}
        </p>
      </div>

      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-2 max-w-md mx-auto text-left">
        <div className="flex items-center gap-2 font-semibold text-slate-800">
          <Lock className="w-4 h-4 text-amber-600" />
          <span>{lang === 'bn' ? 'একক লগইন ও রোল ব্যবস্থাপনা:' : 'Unified Login & Permissions:'}</span>
        </div>
        <p className="text-[11px] leading-relaxed text-slate-600">
          {lang === 'bn'
            ? 'সকলের জন্য একটি সাধারণ লগইন ব্যবস্থা রয়েছে। আপনি আপনার সঠিক আইডি ও পাসওয়ার্ড দিয়ে লগইন করলে সিস্টেম স্বয়ংক্রিয়ভাবে আপনাকে নির্ধারিত ড্যাশবোর্ডে নিয়ে যাবে।'
            : 'A single unified login exists for everyone. Sign in with your registered ID/Phone to automatically receive your authorized permissions.'}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <button
          onClick={() => onNavigate('home')}
          className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-2 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{lang === 'bn' ? 'হোমপেজে ফিরে যান' : 'Back to Home'}</span>
        </button>

        {userRole === 'guest' ? (
          <button
            onClick={onOpenLogin}
            className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md shadow-emerald-700/30 flex items-center gap-2 transition"
          >
            <LogIn className="w-4 h-4" />
            <span>{lang === 'bn' ? 'লগইন করুন' : 'Sign In Now'}</span>
          </button>
        ) : (
          <button
            onClick={onOpenLogin}
            className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md shadow-emerald-700/30 flex items-center gap-2 transition"
          >
            <LogIn className="w-4 h-4" />
            <span>{lang === 'bn' ? 'অন্য অ্যাকাউন্ট দিয়ে লগইন করুন' : 'Switch Account / Login'}</span>
          </button>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Key, 
  User as UserIcon, 
  AlertCircle,
  Eye,
  EyeOff,
  LogIn
} from 'lucide-react';
import { Language, User } from '../types';
import { getTranslation } from '../utils/translations';
import { INITIAL_USERS, INITIAL_TEACHERS, INITIAL_STUDENTS } from '../data/initialData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onLoginSuccess: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  lang,
  onLoginSuccess
}) => {
  const [identifier, setIdentifier] = useState('01933445566');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  // Single unified role detector & authenticator
  const findUserByIdentifier = (input: string): User | null => {
    const cleanInput = input.trim().toLowerCase();
    const numericInput = cleanInput.replace(/[^0-9]/g, '');

    // 1. Direct match in INITIAL_USERS
    const directUser = INITIAL_USERS.find(u => 
      (u.phone && (u.phone.toLowerCase() === cleanInput || (numericInput && u.phone.replace(/[^0-9]/g, '') === numericInput))) ||
      (u.email && u.email.toLowerCase() === cleanInput) ||
      (u.studentId && u.studentId.toLowerCase() === cleanInput) ||
      (u.teacherId && u.teacherId.toLowerCase() === cleanInput) ||
      (u.id && u.id.toLowerCase() === cleanInput)
    );
    if (directUser) return directUser;

    // 2. Check Admin keywords or email
    if (cleanInput === 'admin' || cleanInput === 'principal' || cleanInput === 'muhtamim' || cleanInput === '01711112233' || cleanInput.includes('principal@')) {
      return INITIAL_USERS.find(u => u.role === 'admin') || {
        id: 'user-admin',
        name: 'মুফতী মাহমুদ হাসান (মুহতামিম)',
        nameEn: 'Mufti Mahmud Hasan (Principal)',
        phone: '01711112233',
        email: 'principal@darulquran.edu.bd',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80'
      };
    }

    // 3. Check Teachers Directory
    const matchedTeacher = INITIAL_TEACHERS.find(t => 
      t.id.toLowerCase() === cleanInput ||
      t.email.toLowerCase() === cleanInput ||
      (t.phone && (t.phone.toLowerCase() === cleanInput || (numericInput && t.phone.replace(/[^0-9]/g, '') === numericInput))) ||
      t.name.toLowerCase().includes(cleanInput)
    );
    if (matchedTeacher) {
      if (matchedTeacher.id === 'T-104' || matchedTeacher.designation.includes('মুহতামিম')) {
        return {
          id: matchedTeacher.id,
          name: matchedTeacher.name,
          nameEn: matchedTeacher.nameEn,
          phone: matchedTeacher.phone,
          email: matchedTeacher.email,
          role: 'admin',
          teacherId: matchedTeacher.id,
          avatar: matchedTeacher.photoUrl
        };
      }
      return {
        id: matchedTeacher.id,
        name: matchedTeacher.name,
        nameEn: matchedTeacher.nameEn,
        phone: matchedTeacher.phone,
        email: matchedTeacher.email,
        role: 'teacher',
        teacherId: matchedTeacher.id,
        avatar: matchedTeacher.photoUrl
      };
    }

    // 4. Check Students / Guardians Directory
    const matchedStudent = INITIAL_STUDENTS.find(s => 
      s.id.toLowerCase() === cleanInput ||
      s.roll.toLowerCase() === cleanInput ||
      (s.guardianPhone && (s.guardianPhone.toLowerCase() === cleanInput || (numericInput && s.guardianPhone.replace(/[^0-9]/g, '') === numericInput))) ||
      s.name.toLowerCase().includes(cleanInput) ||
      s.fatherName.toLowerCase().includes(cleanInput)
    );
    if (matchedStudent) {
      return {
        id: `P-${matchedStudent.id}`,
        name: `${matchedStudent.fatherName} (অভিভাবক)`,
        nameEn: `${matchedStudent.nameEn}'s Guardian`,
        phone: matchedStudent.guardianPhone,
        email: `guardian.${matchedStudent.roll}@darulquran.edu.bd`,
        role: 'parent',
        studentId: matchedStudent.id,
        avatar: matchedStudent.photoUrl
      };
    }

    return null;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!identifier.trim()) {
      setErrorMsg(lang === 'bn' ? 'অনুগ্রহ করে মোবাইল নম্বর, ইমেইল অথবা ইউজার আইডি লিখুন' : 'Please enter your Mobile, Email or User ID');
      return;
    }
    if (!password) {
      setErrorMsg(lang === 'bn' ? 'অনুগ্রহ করে পাসওয়ার্ড বা পিন প্রদান করুন' : 'Please enter your password or PIN');
      return;
    }

    const matchedUser = findUserByIdentifier(identifier);

    if (matchedUser) {
      if (password.length < 3) {
        setErrorMsg(lang === 'bn' ? 'পাসওয়ার্ড কমপক্ষে ৪ অক্ষরের হতে হবে' : 'Password must be at least 4 characters');
        return;
      }
      onLoginSuccess(matchedUser);
      onClose();
    } else {
      setErrorMsg(
        lang === 'bn' 
          ? 'ব্যবহারকারী খুঁজে পাওয়া যায়নি! সঠিক মোবাইল নম্বর বা আইডি লিখুন।' 
          : 'User not found! Please check your ID/Phone or use the demo credentials below.'
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl shadow-2xl border border-emerald-100 max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full text-emerald-200 hover:text-white hover:bg-emerald-800/60 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-800/80 border border-emerald-400/40 flex items-center justify-center text-amber-300 shadow-md">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold leading-tight">
                {lang === 'bn' ? 'মাদ্রাসা পোর্টাল লগইন' : 'Madrasa Portal Sign In'}
              </h2>
              <p className="text-xs text-emerald-200 font-normal mt-0.5">
                {lang === 'bn'
                  ? 'আপনার মোবাইল নম্বর বা আইডি দিয়ে প্রবেশ করুন'
                  : 'Enter your phone or ID to access your dashboard'}
              </p>
            </div>
          </div>
        </div>

        {/* Single Login Form */}
        <div className="p-6 space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 text-rose-800 text-xs flex items-center gap-2 border border-rose-200">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span className="font-medium">{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {lang === 'bn' ? 'মোবাইল নম্বর / ইমেইল / আইডি' : 'Mobile Number / Email / User ID'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={lang === 'bn' ? 'যেমন: 01933445566' : 'e.g. 01933445566'}
                  className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none transition shadow-sm"
                  required
                />
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  {getTranslation(lang, 'enterPin')}
                </label>
                <span className="text-[11px] text-slate-400 font-mono">
                  (পিন: 123456)
                </span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••"
                  className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono tracking-wider shadow-sm transition"
                  required
                />
                <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-1">
              <button
                type="submit"
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-bold rounded-xl shadow-lg shadow-emerald-700/25 transition transform active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4 text-amber-300" />
                <span>{lang === 'bn' ? 'লগইন করুন' : 'Sign In'}</span>
              </button>
            </div>
          </form>

          {/* Quick Demo Test Buttons */}
          <div className="pt-3 border-t border-slate-100">
            <div className="text-[11px] text-slate-500 font-bold mb-2">
              {lang === 'bn' ? 'দ্রুত ডেমো অ্যাকাউন্টে টেস্ট করুন:' : 'Quick Demo Test Accounts:'}
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => { setIdentifier('01933445566'); setPassword('123456'); setErrorMsg(''); }}
                className="p-2 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 text-center transition"
              >
                <div className="text-[11px] font-bold text-slate-800">{lang === 'bn' ? 'অভিভাবক' : 'Guardian'}</div>
                <div className="text-[10px] text-slate-500 font-mono">01933445566</div>
              </button>

              <button
                type="button"
                onClick={() => { setIdentifier('01822334455'); setPassword('123456'); setErrorMsg(''); }}
                className="p-2 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 text-center transition"
              >
                <div className="text-[11px] font-bold text-slate-800">{lang === 'bn' ? 'উস্তাদ' : 'Teacher'}</div>
                <div className="text-[10px] text-slate-500 font-mono">01822334455</div>
              </button>

              <button
                type="button"
                onClick={() => { setIdentifier('01711112233'); setPassword('123456'); setErrorMsg(''); }}
                className="p-2 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 text-center transition"
              >
                <div className="text-[11px] font-bold text-slate-800">{lang === 'bn' ? 'মুহতামিম' : 'Admin'}</div>
                <div className="text-[10px] text-slate-500 font-mono">01711112233</div>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

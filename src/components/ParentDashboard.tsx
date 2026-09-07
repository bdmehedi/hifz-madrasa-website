import React, { useState } from 'react';
import { 
  ClipboardList, 
  CheckCircle, 
  Calendar, 
  CreditCard, 
  Award, 
  BookOpen, 
  User as UserIcon, 
  Phone, 
  Clock, 
  ShieldCheck, 
  MessageSquare, 
  Printer, 
  Download, 
  Check, 
  AlertCircle,
  FileCheck,
  Send
} from 'lucide-react';
import { 
  Language, 
  Student, 
  SabaqDiaryEntry, 
  ExamResult, 
  FeeInvoice, 
  HifzQuality 
} from '../types';
import { getTranslation } from '../utils/translations';

interface ParentDashboardProps {
  lang: Language;
  student: Student;
  allStudents: Student[];
  onSelectStudent: (student: Student) => void;
  diaries: SabaqDiaryEntry[];
  onSignDiary: (diaryId: string, comment?: string) => void;
  results: ExamResult[];
  invoices: FeeInvoice[];
  onPayInvoice: (invoice: FeeInvoice) => void;
  onOpenReceipt: (invoice: FeeInvoice) => void;
  onOpenMarksheet: (result: ExamResult) => void;
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({
  lang,
  student,
  allStudents,
  onSelectStudent,
  diaries,
  onSignDiary,
  results,
  invoices,
  onPayInvoice,
  onOpenReceipt,
  onOpenMarksheet
}) => {
  const [activeTab, setActiveTab] = useState<'diary' | 'attendance' | 'fees' | 'results' | 'message'>('diary');
  const [parentComment, setParentComment] = useState('');
  const [leaveMsg, setLeaveMsg] = useState({ date: '', days: '1', reason: '' });
  const [leaveSubmitted, setLeaveSubmitted] = useState(false);

  // Student specific data filters
  const studentDiaries = diaries.filter(d => d.studentId === student.id);
  const todayDiary = studentDiaries[0] || null;
  const studentResults = results.filter(r => r.studentId === student.id);
  const studentInvoices = invoices.filter(i => i.studentId === student.id);
  const unpaidInvoices = studentInvoices.filter(i => i.status === 'unpaid');

  // Hifz calculation
  const totalParas = 30;
  const completedPercentage = Math.round((student.completedParas / totalParas) * 100);

  const getQualityBadge = (quality: HifzQuality) => {
    switch (quality) {
      case 'excellent':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">ممتاز (মুমতাজ / অতি উত্তম)</span>;
      case 'very_good':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-100 text-teal-800 border border-teal-300">جيد جداً (জায়্যিদ জিদ্দান / উত্তম)</span>;
      case 'good':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300">جيد (জায়্যিদ / ভালো)</span>;
      case 'pass':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">مقبول (মাকবুল / চলতি)</span>;
      case 'needs_improvement':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">ضعيف (দয়ীফ / যত্ন আবশ্যক)</span>;
      default:
        return null;
    }
  };

  const handleSign = (diaryId: string) => {
    onSignDiary(diaryId, parentComment.trim() || undefined);
    setParentComment('');
  };

  const handleLeaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaveMsg.reason) return;
    setLeaveSubmitted(true);
    setTimeout(() => {
      setLeaveSubmitted(false);
      setLeaveMsg({ date: '', days: '1', reason: '' });
    }, 2500);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Child Selector */}
      <div className="bg-gradient-to-r from-amber-800 via-amber-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-700/40 relative overflow-hidden">
        {/* Background Islamic Pattern watermark */}
        <div className="absolute right-0 top-0 opacity-10 text-9xl font-['Amiri'] pointer-events-none select-none">
          الْقُرْآن
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <img
              src={student.photoUrl}
              alt={student.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-amber-400 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-amber-400 text-amber-950 rounded text-[11px] font-bold">
                  {student.groupOrClass}
                </span>
                <span className="text-xs text-amber-200">রোল: {student.roll} | আইডি: {student.id}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold mt-1 text-white">
                {student.name}
              </h1>
              <p className="text-xs text-amber-200 mt-0.5 flex items-center gap-1">
                <UserIcon className="w-3.5 h-3.5" />
                <span>উস্তাদ: {student.assignedUstadName}</span>
              </p>
            </div>
          </div>

          {/* Child Switcher dropdown */}
          <div className="bg-amber-950/60 backdrop-blur-sm p-3 rounded-2xl border border-amber-700/50 flex flex-col gap-2 min-w-[240px]">
            <span className="text-[11px] text-amber-300 font-semibold">
              {lang === 'bn' ? 'সন্তান পরিবর্তন করুন:' : 'Select Active Student:'}
            </span>
            <select
              value={student.id}
              onChange={(e) => {
                const found = allStudents.find(s => s.id === e.target.value);
                if (found) onSelectStudent(found);
              }}
              className="w-full bg-slate-900 text-white text-xs py-1.5 px-2.5 rounded-xl border border-amber-600/60 focus:outline-none"
            >
              {allStudents.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name} (রোল: {s.roll})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Hifz Progress Bar & Current Status */}
        <div className="mt-6 pt-6 border-t border-amber-700/50 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 bg-slate-900/40 p-3.5 rounded-2xl border border-amber-600/30">
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="text-amber-200 font-semibold">{lang === 'bn' ? 'হিফজুল কুরআন অগ্রগতি:' : 'Hifz Progress:'}</span>
              <span className="text-amber-300 font-mono font-bold">{student.completedParas} / {totalParas} পারা সম্পন্ন ({completedPercentage}%)</span>
            </div>
            <div className="w-full h-3.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-amber-500/30">
              <div
                className="h-full bg-gradient-to-r from-amber-400 via-emerald-400 to-emerald-500 rounded-full transition-all duration-500 shadow"
                style={{ width: `${completedPercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-900/40 p-3.5 rounded-2xl border border-amber-600/30">
            <span className="text-[11px] text-amber-200 block">{lang === 'bn' ? 'বর্তমান চলমান পারা ও সবক:' : 'Active Para & Sabaq:'}</span>
            <span className="text-xs font-bold text-white block mt-0.5">পারা {student.currentPara}: {student.currentSurah}</span>
          </div>

          <div className="bg-slate-900/40 p-3.5 rounded-2xl border border-amber-600/30 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-amber-200 block">{lang === 'bn' ? 'বকেয়া ফি স্ট্যাটাস:' : 'Pending Dues:'}</span>
              <span className="text-xs font-bold text-white mt-0.5 block">
                {unpaidInvoices.length > 0 ? (
                  <span className="text-rose-400">৳ {unpaidInvoices.reduce((a, b) => a + b.amount, 0)} বকেয়া</span>
                ) : (
                  <span className="text-emerald-400">পরিশোধিত ✓</span>
                )}
              </span>
            </div>
            {unpaidInvoices.length > 0 && (
              <button
                onClick={() => setActiveTab('fees')}
                className="px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-amber-950 rounded-lg text-xs font-bold shadow transition"
              >
                {lang === 'bn' ? 'পরিশোধ' : 'Pay'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 bg-white rounded-2xl p-1.5 shadow-sm gap-1 overflow-x-auto text-xs font-bold">
        <button
          onClick={() => setActiveTab('diary')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition shrink-0 ${
            activeTab === 'diary'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <ClipboardList className="w-4 h-4" />
          <span>{lang === 'bn' ? 'ডিজিটাল ডায়েরি (সবক ট্র্যাকার)' : 'Digital Sabaq Diary'}</span>
        </button>

        <button
          onClick={() => setActiveTab('attendance')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition shrink-0 ${
            activeTab === 'attendance'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>{lang === 'bn' ? 'উপস্থিতি ও ছুটির আবেদন' : 'Attendance & Leave'}</span>
        </button>

        <button
          onClick={() => setActiveTab('fees')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition shrink-0 ${
            activeTab === 'fees'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>{lang === 'bn' ? 'অনলাইন ফি ও রসিদ' : 'Fees & Receipts'}</span>
          {unpaidInvoices.length > 0 && (
            <span className="px-1.5 py-0.2 bg-rose-500 text-white text-[10px] rounded-full">
              {unpaidInvoices.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('results')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition shrink-0 ${
            activeTab === 'results'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>{lang === 'bn' ? 'পরীক্ষার রিপোর্ট কার্ড' : 'Exam Report Cards'}</span>
        </button>

        <button
          onClick={() => setActiveTab('message')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition shrink-0 ${
            activeTab === 'message'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>{lang === 'bn' ? 'উস্তাদের সাথে যোগাযোগ' : 'Message Ustad'}</span>
        </button>
      </div>

      {/* Tab 1: Digital Diary (Sabaq Tracker) */}
      {activeTab === 'diary' && (
        <div className="space-y-6">
          {/* Today's Active Diary Card */}
          {todayDiary ? (
            <div className="bg-white rounded-3xl p-6 shadow-sm border-2 border-amber-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-800">
                      {lang === 'bn' ? 'আজকের লাইভ ডায়েরি ও সবক অগ্রগতি' : "Today's Live Sabaq Diary"}
                    </h2>
                    <p className="text-xs text-slate-500">
                      তারিখ: {todayDiary.date} | মুয়াল্লিম: {todayDiary.ustadName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-200">
                    উপস্থিতি: {todayDiary.attendance === 'present' ? 'উপস্থিত ✓' : 'অনুপস্থিত'}
                  </span>
                </div>
              </div>

              {/* 3 Pillars of Hifz Study */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
                
                {/* 1. Sabaq (নতুন সবক) */}
                <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-950 uppercase tracking-wide">
                      {getTranslation(lang, 'sabaq')}
                    </span>
                    {getQualityBadge(todayDiary.sabaqQuality)}
                  </div>
                  <div className="text-sm font-bold text-slate-900">
                    পারা {todayDiary.sabaqPara}: {todayDiary.sabaqSurah}
                  </div>
                  <p className="text-xs text-slate-600 font-medium">
                    {todayDiary.sabaqPagesOrAyat}
                  </p>
                </div>

                {/* 2. Sabqi (সবকী / পেছনের দৌর) */}
                <div className="p-4 bg-teal-50/70 rounded-2xl border border-teal-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-teal-950 uppercase tracking-wide">
                      {getTranslation(lang, 'sabqi')}
                    </span>
                    {getQualityBadge(todayDiary.sabqiQuality)}
                  </div>
                  <div className="text-sm font-bold text-slate-900">
                    পারা {todayDiary.sabqiPara}
                  </div>
                  <p className="text-xs text-slate-600 font-medium">
                    {todayDiary.sabqiPages}
                  </p>
                </div>

                {/* 3. Amokhta (আমোখতা / মঞ্জিল রিভিশন) */}
                <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-950 uppercase tracking-wide">
                      {getTranslation(lang, 'amokhta')}
                    </span>
                    {getQualityBadge(todayDiary.amokhtaQuality)}
                  </div>
                  <div className="text-sm font-bold text-slate-900">
                    {todayDiary.amokhtaPara > 0 ? `পারা ${todayDiary.amokhtaPara}` : 'কায়দা / কিতাব রিভিশন'}
                  </div>
                  <p className="text-xs text-slate-600 font-medium">
                    {todayDiary.amokhtaQuarterOrHalf}
                  </p>
                </div>

              </div>

              {/* Additional Maktab & Islamic Etiquette Studies */}
              {(todayDiary.maktabLesson || todayDiary.duaOrHadith || todayDiary.salahPractice) && (
                <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  {todayDiary.maktabLesson && (
                    <div>
                      <span className="text-slate-500 font-semibold block">{lang === 'bn' ? 'তাজবীদ ও কায়েদা:' : 'Tajweed Rule:'}</span>
                      <span className="text-slate-800 font-medium">{todayDiary.maktabLesson}</span>
                    </div>
                  )}
                  {todayDiary.duaOrHadith && (
                    <div>
                      <span className="text-slate-500 font-semibold block">{lang === 'bn' ? 'মাসনুন দোয়া / হাদিস:' : 'Daily Dua/Hadith:'}</span>
                      <span className="text-slate-800 font-medium">{todayDiary.duaOrHadith}</span>
                    </div>
                  )}
                  {todayDiary.salahPractice && (
                    <div>
                      <span className="text-slate-500 font-semibold block">{lang === 'bn' ? 'সালাত ও আমলি মস্ক:' : 'Salah Practice:'}</span>
                      <span className="text-slate-800 font-medium">{todayDiary.salahPractice}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Teacher Remarks */}
              <div className="mt-4 p-4 bg-amber-50/50 rounded-2xl border border-amber-200/80">
                <span className="text-xs font-bold text-amber-900 block mb-1">
                  {getTranslation(lang, 'ustadRemarks')}:
                </span>
                <p className="text-xs text-slate-700 italic">
                  "{todayDiary.ustadRemarks}"
                </p>
              </div>

              {/* Parent Acknowledgment & Signature Box */}
              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                {todayDiary.parentSigned ? (
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>{getTranslation(lang, 'signedSuccess')}</span>
                    {todayDiary.parentComment && (
                      <span className="text-slate-600 font-normal italic">("{todayDiary.parentComment}")</span>
                    )}
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <input
                      type="text"
                      value={parentComment}
                      onChange={(e) => setParentComment(e.target.value)}
                      placeholder={lang === 'bn' ? 'উস্তাদের উদ্দেশ্যে মন্তব্য লিখুন (ঐচ্ছিক)' : 'Write remarks to Ustad (optional)'}
                      className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                    <button
                      onClick={() => handleSign(todayDiary.id)}
                      className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 shadow"
                    >
                      <FileCheck className="w-4 h-4" />
                      <span>{getTranslation(lang, 'signDiary')}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-8 text-center bg-white rounded-3xl border border-slate-200">
              <ClipboardList className="w-12 h-12 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-600">
                {lang === 'bn' ? 'আজকের দিনের সবক এখনও আপলোড হয়নি।' : 'No Sabaq record uploaded yet for today.'}
              </p>
            </div>
          )}

          {/* Historical Sabaq Log Table */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-base font-bold text-slate-800 mb-4">
              {lang === 'bn' ? 'বিগত দিনের সবক ও আমোখতার খতিয়ান' : 'Historical Sabaq & Revision Log'}
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                    <th className="p-3 font-semibold">তারিখ</th>
                    <th className="p-3 font-semibold">{getTranslation(lang, 'sabaq')}</th>
                    <th className="p-3 font-semibold">{getTranslation(lang, 'sabqi')}</th>
                    <th className="p-3 font-semibold">{getTranslation(lang, 'amokhta')}</th>
                    <th className="p-3 font-semibold">মন্তব্য</th>
                    <th className="p-3 font-semibold text-center">অভিভাবক স্বাক্ষর</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {studentDiaries.map((entry) => (
                    <tr key={entry.id} className="hover:bg-slate-50/80">
                      <td className="p-3 font-mono font-medium text-slate-700">{entry.date}</td>
                      <td className="p-3">
                        <div className="font-bold text-slate-800">পারা {entry.sabaqPara}: {entry.sabaqSurah}</div>
                        <div className="text-[11px] text-slate-500">{entry.sabaqPagesOrAyat}</div>
                        <div className="mt-1">{getQualityBadge(entry.sabaqQuality)}</div>
                      </td>
                      <td className="p-3">
                        <div className="font-semibold text-slate-700">পারা {entry.sabqiPara}</div>
                        <div className="text-[11px] text-slate-500">{entry.sabqiPages}</div>
                      </td>
                      <td className="p-3">
                        <div className="font-semibold text-slate-700">{entry.amokhtaPara > 0 ? `পারা ${entry.amokhtaPara}` : '-'}</div>
                        <div className="text-[11px] text-slate-500">{entry.amokhtaQuarterOrHalf}</div>
                      </td>
                      <td className="p-3 text-slate-600 italic max-w-xs">{entry.ustadRemarks}</td>
                      <td className="p-3 text-center">
                        {entry.parentSigned ? (
                          <span className="text-emerald-600 font-bold flex items-center justify-center gap-1">
                            <Check className="w-4 h-4" />
                            <span>স্বাক্ষরিত</span>
                          </span>
                        ) : (
                          <button
                            onClick={() => handleSign(entry.id)}
                            className="px-2 py-1 text-[11px] bg-amber-100 text-amber-800 font-bold rounded hover:bg-amber-200"
                          >
                            স্বাক্ষর দিন
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Attendance Tracker */}
      {activeTab === 'attendance' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm text-center">
              <span className="text-xs text-slate-500 block">চলতি মাসে উপস্থিতি হার</span>
              <span className="text-2xl font-extrabold text-emerald-700 font-mono">৯৬.৫%</span>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm text-center">
              <span className="text-xs text-slate-500 block">মোট উপস্থিত দিন</span>
              <span className="text-2xl font-extrabold text-slate-800 font-mono">২৬ দিন</span>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm text-center">
              <span className="text-xs text-slate-500 block">অনুপস্থিতি</span>
              <span className="text-2xl font-extrabold text-rose-600 font-mono">০ দিন</span>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm text-center">
              <span className="text-xs text-slate-500 block">অনুমোদিত ছুটি</span>
              <span className="text-2xl font-extrabold text-amber-600 font-mono">১ দিন</span>
            </div>
          </div>

          {/* Leave Application Form */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-base font-bold text-slate-800 mb-2">
              {lang === 'bn' ? 'অনলাইনে ছুটির আবেদনপত্র' : 'Online Leave Application'}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              {lang === 'bn' 
                ? 'জরুরি প্রয়োজনে সন্তানের অগ্রিম ছুটির জন্য আবেদন করুন। উস্তাদ অনুমোদন করলে নোটিফিকেশন পাবেন।' 
                : 'Apply for advance leave. You will be notified once approved by the Ustad.'}
            </p>

            {leaveSubmitted ? (
              <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center gap-2 border border-emerald-200">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span>{lang === 'bn' ? 'ছুটির আবেদন সফলভাবে জমা হয়েছে। উস্তাদ যাচাই করবেন।' : 'Leave application submitted successfully.'}</span>
              </div>
            ) : (
              <form onSubmit={handleLeaveSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">ছুটির শুরুর তারিখ</label>
                  <input
                    type="date"
                    required
                    value={leaveMsg.date}
                    onChange={(e) => setLeaveMsg({ ...leaveMsg, date: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">মোট দিন সংখ্যা</label>
                  <select
                    value={leaveMsg.days}
                    onChange={(e) => setLeaveMsg({ ...leaveMsg, days: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="1">১ দিন</option>
                    <option value="2">২ দিন</option>
                    <option value="3">৩ দিন</option>
                    <option value="5">৫ দিন</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">ছুটির কারণ</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: অসুস্থতা / পারিবারিক অনুষ্ঠান"
                    value={leaveMsg.reason}
                    onChange={(e) => setLeaveMsg({ ...leaveMsg, reason: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div className="sm:col-span-3 flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{lang === 'bn' ? 'আবেদন পাঠান' : 'Submit Leave'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Online Fee Payment & Receipts */}
      {activeTab === 'fees' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-base font-bold text-slate-800 mb-4">
              {lang === 'bn' ? 'মাসিক বেতন ও বোর্ডিং ফি খতিয়ান' : 'Tuition & Boarding Invoices'}
            </h3>

            <div className="space-y-3">
              {studentInvoices.map((inv) => (
                <div
                  key={inv.id}
                  className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition ${
                    inv.status === 'unpaid'
                      ? 'bg-rose-50/40 border-rose-200'
                      : 'bg-emerald-50/30 border-emerald-200'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                        inv.status === 'unpaid' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {inv.status === 'unpaid' ? 'বকেয়া' : 'পরিশোধিত ✓'}
                      </span>
                      <span className="font-mono text-xs text-slate-500">ইনভয়েস: {inv.invoiceNo}</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">{inv.title}</h4>
                    <p className="text-xs text-slate-500">
                      পরিশোধের শেষ সময়: {inv.dueDate} {inv.paidDate && `| পরিশোধিত: ${inv.paidDate}`}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 justify-between sm:justify-end">
                    <div className="text-right">
                      <span className="text-xs text-slate-500 block">পরিমাণ</span>
                      <span className="text-base font-extrabold text-slate-900 font-mono">৳ {inv.amount.toLocaleString()}</span>
                    </div>

                    {inv.status === 'unpaid' ? (
                      <button
                        onClick={() => onPayInvoice(inv)}
                        className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center gap-1.5"
                      >
                        <CreditCard className="w-3.5 h-3.5 text-amber-300" />
                        <span>{lang === 'bn' ? 'বিকাশ/নগদে ফি দিন' : 'Pay Online'}</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => onOpenReceipt(inv)}
                        className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl border border-slate-300 transition flex items-center gap-1.5"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>{getTranslation(lang, 'viewReceipt')}</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Academic Report Cards & Results */}
      {activeTab === 'results' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-base font-bold text-slate-800 mb-4">
              {lang === 'bn' ? 'সাময়িক ও বার্ষিক পরীক্ষার একাডেমিক ট্রান্সক্রিপ্ট' : 'Examination Marksheets & Report Cards'}
            </h3>

            {studentResults.length > 0 ? (
              <div className="space-y-4">
                {studentResults.map((result) => (
                  <div key={result.id} className="p-5 rounded-2xl border border-emerald-200 bg-emerald-50/20 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-emerald-100 gap-2">
                      <div>
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                          শিক্ষাবর্ষ: {result.year}
                        </span>
                        <h4 className="text-base font-bold text-slate-900 mt-1">
                          {result.examTerm === '2nd_term' ? '২য় সাময়িক পরীক্ষা ২০২৬' : '১ম সাময়িক পরীক্ষা'}
                        </h4>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className="text-[11px] text-slate-500 block">জিপিএ ও গ্রেড</span>
                          <span className="text-sm font-extrabold text-emerald-800 font-mono">GPA {result.gpa} ({result.finalGrade})</span>
                        </div>
                        <button
                          onClick={() => onOpenMarksheet(result)}
                          className="px-3 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>{lang === 'bn' ? 'রিপোর্ট কার্ড প্রিন্ট' : 'Print Marksheet'}</span>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-white p-3 rounded-xl border border-slate-100">
                      <div>
                        <span className="text-slate-400 block">মোট প্রাপ্ত নম্বর:</span>
                        <span className="font-bold text-slate-800 font-mono">{result.totalObtainedMarks} / {result.totalFullMarks}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">প্রাপ্ত শতকরা:</span>
                        <span className="font-bold text-emerald-700 font-mono">{result.percentage}%</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">শ্রেণীতে মেধা স্থান:</span>
                        <span className="font-bold text-amber-700 font-mono">{result.positionInClass}ম (মোট {result.totalStudentsInClass} জন)</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">ফলাফল স্ট্যাটাস:</span>
                        <span className="font-bold text-emerald-600">উত্তীর্ণ (Passed)</span>
                      </div>
                    </div>

                    <div className="p-3 bg-amber-50/70 rounded-xl text-xs border border-amber-200">
                      <span className="font-bold text-amber-900 block mb-0.5">পরীক্ষক ও প্রধান শিক্ষকের মূল্যায়ন:</span>
                      <p className="text-slate-700 italic">"{result.ustadRemarks}"</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-slate-500 text-xs">
                কোনো পরীক্ষার ফলাফল এখনও প্রকাশিত হয়নি।
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 5: Contact Ustad */}
      {activeTab === 'message' && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">
                {lang === 'bn' ? `শ্রদ্ধেয় মুয়াল্লিম ${student.assignedUstadName} এর সাথে যোগাযোগ` : `Message Ustad ${student.assignedUstadName}`}
              </h3>
              <p className="text-xs text-slate-500">
                হিফজের পড়া বা শিক্ষার্থীর আচরণ সম্পর্কিত যেকোনো পরামর্শ বা বার্তা প্রেরণ করুন
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
            <div className="flex items-center gap-2 text-slate-700">
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>জরুরি কল সময়: আসর থেকে মাগরিব (বিকাল ৫:০০ - ৬:০০ টা)</span>
            </div>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); alert(lang === 'bn' ? 'বার্তাটি সফলভাবে উস্তাদের কাছে পৌঁছেছে!' : 'Message sent to Ustad!'); }} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">বার্তার বিষয়</label>
              <input
                type="text"
                placeholder="যেমন: সবক মুখস্থে সময় বৃদ্ধির পরামর্শ"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">বিস্তারিত বার্তা</label>
              <textarea
                rows={4}
                placeholder="আপনার বার্তা লিখুন..."
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold rounded-xl shadow transition"
            >
              বার্তা পাঠান
            </button>
          </form>
        </div>
      )}

    </div>
  );
};

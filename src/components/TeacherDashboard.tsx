import React, { useState } from 'react';
import { 
  ClipboardList, 
  CheckCircle, 
  Calendar, 
  Award, 
  UserCheck, 
  Plus, 
  Save, 
  BookOpen, 
  FileText, 
  User as UserIcon, 
  Clock, 
  Check, 
  X, 
  AlertCircle,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { 
  Language, 
  Teacher, 
  Student, 
  SabaqDiaryEntry, 
  ExamResult, 
  HifzQuality, 
  ClassRoutineDay 
} from '../types';
import { getTranslation } from '../utils/translations';

interface TeacherDashboardProps {
  lang: Language;
  teacher: Teacher;
  students: Student[];
  diaries: SabaqDiaryEntry[];
  onAddDiaryEntry: (entry: SabaqDiaryEntry) => void;
  results: ExamResult[];
  onUploadExamResult: (result: ExamResult) => void;
  routines: ClassRoutineDay[];
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  lang,
  teacher,
  students,
  diaries,
  onAddDiaryEntry,
  results,
  onUploadExamResult,
  routines
}) => {
  const [activeTab, setActiveTab] = useState<'sabaqEntry' | 'attendance' | 'marksUpload' | 'routine' | 'studentsList'>('sabaqEntry');

  // Sabaq Form State
  const [selectedStudentId, setSelectedStudentId] = useState<string>(students[0]?.id || 'ST-101');
  const [sabaqPara, setSabaqPara] = useState<number>(15);
  const [sabaqSurah, setSabaqSurah] = useState<string>('সূরা বনী ইসরাঈল');
  const [sabaqPagesOrAyat, setSabaqPagesOrAyat] = useState<string>('পৃষ্ঠা ২৮৩, আয়াত ২৫-৪০');
  const [sabaqQuality, setSabaqQuality] = useState<HifzQuality>('excellent');
  
  const [sabqiPara, setSabqiPara] = useState<number>(14);
  const [sabqiPages, setSabqiPages] = useState<string>('সূরা আন-নাহল পৃষ্ঠা ২৮০-২৮২');
  const [sabqiQuality, setSabqiQuality] = useState<HifzQuality>('very_good');

  const [amokhtaPara, setAmokhtaPara] = useState<number>(8);
  const [amokhtaQuarterOrHalf, setAmokhtaQuarterOrHalf] = useState<string>('পারা ৮ সম্পূর্ণ রিভিশন');
  const [amokhtaQuality, setAmokhtaQuality] = useState<HifzQuality>('excellent');

  const [maktabLesson, setMaktabLesson] = useState<string>('তাজবীদ: ইদগামে বাগুন্নাহ এর ৪টি হরফ মস্ক');
  const [duaOrHadith, setDuaOrHadith] = useState<string>('আয়াতুল কুরসী ও ঘুমানোর দোয়া');
  const [salahPractice, setSalahPractice] = useState<string>('তাশাহহুদ ও দরুদ শরিফ শুদ্ধ মস্ক');
  const [ustadRemarks, setUstadRemarks] = useState<string>('মাশাআল্লাহ, আজকের সবক ও আমোখতা অত্যন্ত চমৎকার হয়েছে।');
  const [diarySavedAlert, setDiarySavedAlert] = useState(false);

  // Quick Attendance State
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceMap, setAttendanceMap] = useState<Record<string, 'present' | 'absent' | 'late' | 'leave'>>(() => {
    const map: Record<string, 'present' | 'absent' | 'late' | 'leave'> = {};
    students.forEach(s => { map[s.id] = 'present'; });
    return map;
  });
  const [attendanceSavedAlert, setAttendanceSavedAlert] = useState(false);

  // Exam Marks Upload State
  const [markStudentId, setMarkStudentId] = useState(students[0]?.id || 'ST-101');
  const [examTerm, setExamTerm] = useState<'1st_term' | '2nd_term' | 'annual' | 'hifz_completion_test'>('2nd_term');
  const [hifzMarks, setHifzMarks] = useState<number>(95);
  const [tajweedMarks, setTajweedMarks] = useState<number>(48);
  const [amokhtaMarks, setAmokhtaMarks] = useState<number>(92);
  const [masayelMarks, setMasayelMarks] = useState<number>(47);
  const [hadithMarks, setHadithMarks] = useState<number>(49);
  const [examRemarks, setExamRemarks] = useState<string>('হিফজের ধারাবাহিকতা চমৎকার। মেধা তালিকার শীর্ষে অবস্থান করছে।');
  const [marksUploadAlert, setMarksUploadAlert] = useState(false);

  // Auto-fill student details when selected
  const handleStudentSelectForSabaq = (stId: string) => {
    setSelectedStudentId(stId);
    const st = students.find(s => s.id === stId);
    if (st) {
      setSabaqPara(st.currentPara);
      setSabaqSurah(st.currentSurah.split(' ')[0] || 'সূরা');
    }
  };

  const handleSaveDiary = (e: React.FormEvent) => {
    e.preventDefault();
    const st = students.find(s => s.id === selectedStudentId);
    if (!st) return;

    const newDiary: SabaqDiaryEntry = {
      id: 'DIARY-' + Date.now(),
      studentId: st.id,
      date: new Date().toISOString().split('T')[0],
      sabaqPara,
      sabaqSurah,
      sabaqPagesOrAyat,
      sabaqQuality,
      sabqiPara,
      sabqiPages,
      sabqiQuality,
      amokhtaPara,
      amokhtaQuarterOrHalf,
      amokhtaQuality,
      maktabLesson: maktabLesson || undefined,
      duaOrHadith: duaOrHadith || undefined,
      salahPractice: salahPractice || undefined,
      attendance: attendanceMap[st.id] || 'present',
      ustadRemarks,
      ustadName: teacher.name,
      parentSigned: false
    };

    onAddDiaryEntry(newDiary);
    setDiarySavedAlert(true);
    setTimeout(() => setDiarySavedAlert(false), 2500);
  };

  const handleSaveAttendance = () => {
    setAttendanceSavedAlert(true);
    setTimeout(() => setAttendanceSavedAlert(false), 2000);
  };

  const handleSaveMarks = (e: React.FormEvent) => {
    e.preventDefault();
    const targetStudent = students.find(s => s.id === markStudentId);
    if (!targetStudent) return;

    const totalObtained = Number(hifzMarks) + Number(tajweedMarks) + Number(amokhtaMarks) + Number(masayelMarks) + Number(hadithMarks);
    const totalFull = 100 + 50 + 100 + 50 + 50; // 350
    const pct = Math.round((totalObtained / totalFull) * 1000) / 10;

    let finalGrade = 'মাকবুল (B)';
    let gpa = '3.50';
    if (pct >= 90) { finalGrade = 'ممتاز (মুমতাজ / A+)'; gpa = '5.00'; }
    else if (pct >= 80) { finalGrade = 'جيد جداً (জায়্যিদ জিদ্দান / A)'; gpa = '4.50'; }
    else if (pct >= 70) { finalGrade = 'جيد (জায়্যিদ / A-)'; gpa = '4.00'; }

    const newResult: ExamResult = {
      id: 'RES-' + Date.now(),
      studentId: targetStudent.id,
      studentRoll: targetStudent.roll,
      studentName: targetStudent.name,
      studentNameEn: targetStudent.nameEn,
      examTerm,
      year: '2026',
      department: targetStudent.department,
      classOrGroup: targetStudent.groupOrClass,
      subjects: [
        { code: 'HIFZ-01', name: 'হিফজুল কুরআন তিলাওয়াত ও হেফজ মান', nameEn: 'Hifz Tilawat & Accuracy', fullMarks: 100, obtainedMarks: Number(hifzMarks), passMarks: 40, grade: hifzMarks >= 90 ? 'A+' : 'A' },
        { code: 'TAJ-02', name: 'তাজবীদ ও সিফাত লাহনে জলী/খফী', nameEn: 'Tajweed & Sifat Rules', fullMarks: 50, obtainedMarks: Number(tajweedMarks), passMarks: 20, grade: tajweedMarks >= 45 ? 'A+' : 'A' },
        { code: 'AMOK-03', name: 'আমোখতা / পেছনের মঞ্জিল পরীক্ষা', nameEn: 'Amokhta / Cumulative Revision', fullMarks: 100, obtainedMarks: Number(amokhtaMarks), passMarks: 40, grade: amokhtaMarks >= 90 ? 'A+' : 'A' },
        { code: 'MAS-04', name: 'মাসআলা ও জরুরি সুন্নাত-আদব', nameEn: 'Islamic Jurisprudence & Etiquette', fullMarks: 50, obtainedMarks: Number(masayelMarks), passMarks: 20, grade: masayelMarks >= 45 ? 'A+' : 'A' },
        { code: 'HAD-05', name: 'হাদিস ও দৈনন্দিন মাসনুন দোয়া', nameEn: 'Daily Hadith & Masnoon Duas', fullMarks: 50, obtainedMarks: Number(hadithMarks), passMarks: 20, grade: hadithMarks >= 45 ? 'A+' : 'A' }
      ],
      totalFullMarks: totalFull,
      totalObtainedMarks: totalObtained,
      percentage: pct,
      gpa,
      finalGrade,
      positionInClass: pct >= 95 ? 1 : 2,
      totalStudentsInClass: students.length,
      publishedDate: new Date().toISOString().split('T')[0],
      ustadRemarks: examRemarks,
      status: 'passed'
    };

    onUploadExamResult(newResult);
    setMarksUploadAlert(true);
    setTimeout(() => setMarksUploadAlert(false), 2500);
  };

  return (
    <div className="space-y-6">
      
      {/* Teacher Hero Profile Banner */}
      <div className="bg-gradient-to-r from-teal-800 via-teal-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-teal-700/40 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={teacher.photoUrl}
              alt={teacher.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-teal-400 shadow-md"
            />
            <div>
              <span className="px-2.5 py-0.5 bg-teal-400 text-teal-950 rounded text-xs font-bold">
                {teacher.designation}
              </span>
              <h1 className="text-xl sm:text-2xl font-bold mt-1 text-white">
                {teacher.name}
              </h1>
              <p className="text-xs text-teal-200 mt-0.5">
                {teacher.qualification} | শিক্ষক আইডি: {teacher.id}
              </p>
            </div>
          </div>

          <div className="flex gap-3 text-xs">
            <div className="bg-teal-950/70 p-3 rounded-2xl border border-teal-700/60 text-center min-w-[100px]">
              <span className="text-[11px] text-teal-300 block">মোট ছাত্র</span>
              <span className="text-lg font-bold font-mono text-white">{students.length} জন</span>
            </div>
            <div className="bg-teal-950/70 p-3 rounded-2xl border border-teal-700/60 text-center min-w-[100px]">
              <span className="text-[11px] text-teal-300 block">আজকের উপস্থিতি</span>
              <span className="text-lg font-bold font-mono text-emerald-400">১০০%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 bg-white rounded-2xl p-1.5 shadow-sm gap-1 overflow-x-auto text-xs font-bold">
        <button
          onClick={() => setActiveTab('sabaqEntry')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition shrink-0 ${
            activeTab === 'sabaqEntry'
              ? 'bg-teal-700 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <ClipboardList className="w-4 h-4" />
          <span>{lang === 'bn' ? 'দৈনিক সবক ও রোজনামচা এন্ট্রি' : 'Daily Sabaq Entry'}</span>
        </button>

        <button
          onClick={() => setActiveTab('attendance')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition shrink-0 ${
            activeTab === 'attendance'
              ? 'bg-teal-700 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>{lang === 'bn' ? 'দ্রুত ক্লাসের উপস্থিতি গ্রহণ' : 'Class Attendance Taker'}</span>
        </button>

        <button
          onClick={() => setActiveTab('marksUpload')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition shrink-0 ${
            activeTab === 'marksUpload'
              ? 'bg-teal-700 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>{lang === 'bn' ? 'পরীক্ষার নম্বর ও ফলাফল আপলোড' : 'Exam Marks Uploader'}</span>
        </button>

        <button
          onClick={() => setActiveTab('routine')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition shrink-0 ${
            activeTab === 'routine'
              ? 'bg-teal-700 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>{lang === 'bn' ? 'আমার ক্লাস রুটিন' : 'My Class Routine'}</span>
        </button>

        <button
          onClick={() => setActiveTab('studentsList')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition shrink-0 ${
            activeTab === 'studentsList'
              ? 'bg-teal-700 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <UserIcon className="w-4 h-4" />
          <span>{lang === 'bn' ? 'ছাত্রদের তালিকা ও হিফজ স্ট্যাটাস' : 'Students Directory'}</span>
        </button>
      </div>

      {/* Tab 1: Sabaq Diary Entry Form */}
      {activeTab === 'sabaqEntry' && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {lang === 'bn' ? 'ছাত্রের দৈনিক সবক ও ডিজিটাল ডায়েরি পূরণ করুন' : 'Fill Daily Student Sabaq Diary'}
              </h2>
              <p className="text-xs text-slate-500">
                তথ্য জমা দিলে অভিভাবকের ড্যাশবোর্ডে তাৎক্ষণিক আপডেট প্রদর্শিত হবে
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-semibold">ছাত্র নির্বাচন:</span>
              <select
                value={selectedStudentId}
                onChange={(e) => handleStudentSelectForSabaq(e.target.value)}
                className="bg-slate-50 border border-slate-300 text-slate-800 text-xs py-1.5 px-3 rounded-xl font-bold focus:ring-2 focus:ring-teal-500"
              >
                {students.map(s => (
                  <option key={s.id} value={s.id}>
                    রোল {s.roll} - {s.name} ({s.groupOrClass})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {diarySavedAlert && (
            <div className="p-3.5 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-2xl flex items-center gap-2 border border-emerald-200 animate-in fade-in duration-200">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <span>{lang === 'bn' ? 'আলহামদুলিল্লাহ! আজকের সবক ডায়েরি সফলভাবে সংরক্ষণ ও অভিভাবকদের কাছে পাঠানো হয়েছে।' : 'Sabaq diary saved and broadcasted to guardian dashboard.'}</span>
            </div>
          )}

          <form onSubmit={handleSaveDiary} className="space-y-6">
            
            {/* 3 Pillars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* 1. Sabaq (নতুন সবক) */}
              <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-3">
                <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
                  <span className="text-xs font-bold text-emerald-950 flex items-center gap-1">
                    <BookOpen className="w-4 h-4 text-emerald-700" />
                    <span>১. নতুন সবক (Sabaq)</span>
                  </span>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">পারা নম্বর</label>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={sabaqPara}
                    onChange={(e) => setSabaqPara(Number(e.target.value))}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xl font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">সূরা ও পৃষ্ঠা/আয়াত</label>
                  <input
                    type="text"
                    value={sabaqSurah}
                    onChange={(e) => setSabaqSurah(e.target.value)}
                    placeholder="যেমন: সূরা বনী ইসরাঈল"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xl mb-2"
                  />
                  <input
                    type="text"
                    value={sabaqPagesOrAyat}
                    onChange={(e) => setSabaqPagesOrAyat(e.target.value)}
                    placeholder="যেমন: পৃষ্ঠা ২৮৩, আয়াত ২৫-৪০"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">হিফজ মান / রেটিং</label>
                  <select
                    value={sabaqQuality}
                    onChange={(e) => setSabaqQuality(e.target.value as HifzQuality)}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xl font-bold text-emerald-900"
                  >
                    <option value="excellent">ممتاز (মুমতাজ / অতি উত্তম)</option>
                    <option value="very_good">جيد جداً (জায়্যিদ জিদ্দান / উত্তম)</option>
                    <option value="good">جيد (জায়্যিদ / ভালো)</option>
                    <option value="pass">مقبول (মাকবুল / চলতি)</option>
                    <option value="needs_improvement">ضعيف (দয়ীফ / দুর্বল)</option>
                  </select>
                </div>
              </div>

              {/* 2. Sabqi (সবকী / পেছনের পড়া) */}
              <div className="p-4 bg-teal-50/70 rounded-2xl border border-teal-200 space-y-3">
                <div className="flex items-center justify-between border-b border-teal-200 pb-2">
                  <span className="text-xs font-bold text-teal-950 flex items-center gap-1">
                    <BookOpen className="w-4 h-4 text-teal-700" />
                    <span>২. সবকী / দৌর (Sabqi)</span>
                  </span>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">পারা নম্বর</label>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={sabqiPara}
                    onChange={(e) => setSabqiPara(Number(e.target.value))}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xl font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">পৃষ্ঠা বা সূরার সীমা</label>
                  <input
                    type="text"
                    value={sabqiPages}
                    onChange={(e) => setSabqiPages(e.target.value)}
                    placeholder="যেমন: সূরা আন-নাহল শেষ ৫ পৃষ্ঠা"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">সবকী মান / রেটিং</label>
                  <select
                    value={sabqiQuality}
                    onChange={(e) => setSabqiQuality(e.target.value as HifzQuality)}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xl font-bold text-teal-900"
                  >
                    <option value="excellent">ممتاز (মুমতাজ / অতি উত্তম)</option>
                    <option value="very_good">جيد جداً (জায়্যিদ জিদ্দান / উত্তম)</option>
                    <option value="good">جيد (জায়্যিদ / ভালো)</option>
                    <option value="pass">مقبول (মাকবুল / চলতি)</option>
                    <option value="needs_improvement">ضعيف (দয়ীফ / দুর্বল)</option>
                  </select>
                </div>
              </div>

              {/* 3. Amokhta (আমোখতা / মঞ্জিল রিভিশন) */}
              <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200 space-y-3">
                <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                  <span className="text-xs font-bold text-amber-950 flex items-center gap-1">
                    <BookOpen className="w-4 h-4 text-amber-700" />
                    <span>৩. আমোখতা / মঞ্জিল (Amokhta)</span>
                  </span>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">পারা নম্বর (রিভিশন)</label>
                  <input
                    type="number"
                    min={0}
                    max={30}
                    value={amokhtaPara}
                    onChange={(e) => setAmokhtaPara(Number(e.target.value))}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xl font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">পড়া ও পরিধি</label>
                  <input
                    type="text"
                    value={amokhtaQuarterOrHalf}
                    onChange={(e) => setAmokhtaQuarterOrHalf(e.target.value)}
                    placeholder="যেমন: পারা ৮ সম্পূর্ণ"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">আমোখতা মান / রেটিং</label>
                  <select
                    value={amokhtaQuality}
                    onChange={(e) => setAmokhtaQuality(e.target.value as HifzQuality)}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xl font-bold text-amber-900"
                  >
                    <option value="excellent">ممتاز (মুমতাজ / অতি উত্তম)</option>
                    <option value="very_good">جيد جداً (জায়্যিদ জিদ্দান / উত্তম)</option>
                    <option value="good">جيد (জায়্যিদ / ভালো)</option>
                    <option value="pass">مقبول (মাকবুল / চলতি)</option>
                    <option value="needs_improvement">ضعيف (দয়ীফ / দুর্বল)</option>
                  </select>
                </div>
              </div>

            </div>

            {/* Additional Maktab & Islamic Etiquette Studies */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">তাজবীদ ও কায়দা পাঠ</label>
                <input
                  type="text"
                  value={maktabLesson}
                  onChange={(e) => setMaktabLesson(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">মাসনুন দোয়া / হাদিস</label>
                <input
                  type="text"
                  value={duaOrHadith}
                  onChange={(e) => setDuaOrHadith(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">সালাত ও চরিত্র গঠন মস্ক</label>
                <input
                  type="text"
                  value={salahPractice}
                  onChange={(e) => setSalahPractice(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xl"
                />
              </div>
            </div>

            {/* Ustad Remarks */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                মুয়াল্লিম / উস্তাদের মন্তব্য ও দিকনির্দেশনা:
              </label>
              <textarea
                rows={3}
                value={ustadRemarks}
                onChange={(e) => setUstadRemarks(e.target.value)}
                placeholder="ছাত্রের আজকের তিলাওয়াত মান, আচরণ ও বাসায় অনুশীলনের বিষয়ে দিকনির্দেশনা..."
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500"
              ></textarea>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>আজকের ডায়েরি সেভ ও অভিভাবকদের অবহিত করুন</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 2: Quick Class Attendance Taker */}
      {activeTab === 'attendance' && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
            <div>
              <h3 className="text-base font-bold text-slate-800">
                {lang === 'bn' ? 'হিফজ ক্লাসের শিক্ষার্থীদের দৈনিক উপস্থিতি গ্রহণ' : 'Class Attendance Taker'}
              </h3>
              <p className="text-xs text-slate-500">এক ক্লিকে সকল শিক্ষার্থীর উপস্থিতি মার্ক করুন ও রেকর্ড সংরক্ষণ করুন</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-600">তারিখ:</span>
              <input
                type="date"
                value={attendanceDate}
                onChange={(e) => setAttendanceDate(e.target.value)}
                className="px-3 py-1.5 text-xs border border-slate-300 rounded-xl bg-slate-50 font-bold"
              />
            </div>
          </div>

          {attendanceSavedAlert && (
            <div className="p-3 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2 border border-emerald-200">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>উপস্থিতির তথ্য সফলভাবে সংরক্ষিত হয়েছে!</span>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                  <th className="p-3">রোল ও ছাত্রের নাম</th>
                  <th className="p-3">বিভাগ / গ্রুপ</th>
                  <th className="p-3">বর্তমান সবক পারা</th>
                  <th className="p-3 text-center">উপস্থিতি স্ট্যাটাস</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {students.map((st) => {
                  const currentStatus = attendanceMap[st.id] || 'present';
                  return (
                    <tr key={st.id} className="hover:bg-slate-50">
                      <td className="p-3">
                        <div className="flex items-center gap-2.5">
                          <img src={st.photoUrl} alt={st.name} className="w-8 h-8 rounded-full object-cover border" />
                          <div>
                            <div className="font-bold text-slate-800">{st.name}</div>
                            <div className="text-[11px] text-slate-400">রোল: {st.roll}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 text-slate-600 font-medium">{st.groupOrClass}</td>
                      <td className="p-3 font-mono font-bold text-emerald-800">পারা {st.currentPara}</td>
                      <td className="p-3">
                        <div className="flex justify-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setAttendanceMap({ ...attendanceMap, [st.id]: 'present' })}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                              currentStatus === 'present'
                                ? 'bg-emerald-600 text-white shadow-sm'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            উপস্থিত
                          </button>
                          <button
                            type="button"
                            onClick={() => setAttendanceMap({ ...attendanceMap, [st.id]: 'late' })}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                              currentStatus === 'late'
                                ? 'bg-amber-500 text-white shadow-sm'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            বিলম্বে
                          </button>
                          <button
                            type="button"
                            onClick={() => setAttendanceMap({ ...attendanceMap, [st.id]: 'leave' })}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                              currentStatus === 'leave'
                                ? 'bg-blue-600 text-white shadow-sm'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            ছুটিতে
                          </button>
                          <button
                            type="button"
                            onClick={() => setAttendanceMap({ ...attendanceMap, [st.id]: 'absent' })}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                              currentStatus === 'absent'
                                ? 'bg-rose-600 text-white shadow-sm'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            অনুপস্থিত
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleSaveAttendance}
              className="px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>উপস্থিতি সংরক্ষণ করুন</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab 3: Exam Marks & Result Upload */}
      {activeTab === 'marksUpload' && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
            <div>
              <h3 className="text-base font-bold text-slate-800">
                {lang === 'bn' ? 'পরীক্ষার নম্বর এন্ট্রি ও ফলাফল প্রস্তুতকরণ' : 'Upload Exam Marks & Publish Result'}
              </h3>
              <p className="text-xs text-slate-500">নম্বর প্রদান করলে সিস্টেম স্বয়ংক্রিয়ভাবে জিপিএ, গ্রেড ও পজিশন গণনা করবে</p>
            </div>
            <div className="flex gap-2">
              <select
                value={examTerm}
                onChange={(e) => setExamTerm(e.target.value as any)}
                className="px-3 py-1.5 text-xs border border-slate-300 rounded-xl bg-slate-50 font-bold"
              >
                <option value="1st_term">১ম সাময়িক পরীক্ষা</option>
                <option value="2nd_term">২য় সাময়িক পরীক্ষা</option>
                <option value="annual">বার্ষিক পরীক্ষা</option>
                <option value="hifz_completion_test">হিফজ সমাপনী পরীক্ষা</option>
              </select>
            </div>
          </div>

          {marksUploadAlert && (
            <div className="p-3.5 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-2xl flex items-center gap-2 border border-emerald-200">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <span>পরীক্ষার নম্বরপত্র সফলভাবে তৈরি ও প্রকাশিত হয়েছে!</span>
            </div>
          )}

          <form onSubmit={handleSaveMarks} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">শিক্ষার্থী নির্বাচন করুন:</label>
              <select
                value={markStudentId}
                onChange={(e) => setMarkStudentId(e.target.value)}
                className="w-full sm:w-80 px-3 py-2 text-xs border border-slate-300 rounded-xl font-bold bg-white"
              >
                {students.map(s => (
                  <option key={s.id} value={s.id}>
                    রোল: {s.roll} - {s.name} ({s.groupOrClass})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <label className="block text-xs font-bold text-slate-800 mb-1">১. হিফজুল কুরআন তিলাওয়াত (পূর্ণমান: ১০০)</label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={hifzMarks}
                  onChange={(e) => setHifzMarks(Number(e.target.value))}
                  className="w-full px-3 py-1.5 text-sm font-bold font-mono border border-slate-300 rounded-xl bg-white"
                />
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <label className="block text-xs font-bold text-slate-800 mb-1">২. তাজবীদ ও সিফাত মস্ক (পূর্ণমান: ৫০)</label>
                <input
                  type="number"
                  min={0}
                  max={50}
                  value={tajweedMarks}
                  onChange={(e) => setTajweedMarks(Number(e.target.value))}
                  className="w-full px-3 py-1.5 text-sm font-bold font-mono border border-slate-300 rounded-xl bg-white"
                />
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <label className="block text-xs font-bold text-slate-800 mb-1">৩. আমোখতা / মঞ্জিল রিভিশন (পূর্ণমান: ১০০)</label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={amokhtaMarks}
                  onChange={(e) => setAmokhtaMarks(Number(e.target.value))}
                  className="w-full px-3 py-1.5 text-sm font-bold font-mono border border-slate-300 rounded-xl bg-white"
                />
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <label className="block text-xs font-bold text-slate-800 mb-1">৪. জরুরি মাসআলা ও আদব (পূর্ণমান: ৫০)</label>
                <input
                  type="number"
                  min={0}
                  max={50}
                  value={masayelMarks}
                  onChange={(e) => setMasayelMarks(Number(e.target.value))}
                  className="w-full px-3 py-1.5 text-sm font-bold font-mono border border-slate-300 rounded-xl bg-white"
                />
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <label className="block text-xs font-bold text-slate-800 mb-1">৫. হাদিস ও মাসনুন দোয়া (পূর্ণমান: ৫০)</label>
                <input
                  type="number"
                  min={0}
                  max={50}
                  value={hadithMarks}
                  onChange={(e) => setHadithMarks(Number(e.target.value))}
                  className="w-full px-3 py-1.5 text-sm font-bold font-mono border border-slate-300 rounded-xl bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">ফলাফল মূল্যায়ন ও মন্তব্য:</label>
              <input
                type="text"
                value={examRemarks}
                onChange={(e) => setExamRemarks(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-1.5"
              >
                <Award className="w-4 h-4 text-amber-300" />
                <span>ফলাফল ও মার্কশিট প্রকাশ করুন</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 4: Routine Viewer */}
      {activeTab === 'routine' && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
          <h3 className="text-base font-bold text-slate-800">
            {lang === 'bn' ? 'সাপ্তাহিক শিক্ষক রুটিন ও পিরিয়ড সূচি' : 'Weekly Teacher Routine'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {routines.slice(0, 4).map((day) => (
              <div key={day.day} className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <h4 className="text-xs font-bold text-teal-900 uppercase tracking-wider pb-2 border-b border-slate-200">
                  {lang === 'bn' ? day.day : day.dayEn}
                </h4>
                <div className="space-y-2 mt-3 text-xs">
                  {day.periods.map((p, idx) => (
                    <div key={idx} className="flex items-start justify-between bg-white p-2 rounded-xl border border-slate-100">
                      <div>
                        <span className="font-semibold text-slate-800 block">{lang === 'bn' ? p.subject : p.subjectEn}</span>
                        <span className="text-[11px] text-slate-500">{p.room} | উস্তাদ: {p.ustadName}</span>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 shrink-0">
                        {p.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Students List */}
      {activeTab === 'studentsList' && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
          <h3 className="text-base font-bold text-slate-800">
            {lang === 'bn' ? 'হিফজ ও মক্তব বিভাগের ছাত্রদের অগ্রগতি খতিয়ান' : 'Students Progress Directory'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {students.map((st) => (
              <div key={st.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                <div className="flex items-center gap-3">
                  <img src={st.photoUrl} alt={st.name} className="w-12 h-12 rounded-xl object-cover border" />
                  <div>
                    <span className="text-[10px] font-bold text-teal-700 uppercase">{st.groupOrClass}</span>
                    <h4 className="text-xs font-bold text-slate-900">{st.name}</h4>
                    <span className="text-[11px] text-slate-500 font-mono">রোল: {st.roll} | রক্ত: {st.bloodGroup}</span>
                  </div>
                </div>

                <div className="p-2.5 bg-white rounded-xl border border-slate-100 text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">হিফজ অগ্রগতি:</span>
                    <span className="font-bold text-emerald-800 font-mono">{st.completedParas} / ৩০ পারা</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">বর্তমান সবক:</span>
                    <span className="font-semibold text-slate-800">পারা {st.currentPara}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">অভিভাবক ফোন:</span>
                    <span className="font-mono text-slate-700">{st.guardianPhone}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

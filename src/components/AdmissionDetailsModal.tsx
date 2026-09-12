import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Phone, 
  MapPin, 
  BookOpen, 
  Home, 
  CreditCard, 
  UserCheck, 
  AlertCircle,
  FileText,
  User,
  School,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { AdmissionApplication, Language, DepartmentType, Student, Teacher } from '../types';

interface AdmissionDetailsModalProps {
  lang: Language;
  admission: AdmissionApplication;
  teachers?: Teacher[];
  students?: Student[];
  onClose: () => void;
  onUpdateStatus: (
    id: string, 
    status: 'approved' | 'rejected' | 'interview_scheduled' | 'pending', 
    interviewDate?: string,
    interviewScore?: number,
    remarks?: string
  ) => void;
  onEnrollAsStudent?: (newStudent: Student) => void;
}

export const AdmissionDetailsModal: React.FC<AdmissionDetailsModalProps> = ({
  lang,
  admission,
  teachers = [],
  students = [],
  onClose,
  onUpdateStatus,
  onEnrollAsStudent
}) => {
  const [currentStatus, setCurrentStatus] = useState<'pending' | 'interview_scheduled' | 'approved' | 'rejected'>(admission.status);
  const [interviewDate, setInterviewDate] = useState<string>(admission.interviewDate || '');
  const [interviewScore, setInterviewScore] = useState<string>(admission.interviewScore?.toString() || '');
  const [remarks, setRemarks] = useState<string>(admission.remarks || '');
  const [statusSaved, setStatusSaved] = useState<boolean>(false);

  // Enrollment state
  const [showEnrollForm, setShowEnrollForm] = useState<boolean>(false);
  const [assignedRoll, setAssignedRoll] = useState<string>(() => {
    const maxRoll = students.reduce((max, s) => {
      const num = parseInt(s.roll, 10);
      return !isNaN(num) && num > max ? num : max;
    }, 100);
    return (maxRoll + 1).toString();
  });
  const [assignedUstadId, setAssignedUstadId] = useState<string>(teachers[0]?.id || 'T-101');
  const [monthlyFee, setMonthlyFee] = useState<number>(4500);
  const [enrolledSuccess, setEnrolledSuccess] = useState<boolean>(false);

  const getDepartmentLabel = (dept: DepartmentType) => {
    switch (dept) {
      case 'hifz':
        return lang === 'bn' ? 'হিফজুল কুরআন বিভাগ' : 'Hifzul Quran Dept';
      case 'maktab':
        return lang === 'bn' ? 'নূরানী মক্তব ও কায়দা বিভাগ' : 'Noorani Maktab Dept';
      case 'tajweed':
        return lang === 'bn' ? 'তাজবীদ ও ক্বিরাআত বিশেষ বিভাগ' : 'Tajweed & Qiraat Dept';
      case 'kitab':
        return lang === 'bn' ? 'কিতাব ও আরবি ভাষা বিভাগ' : 'Kitab & Arabic Dept';
      default:
        return dept;
    }
  };

  const getResidentialLabel = (status: 'residential' | 'non_residential' | 'day_care') => {
    switch (status) {
      case 'residential':
        return lang === 'bn' ? 'পূর্ণ আবাসিক (বোর্ডিং)' : 'Residential (Boarding)';
      case 'non_residential':
        return lang === 'bn' ? 'অনাবাসিক (সাধারণ)' : 'Non-Residential';
      case 'day_care':
        return lang === 'bn' ? 'ডে-কেয়ার (সকাল-সন্ধ্যা)' : 'Day-Care';
      default:
        return status;
    }
  };

  const handleSaveStatus = (e: React.FormEvent) => {
    e.preventDefault();
    const scoreNum = interviewScore.trim() ? parseFloat(interviewScore) : undefined;
    onUpdateStatus(
      admission.id, 
      currentStatus, 
      interviewDate.trim() || undefined,
      scoreNum,
      remarks.trim() || undefined
    );
    setStatusSaved(true);
    setTimeout(() => setStatusSaved(false), 3000);
  };

  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onEnrollAsStudent) return;

    const selectedTeacher = teachers.find(t => t.id === assignedUstadId);

    const newStudent: Student = {
      id: `ST-${assignedRoll.trim()}`,
      roll: assignedRoll.trim(),
      name: admission.studentName,
      nameEn: admission.studentNameEn || admission.studentName,
      fatherName: admission.fatherName,
      motherName: admission.motherName,
      guardianPhone: admission.guardianPhone,
      department: admission.targetDepartment,
      groupOrClass: getDepartmentLabel(admission.targetDepartment),
      assignedUstadId: assignedUstadId,
      assignedUstadName: selectedTeacher?.name || 'হাফেজ ক্বারী আব্দুল্লাহ আল-মামুন',
      admissionDate: new Date().toISOString().split('T')[0],
      birthDate: admission.birthDate || '2015-01-01',
      bloodGroup: 'B+',
      address: admission.presentAddress,
      photoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80',
      status: 'active',
      completedParas: admission.memorizedParasBefore || 0,
      currentPara: (admission.memorizedParasBefore || 0) + 1,
      currentSurah: 'নতুন পাঠ্যক্রম',
      currentAyatRange: 'প্রথম পাঠ',
      monthlyFee: Number(monthlyFee) || 4500
    };

    onEnrollAsStudent(newStudent);
    onUpdateStatus(admission.id, 'approved', interviewDate, Number(interviewScore) || undefined, 'শিক্ষার্থী হিসেবে ভর্তি সম্পন্ন হয়েছে।');
    setEnrolledSuccess(true);
    setShowEnrollForm(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const isAlreadyEnrolled = students.some(
    s => s.name === admission.studentName || s.guardianPhone === admission.guardianPhone
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-900/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-4 sm:p-7 shadow-2xl border border-slate-200 my-auto animate-in fade-in zoom-in-95 duration-200 relative max-h-[92vh] flex flex-col">
        
        {/* Top Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-200 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-800 text-white flex items-center justify-center font-bold shadow-sm">
              <FileText className="w-6 h-6 text-emerald-200" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {admission.applicationNo}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  admission.status === 'approved'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : admission.status === 'interview_scheduled'
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : admission.status === 'rejected'
                    ? 'bg-red-100 text-red-800 border border-red-300'
                    : 'bg-blue-100 text-blue-900 border border-blue-300'
                }`}>
                  {admission.status === 'approved' && '✓ অনুমোদিত (Approved)'}
                  {admission.status === 'interview_scheduled' && '⏳ ইন্টারভিউ শিডিউল্ড (Interview)'}
                  {admission.status === 'pending' && '📝 অপেক্ষমাণ আবেদন (Pending)'}
                  {admission.status === 'rejected' && '✕ বাতিল (Rejected)'}
                </span>
                <span className="text-[11px] text-slate-500">
                  আবেদনের তারিখ: {admission.appliedDate}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                {admission.studentName}
                {admission.studentNameEn && (
                  <span className="text-xs font-normal text-slate-500 ml-2 font-mono">
                    ({admission.studentNameEn})
                  </span>
                )}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5 transition cursor-pointer border border-slate-300"
              title="Print Application Form"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span className="hidden sm:inline">প্রিন্ট ফরম</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div className="overflow-y-auto pr-1 py-4 space-y-6 text-xs text-slate-700 flex-1">
          
          {/* Institutional Mini Banner for Print and Context */}
          <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
            <div>
              <p className="text-[11px] text-amber-300 font-bold tracking-wider">
                দারুল কুরআন হিফজ ও ইসলামিক একাডেমি
              </p>
              <h3 className="text-sm font-bold mt-0.5">
                শিক্ষার্থী ভর্তি আবেদন ও যাচাই বিবরণী
              </h3>
              <p className="text-[11px] text-emerald-200/90 mt-0.5">
                বিভাগ: <span className="font-bold text-white">{getDepartmentLabel(admission.targetDepartment)}</span> | 
                আবাসিকতা: <span className="font-bold text-white">{getResidentialLabel(admission.residentialStatus)}</span>
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="px-3 py-1 bg-white/10 rounded-xl border border-white/20 text-emerald-100 text-xs font-mono font-bold">
                পূর্বের হিফজ: {admission.memorizedParasBefore || 0} পারা
              </span>
            </div>
          </div>

          {/* Section 1 & 2: Student & Guardian Information in Two-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Box 1: শিক্ষার্থীর তথ্য */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200 text-emerald-900 font-bold text-xs">
                <User className="w-4 h-4 text-emerald-700" />
                <span>শিক্ষার্থীর ব্যক্তিগত তথ্য</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">পূর্ণ নাম:</span>
                  <span className="font-bold text-slate-800">{admission.studentName}</span>
                </div>
                {admission.studentNameEn && (
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">ইংরেজি নাম:</span>
                    <span className="font-mono font-medium text-slate-700">{admission.studentNameEn}</span>
                  </div>
                )}
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">জন্ম তারিখ:</span>
                  <span className="font-semibold text-slate-800">{admission.birthDate || 'তথ্য নেই'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">বর্তমান ঠিকানা:</span>
                  <span className="font-semibold text-slate-800 text-right max-w-[200px]">
                    {admission.presentAddress || 'ঢাকা'}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">আবেদনের বিভাগ:</span>
                  <span className="font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    {getDepartmentLabel(admission.targetDepartment)}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">আবাসিক অবস্থা:</span>
                  <span className="font-semibold text-slate-800">
                    {getResidentialLabel(admission.residentialStatus)}
                  </span>
                </div>
              </div>
            </div>

            {/* Box 2: পিতা ও অভিভাবকের তথ্য */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200 text-emerald-900 font-bold text-xs">
                <Home className="w-4 h-4 text-emerald-700" />
                <span>পিতা, মাতা ও অভিভাবকের তথ্য</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">পিতার নাম:</span>
                  <span className="font-bold text-slate-800">{admission.fatherName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">মাতার নাম:</span>
                  <span className="font-bold text-slate-800">{admission.motherName || 'তথ্য নেই'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100 items-center">
                  <span className="text-slate-500">মোবাইল নম্বর:</span>
                  <a 
                    href={`tel:${admission.guardianPhone}`}
                    className="font-mono font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200"
                  >
                    <Phone className="w-3 h-3" />
                    <span>{admission.guardianPhone}</span>
                  </a>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">জাতীয় পরিচয়পত্র (NID):</span>
                  <span className="font-mono font-semibold text-slate-700">
                    {admission.guardianNid || 'তথ্য প্রদান করা হয়নি'}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">জরুরি যোগাযোগ:</span>
                  <span className="font-semibold text-slate-800">
                    {admission.guardianPhone}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Section 3: পূর্ববর্তী পড়াশোনা ও হিফজ অভিজ্ঞতা */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200 text-emerald-900 font-bold text-xs">
              <School className="w-4 h-4 text-emerald-700" />
              <span>পূর্ববর্তী প্রতিষ্ঠান ও হিফজ সংক্রান্ত পূর্ব অভিজ্ঞতা</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500 block text-[11px] mb-1">পূর্ববর্তী প্রতিষ্ঠান / স্কুল:</span>
                <span className="font-bold text-slate-900 text-xs">
                  {admission.previousMadrasaOrSchool || 'কোনো প্রতিষ্ঠানে পূর্বে পড়েনি / সরাসরি ভর্তি'}
                </span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500 block text-[11px] mb-1">পূর্বে মুখস্থকৃত পারা:</span>
                <span className="font-mono font-bold text-emerald-800 text-xs">
                  {admission.memorizedParasBefore ? `${admission.memorizedParasBefore} পারা হেফজ আছে` : '০ পারা (নতুন শুরু করবে)'}
                </span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500 block text-[11px] mb-1">আবেদনের বর্তমান স্থিতি:</span>
                <span className="font-bold text-xs text-slate-800">
                  {admission.status === 'approved' ? 'ভর্তি চূড়ান্ত ও অনুমোদিত' : 'প্রাথমিক যাচাই চলছে'}
                </span>
              </div>
            </div>
          </div>

          {/* Section 4: Administrative Review & Interview Schedule / Scoring */}
          <div className="bg-emerald-50/50 p-4 sm:p-5 rounded-2xl border border-emerald-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-emerald-200">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs">
                <UserCheck className="w-4.5 h-4.5 text-emerald-800" />
                <span>ম্যানেজমেন্ট ও সিলেকশন পর্যালোচনা (অফিসিয়াল ব্যবহার)</span>
              </div>
              {statusSaved && (
                <span className="text-emerald-700 font-bold flex items-center gap-1 text-xs animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>তথ্য সফলভাবে সংরক্ষিত হয়েছে!</span>
                </span>
              )}
            </div>

            <form onSubmit={handleSaveStatus} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Status Dropdown */}
                <div>
                  <label className="block text-slate-700 font-bold mb-1">ভর্তি আবেদনের স্ট্যাটাস:*</label>
                  <select
                    value={currentStatus}
                    onChange={(e) => setCurrentStatus(e.target.value as any)}
                    className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs font-bold text-slate-800 focus:outline-emerald-600 shadow-2xs"
                  >
                    <option value="pending">📝 অপেক্ষমাণ (Pending Review)</option>
                    <option value="interview_scheduled">⏳ ইন্টারভিউ শিডিউল্ড (Interview Scheduled)</option>
                    <option value="approved">✓ অনুমোদিত (Approved for Admission)</option>
                    <option value="rejected">✕ বাতিল (Application Rejected)</option>
                  </select>
                </div>

                {/* Interview Date */}
                <div>
                  <label className="block text-slate-700 font-bold mb-1">ইন্টারভিউ তারিখ ও সময়:</label>
                  <input
                    type="text"
                    value={interviewDate}
                    onChange={(e) => setInterviewDate(e.target.value)}
                    placeholder="যেমন: 2026-09-05 সকাল ১০:০০ টা"
                    className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs focus:outline-emerald-600 shadow-2xs"
                  />
                </div>

                {/* Interview Score */}
                <div>
                  <label className="block text-slate-700 font-bold mb-1">মৌখিক / তিলাওয়াত স্কোর (১০০ তে):</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={interviewScore}
                    onChange={(e) => setInterviewScore(e.target.value)}
                    placeholder="যেমন: 85"
                    className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs font-mono font-bold text-emerald-900 focus:outline-emerald-600 shadow-2xs"
                  />
                </div>
              </div>

              {/* Remarks */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">ভর্তি কমিটির মন্তব্য ও দিকনির্দেশনা:</label>
                <input
                  type="text"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="যেমন: মাখরাজ ও তাজবীদ সুন্দর, হিফজে পড়ার জন্য উপযুক্ত।"
                  className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs focus:outline-emerald-600 shadow-2xs"
                />
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>আপডেট সংরক্ষণ করুন</span>
                  </button>
                </div>

                {/* Direct Enroll Option if Approved */}
                {onEnrollAsStudent && (
                  <div>
                    {isAlreadyEnrolled || enrolledSuccess ? (
                      <span className="text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 border border-emerald-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                        <span>শিক্ষার্থী ডেটাবেজে তালিকাভুক্ত আছেন</span>
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setShowEnrollForm(!showEnrollForm)}
                        className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4 text-amber-300" />
                        <span>{showEnrollForm ? 'ভর্তি ফর্ম বন্ধ করুন' : 'শিক্ষার্থী ডেটাবেজে যুক্ত করুন'}</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </form>

            {/* Quick Student Enrollment Drawer */}
            {showEnrollForm && (
              <div className="mt-4 p-4 bg-white rounded-2xl border border-teal-300 shadow-sm animate-in fade-in space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h4 className="font-bold text-slate-800 text-xs flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-teal-700" />
                    <span>চূড়ান্ত শিক্ষার্থী হিসেবে রেজিস্ট্রেশন ও রোল নম্বর বরাদ্দ</span>
                  </h4>
                  <button 
                    type="button" 
                    onClick={() => setShowEnrollForm(false)} 
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <form onSubmit={handleEnrollSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-600 font-bold mb-1">রোল নম্বর বরাদ্দ:*</label>
                    <input
                      type="text"
                      required
                      value={assignedRoll}
                      onChange={(e) => setAssignedRoll(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl p-2 font-mono font-bold text-xs focus:outline-teal-600"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-bold mb-1">নির্ধারিত শিক্ষক / উস্তাদ:*</label>
                    <select
                      value={assignedUstadId}
                      onChange={(e) => setAssignedUstadId(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl p-2 font-medium text-xs focus:outline-teal-600"
                    >
                      {teachers.map(t => (
                        <option key={t.id} value={t.id}>
                          {t.name} ({t.designation})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-600 font-bold mb-1">মাসিক বেতন (ফি):*</label>
                    <input
                      type="number"
                      required
                      value={monthlyFee}
                      onChange={(e) => setMonthlyFee(Number(e.target.value))}
                      className="w-full border border-slate-300 rounded-xl p-2 font-bold text-xs focus:outline-teal-600"
                    />
                  </div>

                  <div className="sm:col-span-3 flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowEnrollForm(false)}
                      className="px-4 py-2 border border-slate-300 rounded-xl text-slate-600 font-bold text-xs hover:bg-slate-50"
                    >
                      বাতিল
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition"
                    >
                      ভর্তি সম্পন্ন করুন
                    </button>
                  </div>
                </form>
              </div>
            )}

          </div>

        </div>

        {/* Modal Footer */}
        <div className="pt-3 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-500">
            রেফারেন্স আইডি: <span className="font-mono font-bold text-slate-700">{admission.id}</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer"
          >
            বন্ধ করুন
          </button>
        </div>

      </div>
    </div>
  );
};

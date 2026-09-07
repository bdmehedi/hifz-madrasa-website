import React, { useState } from 'react';
import { 
  GraduationCap, 
  CheckCircle, 
  Search, 
  Printer, 
  Send, 
  AlertCircle, 
  UserCheck, 
  Calendar, 
  Phone, 
  ShieldCheck 
} from 'lucide-react';
import { Language, AdmissionApplication, DepartmentType } from '../types';
import { getTranslation } from '../utils/translations';

interface AdmissionPortalProps {
  lang: Language;
  admissions: AdmissionApplication[];
  onSubmitApplication: (app: AdmissionApplication) => void;
}

export const AdmissionPortal: React.FC<AdmissionPortalProps> = ({
  lang,
  admissions,
  onSubmitApplication
}) => {
  const [activeTab, setActiveTab] = useState<'apply' | 'track'>('apply');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackedResult, setTrackedResult] = useState<AdmissionApplication | null>(null);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [submittedApp, setSubmittedApp] = useState<AdmissionApplication | null>(null);

  // Form State
  const [studentName, setStudentName] = useState('');
  const [studentNameEn, setStudentNameEn] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [guardianPhone, setGuardianPhone] = useState('');
  const [guardianNid, setGuardianNid] = useState('');
  const [birthDate, setBirthDate] = useState('2015-06-15');
  const [targetDepartment, setTargetDepartment] = useState<DepartmentType>('hifz');
  const [previousSchool, setPreviousSchool] = useState('');
  const [memorizedParas, setMemorizedParas] = useState<number>(0);
  const [residentialStatus, setResidentialStatus] = useState<'residential' | 'non_residential' | 'day_care'>('residential');
  const [presentAddress, setPresentAddress] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !guardianPhone.trim() || !fatherName.trim()) {
      setFormError(lang === 'bn' ? 'সকল তারকাচিহ্নিত (*) তথ্য প্রদান করুন' : 'Please fill all required fields');
      return;
    }

    const appNo = 'DQ-ADM-' + Math.floor(100 + Math.random() * 900);
    const newApp: AdmissionApplication = {
      id: 'APP-' + Date.now(),
      applicationNo: appNo,
      studentName,
      studentNameEn: studentNameEn || studentName,
      fatherName,
      motherName,
      guardianPhone,
      guardianNid: guardianNid || '1988' + Math.floor(10000000 + Math.random() * 90000000),
      birthDate,
      targetDepartment,
      previousMadrasaOrSchool: previousSchool,
      memorizedParasBefore: Number(memorizedParas) || 0,
      residentialStatus,
      presentAddress,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      remarks: 'নতুন অনলাইন আবেদন গ্রহণ করা হয়েছে।'
    };

    onSubmitApplication(newApp);
    setSubmittedApp(newApp);
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchAttempted(true);
    const found = admissions.find(a => 
      a.applicationNo.toLowerCase() === trackingNumber.trim().toLowerCase() ||
      a.guardianPhone === trackingNumber.trim()
    );
    setTrackedResult(found || null);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-700/40">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center font-bold text-xl shadow">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">
              {getTranslation(lang, 'admissionTitle')}
            </h1>
            <p className="text-xs text-emerald-200 mt-0.5">
              {getTranslation(lang, 'admissionDesc')}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 bg-white rounded-2xl p-1.5 shadow-sm gap-1 max-w-md">
        <button
          onClick={() => { setActiveTab('apply'); setSubmittedApp(null); }}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold text-center transition ${
            activeTab === 'apply' ? 'bg-emerald-700 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          {lang === 'bn' ? '১. নতুন ভর্তি আবেদন ফরম' : '1. New Application Form'}
        </button>
        <button
          onClick={() => setActiveTab('track')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold text-center transition ${
            activeTab === 'track' ? 'bg-emerald-700 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          {lang === 'bn' ? '২. আবেদন স্ট্যাটাস যাচাই' : '2. Track Status'}
        </button>
      </div>

      {activeTab === 'apply' && (
        <>
          {submittedApp ? (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-emerald-200 text-center space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center border-4 border-emerald-200 shadow-sm">
                <CheckCircle className="w-9 h-9" />
              </div>
              <div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-full">
                  আবেদন সফলভাবে গৃহীত হয়েছে
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-2">
                  ধন্যবাদ, {submittedApp.studentName} এর আবেদন জমা হয়েছে
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  আপনার ট্র্যাকিং রেফারেন্স কোডটি সংরক্ষণ করুন:
                </p>
              </div>

              <div className="p-4 bg-emerald-50 rounded-2xl border-2 border-dashed border-emerald-300 max-w-sm mx-auto font-mono text-center">
                <span className="text-xs text-emerald-700 font-semibold block">Application Tracking Number:</span>
                <span className="text-2xl font-black text-emerald-950 block mt-1 tracking-widest">{submittedApp.applicationNo}</span>
              </div>

              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                মাদ্রাসা কর্তৃপক্ষ আপনার আবেদন যাচাই করে এসএমএস এবং মোবাইল কলের মাধ্যমে মৌখিক সাক্ষাৎকার ও ভর্তির তারিখ জানিয়ে দেবে ইনশাআল্লাহ।
              </p>

              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center gap-2 border border-slate-300"
                >
                  <Printer className="w-4 h-4" />
                  <span>আবেদন স্লিপ প্রিন্ট করুন</span>
                </button>
                <button
                  onClick={() => { setSubmittedApp(null); setStudentName(''); }}
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl"
                >
                  আরেকটি আবেদন করুন
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
              {formError && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs font-semibold rounded-xl flex items-center gap-2 border border-red-200">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Section 1: Student Personal Info */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-emerald-900 border-b border-emerald-100 pb-2">
                    ক. শিক্ষার্থীর ব্যক্তিগত তথ্য
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {getTranslation(lang, 'applicantName')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="যেমন: মুহাম্মদ রায়হান আহমেদ"
                        className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        শিক্ষার্থীর নাম (ইংরেজিতে)
                      </label>
                      <input
                        type="text"
                        value={studentNameEn}
                        onChange={(e) => setStudentNameEn(e.target.value)}
                        placeholder="e.g. Muhammad Rayhan Ahmed"
                        className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {getTranslation(lang, 'fatherName')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={fatherName}
                        onChange={(e) => setFatherName(e.target.value)}
                        placeholder="পিতার পূর্ণ নাম"
                        className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {getTranslation(lang, 'motherName')}
                      </label>
                      <input
                        type="text"
                        value={motherName}
                        onChange={(e) => setMotherName(e.target.value)}
                        placeholder="মাতার পূর্ণ নাম"
                        className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {getTranslation(lang, 'guardianPhone')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={guardianPhone}
                        onChange={(e) => setGuardianPhone(e.target.value)}
                        placeholder="01XXXXXXXXX"
                        className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 font-mono font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        অভিভাবকের জাতীয় পরিচয়পত্র (NID) নম্বর
                      </label>
                      <input
                        type="text"
                        value={guardianNid}
                        onChange={(e) => setGuardianNid(e.target.value)}
                        placeholder="জাতীয় পরিচয়পত্র নম্বর"
                        className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        জন্ম তারিখ (জন্মসনদ অনুযায়ী)
                      </label>
                      <input
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        বর্তমান ঠিকানা
                      </label>
                      <input
                        type="text"
                        value={presentAddress}
                        onChange={(e) => setPresentAddress(e.target.value)}
                        placeholder="গ্রাম/বাড়ি, রাস্তা, থানা, জেলা"
                        className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Department & Academic Background */}
                <div className="space-y-4 pt-2">
                  <h3 className="text-sm font-bold text-emerald-900 border-b border-emerald-100 pb-2">
                    খ. কাঙ্ক্ষিত বিভাগ ও পূর্ববর্তী শিক্ষার বিবরণ
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        ভর্তি হতে ইচ্ছুক বিভাগ
                      </label>
                      <select
                        value={targetDepartment}
                        onChange={(e) => setTargetDepartment(e.target.value as DepartmentType)}
                        className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl font-bold bg-white"
                      >
                        <option value="hifz">{getTranslation(lang, 'deptHifz')}</option>
                        <option value="maktab">{getTranslation(lang, 'deptMaktab')}</option>
                        <option value="tajweed">{getTranslation(lang, 'deptTajweed')}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        পূর্বে মুখস্থ পারার সংখ্যা
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={30}
                        value={memorizedParas}
                        onChange={(e) => setMemorizedParas(Number(e.target.value))}
                        className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl font-mono font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {getTranslation(lang, 'residentialType')}
                      </label>
                      <select
                        value={residentialStatus}
                        onChange={(e) => setResidentialStatus(e.target.value as any)}
                        className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl font-bold bg-white"
                      >
                        <option value="residential">{getTranslation(lang, 'residential')}</option>
                        <option value="non_residential">{getTranslation(lang, 'nonResidential')}</option>
                        <option value="day_care">ডে-কেয়ার ও খাবার সুবিধা সহ</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      পূর্বে কোনো মাদ্রাসা বা স্কুলে পড়ে থাকলে তার নাম ও ক্লাস
                    </label>
                    <input
                      type="text"
                      value={previousSchool}
                      onChange={(e) => setPreviousSchool(e.target.value)}
                      placeholder="যেমন: আল-আমিন নূরানী মাদ্রাসা, ৩য় শ্রেণী"
                      className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-8 py-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold rounded-2xl shadow-lg shadow-emerald-700/20 transition flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>ভর্তির আবেদন জমা দিন</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </>
      )}

      {activeTab === 'track' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="max-w-md mx-auto text-center space-y-2">
            <h2 className="text-base font-bold text-slate-900">
              আবেদন রেফারেন্স নম্বর বা মোবাইল দিয়ে যাচাই করুন
            </h2>
            <p className="text-xs text-slate-500">
              আবেদন করার পর প্রাপ্ত রেফারেন্স নম্বর (যেমন: DQ-ADM-901) অথবা অভিভাবকের মোবাইল নম্বর লিখুন
            </p>
          </div>

          <form onSubmit={handleTrack} className="max-w-md mx-auto flex gap-2">
            <input
              type="text"
              required
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="DQ-ADM-901 অথবা 01712998877"
              className="flex-1 px-4 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 font-mono font-bold"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5"
            >
              <Search className="w-4 h-4" />
              <span>খুঁজুন</span>
            </button>
          </form>

          {searchAttempted && (
            <div className="max-w-xl mx-auto pt-4">
              {trackedResult ? (
                <div className="p-5 rounded-2xl border border-emerald-200 bg-emerald-50/40 space-y-3 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
                    <span className="font-mono text-xs font-bold text-emerald-800">
                      রেফারেন্স: {trackedResult.applicationNo}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      trackedResult.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                      trackedResult.status === 'interview_scheduled' ? 'bg-amber-100 text-amber-800' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {trackedResult.status === 'approved' ? 'ভর্তি অনুমোদিত ✓' :
                       trackedResult.status === 'interview_scheduled' ? 'মৌখিক পরীক্ষার সময় নির্ধারিত' :
                       'আবেদন প্রক্রিয়াধীন'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-500 block">শিক্ষার্থীর নাম:</span>
                      <span className="font-bold text-slate-800">{trackedResult.studentName}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">পিতার নাম:</span>
                      <span className="font-bold text-slate-800">{trackedResult.fatherName}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">আবেদনের তারিখ:</span>
                      <span className="font-mono">{trackedResult.appliedDate}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">কাঙ্ক্ষিত বিভাগ:</span>
                      <span className="font-semibold text-emerald-800">{trackedResult.targetDepartment.toUpperCase()}</span>
                    </div>
                  </div>

                  {trackedResult.interviewDate && (
                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 font-semibold">
                      মৌখিক সাক্ষাৎকার ও তাজবীদ যাচাইয়ের সময়: {trackedResult.interviewDate} (মাদ্রাসার অফিস কক্ষ)
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-6 text-center text-xs text-slate-500 bg-slate-50 rounded-2xl border border-slate-200">
                  এই রেফারেন্স নম্বরে কোনো আবেদন খুঁজে পাওয়া যায়নি। অনুগ্রহ করে সঠিক নম্বর দিয়ে পুনরায় চেষ্টা করুন।
                </div>
              )}
            </div>
          )}
        </div>
      )}

    </div>
  );
};

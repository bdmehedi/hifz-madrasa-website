import React, { useState } from 'react';
import { X, Award, CheckCircle2 } from 'lucide-react';
import { DastarbandiSanad, Student, Language } from '../types';

interface CreateSanadModalProps {
  lang: Language;
  students: Student[];
  onClose: () => void;
  onSave: (newSanad: DastarbandiSanad) => void;
}

export const CreateSanadModal: React.FC<CreateSanadModalProps> = ({
  lang,
  students,
  onClose,
  onSave
}) => {
  const nextSerial = Math.floor(100 + Math.random() * 900);
  const todayDate = new Date().toISOString().split('T')[0];

  const [selectedStudentId, setSelectedStudentId] = useState<string>(students[0]?.id || '');
  const [studentName, setStudentName] = useState<string>(students[0]?.name || '');
  const [studentRoll, setStudentRoll] = useState<string>(students[0]?.roll || '101');
  const [fatherName, setFatherName] = useState<string>(students[0]?.fatherName || '');
  const [motherName, setMotherName] = useState<string>(students[0]?.motherName || '');
  const [district, setDistrict] = useState<string>('ঢাকা');
  const [sanadNo, setSanadNo] = useState<string>(`DQA-SANAD-2026-${nextSerial}`);
  const [registrationNo, setRegistrationNo] = useState<string>(`BEFAQ-2026-${Math.floor(1000 + Math.random() * 9000)}`);
  const [completedParas, setCompletedParas] = useState<number>(30);
  const [completionDate, setCompletionDate] = useState<string>(todayDate);
  const [issueDate, setIssueDate] = useState<string>(todayDate);
  const [sanadType, setSanadType] = useState<'full_hifz' | 'tajweed' | 'qiraat_hafz'>('full_hifz');
  const [grade, setGrade] = useState<string>('মুমতাজ (সর্বোচ্চ কৃতিত্ব - A+)');
  const [issuer, setIssuer] = useState<string>('মুফতী মাহমুদ হাসান (মুহতামিম)');
  const [hifzHead, setHifzHead] = useState<string>('হাফেজ ক্বারী আব্দুল্লাহ আল-মামুন (হিফজ প্রধান)');
  const [remarks, setRemarks] = useState<string>('পবিত্র কুরআনুল কারীম তাজবীদ ও তারতীলের সাথে সফলভাবে হেফজ সম্পন্ন করেছে।');

  const handleStudentSelect = (stdId: string) => {
    setSelectedStudentId(stdId);
    const found = students.find((s) => s.id === stdId);
    if (found) {
      setStudentName(found.name);
      setStudentRoll(found.roll);
      setFatherName(found.fatherName);
      setMotherName(found.motherName);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !sanadNo.trim()) return;

    const newSanad: DastarbandiSanad = {
      id: `SANAD-${Date.now()}`,
      sanadNo: sanadNo.trim(),
      studentId: selectedStudentId || `ST-${studentRoll}`,
      studentName: studentName.trim(),
      studentRoll: studentRoll.trim(),
      fatherName: fatherName.trim() || 'পিতার নাম',
      motherName: motherName.trim() || 'মাতার নাম',
      district: district.trim(),
      completedParas: Number(completedParas) || 30,
      completionDate,
      issueDate,
      sanadType,
      issuer,
      hifzHead,
      registrationNo,
      grade,
      remarks: remarks.trim()
    };

    onSave(newSanad);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <span className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
              <Award className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-800">
                {lang === 'bn' ? 'নতুন দস্তারবন্দী ও হিফজ সনদ ইস্যু করুন' : 'Issue New Dastarbandi Sanad'}
              </h3>
              <p className="text-xs text-slate-500">
                হিফজ সমাপ্তকারী শিক্ষার্থীর জন্য আনুষ্ঠানিক সনদপত্র প্রস্তুতকরণ
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs">
          
          {/* Student Selection */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-3">
            <label className="font-bold text-slate-700 block">
              {lang === 'bn' ? 'শিক্ষার্থী নির্বাচন করুন (অথবা নিচে লিখুন):' : 'Select Student:'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="text-slate-500 block mb-1">বিদ্যমান শিক্ষার্থী:</span>
                <select
                  value={selectedStudentId}
                  onChange={(e) => handleStudentSelect(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl p-2 text-xs font-semibold focus:outline-emerald-600"
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} (রোল: {s.roll}) - {s.groupOrClass}
                    </option>
                  ))}
                  <option value="">অন্যান্য / নতুন নাম লিখুন</option>
                </select>
              </div>

              <div>
                <span className="text-slate-500 block mb-1">শিক্ষার্থীর নাম:*</span>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl p-2 text-xs font-semibold focus:outline-emerald-600"
                  placeholder="যেমন: হাফেজ মুহাম্মদ আব্দুল্লাহ"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div>
                <span className="text-slate-500 block mb-1">রোল নম্বর:</span>
                <input
                  type="text"
                  value={studentRoll}
                  onChange={(e) => setStudentRoll(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl p-2 font-mono text-xs focus:outline-emerald-600"
                />
              </div>
              <div>
                <span className="text-slate-500 block mb-1">পিতার নাম:</span>
                <input
                  type="text"
                  value={fatherName}
                  onChange={(e) => setFatherName(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl p-2 text-xs focus:outline-emerald-600"
                />
              </div>
              <div>
                <span className="text-slate-500 block mb-1">মাতার নাম:</span>
                <input
                  type="text"
                  value={motherName}
                  onChange={(e) => setMotherName(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl p-2 text-xs focus:outline-emerald-600"
                />
              </div>
              <div>
                <span className="text-slate-500 block mb-1">নিজ জেলা:</span>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl p-2 text-xs focus:outline-emerald-600"
                />
              </div>
            </div>
          </div>

          {/* Sanad Meta Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <span className="text-slate-600 block mb-1 font-semibold">সনদ নম্বর:*</span>
              <input
                type="text"
                required
                value={sanadNo}
                onChange={(e) => setSanadNo(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 font-mono text-xs focus:outline-emerald-600"
              />
            </div>
            <div>
              <span className="text-slate-600 block mb-1 font-semibold">বেফাক / বোর্ড রেজি নং:</span>
              <input
                type="text"
                value={registrationNo}
                onChange={(e) => setRegistrationNo(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 font-mono text-xs focus:outline-emerald-600"
              />
            </div>
            <div>
              <span className="text-slate-600 block mb-1 font-semibold">সনদের ধরণ:</span>
              <select
                value={sanadType}
                onChange={(e) => setSanadType(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-xs font-semibold focus:outline-emerald-600"
              >
                <option value="full_hifz">সম্পূর্ণ ৩০ পারা হিফজুল কুরআন</option>
                <option value="tajweed">ইলমে তাজবীদ ও তারতীল সনদ</option>
                <option value="qiraat_hafz">ক্বিরাআত ও হিফজ সমাপনী</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <span className="text-slate-600 block mb-1 font-semibold">সম্পূর্ণ পারা সংখ্যা:</span>
              <input
                type="number"
                min="1"
                max="30"
                value={completedParas}
                onChange={(e) => setCompletedParas(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 font-bold text-emerald-800 text-xs focus:outline-emerald-600"
              />
            </div>
            <div>
              <span className="text-slate-600 block mb-1 font-semibold">সমাপনী তারিখ:</span>
              <input
                type="date"
                value={completionDate}
                onChange={(e) => setCompletionDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-xs focus:outline-emerald-600"
              />
            </div>
            <div>
              <span className="text-slate-600 block mb-1 font-semibold">সনদ ইস্যুর তারিখ:</span>
              <input
                type="date"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-xs focus:outline-emerald-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <span className="text-slate-600 block mb-1 font-semibold">ফলাফলের মান / গ্রেড:</span>
              <input
                type="text"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-xs focus:outline-emerald-600"
                placeholder="যেমন: মুমতাজ (সর্বোচ্চ কৃতিত্ব - A+)"
              />
            </div>
            <div>
              <span className="text-slate-600 block mb-1 font-semibold">সনদ প্রদানকারী (মুহতামিম):</span>
              <input
                type="text"
                value={issuer}
                onChange={(e) => setIssuer(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-xs focus:outline-emerald-600"
              />
            </div>
          </div>

          <div>
            <span className="text-slate-600 block mb-1 font-semibold">বিশেষ মূল্যায়ন মন্তব্য:</span>
            <input
              type="text"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-xs focus:outline-emerald-600"
              placeholder="যেমন: সহীহ মাখরাজ ও সিফাত সহকারে সুন্দর সুললিত কণ্ঠে হেফজ তাকমীল করেছে।"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold rounded-xl transition"
            >
              বাতিল
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-sm transition flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>সনদ ইস্যু সম্পন্ন করুন</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

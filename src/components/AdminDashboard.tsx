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
  Trash2
} from 'lucide-react';
import { 
  Language, 
  Student, 
  Teacher, 
  FeeInvoice, 
  AdmissionApplication, 
  Notice 
} from '../types';
import { getTranslation } from '../utils/translations';

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
  onAddNotice
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'admissions' | 'fees' | 'notices'>('overview');
  
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

          <div className="flex gap-2">
            <button
              onClick={() => setShowAddStudent(true)}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5"
            >
              <UserPlus className="w-4 h-4" />
              <span>{lang === 'bn' ? 'নতুন শিক্ষার্থী ভর্তি' : 'New Admission'}</span>
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

      {/* Nav Tabs */}
      <div className="flex border-b border-slate-200 bg-white rounded-2xl p-1.5 shadow-sm gap-1 overflow-x-auto text-xs font-bold">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition shrink-0 ${
            activeTab === 'overview' ? 'bg-emerald-800 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>সারসংক্ষেপ ও পরিসংখ্যান</span>
        </button>
        <button
          onClick={() => setActiveTab('students')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition shrink-0 ${
            activeTab === 'students' ? 'bg-emerald-800 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>শিক্ষার্থী তালিকা ({students.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('admissions')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition shrink-0 ${
            activeTab === 'admissions' ? 'bg-emerald-800 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>ভর্তি আবেদন ({admissions.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('fees')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition shrink-0 ${
            activeTab === 'fees' ? 'bg-emerald-800 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>ফি ও আয়-ব্যয়</span>
        </button>
        <button
          onClick={() => setActiveTab('notices')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition shrink-0 ${
            activeTab === 'notices' ? 'bg-emerald-800 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>নোটিশ ব্যবস্থাপনা</span>
        </button>
      </div>

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

import React, { useState } from 'react';
import { 
  Award, 
  Search, 
  Printer, 
  Download, 
  CheckCircle, 
  User as UserIcon, 
  BookOpen, 
  FileText,
  Sparkles
} from 'lucide-react';
import { Language, ExamResult } from '../types';
import { getTranslation } from '../utils/translations';

interface ResultPortalProps {
  lang: Language;
  results: ExamResult[];
  onOpenMarksheetModal: (result: ExamResult) => void;
}

export const ResultPortal: React.FC<ResultPortalProps> = ({
  lang,
  results,
  onOpenMarksheetModal
}) => {
  const [searchRoll, setSearchRoll] = useState('101');
  const [selectedTerm, setSelectedTerm] = useState<string>('all');
  const [searchedResult, setSearchedResult] = useState<ExamResult | null>(results[0] || null);
  const [searchAttempted, setSearchAttempted] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchAttempted(true);
    const found = results.find(r => 
      (r.studentRoll === searchRoll.trim() || r.studentId.toLowerCase() === searchRoll.trim().toLowerCase()) &&
      (selectedTerm === 'all' || r.examTerm === selectedTerm)
    );
    setSearchedResult(found || null);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-800 via-teal-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-teal-700/40">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center font-bold text-xl shadow">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">
              {getTranslation(lang, 'searchResultTitle')}
            </h1>
            <p className="text-xs text-teal-200 mt-0.5">
              {lang === 'bn' ? 'হিফজুল কুরআন, তাজবীদ ও নূরানী মক্তব বিভাগের পরীক্ষার ফলাফল' : 'Official Academic Marksheets & Hifz Evaluation'}
            </p>
          </div>
        </div>
      </div>

      {/* Search Filter Box */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {getTranslation(lang, 'enterStudentId')}
            </label>
            <input
              type="text"
              required
              value={searchRoll}
              onChange={(e) => setSearchRoll(e.target.value)}
              placeholder="যেমন: 101 অথবা ST-101"
              className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 font-mono font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {getTranslation(lang, 'selectExam')}
            </label>
            <select
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
              className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl font-bold bg-white"
            >
              <option value="all">{getTranslation(lang, 'allExams')}</option>
              <option value="1st_term">{getTranslation(lang, 'termFirst')}</option>
              <option value="2nd_term">{getTranslation(lang, 'termSecond')}</option>
              <option value="annual">{getTranslation(lang, 'termAnnual')}</option>
              <option value="hifz_completion_test">{getTranslation(lang, 'termHifzCompletion')}</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 shadow"
            >
              <Search className="w-4 h-4" />
              <span>{getTranslation(lang, 'search')}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Result Display Marksheet Card */}
      {searchedResult ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border-2 border-teal-200 space-y-6 animate-in fade-in duration-200">
          
          {/* Marksheet Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
            <div className="space-y-1">
              <span className="font-['Amiri'] text-emerald-800 text-sm font-bold block">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
              <h2 className="text-lg font-bold text-slate-900">
                {searchedResult.examTerm === '2nd_term' ? '২য় সাময়িক পরীক্ষা ২০২৬ এর একাডেমিক মার্কশিট' : 'সাময়িক পরীক্ষা ফলাফল'}
              </h2>
              <p className="text-xs text-slate-500 font-mono">
                রেফারেন্স আইডি: {searchedResult.id} | প্রকাশের তারিখ: {searchedResult.publishedDate}
              </p>
            </div>

            <button
              onClick={() => onOpenMarksheetModal(searchedResult)}
              className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-2"
            >
              <Printer className="w-4 h-4 text-amber-300" />
              <span>{lang === 'bn' ? 'অফিসিয়াল ট্রান্সক্রিপ্ট প্রিন্ট' : 'Print Official Transcript'}</span>
            </button>
          </div>

          {/* Student Info Box */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-teal-50/50 p-4 rounded-2xl border border-teal-100 text-xs">
            <div>
              <span className="text-slate-500 block">শিক্ষার্থীর নাম:</span>
              <span className="font-bold text-slate-900">{searchedResult.studentName}</span>
            </div>
            <div>
              <span className="text-slate-500 block">রোল ও শ্রেণি:</span>
              <span className="font-bold text-slate-900">রোল: {searchedResult.studentRoll} ({searchedResult.classOrGroup})</span>
            </div>
            <div>
              <span className="text-slate-500 block">প্রাপ্ত জিপিএ:</span>
              <span className="font-extrabold text-teal-800 font-mono text-sm">GPA {searchedResult.gpa}</span>
            </div>
            <div>
              <span className="text-slate-500 block">ফলাফল গ্রেড:</span>
              <span className="font-bold text-emerald-700">{searchedResult.finalGrade}</span>
            </div>
          </div>

          {/* Subjects Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-slate-700">
                  <th className="p-3">বিষয় কোড ও নাম</th>
                  <th className="p-3 text-center">পূর্ণমান</th>
                  <th className="p-3 text-center">পাশ নম্বর</th>
                  <th className="p-3 text-center">প্রাপ্ত নম্বর</th>
                  <th className="p-3 text-center">গ্রেড</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {searchedResult.subjects.map((sub) => (
                  <tr key={sub.code} className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-800">
                      <span className="font-mono text-slate-400 mr-2">[{sub.code}]</span>
                      {sub.name}
                    </td>
                    <td className="p-3 text-center font-mono">{sub.fullMarks}</td>
                    <td className="p-3 text-center font-mono">{sub.passMarks}</td>
                    <td className="p-3 text-center font-mono font-bold text-teal-900">{sub.obtainedMarks}</td>
                    <td className="p-3 text-center">
                      <span className="px-2 py-0.5 rounded font-bold text-[11px] bg-emerald-100 text-emerald-800">
                        {sub.grade}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-teal-50/70 font-bold text-teal-950 border-t-2 border-teal-300">
                  <td className="p-3">সর্বমোট নম্বর ও শতকরা</td>
                  <td className="p-3 text-center font-mono">{searchedResult.totalFullMarks}</td>
                  <td className="p-3 text-center font-mono">-</td>
                  <td className="p-3 text-center font-mono text-sm font-extrabold text-emerald-800">{searchedResult.totalObtainedMarks}</td>
                  <td className="p-3 text-center font-mono text-xs">{searchedResult.percentage}%</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Position & Ustad Remarks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs">
              <span className="font-bold text-amber-900 block mb-1">শ্রেণীতে মেধা স্থান:</span>
              <p className="text-amber-950 font-bold text-sm">
                {searchedResult.positionInClass}ম স্থান (মোট {searchedResult.totalStudentsInClass} জন শিক্ষার্থীর মধ্যে)
              </p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs">
              <span className="font-bold text-emerald-900 block mb-1">মুয়াল্লিম ও পরীক্ষা নিয়ন্ত্রকের মন্তব্য:</span>
              <p className="text-slate-700 italic">"{searchedResult.ustadRemarks}"</p>
            </div>
          </div>

        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 text-xs">
          {searchAttempted ? 'উক্ত রোল নম্বরে কোনো ফলাফল পাওয়া যায়নি।' : 'ফলাফল দেখতে শিক্ষার্থীর রোল নম্বর দিয়ে সার্চ করুন।'}
        </div>
      )}

    </div>
  );
};

import React from 'react';
import { X, Printer, Award } from 'lucide-react';
import { ExamResult, Language } from '../types';
import { getTranslation } from '../utils/translations';

interface PrintMarksheetModalProps {
  lang: Language;
  result: ExamResult;
  onClose: () => void;
}

export const PrintMarksheetModal: React.FC<PrintMarksheetModalProps> = ({
  lang,
  result,
  onClose
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm print:p-0 print:bg-white">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 print:shadow-none print:border-none print:m-0 print:p-4">
        
        {/* Modal Controls - Hidden in print */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 print:hidden">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            {lang === 'bn' ? 'অফিসিয়াল মার্কশিট ও একাডেমিক ট্রান্সক্রিপ্ট' : 'Official Academic Marksheet'}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow"
            >
              <Printer className="w-4 h-4" />
              <span>{lang === 'bn' ? 'প্রিন্ট / সেভ PDF' : 'Print / Save PDF'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Marksheet Frame */}
        <div className="space-y-4 text-slate-900 text-xs border-4 border-double border-teal-900 p-6 rounded-2xl bg-teal-50/10 print:border-slate-800">
          
          {/* Official Header */}
          <div className="text-center space-y-1 pb-3 border-b-2 border-teal-800/30">
            <span className="font-['Amiri'] text-teal-900 text-base font-bold block">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
            <h2 className="text-xl font-black text-teal-950">
              {getTranslation(lang, 'madrasaName')}
            </h2>
            <p className="text-[11px] text-slate-600 font-semibold">
              তাহফিজুল কুরআনুল কারীম ও ক্বিরাআত শিক্ষাবোর্ড | ঢাকা, বাংলাদেশ
            </p>
            <div className="pt-1">
              <span className="px-4 py-0.5 bg-teal-900 text-white text-xs font-bold rounded-md uppercase tracking-wider inline-block">
                একাডেমিক নম্বরপত্র ও ফলাফল সনদ (২০২৬)
              </span>
            </div>
          </div>

          {/* Student Info */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 block text-[10px]">ছাত্রের নাম:</span>
              <span className="font-bold text-slate-900">{result.studentName}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">রোল ও আইডি:</span>
              <span className="font-bold font-mono">রোল {result.studentRoll} ({result.studentId})</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">বিভাগ ও গ্রুপ:</span>
              <span className="font-bold text-teal-900">{result.classOrGroup}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">পরীক্ষার নাম:</span>
              <span className="font-bold">{result.examTerm === '2nd_term' ? '২য় সাময়িক পরীক্ষা' : 'সাময়িক পরীক্ষা'}</span>
            </div>
          </div>

          {/* Subjects Table */}
          <table className="w-full text-left text-xs border-collapse border border-slate-300">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-300 text-slate-700">
                <th className="p-2 border-r border-slate-300">বিষয় কোড ও বিষয়ের নাম</th>
                <th className="p-2 text-center border-r border-slate-300">পূর্ণমান</th>
                <th className="p-2 text-center border-r border-slate-300">পাশ নম্বর</th>
                <th className="p-2 text-center border-r border-slate-300">প্রাপ্ত নম্বর</th>
                <th className="p-2 text-center">গ্রেড</th>
              </tr>
            </thead>
            <tbody>
              {result.subjects.map((sub) => (
                <tr key={sub.code} className="border-b border-slate-200">
                  <td className="p-2 border-r border-slate-300 font-semibold text-slate-800">
                    <span className="font-mono text-slate-400 mr-1.5">[{sub.code}]</span>
                    {sub.name}
                  </td>
                  <td className="p-2 text-center border-r border-slate-300 font-mono">{sub.fullMarks}</td>
                  <td className="p-2 text-center border-r border-slate-300 font-mono">{sub.passMarks}</td>
                  <td className="p-2 text-center border-r border-slate-300 font-mono font-bold">{sub.obtainedMarks}</td>
                  <td className="p-2 text-center font-bold text-teal-900">{sub.grade}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-teal-50/70 font-bold border-t-2 border-teal-800/40">
                <td className="p-2 border-r border-slate-300 text-teal-950">সর্বমোট প্রাপ্ত নম্বর ও ফলাফল</td>
                <td className="p-2 text-center border-r border-slate-300 font-mono">{result.totalFullMarks}</td>
                <td className="p-2 text-center border-r border-slate-300 font-mono">-</td>
                <td className="p-2 text-center border-r border-slate-300 font-mono text-sm font-extrabold text-teal-900">{result.totalObtainedMarks}</td>
                <td className="p-2 text-center font-mono font-bold">{result.gpa} (GPA)</td>
              </tr>
            </tfoot>
          </table>

          {/* Performance Summary */}
          <div className="grid grid-cols-3 gap-2 bg-teal-50 p-2.5 rounded-xl border border-teal-200 text-center text-xs">
            <div>
              <span className="text-[10px] text-slate-500 block">চূড়ান্ত মূল্যায়ন গ্রেড</span>
              <span className="font-bold text-teal-950">{result.finalGrade}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">শতকরা হার</span>
              <span className="font-mono font-bold text-teal-950">{result.percentage}%</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">মেধা স্থান</span>
              <span className="font-bold text-emerald-800">{result.positionInClass}ম স্থান</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-600 italic">
            <strong>মুয়াল্লিমের মন্তব্য:</strong> "{result.ustadRemarks}"
          </p>

          {/* Signatures */}
          <div className="pt-8 flex justify-between items-end text-[11px] text-slate-600">
            <div className="text-center">
              <div className="w-32 border-t border-slate-400 pt-1">শ্রেণি শিক্ষক / উস্তাদ</div>
            </div>
            <div className="text-center">
              <div className="w-32 border-t border-slate-400 pt-1">পরীক্ষা নিয়ন্ত্রক</div>
            </div>
            <div className="text-center">
              <div className="w-32 border-t border-slate-400 pt-1">মুহতামিম / প্রিন্সিপাল</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

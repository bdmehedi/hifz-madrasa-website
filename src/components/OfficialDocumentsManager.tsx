import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Download, 
  Eye, 
  Trash2, 
  Award, 
  Mail, 
  Printer, 
  GraduationCap,
  Calendar,
  CheckCircle2,
  Search
} from 'lucide-react';
import { DastarbandiSanad, OfficialLetter, ExamResult, Student, Language } from '../types';
import { DastarbandiSanadModal } from './DastarbandiSanadModal';
import { OfficialLetterModal } from './OfficialLetterModal';
import { CreateSanadModal } from './CreateSanadModal';
import { CreateLetterModal } from './CreateLetterModal';

interface OfficialDocumentsManagerProps {
  lang: Language;
  sanads: DastarbandiSanad[];
  letters: OfficialLetter[];
  results: ExamResult[];
  students: Student[];
  onAddSanad: (sanad: DastarbandiSanad) => void;
  onDeleteSanad: (id: string) => void;
  onAddLetter: (letter: OfficialLetter) => void;
  onDeleteLetter: (id: string) => void;
  onOpenMarksheet: (result: ExamResult) => void;
}

export const OfficialDocumentsManager: React.FC<OfficialDocumentsManagerProps> = ({
  lang,
  sanads,
  letters,
  results,
  students,
  onAddSanad,
  onDeleteSanad,
  onAddLetter,
  onDeleteLetter,
  onOpenMarksheet
}) => {
  // Active modals
  const [activeSanadModal, setActiveSanadModal] = useState<DastarbandiSanad | null>(null);
  const [activeLetterModal, setActiveLetterModal] = useState<OfficialLetter | null>(null);
  const [showCreateSanad, setShowCreateSanad] = useState<boolean>(false);
  const [showCreateLetter, setShowCreateLetter] = useState<boolean>(false);

  // Search filter
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredSanads = sanads.filter(
    (s) =>
      s.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.sanadNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.studentRoll.includes(searchQuery)
  );

  const filteredLetters = letters.filter(
    (l) =>
      l.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.smarakNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.recipient.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredResults = results.filter(
    (r) =>
      r.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.studentRoll.includes(searchQuery)
  );

  return (
    <div className="space-y-8">
      
      {/* Top Banner with Quick Actions & Search */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 rounded-3xl p-6 text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-emerald-700/80 rounded-xl">
              <GraduationCap className="w-5 h-5 text-amber-300" />
            </span>
            <span className="text-xs font-bold text-emerald-200 uppercase tracking-widest">
              {lang === 'bn' ? 'অফিসিয়াল ডকুমেন্টস হাব' : 'Official Documents Hub'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black mt-1">
            {lang === 'bn' ? 'সনদ, অফিসিয়াল চিঠি ও পরীক্ষার মার্কশিট' : 'Certificates, Official Letters & Marksheets'}
          </h2>
          <p className="text-xs text-emerald-200/90 mt-1 max-w-xl">
            {lang === 'bn'
              ? 'দস্তারবন্দী সনদপত্র প্রস্তুত, প্রশাসনিক লেটারহেড প্যাড চিঠি লিখন এবং একাডেমিক নম্বরপত্র মুদ্রণ ব্যবস্থাপনা।'
              : 'Issue Hifz convocation certificates, draft administrative letterheads and export student marksheets.'}
          </p>
        </div>

        {/* Global Search Bar */}
        <div className="w-full md:w-72 relative">
          <Search className="w-4 h-4 text-emerald-300 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'bn' ? 'শিক্ষার্থী, স্মারক বা সনদ নং খুঁজুন...' : 'Search student, memo or sanad...'}
            className="w-full bg-emerald-950/60 border border-emerald-700/80 rounded-2xl pl-9 pr-3 py-2 text-xs text-white placeholder-emerald-300/70 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>
      </div>

      {/* ================= CARD 1: দস্তারবন্দী সনদ ================= */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200">
        
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-100 gap-3">
          <div className="flex items-center gap-2.5">
            <FileText className="text-emerald-700 w-5 h-5" />
            <h3 className="text-lg font-bold text-slate-800">
              {lang === 'bn' ? 'দস্তারবন্দী সনদ' : 'Dastarbandi Sanad'}
            </h3>
            <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-full">
              {sanads.length}
            </span>
          </div>

          <button
            onClick={() => setShowCreateSanad(true)}
            className="bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-full flex items-center gap-1.5 shadow-sm transition self-start sm:self-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'নতুন সনদ ইস্যু করুন' : 'Issue New Sanad'}</span>
          </button>
        </div>

        {/* Table Content */}
        <div className="mt-4 overflow-x-auto">
          {filteredSanads.length > 0 ? (
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-bold bg-slate-50/50">
                  <th className="py-3 px-4">{lang === 'bn' ? 'শিক্ষার্থী' : 'Student'}</th>
                  <th className="py-3 px-4">{lang === 'bn' ? 'সনদ নং' : 'Sanad No'}</th>
                  <th className="py-3 px-4">{lang === 'bn' ? 'ইস্যুর তারিখ' : 'Issue Date'}</th>
                  <th className="py-3 px-4">{lang === 'bn' ? 'ইস্যুকারী' : 'Issuer'}</th>
                  <th className="py-3 px-4 text-center">{lang === 'bn' ? 'সনদ' : 'Certificate'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredSanads.map((sanad) => (
                  <tr key={sanad.id} className="hover:bg-slate-50/80 transition group">
                    
                    {/* Student Column */}
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[11px]">
                          {sanad.studentRoll}
                        </span>
                        <div>
                          <span className="block font-bold text-slate-800">
                            {sanad.studentName}
                          </span>
                          <span className="text-[11px] text-slate-500">
                            রোল: {sanad.studentRoll} | {sanad.completedParas} পারা সম্পন্ন
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Sanad No Column */}
                    <td className="py-3.5 px-4">
                      <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {sanad.sanadNo}
                      </span>
                    </td>

                    {/* Issue Date Column */}
                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {sanad.issueDate}
                    </td>

                    {/* Issuer Column */}
                    <td className="py-3.5 px-4 text-slate-700">
                      <span className="font-medium">{sanad.issuer}</span>
                    </td>

                    {/* Actions Column */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setActiveSanadModal(sanad)}
                          className="border border-emerald-500 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg px-3 py-1 font-bold text-xs flex items-center gap-1.5 transition shadow-2xs"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>{lang === 'bn' ? 'সনদ দেখুন ও প্রিন্ট' : 'View Sanad'}</span>
                        </button>

                        <button
                          onClick={() => {
                            if (window.confirm(lang === 'bn' ? 'আপনি কি এই সনদটি ডিলিট করতে চান?' : 'Delete this certificate?')) {
                              onDeleteSanad(sanad.id);
                            }
                          }}
                          className="p-1 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition"
                          title="Delete Sanad"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-12 text-center text-slate-400 text-xs flex flex-col items-center justify-center space-y-2">
              <Award className="w-8 h-8 text-slate-300" />
              <p>{lang === 'bn' ? 'এখনো কোনো সনদ ইস্যু করা হয়নি।' : 'No certificates issued yet.'}</p>
            </div>
          )}
        </div>

      </div>

      {/* ================= CARD 2: অফিসিয়াল চিঠি ================= */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200">
        
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-100 gap-3">
          <div className="flex items-center gap-2.5">
            <FileText className="text-emerald-700 w-5 h-5" />
            <h3 className="text-lg font-bold text-slate-800">
              {lang === 'bn' ? 'অফিসিয়াল চিঠি' : 'Official Letters'}
            </h3>
            <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-full">
              {letters.length}
            </span>
          </div>

          <button
            onClick={() => setShowCreateLetter(true)}
            className="bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-full flex items-center gap-1.5 shadow-sm transition self-start sm:self-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'নতুন চিঠি লিখুন' : 'Compose Letter'}</span>
          </button>
        </div>

        {/* Table Content */}
        <div className="mt-4 overflow-x-auto">
          {filteredLetters.length > 0 ? (
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-bold bg-slate-50/50">
                  <th className="py-3 px-4">{lang === 'bn' ? 'স্মারক নং' : 'Memo No'}</th>
                  <th className="py-3 px-4">{lang === 'bn' ? 'বিষয়' : 'Subject'}</th>
                  <th className="py-3 px-4">{lang === 'bn' ? 'প্রাপক' : 'Recipient'}</th>
                  <th className="py-3 px-4">{lang === 'bn' ? 'তারিখ' : 'Date'}</th>
                  <th className="py-3 px-4 text-center">{lang === 'bn' ? 'চিঠি' : 'Letter'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLetters.map((letter) => (
                  <tr key={letter.id} className="hover:bg-slate-50/80 transition group">
                    
                    {/* Smarak No */}
                    <td className="py-3.5 px-4 font-mono font-bold text-emerald-800 whitespace-nowrap">
                      <span className="bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {letter.smarakNo}
                      </span>
                    </td>

                    {/* Subject */}
                    <td className="py-3.5 px-4 font-bold text-slate-800 max-w-xs truncate">
                      {letter.subject}
                    </td>

                    {/* Recipient */}
                    <td className="py-3.5 px-4 text-slate-600">
                      {letter.recipient}
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 text-slate-600 font-medium whitespace-nowrap">
                      {letter.date}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setActiveLetterModal(letter)}
                          className="border border-emerald-500 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg px-3 py-1 font-bold text-xs flex items-center gap-1.5 transition shadow-2xs whitespace-nowrap"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>{lang === 'bn' ? 'চিঠি দেখুন ও প্রিন্ট' : 'View Letter'}</span>
                        </button>

                        <button
                          onClick={() => {
                            if (window.confirm(lang === 'bn' ? 'আপনি কি এই চিঠিটি ডিলিট করতে চান?' : 'Delete this letter?')) {
                              onDeleteLetter(letter.id);
                            }
                          }}
                          className="p-1 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition"
                          title="Delete Letter"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-12 text-center text-slate-400 text-xs flex flex-col items-center justify-center space-y-2">
              <Mail className="w-8 h-8 text-slate-300" />
              <p>{lang === 'bn' ? 'এখনো কোনো চিঠি লেখা হয়নি।' : 'No letters written yet.'}</p>
            </div>
          )}
        </div>

      </div>

      {/* ================= CARD 3: মার্কশিট (প্রকাশিত ফলাফল) ================= */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200">
        
        {/* Card Header */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <FileText className="text-emerald-700 w-5 h-5" />
            <h3 className="text-lg font-bold text-slate-800">
              {lang === 'bn' ? 'মার্কশিট (প্রকাশিত ফলাফল)' : 'Marksheet (Published Results)'}
            </h3>
            <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-full">
              {results.length}
            </span>
          </div>

          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            শিক্ষার্থী ও পরীক্ষার ফলাফল সনদ
          </span>
        </div>

        {/* Table Content */}
        <div className="mt-4 overflow-x-auto">
          {filteredResults.length > 0 ? (
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-bold bg-slate-50/50">
                  <th className="py-3 px-4">{lang === 'bn' ? 'শিক্ষার্থী' : 'Student'}</th>
                  <th className="py-3 px-4">{lang === 'bn' ? 'রেফারেন্স' : 'Reference'}</th>
                  <th className="py-3 px-4">{lang === 'bn' ? 'পরীক্ষা' : 'Exam Term'}</th>
                  <th className="py-3 px-4">{lang === 'bn' ? 'শিক্ষাবর্ষ' : 'Year'}</th>
                  <th className="py-3 px-4">{lang === 'bn' ? 'প্রকাশের তারিখ' : 'Publish Date'}</th>
                  <th className="py-3 px-4 text-center">{lang === 'bn' ? 'মার্কশিট' : 'Marksheet'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredResults.map((res) => (
                  <tr key={res.id} className="hover:bg-slate-50/80 transition group">
                    
                    {/* Student Name */}
                    <td className="py-3.5 px-4 font-bold text-slate-800">
                      <span>{res.studentName}</span>
                      <span className="text-slate-500 font-normal ml-1">
                        (রোল: {res.studentRoll})
                      </span>
                    </td>

                    {/* Reference ID */}
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-700">
                      {res.id}
                    </td>

                    {/* Exam Term */}
                    <td className="py-3.5 px-4 font-semibold text-slate-800">
                      {res.examTerm === '2nd_term'
                        ? '২য় সাময়িক পরীক্ষা'
                        : res.examTerm === '1st_term'
                        ? '১ম সাময়িক পরীক্ষা'
                        : 'বার্ষিক পরীক্ষা'}
                    </td>

                    {/* Year */}
                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {res.year}
                    </td>

                    {/* Published Date */}
                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {res.publishedDate}
                    </td>

                    {/* Action Download / View */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => onOpenMarksheet(res)}
                        className="border border-emerald-500 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg px-3 py-1 font-bold text-xs flex items-center gap-1.5 transition shadow-2xs mx-auto whitespace-nowrap"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{lang === 'bn' ? 'মার্কশিট ডাউনলোড' : 'Download Marksheet'}</span>
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-12 text-center text-slate-400 text-xs flex flex-col items-center justify-center space-y-2">
              <FileText className="w-8 h-8 text-slate-300" />
              <p>{lang === 'bn' ? 'এখনো কোনো ফলাফল প্রকাশিত হয়নি।' : 'No published exam results found.'}</p>
            </div>
          )}
        </div>

      </div>

      {/* ================= MODALS ================= */}

      {/* 1. Dastarbandi Sanad Certificate View Modal */}
      {activeSanadModal && (
        <DastarbandiSanadModal
          lang={lang}
          sanad={activeSanadModal}
          onClose={() => setActiveSanadModal(null)}
        />
      )}

      {/* 2. Official Letter Pad View Modal */}
      {activeLetterModal && (
        <OfficialLetterModal
          lang={lang}
          letter={activeLetterModal}
          onClose={() => setActiveLetterModal(null)}
        />
      )}

      {/* 3. Issue New Sanad Modal */}
      {showCreateSanad && (
        <CreateSanadModal
          lang={lang}
          students={students}
          onClose={() => setShowCreateSanad(false)}
          onSave={onAddSanad}
        />
      )}

      {/* 4. Compose New Letter Modal */}
      {showCreateLetter && (
        <CreateLetterModal
          lang={lang}
          onClose={() => setShowCreateLetter(false)}
          onSave={onAddLetter}
        />
      )}

    </div>
  );
};

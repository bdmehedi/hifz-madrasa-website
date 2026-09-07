import React from 'react';
import { Users, Phone, Mail, Award, BookOpen, GraduationCap, CheckCircle } from 'lucide-react';
import { Language, Teacher } from '../types';
import { getTranslation } from '../utils/translations';

interface TeachersDirectoryProps {
  lang: Language;
  teachers: Teacher[];
}

export const TeachersDirectory: React.FC<TeachersDirectoryProps> = ({
  lang,
  teachers
}) => {
  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-700/40">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center font-bold text-xl shadow">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">
              {getTranslation(lang, 'navTeachers')}
            </h1>
            <p className="text-xs text-emerald-200 mt-0.5">
              {lang === 'bn' ? 'অভিজ্ঞ, আন্তর্জাতিক সনদপ্রাপ্ত ও নিষ্ঠাবান শিক্ষক মণ্ডলী' : 'Dedicated Qualified Quranic Scholars & Qaris'}
            </p>
          </div>
        </div>
      </div>

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {teachers.map((t) => (
          <div key={t.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 hover:shadow-md hover:border-emerald-300 transition space-y-4">
            <div className="flex items-start gap-4">
              <img
                src={t.photoUrl}
                alt={t.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500 shadow-sm"
              />
              <div className="space-y-0.5">
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                  {t.designation}
                </span>
                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  {t.name}
                </h3>
                <p className="text-[11px] text-slate-500">
                  {t.qualification}
                </p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">দায়িত্বপ্রাপ্ত বিভাগ:</span>
                <span className="font-semibold text-emerald-900">{t.assignedGroup}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">অভিজ্ঞতা:</span>
                <span className="font-bold text-slate-800">{t.experience}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">যোগাযোগ:</span>
                <span className="font-mono text-slate-700">{t.phone}</span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>মুয়াল্লিম প্রশিক্ষণ ও তাহফিজুল কুরআন সনদপ্রাপ্ত</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

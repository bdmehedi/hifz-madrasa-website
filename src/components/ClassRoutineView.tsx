import React, { useState } from 'react';
import { Calendar, Clock, BookOpen, Printer, Download, User } from 'lucide-react';
import { Language, ClassRoutineDay } from '../types';
import { getTranslation } from '../utils/translations';

interface ClassRoutineViewProps {
  lang: Language;
  routines: ClassRoutineDay[];
}

export const ClassRoutineView: React.FC<ClassRoutineViewProps> = ({
  lang,
  routines
}) => {
  const [selectedDay, setSelectedDay] = useState<string>('all');

  const filteredRoutines = routines.filter(r => selectedDay === 'all' || r.day === selectedDay);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-800 via-teal-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-teal-700/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center font-bold text-xl shadow">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">
                {getTranslation(lang, 'routineTitle')}
              </h1>
              <p className="text-xs text-teal-200 mt-0.5">
                {getTranslation(lang, 'routineDesc')}
              </p>
            </div>
          </div>

          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-teal-700 hover:bg-teal-600 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-2 border border-teal-500 w-fit"
          >
            <Printer className="w-4 h-4 text-amber-300" />
            <span>{lang === 'bn' ? 'রুটিন প্রিন্ট করুন' : 'Print Routine'}</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-1.5 bg-white p-2 rounded-2xl shadow-sm border border-slate-200">
        <button
          onClick={() => setSelectedDay('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            selectedDay === 'all' ? 'bg-teal-700 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          সম্পূর্ণ সপ্তাহ (শনিবার - বৃহস্পতিবার)
        </button>
        {routines.map(r => (
          <button
            key={r.day}
            onClick={() => setSelectedDay(r.day)}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition ${
              selectedDay === r.day ? 'bg-teal-700 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {lang === 'bn' ? r.day : r.dayEn}
          </button>
        ))}
      </div>

      {/* Routines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredRoutines.map((day) => (
          <div key={day.day} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-teal-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-teal-600" />
                <span>{lang === 'bn' ? day.day : day.dayEn}</span>
              </h3>
              <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-bold">
                {day.periods.length} টি পিরিয়ড
              </span>
            </div>

            <div className="space-y-2.5">
              {day.periods.map((p, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100/70 transition flex items-start justify-between gap-3 text-xs">
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-900 block text-xs">
                      {lang === 'bn' ? p.subject : p.subjectEn}
                    </span>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <User className="w-3 h-3 text-teal-700" />
                      মুয়াল্লিম: {p.ustadName} ({p.room})
                    </span>
                  </div>
                  <span className="font-mono text-[11px] font-bold text-teal-900 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200 shrink-0">
                    {p.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

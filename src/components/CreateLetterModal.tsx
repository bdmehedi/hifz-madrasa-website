import React, { useState } from 'react';
import { X, FileText, CheckCircle2 } from 'lucide-react';
import { OfficialLetter, Language } from '../types';

interface CreateLetterModalProps {
  lang: Language;
  onClose: () => void;
  onSave: (newLetter: OfficialLetter) => void;
}

export const CreateLetterModal: React.FC<CreateLetterModalProps> = ({
  lang,
  onClose,
  onSave
}) => {
  const nextNumber = Math.floor(10 + Math.random() * 90);
  const todayDate = new Date().toISOString().split('T')[0];

  const [smarakNo, setSmarakNo] = useState<string>(`DQA/ADM/2026/0${nextNumber}`);
  const [subject, setSubject] = useState<string>('');
  const [recipient, setRecipient] = useState<string>('সকল সম্মানিত অভিভাবক ও শিক্ষকবৃন্দ');
  const [recipientAddress, setRecipientAddress] = useState<string>('দারুল কুরআন একাডেমি কমপ্লেক্স');
  const [date, setDate] = useState<string>(todayDate);
  const [hijriDate, setHijriDate] = useState<string>('রজব / শা\'বান ১৪৪৭ হিজরী');
  const [sender, setSender] = useState<string>('মুফতী মাহমুদ হাসান');
  const [senderTitle, setSenderTitle] = useState<string>('প্রধান মুহতামিম ও পরিচালক');
  const [content, setContent] = useState<string>(`আসসালামু আলাইকুম ওয়া রাহমাতুল্লাহি ওয়া বারাকাতুহ্।
অত্র মাদ্রাসার সম্মানিত অভিভাবক ও সংশ্লিষ্ট সকলের অবগতির জন্য জানানো যাচ্ছে যে, ...`);
  const [copiesText, setCopiesText] = useState<string>('সভাপতি, গভর্নিং বডি\nনাজেমে তা\'লীমাত (শিক্ষা সচিব)\nঅফিস রেকর্ড ফাইল');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!smarakNo.trim() || !subject.trim() || !content.trim()) return;

    const copiesTo = copiesText
      .split('\n')
      .map((c) => c.trim())
      .filter((c) => c.length > 0);

    const newLetter: OfficialLetter = {
      id: `LETTER-${Date.now()}`,
      smarakNo: smarakNo.trim(),
      subject: subject.trim(),
      recipient: recipient.trim(),
      recipientAddress: recipientAddress.trim(),
      date,
      hijriDate: hijriDate.trim(),
      sender: sender.trim(),
      senderTitle: senderTitle.trim(),
      content: content.trim(),
      status: 'published',
      copiesTo
    };

    onSave(newLetter);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <span className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
              <FileText className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-800">
                {lang === 'bn' ? 'নতুন অফিসিয়াল চিঠি লিখুন' : 'Compose New Official Letter'}
              </h3>
              <p className="text-xs text-slate-500">
                লেটারহেড প্যাডে নোটিশ, সার্কুলার বা প্রশাসনিক চিঠি প্রস্তুতকরণ
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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <span className="text-slate-600 block mb-1 font-semibold">স্মারক নম্বর:*</span>
              <input
                type="text"
                required
                value={smarakNo}
                onChange={(e) => setSmarakNo(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-mono text-xs focus:outline-emerald-600"
                placeholder="যেমন: DQA/ADM/2026/045"
              />
            </div>
            <div>
              <span className="text-slate-600 block mb-1 font-semibold">তারিখ:*</span>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs focus:outline-emerald-600"
              />
            </div>
          </div>

          <div>
            <span className="text-slate-600 block mb-1 font-semibold">হিজরি তারিখ (ঐচ্ছিক):</span>
            <input
              type="text"
              value={hijriDate}
              onChange={(e) => setHijriDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs focus:outline-emerald-600"
              placeholder="যেমন: ১৫ সফর ১৪৪৮ হিজরী"
            />
          </div>

          <div>
            <span className="text-slate-600 block mb-1 font-semibold">চিঠির বিষয়:*</span>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-bold text-slate-900 focus:outline-emerald-600"
              placeholder="যেমন: বার্ষিক ক্রীড়া ও সাংস্কৃতিক প্রতিযোগিতা সংক্রান্ত বিজ্ঞপ্তি"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <span className="text-slate-600 block mb-1 font-semibold">প্রাপক (বরাবর):*</span>
              <input
                type="text"
                required
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs focus:outline-emerald-600"
                placeholder="যেমন: সম্মানিত অভিভাবকবৃন্দ"
              />
            </div>
            <div>
              <span className="text-slate-600 block mb-1 font-semibold">প্রাপকের ঠিকানা / বিভাগ:</span>
              <input
                type="text"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs focus:outline-emerald-600"
                placeholder="যেমন: দারুল কুরআন একাডেমি"
              />
            </div>
          </div>

          {/* Letter Body */}
          <div>
            <span className="text-slate-600 block mb-1 font-semibold">চিঠির মূল বিষয়বস্তু ও বক্তব্য:*</span>
            <textarea
              required
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs leading-relaxed focus:outline-emerald-600 resize-y"
              placeholder="চিঠির বিস্তারিত বক্তব্য এখানে লিখুন..."
            />
          </div>

          {/* Sender & Copies */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <span className="text-slate-600 block mb-1 font-semibold">প্রেরকের নাম:*</span>
              <input
                type="text"
                required
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs focus:outline-emerald-600"
              />
            </div>
            <div>
              <span className="text-slate-600 block mb-1 font-semibold">প্রেরকের পদবী:</span>
              <input
                type="text"
                value={senderTitle}
                onChange={(e) => setSenderTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs focus:outline-emerald-600"
              />
            </div>
          </div>

          <div>
            <span className="text-slate-600 block mb-1 font-semibold">অনুলিপি (প্রতি লাইনে একটি করে):</span>
            <textarea
              rows={2}
              value={copiesText}
              onChange={(e) => setCopiesText(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs focus:outline-emerald-600"
              placeholder="সভাপতি, গভর্নিং বডি&#10;নাজেমে তা'লীমাত"
            />
          </div>

          {/* Buttons */}
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
              <span>চিঠি সেভ ও প্রস্তুত করুন</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

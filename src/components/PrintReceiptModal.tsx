import React from 'react';
import { X, Printer, CheckCircle, Shield } from 'lucide-react';
import { FeeInvoice, Language } from '../types';
import { getTranslation } from '../utils/translations';

interface PrintReceiptModalProps {
  lang: Language;
  invoice: FeeInvoice;
  onClose: () => void;
}

export const PrintReceiptModal: React.FC<PrintReceiptModalProps> = ({
  lang,
  invoice,
  onClose
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm print:p-0 print:bg-white">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 print:shadow-none print:border-none print:m-0 print:p-4">
        
        {/* Controls - Hidden in print */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 print:hidden">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            {lang === 'bn' ? 'অফিসিয়াল মানি রিসিট ভাউচার' : 'Official Payment Receipt'}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow"
            >
              <Printer className="w-4 h-4" />
              <span>{lang === 'bn' ? 'প্রিন্ট / PDF সেভ' : 'Print / Save PDF'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Receipt Paper */}
        <div className="space-y-5 text-slate-900 text-xs border-2 border-emerald-800/40 p-6 rounded-2xl bg-emerald-50/10 print:border-slate-800">
          
          {/* Header */}
          <div className="text-center space-y-1 pb-3 border-b-2 border-emerald-800/20">
            <span className="font-['Amiri'] text-emerald-800 text-sm font-bold block">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
            <h2 className="text-lg font-black text-emerald-950">
              {getTranslation(lang, 'madrasaName')}
            </h2>
            <p className="text-[11px] text-slate-500">
              হিফজুল কুরআন ও নূরানী মক্তব বিভাগ | মিরপুর-১২, ঢাকা-১২১৬
            </p>
            <span className="inline-block px-3 py-0.5 bg-emerald-800 text-white text-[11px] font-bold rounded mt-1">
              মানি রিসিট / বেতন আদায় ভাউচার
            </span>
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-slate-500 block text-[10px]">রসিদ নম্বর:</span>
              <span className="font-mono font-bold text-emerald-900">{invoice.invoiceNo}</span>
            </div>
            <div className="text-right">
              <span className="text-slate-500 block text-[10px]">পরিশোধের তারিখ:</span>
              <span className="font-mono font-bold">{invoice.paidDate || invoice.dueDate}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">শিক্ষার্থীর নাম ও রোল:</span>
              <span className="font-bold text-slate-900">{invoice.studentName} (আইডি: {invoice.studentId})</span>
            </div>
            <div className="text-right">
              <span className="text-slate-500 block text-[10px]">পেমেন্ট মাধ্যম:</span>
              <span className="font-bold uppercase text-emerald-800">{invoice.paymentMethod || 'Online (bKash/Nagad)'}</span>
            </div>
          </div>

          {/* Invoice Item Table */}
          <table className="w-full text-left text-xs border-collapse border border-slate-300">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-300">
                <th className="p-2 border-r border-slate-300">বিবরণ / ফিসের খাত</th>
                <th className="p-2 border-r border-slate-300">মাস</th>
                <th className="p-2 text-right">টাকার পরিমাণ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border-r border-slate-300 font-semibold">{invoice.title}</td>
                <td className="p-2 border-r border-slate-300">{invoice.month}</td>
                <td className="p-2 text-right font-mono font-bold">৳ {invoice.amount.toLocaleString()}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="bg-emerald-50/50 font-bold border-t border-slate-300">
                <td colSpan={2} className="p-2 text-right border-r border-slate-300">মোট পরিশোধিত টাকা:</td>
                <td className="p-2 text-right font-mono text-emerald-900 text-sm">৳ {invoice.amount.toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>

          {invoice.trxId && (
            <div className="text-[11px] font-mono text-slate-500">
              ট্রানজেকশন আইডি: <span className="font-bold text-slate-800">{invoice.trxId}</span>
            </div>
          )}

          {/* Signatures */}
          <div className="pt-8 flex justify-between items-end text-[11px] text-slate-600">
            <div className="text-center">
              <div className="w-32 border-t border-slate-400 pt-1">হিসাবরক্ষক স্বাক্ষর</div>
            </div>
            <div className="text-center">
              <div className="w-32 border-t border-slate-400 pt-1">মুহতামিম / সীল</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

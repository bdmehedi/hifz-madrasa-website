import React, { useState } from 'react';
import { 
  X, 
  CreditCard, 
  CheckCircle, 
  AlertCircle, 
  ShieldCheck, 
  Printer, 
  Download,
  Smartphone
} from 'lucide-react';
import { Language, FeeInvoice } from '../types';
import { getTranslation } from '../utils/translations';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  invoice: FeeInvoice | null;
  onPaymentSuccess: (invoiceId: string, method: string, trxId: string) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  lang,
  invoice,
  onPaymentSuccess
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'bkash' | 'nagad' | 'rocket' | 'bank_transfer'>('bkash');
  const [phone, setPhone] = useState('01933445566');
  const [otp, setOtp] = useState('');
  const [pin, setPin] = useState('');
  const [step, setStep] = useState<'method' | 'otp' | 'pin' | 'success'>('method');
  const [isProcessing, setIsProcessing] = useState(false);
  const [trxId, setTrxId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen || !invoice) return null;

  const handleStartPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 11) {
      setErrorMessage(lang === 'bn' ? 'সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন' : 'Enter a valid 11-digit mobile number');
      return;
    }
    setErrorMessage('');
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('otp');
    }, 800);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      setErrorMessage(lang === 'bn' ? 'অনুগ্রহ করে ৪ ডিজিটের ওটিপি দিন (যেমন: 1234)' : 'Enter 4 digit OTP (e.g. 1234)');
      return;
    }
    setErrorMessage('');
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('pin');
    }, 800);
  };

  const handleConfirmPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin) {
      setErrorMessage(lang === 'bn' ? 'আপনার গোপন পিন নম্বর দিন' : 'Enter your PIN');
      return;
    }
    setErrorMessage('');
    setIsProcessing(true);

    const generatedTrx = 'TRX' + Math.random().toString(36).substring(2, 9).toUpperCase();
    setTrxId(generatedTrx);

    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
      onPaymentSuccess(invoice.id, selectedMethod, generatedTrx);
    }, 1200);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-emerald-100 max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 p-4 sm:p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-700/80 border border-emerald-400/40 flex items-center justify-center text-amber-300">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold">
                {lang === 'bn' ? 'অনলাইন ফি পেমেন্ট গেটওয়ে' : 'Online Fee Payment Gateway'}
              </h2>
              <p className="text-xs text-emerald-200">
                {invoice.title}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-emerald-200 hover:text-white hover:bg-emerald-700/50 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Invoice Summary Box */}
        <div className="p-4 bg-emerald-50/60 border-b border-emerald-100 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-500">{lang === 'bn' ? 'শিক্ষার্থী:' : 'Student:'} </span>
            <span className="font-bold text-slate-800">{invoice.studentName} (রোল: {invoice.studentRoll})</span>
            <div className="text-[11px] text-slate-500 font-mono">ইনভয়েস: {invoice.invoiceNo}</div>
          </div>
          <div className="text-right">
            <span className="text-slate-500 block">{lang === 'bn' ? 'মোট প্রদেয়:' : 'Payable Amount:'}</span>
            <span className="text-base font-extrabold text-emerald-800 font-mono">৳ {invoice.amount.toLocaleString()}</span>
          </div>
        </div>

        {/* Dynamic Payment Body */}
        <div className="p-5">
          {errorMessage && (
            <div className="mb-3 p-2.5 rounded-lg bg-red-50 text-red-700 text-xs flex items-center gap-2 border border-red-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {step === 'method' && (
            <form onSubmit={handleStartPayment} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  {lang === 'bn' ? 'পেমেন্ট মাধ্যম নির্বাচন করুন:' : 'Choose Payment Channel:'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {/* bKash */}
                  <button
                    type="button"
                    onClick={() => setSelectedMethod('bkash')}
                    className={`p-2.5 rounded-xl border text-center font-bold text-xs flex flex-col items-center gap-1 transition ${
                      selectedMethod === 'bkash' 
                        ? 'border-pink-500 bg-pink-50 text-pink-700 ring-2 ring-pink-500' 
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-sm font-black text-pink-600 font-sans">bKash</span>
                    <span className="text-[10px] text-slate-500">বিকাশ</span>
                  </button>

                  {/* Nagad */}
                  <button
                    type="button"
                    onClick={() => setSelectedMethod('nagad')}
                    className={`p-2.5 rounded-xl border text-center font-bold text-xs flex flex-col items-center gap-1 transition ${
                      selectedMethod === 'nagad' 
                        ? 'border-orange-500 bg-orange-50 text-orange-700 ring-2 ring-orange-500' 
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-sm font-black text-orange-600 font-sans">Nagad</span>
                    <span className="text-[10px] text-slate-500">নগদ</span>
                  </button>

                  {/* Rocket */}
                  <button
                    type="button"
                    onClick={() => setSelectedMethod('rocket')}
                    className={`p-2.5 rounded-xl border text-center font-bold text-xs flex flex-col items-center gap-1 transition ${
                      selectedMethod === 'rocket' 
                        ? 'border-purple-500 bg-purple-50 text-purple-700 ring-2 ring-purple-500' 
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-sm font-black text-purple-600 font-sans">Rocket</span>
                    <span className="text-[10px] text-slate-500">রকেট</span>
                  </button>

                  {/* Bank Transfer */}
                  <button
                    type="button"
                    onClick={() => setSelectedMethod('bank_transfer')}
                    className={`p-2.5 rounded-xl border text-center font-bold text-xs flex flex-col items-center gap-1 transition ${
                      selectedMethod === 'bank_transfer' 
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-600' 
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-sm font-black text-emerald-700 font-sans">Bank</span>
                    <span className="text-[10px] text-slate-500">ইসলামী ব্যাংক</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {lang === 'bn' ? `${selectedMethod.toUpperCase()} অ্যাকাউন্ট নম্বর:` : `${selectedMethod.toUpperCase()} Account Number:`}
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="01XXXXXXXXX"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 font-mono font-bold"
                  />
                  <Smartphone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  {lang === 'bn' ? 'যেকোনো ব্যক্তিগত বিকাশ বা নগদ একাউন্ট নম্বর ব্যবহার করা যাবে।' : 'Use any active personal mobile wallet number.'}
                </p>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-md shadow-emerald-700/20"
              >
                {isProcessing ? (
                  <span className="animate-spin text-sm">⏳</span>
                ) : (
                  <>
                    <span>{lang === 'bn' ? 'পরবর্তী ধাপে ওটিপি পাঠান' : 'Proceed to Send OTP'}</span>
                    <span>→</span>
                  </>
                )}
              </button>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-4 text-center">
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
                <span>{lang === 'bn' ? `${phone} নম্বরে একটি ডেমো ওটিপি কোড পাঠানো হয়েছে:` : `Demo verification code sent to ${phone}:`}</span>
                <span className="font-mono font-black text-sm ml-2 bg-amber-200 px-2 py-0.5 rounded">1234</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {lang === 'bn' ? '৪ সংখ্যার ওটিপি কোড লিখুন' : 'Enter 4-Digit Verification Code'}
                </label>
                <input
                  type="text"
                  maxLength={4}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="1234"
                  autoFocus
                  className="w-40 mx-auto text-center py-2 text-lg tracking-widest border-2 border-emerald-500 rounded-xl focus:ring-2 focus:ring-emerald-500 font-mono font-bold"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep('method')}
                  className="w-1/3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl"
                >
                  {lang === 'bn' ? 'পিছনে' : 'Back'}
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-2/3 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition"
                >
                  {isProcessing ? 'যাচাই হচ্ছে...' : (lang === 'bn' ? 'ওটিপি নিশ্চিত করুন' : 'Confirm OTP')}
                </button>
              </div>
            </form>
          )}

          {step === 'pin' && (
            <form onSubmit={handleConfirmPin} className="space-y-4 text-center">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900">
                <span>{lang === 'bn' ? `পেমেন্ট সম্পন্ন করতে ${selectedMethod.toUpperCase()} একাউন্টের গোপন পিন দিন (ডেমো পিন: 12345)` : `Enter your wallet PIN to authorize ৳${invoice.amount}`}</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {lang === 'bn' ? 'গোপন পিন নম্বর দিন' : 'Enter Secret PIN'}
                </label>
                <input
                  type="password"
                  maxLength={5}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="•••••"
                  autoFocus
                  className="w-40 mx-auto text-center py-2 text-lg tracking-widest border-2 border-emerald-600 rounded-xl focus:ring-2 focus:ring-emerald-500 font-mono font-bold"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep('otp')}
                  className="w-1/3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl"
                >
                  {lang === 'bn' ? 'পিছনে' : 'Back'}
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-2/3 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 shadow-md"
                >
                  <ShieldCheck className="w-4 h-4" />
                  {isProcessing ? 'পেমেন্ট সম্পন্ন হচ্ছে...' : (lang === 'bn' ? `৳ ${invoice.amount} ফি পরিশোধ করুন` : `Pay ৳${invoice.amount}`)}
                </button>
              </div>
            </form>
          )}

          {step === 'success' && (
            <div className="text-center space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center border-4 border-emerald-200 shadow-sm">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-800">
                  {lang === 'bn' ? 'আলহামদুলিল্লাহ! ফি পরিশোধ সফল হয়েছে' : 'Alhamdulillah! Payment Successful'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {lang === 'bn' ? 'মাদ্রাসার অফিসিয়াল পেমেন্ট রসিদ প্রস্তুত করা হয়েছে।' : 'Official fee receipt has been issued.'}
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-left space-y-1.5 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-500">Transaction ID:</span>
                  <span className="font-bold text-emerald-800">{trxId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Invoice:</span>
                  <span className="text-slate-800">{invoice.invoiceNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Amount Paid:</span>
                  <span className="font-bold text-slate-900">৳ {invoice.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Method:</span>
                  <span className="uppercase text-slate-700">{selectedMethod}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={handlePrint}
                  className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 border border-slate-300"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{getTranslation(lang, 'print')}</span>
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold"
                >
                  {getTranslation(lang, 'close')}
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

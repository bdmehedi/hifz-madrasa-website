import {
  Student,
  Teacher,
  SabaqDiaryEntry,
  ExamResult,
  FeeInvoice,
  Notice,
  AdmissionApplication,
  ClassRoutineDay,
  User,
  HeroSlide,
  GalleryItem,
  BlogPost,
  DastarbandiSanad,
  OfficialLetter
} from '../types';
import { INITIAL_BLOG_POSTS } from './blogData';
import dastarbandiImg from '../assets/images/dastarbandi_convocation_1788755730087.jpg';
import sanadCeremonyImg from '../assets/images/hifz_sanad_ceremony_1788755745298.jpg';
import nooraniMaktabImg from '../assets/images/noorani_maktab_class_1788755759855.jpg';

export const INITIAL_USERS: User[] = [
  {
    id: 'user-admin',
    name: 'মুফতী মাহমুদ হাসান (মুহতামিম)',
    nameEn: 'Mufti Mahmud Hasan (Principal)',
    phone: '01711112233',
    email: 'principal@darulquran.edu.bd',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'user-teacher-1',
    name: 'হাফেজ ক্বারী আব্দুল্লাহ আল-মামুন',
    nameEn: 'Hafiz Qari Abdullah Al-Mamun',
    phone: '01822334455',
    email: 'mamun@darulquran.edu.bd',
    role: 'teacher',
    teacherId: 'T-101',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'user-parent-1',
    name: 'মোহাম্মদ রফিকুল ইসলাম (অভিভাবক)',
    nameEn: 'Mohammad Rafiqul Islam (Guardian)',
    phone: '01933445566',
    email: 'rafiq.parent@gmail.com',
    role: 'parent',
    studentId: 'ST-101',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'ST-101',
    roll: '101',
    name: 'মুহাম্মদ আব্দুল্লাহ বিন রফিক',
    nameEn: 'Muhammad Abdullah Bin Rafiq',
    fatherName: 'মোহাম্মদ রফিকুল ইসলাম',
    motherName: 'মোসাম্মৎ ফাতেমা বেগম',
    guardianPhone: '01933445566',
    department: 'hifz',
    groupOrClass: 'হিফজ বিভাগ (গ্রুপ-ক)',
    assignedUstadId: 'T-101',
    assignedUstadName: 'হাফেজ ক্বারী আব্দুল্লাহ আল-মামুন',
    admissionDate: '2024-01-10',
    birthDate: '2013-05-14',
    bloodGroup: 'B+',
    address: 'মিরপুর-১১, ঢাকা',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    status: 'active',
    completedParas: 14,
    currentPara: 15,
    currentSurah: 'সূরা বনী ইসরাঈল (আয়াত ১-২৫)',
    currentAyatRange: 'পৃষ্ঠা ২৮২, আয়াত ১-২৫',
    monthlyFee: 4500
  },
  {
    id: 'ST-102',
    roll: '102',
    name: 'হুযাইফা আহমেদ সালমান',
    nameEn: 'Huzaifa Ahmed Salman',
    fatherName: 'আহমেদ কবির',
    motherName: 'রোকেয়া সুলতানা',
    guardianPhone: '01755667788',
    department: 'hifz',
    groupOrClass: 'হিফজ বিভাগ (গ্রুপ-খ)',
    assignedUstadId: 'T-102',
    assignedUstadName: 'হাফেজ জুবায়ের আহমেদ',
    admissionDate: '2023-06-15',
    birthDate: '2012-08-20',
    bloodGroup: 'O+',
    address: 'পল্লবী, ঢাকা',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    status: 'active',
    completedParas: 28,
    currentPara: 29,
    currentSurah: 'সূরা আল-মুলক থেকে আল-মুদ্দাসসির',
    currentAyatRange: 'পারা ২৯ সম্পূর্ণ',
    monthlyFee: 5000
  },
  {
    id: 'ST-103',
    roll: '103',
    name: 'আহসান হাবিব রায়হান',
    nameEn: 'Ahsan Habib Rayhan',
    fatherName: 'মুহাম্মদ হাবিবুর রহমান',
    motherName: 'নাসরিন আক্তার',
    guardianPhone: '01866778899',
    department: 'hifz',
    groupOrClass: 'হিফজ বিভাগ (গ্রুপ-ক)',
    assignedUstadId: 'T-101',
    assignedUstadName: 'হাফেজ ক্বারী আব্দুল্লাহ আল-মামুন',
    admissionDate: '2024-02-01',
    birthDate: '2014-03-10',
    bloodGroup: 'A+',
    address: 'উত্তরা সেক্টর-৪, ঢাকা',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
    status: 'active',
    completedParas: 6,
    currentPara: 7,
    currentSurah: 'সূরা আল-আনআম (আয়াত ৫০-৭৩)',
    currentAyatRange: 'পৃষ্ঠা ১৩৪',
    monthlyFee: 4500
  },
  {
    id: 'ST-104',
    roll: '104',
    name: 'তাহমিদ হাসান মাহির',
    nameEn: 'Tahmid Hasan Mahir',
    fatherName: 'আবুল বাশার',
    motherName: 'লায়লা আক্তার',
    guardianPhone: '01611223344',
    department: 'maktab',
    groupOrClass: 'নূরানী মক্তব বিভাগ (আমপারা জামাত)',
    assignedUstadId: 'T-103',
    assignedUstadName: 'মওলানা তরিকুল ইসলাম',
    admissionDate: '2024-05-01',
    birthDate: '2016-11-18',
    bloodGroup: 'AB+',
    address: 'মিরপুর-১২, ঢাকা',
    photoUrl: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=200&auto=format&fit=crop&q=80',
    status: 'active',
    completedParas: 0,
    currentPara: 30,
    currentSurah: 'সূরা আন-নাবা ও আন-নাযিয়াত',
    currentAyatRange: 'আমপারা শেষাংশ',
    maktabStage: 'আমপারা নাজেরা ও মাসআলা',
    monthlyFee: 3500
  },
  {
    id: 'ST-105',
    roll: '105',
    name: 'ইব্রাহিম খলিল কাওসার',
    nameEn: 'Ibrahim Khalil Kawsar',
    fatherName: 'খলিলুর রহমান',
    motherName: 'মাজেদা খাতুন',
    guardianPhone: '01911998877',
    department: 'tajweed',
    groupOrClass: 'তাজবীদ ও ক্বিরাআত বিশেষ বিভাগ',
    assignedUstadId: 'T-101',
    assignedUstadName: 'হাফেজ ক্বারী আব্দুল্লাহ আল-মামুন',
    admissionDate: '2023-11-01',
    birthDate: '2011-07-09',
    bloodGroup: 'B-',
    address: 'মোহাম্মদপুর, ঢাকা',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
    status: 'active',
    completedParas: 30,
    currentPara: 30,
    currentSurah: 'মুশাফ শেষ রিভিশন ও ক্বিরাআত সাবআহ',
    currentAyatRange: 'তাজবীদ লাহনে জলী ও খফী মস্ক',
    monthlyFee: 4000
  }
];

export const INITIAL_TEACHERS: Teacher[] = [
  {
    id: 'T-101',
    name: 'হাফেজ ক্বারী আব্দুল্লাহ আল-মামুন',
    nameEn: 'Hafiz Qari Abdullah Al-Mamun',
    designation: 'প্রধান হিফজ শিক্ষক ও মুয়াল্লিম',
    designationEn: 'Head Hifz Instructor & Qari',
    qualification: 'হাফেজে কুরআন, আন্তর্জাতিক ক্বিরাআত সনদপ্রাপ্ত (মিশর ও মদিনা)',
    department: 'hifz',
    phone: '01822334455',
    email: 'mamun.qari@darulquran.edu.bd',
    joiningYear: '2019',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    classesAssigned: ['হিফজ গ্রুপ-ক', 'তাজবীদ মস্ক ক্লাস'],
    totalStudents: 18
  },
  {
    id: 'T-102',
    name: 'হাফেজ জুবায়ের আহমেদ',
    nameEn: 'Hafiz Zubair Ahmed',
    designation: 'সিনিয়র হিফজ প্রশিক্ষক',
    designationEn: 'Senior Hifz Instructor',
    qualification: 'হাফেজে কুরআন ও সনদপ্রাপ্ত মুজাওয়িদ',
    department: 'hifz',
    phone: '01733445566',
    email: 'zubair@darulquran.edu.bd',
    joiningYear: '2021',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    classesAssigned: ['হিফজ গ্রুপ-খ (আমোখতা বিশেষ)'],
    totalStudents: 16
  },
  {
    id: 'T-103',
    name: 'মওলানা ক্বারী তরিকুল ইসলাম',
    nameEn: 'Mawlana Qari Tariqul Islam',
    designation: 'ইনচার্জ, নূরানী ও মক্তব বিভাগ',
    designationEn: 'Incharge, Noorani & Maktab Dept',
    qualification: 'দাওরায়ে হাদিস (মাস্টার্স), নূরানী মুয়াল্লিম প্রশিক্ষণপ্রাপ্ত',
    department: 'maktab',
    phone: '01944556677',
    email: 'tariqul@darulquran.edu.bd',
    joiningYear: '2022',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
    classesAssigned: ['নূরানী কায়দা ও আমপারা জামাত', 'মাসআলা ও দোয়া'],
    totalStudents: 22
  },
  {
    id: 'T-104',
    name: 'মুফতী মাহমুদ হাসান',
    nameEn: 'Mufti Mahmud Hasan',
    designation: 'মুহতামিম ও শাইখুল হাদিস',
    designationEn: 'Principal & Head Mufti',
    qualification: 'ইফতা (মুফতী), দাওরায়ে হাদিস, উচ্চতর আরবি ভাষা ডিপ্লোমা',
    department: 'kitab',
    phone: '01711112233',
    email: 'principal@darulquran.edu.bd',
    joiningYear: '2017',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    classesAssigned: ['আকাইদ ও আখলাক', 'আরবি ব্যাকরণ'],
    totalStudents: 35
  }
];

export const INITIAL_SABAQ_DIARIES: SabaqDiaryEntry[] = [
  {
    id: 'DIARY-01',
    studentId: 'ST-101',
    date: '2026-08-27',
    sabaqPara: 15,
    sabaqSurah: 'সূরা বনী ইসরাঈল',
    sabaqPagesOrAyat: 'পৃষ্ঠা ২৮২, আয়াত ১-১২ (১ পৃষ্ঠা নতুন সবক)',
    sabaqQuality: 'excellent',
    sabqiPara: 14,
    sabqiPages: 'সূরা আন-নাহল শেষ ৫ পৃষ্ঠা',
    sabqiQuality: 'very_good',
    amokhtaPara: 7,
    amokhtaQuarterOrHalf: 'পারা ৭ সম্পূর্ণ রিভিশন',
    amokhtaQuality: 'excellent',
    maktabLesson: 'তাজবীদ: মদদে মুনফাসিল এর কায়েদা ও উদাহরণ',
    duaOrHadith: 'ঘুম থেকে ওঠার দোয়া ও মেসওয়াকের ফযিলত',
    salahPractice: 'নামাজে রুকু ও সিজদার তসবিহ সঠিক মস্ক',
    attendance: 'present',
    ustadRemarks: 'মাশাআল্লাহ! নতুন সবক ও আমোখতা অত্যন্ত নির্ভুল ছিল। গুন্নাহ ও মদের কায়দা বজায় রাখবে।',
    ustadName: 'হাফেজ ক্বারী আব্দুল্লাহ আল-মামুন',
    parentSigned: true,
    parentComment: 'আলহামদুলিল্লাহ, বাসায় নিয়মিত শুনছি।'
  },
  {
    id: 'DIARY-02',
    studentId: 'ST-101',
    date: '2026-08-26',
    sabaqPara: 14,
    sabaqSurah: 'সূরা আন-নাহল',
    sabaqPagesOrAyat: 'পৃষ্ঠা ২৮১, আয়াত ১১০-১২৮',
    sabaqQuality: 'very_good',
    sabqiPara: 14,
    sabqiPages: 'পৃষ্ঠা ২৭৫-২৮০',
    sabqiQuality: 'good',
    amokhtaPara: 6,
    amokhtaQuarterOrHalf: 'পারা ৬ সম্পূর্ণ',
    amokhtaQuality: 'very_good',
    maktabLesson: 'ইখফায়ে হাকীকির ১৫টি হরফ পুনরাবৃত্তি',
    duaOrHadith: 'মসজিদে প্রবেশের দোয়া',
    attendance: 'present',
    ustadRemarks: 'সবকী রিভিশনে সামান্য তাড়াহুড়া ছিল, ধীরেসুস্থে মস্ক করা দরকার।',
    ustadName: 'হাফেজ ক্বারী আব্দুল্লাহ আল-মামুন',
    parentSigned: true,
    parentComment: 'লক্ষ্য রাখব ইনশাআল্লাহ।'
  },
  {
    id: 'DIARY-03',
    studentId: 'ST-101',
    date: '2026-08-25',
    sabaqPara: 14,
    sabaqSurah: 'সূরা আন-নাহল',
    sabaqPagesOrAyat: 'পৃষ্ঠা ২৭৯-২৮০',
    sabaqQuality: 'excellent',
    sabqiPara: 14,
    sabqiPages: 'পৃষ্ঠা ২৭০-২৭৮',
    sabqiQuality: 'excellent',
    amokhtaPara: 5,
    amokhtaQuarterOrHalf: 'পারা ৫ প্রথমার্ধ',
    amokhtaQuality: 'excellent',
    attendance: 'present',
    ustadRemarks: 'খুবই সুন্দর তিলাওয়াত। তাজবীদ চমৎকার ছিল।',
    ustadName: 'হাফেজ ক্বারী আব্দুল্লাহ আল-মামুন',
    parentSigned: false
  },
  {
    id: 'DIARY-04',
    studentId: 'ST-102',
    date: '2026-08-27',
    sabaqPara: 29,
    sabaqSurah: 'সূরা আল-মুদ্দাসসির',
    sabaqPagesOrAyat: 'পৃষ্ঠা ৫৭৫-৫৭৭ সম্পূর্ণ',
    sabaqQuality: 'excellent',
    sabqiPara: 28,
    sabqiPages: 'সূরা আল-জুমুআ থেকে আত-তাহরীম',
    sabqiQuality: 'excellent',
    amokhtaPara: 20,
    amokhtaQuarterOrHalf: 'পারা ২০ সম্পূর্ণ রিভিশন',
    amokhtaQuality: 'very_good',
    attendance: 'present',
    ustadRemarks: 'হিফজ সমাপনী পরীক্ষার প্রস্তুতি বেশ ভালো এগোচ্ছে। আর মাত্র ১ পারা বাকি।',
    ustadName: 'হাফেজ জুবায়ের আহমেদ',
    parentSigned: true
  },
  {
    id: 'DIARY-05',
    studentId: 'ST-104',
    date: '2026-08-27',
    sabaqPara: 30,
    sabaqSurah: 'সূরা আল-ইনশিকাক',
    sabaqPagesOrAyat: 'আয়াত ১-১৫ নাজেরা পড়া',
    sabaqQuality: 'good',
    sabqiPara: 30,
    sabqiPages: 'সূরা আত-তাকবীর ও আল-ইনফিতার',
    sabqiQuality: 'very_good',
    amokhtaPara: 0,
    amokhtaQuarterOrHalf: 'নূরানী কায়দা তখতী নং ১২',
    amokhtaQuality: 'good',
    maktabLesson: 'আত্তাহিয়্যাতু ও দুরুদ শরীফ মুখস্থকরণ',
    duaOrHadith: 'খাবার খাওয়ার পূর্বের ও পরের দোয়া',
    salahPractice: 'ফজর নামাজের ২ রাকাত সুন্নাত ও ২ রাকাত ফরজ প্র্যাকটিস',
    attendance: 'present',
    ustadRemarks: 'নাজেরায় হরফের মাখরাজ সুন্দর হচ্ছে। বাসায় আরও ১ বার পড়তে বলবেন।',
    ustadName: 'মওলানা ক্বারী তরিকুল ইসলাম',
    parentSigned: true
  }
];

export const INITIAL_EXAM_RESULTS: ExamResult[] = [
  {
    id: 'RES-2026-101',
    studentId: 'ST-101',
    studentRoll: '101',
    studentName: 'মুহাম্মদ আব্দুল্লাহ বিন রফিক',
    studentNameEn: 'Muhammad Abdullah Bin Rafiq',
    examTerm: '2nd_term',
    year: '2026',
    department: 'hifz',
    classOrGroup: 'হিফজ বিভাগ (গ্রুপ-ক)',
    subjects: [
      { code: 'HIFZ-01', name: 'হিফজুল কুরআন তিলাওয়াত ও হেফজ মান', nameEn: 'Hifz Tilawat & Accuracy', fullMarks: 100, obtainedMarks: 96, passMarks: 40, grade: 'A+' },
      { code: 'TAJ-02', name: 'তাজবীদ ও সিফাত লাহনে জলী/খফী', nameEn: 'Tajweed & Sifat Rules', fullMarks: 50, obtainedMarks: 48, passMarks: 20, grade: 'A+' },
      { code: 'AMOK-03', name: 'আমোখতা / পেছনের মঞ্জিল পরীক্ষা', nameEn: 'Amokhta / Cumulative Revision', fullMarks: 100, obtainedMarks: 94, passMarks: 40, grade: 'A+' },
      { code: 'MAS-04', name: 'মাসআলা ও জরুরি সুন্নাত-আদব', nameEn: 'Islamic Jurisprudence & Etiquette', fullMarks: 50, obtainedMarks: 47, passMarks: 20, grade: 'A+' },
      { code: 'HAD-05', name: 'হাদিস ও দৈনন্দিন মাসনুন দোয়া', nameEn: 'Daily Hadith & Masnoon Duas', fullMarks: 50, obtainedMarks: 49, passMarks: 20, grade: 'A+' }
    ],
    totalFullMarks: 350,
    totalObtainedMarks: 334,
    percentage: 95.4,
    gpa: '5.00',
    finalGrade: 'ممتاز (মুমতাজ / A+)',
    positionInClass: 2,
    totalStudentsInClass: 25,
    publishedDate: '2026-08-15',
    ustadRemarks: 'অসাধারণ মেধা ও একাগ্রতা। আল্লাহ কবুল করুন ও কুরআন অনুযায়ী চলার তাওফিক দিন।',
    status: 'passed'
  },
  {
    id: 'RES-2026-102',
    studentId: 'ST-102',
    studentRoll: '102',
    studentName: 'হুযাইফা আহমেদ সালমান',
    studentNameEn: 'Huzaifa Ahmed Salman',
    examTerm: '2nd_term',
    year: '2026',
    department: 'hifz',
    classOrGroup: 'হিফজ বিভাগ (গ্রুপ-খ)',
    subjects: [
      { code: 'HIFZ-01', name: 'হিফজুল কুরআন তিলাওয়াত ও হেফজ মান', nameEn: 'Hifz Tilawat & Accuracy', fullMarks: 100, obtainedMarks: 98, passMarks: 40, grade: 'A+' },
      { code: 'TAJ-02', name: 'তাজবীদ ও সিফাত লাহনে জলী/খফী', nameEn: 'Tajweed & Sifat Rules', fullMarks: 50, obtainedMarks: 50, passMarks: 20, grade: 'A+' },
      { code: 'AMOK-03', name: 'আমোখতা / পেছনের মঞ্জিল পরীক্ষা', nameEn: 'Amokhta / Cumulative Revision', fullMarks: 100, obtainedMarks: 97, passMarks: 40, grade: 'A+' },
      { code: 'MAS-04', name: 'মাসআলা ও জরুরি সুন্নাত-আদব', nameEn: 'Islamic Jurisprudence & Etiquette', fullMarks: 50, obtainedMarks: 48, passMarks: 20, grade: 'A+' },
      { code: 'HAD-05', name: 'হাদিস ও দৈনন্দিন মাসনুন দোয়া', nameEn: 'Daily Hadith & Masnoon Duas', fullMarks: 50, obtainedMarks: 50, passMarks: 20, grade: 'A+' }
    ],
    totalFullMarks: 350,
    totalObtainedMarks: 343,
    percentage: 98.0,
    gpa: '5.00',
    finalGrade: 'ممتاز (মুমতাজ / A+)',
    positionInClass: 1,
    totalStudentsInClass: 25,
    publishedDate: '2026-08-15',
    ustadRemarks: 'ক্লাসে ১ম স্থান অর্জনকারী। হিফজের ধারাবাহিকতা অনবদ্য।',
    status: 'passed'
  }
];

export const INITIAL_FEE_INVOICES: FeeInvoice[] = [
  {
    id: 'INV-2026-09-101',
    invoiceNo: 'DQ-2026-09101',
    studentId: 'ST-101',
    studentName: 'মুহাম্মদ আব্দুল্লাহ বিন রফিক',
    studentRoll: '101',
    title: 'সেপ্টেম্বর ২০২৬ মাসিক বেতন ও বোর্ডিং ফি',
    titleEn: 'Monthly Tuition & Boarding Fee - Sep 2026',
    month: 'সেপ্টেম্বর',
    year: '2026',
    feeType: 'tuition',
    amount: 4500,
    dueDate: '2026-09-10',
    status: 'unpaid'
  },
  {
    id: 'INV-2026-08-101',
    invoiceNo: 'DQ-2026-08101',
    studentId: 'ST-101',
    studentName: 'মুহাম্মদ আব্দুল্লাহ বিন রফিক',
    studentRoll: '101',
    title: 'আগস্ট ২০২৬ মাসিক বেতন ও বোর্ডিং ফি',
    titleEn: 'Monthly Tuition & Boarding Fee - Aug 2026',
    month: 'আগস্ট',
    year: '2026',
    feeType: 'tuition',
    amount: 4500,
    dueDate: '2026-08-10',
    paidDate: '2026-08-05',
    status: 'paid',
    paymentMethod: 'bkash',
    transactionId: 'TRX9B87X21QA',
    collectedBy: 'অনলাইন স্বয়ংক্রিয় গেটওয়ে'
  },
  {
    id: 'INV-2026-07-101',
    invoiceNo: 'DQ-2026-07101',
    studentId: 'ST-101',
    studentName: 'মুহাম্মদ আব্দুল্লাহ বিন রফিক',
    studentRoll: '101',
    title: 'জুলাই ২০২৬ মাসিক বেতন ও ২য় সাময়িক পরীক্ষার ফি',
    titleEn: 'Monthly Tuition & Exam Fee - Jul 2026',
    month: 'জুলাই',
    year: '2026',
    feeType: 'exam',
    amount: 5200,
    dueDate: '2026-07-10',
    paidDate: '2026-07-08',
    status: 'paid',
    paymentMethod: 'nagad',
    transactionId: 'NGD448109923',
    collectedBy: 'অনলাইন স্বয়ংক্রিয় গেটওয়ে'
  },
  {
    id: 'INV-2026-09-102',
    invoiceNo: 'DQ-2026-09102',
    studentId: 'ST-102',
    studentName: 'হুযাইফা আহমেদ সালমান',
    studentRoll: '102',
    title: 'সেপ্টেম্বর ২০২৬ মাসিক বেতন ও বিশেষ হিফজ ফি',
    titleEn: 'Monthly Tuition & Special Hifz Fee - Sep 2026',
    month: 'সেপ্টেম্বর',
    year: '2026',
    feeType: 'tuition',
    amount: 5000,
    dueDate: '2026-09-10',
    status: 'unpaid'
  }
];

export const INITIAL_NOTICES: Notice[] = [
  {
    id: 'NOT-01',
    title: 'আগামী শিক্ষাবর্ষে হিফজ ও নূরানী মক্তব বিভাগে ভর্তি বিজ্ঞপ্তি',
    titleEn: 'Admission Circular for Upcoming Academic Year (Hifz & Maktab)',
    content: 'আসসালামু আলাইকুম। অত্যন্ত আনন্দের সাথে জানানো যাচ্ছে যে, দারুল কুরআন হিফজ ও ইসলামিক একাডেমিতে নতুন সেশনে সীমিত আসনে ভর্তি কার্যক্রম শুরু হয়েছে। আগ্রহী অভিভাবকগণ অনলাইন পোর্টাল অথবা মাদ্রাসার অফিস কক্ষ থেকে আবেদন ফরম সংগ্রহ ও জমা দিতে পারেন। মৌখিক সাক্ষাৎকার ও তাজবীদ যাচাইয়ের পর চূড়ান্ত তালিকা প্রকাশ করা হবে।',
    contentEn: 'Assalamu Alaikum. Admissions are now open for the new academic session in Hifzul Quran and Noorani Maktab sections. Guardians can apply online or visit our office. Final selection will follow Tajweed and oral assessment.',
    category: 'admission',
    date: '2026-08-25',
    isPinned: true,
    author: 'মুহতামিম কার্যালয়',
    targetRole: 'all'
  },
  {
    id: 'NOT-02',
    title: '২য় সাময়িক পরীক্ষার ফলাফল প্রকাশ ও অভিভাবক সমাবেশ',
    titleEn: 'Publication of 2nd Term Results & Guardian Assembly',
    content: 'সকল সম্মানিত অভিভাবকদের সদয় অবগতির জন্য জানানো যাচ্ছে যে, ২য় সাময়িক পরীক্ষার ফলাফল প্রকাশিত হয়েছে। আগামী শুক্রবার সকাল ৯:০০ ঘটিকায় মাদ্রাসা মিলনায়তনে অভিভাবক সমাবেশ ও শিক্ষার্থীদের সার্বিক অগ্রগতি পর্যালোচনা অনুষ্ঠিত হবে। সকল অভিভাবকের উপস্থিতি একান্ত কাম্য।',
    contentEn: '2nd Term examination results are now live online. The Guardian Assembly will take place this Friday at 9:00 AM in the madrasa auditorium. Your presence is cordially invited.',
    category: 'exam',
    date: '2026-08-20',
    isPinned: true,
    author: 'পরীক্ষা নিয়ন্ত্রণ কমিটি',
    targetRole: 'parents'
  },
  {
    id: 'NOT-03',
    title: 'হিফজ সমাপনী শিক্ষার্থীদের পাগড়ী প্রদান ও দোয়া মাহফিল',
    titleEn: 'Hifz Completion Sanad Ceremony & Grand Dua Mahfil',
    content: 'আলহামদুলিল্লাহ, অত্র প্রতিষ্ঠান থেকে এ বছর ১২ জন ছাত্র সম্পূর্ণ ৩০ পারা কুরআনুল কারীম হিফজ সম্পন্ন করেছে। তাদের বিশেষ সম্মাননা পাগড়ী ও সনদ প্রদান উপলক্ষে আগামী মাসের ১ম সপ্তাহে বিশেষ দোয়া মাহফিল অনুষ্ঠিত হবে।',
    contentEn: 'Alhamdulillah, 12 students completed 30 Paras Hifz this year. A special Turban & Sanad award mahfil will be held next month.',
    category: 'hifz_ceremony',
    date: '2026-08-10',
    isPinned: false,
    author: 'মুহতামিম কার্যালয়',
    targetRole: 'all'
  },
  {
    id: 'NOT-04',
    title: 'ডিজিটাল ডায়েরি নিয়মিত স্বাক্ষর করার বিষয়ে অভিভাবকদের প্রতি অনুরোধ',
    titleEn: 'Request to Guardians for Regular Digital Diary Signatures',
    content: 'সম্মানিত অভিভাবকবৃন্দ, আপনার সন্তানের প্রতিদিনের সবক, সবকী ও আমোখতার আপডেট দেখতে এবং উস্তাদের মূল্যায়ন জানতে মোবাইল দিয়ে অভিভাবক প্যানেলে লগইন করুন ও ডিজিটাল ডায়েরি স্বাক্ষর করুন। এতে শিক্ষার্থীর পড়াশোনায় শৃঙ্খলা বজায় থাকে।',
    contentEn: 'Respected guardians, please review your child daily Sabaq progress in the Parent Corner and acknowledge the digital diary regularly.',
    category: 'general',
    date: '2026-08-05',
    isPinned: false,
    author: 'শিক্ষা সচিব',
    targetRole: 'parents'
  }
];

export const INITIAL_ADMISSIONS: AdmissionApplication[] = [
  {
    id: 'APP-2026-001',
    applicationNo: 'DQ-ADM-901',
    studentName: 'মুহাম্মদ তালহা জুবায়ের',
    studentNameEn: 'Muhammad Talha Zubair',
    fatherName: 'জুবায়ের মাহমুদ',
    motherName: 'তাহমিনা সুলতানা',
    guardianPhone: '01712998877',
    guardianNid: '1984269123456789',
    birthDate: '2015-04-12',
    targetDepartment: 'hifz',
    previousMadrasaOrSchool: 'বায়তুশ শরফ ইসলামিক স্কুল',
    memorizedParasBefore: 3,
    residentialStatus: 'residential',
    presentAddress: 'মিরপুর-১০, ঢাকা',
    appliedDate: '2026-08-22',
    status: 'interview_scheduled',
    interviewDate: '2026-09-02 সকাল ১০:০০ টা',
    interviewScore: 88,
    remarks: 'তাজবীদ সুন্দর, ৩ পারা হিফজ আছে। সুর ও মাখরাজ প্রশংসনীয়।'
  },
  {
    id: 'APP-2026-002',
    applicationNo: 'DQ-ADM-902',
    studentName: 'আনাস বিন জামান',
    studentNameEn: 'Anas Bin Zaman',
    fatherName: 'কামরুজ্জামান চৌধুরী',
    motherName: 'ফরিদা আক্তার',
    guardianPhone: '01844332211',
    guardianNid: '1989269987654321',
    birthDate: '2017-09-25',
    targetDepartment: 'maktab',
    previousMadrasaOrSchool: 'স্থানীয় কিন্ডারগার্টেন',
    memorizedParasBefore: 0,
    residentialStatus: 'non_residential',
    presentAddress: 'মিরপুর ডিওএইচএস, ঢাকা',
    appliedDate: '2026-08-26',
    status: 'pending',
    remarks: 'নূরানী কায়দা শেষাংশ মস্ক করছে, অত্যন্ত মনোযোগী।'
  },
  {
    id: 'APP-2026-003',
    applicationNo: 'DQ-ADM-903',
    studentName: 'মুহাম্মদ সাফওয়ান হাবীব',
    studentNameEn: 'Muhammad Safwan Habib',
    fatherName: 'হাবিবুর রহমান শিকদার',
    motherName: 'রাবেয়া বসরী',
    guardianPhone: '01755667788',
    guardianNid: '1982269554433221',
    birthDate: '2014-11-03',
    targetDepartment: 'hifz',
    previousMadrasaOrSchool: 'দারুল আরকাম তাহফিজ একাডেমি',
    memorizedParasBefore: 7,
    residentialStatus: 'residential',
    presentAddress: 'উত্তরা সেক্টর-৭, ঢাকা',
    appliedDate: '2026-08-28',
    status: 'approved',
    interviewDate: '2026-08-30 সকাল ১১:০০ টা',
    interviewScore: 94,
    remarks: '৭ পারা অত্যন্ত পাকা। পূর্ণ আবাসিক হিফজ বিভাগে ভর্তি যোগ্য হিসেবে বিবেচিত।'
  },
  {
    id: 'APP-2026-004',
    applicationNo: 'DQ-ADM-904',
    studentName: 'উসমান গণী তাহমিদ',
    studentNameEn: 'Usman Gani Tahmid',
    fatherName: 'আব্দুল কাদের চৌধুরী',
    motherName: 'ফাতেমা তুজ জোহরা',
    guardianPhone: '01922334411',
    guardianNid: '1990269112233445',
    birthDate: '2016-02-18',
    targetDepartment: 'tajweed',
    previousMadrasaOrSchool: 'মাদানিয়া মডেল মাদ্রাসা',
    memorizedParasBefore: 2,
    residentialStatus: 'day_care',
    presentAddress: 'পল্লবী, মিরপুর-১২, ঢাকা',
    appliedDate: '2026-08-29',
    status: 'interview_scheduled',
    interviewDate: '2026-09-06 দুপুর ১২:০০ টা',
    interviewScore: 82,
    remarks: 'তাজবীদ ও সিফাত মস্কের জন্য ডে-কেয়ার বিভাগে ভর্তি ইচ্ছুক।'
  }
];

export const INITIAL_CLASS_ROUTINES: ClassRoutineDay[] = [
  {
    day: 'শনিবার',
    dayEn: 'Saturday',
    periods: [
      { time: 'ফজর পর - ৭:০০ টা', subject: 'নতুন সবক প্রদান ও উস্তাদকে শুনানো', subjectEn: 'New Sabaq Listening & Correction', ustadName: 'হাফেজ ক্বারী আব্দুল্লাহ আল-মামুন', room: 'হিফজ হল-১' },
      { time: '৮:৩০ - ১০:৩০ টা', subject: 'সবকী (পেছনের ৫/১০ পৃষ্ঠা মস্ক)', subjectEn: 'Sabqi Revision (5-10 Pages)', ustadName: 'হাফেজ জুবায়ের আহমেদ', room: 'হিফজ হল-১' },
      { time: '১১:০০ - ১২:৩০ টা', subject: 'তাজবীদ, ক্বিরাআত ও হরফের সিফাত মস্ক', subjectEn: 'Tajweed Rules & Qirat Practice', ustadName: 'হাফেজ ক্বারী আব্দুল্লাহ আল-মামুন', room: 'অডিটোরিয়াম' },
      { time: 'আসর পর - মাগরিব', subject: 'আমোখতা / পুরাতন মঞ্জিল শুনানো', subjectEn: 'Amokhta / Old Manzil Listening', ustadName: 'হাফেজ জুবায়ের আহমেদ', room: 'হিফজ হল-২' },
      { time: 'এশা পর - ৯:৩০ টা', subject: 'মাসআলা, হাদিস পাঠ ও আগামী দিনের সবক প্রস্তুতি', subjectEn: 'Masayel, Hadith & Next Day Sabaq Prep', ustadName: 'মওলানা তরিকুল ইসলাম', room: 'ক্লাসরুম-৩' }
    ]
  },
  {
    day: 'রবিবার',
    dayEn: 'Sunday',
    periods: [
      { time: 'ফজর পর - ৭:০০ টা', subject: 'নতুন সবক প্রদান ও উস্তাদকে শুনানো', subjectEn: 'New Sabaq Listening & Correction', ustadName: 'হাফেজ ক্বারী আব্দুল্লাহ আল-মামুন', room: 'হিফজ হল-১' },
      { time: '৮:৩০ - ১০:৩০ টা', subject: 'সবকী (পেছনের ৫/১০ পৃষ্ঠা মস্ক)', subjectEn: 'Sabqi Revision (5-10 Pages)', ustadName: 'হাফেজ জুবায়ের আহমেদ', room: 'হিফজ হল-১' },
      { time: '১১:০০ - ১২:৩০ টা', subject: 'নূরানী কায়দা, আমপারা ও মাসনুন দোয়া', subjectEn: 'Noorani Qaida & Masnoon Duas', ustadName: 'মওলানা তরিকুল ইসলাম', room: 'মক্তব হল' },
      { time: 'আসর পর - মাগরিব', subject: 'আমোখতা / পুরাতন মঞ্জিল শুনানো', subjectEn: 'Amokhta / Old Manzil Listening', ustadName: 'হাফেজ জুবায়ের আহমেদ', room: 'হিফজ হল-২' },
      { time: 'এশা পর - ৯:৩০ টা', subject: 'আখলাক ও আদর্শ চরিত্র গঠন আলোচনা', subjectEn: 'Islamic Ethics & Character Building', ustadName: 'মুফতী মাহমুদ হাসান', room: 'প্রধান হল' }
    ]
  },
  {
    day: 'সোমবার',
    dayEn: 'Monday',
    periods: [
      { time: 'ফজর পর - ৭:০০ টা', subject: 'নতুন সবক প্রদান ও উস্তাদকে শুনানো', subjectEn: 'New Sabaq Listening & Correction', ustadName: 'হাফেজ ক্বারী আব্দুল্লাহ আল-মামুন', room: 'হিফজ হল-১' },
      { time: '৮:৩০ - ১০:৩০ টা', subject: 'সবকী মস্ক ও শুদ্ধ উচ্চারণ পরীক্ষা', subjectEn: 'Sabqi Practice & Pronunciation Test', ustadName: 'হাফেজ জুবায়ের আহমেদ', room: 'হিফজ হল-১' },
      { time: '১১:০০ - ১২:৩০ টা', subject: 'আরবি হরফের মাখরাজ ও প্র্যাকটিক্যাল সালাত', subjectEn: 'Makhraj & Practical Salah Workshop', ustadName: 'মওলানা তরিকুল ইসলাম', room: 'মসজিদ চত্বর' },
      { time: 'আসর পর - মাগরিব', subject: 'আমোখতা / পুরাতন মঞ্জিল শুনানো', subjectEn: 'Amokhta / Old Manzil Listening', ustadName: 'হাফেজ জুবায়ের আহমেদ', room: 'হিফজ হল-২' },
      { time: 'এশা পর - ৯:৩০ টা', subject: 'আগামী দিনের সবক ইয়াদ ও তিলাওয়াত', subjectEn: 'Next Day Sabaq Memorization', ustadName: 'হাফেজ ক্বারী আব্দুল্লাহ আল-মামুন', room: 'হিফজ হল-১' }
    ]
  },
  {
    day: 'মঙ্গলবার',
    dayEn: 'Tuesday',
    periods: [
      { time: 'ফজর পর - ৭:০০ টা', subject: 'নতুন সবক প্রদান ও উস্তাদকে শুনানো', subjectEn: 'New Sabaq Listening & Correction', ustadName: 'হাফেজ ক্বারী আব্দুল্লাহ আল-মামুন', room: 'হিফজ হল-১' },
      { time: '৮:৩০ - ১০:৩০ টা', subject: 'সবকী (পেছনের ৫/১০ পৃষ্ঠা মস্ক)', subjectEn: 'Sabqi Revision', ustadName: 'হাফেজ জুবায়ের আহমেদ', room: 'হিফজ হল-১' },
      { time: '১১:০০ - ১২:৩০ টা', subject: 'তাজবীদ কায়েদা ও লাহনে খফী বর্জন', subjectEn: 'Tajweed Rules & Nuances', ustadName: 'হাফেজ ক্বারী আব্দুল্লাহ আল-মামুন', room: 'অডিটোরিয়াম' },
      { time: 'আসর পর - মাগরিব', subject: 'আমোখতা / পুরাতন মঞ্জিল শুনানো', subjectEn: 'Amokhta / Old Manzil Listening', ustadName: 'হাফেজ জুবায়ের আহমেদ', room: 'হিফজ হল-২' },
      { time: 'এশা পর - ৯:৩০ টা', subject: 'হাদিসের গল্প ও সাহাবায়ে কেরামের জীবনী', subjectEn: 'Stories of Sahabah & Hadith', ustadName: 'মুফতী মাহমুদ হাসান', room: 'প্রধান হল' }
    ]
  },
  {
    day: 'বুধবার',
    dayEn: 'Wednesday',
    periods: [
      { time: 'ফজর পর - ৭:০০ টা', subject: 'নতুন সবক প্রদান ও উস্তাদকে শুনানো', subjectEn: 'New Sabaq Listening & Correction', ustadName: 'হাফেজ ক্বারী আব্দুল্লাহ আল-মামুন', room: 'হিফজ হল-১' },
      { time: '৮:৩০ - ১০:৩০ টা', subject: 'সবকী ও আমোখতা গভীর মস্ক', subjectEn: 'Intensive Sabqi & Amokhta Drill', ustadName: 'হাফেজ জুবায়ের আহমেদ', room: 'হিফজ হল-১' },
      { time: '১১:০০ - ১২:৩০ টা', subject: 'সুললিত কণ্ঠে ক্বিরাআত প্রতিযোগিতা মস্ক', subjectEn: 'Qirat Recitation Clinic', ustadName: 'হাফেজ ক্বারী আব্দুল্লাহ আল-মামুন', room: 'অডিটোরিয়াম' },
      { time: 'আসর পর - মাগরিব', subject: 'আমোখতা শুনানো ও সাপ্তাহিক মূল্যায়ন', subjectEn: 'Amokhta & Weekly Evaluation', ustadName: 'হাফেজ জুবায়ের আহমেদ', room: 'হিফজ হল-২' },
      { time: 'এশা পর - ৯:৩০ টা', subject: 'আগামী দিনের সবক ইয়াদ', subjectEn: 'Sabaq Prep', ustadName: 'মওলানা তরিকুল ইসলাম', room: 'হিফজ হল-১' }
    ]
  },
  {
    day: 'বৃহস্পতিবার',
    dayEn: 'Thursday',
    periods: [
      { time: 'ফজর পর - ৮:০০ টা', subject: 'সাপ্তাহিক সবক সমাপনী ও তিলাওয়াত', subjectEn: 'Weekly Sabaq Consolidation', ustadName: 'হাফেজ ক্বারী আব্দুল্লাহ আল-মামুন', room: 'হিফজ হল-১' },
      { time: '৯:০০ - ১১:৩০ টা', subject: 'সাপ্তাহিক কুইজ, বক্তৃতা প্রশিক্ষণ ও দোয়া', subjectEn: 'Weekly Quiz, Speech & Dua Session', ustadName: 'মুফতী মাহমুদ হাসান', room: 'প্রধান মিলনায়তন' },
      { time: 'জোহর পর', subject: 'জুমার প্রস্তুতি ও সাপ্তাহিক ছুটি বিরতি', subjectEn: 'Jumah Prep & Weekend Break', ustadName: 'মাদ্রাসার সকল উস্তাদ', room: 'মসজিদ' }
    ]
  }
];

export const INITIAL_HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    title: 'আন্তর্জাতিক মানের আদর্শ হিফজুল কুরআন একাডেমি',
    titleEn: 'International Standard Premier Quran Memorization Academy',
    subtitle: 'আন্তর্জাতিক সনদপ্রাপ্ত অভিজ্ঞ ক্বারী ও হাফেজ শিক্ষকদের নিবিড় তত্ত্বাবধানে সহীহ তাজবীদ ও ৩ স্তরের মজবুত হিফজ পাঠ্যক্রম।',
    subtitleEn: 'Authentic Tajweed, 3-tier solid revision system, and digital daily diary monitoring under certified Huffaz and Qaris.',
    quranVerse: 'وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ فَهَلْ مِن مُّدَّكِرٍ',
    quranVerseMeaning: '“আর আমি তো উপদেশ গ্রহণের জন্য কুরআনকে সহজ করে দিয়েছি; অতএব কোনো উপদেশ গ্রহণকারী আছে কি?” (সূরা আল-ক্বামার: ১৭)',
    badge: '★ আদর্শ হিফজ শিক্ষা ও দ্বীনি তারবিয়্যাত',
    badgeEn: '★ Quranic Excellence & Moral Tarbiyah',
    imageUrl: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1600&auto=format&fit=crop&q=80',
    primaryActionLabel: 'অনলাইন ভর্তি আবেদন',
    primaryActionLabelEn: 'Apply for Admission',
    primaryActionTarget: 'admission',
    secondaryActionLabel: 'ফলাফল অনুসন্ধান',
    secondaryActionLabelEn: 'Check Results',
    secondaryActionTarget: 'result'
  },
  {
    id: 'slide-2',
    title: '২০২৬-২০২৭ শিক্ষাবর্ষে সকল বিভাগে নতুন ভর্তি চলছে',
    titleEn: 'New Session 2026-2027 Admissions Open Now',
    subtitle: 'নূরানী মক্তব, নাজেরা ও ৩০ পারা হিফজুল কুরআন বিভাগে সীমিত আসনে ভর্তি কার্যক্রম চলছে। ঘরে বসেই আবেদন করুন।',
    subtitleEn: 'Admissions open for Noorani Maktab, Nazera, and 30 Para Hifzul Quran departments. Apply online easily.',
    quranVerse: 'خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ',
    quranVerseMeaning: '“তোমাদের মধ্যে সর্বোত্তম ব্যক্তি সে, যে নিজে কুরআন শিখে এবং অন্যকে শিক্ষা দেয়।” (সহীহ বুখারী)',
    badge: '📢 ভর্তি বিজ্ঞপ্তি ২০২৬-২০২৭',
    badgeEn: '📢 Admission Open 2026-2027',
    imageUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1600&auto=format&fit=crop&q=80',
    primaryActionLabel: 'ভর্তি ফরম পূরণ করুন',
    primaryActionLabelEn: 'Online Admission Form',
    primaryActionTarget: 'admission',
    secondaryActionLabel: 'মাদ্রাসা পরিচিতি',
    secondaryActionLabelEn: 'About Madrasa',
    secondaryActionTarget: 'about'
  },
  {
    id: 'slide-3',
    title: 'বার্ষিক দস্তারবন্দী সমাবর্তন ও পাগড়ি প্রদান মাহফিল',
    titleEn: 'Annual Dastarbandi Convocation & Quran Graduation',
    subtitle: 'প্রতি বছর শতভাগ সফলতার সাথে ৩০ পারা হিফজ সম্পন্নকারী হাফেজ ছাত্রদের সম্মানজনক সনদ, পাগড়ি ও বিশেষ ক্রেস্ট প্রদান।',
    subtitleEn: 'Honoring complete 30 Para Huffaz graduates with official certificates, royal dastars (turbans), and honorary crests.',
    quranVerse: 'يَرْفَعِ اللَّهُ الَّذِينَ آمَنُوا مِنكُمْ وَالَّذِينَ أُوتُوا الْعِلْمَ دَرَجَاتٍ',
    quranVerseMeaning: '“তোমাদের মধ্যে যারা ঈমান এনেছে এবং যাদের জ্ঞান দেওয়া হয়েছে, আল্লাহ তাদের মর্যাদায় সমুন্নত করবেন।” (সূরা মুজাদালাহ: ১১)',
    badge: '👑 গৌরবময় হিফজ সমাপনী',
    badgeEn: '👑 Glorious Hifz Convocation',
    imageUrl: dastarbandiImg,
    primaryActionLabel: 'ফটো গ্যালারি দেখুন',
    primaryActionLabelEn: 'View Photo Gallery',
    primaryActionTarget: 'gallery',
    secondaryActionLabel: 'হাফেজদের তালিকা',
    secondaryActionLabelEn: 'Graduates List',
    secondaryActionTarget: 'result'
  },
  {
    id: 'slide-4',
    title: 'স্মার্ট ডিজিটাল ডায়েরি ও সার্বক্ষণিক অভিভাবক মনিটরিং',
    titleEn: 'Smart Digital Sabaq Diary & Live Guardian Portal',
    subtitle: 'দৈনিক নতুন সবক, সবকী ও আমোখতার লাইভ আপডেট, ডিজিটাল উপস্থিতি, ফি পরিশোধ এবং অটো রসিদ সংগ্রহ এক ক্লিকে।',
    subtitleEn: 'Real-time new lesson tracking, revision status, digital guardian signatures, and instant fee vouchers.',
    quranVerse: 'وَقُل رَّبِّ زِدْنِي عِلْمًا',
    quranVerseMeaning: '“এবং বলুন: হে আমার রব! আমার জ্ঞান বৃদ্ধি করে দিন।” (সূরা ত্ব-হা: ১১৪)',
    badge: '📱 আধুনিক ডিজিটাল ব্যবস্থাপনা',
    badgeEn: '📱 Modern Digital Management',
    imageUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=1600&auto=format&fit=crop&q=80',
    primaryActionLabel: 'লাইভ ডায়েরি দেখুন',
    primaryActionLabelEn: 'Live Sabaq Diary',
    primaryActionTarget: 'diary',
    secondaryActionLabel: 'ফি পরিশোধ পোর্টাল',
    secondaryActionLabelEn: 'Online Fee Portal',
    secondaryActionTarget: 'fees'
  }
];

export const INITIAL_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-v1',
    mediaType: 'video',
    title: 'বার্ষিক দস্তারবন্দী সমাবর্তন ও পাগড়ি প্রদান অনুষ্ঠানের বিশেষ তথ্যচিত্র',
    titleEn: 'Annual Dastarbandi Convocation Documentary & Quran Completion',
    category: 'dastarbandi',
    categoryLabel: 'দস্তারবন্দী ও সমাবর্তন',
    categoryLabelEn: 'Dastarbandi Ceremony',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=1200&auto=format&fit=crop&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=0hYqA453t28',
    duration: '১২:৪৫ মি.',
    date: '২০২৬-০৭-১৬',
    description: 'হিফজুল কুরআন সম্পন্নকারী নতুন হাফেজ ছাত্রদের মাথায় পাগড়ি পরিধান, সনদপত্র বিতরণ ও মুহতামিম সাহেবের আবেগঘন দোয়া।',
    descriptionEn: 'Video documentary highlighting the graduation ceremony, turban investiture, and heartfelt prayers for new Huffaz.'
  },
  {
    id: 'gal-1',
    mediaType: 'image',
    title: 'হিফজুল কুরআন ক্লাসে একাগ্রচিত্তে সবক ও তিলাওয়াত',
    titleEn: 'Focused Quran Memorization & Recitation Circle',
    category: 'hifz',
    categoryLabel: 'হিফজুল কুরআন বিভাগ',
    categoryLabelEn: 'Hifz Department',
    imageUrl: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1000&auto=format&fit=crop&q=80',
    date: '২০২৬-০৮-২০',
    description: 'অভিজ্ঞ উস্তাদদের সামনে সহীহ মাখরাজ ও তাজবীদের সাথে নতুন সবক ও আমোখতা শোনানোর দৃশ্য।',
    descriptionEn: 'Students reciting daily sabaq with proper tajweed rules in front of certified ustad.'
  },
  {
    id: 'gal-v2',
    mediaType: 'video',
    title: 'আন্তর্জাতিক ক্বিরাআত সম্মেলনে মাদ্রাসার কৃতি ছাত্রের হৃদয়স্পর্শী তিলাওয়াত',
    titleEn: 'Heart-Touching Quran Recitation by Madrasa Student',
    category: 'recitation',
    categoryLabel: 'ক্বিরাআত ও তিলাওয়াত',
    categoryLabelEn: 'Qiraat & Recitation',
    imageUrl: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1200&auto=format&fit=crop&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=m7Bc3pLyij0',
    duration: '০৮:১৫ মি.',
    date: '২০২৬-০৮-০৫',
    description: 'সহীহ মাখরাজ ও আন্তর্জাতিক ক্বিরাআত নিয়মানুযায়ী সূরা আর-রহমানের মন জুড়ানো সুর ও লাহানে তিলাওয়াত।',
    descriptionEn: 'Emotional Quranic recitation of Surah Ar-Rahman demonstrating mastery of Tajweed rules.'
  },
  {
    id: 'gal-2',
    mediaType: 'image',
    title: 'বার্ষিক দস্তারবন্দী মাহফিলে নতুন হাফেজদের পাগড়ি পরিধান',
    titleEn: 'Annual Dastarbandi Turban Ceremony for New Huffaz',
    category: 'dastarbandi',
    categoryLabel: 'দস্তারবন্দী ও সমাবর্তন',
    categoryLabelEn: 'Dastarbandi Ceremony',
    imageUrl: dastarbandiImg,
    date: '২০২৬-০৭-১৫',
    description: '৩০ পারা হিফজ সফলভাবে সম্পন্নকারী কৃতি শিক্ষার্থীদের বরকতময় পাগড়ি ও সম্মাননা সনদ প্রদান।',
    descriptionEn: 'Grand celebration awarding turbans and honor scrolls to graduates completing 30 Juz.'
  },
  {
    id: 'gal-v3',
    mediaType: 'video',
    title: 'হিফজ মাদ্রাসার প্রাত্যহিক রুটিন, সবক মস্ক ও মনোরম আবাসিক পরিবেশ',
    titleEn: 'A Day in Hifz Madrasa: Routine, Sabaq & Campus Tour',
    category: 'campus',
    categoryLabel: 'ক্যাম্পাস ও পরিবেশ',
    categoryLabelEn: 'Campus & Facilities',
    imageUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1200&auto=format&fit=crop&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=21X5lGlDOfg',
    duration: '০৬:৩০ মি.',
    date: '২০২৬-০৮-১২',
    description: 'ফজরের পর থেকে রাত পর্যন্ত হিফজখানা ও আবাসিক ছাত্রদের নিয়মতান্ত্রিক রুটিন, তাহাজ্জুদ, খেলাধুলা ও পড়াশোনার খণ্ডচিত্র।',
    descriptionEn: 'Comprehensive documentary covering daily schedule from Fajr sabaq circles to sports, dining and revision.'
  },
  {
    id: 'gal-3',
    mediaType: 'image',
    title: 'জাতীয় হিফজুল কুরআন ও ক্বিরাআত প্রতিযোগিতায় পুরস্কার প্রাপ্তি',
    titleEn: 'National Quran Competition Victory & Award Ceremony',
    category: 'award',
    categoryLabel: 'পুরস্কার ও সম্মাননা',
    categoryLabelEn: 'Awards & Honors',
    imageUrl: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=1000&auto=format&fit=crop&q=80',
    date: '২০২৬-০৬-২৮',
    description: 'জাতীয় পর্যায়ে ক্বিরাআত ও হিফজুল কুরআন প্রতিযোগিতায় হিফজ মাদ্রাসার প্রথম স্থান অর্জন।',
    descriptionEn: 'Hifz Madrasa students achieving 1st place in national Quranic recitation contest.'
  },
  {
    id: 'gal-4',
    mediaType: 'image',
    title: 'আধুনিক সুযোগ-সুবিধা সম্বলিত মনোরম ও সুপরিসর হিফজ হল',
    titleEn: 'Modern, Quiet & Air-Conditioned Hifz Study Hall',
    category: 'campus',
    categoryLabel: 'ক্যাম্পাস ও পরিবেশ',
    categoryLabelEn: 'Campus & Facilities',
    imageUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1000&auto=format&fit=crop&q=80',
    date: '২০২৬-০৮-১০',
    description: 'শিক্ষার্থীদের নিবিড় মনোযোগে কুরআন হিফজের জন্য শীতাতপ নিয়ন্ত্রিত, শব্দমুক্ত ও স্বাস্থ্যকর পরিবেশ।',
    descriptionEn: 'Serene, clean and focused atmosphere designed specifically for profound Quran retention.'
  },
  {
    id: 'gal-v4',
    mediaType: 'video',
    title: 'নূরানী ও মক্তব বিভাগের শিশুদের স্বতঃস্ফূর্ত হরফ মস্ক ও সহীহ উচ্চারণ',
    titleEn: 'Noorani Maktab Children Learning Arabic Phonetics',
    category: 'hifz',
    categoryLabel: 'হিফজুল কুরআন বিভাগ',
    categoryLabelEn: 'Hifz Department',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&auto=format&fit=crop&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    duration: '০৫:১০ মি.',
    date: '২০২৬-০৮-১৮',
    description: 'কোমলমতি শিশুদের মুখে বিশুদ্ধ উচ্চারণে আরবি ২৯টি হরফের মস্ক ও প্রাত্যহিক মাসনূন দোয়ার সম্মিলিত অনুশীলন।',
    descriptionEn: 'Interactive demonstration of young learners practicing foundational Noorani Qaida and daily supplications.'
  },
  {
    id: 'gal-5',
    mediaType: 'image',
    title: 'নূরানী ও মক্তব শিশুদের মাখরাজ ও হরফ মস্কের প্রশিক্ষণ',
    titleEn: 'Noorani Maktab Interactive Tajweed & Arabic Lessons',
    category: 'hifz',
    categoryLabel: 'হিফজুল কুরআন বিভাগ',
    categoryLabelEn: 'Hifz Department',
    imageUrl: nooraniMaktabImg,
    date: '২০২৬-০৮-১৫',
    description: 'ছোট ছোট কোমলমতি শিশুদের বিশুদ্ধ উচ্চারণে আরবি ২৯টি হরফ ও কায়দা নাজেরা শিক্ষা।',
    descriptionEn: 'Young learners grasping perfect Arabic phonetics and foundational Noorani Qaida.'
  },
  {
    id: 'gal-6',
    mediaType: 'image',
    title: 'ইসলামিক রেফারেন্স লাইব্রেরি ও কিতাব অধ্যয়ন কক্ষ',
    titleEn: 'Islamic Reference Library & Classical Manuscript Study',
    category: 'campus',
    categoryLabel: 'ক্যাম্পাস ও পরিবেশ',
    categoryLabelEn: 'Campus & Facilities',
    imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1000&auto=format&fit=crop&q=80',
    date: '২০২৬-০৭-২২',
    description: 'তাফসীর, হাদিস, ফিকহ ও আরবি অভিধানের সমৃদ্ধ সংগ্রহশালা যেখানে উস্তাদ ও ছাত্ররা গবেষণা করেন।',
    descriptionEn: 'Rich repository of Quranic Tafsir, Hadith collections and classic Arabic lexicons.'
  },
  {
    id: 'gal-7',
    mediaType: 'image',
    title: 'বার্ষিক খতমে কুরআন, দোয়া ও অভিভাবক সমাবেশ',
    titleEn: 'Annual Quran Khatam, Du\'a & Parents Grand Assembly',
    category: 'programs',
    categoryLabel: 'দোয়া ও অনুষ্ঠান',
    categoryLabelEn: 'Du\'a & Programs',
    imageUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=1000&auto=format&fit=crop&q=80',
    date: '২০২৬-০৫-৩০',
    description: 'দেশবরেণ্য উলামায়ে কেরাম, অভিভাবক ও শুভাকাঙ্ক্ষীদের উপস্থিতিতে রূহানি দোয়া ও মুনাজাত।',
    descriptionEn: 'Heartfelt spiritual supplication gathering esteemed scholars, guardians, and well-wishers.'
  },
  {
    id: 'gal-8',
    mediaType: 'image',
    title: 'হিফজ সমাপনী ছাত্রদের আন্তর্জাতিক মানের সনদ প্রদান',
    titleEn: 'Official Hifz Sanad (Certificate) Distribution',
    category: 'dastarbandi',
    categoryLabel: 'দস্তারবন্দী ও সমাবর্তন',
    categoryLabelEn: 'Dastarbandi Ceremony',
    imageUrl: sanadCeremonyImg,
    date: '২০২৬-০৭-১৮',
    description: 'মুহতামিম ও বেফাকুল মাদারিসিল আরাবিয়ার প্রতিনিধিবৃন্দের স্বাক্ষরিত সনদপত্র হস্তান্তর।',
    descriptionEn: 'Awarding authentic Sanad with unbroken chain of Quranic transmission.'
  }
];

export const INITIAL_DASTARBANDI_SANADS: DastarbandiSanad[] = [
  {
    id: 'SANAD-2026-001',
    sanadNo: 'DQA-SANAD-2026-001',
    studentId: 'ST-101',
    studentRoll: '101',
    studentName: 'মুহাম্মদ আব্দুল্লাহ বিন রফিক',
    studentNameEn: 'Muhammad Abdullah Bin Rafiq',
    fatherName: 'মোহাম্মদ রফিকুল ইসলাম',
    motherName: 'মোসাম্মৎ ফাতেমা বেগম',
    district: 'ঢাকা',
    completedParas: 30,
    completionDate: '২০২৬-০৭-২০',
    issueDate: '২০২৬-০৮-১৫',
    sanadType: 'full_hifz',
    issuer: 'মুফতী মাহমুদ হাসান (মুহতামিম)',
    hifzHead: 'হাফেজ ক্বারী আব্দুল্লাহ আল-মামুন (হিফজ প্রধান)',
    registrationNo: 'BEFAQ-2026-9812',
    grade: 'মুমতাজ (সর্বোচ্চ কৃতিত্ব - A+)',
    remarks: 'সম্পূর্ণ ৩০ পারা কুরআনুল কারীম সহীহ তাজবীদ ও তারতীলের সাথে নিখুঁতভাবে হেফজ সম্পন্ন করেছে।'
  },
  {
    id: 'SANAD-2026-002',
    sanadNo: 'DQA-SANAD-2026-002',
    studentId: 'ST-102',
    studentRoll: '102',
    studentName: 'হুযাইফা আহমেদ সালমান',
    studentNameEn: 'Huzaifa Ahmed Salman',
    fatherName: 'নুরুল ইসলাম সালমান',
    motherName: 'আমিনা বেগম',
    district: 'চট্টগ্রাম',
    completedParas: 30,
    completionDate: '২০২৬-০৭-২৮',
    issueDate: '২০২৬-০৮-১৫',
    sanadType: 'full_hifz',
    issuer: 'মুফতী মাহমুদ হাসান (মুহতামিম)',
    hifzHead: 'হাফেজ ক্বারী আব্দুল্লাহ আল-মামুন (হিফজ প্রধান)',
    registrationNo: 'BEFAQ-2026-9815',
    grade: 'মুমতাজ (সর্বোচ্চ কৃতিত্ব - A+)',
    remarks: 'মাখরাজ ও সিফাত সহকারে সুন্দর সুললিত কণ্ঠে হেফজ তাকমীল করেছে।'
  },
  {
    id: 'SANAD-2026-003',
    sanadNo: 'DQA-SANAD-2026-003',
    studentId: 'ST-103',
    studentRoll: '103',
    studentName: 'মুহাম্মদ আবু বকর সিদ্দীক',
    studentNameEn: 'Muhammad Abu Bakr Siddiq',
    fatherName: 'মুফতী আবুল বাশার',
    motherName: 'মোসাম্মৎ রাবেয়া খাতুন',
    district: 'সিলেট',
    completedParas: 30,
    completionDate: '২০২৬-০৮-০৫',
    issueDate: '২০২৬-০৮-২০',
    sanadType: 'full_hifz',
    issuer: 'মুফতী মাহমুদ হাসান (মুহতামিম)',
    hifzHead: 'হাফেজ ক্বারী আব্দুল্লাহ আল-মামুন (হিফজ প্রধান)',
    registrationNo: 'BEFAQ-2026-9820',
    grade: 'জায়্যিদ জিদ্দান (বিশেষ কৃতিত্ব - A)',
    remarks: 'হাদর ও তারতীলে পারদর্শী হাফেজ।'
  }
];

export const INITIAL_OFFICIAL_LETTERS: OfficialLetter[] = [
  {
    id: 'LETTER-2026-01',
    smarakNo: 'DQA/ADM/2026/042',
    subject: 'বার্ষিক হিফজ সমাপনী ও দস্তারবন্দী সম্মেলন ২০২৬ এর দাওয়াতনামা',
    recipient: 'সম্মানিত অভিভাবক ও সুধীবৃন্দ',
    recipientAddress: 'দারুল কুরআন একাডেমি কমপ্লেক্স',
    date: '২০২৬-০৮-২০',
    hijriDate: '১৫ সফর ১৪৪৮ হিজরী',
    sender: 'মুফতী মাহমুদ হাসান',
    senderTitle: 'প্রধান মুহতামিম ও পরিচালক',
    content: `নাহমাদুহু ওয়া নুসল্লি আলা রাসুলিহিল কারীম। আম্মা বা'দ—
সম্মানিত অভিভাবক ও দীনি ভাই,
আসসালামু আলাইকুম ওয়া রাহমাতুল্লাহি ওয়া বারাকাতুহ।
পরম করুণাময় আল্লাহ তায়ালার অশেষ মেহেরবানীতে দারুল কুরআন একাডেমি তাহফিজুল কুরআন মাদ্রাসা থেকে এ বছর একদল সৌভাগ্যবান শিক্ষার্থী পবিত্র কুরআনুল কারীমের পূর্ণাঙ্গ হিফজ সম্পন্ন করেছে। আলহামদুলিল্লাহ!

হিফজ সমাপনকারী এই কৃতি হাফেজদের মাথায় মর্যাদাপূর্ণ সম্মাননা পাগড়ি (দস্তারবন্দী) পরিধান ও সনদপত্র বিতরণ উপলক্ষে আগামী ২৫ আগস্ট ২০২৬ রোজ শুক্রবার সকাল ৯:০০ ঘটিকায় মাদ্রাসার প্রধান মিলনায়তনে এক আড়ম্বরপূর্ণ "বার্ষিক দস্তারবন্দী ও দোয়া সম্মেলন" আয়োজন করা হয়েছে।

উক্ত বরকতময় মাহফিলে প্রধান অতিথি হিসেবে উপস্থিত থাকবেন আন্তর্জাতিক খ্যাতিসম্পন্ন মুফাসসিরে কুরআন এবং দেশের শীর্ষস্থানীয় ওলামায়ে কেরাম ও শিক্ষাবিদগণ। 

অতএব, কুরআনের এই মহান আসরে আপনার সানন্দ উপস্থিতি ও আন্তরিক দোয়া আমাদের কাম্য। আল্লাহ তায়ালা আমাদের সন্তানদের কুরআনের খাদেম হিসেবে কবুল করুন। আমীন।`,
    status: 'published',
    copiesTo: ['সভাপতি, গভর্নিং বডি', 'সকল বিভাগীয় প্রধান', 'অফিস নোটিশ বোর্ড']
  },
  {
    id: 'LETTER-2026-02',
    smarakNo: 'DQA/OFF/2026/039',
    subject: 'পবিত্র মাহে রমজানুল মোবারকের বিশেষ তারাবীহ ও হিফজ মুরাজাআ ক্যাম্প সংক্রান্ত নির্দেশনা',
    recipient: 'হিফজ বিভাগের সকল উস্তাদ ও শিক্ষার্থী',
    recipientAddress: 'তাহফিজুল কুরআন বিভাগ',
    date: '২০২৬-০৩-১০',
    hijriDate: '২০ শা\'বান ১৪৪৭ হিজরী',
    sender: 'মুফতী মাহমুদ হাসান',
    senderTitle: 'প্রধান মুহতামিম ও পরিচালক',
    content: `আসসালামু আলাইকুম ওয়া রাহমাতুল্লাহ।
সকল শিক্ষক ও ছাত্রদের অবগতির জন্য জানানো যাচ্ছে যে, আসন্ন পবিত্র মাহে রমজানুল মোবারক উপলক্ষে হিফজ বিভাগের শিক্ষার্থীদের কুরআন পাক মজবুতকরণে বিশেষ 'হিফজ দাওর ও তারাবীহ খতম প্রশিক্ষণ' আগামী ১লা রমজান থেকে শুরু হবে।

নির্দেশনাবলী:
১. যে সকল ছাত্র বিভিন্ন মসজিদে খতমে তারাবীহ পড়াবে তাদের প্রতিদিন বাদ আসর বিশেষ মস্ক ক্লাসে অংশগ্রহণ বাধ্যতামূলক।
২. বোর্ডিংয়ের রুটিন ও সাহরী-ইফতারের সময়সূচি অনুযায়ী উস্তাদগণ ছাত্রদের আমোখতা তদারকি করবেন।
৩. কোনো ছাত্র উস্তাদের লিখিত অনুমতি ছাড়া মাদ্রাসার বাইরে তারাবীহ পড়াতে যেতে পারবে না।

সকলের আন্তরিক সহযোগিতা প্রত্যাশা করছি।`,
    status: 'published',
    copiesTo: ['নাজেমে তা\'লীমাত (শিক্ষা সচিব)', 'হোস্টেল সুপারিনটেনডেন্ট']
  },
  {
    id: 'LETTER-2026-03',
    smarakNo: 'DQA/EXM/2026/028',
    subject: '২য় সাময়িক পরীক্ষার ফলাফল প্রকাশ ও অভিভাবক সমাবেশ আহ্বান',
    recipient: 'সকল সম্মানিত অভিভাবকবৃন্দ',
    recipientAddress: 'দারুল কুরআন একাডেমি',
    date: '২০২৬-০৮-১৫',
    hijriDate: '১০ সফর ১৪৪৮ হিজরী',
    sender: 'মুফতী মাহমুদ হাসান',
    senderTitle: 'প্রধান মুহতামিম ও পরিচালক',
    content: `আসসালামু আলাইকুম ওয়া রাহমাতুল্লাহ।
অত্র মাদ্রাসার সম্মানিত অভিভাবকদের জানানো যাচ্ছে যে, হিফজ ও মক্তব বিভাগের "২য় সাময়িক পরীক্ষা ২০২৬"-এর ফলাফল আজ অনলাইন পোর্টাল এবং মাদ্রাসার নোটিশ বোর্ডে প্রকাশ করা হয়েছে।

শিক্ষার্থীদের ফলাফলের সামগ্রিক অগ্রগতি ও করণীয় বিষয়ে আলোচনা করার জন্য আগামী শুক্রবার সকাল ১০:০০ টায় মাদ্রাসার মিলনায়তনে এক সাধারণ "অভিভাবক সমাবেশ" অনুষ্ঠিত হবে। 

উক্ত সমাবেশে যথাসময়ে উপস্থিত থেকে আপনার সন্তানের ভবিষ্যৎ শিক্ষা ও চারিত্রিক গঠন বিষয়ে গঠনমূলক পরামর্শ প্রদানের জন্য অনুরোধ করা হলো।`,
    status: 'published',
    copiesTo: ['পরীক্ষা নিয়ন্ত্রক', 'শ্রেণি শিক্ষকবৃন্দ']
  }
];

// LocalStorage Persistence helpers
const STORAGE_KEYS = {
  USERS: 'darulquran_users_v2',
  STUDENTS: 'darulquran_students_v2',
  TEACHERS: 'darulquran_teachers_v2',
  DIARIES: 'darulquran_diaries_v1',
  RESULTS: 'darulquran_results_v1',
  INVOICES: 'darulquran_invoices_v1',
  NOTICES: 'darulquran_notices_v1',
  ADMISSIONS: 'darulquran_admissions_v1',
  ROUTINES: 'darulquran_routines_v1',
  GALLERY: 'darulquran_gallery_v3',
  SLIDES: 'darulquran_slides_v2',
  BLOGS: 'darulquran_blogs_v1',
  SANADS: 'darulquran_sanads_v1',
  LETTERS: 'darulquran_letters_v1',
  CURRENT_USER: 'darulquran_current_user_v2',
  PASSWORD_PINS: 'darulquran_pins_v1'
};

export const getInitialData = () => {
  const loadOrSet = <T,>(key: string, fallback: T): T => {
    try {
      const saved = localStorage.getItem(key);
      if (saved) return JSON.parse(saved);
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    } catch {
      return fallback;
    }
  };

  const rawSlides = loadOrSet<HeroSlide[]>(STORAGE_KEYS.SLIDES, INITIAL_HERO_SLIDES);
  const rawGallery = loadOrSet<GalleryItem[]>(STORAGE_KEYS.GALLERY, INITIAL_GALLERY_ITEMS);

  const sanitizedSlides = rawSlides.map((slide) => {
    if (slide.id === 'slide-3' || slide.imageUrl.includes('544717305')) {
      return { ...slide, imageUrl: dastarbandiImg };
    }
    return slide;
  });

  const sanitizedGallery = rawGallery.map((item) => {
    if (item.id === 'gal-2' || item.imageUrl.includes('544717305')) {
      return { ...item, imageUrl: dastarbandiImg };
    }
    if (item.id === 'gal-5' || item.imageUrl.includes('503676260')) {
      return { ...item, imageUrl: nooraniMaktabImg };
    }
    if (item.id === 'gal-8' || item.imageUrl.includes('523240795')) {
      return { ...item, imageUrl: sanadCeremonyImg };
    }
    return item;
  });

  return {
    users: loadOrSet<User[]>(STORAGE_KEYS.USERS, INITIAL_USERS),
    students: loadOrSet<Student[]>(STORAGE_KEYS.STUDENTS, INITIAL_STUDENTS),
    teachers: loadOrSet<Teacher[]>(STORAGE_KEYS.TEACHERS, INITIAL_TEACHERS),
    diaries: loadOrSet<SabaqDiaryEntry[]>(STORAGE_KEYS.DIARIES, INITIAL_SABAQ_DIARIES),
    results: loadOrSet<ExamResult[]>(STORAGE_KEYS.RESULTS, INITIAL_EXAM_RESULTS),
    invoices: loadOrSet<FeeInvoice[]>(STORAGE_KEYS.INVOICES, INITIAL_FEE_INVOICES),
    notices: loadOrSet<Notice[]>(STORAGE_KEYS.NOTICES, INITIAL_NOTICES),
    admissions: loadOrSet<AdmissionApplication[]>(STORAGE_KEYS.ADMISSIONS, INITIAL_ADMISSIONS),
    routines: loadOrSet<ClassRoutineDay[]>(STORAGE_KEYS.ROUTINES, INITIAL_CLASS_ROUTINES),
    gallery: sanitizedGallery,
    slides: sanitizedSlides,
    blogs: loadOrSet<BlogPost[]>(STORAGE_KEYS.BLOGS, INITIAL_BLOG_POSTS),
    sanads: loadOrSet<DastarbandiSanad[]>(STORAGE_KEYS.SANADS, INITIAL_DASTARBANDI_SANADS),
    letters: loadOrSet<OfficialLetter[]>(STORAGE_KEYS.LETTERS, INITIAL_OFFICIAL_LETTERS)
  };
};

export const saveToStorage = (key: keyof typeof STORAGE_KEYS, data: unknown) => {
  try {
    localStorage.setItem(STORAGE_KEYS[key], JSON.stringify(data));
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
  }
};


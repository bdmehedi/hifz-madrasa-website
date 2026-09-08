import { Language } from '../types';

export const translations = {
  bn: {
    // Header & Brand
    madrasaName: 'হিফজ মাদ্রাসা',
    madrasaTagline: 'সহীহ কুরআন হিফজ, আদর্শ চরিত্র গঠন ও ডিজিটাল শিক্ষা ব্যবস্থাপনা',
    address: 'বাড়ি-১৪, রোড-০৫, ব্লক-ডি, মিরপুর-১১, ঢাকা-১২১৬',
    phone: '+৮৮০ ১৭ ১২৩৪ ৫৬৭৮',
    email: 'info@hifzmadrasa.edu.bd',
    
    // Navigation
    navHome: 'মূল পাতা',
    navAbout: 'মাদ্রাসা পরিচিতি',
    navTeachers: 'শিক্ষকমণ্ডলী',
    navAdmission: 'অনলাইন ভর্তি',
    navResult: 'ফলাফল অনুসন্ধান',
    navGallery: 'ফটো ও ভিডিও গ্যালারি',
    navNotices: 'নোটিশ বোর্ড',
    navDiary: 'ডিজিটাল ডায়েরি (সবক)',
    navAttendance: 'উপস্থিতি',
    navFees: 'ফি প্রদান',
    navRoutine: 'ক্লাস রুটিন',
    navParentDashboard: 'অভিভাবক কর্নার',
    navTeacherDashboard: 'শিক্ষক প্যানেল',
    navAdminDashboard: 'মুহতামিম প্যানেল',
    login: 'লগইন করুন',
    logout: 'লগআউট',
    switchLanguage: 'English',
    guestView: 'সাধারণ ভিউ',
    changePassword: 'পাসওয়ার্ড পরিবর্তন',

    // Roles
    roleGuest: 'দর্শনার্থী',
    roleParent: 'সম্মানিত অভিভাবক',
    roleTeacher: 'শ্রদ্ধেয় শিক্ষক/উস্তাদ',
    roleAdmin: 'মুহতামিম / অ্যাডমিন',

    // Quick Stats
    totalStudents: 'মোট শিক্ষার্থী',
    totalHafiz: 'হিফজ সম্পন্ন হাফেজ',
    totalTeachers: 'যোগ্য উস্তাদবৃন্দ',
    passRate: 'পরীক্ষায় পাশের হার',
    activeParasToday: 'আজকের সবক সক্রিয়',

    // Departments
    deptHifz: 'হিফজুল কুরআন বিভাগ',
    deptMaktab: 'নূরানী ও মক্তব বিভাগ',
    deptTajweed: 'তাজবীদ ও ক্বিরাআত বিভাগ',
    deptKitab: 'কিতাব ও আরবি ভাষা',

    // Hifz Terms
    sabaq: 'সবক (নতুন পড়া)',
    sabqi: 'সবকী (পেছনের পড়া/দৌর)',
    amokhta: 'আমোখতা / মঞ্জিল (রিভিশন)',
    maktabLesson: 'মক্তব ও মাসআলা পাঠ',
    ustadRemarks: 'উস্তাদের মন্তব্য ও দিকনির্দেশনা',
    parentSigned: 'অভিভাবকের স্বাক্ষর/স্বীকৃতি',
    signDiary: 'ডায়েরিতে সম্মতি দিন',
    signedSuccess: 'স্বাক্ষর সম্পন্ন হয়েছে',

    // Quality Ratings
    qualityExcellent: 'ممتاز (মুমতাজ / অতি উত্তম)',
    qualityVeryGood: 'جيد جداً (জায়্যিদ জিদ্দান / উত্তম)',
    qualityGood: 'جيد (জায়্যিদ / ভালো)',
    qualityPass: 'مقبول (মাকবুল / চলতি মান)',
    qualityNeedsImprovement: 'ضعيف (দয়ীফ / যত্ন প্রয়োজন)',

    // Common Actions
    viewDetails: 'বিস্তারিত দেখুন',
    search: 'অনুসন্ধান করুন',
    filter: 'ফিল্টার',
    downloadPdf: 'পিডিএফ ডাউনলোড',
    print: 'প্রিন্ট করুন',
    submit: 'জমা দিন',
    save: 'সংরক্ষণ করুন',
    cancel: 'বাতিল',
    edit: 'সম্পাদনা',
    delete: 'মুছে ফেলুন',
    close: 'বন্ধ করুন',
    payNow: 'এখনই ফি পরিশোধ করুন',
    viewReceipt: 'রসিদ দেখুন',
    applyNow: 'ভর্তির আবেদন করুন',
    checkStatus: 'স্ট্যাটাস যাচাই',
    success: 'সফল হয়েছে',

    // Attendance
    present: 'উপস্থিত',
    absent: 'অনুপস্থিত',
    late: 'বিলম্বে উপস্থিত',
    leave: 'ছুটিতে',

    // Fee Terms
    paid: 'পরিশোধিত',
    unpaid: 'বকেয়া রয়েছে',
    pending: 'যাচাইাধীন',
    invoiceNumber: 'ইনভয়েস নম্বর',
    feeAmount: 'টাকার পরিমাণ',
    dueDate: 'পরিশোধের শেষ সময়',
    paymentMethod: 'পরিশোধের মাধ্যম',
    transactionId: 'ট্রানজেকশন আইডি',

    // Admission
    admissionTitle: 'নতুন শিক্ষাবর্ষে অনলাইনে ভর্তি আবেদন',
    admissionDesc: 'হিফজ ও নূরানী মক্তব বিভাগে সীমিত আসনে ভর্তি চলছে',
    applicantName: 'শিক্ষার্থীর পূর্ণ নাম',
    fatherName: 'পিতার নাম',
    motherName: 'মাতার নাম',
    guardianPhone: 'অভিভাবকের মোবাইল নম্বর',
    residentialType: 'আবাসিক / অনাবাসিক ধরন',
    residential: 'আবাসিক (বোর্ডিং সহ)',
    nonResidential: 'অনাবাসিক (ডে-কেয়ার)',
    memorizedParas: 'পূর্বে মুখস্থ পারার সংখ্যা',
    applicationTracking: 'আবেদন ট্র্যাকিং নম্বর',

    // Results
    searchResultTitle: 'অনলাইনে পরীক্ষার ফলাফল অনুসন্ধান',
    enterStudentId: 'শিক্ষার্থীর আইডি অথবা রোল লিখুন',
    selectExam: 'পরীক্ষার নাম নির্বাচন করুন',
    allExams: 'সকল পরীক্ষা',
    termFirst: '১ম সাময়িক পরীক্ষা',
    termSecond: '২য় সাময়িক পরীক্ষা',
    termAnnual: 'বার্ষিক পরীক্ষা',
    termHifzCompletion: 'হিফজ সমাপনী পরীক্ষা',
    marksheet: 'নম্বরপত্র / একাডেমিক ট্রান্সক্রিপ্ট',
    obtainedMarks: 'প্রাপ্ত নম্বর',
    fullMarks: 'মোট নম্বর',
    grade: 'গ্রেড',
    gpa: 'জিপিএ',
    position: 'শ্রেণীতে মেধা স্থান',

    // Routine & Notices
    routineTitle: 'সাপ্তাহিক ক্লাস ও হিফজ রুটিন',
    routineDesc: 'হিফজ, সবকী, আমোখতা ও সাধারণ বিষয়াবলির দৈনন্দিন পাঠ্যসূচি',
    noticeTitle: 'মাদ্রাসা নোটিশ বোর্ড ও জরুরি বিজ্ঞপ্তি',
    noticeDesc: 'পরীক্ষা, ছুটি, দস্তারবন্দী ও প্রাতিষ্ঠানিক সকল নোটিশের লাইভ আপডেট',

    // Security
    loginTitle: 'সিস্টেমে লগইন করুন',
    loginSubtitle: 'আপনার রোল অনুযায়ী সঠিক পিন বা পাসওয়ার্ড ব্যবহার করুন',
    enterPin: 'পাসওয়ার্ড বা সিক্রেট পিন দিন',
    quickDemoLogin: 'দ্রুত ডেমো লগইন নির্বাচন করুন:',
    demoParent: 'অভিভাবক ডেমো',
    demoTeacher: 'উস্তাদ ডেমো',
    demoAdmin: 'মুহতামিম ডেমো',
    invalidPass: 'ভুল পাসওয়ার্ড! অনুগ্রহ করে সঠিক পাসওয়ার্ড দিন।'
  },

  en: {
    // Header & Brand
    madrasaName: 'Hifz Madrasa',
    madrasaTagline: 'Authentic Quran Memorization, Moral Character & Digital Management',
    address: 'House-14, Road-05, Block-D, Mirpur-11, Dhaka-1216',
    phone: '+880 17 1234 5678',
    email: 'info@hifzmadrasa.edu.bd',

    // Navigation
    navHome: 'Home',
    navAbout: 'About Madrasa',
    navTeachers: 'Faculty & Ustads',
    navAdmission: 'Online Admission',
    navResult: 'Exam Results',
    navGallery: 'Photo & Video Gallery',
    navNotices: 'Notice Board',
    navDiary: 'Digital Diary (Sabaq)',
    navAttendance: 'Attendance',
    navFees: 'Pay Fees',
    navRoutine: 'Class Routine',
    navParentDashboard: 'Parent Corner',
    navTeacherDashboard: 'Teacher Panel',
    navAdminDashboard: 'Admin Panel',
    login: 'Sign In',
    logout: 'Sign Out',
    switchLanguage: 'বাংলা',
    guestView: 'Guest Mode',
    changePassword: 'Change Password',

    // Roles
    roleGuest: 'Guest Visitor',
    roleParent: 'Honorable Guardian',
    roleTeacher: 'Respected Teacher / Ustad',
    roleAdmin: 'Principal / Admin',

    // Quick Stats
    totalStudents: 'Total Students',
    totalHafiz: 'Certified Huffaz',
    totalTeachers: 'Qualified Ustads',
    passRate: 'Examination Pass Rate',
    activeParasToday: 'Active Sabaq Paras Today',

    // Departments
    deptHifz: 'Hifzul Quran Department',
    deptMaktab: 'Noorani & Maktab Department',
    deptTajweed: 'Tajweed & Qirat Department',
    deptKitab: 'Kitab & Arabic Language',

    // Hifz Terms
    sabaq: 'Sabaq (New Lesson)',
    sabqi: 'Sabqi (Recent Revisions / Dhor)',
    amokhta: 'Amokhta / Manzil (Cumulative Revision)',
    maktabLesson: 'Maktab & Masayel Study',
    ustadRemarks: "Teacher's Evaluation & Advice",
    parentSigned: 'Guardian Acknowledgment',
    signDiary: 'Sign Diary',
    signedSuccess: 'Acknowledgment Confirmed',

    // Quality Ratings
    qualityExcellent: 'Mumtaz (Excellent)',
    qualityVeryGood: 'Jayyid Jiddan (Very Good)',
    qualityGood: 'Jayyid (Good)',
    qualityPass: 'Maqbool (Passing)',
    qualityNeedsImprovement: 'Daeef (Needs Care)',

    // Common Actions
    viewDetails: 'View Details',
    search: 'Search',
    filter: 'Filter',
    downloadPdf: 'Download PDF',
    print: 'Print Document',
    submit: 'Submit',
    save: 'Save Changes',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    close: 'Close',
    payNow: 'Pay Fee Online',
    viewReceipt: 'View Receipt',
    applyNow: 'Apply for Admission',
    checkStatus: 'Check Status',
    success: 'Success',

    // Attendance
    present: 'Present',
    absent: 'Absent',
    late: 'Late',
    leave: 'On Leave',

    // Fee Terms
    paid: 'Paid',
    unpaid: 'Unpaid Dues',
    pending: 'Pending Verification',
    invoiceNumber: 'Invoice Number',
    feeAmount: 'Fee Amount',
    dueDate: 'Due Date',
    paymentMethod: 'Payment Channel',
    transactionId: 'Transaction ID',

    // Admission
    admissionTitle: 'Online Admission Application',
    admissionDesc: 'Admissions open for new academic session in Hifz and Maktab departments',
    applicantName: "Student's Full Name",
    fatherName: "Father's Name",
    motherName: "Mother's Name",
    guardianPhone: "Guardian's Mobile Number",
    residentialType: 'Residential Category',
    residential: 'Residential (With Boarding)',
    nonResidential: 'Non-Residential (Day Care)',
    memorizedParas: 'Previously Memorized Paras',
    applicationTracking: 'Tracking Reference Code',

    // Results
    searchResultTitle: 'Search Student Examination Result',
    enterStudentId: 'Enter Student ID or Roll Number',
    selectExam: 'Select Examination Term',
    allExams: 'All Terms',
    termFirst: '1st Term Examination',
    termSecond: '2nd Term Examination',
    termAnnual: 'Annual Examination',
    termHifzCompletion: 'Hifz Completion Sanad Exam',
    marksheet: 'Official Academic Transcript / Marksheet',
    obtainedMarks: 'Obtained Marks',
    fullMarks: 'Full Marks',
    grade: 'Grade',
    gpa: 'GPA',
    position: 'Class Merit Rank',

    // Routine & Notices
    routineTitle: 'Weekly Academic & Hifz Routine',
    routineDesc: 'Timetable for Sabaq, Sabqi, Amokhta and general studies',
    noticeTitle: 'Official Notice Board & Circulars',
    noticeDesc: 'Latest updates on examinations, holidays, Sanad ceremonies and announcements',

    // Security
    loginTitle: 'System Sign In',
    loginSubtitle: 'Enter your authorized security PIN/Password for access',
    enterPin: 'Enter PIN or Password',
    quickDemoLogin: 'Quick Demo Access:',
    demoParent: 'Guardian Demo',
    demoTeacher: 'Teacher Demo',
    demoAdmin: 'Principal Demo',
    invalidPass: 'Invalid Password! Please verify credentials.'
  }
};

export const getTranslation = (lang: Language, key: keyof typeof translations['bn']): string => {
  return translations[lang][key] || translations['bn'][key] || key;
};

export type Language = 'bn' | 'en';
export type UserRole = 'guest' | 'parent' | 'teacher' | 'admin';

export type HifzQuality = 'excellent' | 'very_good' | 'good' | 'pass' | 'needs_improvement';
// Arabic/Bangla equivalents: ممتاز, جيد جداً, جيد, مقبول, ضعيف

export type DepartmentType = 'hifz' | 'maktab' | 'tajweed' | 'kitab';

export interface User {
  id: string;
  name: string;
  nameEn: string;
  phone: string;
  email?: string;
  role: UserRole;
  avatar?: string;
  studentId?: string; // If role === 'parent'
  teacherId?: string; // If role === 'teacher'
}

export interface Student {
  id: string;
  roll: string;
  name: string;
  nameEn: string;
  fatherName: string;
  motherName: string;
  guardianPhone: string;
  department: DepartmentType;
  groupOrClass: string;
  assignedUstadId: string;
  assignedUstadName: string;
  admissionDate: string;
  birthDate: string;
  bloodGroup: string;
  address: string;
  photoUrl: string;
  status: 'active' | 'graduated' | 'leave';
  // Hifz Specific Data
  completedParas: number; // e.g. 12
  currentPara: number; // e.g. 13
  currentSurah: string;
  currentAyatRange: string;
  // Maktab specific
  maktabStage?: string; // 'Qaida' | 'Ampara' | 'Nazera' | 'Masayel'
  monthlyFee: number;
}

export interface SabaqDiaryEntry {
  id: string;
  studentId: string;
  date: string; // YYYY-MM-DD
  // 1. Sabaq (নতুন সবক)
  sabaqPara: number;
  sabaqSurah: string;
  sabaqPagesOrAyat: string;
  sabaqQuality: HifzQuality;
  
  // 2. Sabqi / Dhor (সবকী / পেছনের পৃষ্ঠা)
  sabqiPara: number;
  sabqiPages: string;
  sabqiQuality: HifzQuality;

  // 3. Amokhta / Manzil (আমোখতা / মঞ্জিল রিভিশন)
  amokhtaPara: number;
  amokhtaQuarterOrHalf: string;
  amokhtaQuality: HifzQuality;

  // Maktab / Additional study
  maktabLesson?: string; // যেমন: তাজবীদ মাখরাজ ২ নং, কালিমায়ে তামজীদ
  duaOrHadith?: string;
  salahPractice?: string; // নামাজ মস্ক

  // Teacher feedback
  attendance: 'present' | 'absent' | 'late' | 'leave';
  ustadRemarks: string;
  ustadName: string;
  parentSigned: boolean;
  parentComment?: string;
}

export interface Teacher {
  id: string;
  name: string;
  nameEn: string;
  designation: string;
  designationEn: string;
  qualification: string; // যেমন: হাফেজে কুরআন, ক্বারী, মুফতী
  department: DepartmentType;
  phone: string;
  email: string;
  joiningYear: string;
  photoUrl: string;
  classesAssigned: string[];
  totalStudents: number;
}

export interface ExamSubject {
  code: string;
  name: string;
  nameEn: string;
  fullMarks: number;
  obtainedMarks: number;
  passMarks: number;
  grade: string;
  remarks?: string;
}

export interface ExamResult {
  id: string;
  studentId: string;
  studentRoll: string;
  studentName: string;
  studentNameEn: string;
  examTerm: '1st_term' | '2nd_term' | 'annual' | 'hifz_completion_test';
  year: string;
  department: DepartmentType;
  classOrGroup: string;
  subjects: ExamSubject[];
  totalFullMarks: number;
  totalObtainedMarks: number;
  percentage: number;
  gpa: string;
  finalGrade: string; // 'মুমতাজ (A+)', 'জায়্যিদ জিদ্দান (A)', etc.
  positionInClass: number;
  totalStudentsInClass: number;
  publishedDate: string;
  ustadRemarks: string;
  status: 'passed' | 'failed' | 'needs_retest';
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  shift: 'fajr' | 'morning' | 'afternoon' | 'maghrib';
  status: 'present' | 'absent' | 'late' | 'leave';
  note?: string;
}

export interface FeeInvoice {
  id: string;
  invoiceNo: string;
  studentId: string;
  studentName: string;
  studentRoll: string;
  title: string;
  titleEn: string;
  month: string;
  year: string;
  feeType: 'tuition' | 'boarding' | 'admission' | 'exam' | 'book_set';
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'paid' | 'unpaid' | 'pending_verification';
  paymentMethod?: 'bkash' | 'nagad' | 'rocket' | 'bank_transfer' | 'cash';
  transactionId?: string;
  collectedBy?: string;
}

export interface Notice {
  id: string;
  title: string;
  titleEn: string;
  content: string;
  contentEn: string;
  category: 'general' | 'exam' | 'admission' | 'holiday' | 'hifz_ceremony';
  date: string;
  isPinned: boolean;
  author: string;
  targetRole: 'all' | 'parents' | 'teachers';
}

export interface AdmissionApplication {
  id: string;
  applicationNo: string;
  studentName: string;
  studentNameEn: string;
  fatherName: string;
  motherName: string;
  guardianPhone: string;
  guardianNid: string;
  birthDate: string;
  targetDepartment: DepartmentType;
  previousMadrasaOrSchool?: string;
  memorizedParasBefore: number;
  residentialStatus: 'residential' | 'non_residential' | 'day_care';
  presentAddress: string;
  appliedDate: string;
  status: 'pending' | 'interview_scheduled' | 'approved' | 'rejected';
  interviewDate?: string;
  interviewScore?: number;
  remarks?: string;
}

export interface RoutinePeriod {
  time: string;
  subject: string;
  subjectEn: string;
  ustadName: string;
  room: string;
}

export interface ClassRoutineDay {
  day: string;
  dayEn: string;
  periods: RoutinePeriod[];
}

export interface GalleryItem {
  id: string;
  title: string;
  titleEn: string;
  category: 'all' | 'hifz' | 'dastarbandi' | 'campus' | 'award' | 'programs';
  categoryLabel: string;
  categoryLabelEn: string;
  imageUrl: string;
  date: string;
  description: string;
  descriptionEn: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  titleEn: string;
  subtitle: string;
  subtitleEn: string;
  quranVerse?: string;
  quranVerseMeaning?: string;
  badge: string;
  badgeEn: string;
  imageUrl: string;
  primaryActionLabel: string;
  primaryActionLabelEn: string;
  primaryActionTarget: string;
  secondaryActionLabel?: string;
  secondaryActionLabelEn?: string;
  secondaryActionTarget?: string;
}

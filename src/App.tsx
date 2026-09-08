import React, { useState, useEffect } from 'react';
import { 
  Language, 
  User, 
  UserRole, 
  Student, 
  Teacher, 
  SabaqDiaryEntry, 
  FeeInvoice, 
  ExamResult, 
  Notice, 
  AdmissionApplication, 
  ClassRoutineDay,
  HeroSlide,
  GalleryItem,
  BlogPost
} from './types';
import { 
  getInitialData,
  saveToStorage
} from './data/initialData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { MadrasaGallery } from './components/MadrasaGallery';
import { MadrasaBlog } from './components/MadrasaBlog';
import { ParentDashboard } from './components/ParentDashboard';
import { TeacherDashboard } from './components/TeacherDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { AdmissionPortal } from './components/AdmissionPortal';
import { ResultPortal } from './components/ResultPortal';
import { PublicNoticeBoard } from './components/PublicNoticeBoard';
import { ClassRoutineView } from './components/ClassRoutineView';
import { TeachersDirectory } from './components/TeachersDirectory';
import { AboutMadrasa } from './components/AboutMadrasa';
import { AuthModal } from './components/AuthModal';
import { PaymentModal } from './components/PaymentModal';
import { PrintReceiptModal } from './components/PrintReceiptModal';
import { PrintMarksheetModal } from './components/PrintMarksheetModal';
import { PermissionDeniedView } from './components/PermissionDeniedView';

export default function App() {
  // App state
  const [lang, setLang] = useState<Language>('bn');
  
  // Initial user state (starts as guest, single login authenticates)
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<string>('home');

  // Persistent Domain Data
  const [students, setStudents] = useState<Student[]>(() => getInitialData().students);
  const [teachers, setTeachers] = useState<Teacher[]>(() => getInitialData().teachers);
  const [diaries, setDiaries] = useState<SabaqDiaryEntry[]>(() => getInitialData().diaries);
  const [invoices, setInvoices] = useState<FeeInvoice[]>(() => getInitialData().invoices);
  const [results, setResults] = useState<ExamResult[]>(() => getInitialData().results);
  const [notices, setNotices] = useState<Notice[]>(() => getInitialData().notices);
  const [admissions, setAdmissions] = useState<AdmissionApplication[]>(() => getInitialData().admissions);
  const [routines] = useState<ClassRoutineDay[]>(() => getInitialData().routines);
  const [slides] = useState<HeroSlide[]>(() => getInitialData().slides);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => getInitialData().gallery);
  const [blogs, setBlogs] = useState<BlogPost[]>(() => getInitialData().blogs);
  const [selectedBlogPostId, setSelectedBlogPostId] = useState<string | null>(null);

  // Modals state
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [activePaymentInvoice, setActivePaymentInvoice] = useState<FeeInvoice | null>(null);
  const [activePrintInvoice, setActivePrintInvoice] = useState<FeeInvoice | null>(null);
  const [activePrintResult, setActivePrintResult] = useState<ExamResult | null>(null);

  // Sync to localStorage
  useEffect(() => {
    saveToStorage('STUDENTS', students);
  }, [students]);

  useEffect(() => {
    saveToStorage('DIARIES', diaries);
  }, [diaries]);

  useEffect(() => {
    saveToStorage('INVOICES', invoices);
  }, [invoices]);

  useEffect(() => {
    saveToStorage('RESULTS', results);
  }, [results]);

  useEffect(() => {
    saveToStorage('NOTICES', notices);
  }, [notices]);

  useEffect(() => {
    saveToStorage('ADMISSIONS', admissions);
  }, [admissions]);

  useEffect(() => {
    saveToStorage('GALLERY', galleryItems);
  }, [galleryItems]);

  useEffect(() => {
    saveToStorage('BLOGS', blogs);
  }, [blogs]);

  const handleAddNewGalleryItem = (newItem: GalleryItem) => {
    setGalleryItems((prev) => [newItem, ...prev]);
  };

  const handleAddNewBlogPost = (newPost: BlogPost) => {
    setBlogs((prev) => [newPost, ...prev]);
  };

  const handleUpdateBlogPost = (updatedPost: BlogPost) => {
    setBlogs((prev) => prev.map((p) => (p.id === updatedPost.id ? updatedPost : p)));
  };

  // Handler for Role Switching (Quick test bar or Navbar)
  const handleQuickRoleSwitch = (role: UserRole | 'guest') => {
    if (role === 'guest') {
      setCurrentUser(null);
      setCurrentView('home');
      return;
    }

    if (role === 'parent') {
      setCurrentUser({
        id: 'user-parent-1',
        role: 'parent',
        name: 'মোহাম্মদ রফিকুল ইসলাম (অভিভাবক)',
        nameEn: 'Mohammad Rafiqul Islam (Guardian)',
        phone: '01933445566',
        studentId: 'ST-101',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
      });
      setCurrentView('parent_dashboard');
    } else if (role === 'teacher') {
      setCurrentUser({
        id: 'T-101',
        role: 'teacher',
        name: 'হাফেজ ক্বারী আব্দুল্লাহ আল-মামুন',
        nameEn: 'Hafez Qari Abdullah Al Mamun',
        phone: '01822334455',
        teacherId: 'T-101',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
      });
      setCurrentView('teacher_dashboard');
    } else if (role === 'admin') {
      setCurrentUser({
        id: 'user-admin',
        role: 'admin',
        name: 'মুফতী মাহমুদ হাসান (মুহতামিম)',
        nameEn: 'Mufti Mahmud Hasan (Principal)',
        phone: '01711112233',
        email: 'principal@darulquran.edu.bd',
        avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80'
      });
      setCurrentView('admin_dashboard');
    }
  };

  // Sign Parent Diary
  const handleSignDiary = (diaryId: string) => {
    setDiaries(prev => prev.map(d => d.id === diaryId ? { ...d, parentSigned: true } : d));
  };

  // Pay Invoice
  const handlePaymentSuccess = (invoiceId: string, trxId: string, method: string) => {
    setInvoices(prev => prev.map(inv => {
      if (inv.id === invoiceId) {
        return {
          ...inv,
          status: 'paid',
          paidDate: new Date().toISOString().split('T')[0],
          trxId,
          paymentMethod: method
        };
      }
      return inv;
    }));
  };

  // Add Sabaq Diary
  const handleAddDiaryEntry = (entry: SabaqDiaryEntry) => {
    setDiaries(prev => [entry, ...prev]);
    // Also update student current para
    setStudents(prev => prev.map(st => {
      if (st.id === entry.studentId) {
        return {
          ...st,
          currentPara: entry.sabaqPara,
          currentSurah: entry.sabaqSurah,
          currentAyatRange: entry.sabaqPagesOrAyat
        };
      }
      return st;
    }));
  };

  // Upload Exam Result
  const handleUploadExamResult = (result: ExamResult) => {
    setResults(prev => [result, ...prev]);
  };

  // Add Student
  const handleAddStudent = (student: Student) => {
    setStudents(prev => [...prev, student]);
  };

  // Add Notice
  const handleAddNotice = (notice: Notice) => {
    setNotices(prev => [notice, ...prev]);
  };

  // Update Admission Status
  const handleUpdateAdmissionStatus = (
    id: string, 
    status: 'approved' | 'rejected' | 'interview_scheduled', 
    interviewDate?: string
  ) => {
    setAdmissions(prev => prev.map(a => {
      if (a.id === id) {
        return { ...a, status, interviewDate: interviewDate || a.interviewDate };
      }
      return a;
    }));
  };

  // Update Invoice Status directly
  const handleUpdateInvoiceStatus = (id: string, status: 'paid' | 'unpaid') => {
    setInvoices(prev => prev.map(i => {
      if (i.id === id) {
        return {
          ...i,
          status,
          paidDate: status === 'paid' ? new Date().toISOString().split('T')[0] : undefined
        };
      }
      return i;
    }));
  };

  // Submit Admission application
  const handleSubmitAdmission = (app: AdmissionApplication) => {
    setAdmissions(prev => [app, ...prev]);
  };

  // Active student for Parent Dashboard
  const parentStudent = students.find(s => s.id === currentUser?.studentId) || students[0];
  const assignedTeacher = teachers.find(t => t.id === parentStudent?.assignedUstadId) || teachers[0];
  const currentTeacher = teachers.find(t => t.id === currentUser?.teacherId || t.id === currentUser?.id) || teachers[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-900">
      
      {/* Top Navigation */}
      <Navbar
        lang={lang}
        onLanguageChange={setLang}
        currentUser={currentUser}
        onLoginClick={() => setShowAuthModal(true)}
        onLogoutClick={() => { setCurrentUser(null); setCurrentView('home'); }}
        currentView={currentView}
        onNavigate={(view) => {
          if (view !== 'blog') {
            setSelectedBlogPostId(null);
          }
          setCurrentView(view);
        }}
        onQuickRoleSwitch={handleQuickRoleSwitch}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* 1. PUBLIC HOME VIEW */}
        {currentView === 'home' && (
          <HomePage
            lang={lang}
            onNavigate={(view) => {
              if (view !== 'blog') {
                setSelectedBlogPostId(null);
              }
              setCurrentView(view);
            }}
            students={students}
            notices={notices}
            diaries={diaries}
            teachers={teachers}
            slides={slides}
            galleryItems={galleryItems}
            blogs={blogs}
            onSelectBlogPost={(id) => {
              setSelectedBlogPostId(id);
              setCurrentView('blog');
            }}
          />
        )}

        {/* 2. PARENT / GUARDIAN DASHBOARD (ROLE PROTECTED) */}
        {currentView === 'parent_dashboard' && (
          currentUser && (currentUser.role === 'parent' || currentUser.role === 'admin') ? (
            <ParentDashboard
              lang={lang}
              student={parentStudent}
              teacher={assignedTeacher}
              diaries={diaries.filter(d => d.studentId === parentStudent.id)}
              onSignDiary={handleSignDiary}
              invoices={invoices.filter(i => i.studentId === parentStudent.id)}
              onPayInvoice={(inv) => setActivePaymentInvoice(inv)}
              onPrintInvoice={(inv) => setActivePrintInvoice(inv)}
              results={results.filter(r => r.studentId === parentStudent.id)}
              onOpenMarksheet={(res) => setActivePrintResult(res)}
            />
          ) : (
            <PermissionDeniedView
              lang={lang}
              requiredRole="parent"
              userRole={currentUser?.role || 'guest'}
              onNavigate={setCurrentView}
              onOpenLogin={() => setShowAuthModal(true)}
            />
          )
        )}

        {/* 3. TEACHER DASHBOARD (ROLE PROTECTED) */}
        {currentView === 'teacher_dashboard' && (
          currentUser && (currentUser.role === 'teacher' || currentUser.role === 'admin') ? (
            <TeacherDashboard
              lang={lang}
              teacher={currentTeacher}
              students={students}
              diaries={diaries}
              onAddDiaryEntry={handleAddDiaryEntry}
              results={results}
              onUploadExamResult={handleUploadExamResult}
              routines={routines}
            />
          ) : (
            <PermissionDeniedView
              lang={lang}
              requiredRole="teacher"
              userRole={currentUser?.role || 'guest'}
              onNavigate={setCurrentView}
              onOpenLogin={() => setShowAuthModal(true)}
            />
          )
        )}

        {/* 4. ADMIN / MUHTAMIM DASHBOARD (ROLE PROTECTED) */}
        {currentView === 'admin_dashboard' && (
          currentUser && currentUser.role === 'admin' ? (
            <AdminDashboard
              lang={lang}
              students={students}
              onAddStudent={handleAddStudent}
              teachers={teachers}
              invoices={invoices}
              onUpdateInvoiceStatus={handleUpdateInvoiceStatus}
              admissions={admissions}
              onUpdateAdmissionStatus={handleUpdateAdmissionStatus}
              notices={notices}
              onAddNotice={handleAddNotice}
            />
          ) : (
            <PermissionDeniedView
              lang={lang}
              requiredRole="admin"
              userRole={currentUser?.role || 'guest'}
              onNavigate={setCurrentView}
              onOpenLogin={() => setShowAuthModal(true)}
            />
          )
        )}

        {/* 5. PUBLIC ONLINE ADMISSION PORTAL */}
        {currentView === 'admission' && (
          <AdmissionPortal
            lang={lang}
            admissions={admissions}
            onSubmitApplication={handleSubmitAdmission}
          />
        )}

        {/* 6. PUBLIC EXAM RESULT SEARCH & MARKSHEET */}
        {currentView === 'result' && (
          <ResultPortal
            lang={lang}
            results={results}
            onOpenMarksheetModal={(res) => setActivePrintResult(res)}
          />
        )}

        {/* 6.5. MADRASA PHOTO GALLERY */}
        {currentView === 'gallery' && (
          <MadrasaGallery
            items={galleryItems}
            lang={lang}
            currentUser={currentUser}
            onAddNewItem={handleAddNewGalleryItem}
          />
        )}

        {/* 6.6. MADRASA BLOG & ARTICLES */}
        {currentView === 'blog' && (
          <MadrasaBlog
            posts={blogs}
            lang={lang}
            currentUser={currentUser}
            onAddNewPost={handleAddNewBlogPost}
            onUpdatePost={handleUpdateBlogPost}
            initialSelectedPostId={selectedBlogPostId}
          />
        )}

        {/* 7. LIVE SABAQ DIARY SHORTCUT */}
        {currentView === 'diary' && (
          currentUser?.role === 'teacher' ? (
            <TeacherDashboard
              lang={lang}
              teacher={currentTeacher}
              students={students}
              diaries={diaries}
              onAddDiaryEntry={handleAddDiaryEntry}
              results={results}
              onUploadExamResult={handleUploadExamResult}
              routines={routines}
            />
          ) : (
            <ParentDashboard
              lang={lang}
              student={parentStudent}
              teacher={assignedTeacher}
              diaries={diaries.filter(d => d.studentId === parentStudent.id)}
              onSignDiary={handleSignDiary}
              invoices={invoices.filter(i => i.studentId === parentStudent.id)}
              onPayInvoice={(inv) => setActivePaymentInvoice(inv)}
              onPrintInvoice={(inv) => setActivePrintInvoice(inv)}
              results={results.filter(r => r.studentId === parentStudent.id)}
              onOpenMarksheet={(res) => setActivePrintResult(res)}
            />
          )
        )}

        {/* 8. FEES SHORTCUT */}
        {currentView === 'fees' && (
          <ParentDashboard
            lang={lang}
            student={parentStudent}
            teacher={assignedTeacher}
            diaries={diaries.filter(d => d.studentId === parentStudent.id)}
            onSignDiary={handleSignDiary}
            invoices={invoices.filter(i => i.studentId === parentStudent.id)}
            onPayInvoice={(inv) => setActivePaymentInvoice(inv)}
            onPrintInvoice={(inv) => setActivePrintInvoice(inv)}
            results={results.filter(r => r.studentId === parentStudent.id)}
            onOpenMarksheet={(res) => setActivePrintResult(res)}
          />
        )}

        {/* 9. PUBLIC NOTICES */}
        {currentView === 'notices' && (
          <PublicNoticeBoard
            lang={lang}
            notices={notices}
          />
        )}

        {/* 10. ACADEMIC CLASS ROUTINE */}
        {currentView === 'routine' && (
          <ClassRoutineView
            lang={lang}
            routines={routines}
          />
        )}

        {/* 11. TEACHERS DIRECTORY */}
        {currentView === 'teachers' && (
          <TeachersDirectory
            lang={lang}
            teachers={teachers}
          />
        )}

        {/* 12. ABOUT MADRASA */}
        {currentView === 'about' && (
          <AboutMadrasa
            lang={lang}
          />
        )}

      </main>

      {/* Footer */}
      <Footer
        lang={lang}
        onNavigate={(view) => {
          if (view !== 'blog') {
            setSelectedBlogPostId(null);
          }
          setCurrentView(view);
        }}
      />

      {/* Single Unified Auth Modal */}
      {showAuthModal && (
        <AuthModal
          lang={lang}
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onLoginSuccess={(user) => {
            setCurrentUser(user);
            if (user.role === 'parent') setCurrentView('parent_dashboard');
            else if (user.role === 'teacher') setCurrentView('teacher_dashboard');
            else if (user.role === 'admin') setCurrentView('admin_dashboard');
          }}
        />
      )}

      {/* Payment Modal */}
      {activePaymentInvoice && (
        <PaymentModal
          lang={lang}
          invoice={activePaymentInvoice}
          onClose={() => setActivePaymentInvoice(null)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      {/* Printable Receipt Modal */}
      {activePrintInvoice && (
        <PrintReceiptModal
          lang={lang}
          invoice={activePrintInvoice}
          onClose={() => setActivePrintInvoice(null)}
        />
      )}

      {/* Printable Marksheet Modal */}
      {activePrintResult && (
        <PrintMarksheetModal
          lang={lang}
          result={activePrintResult}
          onClose={() => setActivePrintResult(null)}
        />
      )}

    </div>
  );
}

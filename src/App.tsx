import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Menu, X, Stamp, BookOpen, Briefcase, Award, Video, FileText, MapPin, Phone, Sun, Moon, ArrowUp, Mail, Globe, Clock, ChevronDown, MessageCircle, Building, Palette, GraduationCap, UserCheck, CreditCard, FileCheck, ChevronLeft, ChevronRight, FileEdit, Store, ShoppingBag, Building2, Target, Rocket, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import emailjs from '@emailjs/browser';
import CertificationPage from './components/CertificationPage';
import ExamPage from './components/ExamPage';
import CertificationInfoPage from './components/CertificationInfoPage';
import FaqPage from './components/FaqPage';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as 'light' | 'dark') || 'light';
  });

  const [language, setLanguage] = useState<'ko' | 'en'>(() => {
    const saved = localStorage.getItem('language');
    return (saved as 'ko' | 'en') || 'ko';
  });

  const t = (ko: string, en: string) => language === 'ko' ? ko : en;

  const [showConsultModal, setShowConsultModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showCertModal, setShowCertModal] = useState(false);
  const [selectedCert, setSelectedCert] = useState<string | null>(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(400);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'certification' | 'exam' | 'cert-info' | 'faq'>('home');
  const [activeSection, setActiveSection] = useState<string>('');
  const [pendingScrollTarget, setPendingScrollTarget] = useState<string | null>(null);
  const [openNews, setOpenNews] = useState<number | null>(null);

  useLayoutEffect(() => {
    if (currentPage === 'home' && pendingScrollTarget) {
      if (pendingScrollTarget === 'top') {
        window.scrollTo({ top: 0, behavior: 'auto' });
      } else {
        const element = document.getElementById(pendingScrollTarget);
        if (element) {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'auto'
          });
        }
      }
      setPendingScrollTarget(null);
    }
  }, [currentPage, pendingScrollTarget]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    let lastPosition = 'top';
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const isTop = scrollY < 50;
      const isBottom = window.innerHeight + scrollY >= document.documentElement.scrollHeight - 50;
      
      let currentPosition = 'middle';
      if (isTop) currentPosition = 'top';
      else if (isBottom) currentPosition = 'bottom';

      lastPosition = currentPosition;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const baseGalleryImages = [
    "https://i.postimg.cc/hPdQJVRJ/2.jpg",
    "https://i.postimg.cc/J4kHyjCX/20241024-140751.jpg",
    "https://i.postimg.cc/qvHh2gpM/20241120-151453.jpg",
    "https://i.postimg.cc/65v47CxQ/20251227-100613.jpg",
    "https://i.postimg.cc/L69DFNr3/20240505-103729.png",
    "https://i.postimg.cc/QNkmzRYY/20240615-121842.png",
    "https://i.postimg.cc/KvGfhJd7/20240814-151814.png",
    "https://i.postimg.cc/5N4gWnZj/20241026-102311.jpg"
  ];
  
  const galleryImages = Array(100).fill(baseGalleryImages).flat();

  const nextGallery = () => {
    setActiveGalleryIndex((prev) => prev + 1);
  };

  const prevGallery = () => {
    setActiveGalleryIndex((prev) => prev - 1);
  };

  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      setActiveGalleryIndex((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, [isMobile]);

  const [formData, setFormData] = useState({
    name: '',
    idNumber: '',
    phone: '',
    email: '',
    address: '',
    levels: [] as string[],
    payerName: '',
    depositTime: '',
    receiptInfo: '',
    examMethod: '',
    agreePrivacy: false
  });

  const handleApplySubmit = async () => {
    const { name, idNumber, phone, email, address, levels, payerName, depositTime, receiptInfo, examMethod, agreePrivacy } = formData;
    const errors: Record<string, string> = {};
    
    if (!name) errors.name = t('항목이 작성되지 않았습니다.', 'This field is required.');
    if (!idNumber) errors.idNumber = t('항목이 작성되지 않았습니다.', 'This field is required.');
    if (!phone) errors.phone = t('항목이 작성되지 않았습니다.', 'This field is required.');
    if (!email) errors.email = t('항목이 작성되지 않았습니다.', 'This field is required.');
    if (!address) errors.address = t('항목이 작성되지 않았습니다.', 'This field is required.');
    if (levels.length === 0) errors.levels = t('항목이 체크되지 않았습니다.', 'Please select at least one level.');
    if (!payerName) errors.payerName = t('항목이 작성되지 않았습니다.', 'This field is required.');
    if (!depositTime) errors.depositTime = t('항목이 작성되지 않았습니다.', 'This field is required.');
    if (!receiptInfo) errors.receiptInfo = t('항목이 작성되지 않았습니다.', 'This field is required.');
    if (!examMethod) errors.examMethod = t('항목이 선택되지 않았습니다.', 'Please select an exam method.');
    if (!agreePrivacy) errors.agreePrivacy = t('항목이 체크되지 않았습니다.', 'Please agree to the privacy policy.');

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      // 환경 변수 로딩 문제를 원천 차단하기 위해 키 값을 직접 하드코딩합니다.
      const serviceId = "service_x0n73he";
      const templateId = "template_83t38jy";
      const publicKey = "L4HCP63W6HPlwC0hH";

      const templateParams = {
        name,
        idNumber,
        phone,
        email,
        address,
        levels: levels.join(', '),
        payerName,
        depositTime,
        receiptInfo,
        examMethod
      };

      // EmailJS v4 초기화 및 전송
      emailjs.init({
        publicKey: publicKey,
      });
      
      // v4에서는 send 함수에 publicKey를 직접 넘기는 방식도 지원/권장합니다.
      const sendPromise = emailjs.send(serviceId, templateId, templateParams, {
        publicKey: publicKey,
      });
      const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 10000));
      
      await Promise.race([sendPromise, timeoutPromise]);

      alert(t('접수가 완료되었습니다.', 'Application submitted successfully.'));
      setShowApplyModal(false);
      setFormData({
        name: '', idNumber: '', phone: '', email: '', address: '', levels: [], payerName: '', depositTime: '', receiptInfo: '', examMethod: '', agreePrivacy: false
      });
      setFormErrors({});
    } catch (error: any) {
      console.error('EmailJS Error Details:', error);
      
      let errorMessage = t('접수 중 오류가 발생했습니다. 키 값이 올바른지 확인해주세요.', 'An error occurred during submission. Please check your keys.');
      
      if (error?.message === 'timeout') {
        errorMessage = t('서버 응답이 지연되고 있습니다. 잠시 후 다시 시도해주세요.', 'Server response is delayed. Please try again later.');
      } else if (error?.text) {
        // EmailJS에서 반환하는 구체적인 에러 메시지를 사용자에게 보여줍니다.
        errorMessage = `발송 실패: ${error.text}`;
      }
      
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 300);

      if (currentPage === 'home') {
        const sections = ['about', 'faq'];
        let current = '';
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 150 && rect.bottom >= 150) {
              current = section;
              break;
            }
          }
        }
        setActiveSection(current);
      } else {
        setActiveSection('');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const scrollTo = (id: string) => {
    if (currentPage !== 'home') {
      setPendingScrollTarget(id);
      setCurrentPage('home');
    } else {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    if (currentPage !== 'home') {
      setPendingScrollTarget('top');
      setCurrentPage('home');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212] text-gray-800 dark:text-gray-200 font-sans selection:bg-black/10 dark:selection:bg-white/20 transition-colors duration-300 break-keep">
      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 dark:bg-black/95 shadow-md py-4' : 'bg-transparent py-6 border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={scrollToTop}>
              <div className="relative">
                <img src="https://i.ibb.co/Dfv01BhW/Logo.png" alt="KSEI Logo" className="w-8 h-8 object-contain transition-transform duration-500 group-hover:rotate-12" />
                <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className={`hidden md:block text-[10px] font-bold tracking-[0.25em] uppercase transition-colors ${isScrolled || currentPage !== 'home' ? 'text-black dark:text-white' : 'text-white'}`}>
                {t('한국스탬프교육진흥원', 'Korea Stamp Education Institute')}
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-10">
              <button onClick={scrollToTop} className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-all hover:tracking-[0.25em] ${currentPage === 'home' ? 'text-emerald-600 dark:text-emerald-400' : isScrolled || currentPage !== 'home' ? 'text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white' : 'text-gray-300 hover:text-white'}`}>{t('기관소개', 'COMPANY')}</button>
              <button onClick={() => { setCurrentPage('cert-info'); window.scrollTo(0, 0); }} className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-all hover:tracking-[0.25em] ${currentPage === 'cert-info' ? 'text-emerald-600 dark:text-emerald-400' : isScrolled || currentPage !== 'home' ? 'text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white' : 'text-gray-300 hover:text-white'}`}>{t('자격증안내', 'CERTIFICATION')}</button>
              <button onClick={() => { setCurrentPage('certification'); window.scrollTo(0, 0); }} className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-all hover:tracking-[0.25em] ${currentPage === 'certification' ? 'text-emerald-600 dark:text-emerald-400' : isScrolled || currentPage !== 'home' ? 'text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white' : 'text-gray-300 hover:text-white'}`}>{t('자격증발급', 'ISSUANCE')}</button>
              <button onClick={() => { setCurrentPage('exam'); window.scrollTo(0, 0); }} className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-all hover:tracking-[0.25em] ${currentPage === 'exam' ? 'text-emerald-600 dark:text-emerald-400' : isScrolled || currentPage !== 'home' ? 'text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white' : 'text-gray-300 hover:text-white'}`}>{t('시험/접수안내', 'EXAM/APPLY')}</button>
              <button onClick={() => { setCurrentPage('faq'); window.scrollTo(0, 0); }} className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-all hover:tracking-[0.25em] ${currentPage === 'faq' ? 'text-emerald-600 dark:text-emerald-400' : isScrolled || currentPage !== 'home' ? 'text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white' : 'text-gray-300 hover:text-white'}`}>{t('자주묻는질문', 'FAQ')}</button>
              <div className="flex items-center gap-4 ml-4">
                <button 
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                  className={`p-2 rounded-full transition-colors ${isScrolled || currentPage !== 'home' ? 'hover:bg-black/5 dark:hover:bg-white/5 text-gray-500 dark:text-gray-400' : 'hover:bg-white/10 text-gray-300'}`}
                >
                  {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                </button>
                <button 
                  onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')}
                  className={`text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border transition-all ${isScrolled || currentPage !== 'home' ? 'border-black/10 text-gray-600 hover:bg-black hover:text-white dark:border-white/10 dark:text-gray-400 dark:hover:bg-white dark:hover:text-black' : 'border-white/20 text-white hover:bg-white hover:text-black'}`}
                >
                  {language === 'ko' ? 'EN' : 'KO'}
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <button onClick={() => setIsMobileMenuOpen(true)} className={`p-2 ${isScrolled || currentPage !== 'home' ? 'text-black dark:text-white' : 'text-white'}`}>
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div className={`md:hidden fixed inset-0 z-[100] transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
        <div className={`absolute top-0 right-0 w-64 h-full bg-white dark:bg-[#121212] shadow-2xl transform transition-transform duration-300 flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-4 border-b border-black/10 dark:border-white/10 flex justify-between items-center">
            <span className="font-serif font-bold text-black dark:text-white">{t('메뉴', 'Menu')}</span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-black dark:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex flex-col p-4 gap-4 flex-1">
            <button onClick={scrollToTop} className={`text-left py-2 font-medium ${currentPage === 'home' ? 'text-green-600 dark:text-green-500' : 'text-gray-800 dark:text-gray-200'}`}>{t('기관소개', 'About Us')}</button>
            <button onClick={() => { setIsMobileMenuOpen(false); setCurrentPage('cert-info'); window.scrollTo(0, 0); }} className={`text-left py-2 font-medium ${currentPage === 'cert-info' ? 'text-green-600 dark:text-green-500' : 'text-gray-800 dark:text-gray-200'}`}>{t('자격증안내', 'Certifications')}</button>
            <button onClick={() => { setIsMobileMenuOpen(false); setCurrentPage('certification'); window.scrollTo(0, 0); }} className={`text-left py-2 font-medium ${currentPage === 'certification' ? 'text-green-600 dark:text-green-500' : 'text-gray-800 dark:text-gray-200'}`}>{t('자격증발급', 'Issuance')}</button>
            <button onClick={() => { setIsMobileMenuOpen(false); setCurrentPage('exam'); window.scrollTo(0, 0); }} className={`text-left py-2 font-medium ${currentPage === 'exam' ? 'text-green-600 dark:text-green-500' : 'text-gray-800 dark:text-gray-200'}`}>{t('시험/접수안내', 'Exam/Apply')}</button>
            <button onClick={() => { setIsMobileMenuOpen(false); setCurrentPage('faq'); window.scrollTo(0, 0); }} className={`text-left py-2 font-medium ${currentPage === 'faq' ? 'text-green-600 dark:text-green-500' : 'text-gray-800 dark:text-gray-200'}`}>{t('자주묻는질문', 'FAQ')}</button>
          </div>
          <div className="mt-auto p-4 border-t border-black/10 dark:border-white/10 flex justify-around">
            <button onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')} className="flex flex-col items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
              <Globe className="w-6 h-6" />
              <span className="text-xs">{language === 'ko' ? '영어' : 'Korean'}</span>
            </button>
            <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="flex flex-col items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
              {theme === 'light' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
              <span className="text-xs">{theme === 'light' ? t('다크 모드', 'Dark Mode') : t('라이트 모드', 'Light Mode')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {currentPage === 'home' ? (
        <div className="overflow-x-hidden">
          {/* Hero Section - Editorial Style */}
          <section className={`relative h-screen flex items-center justify-center overflow-hidden ${theme === 'light' ? 'bg-white' : 'bg-[#050505]'}`}>
            <div className="absolute inset-0 z-0">
              <motion.img 
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: theme === 'light' ? 0.8 : 0.4 }}
                transition={{ duration: 2 }}
                src="https://i.ibb.co/Lh0gDPck/Kakao-Talk-20240626-100558300.jpg" 
                alt="Background" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className={`absolute inset-0 transition-colors duration-1000 ${theme === 'light' ? 'bg-gradient-to-b from-black/70 via-transparent to-white' : 'bg-gradient-to-b from-black/80 via-black/40 to-black/80'}`}></div>
              
              {/* Pulsing Light Effect */}
              <motion.div 
                animate={{ 
                  opacity: [0.2, 0.4, 0.2],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle,rgba(16,185,129,0.15)_0%,transparent_70%)] pointer-events-none"
              />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="flex flex-col items-center justify-center min-h-[60vh]"
              >
                <span className={`inline-block px-4 py-1.5 mb-8 text-[10px] font-bold tracking-[0.3em] uppercase rounded-full bg-black dark:bg-emerald-500 text-white`}>
                  {t('스탬프 교육의 새로운 기준', 'New Standard in Stamp Education')}
                </span>
                <h1 
                  className="text-6xl md:text-9xl font-black leading-[1.1] tracking-tighter mb-8 uppercase"
                  style={{ 
                    textShadow: '0 10px 30px rgba(0,0,0,0.6), 0 4px 6px rgba(0,0,0,0.4)'
                  }}
                >
                  <span className="text-white block">
                    {t('한국스탬프', 'KOREA')}
                  </span>
                  <span className="text-emerald-500 block">
                    {t('교육진흥원', 'STAMP')}
                  </span>
                </h1>
              </motion.div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
              <span className={`text-[10px] font-bold tracking-[0.2em] uppercase ${theme === 'light' ? 'text-black/50' : 'text-white/50'}`}>
                SCROLL DOWN
              </span>
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className={`w-[1px] h-8 ${theme === 'light' ? 'bg-black/30' : 'bg-white/30'}`}
              />
            </div>
          </section>

          {/* About KSEI - Standardized Typography */}
          <section className="pt-20 pb-10 bg-white dark:bg-[#0a0a0a] transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                id="about"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-[1px] w-12 bg-emerald-500" />
                  <span className="text-[11px] font-bold tracking-[0.4em] uppercase text-emerald-600">
                    ABOUT KSEI
                  </span>
                </div>
                
                <h3 className="text-[36px] font-normal text-black dark:text-white leading-[1.2] tracking-tighter mb-8">
                  {t('스탬프 교육의 새로운', 'Opening a new horizon')} <br />
                  {t('지평을 열어갑니다.', 'for stamp education.')}
                </h3>
                
                <p className="text-[18px] text-gray-500 dark:text-gray-400 leading-relaxed font-light max-w-3xl">
                  {t('한국스탬프교육진흥원은 전통적인 스탬프 제작 기술에 현대적인 감각과 체계적인 교육 시스템을 더하여, 누구나 창작의 즐거움을 누리고 전문가로 성장할 수 있는 생태계를 구축합니다.', 'Korea Stamp Education Institute builds an ecosystem where anyone can enjoy the joy of creation and grow into an expert by adding modern sense and systematic education systems to traditional stamp making technology.')}
                </p>
              </motion.div>
            </div>
          </section>

          {/* Director's Message */}
          <section className="pt-0 pb-24 bg-white dark:bg-[#0a0a0a] transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row items-stretch gap-16">
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="flex-1"
                >
                  <div className="relative h-full">
                    <img 
                      src="https://i.postimg.cc/hPdQJVRJ/2.jpg" 
                      alt="Director" 
                      className="rounded-[3rem] shadow-2xl w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-emerald-500 rounded-full hidden md:flex items-center justify-center text-white shadow-xl">
                      <Stamp className="w-12 h-12" />
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="flex-1 flex flex-col justify-center"
                >
                  <div className="text-emerald-500/20 mb-8">
                    <svg width="60" height="45" viewBox="0 0 60 45" fill="currentColor">
                      <path d="M13.5 0C6.04416 0 0 6.04416 0 13.5V27C0 34.4558 6.04416 40.5 13.5 40.5H18V45H22.5V40.5C29.9558 40.5 36 34.4558 36 27V13.5C36 6.04416 29.9558 0 22.5 0H13.5ZM13.5 9H22.5C24.9853 9 27 11.0147 27 13.5V27C27 29.4853 24.9853 31.5 22.5 31.5H13.5C11.0147 31.5 9 29.4853 9 27V13.5C9 11.0147 11.0147 9 13.5 9Z" />
                      <path d="M51 0C43.5442 0 37.5 6.04416 37.5 13.5V27C37.5 34.4558 43.5442 40.5 51 40.5H55.5V45H60V40.5C67.4558 40.5 73.5 34.4558 73.5 27V13.5C73.5 6.04416 67.4558 0 60 0H51ZM51 9H60C62.4853 9 64.5 11.0147 64.5 13.5V27C64.5 29.4853 62.4853 31.5 60 31.5H51C48.5147 31.5 46.5 29.4853 46.5 27V13.5C46.5 11.0147 48.5147 9 51 9Z" />
                    </svg>
                  </div>
                  <h3 className="text-[24px] md:text-[32px] font-bold text-black dark:text-white leading-[1.3] tracking-tighter mb-10">
                    "{t('작은 스탬프 하나가', 'May a small stamp')}<br className="hidden md:block" />
                    {t('누군가의 일상에 커다란 영감이 되고,', 'become a great inspiration in someone\'s daily life,')}<br className="hidden md:block" />
                    {t('새로운 시작의 발판이 되기를 바랍니다.', 'and a stepping stone for a new beginning.')}"
                  </h3>
                  
                  <div className="space-y-6 text-[16px] text-gray-500 dark:text-gray-400 leading-relaxed font-light">
                    <p>
                      {t('안녕하십니까, 한국스탬프교육진흥원입니다. 저희 기관은 스탬프라는 매개체를 통해 예술적 감수성을 깨우고, 실질적인 기술 습득을 통해 자아실현과 경제적 자립을 돕기 위해 설립되었습니다.', 'Hello, this is the Korea Stamp Education Institute. Our institution was established to awaken artistic sensitivity through the medium of stamps and to help self-realization and economic independence through practical skill acquisition.')}
                    </p>
                    <p>
                      {t('단순한 취미를 넘어 전문적인 커리어로 이어질 수 있도록, 저희는 끊임없이 연구하고 최고의 교육 환경을 제공할 것을 약속드립니다. 여러분의 창의적인 여정에 든든한 동반자가 되겠습니다.', 'We promise to constantly research and provide the best educational environment so that it can lead to a professional career beyond a simple hobby. We will be a reliable companion on your creative journey.')}
                    </p>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-100 dark:border-white/5">
                    <p className="text-[18px] font-normal text-black dark:text-white">
                      {t('한국스탬프교육진흥원 원장', 'Director of Korea Stamp Education Institute')}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Vision & Mission - Refactored for Perfect Alignment */}
          <section className="relative overflow-hidden">
            {/* Background Layers */}
            <div className="absolute inset-0 flex flex-col md:flex-row">
              <div className="flex-1 bg-emerald-600"></div>
              <div className="flex-1 bg-black"></div>
            </div>

            {/* Content Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="flex flex-col md:flex-row min-h-[500px]">
                {/* Vision */}
                <div className="flex-1 py-24 md:pr-12 flex flex-col justify-center relative overflow-hidden">
                  <div className="absolute top-1/2 right-0 -translate-y-1/2 opacity-10 pointer-events-none">
                    <Target className="w-48 h-48 md:w-64 md:h-64 text-white" />
                  </div>
                  <div className="relative z-10">
                    <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-white/70 mb-6 block">OUR VISION</span>
                    <h4 className="text-[36px] font-normal text-white leading-[1.2] tracking-tighter mb-8">
                      {t('스탬프 교육의 표준을', 'Global leader')} <br />
                      {t('제시하는 글로벌 리더', 'setting standards')}
                    </h4>
                    <p className="text-white/80 text-[14px] leading-relaxed font-light max-w-md">
                      {t('우리는 국내를 넘어 세계 시장에서도 인정받는 스탬프 교육의 기준이 되고자 합니다. 기술의 전수를 넘어 문화적 가치를 창출하는 기관으로 도약하겠습니다.', 'We aim to become the standard for stamp education recognized in the global market beyond Korea. We will leap forward as an institution that creates cultural value beyond the transfer of technology.')}
                    </p>
                  </div>
                </div>

                {/* Mission */}
                <div className="flex-1 py-24 md:pl-12 flex flex-col justify-center relative overflow-hidden">
                  <div className="absolute top-1/2 right-0 -translate-y-1/2 opacity-10 pointer-events-none">
                    <Rocket className="w-48 h-48 md:w-64 md:h-64 text-white" />
                  </div>
                  <div className="relative z-10">
                    <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-white/50 mb-6 block">OUR MISSION</span>
                    <h4 className="text-[36px] font-normal text-white leading-[1.2] tracking-tighter mb-8">
                      {t('창의적 인재 양성과', 'Nurturing creative talent')} <br />
                      {t('스탬프 문화의 확산', 'and spreading stamp culture')}
                    </h4>
                    <p className="text-white/60 text-[14px] leading-relaxed font-light max-w-md">
                      {t('체계적인 커리큘럼과 실전 중심의 교육을 통해 전문 강사와 창작자를 배출하고, 스탬프를 활용한 다양한 문화 콘텐츠를 보급하여 일상의 즐거움을 더합니다.', 'Through a systematic curriculum and practical-oriented education, we produce professional instructors and creators, and spread various cultural contents using stamps to add joy to daily life.')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Gallery Section - Atmospheric Style */}
          <section className="py-20 bg-white dark:bg-[#0a0a0a] overflow-hidden transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-[1px] w-12 bg-black dark:bg-white" />
                    <span className="text-[11px] font-bold tracking-[0.4em] uppercase text-black dark:text-white">PORTFOLIO</span>
                  </div>
                  <h3 className="text-[36px] font-normal text-black dark:text-white tracking-tighter">{t('활동 갤러리', 'Activity Gallery')}</h3>
                </div>
                <div className="flex gap-4">
                  <button onClick={prevGallery} className="w-14 h-14 rounded-full border border-black/10 dark:border-white/30 bg-white/50 dark:bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-black hover:text-white dark:text-white dark:hover:bg-white dark:hover:text-black transition-all group shadow-md">
                    <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                  </button>
                  <button onClick={nextGallery} className="w-14 h-14 rounded-full border border-black/10 dark:border-white/30 bg-white/50 dark:bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-black hover:text-white dark:text-white dark:hover:bg-white dark:hover:text-black transition-all group shadow-md">
                    <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>

            <div className="relative px-4 sm:px-6 lg:px-8">
              <div 
                className="flex transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]"
                style={{ transform: `translateX(-${activeGalleryIndex * (isMobile ? 100 : 25)}%)` }}
              >
                {galleryImages.map((src, idx) => (
                  <div key={idx} className="shrink-0 w-full md:w-1/4 px-4">
                    <motion.div 
                      className="group relative aspect-[3/4] rounded-[3rem] overflow-hidden cursor-pointer shadow-2xl md:hover:-translate-y-5 transition-transform duration-500"
                      onClick={() => setSelectedImage(src)}
                    >
                      <img src={src} alt={`Gallery ${idx}`} className="w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="hidden md:block py-20 bg-emerald-600 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left md:flex md:items-center md:justify-between relative z-10">
              <h3 className="text-[40px] md:text-[60px] font-bold text-white mb-8 md:mb-0 leading-[1.1] tracking-tighter uppercase md:whitespace-nowrap">
                {t('당신의 창의력을 스탬프로 완성하세요', 'Turn Your Art with Stamps')}
              </h3>
              <button 
                onClick={() => setShowApplyModal(true)}
                className="group relative px-16 py-6 bg-white text-emerald-600 font-black rounded-full text-xl overflow-hidden transition-all hover:scale-105 shadow-2xl active:scale-95"
              >
                <span className="relative z-10">{t('지금 바로 시작하기', 'Get Started Now')}</span>
                <div className="absolute inset-0 bg-emerald-50 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
            </div>
            
            {/* Animated Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-white blur-[150px] rounded-full"
              ></motion.div>
              <motion.div 
                animate={{ 
                  scale: [1.2, 1, 1.2],
                  opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 12, repeat: Infinity }}
                className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-white blur-[150px] rounded-full"
              ></motion.div>
            </div>
          </section>

          {/* News & Notice - Editorial List Style */}
          <section className="py-20 bg-gray-50 dark:bg-[#050505] transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-8">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-[1px] w-12 bg-black dark:bg-white" />
                    <span className="text-[11px] font-bold tracking-[0.4em] uppercase text-black dark:text-white">NEWS & NOTICE</span>
                  </div>
                  <h3 className="text-[36px] font-normal text-black dark:text-white leading-[1.1] tracking-tighter">
                    {t('최신 소식', 'Latest News')}
                  </h3>
                </div>
              </div>

              <div className="space-y-1">
                {[
                  { date: '2026.03.10', title: t('2026년 상반기 자격증 시험 일정 안내', '2026 First Half Certification Exam Schedule'), tag: 'Notice', content: t('2026년 상반기 자격증 시험이 5월과 6월에 진행될 예정입니다. 자세한 일정은 추후 공지사항을 확인해주세요.', 'The first half of 2026 certification exams are scheduled for May and June. Please check future notices for detailed schedules.') },
                  { date: '2026.02.25', title: t('스탬프 아트 전문가 마스터 과정 개설', 'Stamp Art Master Course Opening'), tag: 'Course', content: t('새로운 마스터 과정이 개설되었습니다. 심화된 기술과 교육 역량을 키울 수 있는 기회입니다.', 'A new master course has been opened. It is an opportunity to develop advanced skills and educational capabilities.') },
                  { date: '2026.02.15', title: t('한국스탬프교육진흥원 홈페이지 리뉴얼 오픈', 'KSEI Website Renewal Open'), tag: 'News', content: t('더욱 편리하고 아름다운 홈페이지로 여러분을 찾아뵙게 되었습니다. 많은 이용 부탁드립니다.', 'We are here with a more convenient and beautiful website. Please use it a lot.') }
                ].map((item, idx) => (
                  <div key={idx} className="border-b border-black/5 dark:border-white/5">
                    <motion.div 
                      onClick={() => setOpenNews(openNews === idx ? null : idx)}
                      className="group flex flex-row items-center justify-between p-6 md:p-10 bg-white dark:bg-[#111] hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-500 cursor-pointer"
                    >
                      <div className="flex items-center gap-4 md:gap-8">
                        <span className="hidden md:block text-xs font-bold tracking-widest opacity-50 font-mono">{item.date}</span>
                        <h4 className="text-[16px] md:text-[18px] font-normal tracking-tight">
                          <span className="md:hidden">
                            {openNews === idx ? item.title : (item.title.length > 15 ? item.title.slice(0, 15) + '...' : item.title)}
                          </span>
                          <span className="hidden md:inline">
                            {item.title}
                          </span>
                        </h4>
                      </div>
                      <ChevronDown className={`w-6 h-6 shrink-0 transition-transform duration-300 ${openNews === idx ? 'rotate-180' : ''}`} />
                    </motion.div>
                    <AnimatePresence>
                      {openNews === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden bg-gray-50 dark:bg-[#0a0a0a]"
                        >
                          <div className="p-10 text-gray-600 dark:text-gray-400 leading-relaxed">
                            {item.content}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </section>



        </div>
      ) : currentPage === 'certification' ? (
        <CertificationPage t={t} setCurrentPage={setCurrentPage} />
      ) : currentPage === 'cert-info' ? (
        <CertificationInfoPage 
          t={t} 
          setShowCertModal={setShowCertModal}
          setSelectedCert={setSelectedCert}
          setCurrentPage={setCurrentPage}
        />
      ) : currentPage === 'exam' ? (
        <ExamPage t={t} setShowApplyModal={setShowApplyModal} setCurrentPage={setCurrentPage} />
      ) : (
        <FaqPage t={t} />
      )}

      {/* Footer */}
      <footer className="bg-white dark:bg-[#050505] border-t border-black/5 dark:border-white/5 py-24 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-8 group cursor-pointer" onClick={scrollToTop}>
                <img src="https://i.ibb.co/Dfv01BhW/Logo.png" alt="KSEI Logo" className="w-10 h-10 object-contain transition-transform duration-500 group-hover:rotate-12" />
                <span className="text-2xl font-black tracking-tighter text-black dark:text-white serif italic">KSEI</span>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8 max-w-xs">
                {t('우리는 스탬프를 통해 예술과 교육의 새로운 가치를 창출하고, 전문적인 교육 문화를 선도합니다.', 'We create new value in art and education through stamps and lead a professional educational culture.')}
              </p>
              <div className="flex gap-6 text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 dark:text-gray-500">
                <button onClick={() => setShowPrivacyModal(true)} className="hover:text-black dark:hover:text-white transition-colors">{t('개인정보처리방침', 'Privacy Policy')}</button>
                <button onClick={() => setShowTermsModal(true)} className="hover:text-black dark:hover:text-white transition-colors">{t('이용약관', 'Terms')}</button>
              </div>
            </div>
            
            <div className="lg:col-span-8 flex flex-wrap md:flex-nowrap justify-end gap-10 md:gap-16">
              <div>
                <h4 className="text-black dark:text-white font-bold mb-6 tracking-[0.2em] uppercase text-[10px]">{t('기관소개', 'About Us')}</h4>
                <ul className="text-gray-500 dark:text-gray-400 space-y-4 text-sm">
                  <li><button onClick={() => { setCurrentPage('home'); setTimeout(() => scrollTo('about'), 100); }} className="hover:text-emerald-500 transition-colors whitespace-nowrap">{t('설립 목적', 'Purpose')}</button></li>
                  <li><button onClick={() => { setCurrentPage('home'); setTimeout(() => scrollTo('about'), 100); }} className="hover:text-emerald-500 transition-colors whitespace-nowrap">{t('주요 활동', 'Activities')}</button></li>
                </ul>
              </div>
              <div>
                <h4 className="text-black dark:text-white font-bold mb-6 tracking-[0.2em] uppercase text-[10px]">{t('자격증 안내', 'Certification')}</h4>
                <ul className="text-gray-500 dark:text-gray-400 space-y-4 text-sm">
                  <li><button onClick={() => { setCurrentPage('cert-info'); window.scrollTo(0, 0); }} className="hover:text-emerald-500 transition-colors whitespace-nowrap">{t('자격증 안내', 'Certification Info')}</button></li>
                  <li><button onClick={() => { setCurrentPage('certification'); window.scrollTo(0, 0); }} className="hover:text-emerald-500 transition-colors whitespace-nowrap">{t('자격증 발급', 'Issuance')}</button></li>
                </ul>
              </div>
              <div>
                <h4 className="text-black dark:text-white font-bold mb-6 tracking-[0.2em] uppercase text-[10px]">{t('시험/접수', 'Exam & Apply')}</h4>
                <ul className="text-gray-500 dark:text-gray-400 space-y-4 text-sm">
                  <li><button onClick={() => { setCurrentPage('exam'); window.scrollTo(0, 0); }} className="hover:text-emerald-500 transition-colors whitespace-nowrap">{t('시험/접수안내', 'Exam Guide')}</button></li>
                  <li><button onClick={() => setShowApplyModal(true)} className="hover:text-emerald-500 transition-colors whitespace-nowrap">{t('온라인 접수', 'Apply Online')}</button></li>
                </ul>
              </div>
              <div>
                <h4 className="text-black dark:text-white font-bold mb-6 tracking-[0.2em] uppercase text-[10px]">{t('고객지원', 'Support')}</h4>
                <ul className="text-gray-500 dark:text-gray-400 space-y-4 text-sm">
                  <li><button onClick={() => { setCurrentPage('faq'); window.scrollTo(0, 0); }} className="hover:text-emerald-500 transition-colors whitespace-nowrap">{t('자주 묻는 질문', 'FAQ')}</button></li>
                  <li><button onClick={() => setShowConsultModal(true)} className="hover:text-emerald-500 transition-colors whitespace-nowrap">{t('상담 신청', 'Consultation')}</button></li>
                  <li><button onClick={() => { setCurrentPage('faq'); setTimeout(() => { const el = document.getElementById('visit-us'); if (el) { const y = el.getBoundingClientRect().top + window.scrollY - 100; window.scrollTo({ top: y, behavior: 'smooth' }); } else { window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); } }, 100); }} className="hover:text-emerald-500 transition-colors whitespace-nowrap">{t('오시는 길', 'Location')}</button></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row justify-between gap-8">
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-2 text-[11px] font-medium text-gray-400 dark:text-gray-500 font-mono">
                <p>{t('주소: 대전광역시 서구 갈마역로 155', 'Addr: 155 Galma-yeok-ro, Seo-gu, Daejeon')}</p>
                <p>{t('대표전화: 010-8409-2802', 'Tel: 010-8409-2802')}</p>
                <p>{t('이메일: ksei2025@naver.com', 'Email: ksei2025@naver.com')}</p>
              </div>
              <p className="text-[10px] tracking-[0.1em] text-gray-400 uppercase">
                {t('Copyright © 2025 한국스탬프교육진흥원, All Rights Reserved', 'Copyright © 2025 Korea Stamp Education Institute, All Rights Reserved')}
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col items-end gap-4 z-50">
        <AnimatePresence>
          {showScrollTop && (
            <motion.button 
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 20 }}
              onClick={scrollToTop}
              className="p-4 bg-white dark:bg-black text-black dark:text-white rounded-full shadow-2xl hover:scale-110 transition-transform group border border-black/10 dark:border-white/10"
              aria-label="최상단으로 이동"
            >
              <ArrowUp className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
            </motion.button>
          )}
        </AnimatePresence>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowApplyModal(true)}
          className="w-14 h-14 rounded-full flex items-center justify-center bg-black dark:bg-white text-white dark:text-black shadow-2xl shadow-black/20 dark:shadow-white/20 hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300"
          aria-label="접수하기"
        >
          <FileEdit className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Consultation Modal */}
      {showConsultModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-black/10 dark:border-white/10 flex justify-between items-center">
              <h3 className="text-xl font-bold text-black dark:text-white">{t('상담 신청', 'Request Consultation')}</h3>
              <button onClick={() => setShowConsultModal(false)} className="text-gray-500 hover:text-black dark:hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 whitespace-pre-wrap">
                {t('궁금하신 점이 있으신가요?\n편하신 방법으로 연락주시면 친절하게 안내해 드리겠습니다.', 'Do you have any questions?\nPlease contact us in a convenient way and we will kindly guide you.')}
              </p>
              <a href="tel:010-8409-2802" className="flex items-center gap-4 p-4 rounded-xl border border-black/10 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-black dark:text-white">{t('전화 상담', 'Phone Consultation')}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">010-8409-2802</div>
                </div>
              </a>
              <a href="mailto:ksei2025@naver.com" className="flex items-center gap-4 p-4 rounded-xl border border-black/10 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-black dark:text-white">{t('이메일 문의', 'Email Inquiry')}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">ksei2025@naver.com</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-black/10 dark:border-white/10 flex justify-between items-center shrink-0">
              <h3 className="text-xl font-bold text-black dark:text-white">{t('개인정보처리방침', 'Privacy Policy')}</h3>
              <button onClick={() => setShowPrivacyModal(false)} className="text-gray-500 hover:text-black dark:hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto text-sm text-gray-600 dark:text-gray-300 space-y-4">
              <h4 className="font-bold text-black dark:text-white text-base">{t('1. 개인정보의 처리 목적', '1. Purpose of Processing Personal Information')}</h4>
              <p>{t('한국스탬프교육진흥원(이하 \'진흥원\')은 다음의 목적을 위하여 개인정보를 처리하고 있으며, 다음의 목적 이외의 용도로는 이용하지 않습니다.', 'Korea Stamp Education Institute (hereinafter referred to as the \'Institute\') processes personal information for the following purposes and does not use it for purposes other than the following.')}<br/>{t('- 고객 가입의사 확인, 고객에 대한 서비스 제공에 따른 본인 식별.인증, 회원자격 유지.관리, 물품 또는 서비스 공급에 따른 금액 결제, 물품 또는 서비스의 공급.배송 등', '- Confirmation of customer\'s intention to sign up, identity verification/authentication according to the provision of services to customers, maintenance/management of membership, payment of amount according to the supply of goods or services, supply/delivery of goods or services, etc.')}</p>
              
              <h4 className="font-bold text-black dark:text-white text-base mt-6">{t('2. 개인정보의 처리 및 보유 기간', '2. Processing and Retention Period of Personal Information')}</h4>
              <p>{t('① 진흥원은 정보주체로부터 개인정보를 수집할 때 동의 받은 개인정보 보유․이용기간 또는 법령에 따른 개인정보 보유․이용기간 내에서 개인정보를 처리․보유합니다.', '① The Institute processes and retains personal information within the period of retention and use of personal information agreed upon when collecting personal information from the data subject or the period of retention and use of personal information according to laws and regulations.')}<br/>{t('② 구체적인 개인정보 처리 및 보유 기간은 다음과 같습니다.', '② The specific personal information processing and retention period is as follows.')}<br/>{t('- 고객 가입 및 관리 : 서비스 이용계약 또는 회원가입 해지시까지', '- Customer registration and management: Until the termination of the service use contract or membership')}</p>
              
              <h4 className="font-bold text-black dark:text-white text-base mt-6">{t('3. 처리하는 개인정보의 항목', '3. Items of Personal Information Processed')}</h4>
              <p>{t('진흥원은 다음의 개인정보 항목을 처리하고 있습니다.', 'The Institute processes the following personal information items.')}<br/>{t('- 성명, 생년월일, 주소, 전화번호, 휴대전화번호, 성별, 이메일주소 등', '- Name, date of birth, address, phone number, mobile phone number, gender, email address, etc.')}</p>
            </div>
            <div className="p-6 border-t border-black/10 dark:border-white/10 shrink-0 flex justify-end">
              <button onClick={() => setShowPrivacyModal(false)} className="px-6 py-2 bg-black text-white dark:bg-white dark:text-black rounded-lg font-bold">{t('확인', 'Confirm')}</button>
            </div>
          </div>
        </div>
      )}

      {/* Terms of Service Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-black/10 dark:border-white/10 flex justify-between items-center shrink-0">
              <h3 className="text-xl font-bold text-black dark:text-white">{t('이용약관', 'Terms of Service')}</h3>
              <button onClick={() => setShowTermsModal(false)} className="text-gray-500 hover:text-black dark:hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto text-sm text-gray-600 dark:text-gray-300 space-y-4">
              <h4 className="font-bold text-black dark:text-white text-base">{t('제1조(목적)', 'Article 1 (Purpose)')}</h4>
              <p>{t('이 약관은 한국스탬프교육진흥원(이하 "진흥원"이라 한다)이 운영하는 웹사이트에서 제공하는 인터넷 관련 서비스(이하 "서비스"라 한다)를 이용함에 있어 진흥원과 이용자의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.', 'The purpose of these Terms and Conditions is to stipulate the rights, obligations, and responsibilities of the Institute and users in using internet-related services (hereinafter referred to as "Services") provided by the website operated by the Korea Stamp Education Institute (hereinafter referred to as the "Institute").')}</p>
              
              <h4 className="font-bold text-black dark:text-white text-base mt-6">{t('제2조(정의)', 'Article 2 (Definitions)')}</h4>
              <p>{t('① "진흥원"이란 한국스탬프교육진흥원이 재화 또는 용역(이하 "재화 등"이라 함)을 이용자에게 제공하기 위하여 컴퓨터 등 정보통신설비를 이용하여 재화 등을 거래할 수 있도록 설정한 가상의 영업장을 말하며, 아울러 웹사이트를 운영하는 사업자의 의미로도 사용합니다.', '① "Institute" refers to a virtual business place set up by the Korea Stamp Education Institute to trade goods, etc. using information and communication facilities such as computers to provide goods or services (hereinafter referred to as "Goods, etc.") to users, and is also used to mean the business operator operating the website.')}<br/>{t('② "이용자"란 "진흥원"에 접속하여 이 약관에 따라 "진흥원"이 제공하는 서비스를 받는 회원 및 비회원을 말합니다.', '② "User" refers to members and non-members who access the "Institute" and receive the services provided by the "Institute" in accordance with these Terms and Conditions.')}</p>
              
              <h4 className="font-bold text-black dark:text-white text-base mt-6">{t('제3조 (약관 등의 명시와 설명 및 개정)', 'Article 3 (Specification, Explanation, and Revision of Terms and Conditions)')}</h4>
              <p>{t('① "진흥원"은 이 약관의 내용과 상호 및 대표자 성명, 영업소 소재지 주소, 전화번호, 전자우편주소 등을 이용자가 쉽게 알 수 있도록 웹사이트의 초기 서비스화면에 게시합니다.', '① The "Institute" posts the contents of these Terms and Conditions, the name of the company and representative, the address of the business office, phone number, email address, etc. on the initial service screen of the website so that users can easily know them.')}</p>
            </div>
            <div className="p-6 border-t border-black/10 dark:border-white/10 shrink-0 flex justify-end">
              <button onClick={() => setShowTermsModal(false)} className="px-6 py-2 bg-black text-white dark:bg-white dark:text-black rounded-lg font-bold">{t('확인', 'Confirm')}</button>
            </div>
          </div>
        </div>
      )}

      {/* Cert Modal */}
      {showCertModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col animate-in fade-in zoom-in duration-200">
            <div className="px-8 md:px-12 py-8 border-b border-black/10 dark:border-white/10 flex justify-between items-center shrink-0">
              <h3 className="text-xl font-bold text-black dark:text-white">{selectedCert} {t('자격증 상세 안내', 'Certification Details')}</h3>
              <button onClick={() => setShowCertModal(false)} className="text-gray-500 hover:text-black dark:hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="px-8 md:px-12 py-10 overflow-y-auto text-sm text-gray-600 dark:text-gray-300 space-y-8">
              {selectedCert === '2급' && (
                <div className="space-y-8">
                  <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <UserCheck className="w-5 h-5 text-gray-400" />
                      <h4 className="font-bold text-base text-black dark:text-white">{t('응시 자격', 'Eligibility')}</h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 ml-7">{t('경력 제한 없음', 'No experience required')}</p>
                  </div>
                  
                  <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CreditCard className="w-5 h-5 text-gray-400" />
                      <h4 className="font-bold text-base text-black dark:text-white">{t('검정 및 자격증 발급비용', 'Examination & Issuance Fee')}</h4>
                    </div>
                    <p className="text-gray-900 dark:text-gray-100 ml-7 font-medium">{t('200,000원', '200,000 KRW')}</p>
                  </div>
                  
                  <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FileCheck className="w-5 h-5 text-gray-400" />
                      <h4 className="font-bold text-base text-black dark:text-white">{t('제출 서류', 'Required Submissions')}</h4>
                    </div>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400 ml-7">
                      <li>{t('포트폴리오 제출', 'Portfolio submission')}</li>
                      <li>{t('제작 영상 제출', 'Production video submission')}</li>
                    </ul>
                  </div>
                </div>
              )}
              {selectedCert === '1급' && (
                <div className="space-y-8">
                  <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <UserCheck className="w-5 h-5 text-gray-400" />
                      <h4 className="font-bold text-base text-black dark:text-white">{t('응시 자격', 'Eligibility')}</h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 ml-7 leading-relaxed">{t('1년 이상의 스탬프제작 경력자 또는 이에 준하는 교육 수료자', 'Those with 1+ years of stamp making experience or equivalent education')}</p>
                  </div>
                  
                  <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CreditCard className="w-5 h-5 text-gray-400" />
                      <h4 className="font-bold text-base text-black dark:text-white">{t('검정 및 자격증 발급비용', 'Examination & Issuance Fee')}</h4>
                    </div>
                    <p className="text-gray-900 dark:text-gray-100 ml-7 font-medium">{t('300,000원', '300,000 KRW')}</p>
                  </div>
                  
                  <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FileCheck className="w-5 h-5 text-gray-400" />
                      <h4 className="font-bold text-base text-black dark:text-white">{t('제출 서류', 'Required Submissions')}</h4>
                    </div>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400 ml-7">
                      <li>{t('포트폴리오 제출', 'Portfolio submission')}</li>
                      <li>{t('제작 영상 제출', 'Production video submission')}</li>
                    </ul>
                  </div>
                </div>
              )}
              {selectedCert === '마스터' && (
                <div className="space-y-8">
                  <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <UserCheck className="w-5 h-5 text-gray-400" />
                      <h4 className="font-bold text-base text-black dark:text-white">{t('응시 자격', 'Eligibility')}</h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 ml-7 leading-relaxed">{t('1급 자격증 취득 후 일정 기간 이상의 경력자', 'Those with a certain period of experience after obtaining Level 1 certification')}</p>
                  </div>
                  
                  <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CreditCard className="w-5 h-5 text-gray-400" />
                      <h4 className="font-bold text-base text-black dark:text-white">{t('검정 및 자격증 발급비용', 'Examination & Issuance Fee')}</h4>
                    </div>
                    <p className="text-gray-900 dark:text-gray-100 ml-7 font-medium">{t('600,000원', '600,000 KRW')}</p>
                  </div>
                  
                  <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FileCheck className="w-5 h-5 text-gray-400" />
                      <h4 className="font-bold text-base text-black dark:text-white">{t('제출 서류', 'Required Submissions')}</h4>
                    </div>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400 ml-7">
                      <li>{t('포트폴리오 제출', 'Portfolio submission')}</li>
                      <li>{t('제작 영상 제출', 'Production video submission')}</li>
                    </ul>
                  </div>
                </div>
              )}
              
              <div className="mt-10 pt-4 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                  {t('자세한 내용은 ', 'For more details, please check the ')}
                  <button onClick={() => { setShowCertModal(false); setCurrentPage('certification'); window.scrollTo(0, 0); }} className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                    {t('자격증발급', 'Issuance')}
                  </button>
                  {t(' 및 ', ' and ')}
                  <button onClick={() => { setShowCertModal(false); setCurrentPage('exam'); window.scrollTo(0, 0); }} className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                    {t('시험/접수안내', 'Exam/Apply')}
                  </button>
                  {t(' 페이지에서 확인해 주세요.', ' pages.')}
                </p>
              </div>
            </div>
            <div className="px-8 md:px-12 py-8 border-t border-black/10 dark:border-white/10 shrink-0 flex justify-end">
              <button onClick={() => setShowCertModal(false)} className="px-6 py-2 bg-black text-white dark:bg-white dark:text-black rounded-lg font-bold">{t('닫기', 'Close')}</button>
            </div>
          </div>
        </div>
      )}

      {/* Apply Modal */}
      <AnimatePresence>
        {showApplyModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white dark:bg-[#1e1e1e] rounded-[2.5rem] shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col relative overflow-hidden"
            >
              {/* Decorative background element */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-3xl rounded-full -mr-32 -mt-32 pointer-events-none"></div>
              
              <div className="p-8 pb-6 flex justify-between items-center shrink-0 relative z-10">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-black dark:text-white tracking-tight">{t('접수하기', 'Apply Now')}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{t('아래 양식을 정확하게 작성해 주세요.', 'Please fill out the form below accurately.')}</p>
                </div>
                <button onClick={() => setShowApplyModal(false)} className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-[#2a2a2a] text-gray-500 hover:text-black dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-8 pt-2 overflow-y-auto custom-scrollbar text-sm text-gray-600 dark:text-gray-300 space-y-8 relative z-10">
                <div className="space-y-6">
                  {/* Form fields with updated styling */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-black dark:text-white mb-2">
                        {t('성함', 'Name')} {formErrors.name && <span className="text-red-500 font-normal ml-2">{formErrors.name}</span>}
                      </label>
                      <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-4 rounded-2xl border border-black/10 dark:border-white/10 bg-gray-50 dark:bg-[#2a2a2a] text-black dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder={t('성함을 입력해주세요', 'Please enter your name')} />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-black dark:text-white mb-2">
                        {t('연락처', 'Contact Number')} {formErrors.phone && <span className="text-red-500 font-normal ml-2">{formErrors.phone}</span>}
                      </label>
                      <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-4 rounded-2xl border border-black/10 dark:border-white/10 bg-gray-50 dark:bg-[#2a2a2a] text-black dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder={t('연락처를 입력해주세요', 'Please enter your contact number')} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-black dark:text-white mb-2">
                      {t('주민등록번호', 'Resident Registration Number')} {formErrors.idNumber && <span className="text-red-500 font-normal ml-2">{formErrors.idNumber}</span>}
                    </label>
                    <input type="text" value={formData.idNumber} onChange={e => setFormData({...formData, idNumber: e.target.value})} className="w-full p-4 rounded-2xl border border-black/10 dark:border-white/10 bg-gray-50 dark:bg-[#2a2a2a] text-black dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="ex. 123456-7891111" />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-black dark:text-white mb-2">
                      {t('이메일주소', 'Email Address')} {formErrors.email && <span className="text-red-500 font-normal ml-2">{formErrors.email}</span>}
                    </label>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{t('검정 관련 세부 안내를 받을 수 있는 이메일 주소를 적어 주세요.', 'Please enter an email address where you can receive detailed information about the exam.')}</p>
                    <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-4 rounded-2xl border border-black/10 dark:border-white/10 bg-gray-50 dark:bg-[#2a2a2a] text-black dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder={t('이메일을 입력해주세요', 'Please enter your email')} />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-black dark:text-white mb-2">
                      {t('주소', 'Address')} {formErrors.address && <span className="text-red-500 font-normal ml-2">{formErrors.address}</span>}
                    </label>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{t('자격증 원본 및 포트폴리오 스탬프를 수령 할 주소를 적어 주세요.', 'Please enter the address to receive the original certificate and portfolio stamps.')}</p>
                    <input type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full p-4 rounded-2xl border border-black/10 dark:border-white/10 bg-gray-50 dark:bg-[#2a2a2a] text-black dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder={t('주소를 입력해주세요', 'Please enter your address')} />
                  </div>

                  <div className="p-6 bg-emerald-50/50 dark:bg-emerald-900/10 rounded-3xl border border-emerald-100 dark:border-emerald-800/30">
                    <label className="block text-sm font-bold text-black dark:text-white mb-2">
                      {t('응시등급선택 (복수 선택 가능)', 'Select Exam Level (Multiple selections possible)')} {formErrors.levels && <span className="text-red-500 font-normal ml-2">{formErrors.levels}</span>}
                    </label>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 mb-4 whitespace-pre-wrap leading-relaxed">{t('1급과 2급을 동시 응시 하시는 경우, 2급은 \'검정료+자격증발급비\'의 50%만 납부하시면 됩니다.\n수강생할인 적용시 1급 15만원 + 2급 5만원 = 합계 20만원', 'If you take Level 1 and Level 2 at the same time, you only need to pay 50% of the \'exam fee + certificate issuance fee\' for Level 2.\nWhen student discount is applied: Level 1 150,000 won + Level 2 50,000 won = Total 200,000 won')}</p>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 p-3 rounded-xl hover:bg-white dark:hover:bg-[#1e1e1e] transition-colors cursor-pointer border border-transparent hover:border-black/5 dark:hover:border-white/5">
                        <input type="checkbox" checked={formData.levels.includes('1급')} onChange={(e) => {
                          const newLevels = e.target.checked ? [...formData.levels, '1급'] : formData.levels.filter(l => l !== '1급');
                          setFormData({...formData, levels: newLevels});
                        }} className="w-5 h-5 text-emerald-600 rounded-md border-gray-300 focus:ring-emerald-500" />
                        <span className="font-medium">{t('스탬프제작지도사 1급(검정료 30만원 -> 이벤트 할인가 15만원)', 'Stamp Making Instructor Level 1 (Exam fee 300,000 won -> Event discount price 150,000 won)')}</span>
                      </label>
                      <label className="flex items-center gap-3 p-3 rounded-xl hover:bg-white dark:hover:bg-[#1e1e1e] transition-colors cursor-pointer border border-transparent hover:border-black/5 dark:hover:border-white/5">
                        <input type="checkbox" checked={formData.levels.includes('2급')} onChange={(e) => {
                          const newLevels = e.target.checked ? [...formData.levels, '2급'] : formData.levels.filter(l => l !== '2급');
                          setFormData({...formData, levels: newLevels});
                        }} className="w-5 h-5 text-emerald-600 rounded-md border-gray-300 focus:ring-emerald-500" />
                        <span className="font-medium">{t('스탬프제작지도사 2급(검정료 20만원 -> 이벤트 할인가 10만원)', 'Stamp Making Instructor Level 2 (Exam fee 200,000 won -> Event discount price 100,000 won)')}</span>
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-black dark:text-white mb-2">
                        {t('입금자명', 'Payer Name')} {formErrors.payerName && <span className="text-red-500 font-normal ml-2">{formErrors.payerName}</span>}
                      </label>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 leading-relaxed">{t('송금자 성함을 기재 해 주세요. (응시료 납부 완료 후, 안내 메일이 발송됩니다.)', 'Please enter the remitter\'s name. (A guide email will be sent after the exam fee payment is completed.)')}<br/><strong className="text-emerald-600 dark:text-emerald-400">{t('농협 351-1372-1557-33 (한국스탬프교육진흥원)', 'Nonghyup 351-1372-1557-33 (Korea Stamp Education Institute)')}</strong></p>
                      <input type="text" value={formData.payerName} onChange={e => setFormData({...formData, payerName: e.target.value})} className="w-full p-4 rounded-2xl border border-black/10 dark:border-white/10 bg-gray-50 dark:bg-[#2a2a2a] text-black dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder={t('송금자 성함', 'Remitter\'s name')} />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-black dark:text-white mb-2">
                        {t('입금시간', 'Deposit Time')} {formErrors.depositTime && <span className="text-red-500 font-normal ml-2">{formErrors.depositTime}</span>}
                      </label>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 leading-relaxed">{t('이체 날짜 및 시간을 기재 해 주세요.', 'Please enter the transfer date and time.')}</p>
                      <input type="text" value={formData.depositTime} onChange={e => setFormData({...formData, depositTime: e.target.value})} className="w-full p-4 rounded-2xl border border-black/10 dark:border-white/10 bg-gray-50 dark:bg-[#2a2a2a] text-black dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder={t('이체 날짜 및 시간 (예: 2024-05-20 14:30)', 'Transfer date and time (e.g., 2024-05-20 14:30)')} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-black dark:text-white mb-2">
                      {t('응시료 현금영수증/세금계산서 발행 정보', 'Cash Receipt/Tax Invoice Issuance Information')} {formErrors.receiptInfo && <span className="text-red-500 font-normal ml-2">{formErrors.receiptInfo}</span>}
                    </label>
                    <input type="text" value={formData.receiptInfo} onChange={e => setFormData({...formData, receiptInfo: e.target.value})} className="w-full p-4 rounded-2xl border border-black/10 dark:border-white/10 bg-gray-50 dark:bg-[#2a2a2a] text-black dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder={t('발행 정보를 입력해주세요', 'Please enter issuance information')} />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-black dark:text-white mb-3">
                      {t('검정방식선택', 'Select Exam Method')} {formErrors.examMethod && <span className="text-red-500 font-normal ml-2">{formErrors.examMethod}</span>}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <label className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${formData.examMethod === '우편' ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/20' : 'border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20'}`}>
                        <input type="radio" name="method" checked={formData.examMethod === '우편'} onChange={() => setFormData({...formData, examMethod: '우편'})} className="w-5 h-5 mt-0.5 text-emerald-600 focus:ring-emerald-500" />
                        <span className="font-medium leading-tight">{t('우편 포트폴리오 & 영상 제출', 'Mail Portfolio & Video Submission')}</span>
                      </label>
                      <label className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${formData.examMethod === '현장' ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/20' : 'border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20'}`}>
                        <input type="radio" name="method" checked={formData.examMethod === '현장'} onChange={() => setFormData({...formData, examMethod: '현장'})} className="w-5 h-5 mt-0.5 text-emerald-600 focus:ring-emerald-500" />
                        <span className="font-medium leading-tight">{t('현장 포트폴리오 제출 & 현장 검정 진행(현장검정비 5만원 추가)', 'On-site Portfolio Submission & On-site Exam (Additional 50,000 won for on-site exam)')}</span>
                      </label>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-[#2a2a2a] p-6 rounded-3xl border border-black/5 dark:border-white/5">
                    <label className="block text-sm font-bold text-black dark:text-white mb-2">
                      {t('개인정보 수집 및 이용동의', 'Consent to Collection and Use of Personal Information')} {formErrors.agreePrivacy && <span className="text-red-500 font-normal ml-2">{formErrors.agreePrivacy}</span>}
                    </label>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">{t('동의를 거부하실 수 있으나 설문 참여가 불가능합니다.', 'You may refuse to consent, but you will not be able to participate in the survey.')}</p>
                    <div className="text-xs text-gray-600 dark:text-gray-400 space-y-3 mb-5 bg-white dark:bg-[#1e1e1e] p-4 rounded-2xl border border-black/5 dark:border-white/5 h-32 overflow-y-auto custom-scrollbar">
                      <p><strong className="text-black dark:text-white">{t('수집하는 개인정보 항목', 'Items of Personal Information Collected')}</strong><br/>{t('이름, 연락처, 이메일, 주소', 'Name, Contact Number, Email, Address')}</p>
                      <p><strong className="text-black dark:text-white">{t('수집 및 이용 목적', 'Purpose of Collection and Use')}</strong><br/>{t('한국스탬프교육진흥원 교육과정 운영 및 공지사항 안내, 스탬프제작지도사 자격검정시험 관련 내용 등', 'Operation of Korea Stamp Education Institute curriculum and notice guidance, contents related to Stamp Making Instructor qualification exam, etc.')}</p>
                      <p><strong className="text-black dark:text-white">{t('보유 및 이용기간', 'Retention and Use Period')}</strong><br/>{t('동의일로부터 3년간', '3 years from the date of consent')}</p>
                    </div>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" checked={formData.agreePrivacy} onChange={e => setFormData({...formData, agreePrivacy: e.target.checked})} className="w-5 h-5 text-emerald-600 rounded-md border-gray-300 focus:ring-emerald-500" />
                      <span className="font-bold text-black dark:text-white">{t('개인정보 수집 및 이용에 동의합니다.', 'I agree to the collection and use of personal information.')}</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="p-8 pt-6 shrink-0 flex justify-end gap-4 relative z-10 bg-white dark:bg-[#1e1e1e] rounded-b-[2.5rem]">
                <button onClick={() => setShowApplyModal(false)} className="px-8 py-4 bg-gray-100 text-black dark:bg-[#2a2a2a] dark:text-white rounded-2xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">{t('취소', 'Cancel')}</button>
                <button onClick={handleApplySubmit} disabled={isSubmitting} className="px-10 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none">{isSubmitting ? t('접수 중...', 'Submitting...') : t('접수하기', 'Apply')}</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 p-2 text-white hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage}
              alt="Enlarged view"
              className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

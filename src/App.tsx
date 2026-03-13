import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Menu, X, Stamp, BookOpen, Briefcase, Award, Video, FileText, MapPin, Phone, Sun, Moon, ArrowUp, Mail, Globe, Clock, ChevronDown, MessageCircle, Building, Palette, GraduationCap, UserCheck, CreditCard, FileCheck, ChevronLeft, ChevronRight, FileEdit, Store, ShoppingBag, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import emailjs from '@emailjs/browser';
import CertificationPage from './components/CertificationPage';
import ExamPage from './components/ExamPage';
import CertificationInfoPage from './components/CertificationInfoPage';

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
  const [currentPage, setCurrentPage] = useState<'home' | 'certification' | 'exam' | 'cert-info'>('home');
  const [activeSection, setActiveSection] = useState<string>('');
  const [pendingScrollTarget, setPendingScrollTarget] = useState<string | null>(null);

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
      <nav className={`fixed w-full z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-white/95 dark:bg-[#121212]/95 backdrop-blur-md border-black/10 dark:border-white/10 py-4' : 'bg-transparent border-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3 cursor-pointer" onClick={scrollToTop}>
              <img src="https://i.ibb.co/Dfv01BhW/Logo.png" alt="KSEI Logo" className="w-8 h-8 object-contain" />
              <span className={`hidden md:block text-sm font-sans font-bold tracking-widest uppercase ${isScrolled || currentPage !== 'home' ? 'text-black dark:text-white' : 'text-white'}`}>{t('한국스탬프교육진흥원', 'Korea Stamp Education Institute')}</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-10">
              <button onClick={() => scrollTo('about')} className={`text-[11px] font-semibold tracking-[0.15em] uppercase transition-colors ${currentPage === 'home' && activeSection === 'about' ? 'text-green-600 dark:text-green-500' : isScrolled || currentPage !== 'home' ? 'text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white' : 'text-gray-300 hover:text-white'}`}>{t('기관소개', 'COMPANY')}</button>
              <button onClick={() => { setCurrentPage('cert-info'); window.scrollTo(0, 0); }} className={`text-[11px] font-semibold tracking-[0.15em] uppercase transition-colors ${currentPage === 'cert-info' ? 'text-green-600 dark:text-green-500' : isScrolled || currentPage !== 'home' ? 'text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white' : 'text-gray-300 hover:text-white'}`}>{t('자격증안내', 'CERTIFICATION')}</button>
              <button onClick={() => { setCurrentPage('certification'); window.scrollTo(0, 0); }} className={`text-[11px] font-semibold tracking-[0.15em] uppercase transition-colors ${currentPage === 'certification' ? 'text-green-600 dark:text-green-500' : isScrolled || currentPage !== 'home' ? 'text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white' : 'text-gray-300 hover:text-white'}`}>{t('자격증발급', 'ISSUANCE')}</button>
              <button onClick={() => { setCurrentPage('exam'); window.scrollTo(0, 0); }} className={`text-[11px] font-semibold tracking-[0.15em] uppercase transition-colors ${currentPage === 'exam' ? 'text-green-600 dark:text-green-500' : isScrolled || currentPage !== 'home' ? 'text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white' : 'text-gray-300 hover:text-white'}`}>{t('시험/접수안내', 'EXAM/APPLY')}</button>
              <div className="flex items-center gap-6 ml-4">
                <button onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')} className={`transition-colors ${isScrolled || currentPage !== 'home' ? 'text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white' : 'text-gray-300 hover:text-white'}`} aria-label="언어 변경">
                  <Globe className="w-4 h-4" />
                </button>
                <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className={`transition-colors ${isScrolled || currentPage !== 'home' ? 'text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white' : 'text-gray-300 hover:text-white'}`} aria-label="테마 변경">
                  {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
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
            <button onClick={() => scrollTo('about')} className={`text-left py-2 font-medium ${currentPage === 'home' && activeSection === 'about' ? 'text-green-600 dark:text-green-500' : 'text-gray-800 dark:text-gray-200'}`}>{t('기관소개', 'About Us')}</button>
            <button onClick={() => { setIsMobileMenuOpen(false); setCurrentPage('cert-info'); window.scrollTo(0, 0); }} className={`text-left py-2 font-medium ${currentPage === 'cert-info' ? 'text-green-600 dark:text-green-500' : 'text-gray-800 dark:text-gray-200'}`}>{t('자격증안내', 'Certifications')}</button>
            <button onClick={() => { setIsMobileMenuOpen(false); setCurrentPage('certification'); window.scrollTo(0, 0); }} className={`text-left py-2 font-medium ${currentPage === 'certification' ? 'text-green-600 dark:text-green-500' : 'text-gray-800 dark:text-gray-200'}`}>{t('자격증발급', 'Issuance')}</button>
            <button onClick={() => { setIsMobileMenuOpen(false); setCurrentPage('exam'); window.scrollTo(0, 0); }} className={`text-left py-2 font-medium ${currentPage === 'exam' ? 'text-green-600 dark:text-green-500' : 'text-gray-800 dark:text-gray-200'}`}>{t('시험/접수안내', 'Exam/Apply')}</button>
            <button onClick={() => { setIsMobileMenuOpen(false); setCurrentPage('exam'); window.scrollTo(0, 0); }} className={`text-left py-2 font-medium ${currentPage === 'exam' ? 'text-green-600 dark:text-green-500' : 'text-gray-800 dark:text-gray-200'}`}>{t('접수방법', 'How to Apply')}</button>
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
        <>
          {/* Hero Section */}
          <div className="relative h-screen min-h-[600px] flex flex-col items-center justify-center overflow-hidden snap-start bg-white dark:bg-[#121212] transition-colors duration-300">
        {/* Background Image & Gradient */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://i.ibb.co/Lh0gDPck/Kakao-Talk-20240626-100558300.jpg" 
            alt="Background" 
            className="w-full h-full object-cover opacity-60 dark:opacity-30"
            style={{ 
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 90%)',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 90%)'
            }}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-white dark:to-[#121212]"></div>
        </div>

        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute w-64 h-64 md:w-80 md:h-80 bg-emerald-500/30 dark:bg-emerald-500/40 blur-2xl rounded-full pointer-events-none z-0"
        />
        
        <div className="relative z-10 flex flex-col items-center justify-center flex-1 w-full -mt-16 px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-center max-w-4xl mx-auto relative z-10"
          >
            <h2 
              className="text-2xl md:text-4xl lg:text-5xl font-sans font-medium text-white leading-tight tracking-tight"
              style={{ textShadow: '0 4px 12px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.5)' }}
            >
              {t('우리는 스탬프 교육의 표준을 만들어', 'We set the standard for stamp education')}
              <br className="hidden md:block" />
              <span className="md:hidden"> </span>
              {t('전문적인 창작자와 교육자를 양성합니다.', 'to train professional creators and educators.')}
            </h2>
          </motion.div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-60">
          <span className="text-[10px] tracking-[0.2em] uppercase text-black dark:text-white font-light">scroll down</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-[1px] h-12 bg-gradient-to-b from-black dark:from-white to-transparent"
          ></motion.div>
        </div>
      </div>

      {/* Intro Section */}
      <div className="py-24 bg-gray-50 dark:bg-[#121212] border-b border-black/5 dark:border-white/5 transition-colors duration-300 snap-start" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-16">
            <div className="md:w-1/3">
              <h2 className="text-sm font-bold tracking-widest uppercase text-black dark:text-white mb-6 flex items-center gap-2">
                ABOUT US
                <span className="w-4 h-[1px] bg-black dark:bg-white"></span>
              </h2>
              <p className="text-3xl md:text-4xl font-sans font-medium text-black dark:text-white leading-tight mb-6">
                {t('한국스탬프교육진흥원', 'Korea Stamp Education Institute')}
              </p>
              <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                {t('스탬프 제작을 배우고 싶은 분들에게 체계적인 교육과 자격증 과정을 제공하는 전문 기관입니다.', 'A professional organization providing systematic education and certification courses for those who want to learn stamp making.')}
              </p>
            </div>
            <div className="md:w-2/3 space-y-8">
              <div className="bg-white dark:bg-[#1e1e1e] p-8 md:p-10 rounded-2xl border border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/10 transition-colors">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-black dark:text-white">
                    {t('설립 목적', 'Purpose')}
                  </h3>
                  <span className="text-xs font-mono text-gray-400">01</span>
                </div>
                <p className="text-lg text-black dark:text-gray-200 mb-6 font-medium">
                  {t('"누구나 쉽고 즐겁게 배운 스탬프 기술을 자신의 삶과 일에 활용할 수 있도록 돕자."', '"To help anyone easily and enjoyably learn stamp skills and apply them to their life and work."')}
                </p>
                <ul className="space-y-3 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  <li className="flex gap-3"><span className="text-emerald-500">•</span> {t('취미로 시작해도, 전문 자격증으로 이어져 자신감을 얻을 수 있고', 'Even starting as a hobby can lead to professional certification and confidence')}</li>
                  <li className="flex gap-3"><span className="text-emerald-500">•</span> {t('작은 체험부스 운영부터 공방 창업까지 현실적인 길이 열리며', 'Practical paths open up from running small experience booths to starting a workshop')}</li>
                  <li className="flex gap-3"><span className="text-emerald-500">•</span> {t('교육과정을 통해 단순히 기술뿐 아니라 강사로서 활동할 수 있는 힘을 키울 수 있습니다.', 'Through the curriculum, you can develop not only skills but also the ability to work as an instructor.')}</li>
                </ul>
              </div>
              
              <div className="bg-white dark:bg-[#1e1e1e] p-8 md:p-10 rounded-2xl border border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/10 transition-colors">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-black dark:text-white">
                    {t('주요 활동', 'Main Activities')}
                  </h3>
                  <span className="text-xs font-mono text-gray-400">02</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-gray-600 dark:text-gray-400 text-sm">
                  <div className="flex items-start gap-3">
                    <span className="text-emerald-500 mt-0.5">→</span>
                    <p>{t('스탬프제작지도사 자격증 검정 및 발급', 'Stamp Making Instructor Certification Exam and Issuance')}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-emerald-500 mt-0.5">→</span>
                    <p>{t('스탬프 제작 교육과정 운영 (기초·심화·강사 과정)', 'Stamp Making Curriculum Operation (Basic, Advanced, Instructor Courses)')}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-emerald-500 mt-0.5">→</span>
                    <p>{t('공방 창업 및 체험 프로그램 컨설팅', 'Workshop Startup and Experience Program Consulting')}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-emerald-500 mt-0.5">→</span>
                    <p>{t('온라인·오프라인 교육 콘텐츠 연구 및 개발', 'Online/Offline Educational Content Research and Development')}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-emerald-500 mt-0.5">→</span>
                    <p>{t('스탬프 강사와 기관·학교·지자체 연결 지원', 'Support for Connecting Stamp Instructors with Institutions, Schools, and Local Governments')}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-emerald-500 mt-0.5">→</span>
                    <p>{t('스탬프 체험 행사 기획 및 운영', 'Stamp Experience Event Planning and Operation')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ & Location Section */}
      <div className="py-24 bg-gray-50 dark:bg-[#121212] border-b border-black/5 dark:border-white/5 transition-colors duration-300 snap-start" id="faq">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Location Only */}
            <div>
              <div className="mb-10 text-center">
                <h2 className="text-sm font-bold tracking-widest uppercase text-black dark:text-white mb-4 flex items-center justify-center gap-2">
                  <span className="w-4 h-[1px] bg-black dark:bg-white"></span>
                  LOCATION
                  <span className="w-4 h-[1px] bg-black dark:bg-white"></span>
                </h2>
                <h3 className="text-3xl md:text-4xl font-sans font-medium text-black dark:text-white">{t('오시는 길', 'Directions')}</h3>
              </div>
              <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-2xl border border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/10 transition-colors">
                <div className="w-full h-64 bg-gray-50 dark:bg-[#2a2a2a] rounded-xl mb-6 flex items-center justify-center border border-black/5 dark:border-white/5 overflow-hidden relative">
                  <img src="https://i.ibb.co/tT32PH3J/2026-03-10-095459.png" alt="Map" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-black dark:text-white mb-1">{t('주소', 'Address')}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{t('대전광역시 서구 갈마역로 155', '155 Galma-yeok-ro, Seo-gu, Daejeon')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-black dark:text-white mb-1">{t('전화번호', 'Phone')}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">010-8409-2802</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="py-24 bg-gray-50 dark:bg-[#1a1a1a] border-b border-black/5 dark:border-white/5 transition-colors duration-300 snap-start">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest uppercase text-black dark:text-white mb-4 flex items-center justify-center gap-2">
              <span className="w-4 h-[1px] bg-black dark:bg-white"></span>
              GALLERY
              <span className="w-4 h-[1px] bg-black dark:bg-white"></span>
            </h2>
            <p className="text-3xl md:text-4xl font-sans font-medium text-black dark:text-white leading-tight">
              {t('갤러리', 'Gallery')}
            </p>
            <p className="text-gray-600 dark:text-gray-400 font-light mt-4">
              {t('옆으로 넘겨 실제 활동 사진들을 확인해보세요!', 'Swipe to see actual activity photos!')}
            </p>
          </div>
          
          <div className="relative">
            {/* Gallery Navigation Buttons - Moved Outside */}
            <div className="hidden md:block">
              <button 
                onClick={prevGallery}
                className="absolute left-[-80px] top-1/2 -translate-y-1/2 w-14 h-14 bg-white dark:bg-[#1e1e1e] rounded-full shadow-xl flex items-center justify-center text-black dark:text-white hover:bg-emerald-500 hover:text-white transition-all z-10 border border-black/5 dark:border-white/5"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button 
                onClick={nextGallery}
                className="absolute right-[-80px] top-1/2 -translate-y-1/2 w-14 h-14 bg-white dark:bg-[#1e1e1e] rounded-full shadow-xl flex items-center justify-center text-black dark:text-white hover:bg-emerald-500 hover:text-white transition-all z-10 border border-black/5 dark:border-white/5"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>

            {/* Mobile View: Infinite Slider */}
            <div className="md:hidden overflow-hidden -mx-4 px-4 pb-4">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ 
                  transform: `translateX(-${activeGalleryIndex * 100}%)` 
                }}
              >
                {galleryImages.map((src, idx) => (
                  <div 
                    key={idx} 
                    className="shrink-0 w-full px-2"
                  >
                    <div className="aspect-square rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-800 relative group">
                      <img src={src} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop View: Button-controlled Slider */}
            <div className="hidden md:block overflow-hidden -mx-3">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ 
                  transform: `translateX(-${activeGalleryIndex * 25}%)` 
                }}
              >
                {galleryImages.map((src, idx) => (
                  <div 
                    key={idx} 
                    className="shrink-0 px-3 w-1/4"
                  >
                    <div className="aspect-square rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-800 relative group">
                      <img src={src} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
      ) : currentPage === 'certification' ? (
        <CertificationPage t={t} />
      ) : currentPage === 'cert-info' ? (
        <CertificationInfoPage 
          t={t} 
          setShowCertModal={setShowCertModal}
          setSelectedCert={setSelectedCert}
        />
      ) : (
        <ExamPage t={t} setShowApplyModal={setShowApplyModal} />
      )}

      {/* Footer */}
      <footer className="bg-white dark:bg-[#121212] border-t border-black/5 dark:border-white/5 py-16 transition-colors duration-300 snap-start">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div className="mb-10 md:mb-0">
              <h2 className="text-2xl font-sans font-bold tracking-tighter text-black dark:text-white mb-6 flex items-center gap-3">
                <img src="https://i.ibb.co/Dfv01BhW/Logo.png" alt="KSEI Logo" className="w-8 h-8 object-contain" />
                KSEI
              </h2>
              <div className="flex gap-4 text-xs font-medium tracking-widest uppercase text-gray-500 dark:text-gray-400">
                <button onClick={() => setShowPrivacyModal(true)} className="hover:text-black dark:hover:text-white transition-colors">{t('개인정보처리방침', 'Privacy Policy')}</button>
                <span className="text-gray-300 dark:text-gray-700">|</span>
                <button onClick={() => setShowTermsModal(true)} className="hover:text-black dark:hover:text-white transition-colors">{t('이용약관', 'Terms of Service')}</button>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm w-full md:w-auto">
              <div>
                <h4 className="text-black dark:text-white font-bold mb-4 tracking-widest uppercase text-xs">{t('기관소개', 'About Us')}</h4>
                <ul className="text-gray-500 dark:text-gray-400 space-y-3">
                  <li><button onClick={() => scrollTo('about')} className="hover:text-black dark:hover:text-white transition-colors">{t('설립 목적', 'Purpose')}</button></li>
                  <li><button onClick={() => scrollTo('about')} className="hover:text-black dark:hover:text-white transition-colors">{t('주요 활동', 'Activities')}</button></li>
                </ul>
              </div>
              <div>
                <h4 className="text-black dark:text-white font-bold mb-4 tracking-widest uppercase text-xs">{t('자격증안내', 'Certification')}</h4>
                <ul className="text-gray-500 dark:text-gray-400 space-y-3">
                  <li><button onClick={() => { setCurrentPage('cert-info'); window.scrollTo(0, 0); }} className="hover:text-black dark:hover:text-white transition-colors">{t('2급 (기초)', 'Level 2 (Basic)')}</button></li>
                  <li><button onClick={() => { setCurrentPage('cert-info'); window.scrollTo(0, 0); }} className="hover:text-black dark:hover:text-white transition-colors">{t('1급 (심화)', 'Level 1 (Advanced)')}</button></li>
                  <li><button onClick={() => { setCurrentPage('cert-info'); window.scrollTo(0, 0); }} className="hover:text-black dark:hover:text-white transition-colors">{t('마스터 (전문가)', 'Master (Expert)')}</button></li>
                </ul>
              </div>
              <div>
                <h4 className="text-black dark:text-white font-bold mb-4 tracking-widest uppercase text-xs">{t('시험/접수안내', 'Exam/Apply')}</h4>
                <ul className="text-gray-500 dark:text-gray-400 space-y-3">
                  <li><button onClick={() => { setCurrentPage('exam'); window.scrollTo(0, 0); }} className="hover:text-black dark:hover:text-white transition-colors">{t('포트폴리오', 'Portfolio')}</button></li>
                  <li><button onClick={() => { setCurrentPage('exam'); window.scrollTo(0, 0); }} className="hover:text-black dark:hover:text-white transition-colors">{t('영상실기', 'Video Practical')}</button></li>
                </ul>
              </div>
              <div>
                <h4 className="text-black dark:text-white font-bold mb-4 tracking-widest uppercase text-xs">{t('접수방법', 'How to Apply')}</h4>
                <ul className="text-gray-500 dark:text-gray-400 space-y-3">
                  <li><button onClick={() => { setCurrentPage('exam'); window.scrollTo(0, 0); }} className="hover:text-black dark:hover:text-white transition-colors">{t('신청 절차', 'Application Process')}</button></li>
                  <li><button onClick={() => { setCurrentPage('exam'); window.scrollTo(0, 0); }} className="hover:text-black dark:hover:text-white transition-colors">{t('필요 서류', 'Required Documents')}</button></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-black/5 dark:border-white/5 pt-8 text-xs text-gray-400 dark:text-gray-500 space-y-2 flex flex-col md:flex-row justify-between">
            <div>
              <div className="mb-4 space-y-2 font-mono">
                <p>{t('주소: 대전광역시 서구 갈마역로 155', 'Address: 155 Galma-yeok-ro, Seo-gu, Daejeon')}</p>
                <p>{t('대표전화: 010-8409-2802', 'Phone: 010-8409-2802')}</p>
                <p>{t('이메일: ksei2025@naver.com', 'Email: ksei2025@naver.com')}</p>
              </div>
              <p className="font-sans">{t('Copyright © 2025 한국스탬프교육진흥원, All Rights Reserved', 'Copyright © 2025 Korea Stamp Education Institute, All Rights Reserved')}</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col items-end gap-3 z-50">
        {showScrollTop && (
          <button 
            onClick={scrollToTop}
            className="p-3 bg-white text-black dark:bg-[#2a2a2a] dark:text-white border border-black/10 dark:border-white/10 rounded-full shadow-lg hover:scale-110 transition-transform"
            aria-label="최상단으로 이동"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}
        <button 
          onClick={() => setShowApplyModal(true)}
          className={`flex items-center justify-center gap-2 bg-black text-white dark:bg-white dark:text-black shadow-lg hover:scale-105 transition-all duration-300 ${isMobile ? 'w-12 h-12 rounded-full' : 'px-6 py-3 rounded-full'}`}
          aria-label="접수하기"
        >
          <FileEdit className="w-5 h-5" />
          {!isMobile && <span className="font-bold whitespace-nowrap">{t('접수하기', 'Apply Now')}</span>}
        </button>
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

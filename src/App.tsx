import React, { useState, useEffect } from 'react';
import { Menu, X, Stamp, BookOpen, Briefcase, Award, Video, FileText, MapPin, Phone, Sun, Moon, ArrowUp, Mail, Globe, Clock, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import emailjs from '@emailjs/browser';

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
    /* EmailJS */
    try {
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

      emailjs.init({
        publicKey: publicKey,
      });
      
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
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    setIsMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212] text-gray-800 dark:text-gray-200 font-sans selection:bg-black/10 dark:selection:bg-white/20 transition-colors duration-300 break-keep">
      {/* Top Bar */}
      <div className="hidden md:block bg-gray-100 dark:bg-[#0a0a0a] border-b border-black/5 dark:border-white/5 py-2 text-xs text-gray-600 dark:text-gray-400 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {t('대전광역시 서구 갈마역로 155', '155 Galma-yeok-ro, Seo-gu, Daejeon')}</span>
            <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> 010-8409-2802</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {t('운영시간: 평일 09:00 - 18:00', 'Hours: Weekdays 09:00 - 18:00')}</span>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-white/95 dark:bg-[#121212]/95 backdrop-blur-md border-black/10 dark:border-white/10 py-4 top-0' : 'bg-transparent border-transparent dark:border-transparent py-6 top-0 md:top-8'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <img src={`${import.meta.env.BASE_URL}img/Logo.png`} alt="한국스탬프교육진흥원 로고" className="h-8 object-contain" />
              <span className={`hidden md:block text-xl font-serif font-bold tracking-tight ${isScrolled ? 'text-black dark:text-white' : 'text-white'}`}>{t('한국스탬프교육진흥원', 'Korea Stamp Education Institute')}</span>
              <span className={`md:hidden text-xl font-serif font-bold tracking-tight ${isScrolled ? 'text-black dark:text-white' : 'text-white'}`}>{t('한국스탬프교육진흥원', 'KSEI')}</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollTo('about')} className={`text-sm font-medium transition-colors ${isScrolled ? 'text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white' : 'text-gray-200 hover:text-white'}`}>{t('기관소개', 'About Us')}</button>
              <button onClick={() => scrollTo('cert')} className={`text-sm font-medium transition-colors ${isScrolled ? 'text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white' : 'text-gray-200 hover:text-white'}`}>{t('자격증안내', 'Certifications')}</button>
              <button onClick={() => scrollTo('exam')} className={`text-sm font-medium transition-colors ${isScrolled ? 'text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white' : 'text-gray-200 hover:text-white'}`}>{t('시험안내', 'Exam Info')}</button>
              <button onClick={() => scrollTo('exam')} className={`text-sm font-medium transition-colors ${isScrolled ? 'text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white' : 'text-gray-200 hover:text-white'}`}>{t('접수방법', 'How to Apply')}</button>
              <button onClick={() => scrollTo('faq')} className={`text-sm font-medium transition-colors ${isScrolled ? 'text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white' : 'text-gray-200 hover:text-white'}`}>{t('자주묻는질문', 'FAQ')}</button>
              <div className="flex items-center gap-4 border-l border-gray-300 dark:border-gray-700 pl-8">
                <button onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')} className={`p-2 rounded-full transition-colors ${isScrolled ? 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800' : 'text-white/80 hover:bg-white/10'}`} aria-label="언어 변경">
                  <Globe className="w-5 h-5" />
                </button>
                <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className={`p-2 rounded-full transition-colors ${isScrolled ? 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800' : 'text-white/80 hover:bg-white/10'}`} aria-label="테마 변경">
                  {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                </button>
              </div>
              <button onClick={() => setShowConsultModal(true)} className={`ml-4 px-5 py-2 text-sm font-bold rounded-full transition-colors ${isScrolled ? 'bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200' : 'bg-white text-black hover:bg-gray-200'}`}>
                {t('상담신청', 'Consultation')}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <button onClick={() => setIsMobileMenuOpen(true)} className={`p-2 ${isScrolled ? 'text-black dark:text-white' : 'text-white'}`}>
                <Menu className="w-6 h-6" />
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
            <button onClick={() => scrollTo('about')} className="text-left py-2 text-gray-800 dark:text-gray-200 font-medium">{t('기관소개', 'About Us')}</button>
            <button onClick={() => scrollTo('cert')} className="text-left py-2 text-gray-800 dark:text-gray-200 font-medium">{t('자격증안내', 'Certifications')}</button>
            <button onClick={() => scrollTo('exam')} className="text-left py-2 text-gray-800 dark:text-gray-200 font-medium">{t('시험안내', 'Exam Info')}</button>
            <button onClick={() => scrollTo('exam')} className="text-left py-2 text-gray-800 dark:text-gray-200 font-medium">{t('접수방법', 'How to Apply')}</button>
            <button onClick={() => { setIsMobileMenuOpen(false); scrollTo('faq'); }} className="text-left py-2 text-gray-800 dark:text-gray-200 font-medium">{t('자주묻는질문', 'FAQ')}</button>
            <button onClick={() => { setIsMobileMenuOpen(false); setShowConsultModal(true); }} className="text-left py-2 text-blue-600 dark:text-blue-400 font-bold">{t('상담신청', 'Consultation')}</button>
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

      {/* Hero Section */}
      <div className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden snap-start">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1618424876654-10651662132e?q=80&w=2070&auto=format&fit=crop" alt="Background" className="w-full h-full object-cover opacity-30 scale-105 animate-pulse" style={{ animationDuration: '20s' }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-white dark:to-[#121212] transition-colors duration-300"></div>
        </div>
        <div className="relative z-10 text-center px-4 w-full max-w-7xl mx-auto flex flex-col items-center mt-20">
          <div className="flex justify-center items-center w-full max-w-5xl mb-12 relative">
            <h1 className="text-7xl md:text-[10rem] lg:text-[12rem] font-serif font-bold text-white/90 tracking-tighter leading-none">STAMP</h1>
            <h1 className="text-5xl md:text-[7rem] lg:text-[9rem] font-serif font-light text-white/30 tracking-widest absolute right-0 bottom-0 translate-y-1/4 hidden md:block">EDU</h1>
          </div>
          <div className="bg-black/40 backdrop-blur-md border border-white/10 p-8 md:p-10 rounded-2xl max-w-2xl transform translate-y-8">
            <p className="text-lg md:text-xl text-gray-200 font-light leading-relaxed mb-6">
              {t('스탬프 제작 및 활용 교육을 전문적으로 연구·보급하여', 'Professionally researching and distributing stamp making and utilization education')}
              <br className="hidden md:block"/>
              {t('공예·교육·창업 분야의 전문 인력을 양성합니다.', 'to train professionals in crafts, education, and startups.')}
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-400 font-medium tracking-widest uppercase">
              <span className="w-8 h-[1px] bg-gray-600"></span>
              Korea Stamp Education Institute
              <span className="w-8 h-[1px] bg-gray-600"></span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-50 text-black dark:text-white">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-[1px] h-12 bg-black dark:bg-white"></div>
        </div>
      </div>

      {/* Intro Section */}
      <div className="py-24 bg-white dark:bg-[#121212] border-b border-black/5 dark:border-white/10 transition-colors duration-300 snap-start" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-16">
            <div className="md:w-1/3">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-black dark:text-white leading-tight mb-6">
                {t('기관소개', 'About Us')}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 font-light leading-relaxed">
                {t('한국스탬프교육진흥원은 스탬프 제작을 배우고 싶은 분들에게 체계적인 교육과 자격증 과정을 제공하는 전문 기관입니다.', 'Korea Stamp Education Institute is a professional organization providing systematic education and certification courses for those who want to learn stamp making.')}
              </p>
            </div>
            <div className="md:w-2/3 space-y-12">
              <div>
                <h3 className="text-2xl font-bold text-black dark:text-white mb-4 flex items-center gap-2">
                  <span className="w-8 h-[1px] bg-black/50 dark:bg-white/50 inline-block"></span>
                  {t('설립 목적', 'Purpose of Establishment')}
                </h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 font-medium">
                  {t('"누구나 쉽고 즐겁게 배운 스탬프 기술을 자신의 삶과 일에 활용할 수 있도록 돕자."', '"To help anyone easily and enjoyably learn stamp skills and apply them to their life and work."')}
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  <li>• {t('취미로 시작해도, 전문 자격증으로 이어져 자신감을 얻을 수 있고', 'Even starting as a hobby can lead to professional certification and confidence')}</li>
                  <li>• {t('작은 체험부스 운영부터 공방 창업까지 현실적인 길이 열리며', 'Practical paths open up from running small experience booths to starting a workshop')}</li>
                  <li>• {t('교육과정을 통해 단순히 기술뿐 아니라 강사로서 활동할 수 있는 힘을 키울 수 있습니다.', 'Through the curriculum, you can develop not only skills but also the ability to work as an instructor.')}</li>
                </ul>
                <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {t('즉, 스탬프 제작은 단순한 공예가 아니라 나를 표현하는 방법, 새로운 수입원이 되는 기회, 사람들과 나누는 즐거움이 될 수 있습니다.', 'In other words, stamp making is not just a simple craft, but a way to express yourself, an opportunity for a new source of income, and a joy to share with others.')}
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-black dark:text-white mb-4 flex items-center gap-2">
                  <span className="w-8 h-[1px] bg-black/50 dark:bg-white/50 inline-block"></span>
                  {t('주요 활동', 'Main Activities')}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600 dark:text-gray-400 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-black/50 dark:bg-white/50 mt-1.5 shrink-0"></div>
                    <p>{t('스탬프제작지도사 자격증 검정 및 발급', 'Stamp Making Instructor Certification Exam and Issuance')}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-black/50 dark:bg-white/50 mt-1.5 shrink-0"></div>
                    <p>{t('스탬프 제작 교육과정 운영 (기초·심화·강사 과정)', 'Stamp Making Curriculum Operation (Basic, Advanced, Instructor Courses)')}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-black/50 dark:bg-white/50 mt-1.5 shrink-0"></div>
                    <p>{t('공방 창업 및 체험 프로그램 컨설팅', 'Workshop Startup and Experience Program Consulting')}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-black/50 dark:bg-white/50 mt-1.5 shrink-0"></div>
                    <p>{t('온라인·오프라인 교육 콘텐츠 연구 및 개발', 'Online/Offline Educational Content Research and Development')}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-black/50 dark:bg-white/50 mt-1.5 shrink-0"></div>
                    <p>{t('스탬프 강사와 기관·학교·지자체 연결 지원', 'Support for Connecting Stamp Instructors with Institutions, Schools, and Local Governments')}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-black/50 dark:bg-white/50 mt-1.5 shrink-0"></div>
                    <p>{t('스탬프 체험 행사 기획 및 운영', 'Stamp Experience Event Planning and Operation')}</p>
                  </div>
                </div>
                <p className="mt-6 text-gray-700 dark:text-gray-300 text-sm font-medium">
                  {t('한국스탬프교육진흥원은 이러한 과정을 안전하고 체계적으로 안내하는 길잡이 역할을 합니다.', 'Korea Stamp Education Institute serves as a guide to safely and systematically navigate these processes.')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Certification Section */}
      <div className="bg-gray-50 dark:bg-[#121212] py-24 transition-colors duration-300 snap-start" id="cert">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-black dark:text-white mb-4">
              {t('스탬프제작지도사', 'Stamp Making Instructor')}
              <br className="md:hidden" />
              <span className="hidden md:inline"> </span>
              {t('자격증', 'Certification')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">{t('스탬프 제작 기술을 습득하고, 교육·체험·창업 등 다양한 영역에서 활동할 수 있는 전문 민간자격증입니다.', 'A professional private certification that allows you to acquire stamp making skills and work in various fields such as education, experience, and startups.')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-black/10 dark:border-white/10 rounded-xl overflow-hidden">
            {/* Card 1 */}
            <div className="bg-blue-50 dark:bg-[#1e293b] p-10 flex flex-col h-full min-h-[550px] group relative overflow-hidden transition-transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-900/20 z-10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full -z-10"></div>
              <h3 className="text-4xl font-bold text-black dark:text-white mb-2">{t('2급', 'Level 2')}</h3>
              <span className="text-xl font-light text-blue-600 dark:text-blue-300 mb-6">{t('기초 과정', 'Basic Course')}</span>
              <p className="text-gray-700 dark:text-white/80 text-sm mb-6 pb-6 border-b border-black/10 dark:border-white/10">
                <span className="font-bold text-black dark:text-white">{t('입문자용', 'For Beginners')}</span><br/>
                {t('스탬프 제작을 처음 배우는 사람', 'Those learning stamp making for the first time')}
              </p>
              <ul className="text-gray-600 dark:text-white/70 text-sm space-y-3 flex-grow">
                <li className="flex gap-2"><span className="text-blue-500 dark:text-blue-400">•</span> {t('만년스탬프 원리와 재료 이해', 'Understanding the principles and materials of pre-inked stamps')}</li>
                <li className="flex gap-2"><span className="text-blue-500 dark:text-blue-400">•</span> {t('기본 도안 제작 실습', 'Basic design creation practice')}</li>
                <li className="flex gap-2"><span className="text-blue-500 dark:text-blue-400">•</span> {t('팝핑머신 실습 (소형 스탬프)', 'Popping machine practice (small stamps)')}</li>
                <li className="flex gap-2"><span className="text-blue-500 dark:text-blue-400">•</span> {t('교육 보조 및 체험 프로그램 운영', 'Educational assistance and experience program operation')}</li>
              </ul>
              <div className="mt-auto pt-6">
                <p className="text-xs text-blue-800 dark:text-blue-200 mb-4 bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg border border-blue-200 dark:border-blue-500/20">
                  <span className="font-bold">{t('결과:', 'Result:')}</span> {t('2급 자격증 취득 → 체험 보조, 간단한 제작 가능', 'Level 2 Certification -> Experience assistance, simple production possible')}
                </p>
                <button onClick={() => { setSelectedCert('2급'); setShowCertModal(true); }} className="w-full py-3 rounded-full border border-blue-200 dark:border-white/30 text-blue-600 dark:text-white hover:bg-blue-600 hover:text-white dark:hover:bg-white dark:hover:text-[#1e293b] transition-colors text-sm font-medium">{t('자세히 보기', 'View Details')}</button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-emerald-50 dark:bg-[#2d4a3e] p-10 flex flex-col h-full min-h-[550px] border-t md:border-t-0 md:border-l border-black/10 dark:border-white/10 group relative overflow-hidden transition-transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-900/20 z-20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-full -z-10"></div>
              <h3 className="text-4xl font-bold text-black dark:text-white mb-2">{t('1급', 'Level 1')}</h3>
              <span className="text-xl font-light text-emerald-600 dark:text-emerald-300 mb-6">{t('심화 과정', 'Advanced Course')}</span>
              <p className="text-gray-700 dark:text-white/80 text-sm mb-6 pb-6 border-b border-black/10 dark:border-white/10">
                <span className="font-bold text-black dark:text-white">{t('강사·창업 준비자용', 'For Instructors & Startups')}</span><br/>
                {t('기본기를 갖춘 사람, 강의·체험·판매 활동 희망자', 'Those with basics, wishing to teach, experience, or sell')}
              </p>
              <ul className="text-gray-600 dark:text-white/70 text-sm space-y-3 flex-grow">
                <li className="flex gap-2"><span className="text-emerald-500 dark:text-emerald-400">•</span> {t('상업적 활용 가능한 도안 기획', 'Planning commercially viable designs')}</li>
                <li className="flex gap-2"><span className="text-emerald-500 dark:text-emerald-400">•</span> {t('다양한 크기·종류의 스탬프 제작', 'Making stamps of various sizes and types')}</li>
                <li className="flex gap-2"><span className="text-emerald-500 dark:text-emerald-400">•</span> {t('수업 지도안 작성 & 강의 시뮬레이션', 'Writing lesson plans & lecture simulation')}</li>
                <li className="flex gap-2"><span className="text-emerald-500 dark:text-emerald-400">•</span> {t('공방 창업 기초 (재료, 가격, 운영)', 'Workshop startup basics (materials, pricing, operation)')}</li>
              </ul>
              <div className="mt-auto pt-6">
                <p className="text-xs text-emerald-800 dark:text-emerald-200 mb-4 bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-lg border border-emerald-200 dark:border-emerald-500/20">
                  <span className="font-bold">{t('결과:', 'Result:')}</span> {t('1급 자격증 취득 → 강의 활동, 창업·판매 가능', 'Level 1 Certification -> Teaching, startup, sales possible')}
                </p>
                <button onClick={() => { setSelectedCert('1급'); setShowCertModal(true); }} className="w-full py-3 rounded-full bg-emerald-600 text-white dark:bg-white dark:text-[#2d4a3e] hover:bg-emerald-700 dark:hover:bg-gray-200 transition-colors text-sm font-bold shadow-lg">{t('자세히 보기', 'View Details')}</button>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-purple-50 dark:bg-[#1a1a1a] p-10 flex flex-col h-full min-h-[550px] border-t md:border-t-0 md:border-l border-black/10 dark:border-white/10 group relative overflow-hidden transition-transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-900/20 z-10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-bl-full -z-10"></div>
              <h3 className="text-4xl font-bold text-black dark:text-white mb-2">{t('마스터', 'Master')}</h3>
              <span className="text-xl font-light text-purple-600 dark:text-purple-300 mb-6">{t('전문가 과정', 'Expert Course')}</span>
              <p className="text-gray-700 dark:text-gray-400 text-sm mb-6 pb-6 border-b border-black/10 dark:border-white/10">
                <span className="font-bold text-black dark:text-white">{t('강사 양성·컨설턴트용', 'For Instructor Training & Consultants')}</span><br/>
                {t('강사로 활동 중이거나 장기간 경력을 가진 전문가', 'Active instructors or experts with long-term experience')}
              </p>
              <ul className="text-gray-600 dark:text-gray-500 text-sm space-y-3 flex-grow">
                <li className="flex gap-2"><span className="text-purple-500 dark:text-purple-400">•</span> {t('고급 도안 제작 및 특수 기법 연구', 'Advanced design creation and special technique research')}</li>
                <li className="flex gap-2"><span className="text-purple-500 dark:text-purple-400">•</span> {t('교육 커리큘럼 개발 방법론', 'Educational curriculum development methodology')}</li>
                <li className="flex gap-2"><span className="text-purple-500 dark:text-purple-400">•</span> {t('강사 양성과정 운영 실습', 'Instructor training course operation practice')}</li>
                <li className="flex gap-2"><span className="text-purple-500 dark:text-purple-400">•</span> {t('기업·기관 맞춤형 프로그램 컨설팅', 'Corporate/institutional customized program consulting')}</li>
              </ul>
              <div className="mt-auto pt-6">
                <p className="text-xs text-purple-800 dark:text-purple-300 mb-4 bg-purple-100 dark:bg-purple-900/20 p-3 rounded-lg border border-purple-200 dark:border-purple-500/20">
                  <span className="font-bold">{t('결과:', 'Result:')}</span> {t('마스터 자격증 취득 → 강사 양성, 기관 협력', 'Master Certification -> Instructor training, institutional cooperation')}
                </p>
                <button onClick={() => { setSelectedCert('마스터'); setShowCertModal(true); }} className="w-full py-3 rounded-full border border-purple-200 dark:border-white/30 text-purple-600 dark:text-white hover:bg-purple-600 hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors text-sm font-medium">{t('자세히 보기', 'View Details')}</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Career Section */}
      <div className="py-24 bg-white dark:bg-[#1a1a1a] border-b border-black/5 dark:border-white/10 transition-colors duration-300 snap-start">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-black dark:text-white mb-4">{t('취득 후 활용 방안', 'Career Opportunities After Certification')}</h2>
            <p className="text-gray-600 dark:text-gray-400">{t('자격증 취득 후 다양한 분야에서 전문가로 활동할 수 있습니다.', 'After obtaining the certification, you can work as an expert in various fields.')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. 강사 활동 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gray-50 dark:bg-[#121212] p-8 border border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20 transition-colors rounded-xl"
            >
              <div className="w-12 h-12 bg-black/5 dark:bg-white/5 rounded-full flex items-center justify-center mb-6">
                <BookOpen className="w-6 h-6 text-black dark:text-white" />
              </div>
              <h3 className="text-xl font-bold text-black dark:text-white mb-4">{t('1. 강사 활동', '1. Instructor Activities')}</h3>
              <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-2">
                <li>• {t('문화센터, 평생교육원, 도서관 정규 강좌', 'Regular courses at cultural centers, lifelong education centers, and libraries')}</li>
                <li>• {t('초·중·고등학교 및 방과후 프로그램 출강', 'Lectures at elementary, middle, and high schools and after-school programs')}</li>
                <li>• {t('지자체·기관 주관 교육 프로그램 참여', 'Participation in educational programs hosted by local governments and institutions')}</li>
                <li>• {t('원데이 클래스, 온라인 강좌 개설', 'Opening one-day classes and online courses')}</li>
              </ul>
            </motion.div>
            
            {/* 2. 체험 프로그램 운영 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-50 dark:bg-[#121212] p-8 border border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20 transition-colors rounded-xl"
            >
              <div className="w-12 h-12 bg-black/5 dark:bg-white/5 rounded-full flex items-center justify-center mb-6">
                <Stamp className="w-6 h-6 text-black dark:text-white" />
              </div>
              <h3 className="text-xl font-bold text-black dark:text-white mb-4">{t('2. 체험 프로그램 운영', '2. Experience Program Operation')}</h3>
              <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-2">
                <li>• {t('플리마켓, 박람회, 축제 체험 부스 운영', 'Operating experience booths at flea markets, fairs, and festivals')}</li>
                <li>• {t('키즈카페, 미술학원 연계 클래스 진행', 'Conducting classes linked with kids cafes and art academies')}</li>
                <li>• {t('기업 워크숍, 가족 체험 행사 기획', 'Planning corporate workshops and family experience events')}</li>
                <li>• {t('교육기관/기관 행사 창의 체험 제공', 'Providing creative experiences for educational institutions/events')}</li>
              </ul>
            </motion.div>
            
            {/* 3. 창업 및 비즈니스 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gray-50 dark:bg-[#121212] p-8 border border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20 transition-colors rounded-xl"
            >
              <div className="w-12 h-12 bg-black/5 dark:bg-white/5 rounded-full flex items-center justify-center mb-6">
                <Briefcase className="w-6 h-6 text-black dark:text-white" />
              </div>
              <h3 className="text-xl font-bold text-black dark:text-white mb-4">{t('3. 창업 및 비즈니스', '3. Startup and Business')}</h3>
              <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-2">
                <li>• {t('스탬프 전문 공방 창업 (제작+클래스)', 'Starting a specialized stamp workshop (production + classes)')}</li>
                <li>• {t('온라인 스토어 맞춤 스탬프 판매', 'Selling custom stamps on online stores')}</li>
                <li>• {t('소상공인 대상 브랜딩·포장용 맞춤 제작', 'Custom production for branding and packaging for small business owners')}</li>
                <li>• {t('공예·디자인 상품 결합 부가가치 창출', 'Creating added value by combining craft and design products')}</li>
              </ul>
            </motion.div>
            
            {/* 4. 브랜딩·디자인 활용 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gray-50 dark:bg-[#121212] p-8 border border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20 transition-colors rounded-xl"
            >
              <div className="w-12 h-12 bg-black/5 dark:bg-white/5 rounded-full flex items-center justify-center mb-6">
                <Award className="w-6 h-6 text-black dark:text-white" />
              </div>
              <h3 className="text-xl font-bold text-black dark:text-white mb-4">{t('4. 브랜딩·디자인 활용', '4. Branding and Design Utilization')}</h3>
              <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-2">
                <li>• {t('스탬프를 활용한 로고·패키지 디자인', 'Logo and package design using stamps')}</li>
                <li>• {t('소상공인·작은 브랜드 브랜딩 컨설팅', 'Branding consulting for small business owners and small brands')}</li>
                <li>• {t('문구, 엽서, 굿즈 제작 활용', 'Utilization in the production of stationery, postcards, and goods')}</li>
              </ul>
            </motion.div>
            
            {/* 5. 전문가 및 교육자 과정 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-gray-50 dark:bg-[#121212] p-8 border border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20 transition-colors rounded-xl md:col-span-2 lg:col-span-1"
            >
              <div className="w-12 h-12 bg-black/5 dark:bg-white/5 rounded-full flex items-center justify-center mb-6">
                <Award className="w-6 h-6 text-black dark:text-white" />
              </div>
              <h3 className="text-xl font-bold text-black dark:text-white mb-4">{t('5. 전문가 및 교육자 과정', '5. Expert and Educator Courses')}</h3>
              <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-2">
                <li>• {t('후배 강사 양성 및 멘토링', 'Training and mentoring junior instructors')}</li>
                <li>• {t('교육 커리큘럼 개발 참여', 'Participation in educational curriculum development')}</li>
                <li>• {t('기업·기관 대상 맞춤형 프로그램 기획', 'Planning customized programs for companies and institutions')}</li>
                <li>• {t('스탬프 매개 예술·공예 프로젝트 진행', 'Conducting stamp-mediated art and craft projects')}</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Exam & Application Section */}
      <div className="bg-gray-50 dark:bg-[#121212] py-24 transition-colors duration-300 snap-start" id="exam">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Left: Exam Info */}
            <div>
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-black/10 dark:border-white/10">
                <Video className="w-6 h-6 text-gray-600 dark:text-white/70" />
                <h3 className="text-2xl font-serif font-bold text-black dark:text-white">{t('시험 안내', 'Exam Information')}</h3>
              </div>
              
              <div className="space-y-8">
                <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-lg border border-black/5 dark:border-white/5 shadow-sm">
                  <h4 className="text-lg font-bold text-black dark:text-white mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400"></span>
                    {t('포트폴리오 제출', 'Portfolio Submission')}
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex gap-4">
                      <span className="text-black dark:text-white font-medium w-12 shrink-0">{t('2급', 'Level 2')}</span>
                      <span className="text-gray-600 dark:text-gray-400">{t('제작 스탬프 5종 + 손글씨 활동지', '5 types of custom stamps + handwriting activity sheet')}</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-black dark:text-white font-medium w-12 shrink-0">{t('1급', 'Level 1')}</span>
                      <span className="text-gray-600 dark:text-gray-400">{t('제작 스탬프 10종 + 강의 커리큘럼 기획안', '10 types of custom stamps + lecture curriculum proposal')}</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-black dark:text-white font-medium w-12 shrink-0">{t('마스터', 'Master')}</span>
                      <span className="text-gray-600 dark:text-gray-400">{t('제작 스탬프 15종 + 강의 커리큘럼 기획안', '15 types of custom stamps + lecture curriculum proposal')}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-lg border border-black/5 dark:border-white/5 shadow-sm">
                  <h4 className="text-lg font-bold text-black dark:text-white mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 dark:bg-green-400"></span>
                    {t('영상 실기시험', 'Video Practical Exam')} <span className="text-xs font-normal text-gray-500 ml-2">{t('(온라인 응시 가능)', '(Online application available)')}</span>
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li className="flex gap-2"><span className="text-black/30 dark:text-white/30">•</span> {t('지정된 주제에 따른 스탬프 제작 과정 촬영 및 제출', 'Filming and submitting the stamp making process according to the designated theme')}</li>
                    <li className="flex gap-2"><span className="text-black/30 dark:text-white/30">•</span> {t('촬영 시 얼굴·작업 과정이 명확히 확인되어야 함', 'Face and work process must be clearly visible during filming')}</li>
                    <li className="flex gap-2"><span className="text-black/30 dark:text-white/30">•</span> {t('제출된 영상은 평가위원의 채점 기준에 따라 심사', 'Submitted videos are judged according to the evaluation criteria of the evaluation committee')}</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Right: Application Info */}
            <div>
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-black/10 dark:border-white/10">
                <FileText className="w-6 h-6 text-gray-600 dark:text-white/70" />
                <h3 className="text-2xl font-serif font-bold text-black dark:text-white">{t('접수 방법', 'How to Apply')}</h3>
              </div>
              
              <div className="space-y-8">
                <div className="relative">
                  <div className="absolute left-[15px] top-8 bottom-4 w-[1px] bg-black/10 dark:bg-white/10"></div>
                  <div className="space-y-6">
                    <div className="relative pl-10">
                      <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-gray-100 dark:bg-[#1a1a1a] border border-black/20 dark:border-white/20 flex items-center justify-center text-xs font-bold text-black dark:text-white">1</div>
                      <h4 className="text-black dark:text-white font-medium mb-1">{t('온라인 신청서 작성', 'Fill out online application')}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{t('네이버폼 또는 홈페이지를 통해 접수합니다.', 'Apply via Naver Form or the website.')}</p>
                    </div>
                    <div className="relative pl-10">
                      <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-gray-100 dark:bg-[#1a1a1a] border border-black/20 dark:border-white/20 flex items-center justify-center text-xs font-bold text-black dark:text-white">2</div>
                      <h4 className="text-black dark:text-white font-medium mb-1">{t('응시료 입금', 'Deposit application fee')}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{t('등급별 안내된 계좌로 응시료를 입금합니다.', 'Deposit the application fee to the account provided for each level.')}</p>
                    </div>
                    <div className="relative pl-10">
                      <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-gray-100 dark:bg-[#1a1a1a] border border-black/20 dark:border-white/20 flex items-center justify-center text-xs font-bold text-black dark:text-white">3</div>
                      <h4 className="text-black dark:text-white font-medium mb-1">{t('접수 확인', 'Confirm application')}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{t('접수 확인 문자 및 이메일이 발송됩니다.', 'A confirmation text message and email will be sent.')}</p>
                    </div>
                    <div className="relative pl-10">
                      <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-gray-100 dark:bg-[#1a1a1a] border border-black/20 dark:border-white/20 flex items-center justify-center text-xs font-bold text-black dark:text-white">4</div>
                      <h4 className="text-black dark:text-white font-medium mb-1">{t('시험 진행', 'Take the exam')}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{t('포트폴리오 및 영상 제출 후 심사가 진행됩니다.', 'Evaluation will proceed after submitting the portfolio and video.')}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-black/5 dark:bg-white/5 p-6 rounded-lg mt-8">
                  <h4 className="text-black dark:text-white font-medium mb-3">{t('필요 서류', 'Required Documents')}</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-black/50 dark:bg-white/50 rounded-full"></div> {t('응시 신청서 (온라인 작성)', 'Application form (filled out online)')}</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-black/50 dark:bg-white/50 rounded-full"></div> {t('신분증 사본 (본인 확인용)', 'Copy of ID card (for identity verification)')}</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-black/50 dark:bg-white/50 rounded-full"></div> {t('포트폴리오 파일 및 영상 링크', 'Portfolio file and video link')}</li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <a href="https://form.naver.com/response/rVGLmuWiizZP0ebTi2CbNQ" target="_blank" rel="noopener noreferrer" className="flex-1 py-3 px-4 bg-green-500 hover:bg-green-600 text-white dark:bg-[#1a1a1a] dark:text-green-400 dark:hover:bg-[#2a2a2a] dark:border dark:border-green-500/30 text-center rounded-lg font-bold transition-colors shadow-md">
                    {t('네이버폼 접수하기', 'Apply via Naver Form')}
                  </a>
                  <button onClick={() => setShowApplyModal(true)} className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white dark:bg-[#1a1a1a] dark:text-blue-400 dark:hover:bg-[#2a2a2a] dark:border dark:border-blue-500/30 text-center rounded-lg font-bold transition-colors shadow-md">
                    {t('홈페이지 접수하기', 'Apply via Website')}
                  </button>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-24 bg-white dark:bg-[#1a1a1a] border-b border-black/5 dark:border-white/10 transition-colors duration-300 snap-start" id="faq">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-black dark:text-white mb-4">{t('자주 묻는 질문', 'Frequently Asked Questions')}</h2>
          </div>
          <div className="space-y-4">
            {[
              {
                q: t('자격증 취득 후 바로 강사로 활동할 수 있나요?', 'Can I work as an instructor immediately after obtaining the certification?'),
                a: t('1급 또는 마스터 자격증을 취득하시면 방과후 학교, 문화센터 등에서 강사로 활동하실 수 있는 자격이 주어집니다. 진흥원에서도 우수 수료자에게 출강 기회를 연결해 드리고 있습니다.', 'If you obtain a Level 1 or Master certification, you will be qualified to work as an instructor at after-school programs, cultural centers, etc. The Institute also connects excellent graduates with teaching opportunities.')
              },
              {
                q: t('온라인으로도 시험 응시가 가능한가요?', 'Is it possible to take the exam online?'),
                a: t('네, 포트폴리오 우편 제출 및 지정된 주제의 스탬프 제작 과정을 담은 영상 제출을 통해 온라인(비대면)으로도 충분히 응시 및 자격 취득이 가능합니다.', 'Yes, you can fully apply and obtain the certification online (non-face-to-face) by submitting your portfolio by mail and a video showing the stamp making process on a designated topic.')
              },
              {
                q: t('수강료 결제는 어떻게 하나요?', 'How do I pay the tuition fee?'),
                a: t('무통장 입금, 계좌이체 등을 통해 결제하실 수 있으며, 현금영수증 및 세금계산서 발행이 가능합니다. 자세한 계좌 정보는 접수 페이지를 참고해 주세요.', 'You can pay via bank transfer, etc., and cash receipts and tax invoices can be issued. Please refer to the application page for detailed account information.')
              }
            ].map((faq, index) => (
              <div key={index} className="border border-black/10 dark:border-white/10 rounded-xl overflow-hidden bg-gray-50 dark:bg-[#121212] transition-colors">
                <button 
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex justify-between items-center p-6 text-left hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <span className="font-bold text-black dark:text-white pr-8">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-500 shrink-0 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="p-6 pt-6 text-gray-600 dark:text-gray-400 text-sm leading-relaxed border-t border-black/5 dark:border-white/5 mt-0">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-[#0a0a0a] border-t border-black/10 dark:border-white/10 py-12 transition-colors duration-300 snap-start">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div className="mb-8 md:mb-0">
              <h2 className="text-xl font-serif font-bold text-black dark:text-white mb-4 flex items-center gap-2">
                <img src={`${import.meta.env.BASE_URL}img/Logo.png`} alt="한국스탬프교육진흥원 로고" className="h-6 object-contain" />
                {t('한국스탬프교육진흥원', 'Korea Stamp Education Institute')}
              </h2>
              <div className="flex gap-4 text-xs text-gray-600 dark:text-gray-400">
                <button onClick={() => setShowPrivacyModal(true)} className="hover:text-black dark:hover:text-white border border-gray-300 dark:border-gray-700 px-3 py-1 rounded-full transition-colors">{t('개인정보처리방침', 'Privacy Policy')}</button>
                <button onClick={() => setShowTermsModal(true)} className="hover:text-black dark:hover:text-white border border-gray-300 dark:border-gray-700 px-3 py-1 rounded-full transition-colors">{t('이용약관', 'Terms of Service')}</button>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm w-full md:w-auto">
              <div>
                <h4 className="text-black dark:text-white font-medium mb-3">{t('기관소개', 'About Us')}</h4>
                <ul className="text-gray-600 dark:text-gray-500 space-y-2">
                  <li><button onClick={() => scrollTo('about')} className="hover:text-black dark:hover:text-white">{t('설립 목적', 'Purpose')}</button></li>
                  <li><button onClick={() => scrollTo('about')} className="hover:text-black dark:hover:text-white">{t('주요 활동', 'Activities')}</button></li>
                </ul>
              </div>
              <div>
                <h4 className="text-black dark:text-white font-medium mb-3">{t('자격증안내', 'Certification')}</h4>
                <ul className="text-gray-600 dark:text-gray-500 space-y-2">
                  <li><button onClick={() => scrollTo('cert')} className="hover:text-black dark:hover:text-white">{t('2급 (기초)', 'Level 2 (Basic)')}</button></li>
                  <li><button onClick={() => scrollTo('cert')} className="hover:text-black dark:hover:text-white">{t('1급 (심화)', 'Level 1 (Advanced)')}</button></li>
                  <li><button onClick={() => scrollTo('cert')} className="hover:text-black dark:hover:text-white">{t('마스터 (전문가)', 'Master (Expert)')}</button></li>
                </ul>
              </div>
              <div>
                <h4 className="text-black dark:text-white font-medium mb-3">{t('시험안내', 'Exam Info')}</h4>
                <ul className="text-gray-600 dark:text-gray-500 space-y-2">
                  <li><button onClick={() => scrollTo('exam')} className="hover:text-black dark:hover:text-white">{t('포트폴리오', 'Portfolio')}</button></li>
                  <li><button onClick={() => scrollTo('exam')} className="hover:text-black dark:hover:text-white">{t('영상실기', 'Video Practical')}</button></li>
                </ul>
              </div>
              <div>
                <h4 className="text-black dark:text-white font-medium mb-3">{t('접수방법', 'How to Apply')}</h4>
                <ul className="text-gray-600 dark:text-gray-500 space-y-2">
                  <li><button onClick={() => scrollTo('exam')} className="hover:text-black dark:hover:text-white">{t('신청 절차', 'Application Process')}</button></li>
                  <li><button onClick={() => scrollTo('exam')} className="hover:text-black dark:hover:text-white">{t('필요 서류', 'Required Documents')}</button></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-black/10 dark:border-white/10 pt-8 text-xs text-gray-500 space-y-2 flex flex-col md:flex-row justify-between">
            <div>
              <div className="mb-2 space-y-1">
                <p>{t('주소: 대전광역시 서구 갈마역로 155', 'Address: 155 Galma-yeok-ro, Seo-gu, Daejeon')}</p>
                <p>{t('대표전화: 010-8409-2802', 'Phone: 010-8409-2802')}</p>
                <p>{t('이메일: ksei2025@naver.com', 'Email: ksei2025@naver.com')}</p>
              </div>
              <p>{t('Copyright © 2025 한국스탬프교육진흥원, All Rights Reserved', 'Copyright © 2025 Korea Stamp Education Institute, All Rights Reserved')}</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-black text-white dark:bg-white dark:text-black rounded-full shadow-lg hover:scale-110 transition-transform z-50"
          aria-label="최상단으로 이동"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}

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
              <p>{t('진흥원은 다음의 개인정보 항목을 처리하고 있습니다.', 'The Institute processes the following personal information items.')}<br/>{t('- 성명, 주민등록번호, 주소, 전화번호, 이메일주소 등', '- Name, date of birth, address, phone number, email address, etc.')}</p>
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
            <div className="p-6 border-b border-black/10 dark:border-white/10 flex justify-between items-center shrink-0">
              <h3 className="text-xl font-bold text-black dark:text-white">{selectedCert} {t('자격증 상세 안내', 'Certification Details')}</h3>
              <button onClick={() => setShowCertModal(false)} className="text-gray-500 hover:text-black dark:hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto text-sm text-gray-600 dark:text-gray-300 space-y-4">
              <p>{t('자격증 상세 설명이 들어갈 자리입니다. 이 부분은 추후 상세 내용으로 업데이트 될 예정입니다.', 'This is where the detailed description of the certification will go. This section will be updated with detailed content later.')}</p>
            </div>
            <div className="p-6 border-t border-black/10 dark:border-white/10 shrink-0 flex justify-end">
              <button onClick={() => setShowCertModal(false)} className="px-6 py-2 bg-black text-white dark:bg-white dark:text-black rounded-lg font-bold">{t('닫기', 'Close')}</button>
            </div>
          </div>
        </div>
      )}

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-black/10 dark:border-white/10 flex justify-between items-center shrink-0">
              <h3 className="text-xl font-bold text-black dark:text-white">{t('홈페이지 접수하기', 'Apply via Website')}</h3>
              <button onClick={() => setShowApplyModal(false)} className="text-gray-500 hover:text-black dark:hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto custom-scrollbar text-sm text-gray-600 dark:text-gray-300 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-black dark:text-white mb-1">
                    {t('성함', 'Name')} {formErrors.name && <span className="text-red-500 font-normal ml-2">{formErrors.name}</span>}
                  </label>
                  <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#2a2a2a] text-black dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder={t('성함을 입력해주세요', 'Please enter your name')} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-black dark:text-white mb-1">
                    {t('주민등록번호', 'Resident Registration Number')} {formErrors.idNumber && <span className="text-red-500 font-normal ml-2">{formErrors.idNumber}</span>}
                  </label>
                  <input type="text" value={formData.idNumber} onChange={e => setFormData({...formData, idNumber: e.target.value})} className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#2a2a2a] text-black dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder="ex. 123456-7891111" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-black dark:text-white mb-1">
                    {t('연락처', 'Contact Number')} {formErrors.phone && <span className="text-red-500 font-normal ml-2">{formErrors.phone}</span>}
                  </label>
                  <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#2a2a2a] text-black dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder={t('연락처를 입력해주세요', 'Please enter your contact number')} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-black dark:text-white mb-1">
                    {t('이메일주소', 'Email Address')} {formErrors.email && <span className="text-red-500 font-normal ml-2">{formErrors.email}</span>}
                  </label>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{t('검정 관련 세부 안내를 받을 수 있는 이메일 주소를 적어 주세요.', 'Please enter an email address where you can receive detailed information about the exam.')}</p>
                  <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#2a2a2a] text-black dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder={t('이메일을 입력해주세요', 'Please enter your email')} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-black dark:text-white mb-1">
                    {t('주소', 'Address')} {formErrors.address && <span className="text-red-500 font-normal ml-2">{formErrors.address}</span>}
                  </label>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{t('자격증 원본 및 포트폴리오 스탬프를 수령 할 주소를 적어 주세요.', 'Please enter the address to receive the original certificate and portfolio stamps.')}</p>
                  <input type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#2a2a2a] text-black dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder={t('주소를 입력해주세요', 'Please enter your address')} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-black dark:text-white mb-1">
                    {t('응시등급선택 (복수 선택 가능)', 'Select Exam Level (Multiple selections possible)')} {formErrors.levels && <span className="text-red-500 font-normal ml-2">{formErrors.levels}</span>}
                  </label>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 whitespace-pre-wrap">{t('1급과 2급을 동시 응시 하시는 경우, 2급은 \'검정료+자격증발급비\'의 50%만 납부하시면 됩니다.\n수강생할인 적용시 1급 15만원 + 2급 5만원 = 합계 20만원', 'If you take Level 1 and Level 2 at the same time, you only need to pay 50% of the \'exam fee + certificate issuance fee\' for Level 2.\nWhen student discount is applied: Level 1 150,000 won + Level 2 50,000 won = Total 200,000 won')}</p>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={formData.levels.includes('1급')} onChange={(e) => {
                        const newLevels = e.target.checked ? [...formData.levels, '1급'] : formData.levels.filter(l => l !== '1급');
                        setFormData({...formData, levels: newLevels});
                      }} className="w-4 h-4 text-blue-600 rounded border-gray-300" />
                      <span>{t('스탬프제작지도사 1급(검정료 30만원 -> 이벤트 할인가 15만원)', 'Stamp Making Instructor Level 1 (Exam fee 300,000 won -> Event discount price 150,000 won)')}</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={formData.levels.includes('2급')} onChange={(e) => {
                        const newLevels = e.target.checked ? [...formData.levels, '2급'] : formData.levels.filter(l => l !== '2급');
                        setFormData({...formData, levels: newLevels});
                      }} className="w-4 h-4 text-blue-600 rounded border-gray-300" />
                      <span>{t('스탬프제작지도사 2급(검정료 20만원 -> 이벤트 할인가 10만원)', 'Stamp Making Instructor Level 2 (Exam fee 200,000 won -> Event discount price 100,000 won)')}</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-black dark:text-white mb-1">
                    {t('입금자명', 'Payer Name')} {formErrors.payerName && <span className="text-red-500 font-normal ml-2">{formErrors.payerName}</span>}
                  </label>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{t('송금자 성함을 기재 해 주세요. (응시료 납부 완료 후, 안내 메일이 발송됩니다.)', 'Please enter the remitter\'s name. (A guide email will be sent after the exam fee payment is completed.)')}<br/>{t('농협 351-1372-1557-33 (한국스탬프교육진흥원)', 'Nonghyup 351-1372-1557-33 (Korea Stamp Education Institute)')}</p>
                  <input type="text" value={formData.payerName} onChange={e => setFormData({...formData, payerName: e.target.value})} className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#2a2a2a] text-black dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder={t('송금자 성함', 'Remitter\'s name')} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-black dark:text-white mb-1">
                    {t('입금시간', 'Deposit Time')} {formErrors.depositTime && <span className="text-red-500 font-normal ml-2">{formErrors.depositTime}</span>}
                  </label>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{t('이체 날짜 및 시간을 기재 해 주세요.', 'Please enter the transfer date and time.')}</p>
                  <input type="text" value={formData.depositTime} onChange={e => setFormData({...formData, depositTime: e.target.value})} className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#2a2a2a] text-black dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder={t('이체 날짜 및 시간 (예: 2024-05-20 14:30)', 'Transfer date and time (e.g., 2024-05-20 14:30)')} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-black dark:text-white mb-1">
                    {t('응시료 현금영수증/세금계산서 발행 정보', 'Cash Receipt/Tax Invoice Issuance Information')} {formErrors.receiptInfo && <span className="text-red-500 font-normal ml-2">{formErrors.receiptInfo}</span>}
                  </label>
                  <input type="text" value={formData.receiptInfo} onChange={e => setFormData({...formData, receiptInfo: e.target.value})} className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#2a2a2a] text-black dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder={t('발행 정보를 입력해주세요', 'Please enter issuance information')} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-black dark:text-white mb-1">
                    {t('검정방식선택', 'Select Exam Method')} {formErrors.examMethod && <span className="text-red-500 font-normal ml-2">{formErrors.examMethod}</span>}
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="method" checked={formData.examMethod === '우편'} onChange={() => setFormData({...formData, examMethod: '우편'})} className="w-4 h-4 text-blue-600" />
                      <span>{t('우편 포트폴리오 & 영상 제출', 'Mail Portfolio & Video Submission')}</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="method" checked={formData.examMethod === '현장'} onChange={() => setFormData({...formData, examMethod: '현장'})} className="w-4 h-4 text-blue-600" />
                      <span>{t('현장 포트폴리오 제출 & 현장 검정 진행(현장검정비 5만원 추가)', 'On-site Portfolio Submission & On-site Exam (Additional 50,000 won for on-site exam)')}</span>
                    </label>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-[#2a2a2a] p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <label className="block text-sm font-bold text-black dark:text-white mb-1">
                    {t('개인정보 수집 및 이용동의', 'Consent to Collection and Use of Personal Information')} {formErrors.agreePrivacy && <span className="text-red-500 font-normal ml-2">{formErrors.agreePrivacy}</span>}
                  </label>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">{t('동의를 거부하실 수 있으나 설문 참여가 불가능합니다.', 'You may refuse to consent, but you will not be able to participate in the survey.')}</p>
                  <div className="text-xs text-gray-600 dark:text-gray-400 space-y-2 mb-4 bg-white dark:bg-[#1e1e1e] p-3 rounded border border-gray-200 dark:border-gray-700 h-32 overflow-y-auto">
                    <p><strong>{t('수집하는 개인정보 항목', 'Items of Personal Information Collected')}</strong><br/>{t('이름, 연락처, 이메일, 주소', 'Name, Contact Number, Email, Address')}</p>
                    <p><strong>{t('수집 및 이용 목적', 'Purpose of Collection and Use')}</strong><br/>{t('한국스탬프교육진흥원 교육과정 운영 및 공지사항 안내, 스탬프제작지도사 자격검정시험 관련 내용 등', 'Operation of Korea Stamp Education Institute curriculum and notice guidance, contents related to Stamp Making Instructor qualification exam, etc.')}</p>
                    <p><strong>{t('보유 및 이용기간', 'Retention and Use Period')}</strong><br/>{t('동의일로부터 3년간', '3 years from the date of consent')}</p>
                  </div>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={formData.agreePrivacy} onChange={e => setFormData({...formData, agreePrivacy: e.target.checked})} className="w-4 h-4 text-blue-600 rounded border-gray-300" />
                    <span className="font-bold text-black dark:text-white">{t('개인정보 수집 및 이용에 동의합니다.', 'I agree to the collection and use of personal information.')}</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-black/10 dark:border-white/10 shrink-0 flex justify-end gap-3">
              <button onClick={() => setShowApplyModal(false)} className="px-6 py-2 bg-gray-200 text-black dark:bg-[#2a2a2a] dark:text-white rounded-lg font-bold hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors">{t('취소', 'Cancel')}</button>
              <button onClick={handleApplySubmit} disabled={isSubmitting} className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">{isSubmitting ? t('접수 중...', 'Submitting...') : t('접수하기', 'Apply')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

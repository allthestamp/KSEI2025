import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, Search, MessageCircle, Phone, Mail, X, MapPin, ExternalLink } from 'lucide-react';

interface FaqItem {
  question: string;
  questionEn: string;
  answer: string;
  answerEn: string;
  category: string;
  images?: string[];
}

const faqs: FaqItem[] = [
  {
    category: "자격증 발급",
    question: "정식으로 허가된 자격증인가요?",
    questionEn: "Is it an officially licensed certificate?",
    answer: "한국스탬프교육진흥원에서 발급하는 모든 자격증은 민간자격 등록법에 의거하여 정식 등록된 자격증입니다. 공신력 있는 자격증으로서 교육 현장 및 취업 시 활용이 가능합니다.",
    answerEn: "All certificates issued by the Korea Stamp Education Institute are officially registered in accordance with the Private Qualification Registration Act. As a credible certificate, it can be used in educational fields and for employment.",
    images: [
      'https://i.ibb.co/G43639Hq/1773106303264-9f665cd2-a080-4f8d-8360-12683a80e597-1.png',
      'https://i.ibb.co/kV3nWHL8/1773106303264-9f665cd2-a080-4f8d-8360-12683a80e597-2.png'
    ]
  },
  {
    category: "자격증 발급",
    question: "자격증 취득 후 바로 강사로 활동할 수 있나요?",
    questionEn: "Can I work as an instructor immediately after obtaining the certificate?",
    answer: "네, 자격증 취득 후 협회에서 제공하는 강사 지원 프로그램을 통해 바로 활동이 가능합니다. 협회 네트워크를 통한 강의 연결 및 커리큘럼 공유 등 전폭적인 지원을 아끼지 않습니다.",
    answerEn: "Yes, you can start working immediately through the instructor support program provided by the association after obtaining the certificate. We provide full support, including lecture connections and curriculum sharing through the association network."
  },
  {
    category: "시험/접수",
    question: "온라인으로도 시험 응시가 가능한가요?",
    questionEn: "Can I take the exam online?",
    answer: "현재 온라인 시험을 운영 중입니다. 자세한 안내는 시험/접수 안내 - 필요 서류 체크리스트 - 온라인 실기 안내문 및 평가표를 확인해주세요.",
    answerEn: "We are currently conducting the exam online. Please refer to Exam/Application Information → Required Documents Checklist → Online Practical Exam Guide and Evaluation Criteria for detailed instructions."
  },
    {
    category: "시험/접수",
    question: "자격증 응시 시 사용해야 하는 스탬프 제품이 별도로 지정되어 있나요?",
    questionEn: "Is there a specific stamp product required for the certification exam?",
    answer: "아니요. 스탬프 제품은 별도로 지정되어 있지 않으며, 포트폴리오 스탬프 기준에 맞춰 자유롭게 선택하여 사용하실 수 있습니다. 제품 선택에 어려움이 있으신 경우, 협업 업체에서 판매 중인 스탬프 키트를 참고해 주시기 바랍니다. 관련 제품은 아래 링크에서 확인하실 수 있습니다. \n https://mkt.shopping.naver.com/link/69d31b60c81d717af867bbc3",
    answerEn: "No, there is no designated stamp product required for the certification exam. You may freely select a product that meets the portfolio stamp requirements. If you are unsure which product to choose, you may refer to the stamp kit provided by our partner company. Please see the link below for more details: \n https://mkt.shopping.naver.com/link/69d31b60c81d717af867bbc3"
  },
  {
    category: "결제/환불",
    question: "수강료 결제는 어떻게 하나요?",
    questionEn: "How do I pay the tuition fee?",
    answer: "현재 무통장 입금 혹은 계좌이체를 지원하고 있으며, 현금영수증 발행도 가능합니다.",
    answerEn: "We support bank transfer (manual deposit or account transfer), and cash receipt issuance is available."
  },
  {
    category: "자격증 발급",
    question: "자격증을 분실했는데 재발급이 가능한가요?",
    questionEn: "I lost my certificate. Can it be reissued?",
    answer: "네, 본인 확인 절차 후 소정의 재발급 수수료를 결제하시면 영업일 기준 3~5일 이내에 발송됩니다.",
    answerEn: "Yes, After verifying your identity and paying a small reissuance fee, it will be sent within 3-5 business days."
  },
  {
    category: "자격증 발급",
    question: "모바일 자격증도 발급되나요?",
    questionEn: "Is a mobile certificate also issued?",
    answer: "아니오. 모바일 자격증은 현재 발급 예정이 없습니다. 현재 실물 자격증만 제공되고 있으며, 추후 모바일 자격증 추가 시 별도 공지를 통해 안내드리겠습니다.",
    answerEn: "Yes, along with the physical certificate card, we basically provide a digital certificate that can be checked at any time on mobile. You can check it on the association app or My Page on the website."
  },
  {
    category: "자격증 발급",
    question: "단체 발급 신청도 가능한가요?",
    questionEn: "Is it possible to apply for group issuance?",
    answer: "학교, 기업, 지자체 등 10인 이상의 단체 발급의 경우 별도의 단체 신청 양식을 통해 접수 가능하며, 인원에 따라 발급 수수료 할인 혜택이 제공됩니다.",
    answerEn: "For group issuance of 10 or more people from schools, companies, local governments, etc., applications can be submitted through a separate group application form, and a discount on the issuance fee is provided depending on the number of people."
  },
  {
    category: "시험/접수",
    question: "비전공자도 응시가 가능한가요?",
    questionEn: "Can non-majors also apply?",
    answer: "네, 스탬프 교육에 관심 있는 분이라면 전공에 상관없이 누구나 응시 가능합니다. 체계적인 입문 과정을 통해 비전공자분들도 충분히 전문가로 성장하실 수 있습니다.",
    answerEn: "Yes, anyone interested in stamp education can apply regardless of their major. Through a systematic introductory course, even non-majors can grow into experts."
  },
  {
    category: "시험/접수",
    question: "시험 결과는 언제 발표되나요?",
    questionEn: "When will the exam results be announced?",
    answer: "실기 시험의 경우 채점 과정을 거쳐 응시일로부터 14일 이내에 개별 연락을 통해 발표됩니다.",
    answerEn: "Written exam results can be checked on the same day. Practical exam results are announced within 14 days from the test date through website notices and individual contact after the grading process."
  },
  {
    category: "시험/접수",
    question: "불합격 시 재응시가 가능한가요?",
    questionEn: "Can I retake the exam if I fail?",
    answer: "네, 불합격 시 다음 회차 시험에 바로 재응시가 가능합니다. 불합격 후 1년 이내 재응시 시 1회에 한해 응시료의 50%를 감면해 드리는 혜택이 있습니다.",
    answerEn: "Yes, if you fail, you can retake the exam immediately in the next session. If you retake the exam within one year after failing, you will receive a 50% discount on the exam fee for one time."
  },
  {
    category: "결제/환불",
    question: "응시료 환불 규정은 어떻게 되나요?",
    questionEn: "What is the refund policy for the exam fee?",
    answer: "접수 마감 7일 전까지는 100% 환불이 가능합니다. 접수 마감 3일 전까지는 50% 환불, 그 이후에는 환불이 불가하오니 일정을 신중히 확인해 주시기 바랍니다.",
    answerEn: "A 100% refund is possible up to 7 days before the application deadline. A 50% refund is possible up to 3 days before the deadline, and no refunds are possible after that, so please check your schedule carefully."
  }
];

interface Props {
  t: (ko: string, en: string) => string;
  isMobile?: boolean;
}

const FaqPage: React.FC<Props> = ({ t, isMobile }) => {
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const categories = ["전체", "자격증 발급", "시험/접수", "결제/환불"];

  const filteredFaqs = faqs.filter(faq => {
    return selectedCategory === "전체" || faq.category === selectedCategory;
  });

  // Reset active question when filters change
  React.useEffect(() => {
    setActiveQuestion(null);
  }, [selectedCategory]);

  return (
    <div className="bg-white dark:bg-[#0a0a0a] min-h-screen transition-colors duration-500">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-[1px] w-12 bg-black dark:bg-white" />
              <span className="text-[11px] font-bold tracking-[0.4em] uppercase text-black dark:text-white">FAQ</span>
              <div className="h-[1px] w-12 bg-black dark:bg-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-sans font-medium text-black dark:text-white tracking-tighter mb-8 leading-[1.1]">
              {t('자주 묻는 질문', 'Frequently Asked Questions')}
            </h1>
            <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 leading-relaxed font-light">
              {t('궁금하신 점을 빠르게 확인하실 수 있습니다.', 'Find answers to your questions quickly.')} <br className="hidden md:block" />
              {t('찾으시는 내용이 없다면 고객센터로 문의해 주세요.', 'If you cannot find what you are looking for, please contact customer support.')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content Section */}
      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter */}
          <div className="mb-16 flex justify-center">
            <div className="inline-flex bg-gray-100/50 dark:bg-white/5 p-1.5 rounded-full backdrop-blur-sm border border-black/5 dark:border-white/5 overflow-x-auto max-w-full scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`shrink-0 px-6 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-white dark:bg-[#222] text-black dark:text-white shadow-sm'
                      : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'
                  }`}
                >
                  {category === "전체" ? t("전체", "All") :
                   category === "자격증 발급" ? t("자격증 발급", "Certificate Issuance") :
                   category === "시험/접수" ? t("시험/접수", "Exam/Apply") :
                   category === "결제/환불" ? t("결제/환불", "Payment/Refund") : category}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group"
                >
                  <button
                    onClick={() => setActiveQuestion(activeQuestion === faq.question ? null : faq.question)}
                    className={`w-full text-left p-6 md:p-8 rounded-[2rem] border transition-all duration-500 ${
                      activeQuestion === faq.question
                        ? 'bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-500/30 shadow-sm'
                        : 'bg-white dark:bg-[#111] border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20 hover:bg-gray-50 dark:hover:bg-white/5'
                    }`}
                  >
                    <div className="flex justify-between items-center gap-6">
                      <div className="flex items-start gap-4 md:gap-6">
                        <span className={`text-xl font-sans font-medium mt-0.5 ${activeQuestion === faq.question ? 'text-emerald-500' : 'text-gray-400 dark:text-gray-500'}`}>Q.</span>
                        <span className={`text-lg md:text-xl font-sans font-medium leading-tight transition-colors duration-300 ${activeQuestion === faq.question ? 'text-emerald-600 dark:text-emerald-400' : 'text-black dark:text-white'}`}>
                          {t(faq.question, faq.questionEn)}
                        </span>
                      </div>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${activeQuestion === faq.question ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' : 'bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-gray-500 group-hover:bg-gray-200 dark:group-hover:bg-white/10'}`}>
                        <ChevronDown className={`w-5 h-5 transition-transform duration-500 ${activeQuestion === faq.question ? 'rotate-180' : ''}`} />
                      </div>
                    </div>
                    
                    <AnimatePresence>
                      {activeQuestion === faq.question && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pt-6 mt-6 border-t border-black/5 dark:border-white/5">
                            <div className="flex items-start gap-4 md:gap-6">
                              <span className="text-xl font-sans font-medium text-emerald-500 mt-0.5">A.</span>
                              <div className="text-gray-600 dark:text-gray-400 leading-relaxed text-base md:text-lg font-light">
                                {t(faq.answer, faq.answerEn)}
                                {faq.images && (
                                  <div className="flex flex-wrap gap-4 mt-8">
                                    {faq.images.map((img, i) => (
                                      <div 
                                        key={i} 
                                        className="relative group/img cursor-pointer"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setSelectedImage(img);
                                        }}
                                      >
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center pointer-events-none">
                                          <Search className="w-6 h-6 text-white" />
                                        </div>
                                        <img 
                                          src={img} 
                                          alt={`Reference ${i+1}`} 
                                          className="w-32 h-40 object-cover rounded-xl shadow-sm border border-black/5 dark:border-white/5"
                                        />
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-24 bg-gray-50 dark:bg-[#111] rounded-[2.5rem] border border-dashed border-black/10 dark:border-white/10">
                <MessageCircle className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400 font-medium">{t('검색 결과가 없습니다.', 'No results found.')}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Visit Us Section - Redesigned to match page style */}
      <section id="visit-us" className="py-24 bg-gray-50 dark:bg-[#050505] transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-black dark:bg-white" />
              <span className="text-[11px] font-bold tracking-[0.4em] uppercase text-black dark:text-white">CUSTOMER SUPPORT</span>
              <div className="h-[1px] w-12 bg-black dark:bg-white" />
            </div>
            <h3 className="text-3xl md:text-4xl font-sans font-medium text-black dark:text-white tracking-tighter">
              {t('고객센터 안내', 'Contact Us')}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Address Card */}
            <div className="bg-white dark:bg-[#111] p-10 md:p-12 rounded-[2.5rem] border border-black/5 dark:border-white/5 text-center group hover:border-emerald-500/30 hover:bg-emerald-50/30 dark:hover:bg-emerald-900/10 transition-all duration-500">
              <div className="w-16 h-16 bg-gray-50 dark:bg-white/5 text-black dark:text-white rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
                <MapPin className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-sans font-medium text-black dark:text-white mb-4 tracking-tight">{t('주소', 'Address')}</h4>
              <p className="text-gray-500 dark:text-gray-400 mb-2 font-light leading-relaxed">{t('대전광역시 서구 갈마역로 155', '155, Galma-yeok-ro, Seo-gu, Daejeon')}</p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mb-8 font-light">{t('(월평2동 행정복지센터 인근)', '(Near Wolpyeong 2-dong Community Center)')}</p>
              <a 
                href="https://map.naver.com/v5/search/%EB%8C%80%EC%A0%84%EA%B0%88%EB%A7%88%EC%97%AD%EB%A1%9C155/address/14178351.468305739,4348507.410123518,15,0,0,0,dh" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold tracking-wide text-black dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors uppercase"
              >
                {t('네이버 지도 열기', 'Open Naver Map')} <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Phone Card */}
            <div className="bg-white dark:bg-[#111] p-10 md:p-12 rounded-[2.5rem] border border-black/5 dark:border-white/5 text-center group hover:border-emerald-500/30 hover:bg-emerald-50/30 dark:hover:bg-emerald-900/10 transition-all duration-500">
              <div className="w-16 h-16 bg-gray-50 dark:bg-white/5 text-black dark:text-white rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
                <Phone className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-sans font-medium text-black dark:text-white mb-4 tracking-tight">{t('전화번호', 'Phone')}</h4>
              <p className="text-gray-500 dark:text-gray-400 mb-2 font-light leading-relaxed">010-8409-2802</p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mb-8 font-light">{t('평일 10:00 - 18:00 (주말 휴무)', 'Weekdays 10:00 - 18:00 (Closed on weekends)')}</p>
              <a 
                href="tel:010-8409-2802" 
                className="inline-flex items-center gap-2 text-sm font-bold tracking-wide text-black dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors uppercase"
              >
                {t('전화하기', 'Call Now')} <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Email Card */}
            <div className="bg-white dark:bg-[#111] p-10 md:p-12 rounded-[2.5rem] border border-black/5 dark:border-white/5 text-center group hover:border-emerald-500/30 hover:bg-emerald-50/30 dark:hover:bg-emerald-900/10 transition-all duration-500">
              <div className="w-16 h-16 bg-gray-50 dark:bg-white/5 text-black dark:text-white rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
                <Mail className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-sans font-medium text-black dark:text-white mb-4 tracking-tight">{t('이메일', 'Email')}</h4>
              <p className="text-gray-500 dark:text-gray-400 mb-8 font-light leading-relaxed">ksei2025@naver.com</p>
              <a 
                href="mailto:ksei2025@naver.com" 
                className="inline-flex items-center gap-2 text-sm font-bold tracking-wide text-black dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors uppercase"
              >
                {t('이메일 보내기', 'Send Email')} <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center">
              <motion.img 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                src={selectedImage} 
                alt="License Full" 
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-emerald-400 transition-colors flex items-center gap-2"
              >
                <X className="w-5 h-5" />
                <span className="text-[11px] font-bold tracking-[0.4em] uppercase">Close</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FaqPage;

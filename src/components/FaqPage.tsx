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
    answer: "현재 일부 이론 과정에 한해 온라인 시험을 운영 중입니다. 실기 시험의 경우 지정된 고사장에서 대면으로 진행되나, 점차 온라인 실기 시험 시스템도 도입할 예정입니다.",
    answerEn: "Currently, online exams are available for some theoretical courses. Practical exams are conducted face-to-face at designated test centers, but we plan to gradually introduce an online practical exam system."
  },
  {
    category: "결제/환불",
    question: "수강료 결제는 어떻게 하나요?",
    questionEn: "How do I pay the tuition fee?",
    answer: "홈페이지 내 카드 결제 및 계좌이체가 가능합니다. 법인카드 결제 및 할부 결제도 지원하며, 현금영수증 발행도 가능합니다.",
    answerEn: "Credit card payment and bank transfer are available on the website. Corporate card payment and installment payment are also supported, and cash receipts can be issued."
  },
  {
    category: "자격증 발급",
    question: "자격증을 분실했는데 재발급이 가능한가요?",
    questionEn: "I lost my certificate. Can it be reissued?",
    answer: "네, 홈페이지 내 '자격증 재발급' 메뉴를 통해 신청 가능합니다. 본인 확인 절차 후 소정의 재발급 수수료를 결제하시면 영업일 기준 3~5일 이내에 발송됩니다.",
    answerEn: "Yes, you can apply through the 'Certificate Reissuance' menu on the website. After verifying your identity and paying a small reissuance fee, it will be sent within 3-5 business days."
  },
  {
    category: "자격증 발급",
    question: "모바일 자격증도 발급되나요?",
    questionEn: "Is a mobile certificate also issued?",
    answer: "네, 실물 자격증 카드와 함께 모바일에서도 상시 확인 가능한 디지털 자격증을 기본으로 제공합니다. 협회 앱 또는 홈페이지 마이페이지에서 확인하실 수 있습니다.",
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
    answer: "필기 시험은 당일 확인이 가능하며, 실기 시험의 경우 채점 과정을 거쳐 응시일로부터 14일 이내에 홈페이지 공지사항 및 개별 연락을 통해 발표됩니다.",
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
    <div className="pt-32 pb-24 bg-white dark:bg-[#121212] min-h-screen transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: isMobile ? 0.3 : 0.6 }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-emerald-600" />
              <span className="text-[11px] font-bold tracking-[0.4em] uppercase text-emerald-600">FAQ</span>
              <div className="h-[1px] w-12 bg-emerald-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white tracking-tighter mb-6">
              {t('자주 묻는 질문', 'Frequently Asked Questions')}
            </h1>
            <p className="text-center text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              {t('궁금하신 점을 빠르게 확인하실 수 있습니다.', 'Find answers to your questions quickly.')} <br className="hidden md:block" />
              {t('찾으시는 내용이 없다면 고객센터로 문의해 주세요.', 'If you cannot find what you are looking for, please contact customer support.')}
            </p>
          </motion.div>
        </div>

        {/* Filter */}
        <div className="mb-12">
          <div className="flex overflow-x-auto gap-2 md:justify-center pb-4 md:pb-0 scrollbar-hide snap-x px-4 md:px-0 -mx-4 md:mx-0">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`shrink-0 snap-start px-6 py-2 rounded-full text-xs font-bold tracking-wider transition-all ${
                  selectedCategory === category
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                    : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'
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
              <div
                key={faq.question}
                className="group"
              >
                <button
                  onClick={() => setActiveQuestion(activeQuestion === faq.question ? null : faq.question)}
                  className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 ${
                    activeQuestion === faq.question
                      ? 'bg-emerald-50/50 dark:bg-emerald-500/5 border-emerald-500/30'
                      : 'bg-white dark:bg-[#121212] border-black/5 dark:border-white/5 hover:border-emerald-500/30'
                  }`}
                >
                  <div className="flex justify-between items-center gap-4">
                    <div className="flex items-start gap-4">
                      <span className={`text-lg font-bold ${activeQuestion === faq.question ? 'text-emerald-500' : 'text-gray-400'}`}>Q.</span>
                      <span className="font-bold text-black dark:text-white leading-tight">{t(faq.question, faq.questionEn)}</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${activeQuestion === faq.question ? 'rotate-180 text-emerald-500' : ''}`} />
                  </div>
                  
                  <AnimatePresence>
                    {activeQuestion === faq.question && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: isMobile ? 0.15 : 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                          {t(faq.answer, faq.answerEn)}
                          {faq.images && (
                            <div className="flex gap-4 mt-6">
                              {faq.images.map((img, i) => (
                                <img 
                                  key={i} 
                                  src={img} 
                                  alt={`License ${i+1}`} 
                                  className="w-24 h-32 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity shadow-sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedImage(img);
                                  }}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-gray-50 dark:bg-white/5 rounded-3xl border border-dashed border-black/10 dark:border-white/10">
              <p className="text-gray-500 dark:text-gray-400">{t('검색 결과가 없습니다.', 'No results found.')}</p>
            </div>
          )}
        </div>
      </div>

      {/* Visit Us Section - Redesigned to match page style */}
      <div id="visit-us" className="py-24 bg-emerald-50/40 dark:bg-emerald-900/5 border-t border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left md:text-center mb-16">
            <h2 className="text-[11px] font-bold tracking-[0.4em] uppercase text-black dark:text-white mb-6 flex items-center justify-start md:justify-center gap-4">
              <span className="w-12 h-[1px] bg-black dark:bg-white"></span>
              VISIT US
              <span className="hidden md:block w-12 h-[1px] bg-black dark:bg-white"></span>
            </h2>
            <h3 className="text-[36px] font-normal text-black dark:text-white leading-tight tracking-tight">
              {t('고객센터 안내', 'Customer Support')}
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Address Card */}
            <div className="bg-gray-50 dark:bg-white/5 p-8 md:p-10 rounded-[2.5rem] border border-black/5 dark:border-white/5 text-center group hover:border-black/30 dark:hover:border-white/30 transition-all duration-500">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-black dark:bg-white text-white dark:text-black rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-6 md:mb-8 group-hover:scale-110 transition-transform">
                <MapPin className="w-7 h-7 md:w-8 md:h-8" />
              </div>
              <h4 className="text-xl font-bold text-black dark:text-white mb-3">{t('주소', 'Address')}</h4>
              <p className="text-gray-500 dark:text-gray-400 mb-1">{t('대전광역시 서구 갈마역로 155', '155, Galma-yeok-ro, Seo-gu, Daejeon')}</p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">{t('(월평2동 행정복지센터 인근)', '(Near Wolpyeong 2-dong Community Center)')}</p>
              <a 
                href="https://map.naver.com/v5/search/%EB%8C%80%EC%A0%84%EA%B0%88%EB%A7%88%EC%97%AD%EB%A1%9C155/address/14178351.468305739,4348507.410123518,15,0,0,0,dh" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-emerald-600 font-bold hover:underline"
              >
                {t('네이버 지도 열기', 'Open Naver Map')} <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Phone Card */}
            <div className="bg-gray-50 dark:bg-white/5 p-8 md:p-10 rounded-[2.5rem] border border-black/5 dark:border-white/5 text-center group hover:border-black/30 dark:hover:border-white/30 transition-all duration-500">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-black dark:bg-white text-white dark:text-black rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-6 md:mb-8 group-hover:scale-110 transition-transform">
                <Phone className="w-7 h-7 md:w-8 md:h-8" />
              </div>
              <h4 className="text-xl font-bold text-black dark:text-white mb-3">{t('전화번호', 'Phone')}</h4>
              <p className="text-gray-500 dark:text-gray-400 mb-1">010-8409-2802</p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">{t('평일 10:00 - 18:00 (주말 휴무)', 'Weekdays 10:00 - 18:00 (Closed on weekends)')}</p>
              <a 
                href="tel:010-8409-2802" 
                className="inline-flex items-center gap-2 text-emerald-600 font-bold hover:underline"
              >
                {t('전화하기', 'Call Now')} <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Email Card */}
            <div className="bg-gray-50 dark:bg-white/5 p-8 md:p-10 rounded-[2.5rem] border border-black/5 dark:border-white/5 text-center group hover:border-black/30 dark:hover:border-white/30 transition-all duration-500">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-black dark:bg-white text-white dark:text-black rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-6 md:mb-8 group-hover:scale-110 transition-transform">
                <Mail className="w-7 h-7 md:w-8 md:h-8" />
              </div>
              <h4 className="text-xl font-bold text-black dark:text-white mb-3">{t('이메일', 'Email')}</h4>
              <p className="text-gray-500 dark:text-gray-400 mb-6">ksei2025@naver.com</p>
              <a 
                href="mailto:ksei2025@naver.com" 
                className="inline-flex items-center gap-2 text-emerald-600 font-bold hover:underline"
              >
                {t('이메일 보내기', 'Send Email')} <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

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

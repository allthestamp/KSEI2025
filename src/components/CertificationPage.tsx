import React from 'react';
import { motion } from 'motion/react';
import { CreditCard, FileText, Truck, Info, CheckCircle, ChevronRight, FileCheck, Send, PackageCheck, Clock, HelpCircle, Award } from 'lucide-react';

interface Props {
  t: (ko: string, en: string) => string;
}

export default function CertificationPage({ t }: Props) {
  return (
    <div className="pt-20 bg-white dark:bg-[#121212] min-h-screen transition-colors duration-300 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]" 
           style={{ backgroundImage: `radial-gradient(#000 1px, transparent 1px)`, backgroundSize: '32px 32px' }}></div>

      {/* Hero Section */}
      <div className="relative py-24 bg-white dark:bg-[#121212] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-sm font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-500 mb-6 flex items-center justify-center gap-2">
              <span className="w-8 h-[1px] bg-emerald-600 dark:bg-emerald-500"></span>
              CERTIFICATION
              <span className="w-8 h-[1px] bg-emerald-600 dark:bg-emerald-500"></span>
            </h2>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-medium text-black dark:text-white leading-tight mb-8 tracking-tight">
              {t('자격증 발급 안내', 'Certification Issuance')}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-light max-w-3xl mx-auto leading-relaxed">
              {t('자격증은 시험 응시와 함께 신청되며, 합격 시 별도의 추가 절차 없이 발급됩니다. 여러분의 전문성을 증명하는 소중한 자격증을 안전하게 전달해 드립니다.', 'Certification is applied for along with the exam and is issued without additional procedures upon passing. We safely deliver your precious certificate that proves your expertise.')}
            </p>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-emerald-500/5 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 blur-3xl rounded-full"></div>
      </div>

      {/* Issuance Procedure Infographic - Subtle Green Background */}
      <div className="py-24 bg-emerald-50/40 dark:bg-white/5 border-y border-black/5 dark:border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold mb-4"
            >
              {t('발급 절차', 'Issuance Process')}
            </motion.div>
            <h3 className="text-3xl md:text-4xl font-sans font-medium text-black dark:text-white">{t('자격증 발급 절차', 'Issuance Procedure')}</h3>
          </div>

          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-[40px] left-[10%] w-[80%] h-[2px] bg-emerald-200 dark:bg-emerald-900/30 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
              {[
                { icon: FileText, title: t('시험 및 발급 신청', 'Apply for Exam & Cert'), desc: t('시험 응시와 자격증 발급을 동시에 신청합니다.', 'Apply for the exam and certification issuance at the same time.') },
                { icon: CreditCard, title: t('검정료 및 수수료 납부', 'Pay Fees'), desc: t('안내된 계좌로 검정료(발급비 포함)를 입금합니다.', 'Deposit the exam fee (including issuance fee) to the provided account.') },
                { icon: CheckCircle, title: t('시험 응시 및 합격', 'Take Exam & Pass'), desc: t('포트폴리오 및 실기 심사를 통해 합격 여부를 결정합니다.', 'Pass/fail is determined through portfolio and practical evaluation.') },
                { icon: Truck, title: t('자격증 제작 및 발송', 'Production & Delivery'), desc: t('합격 확정 후 자격증을 제작하여 우편으로 발송해 드립니다.', 'Certificates are produced and sent by mail after passing confirmation.') }
              ].map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="w-20 h-20 rounded-[2rem] bg-white dark:bg-[#1e1e1e] border-2 border-emerald-500 flex items-center justify-center mb-8 shadow-xl group-hover:rotate-6 group-hover:bg-emerald-500 transition-all duration-500 relative">
                    <step.icon className="w-8 h-8 text-emerald-500 group-hover:text-white transition-colors" />
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center text-xs font-bold shadow-lg">
                      {idx + 1}
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-black dark:text-white mb-4">{step.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-[200px]">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Issuance Info Details - White Background */}
      <div className="py-24 bg-white dark:bg-[#121212]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-sm font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-500 mb-6 flex items-center gap-2">
                DETAILS
                <span className="w-8 h-[1px] bg-emerald-600 dark:bg-emerald-500"></span>
              </h2>
              <h3 className="text-3xl md:text-4xl font-sans font-medium text-black dark:text-white mb-10 leading-tight">
                {t('발급 관련 상세 안내', 'Detailed Issuance Info')}
              </h3>
              
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-black dark:text-white mb-2">{t('발급 소요 기간', 'Issuance Period')}</h4>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {t('신청 및 입금 확인 후 제작에 약 7~10일(영업일 기준)이 소요되며, 이후 우편 배송됩니다.', 'It takes about 7-10 business days for production after confirmation, followed by mail delivery.')}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-black dark:text-white mb-2">{t('구비 서류', 'Required Documents')}</h4>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                      <li>{t('자격증 발급 신청서 (시험 접수 시 포함)', 'Issuance application (included in exam registration)')}</li>
                      <li>{t('증명사진 불필요 (고유번호 시스템 도입)', 'No ID photo required (Unique number system)')}</li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <CreditCard className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-black dark:text-white mb-2">{t('발급 수수료', 'Issuance Fee')}</h4>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {t('자격증 발급 수수료는 시험 검정료에 포함되어 있으며, 합격 시 추가 비용 없이 발급됩니다.', 'The certification issuance fee is included in the exam fee and is issued without additional cost upon passing.')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="bg-gray-50 dark:bg-[#1e1e1e] p-8 md:p-12 rounded-[3rem] border border-black/5 dark:border-white/5 relative"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 blur-2xl rounded-full -mr-8 -mt-8"></div>
              <h4 className="text-xl font-bold text-black dark:text-white mb-8 flex items-center gap-3">
                <HelpCircle className="w-6 h-6 text-emerald-500" />
                {t('자주 묻는 질문', 'FAQ')}
              </h4>
              <div className="space-y-6">
                {[
                  { q: t('자격증을 분실했는데 재발급이 가능한가요?', 'Can I get a replacement if I lose my certificate?'), a: t('네, 홈페이지를 통해 재발급 신청이 가능하며 소정의 수수료가 발생합니다.', 'Yes, you can apply for re-issuance through the website for a small fee.') },
                  { q: t('모바일 자격증도 발급되나요?', 'Is a mobile certificate also issued?'), a: t('현재는 실물 상장형 자격증만 발급하고 있으며, 추후 모바일 서비스 도입 예정입니다.', 'Currently, only physical certificates are issued. Mobile services will be introduced later.') },
                  { q: t('단체 발급 신청도 가능한가요?', 'Can I apply for group issuance?'), a: t('네, 교육기관이나 단체의 경우 별도 문의를 통해 단체 접수 및 발급이 가능합니다.', 'Yes, educational institutions or groups can apply through separate inquiry.') }
                ].map((faq, idx) => (
                  <div key={idx} className="border-b border-black/5 dark:border-white/5 pb-6 last:border-0 last:pb-0">
                    <p className="font-bold text-black dark:text-white mb-2 flex gap-2">
                      <span className="text-emerald-500">Q.</span> {faq.q}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed pl-6">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fees & Payment Section - Subtle Green Background */}
      <div className="py-24 bg-emerald-50/40 dark:bg-white/5 border-y border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Fees Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-[#1e1e1e] p-8 md:p-12 rounded-[2.5rem] border border-black/5 dark:border-white/5 shadow-xl"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                  <Award className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-black dark:text-white">{t('자격증 검정료 및 발급 비용', 'Exam & Issuance Fees')}</h3>
              </div>
              
              <div className="space-y-4">
                {[
                  { level: t('마스터', 'Master'), price: '600,000' },
                  { level: t('1급', 'Level 1'), price: '300,000' },
                  { level: t('2급', 'Level 2'), price: '200,000' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-5 rounded-2xl bg-gray-50 dark:bg-black/20 border border-transparent hover:border-emerald-500/20 transition-colors">
                    <span className="font-bold text-black dark:text-white">{item.level}</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold text-lg">{item.price}{t('원', ' KRW')}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                * {t('검정료에는 자격증 발급 및 배송 비용이 모두 포함되어 있습니다.', 'The exam fee includes all certification issuance and delivery costs.')}
              </p>
            </motion.div>

            {/* Payment Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-[#1e1e1e] p-8 md:p-12 rounded-[2.5rem] border border-black/5 dark:border-white/5 shadow-xl"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-black dark:text-white">{t('입금 안내', 'Payment Information')}</h3>
              </div>
              
              <div className="p-8 rounded-[2rem] bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full -mr-16 -mt-16"></div>
                
                <div className="space-y-6 relative z-10">
                  <div className="flex justify-between items-center border-b border-white/20 pb-4">
                    <span className="text-emerald-100 text-sm">{t('은행명', 'Bank')}</span>
                    <span className="font-bold text-lg">{t('농협', 'NH Bank')}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/20 pb-4">
                    <span className="text-emerald-100 text-sm">{t('계좌번호', 'Account Number')}</span>
                    <span className="font-bold text-lg tracking-wider">351-1372-1557-33</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-100 text-sm">{t('예금주', 'Account Holder')}</span>
                    <span className="font-bold text-lg">{t('한국스탬프교육진흥원', 'Korea Stamp Education Institute')}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex items-start gap-3 p-4 bg-gray-50 dark:bg-black/20 rounded-2xl">
                <Info className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t('입금 시 신청자 본인 성함으로 입금해 주시기 바랍니다. 타인 명의 입금 시 확인이 지연될 수 있습니다.', 'Please deposit in the name of the applicant. Confirmation may be delayed if deposited under another name.')}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Certificate Sample Section - White Background */}
      <div className="py-24 bg-white dark:bg-[#121212]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-500 mb-4 flex items-center justify-center gap-2">
              <span className="w-8 h-[1px] bg-emerald-600 dark:bg-emerald-500"></span>
              SAMPLE
              <span className="w-8 h-[1px] bg-emerald-600 dark:bg-emerald-500"></span>
            </h2>
            <h3 className="text-3xl md:text-4xl font-sans font-medium text-black dark:text-white mb-4">{t('자격증 샘플', 'Certificate Sample')}</h3>
            <p className="text-gray-600 dark:text-gray-400 font-light max-w-2xl mx-auto whitespace-pre-line">
              {t('한국스탬프교육진흥원에서 발급하는 정식 자격증 샘플입니다.\n실제 발급되는 자격증은 고유번호와 함께 위변조 방지 처리가 되어 있습니다.', 'This is a sample of the official certificate issued by the Korea Stamp Education Institute.\nActual certificates are issued with a unique number and anti-counterfeiting measures.')}
            </p>
          </div>

          <div 
            className="max-w-7xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
              <div className="bg-white dark:bg-[#1e1e1e] p-4 rounded-[2rem] shadow-2xl border border-black/5 dark:border-white/5 relative group overflow-hidden">
                <div className="absolute top-4 left-4 z-10 bg-emerald-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Level 1</div>
                <img 
                  src="https://i.postimg.cc/SKfdMHrJ/seutaempeujejagjidosa-1geub-saempeul.png" 
                  alt="Level 1 Certificate" 
                  className="w-full h-auto rounded-xl shadow-lg group-hover:scale-[1.02] transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="bg-white dark:bg-[#1e1e1e] p-4 rounded-[2rem] shadow-2xl border border-black/5 dark:border-white/5 relative group overflow-hidden">
                <div className="absolute top-4 left-4 z-10 bg-emerald-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Level 2</div>
                <img 
                  src="https://i.postimg.cc/BvBpKRgB/seutaempeujejagjidosa-2geub-saempeul.png" 
                  alt="Level 2 Certificate" 
                  className="w-full h-auto rounded-xl shadow-lg group-hover:scale-[1.02] transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section - White Background */}
      <div className="py-24 bg-white dark:bg-[#121212]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest uppercase text-black dark:text-white mb-4 flex items-center justify-center gap-2">
              <span className="w-8 h-[1px] bg-black dark:bg-white"></span>
              BENEFITS
              <span className="w-8 h-[1px] bg-black dark:bg-white"></span>
            </h2>
            <h3 className="text-3xl md:text-4xl font-sans font-medium text-black dark:text-white mb-4">{t('자격증 취득 혜택', 'Benefits of Certification')}</h3>
            <p className="text-gray-600 dark:text-gray-400 font-light max-w-2xl mx-auto">
              {t('자격증 취득 후 한국스탬프교육진흥원에서 제공하는 다양한 혜택을 누리실 수 있습니다.', 'After obtaining the certification, you can enjoy various benefits provided by the Korea Stamp Education Institute.')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Award, title: t('전문 강사 활동 지원', 'Instructor Support'), desc: t('협회 네트워크를 통한 강의 연결 및 활동 기회를 우선적으로 제공합니다.', 'We prioritize providing teaching connections and activity opportunities through the association network.') },
              { icon: FileCheck, title: t('교육 자료 제공', 'Educational Materials'), desc: t('수업에 바로 활용 가능한 강의 커리큘럼 및 교안 자료를 공유해 드립니다.', 'We share lecture curricula and teaching materials that can be used immediately in class.') },
              { icon: Send, title: t('창업 컨설팅', 'Startup Consulting'), desc: t('공방 창업 및 프로그램 운영에 필요한 실무적인 컨설팅을 지원합니다.', 'We support practical consulting necessary for starting a workshop and running programs.') }
            ].map((benefit, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 bg-gray-50 dark:bg-[#1e1e1e] rounded-3xl border border-black/5 dark:border-white/5 hover:border-emerald-500/20 transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <benefit.icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h4 className="text-lg font-bold text-black dark:text-white mb-3">{benefit.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section - Subtle Green Background */}
      <div className="py-24 bg-emerald-50/40 dark:bg-white/5 border-t border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-[#1e1e1e] rounded-[3rem] p-8 md:p-16 border border-black/5 dark:border-white/5 shadow-xl flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-xl">
              <h3 className="text-2xl md:text-3xl font-sans font-medium text-black dark:text-white mb-4">{t('발급 관련 문의사항이 있으신가요?', 'Have questions about issuance?')}</h3>
              <p className="text-gray-600 dark:text-gray-400 font-light">
                {t('자격증 발급 절차, 서류 준비, 배송 등 궁금한 점이 있다면 언제든 문의해 주세요. 친절하게 안내해 드리겠습니다.', 'If you have any questions about the issuance process, document preparation, or delivery, please feel free to contact us.')}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <a href="tel:010-1234-5678" className="flex items-center justify-center gap-2 py-4 px-8 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-emerald-500/20">
                <PackageCheck className="w-5 h-5" />
                {t('전화 문의하기', 'Call Us')}
              </a>
              <a href="mailto:contact@ksei.or.kr" className="flex items-center justify-center gap-2 py-4 px-8 bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200 rounded-2xl font-bold transition-all shadow-lg">
                <Send className="w-5 h-5" />
                {t('이메일 문의하기', 'Email Us')}
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

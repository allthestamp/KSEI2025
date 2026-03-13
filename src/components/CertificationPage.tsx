import React from 'react';
import { motion } from 'motion/react';
import { CreditCard, FileText, Truck, Info, CheckCircle, FileCheck, Send, PackageCheck, Clock, HelpCircle, Award, MapPin, Phone, Mail } from 'lucide-react';

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
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-emerald-500/5 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/5 blur-3xl rounded-full"></div>
      </div>

      {/* Issuance Procedure Infographic */}
      <div className="py-24 bg-emerald-50/40 dark:bg-white/5 border-y border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-sm font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-500 mb-4 flex items-center justify-center gap-2">
              ISSUANCE PROCESS
              <span className="w-8 h-[1px] bg-emerald-600 dark:bg-emerald-500"></span>
            </h2>
            <h3 className="text-3xl md:text-4xl font-sans font-medium text-black dark:text-white">{t('자격증 발급 절차', 'Issuance Procedure')}</h3>
          </div>

          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-[40px] left-[10%] w-[80%] h-[2px] bg-emerald-100 dark:bg-emerald-900/20 z-0"></div>
            
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
                  <div className="w-20 h-20 rounded-3xl bg-white dark:bg-[#1e1e1e] border-2 border-emerald-500 flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 group-hover:bg-emerald-500 transition-all duration-500 relative">
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

      {/* Issuance Info Details - Bento Layout */}
      <div className="py-24 bg-white dark:bg-[#121212]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-sm font-bold tracking-widest uppercase text-black dark:text-white mb-4 flex items-center justify-center gap-2">
              ISSUANCE DETAILS
              <span className="w-8 h-[1px] bg-black dark:bg-white"></span>
            </h2>
            <h3 className="text-3xl md:text-4xl font-sans font-medium text-black dark:text-white">{t('발급 상세 정보', 'Issuance Details')}</h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Details Bento */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:col-span-2 bg-white dark:bg-[#1e1e1e] p-8 md:p-12 rounded-[2.5rem] border border-black/5 dark:border-white/5 group shadow-xl shadow-black/5 hover:shadow-2xl transition-all">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Clock className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h4 className="text-2xl font-bold text-black dark:text-white">{t('발급 소요 기간', 'Issuance Period')}</h4>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                  {t('신청 및 입금 확인 후 제작에 약 7~10일(영업일 기준)이 소요되며, 이후 우편 배송됩니다. 제작 상황에 따라 다소 차이가 있을 수 있습니다.', 'It takes about 7-10 business days for production after confirmation, followed by mail delivery. There may be slight differences depending on the production situation.')}
                </p>
              </div>

              <div className="bg-white dark:bg-[#1e1e1e] p-8 md:p-12 rounded-[2.5rem] border border-black/5 dark:border-white/5 group shadow-xl shadow-black/5 hover:shadow-2xl transition-all">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileText className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h4 className="text-2xl font-bold text-black dark:text-white">{t('구비 서류', 'Required Documents')}</h4>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    {t('자격증 발급 신청서', 'Issuance application')}
                  </li>
                  <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    {t('고유번호 시스템 (사진 불필요)', 'Unique number system (No photo)')}
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-[#1e1e1e] p-8 md:p-12 rounded-[2.5rem] border border-black/5 dark:border-white/5 group shadow-xl shadow-black/5 hover:shadow-2xl transition-all">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <CreditCard className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h4 className="text-2xl font-bold text-black dark:text-white">{t('발급 수수료', 'Issuance Fee')}</h4>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t('자격증 발급 수수료는 시험 검정료에 포함되어 있으며, 합격 시 추가 비용 없이 발급됩니다.', 'The certification issuance fee is included in the exam fee and is issued without additional cost upon passing.')}
                </p>
              </div>
            </div>

            {/* Right Column: FAQ Bento */}
            <div className="bg-emerald-600 dark:bg-emerald-700 p-8 md:p-12 rounded-[2.5rem] text-white shadow-2xl shadow-emerald-900/20 relative overflow-hidden flex flex-col group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 blur-3xl rounded-full -mr-24 -mt-24 group-hover:bg-white/20 transition-all duration-700"></div>
              <h4 className="text-2xl font-bold mb-10 flex items-center gap-4 relative z-10">
                <HelpCircle className="w-8 h-8" />
                {t('자주 묻는 질문', 'FAQ')}
              </h4>
              <div className="space-y-10 flex-1 relative z-10">
                {[
                  { q: t('자격증을 분실했는데 재발급이 가능한가요?', 'Can I get a replacement if I lose my certificate?'), a: t('네, 홈페이지를 통해 재발급 신청이 가능하며 소정의 수수료가 발생합니다.', 'Yes, you can apply for re-issuance through the website for a small fee.') },
                  { q: t('모바일 자격증도 발급되나요?', 'Is a mobile certificate also issued?'), a: t('현재는 실물 상장형 자격증만 발급하고 있으며, 추후 모바일 서비스 도입 예정입니다.', 'Currently, only physical certificates are issued. Mobile services will be introduced later.') },
                  { q: t('단체 발급 신청도 가능한가요?', 'Can I apply for group issuance?'), a: t('네, 교육기관이나 단체의 경우 별도 문의를 통해 단체 접수 및 발급이 가능합니다.', 'Yes, educational institutions or groups can apply through separate inquiry.') }
                ].map((faq, idx) => (
                  <div key={idx} className="group/faq">
                    <p className="font-bold mb-3 flex gap-3 text-lg">
                      <span className="text-emerald-200">Q.</span> {faq.q}
                    </p>
                    <p className="text-sm text-emerald-50/80 leading-relaxed pl-8">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fees & Payment Section */}
      <div className="py-24 bg-emerald-50/40 dark:bg-white/5 border-y border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-sm font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-500 mb-4 flex items-center justify-center gap-2">
              FEES & PAYMENT
              <span className="w-8 h-[1px] bg-emerald-600 dark:bg-emerald-500"></span>
            </h2>
            <h3 className="text-3xl md:text-4xl font-sans font-medium text-black dark:text-white">{t('자격증 발급 및 결제', 'Issuance & Payment')}</h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Fees Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-[#1e1e1e] p-8 rounded-[3rem] border border-black/5 dark:border-white/5 shadow-2xl shadow-black/5 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-emerald-500/10 transition-colors"></div>
              
              <div className="flex items-center gap-6 mb-10">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center shadow-inner">
                  <Award className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-black dark:text-white tracking-tight">{t('자격증 검정료 및 발급 비용', 'Fees')}</h3>
              </div>
              
              <div className="space-y-4">
                {[
                  { level: t('마스터', 'Master'), price: '600,000' },
                  { level: t('1급', 'Level 1'), price: '300,000' },
                  { level: t('2급', 'Level 2'), price: '200,000' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-5 rounded-2xl bg-gray-50 dark:bg-black/20 border border-transparent hover:border-emerald-500/20 transition-all group/item">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-emerald-600/60 dark:text-emerald-500/60 uppercase tracking-widest mb-0.5">{t('자격 등급', 'Level')}</span>
                      <span className="font-bold text-xl text-black dark:text-white">{item.level}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-0.5 block">{t('금액', 'Amount')}</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold text-2xl">{item.price}<span className="text-sm ml-1 opacity-70">{t('원', 'KRW')}</span></span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-gray-50 dark:bg-black/20 rounded-2xl flex gap-3 items-start">
                <Info className="w-5 h-5 shrink-0 mt-0.5 text-emerald-500" />
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  {t('검정료에는 자격증 발급 및 배송 비용이 모두 포함되어 있습니다.', 'The exam fee includes all certification issuance and delivery costs.')}
                </p>
              </div>
            </motion.div>

            {/* Payment Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-emerald-600 dark:bg-emerald-700 p-8 rounded-[3rem] text-white shadow-2xl shadow-emerald-900/20 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full -mr-32 -mt-32 group-hover:bg-white/20 transition-all duration-700"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 blur-[80px] rounded-full -ml-24 -mb-24"></div>
              
              <div className="flex items-center gap-6 mb-10 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg">
                  <CreditCard className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight">{t('입금 안내', 'Payment')}</h3>
              </div>
              
              <div className="space-y-4 relative z-10">
                {[
                  { label: t('은행명', 'Bank'), value: t('농협', 'NH Bank') },
                  { label: t('계좌번호', 'Account Number'), value: '351-1372-1557-33' },
                  { label: t('예금주', 'Account Holder'), value: t('한국스탬프교육진흥원', 'KSEI') }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col p-5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/5 hover:bg-white/20 transition-all">
                    <span className="text-[10px] font-bold text-emerald-100/60 uppercase tracking-widest mb-1">{item.label}</span>
                    <span className="font-bold text-xl text-white tracking-tight">{item.value}</span>
                  </div>
                ))}
                
                <div className="flex items-start gap-4 p-6 bg-white/10 rounded-3xl border border-white/5">
                  <Info className="w-6 h-6 text-white shrink-0" />
                  <p className="text-xs text-emerald-50 leading-relaxed">
                    {t('입금 시 신청자 본인 성함으로 입금해 주시기 바랍니다. 타인 명의 입금 시 확인이 지연될 수 있습니다.', 'Please deposit in the name of the applicant. Confirmation may be delayed if deposited under another name.')}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Certificate Sample Section */}
      <div className="py-24 bg-white dark:bg-[#121212]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-sm font-bold tracking-widest uppercase text-black dark:text-white mb-4 flex items-center justify-center gap-2">
              <span className="w-8 h-[1px] bg-black dark:bg-white"></span>
              SAMPLES
              <span className="w-8 h-[1px] bg-black dark:bg-white"></span>
            </h2>
            <h3 className="text-3xl md:text-4xl font-sans font-medium text-black dark:text-white mb-6">{t('자격증 샘플', 'Certificate Sample')}</h3>
            <p className="text-gray-600 dark:text-gray-400 font-light max-w-2xl mx-auto text-lg">
              {t('한국스탬프교육진흥원에서 발급하는 정식 자격증 샘플입니다. 실제 발급되는 자격증은 고유번호와 함께 위변조 방지 처리가 되어 있습니다.', 'This is a sample of the official certificate issued by the Korea Stamp Education Institute. Actual certificates are issued with a unique number and anti-counterfeiting measures.')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            {[
              { level: 'Level 1', src: 'https://i.postimg.cc/SKfdMHrJ/seutaempeujejagjidosa-1geub-saempeul.png' },
              { level: 'Level 2', src: 'https://i.postimg.cc/BvBpKRgB/seutaempeujejagjidosa-2geub-saempeul.png' }
            ].map((sample, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-[#1e1e1e] p-6 rounded-[2.5rem] shadow-2xl border border-black/5 dark:border-white/5 relative group overflow-hidden"
              >
                <div className="absolute top-8 left-8 z-10 bg-emerald-600 text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">{sample.level}</div>
                <img 
                  src={sample.src} 
                  alt={`${sample.level} Certificate`} 
                  className="w-full h-auto rounded-2xl shadow-lg group-hover:scale-[1.02] transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section - Bento Layout */}
      <div className="py-24 bg-emerald-50/40 dark:bg-white/5 border-y border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-sm font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-500 mb-4 flex items-center justify-center gap-2">
              <span className="w-8 h-[1px] bg-emerald-600 dark:bg-emerald-500"></span>
              BENEFITS
              <span className="w-8 h-[1px] bg-emerald-600 dark:bg-emerald-500"></span>
            </h2>
            <h3 className="text-3xl md:text-4xl font-sans font-medium text-black dark:text-white mb-6">{t('자격증 취득 혜택', 'Benefits of Certification')}</h3>
            <p className="text-gray-600 dark:text-gray-400 font-light max-w-2xl mx-auto text-lg">
              {t('자격증 취득 후 한국스탬프교육진흥원에서 제공하는 다양한 혜택을 누리실 수 있습니다.', 'After obtaining the certification, you can enjoy various benefits provided by the Korea Stamp Education Institute.')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Main Benefit Card */}
            <div className="md:col-span-2 lg:col-span-2 bg-emerald-600 dark:bg-emerald-700 p-10 md:p-12 rounded-[2.5rem] text-white relative overflow-hidden group shadow-2xl shadow-emerald-900/20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full -mr-32 -mt-32 group-hover:bg-white/20 transition-all duration-700"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-10 shadow-lg">
                  <Award className="w-9 h-9 text-white" />
                </div>
                <h4 className="text-3xl font-bold mb-6">{t('전문 강사 활동 지원', 'Instructor Support')}</h4>
                <p className="text-emerald-50/90 leading-relaxed mb-10 text-lg">
                  {t('협회 네트워크를 통한 강의 연결 및 활동 기회를 우선적으로 제공합니다. 공공기관, 학교, 지자체 등 다양한 교육 현장에서 전문가로 활동할 수 있도록 전폭적으로 지원합니다.', 'We prioritize providing teaching connections and activity opportunities through the association network. We fully support you to work as an expert in various educational fields such as public institutions, schools, and local governments.')}
                </p>
                <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest bg-white/10 w-fit px-6 py-3 rounded-full border border-white/10">
                  <CheckCircle className="w-5 h-5" />
                  {t('우선 매칭 시스템 운영', 'Priority Matching')}
                </div>
              </div>
            </div>

            {/* Educational Materials Card */}
            <div className="md:col-span-1 lg:col-span-2 bg-white dark:bg-[#1e1e1e] p-10 md:p-12 rounded-[2.5rem] border border-black/5 dark:border-white/5 hover:border-emerald-500/20 transition-all group flex flex-col shadow-xl shadow-black/5">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                <FileCheck className="w-9 h-9 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h4 className="text-2xl font-bold text-black dark:text-white mb-6">{t('교육 자료 제공', 'Educational Materials')}</h4>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-10">
                {t('수업에 바로 활용 가능한 강의 커리큘럼 및 교안 자료를 공유해 드립니다. 최신 트렌드를 반영한 교육 콘텐츠를 지속적으로 업데이트합니다.', 'We share lecture curricula and teaching materials that can be used immediately in class. We continuously update educational content reflecting the latest trends.')}
              </p>
              <div className="mt-auto flex gap-3">
                <span className="px-4 py-2 bg-gray-50 dark:bg-black/40 rounded-xl text-xs font-bold text-gray-500 uppercase tracking-wider border border-black/5 dark:border-white/5">Curriculum</span>
                <span className="px-4 py-2 bg-gray-50 dark:bg-black/40 rounded-xl text-xs font-bold text-gray-500 uppercase tracking-wider border border-black/5 dark:border-white/5">Teaching Plan</span>
              </div>
            </div>

            {/* Startup Consulting Card */}
            <div className="md:col-span-2 lg:col-span-2 bg-white dark:bg-[#1e1e1e] p-10 md:p-12 rounded-[2.5rem] border border-black/5 dark:border-white/5 hover:border-emerald-500/20 transition-all group flex flex-col md:flex-row gap-12 items-center shadow-xl shadow-black/5">
              <div className="shrink-0">
                <div className="w-24 h-24 rounded-[2rem] bg-emerald-500/10 flex items-center justify-center group-hover:rotate-12 transition-transform">
                  <Send className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-black dark:text-white mb-4">{t('창업 컨설팅', 'Startup Consulting')}</h4>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t('공방 창업 및 프로그램 운영에 필요한 실무적인 컨설팅을 지원합니다. 브랜딩부터 마케팅, 운영 노하우까지 전문가의 조언을 받으실 수 있습니다.', 'We support practical consulting necessary for starting a workshop and running programs. You can receive expert advice from branding to marketing and operational know-how.')}
                </p>
              </div>
            </div>

            {/* Community Card */}
            <div className="md:col-span-1 lg:col-span-2 bg-black dark:bg-white p-10 md:p-12 rounded-[2.5rem] flex flex-col justify-center items-center text-center group shadow-2xl">
              <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <PackageCheck className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-white dark:text-black mb-4">{t('정기 세미나 초대', 'Seminar Invitation')}</h4>
              <p className="text-gray-400 dark:text-gray-500 leading-relaxed">
                {t('자격증 취득자 대상 정기 세미나 및 네트워킹 데이에 초대합니다.', 'Invite to regular seminars and networking days for certificate holders.')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-24 bg-white dark:bg-[#121212]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-emerald-600 dark:bg-emerald-700 rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden shadow-2xl shadow-emerald-900/20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[120px] rounded-full -mr-48 -mt-48"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 blur-[80px] rounded-full -ml-32 -mb-32"></div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-emerald-200 mb-6">{t('문의하기', 'Contact Us')}</h2>
                <h3 className="text-3xl md:text-5xl font-sans font-medium mb-8 leading-tight">
                  {t('자격증 발급에 대해\n궁금한 점이 있으신가요?', 'Have questions about\ncertification issuance?')}
                </h3>
                <p className="text-emerald-50/80 text-lg mb-10 max-w-md">
                  {t('전문 상담원이 친절하게 안내해 드립니다. 업무 시간 내에 연락 주시면 빠른 답변을 받으실 수 있습니다.', 'Our professional staff will kindly guide you. Contact us during business hours for a quick response.')}
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="tel:010-8409-2802" className="inline-flex items-center gap-3 bg-white text-emerald-700 px-8 py-4 rounded-full font-bold hover:bg-emerald-50 transition-colors shadow-lg">
                    <Phone className="w-5 h-5" />
                    010-8409-2802
                  </a>
                  <a href="mailto:contact@ksei.or.kr" className="inline-flex items-center gap-3 bg-emerald-500/30 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold hover:bg-emerald-500/40 transition-colors">
                    <Mail className="w-5 h-5" />
                    {t('이메일 문의', 'Email Inquiry')}
                  </a>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-8 md:p-10">
                <div className="space-y-8">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{t('상담 가능 시간', 'Consultation Hours')}</h4>
                      <p className="text-emerald-50/70">{t('평일 09:00 - 18:00 (점심시간 12:00 - 13:00)', 'Weekdays 09:00 - 18:00 (Lunch 12:00 - 13:00)')}</p>
                      <p className="text-emerald-50/70">{t('주말 및 공휴일 휴무', 'Closed on weekends and holidays')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                      <HelpCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{t('자주 묻는 질문', 'FAQ')}</h4>
                      <p className="text-emerald-50/70">{t('문의 전 FAQ를 확인하시면 더 빠르게 궁금증을 해결하실 수 있습니다.', 'Check the FAQ before inquiring to resolve your questions faster.')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

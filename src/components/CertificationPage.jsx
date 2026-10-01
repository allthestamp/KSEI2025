import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CreditCard, FileText, Truck, Info, CheckCircle, FileCheck, Send, PackageCheck, Clock, Award, ChevronRight, Copy, Check } from 'lucide-react';
import QualificationSelector from './certificates/shared/QualificationSelector';
import QualificationFees from './certificates/shared/QualificationFees';
import { assetUrl } from '../utils/publicAssets';
import { SitePageHero, SiteSectionHeading, SiteCallout, siteCardClass, siteCardTitleClass, SiteIcon } from './shared/SiteLayout';

export default function CertificationPage({ t, setCurrentPage, isMobile, qualification = 'stamp-making', onQualificationChange, setShowApplyModal }) {
    const isHandwriting = qualification === 'handwriting';
    const samples = isHandwriting ? [
        { level: t('손글씨 스탬프체험 지도사', 'Handwriting Stamp Experience Instructor'), src: '/img/certificates/handwriting.jpg' }
    ] : [
        { level: 'Level 1', src: '/img/certificates/level-1.png' },
        { level: 'Level 2', src: '/img/certificates/level-2.png' }
    ];
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText('351-1372-1557-33');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (<div className="pt-20 bg-white dark:bg-[#121212] min-h-screen transition-colors duration-300 relative overflow-hidden">
      <SitePageHero eyebrow="CERTIFICATION" title={t('자격증 발급 안내', 'Certification Issuance')} description={t('자격증은 시험 응시와 함께 신청되며, 합격 시 별도의 추가 절차 없이 발급됩니다. 여러분의 전문성을 증명하는 소중한 자격증을 안전하게 전달해 드립니다.', 'Certification is applied for along with the exam and is issued without additional procedures upon passing. We safely deliver your precious certificate that proves your expertise.')} isMobile={isMobile} />

      <QualificationSelector t={t} value={qualification} onChange={onQualificationChange} />
      <p className="mx-auto max-w-3xl px-4 pb-8 text-center text-sm leading-relaxed text-gray-600 dark:text-gray-400">
        <span className="font-medium text-black dark:text-white">{t('응시 조건 · ', 'Eligibility · ')}</span>
        {isHandwriting ? t('온라인·오프라인 클래스 또는 손글씨 도장 전자책에 포함된 VOD 강의 수강 후 응시할 수 있습니다.', 'You may apply after taking an online/offline class or the VOD lessons included in the handwriting stamp e-book.') : t('온라인 또는 오프라인 스탬프 교육 클래스 수강 후 응시할 수 있습니다.', 'You may apply after taking an online or offline stamp education class.')}
      </p>

      {/* Issuance Procedure Infographic */}
      <div className="py-24 bg-emerald-50/40 dark:bg-emerald-900/5 border-y border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-black dark:bg-white"/>
              <span className="text-[11px] font-bold tracking-[0.4em] uppercase text-black dark:text-white">ISSUANCE PROCESS</span>
              <div className="h-[1px] w-12 bg-black dark:bg-white"/>
            </div>
            <h3 className="text-3xl md:text-4xl font-sans font-medium text-black dark:text-white">{t('자격증 발급 절차', 'Issuance Procedure')}</h3>
          </div>

          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-[40px] left-[10%] w-[80%] h-[2px] bg-emerald-100 dark:bg-emerald-900/20 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
              {[
            { icon: FileText, title: t('시험 및 발급 신청', 'Apply for Exam & Cert'), desc: t('시험 응시와 자격증 발급을 동시에 신청합니다.', 'Apply for the exam and certification issuance at the same time.') },
            { icon: CreditCard, title: t('검정료 및 수수료 납부', 'Pay Fees'), desc: t('안내된 계좌로 검정료(발급비 포함)를 입금합니다.', 'Deposit the exam fee (including issuance fee) to the provided account.') },
            { icon: CheckCircle, title: isHandwriting ? t('제작 확인 및 자격 취득', 'Production Review & Qualification') : t('시험 응시 및 합격', 'Take Exam & Pass'), desc: isHandwriting ? t('온라인은 본인의 제작 영상 확인, 오프라인은 현장 강사의 확인을 거쳐 자격 취득 여부를 결정합니다.', 'Qualification is confirmed through review of your own production video online, or verification by the instructor on site offline.') : t('포트폴리오와 온라인 실기 영상 또는 오프라인 현장 시연을 심사합니다.', 'Your portfolio and either an online practical video or an offline demonstration are evaluated.') },
            { icon: Truck, title: t('자격증 제작 및 발송', 'Production & Delivery'), desc: t('합격 확정 후 자격증을 제작하여 우편으로 발송해 드립니다.', 'Certificates are produced and sent by mail after passing confirmation.') }
        ].map((step, idx) => (<motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: isMobile ? idx * 0.05 : idx * 0.1 }} className="flex flex-col items-center text-center group">
                  <div className="w-20 h-20 rounded-3xl bg-white dark:bg-[#1e1e1e] border-2 border-emerald-500 flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 group-hover:bg-emerald-500 transition-all duration-500 relative">
                    <step.icon className="w-8 h-8 text-emerald-500 group-hover:text-white transition-colors"/>
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center text-xs font-bold shadow-lg">
                      {idx + 1}
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-black dark:text-white mb-4">{step.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-[200px]">{step.desc}</p>
                </motion.div>))}
            </div>
          </div>
        </div>
      </div>

      {/* Issuance Info Details - Bento Layout */}
      <section className="py-16 bg-white dark:bg-[#121212] transition-colors duration-500 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SiteSectionHeading eyebrow="ISSUANCE DETAILS" as="h3" title={t('발급 상세 정보', 'Issuance Details')} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`group ${siteCardClass}`}>
              <div className="mb-8"><SiteIcon icon={Clock} /></div>
              <h4 className={`mb-4 ${siteCardTitleClass}`}>{t('발급 소요 기간', 'Issuance Period')}</h4>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-[15px] font-light">
                {t('신청 및 입금 확인 후 제작에 약 7~10일(영업일 기준)이 소요되며, 이후 우편 배송됩니다. 제작 상황에 따라 다소 차이가 있을 수 있습니다.', 'It takes about 7-10 business days for production after confirmation, followed by mail delivery. There may be slight differences depending on the production situation.')}
              </p>
            </div>

            <div className={`group ${siteCardClass}`}>
              <div className="mb-8"><SiteIcon icon={FileText} /></div>
              <h4 className={`mb-4 ${siteCardTitleClass}`}>{t('구비 서류', 'Required Documents')}</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-[15px] font-light">
                  <CheckCircle className="w-5 h-5 text-emerald-500"/>
                  {t('자격증 발급 신청서', 'Issuance application')}
                </li>
                <li className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-[15px] font-light">
                  <CheckCircle className="w-5 h-5 text-emerald-500"/>
                  {t('고유번호 시스템 (사진 불필요)', 'Unique number system (No photo)')}
                </li>
              </ul>
            </div>

            <div className={`group ${siteCardClass}`}>
              <div className="mb-8"><SiteIcon icon={CreditCard} /></div>
              <h4 className={`mb-4 ${siteCardTitleClass}`}>{t('발급 수수료', 'Issuance Fee')}</h4>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-[15px] font-light">
                {t('자격증 발급 수수료는 시험 검정료에 포함되어 있으며, 합격 시 추가 비용 없이 발급됩니다.', 'The certification issuance fee is included in the exam fee and is issued without additional cost upon passing.')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fees & Payment Section */}
      <section className="py-24 bg-white dark:bg-[#0a0a0a] transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-black dark:bg-white"/>
              <span className="text-[11px] font-bold tracking-[0.4em] uppercase text-black dark:text-white">FEES & PAYMENT</span>
              <div className="h-[1px] w-12 bg-black dark:bg-white"/>
            </div>
            <h3 className="text-3xl md:text-4xl font-sans font-medium text-black dark:text-white tracking-tighter">
              {t('자격증 발급 및 결제', 'Issuance & Payment')}
            </h3>
            <p className="text-center text-gray-600 dark:text-gray-400 font-light max-w-2xl mx-auto text-lg mt-6">
              {t('자격증 검정료 및 발급 비용 안내입니다. 입금 시 반드시 신청자 본인 성함으로 입금해 주시기 바랍니다.', 'Information on certification exam and issuance fees. Please ensure the deposit is made under the applicant\'s name.')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Certificate Examination & Issuance Fee */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gray-50 dark:bg-[#111] p-10 md:p-12 rounded-[2.5rem] border border-black/5 dark:border-white/5 group hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-colors duration-500 relative overflow-hidden">
              <div className="flex items-center gap-6 mb-10">
                <div className="w-16 h-16 rounded-2xl bg-white dark:bg-[#222] flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500">
                  <Award className="w-8 h-8 text-emerald-600 dark:text-emerald-400"/>
                </div>
                <h3 className="text-2xl font-bold text-black dark:text-white tracking-tight">{t('검정료 및 발급 비용', 'Fees')}</h3>
              </div>
              
              <QualificationFees t={t} qualification={qualification} />

              <div className="mt-8 p-5 bg-white dark:bg-[#1a1a1a] rounded-2xl flex gap-4 items-start border border-black/5 dark:border-white/5">
                <Info className="w-5 h-5 shrink-0 mt-0.5 text-emerald-500"/>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {t('검정료에는 자격증 발급 및 배송 비용이 모두 포함되어 있습니다.', 'The exam fee includes all certification issuance and delivery costs.')}
                </p>
              </div>
            </motion.div>

            {/* Payment Info */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-gray-50 dark:bg-[#111] p-10 md:p-12 rounded-[2.5rem] border border-black/5 dark:border-white/5 group hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-colors duration-500 relative overflow-hidden">
              <div className="flex items-center gap-6 mb-10">
                <div className="w-16 h-16 rounded-2xl bg-white dark:bg-[#222] flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500">
                  <CreditCard className="w-8 h-8 text-emerald-600 dark:text-emerald-400"/>
                </div>
                <h3 className="text-2xl font-bold text-black dark:text-white tracking-tight">{t('입금 안내', 'Payment')}</h3>
              </div>
              
              <div className="space-y-4">
                {[
            { label: t('은행명', 'Bank'), value: t('농협', 'NH Bank') },
            { label: t('계좌번호', 'Account Number'), value: '351-1372-1557-33', isAccount: true },
            { label: t('예금주', 'Account Holder'), value: t('한국스탬프교육진흥원', 'KSEI') }
        ].map((item, idx) => (<div key={idx} className="flex items-center gap-5 p-6 rounded-2xl bg-white dark:bg-[#1a1a1a] border border-black/5 dark:border-white/5 hover:border-emerald-500/20 transition-all">
                    <div className="flex flex-col w-full">
                      <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">{item.label}</span>
                      {item.isAccount ? (<div onClick={handleCopy} className="inline-flex items-center gap-3 cursor-pointer group/copy">
                          <span className="font-bold text-xl text-black dark:text-white tracking-tight group-hover/copy:text-emerald-600 dark:group-hover/copy:text-emerald-400 transition-colors">{item.value}</span>
                          <div className="p-2 rounded-lg bg-gray-100 dark:bg-[#222] text-gray-500 dark:text-gray-400 group-hover/copy:bg-emerald-100 dark:group-hover/copy:bg-emerald-900/30 group-hover/copy:text-emerald-600 dark:group-hover/copy:text-emerald-400 transition-colors">
                            {copied ? <Check className="w-4 h-4"/> : <Copy className="w-4 h-4"/>}
                          </div>
                        </div>) : (<span className="font-bold text-xl text-black dark:text-white tracking-tight">{item.value}</span>)}
                    </div>
                  </div>))}
              </div>

              <div className="mt-8 p-5 bg-white dark:bg-[#1a1a1a] rounded-2xl flex gap-4 items-start border border-black/5 dark:border-white/5">
                <Info className="w-5 h-5 shrink-0 mt-0.5 text-emerald-500"/>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {t('입금 시 반드시 본인 성함으로 입금해 주세요. 타인 명의 입금 시 확인이 누락될 수 있습니다.', 'Please deposit in your own name. Confirmation may be missed if deposited under another name.')}
                </p>
              </div>
            </motion.div>
          </div>
          {setShowApplyModal && <div className="mt-10 text-center">
            <button type="button" onClick={() => setShowApplyModal(true)} className="inline-flex items-center justify-center gap-3 rounded-full bg-emerald-600 px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600">
              <span>{t('검정 접수하기', 'Apply for qualification')}</span>
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white dark:bg-[#121212] border-y border-black/5 dark:border-white/5 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-black dark:bg-white"/>
              <span className="text-[11px] font-bold tracking-[0.4em] uppercase text-black dark:text-white">BENEFITS</span>
              <div className="h-[1px] w-12 bg-black dark:bg-white"/>
            </div>
            <h3 className="text-3xl md:text-4xl font-sans font-medium text-black dark:text-white tracking-tighter mb-6">
              {t('자격증 취득 혜택', 'Benefits of Certification')}
            </h3>
            <p className="text-center text-gray-600 dark:text-gray-400 font-light max-w-2xl mx-auto text-lg">
              {t('자격증 취득 후 한국스탬프교육진흥원에서 제공하는 다양한 혜택을 누리실 수 있습니다.', 'After obtaining the certification, you can enjoy various benefits provided by the Korea Stamp Education Institute.')}
            </p>
          </div>

          <div className="relative mt-16">
            {/* Horizontal Line for Timeline (visible on lg screens) */}
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-[2px] bg-emerald-100 dark:bg-emerald-900/30"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
              {[
            {
                icon: Award,
                title: t('전문 강사 활동 지원', 'Instructor Support'),
                desc: t('협회 네트워크를 통한 강의 연결 및 활동 기회를 우선적으로 제공합니다. 공공기관, 학교, 지자체 등 다양한 교육 현장에서 전문가로 활동할 수 있도록 전폭적으로 지원합니다.', 'We prioritize providing teaching connections and activity opportunities through the association network. We fully support you to work as an expert in various educational fields such as public institutions, schools, and local governments.')
            },
            {
                icon: FileCheck,
                title: t('교육 자료 제공', 'Educational Materials'),
                desc: t('수업에 바로 활용 가능한 강의 커리큘럼 및 교안 자료를 공유해 드립니다. 최신 트렌드를 반영한 교육 콘텐츠를 지속적으로 업데이트합니다.', 'We share lecture curricula and teaching materials that can be used immediately in class. We continuously update educational content reflecting the latest trends.')
            },
            {
                icon: Send,
                title: t('창업 컨설팅', 'Startup Consulting'),
                desc: t('공방 창업 및 프로그램 운영에 필요한 실무적인 컨설팅을 지원합니다. 브랜딩부터 마케팅, 운영 노하우까지 전문가의 조언을 받으실 수 있습니다.', 'We support practical consulting necessary for starting a workshop and running programs. You can receive expert advice from branding to marketing and operational know-how.')
            },
            {
                icon: PackageCheck,
                title: t('정기 세미나 초대', 'Seminar Invitation'),
                desc: t('자격증 취득자 대상 정기 세미나 및 네트워킹 데이에 초대합니다.', 'Invite to regular seminars and networking days for certificate holders.')
            }
        ].map((item, idx) => {
            const Icon = item.icon;
            return (<motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="flex flex-col items-center text-center group">
                    <div className="w-16 h-16 bg-emerald-50/40 dark:bg-emerald-900/20 border-4 border-white dark:border-[#121212] rounded-full flex items-center justify-center shadow-sm mb-6 z-10 relative group-hover:scale-110 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/40 transition-all duration-500">
                      <Icon className="w-7 h-7 text-emerald-600 dark:text-emerald-400"/>
                    </div>
                    <div className="bg-white dark:bg-[#1a1a1a] p-8 rounded-[2rem] border border-black/5 dark:border-white/5 shadow-sm w-full h-full flex flex-col group-hover:border-emerald-500/30 dark:group-hover:border-emerald-500/30 group-hover:shadow-xl group-hover:shadow-emerald-500/5 transition-all duration-500">
                      <h4 className="text-xl font-bold text-black dark:text-white mb-4 tracking-tight">{item.title}</h4>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>);
        })}
            </div>
          </div>
        </div>
      </section>

      {/* Certificate Sample Section */}
      <section className="py-24 bg-gray-50 dark:bg-[#0a0a0a] transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-black dark:bg-white"/>
              <span className="text-[11px] font-bold tracking-[0.4em] uppercase text-black dark:text-white">SAMPLES</span>
              <div className="h-[1px] w-12 bg-black dark:bg-white"/>
            </div>
            <h3 className="text-3xl md:text-4xl font-sans font-medium text-black dark:text-white tracking-tighter mb-6">
              {t('자격증 샘플', 'Certificate Sample')}
            </h3>
            <p className="text-center text-gray-600 dark:text-gray-400 font-light max-w-2xl mx-auto text-lg">
              {t('한국스탬프교육진흥원에서 발급하는 정식 자격증 샘플입니다. 실제 발급되는 자격증은 고유번호와 함께 위변조 방지 처리가 되어 있습니다.', 'This is a sample of the official certificate issued by the Korea Stamp Education Institute. Actual certificates are issued with a unique number and anti-counterfeiting measures.')}
            </p>
          </div>

          <div className={`grid grid-cols-1 gap-12 lg:gap-20 mx-auto ${isHandwriting ? 'max-w-lg' : 'md:grid-cols-2 max-w-5xl'}`}>
            {samples.map((sample, idx) => (<motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="bg-white dark:bg-[#111] p-8 rounded-[2.5rem] shadow-xl border border-black/5 dark:border-white/5 relative group overflow-hidden hover:border-emerald-500/20 transition-colors duration-500">
                <div className="absolute top-10 left-10 z-10 bg-emerald-600 text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">{sample.level}</div>
                <div className="aspect-[1/1.4] bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl flex items-center justify-center relative overflow-hidden shadow-sm border border-black/5 dark:border-white/5 group-hover:shadow-md transition-shadow">
                  <img src={assetUrl(sample.src)} alt={`${sample.level} Certificate`} className="w-full h-auto rounded-2xl shadow-lg group-hover:scale-[1.02] transition-transform duration-700" referrerPolicy="no-referrer"/>
                </div>
              </motion.div>))}
          </div>
        </div>
      </section>

      {/* FAQ Banner Section */}
      <section className="py-24 bg-white dark:bg-[#0a0a0a] transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SiteCallout title={t('더 궁금한 점이 있으신가요?', 'Have more questions?')} description={t('시험 응시 및 자격증 발급과 관련하여 가장 많이 궁금해하시는 질문들을 모았습니다.', 'We have collected the most frequently asked questions regarding exam application and certification issuance.')}>
            <button onClick={() => {
            window.scrollTo(0, 0);
            if (setCurrentPage)
                setCurrentPage('faq');
        }} className="shrink-0 px-10 py-5 bg-white text-black rounded-full font-bold hover:bg-emerald-50 transition-colors inline-flex items-center gap-3 relative z-10">
              <span>{t('자주 묻는 질문', 'FAQ')}</span>
              <ChevronRight className="w-5 h-5"/>
            </button>
          </SiteCallout>
        </div>
      </section>

    </div>);
}

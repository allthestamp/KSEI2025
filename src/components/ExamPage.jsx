import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FileEdit, CreditCard, CheckCircle, Search, ChevronRight, PlayCircle, FileText, Award, Info, Copy, Check } from 'lucide-react';
import QualificationSelector from './certificates/shared/QualificationSelector';
import QualificationFees from './certificates/shared/QualificationFees';
import HandwritingExamGuide from './certificates/handwriting/ExamGuide';
import { assetUrl } from '../utils/publicAssets';
import { SitePageHero, SiteSectionHeading, SiteIcon, siteFeatureCardClass } from './shared/SiteLayout';

export default function ExamPage({ t, setShowApplyModal, setCurrentPage, isMobile, qualification = 'stamp-making', onQualificationChange }) {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText('351-1372-1557-33');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (<div className="pt-20 bg-white dark:bg-[#0a0a0a] min-h-screen transition-colors duration-500 relative overflow-hidden">
      <SitePageHero eyebrow="EXAM & APPLY" title={t('시험 안내 및 접수 방법', 'Exam Information & How to Apply')} description={t('한국스탬프교육진흥원의 자격증 시험 안내 및 접수 방법을 확인하세요. 체계적인 검정 시스템을 통해 여러분의 전문성을 증명해 드립니다.', 'Check the certification exam information and application process of the Korea Stamp Education Institute. We prove your expertise through a systematic testing system.')} isMobile={isMobile} />

      <QualificationSelector t={t} value={qualification} onChange={onQualificationChange} />

      {qualification === 'handwriting' ? (
        <HandwritingExamGuide t={t} setShowApplyModal={setShowApplyModal} setCurrentPage={setCurrentPage} />
      ) : (<>
      <section className="px-4 sm:px-6 lg:px-8 pt-12" aria-label={t('스탬프 제작 지도사 응시 조건', 'Stamp Making Instructor eligibility')}>
        <div className="max-w-7xl mx-auto p-6 md:p-8 rounded-3xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
          <h2 className="text-xl font-bold text-black dark:text-white mb-3">{t('스탬프 제작 지도사 응시 조건', 'Stamp Making Instructor eligibility')}</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{t('1급·2급은 온라인 또는 오프라인 스탬프 교육 클래스 수강 후 응시할 수 있습니다. 교육 상담을 통해 목표 등급과 응시 방식을 확인해 주세요.', 'Level 1 and Level 2 applicants must complete an online or offline stamp education class. Confirm your target level and examination format through education consultation.')}</p>
        </div>
      </section>

      {/* Exam Info Section - Bento Grid Style */}
      <section className="py-24 bg-white dark:bg-[#0a0a0a] transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SiteSectionHeading eyebrow="EXAM INFO" as="h3" title={t('시험 안내', 'Exam Information')} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className={siteFeatureCardClass}>
              <div className="flex items-center gap-6 mb-10">
                <SiteIcon icon={FileText} tone="soft" />
                <h4 className="text-2xl font-bold text-black dark:text-white tracking-tight">
                  {t('포트폴리오 제출', 'Portfolio Submission')}
                </h4>
              </div>
              <div className="space-y-4">
                {[
            { level: t('2급', 'Level 2'), desc: t('제작 스탬프 5종 + 손글씨 활동지', '5 types of custom stamps + handwriting activity sheet') },
            { level: t('1급', 'Level 1'), desc: t('제작 스탬프 10종 + 손글씨 활동지 + 취미반 강의안', '10 types of custom stamps + handwriting activity sheet + hobby-class teaching plan') },
            { level: t('마스터', 'Master'), desc: t('제작 스탬프 15종 + 강의 커리큘럼 기획안', '15 types of custom stamps + lecture curriculum proposal') }
        ].map((item, idx) => (<div key={idx} className="flex gap-6 items-center p-5 rounded-2xl bg-white dark:bg-[#1a1a1a] border border-black/5 dark:border-white/5">
                    <div className="bg-emerald-100 dark:bg-emerald-900/30 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest text-emerald-700 dark:text-emerald-400 shrink-0 uppercase">
                      {item.level}
                    </div>
                    <span className="text-gray-600 dark:text-gray-400 font-medium text-sm md:text-base">{item.desc}</span>
                  </div>))}
              </div>
              <div className="mt-6 text-sm text-gray-600 dark:text-gray-400 leading-relaxed space-y-3">
                <p>{t('2급 5종: 손글씨·칭찬·로고·QR·음각 스탬프', 'Level 2: handwriting, praise, logo, QR, and engraved stamps.')}</p>
                <p>{t('1급 10종: 2급 5종에 이름·투톤·의류·화이트·형광 스탬프 추가', 'Level 1: the five Level 2 stamps plus name, two-tone, clothing, white, and fluorescent stamps.')}</p>
                <p>{t('포트폴리오는 각 스탬프의 라벨과 인쇄 샘플, 활동지 또는 강의안을 포함하여 검정 접수일로부터 30일 이내 제출합니다.', 'Submit the portfolio within 30 days of examination registration, including labeled stamps, printed samples, the activity sheet, and the teaching plan where required.')}</p>
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className={siteFeatureCardClass}>
              <div className="flex items-center gap-6 mb-10">
                <SiteIcon icon={PlayCircle} tone="soft" />
                <h4 className="text-2xl font-bold text-black dark:text-white tracking-tight">
                  {t('영상 실기시험', 'Video Practical Exam')}
                </h4>
              </div>
              <div className="space-y-6">
                <div className="bg-emerald-600 dark:bg-emerald-500 p-5 rounded-2xl mb-8 shadow-lg shadow-emerald-500/20">
                  <p className="text-sm text-white font-bold flex items-center gap-3 tracking-wide">
                    <CheckCircle className="w-5 h-5"/>
                    {t('온라인 응시 가능', 'Online application available')}
                  </p>
                </div>
                <ul className="space-y-6">
                  {[
            t('온라인: 포트폴리오 작품 중 스탬프 1종을 선택해 제작 과정을 촬영합니다.', 'Online: film the production of one stamp selected from your portfolio.'),
            t('신분증을 3초 이상 제시하고 본인 이름, 도구와 제작 과정을 설명합니다. 완성 후 20회 이상 인쇄합니다.', 'Show your ID for at least 3 seconds, state your name, explain the tools and production process, and make at least 20 prints.'),
            t('영상은 편집·배속 없이 10~20분, 720p 이상 MP4로 촬영합니다. 검정 접수일로부터 30일 이내 제출합니다.', 'Submit an unedited, normal-speed MP4 video, 10–20 minutes long at 720p or higher, within 30 days of examination registration.'),
            t('오프라인: 포트폴리오를 위해 제작해 둔 스탬프로 감독관 앞에서 시연합니다.', 'Offline: demonstrate in front of the examiner using stamps prepared for your portfolio.')
        ].map((text, idx) => (<li key={idx} className="flex gap-5 items-start">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      </div>
                      <span className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed">{text}</span>
                    </li>))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How to Apply Infographic Section */}
      <section className="py-24 bg-gray-50 dark:bg-[#050505] transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-black dark:bg-white"/>
              <span className="text-[11px] font-bold tracking-[0.4em] uppercase text-black dark:text-white">HOW TO APPLY</span>
              <div className="h-[1px] w-12 bg-black dark:bg-white"/>
            </div>
            <h3 className="text-3xl md:text-4xl font-sans font-medium text-black dark:text-white tracking-tighter">
              {t('접수 방법 안내', 'Application Process')}
            </h3>
          </div>

          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-[48px] left-[10%] w-[80%] h-[1px] bg-black/10 dark:bg-white/10 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
              {[
            { icon: FileEdit, title: t('온라인 신청서 작성', 'Online Application'), desc: t('네이버폼 또는 홈페이지를 통해 신청서를 작성합니다.', 'Fill out the application via Naver Form or the website.') },
            { icon: CreditCard, title: t('응시료 입금', 'Fee Deposit'), desc: t('안내된 계좌로 등급별 응시료를 입금합니다.', 'Deposit the application fee to the provided account.') },
            { icon: CheckCircle, title: t('접수 확인', 'Confirmation'), desc: t('입금 확인 후 접수 완료 안내를 발송해 드립니다.', 'We will send a completion notice after confirming the deposit.') },
            { icon: Search, title: t('심사 진행', 'Evaluation'), desc: t('포트폴리오와 온라인 영상 또는 오프라인 시연을 바탕으로 심사합니다.', 'Evaluation is based on the portfolio and either an online video or an offline demonstration.') }
        ].map((step, idx) => (<motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: isMobile ? idx * 0.05 : idx * 0.1 }} className="flex flex-col items-center text-center group">
                  <div className="w-24 h-24 rounded-full bg-white dark:bg-[#111] border border-black/10 dark:border-white/10 flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:border-emerald-500 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/20 transition-all duration-500 relative">
                    <step.icon className="w-10 h-10 text-gray-400 dark:text-gray-500 group-hover:text-emerald-500 transition-colors"/>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center text-xs font-bold shadow-lg">
                      {idx + 1}
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-black dark:text-white mb-4 tracking-tight">{step.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-[200px]">{step.desc}</p>
                  {idx < 3 && (<div className="lg:hidden mt-8 text-black/10 dark:text-white/10">
                      <ChevronRight className="w-8 h-8 rotate-90 mx-auto"/>
                    </div>)}
                </motion.div>))}
            </div>
          </div>
        </div>
      </section>

      {/* Issuance & Payment Info Section */}
      <section className="py-24 bg-white dark:bg-[#0a0a0a] transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-black dark:bg-white"/>
              <span className="text-[11px] font-bold tracking-[0.4em] uppercase text-black dark:text-white">FEES & PAYMENT</span>
              <div className="h-[1px] w-12 bg-black dark:bg-white"/>
            </div>
            <h3 className="text-3xl md:text-4xl font-sans font-medium text-black dark:text-white tracking-tighter">
              {t('입금 안내', 'Payment Guide')}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Certificate Examination & Issuance Fee */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gray-50 dark:bg-[#111] p-10 md:p-12 rounded-[2.5rem] border border-black/5 dark:border-white/5 group hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-colors duration-500 relative overflow-hidden">
              <div className="flex items-center gap-6 mb-10">
                <div className="w-16 h-16 rounded-2xl bg-white dark:bg-[#222] flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500">
                  <Award className="w-8 h-8 text-emerald-600 dark:text-emerald-400"/>
                </div>
                <h3 className="text-2xl font-bold text-black dark:text-white tracking-tight">{t('자격증 검정료 및 발급 비용', 'Certificate Examination & Issuance Fee')}</h3>
              </div>
              
              <QualificationFees t={t} qualification="stamp-making" />

              <div className="mt-8 p-5 bg-white dark:bg-[#1a1a1a] rounded-2xl flex gap-4 items-start border border-black/5 dark:border-white/5">
                <Info className="w-5 h-5 shrink-0 mt-0.5 text-emerald-500"/>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {t('자격증 발급 비용은 검정료에 포함되어 있습니다. 합격 시 별도의 추가 비용 없이 자격증이 발급됩니다.', 'The certificate issuance fee is included in the examination fee. Certificates are issued without additional cost upon passing.')}
                </p>
              </div>
            </motion.div>

            {/* Payment Info */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-gray-50 dark:bg-[#111] p-10 md:p-12 rounded-[2.5rem] border border-black/5 dark:border-white/5 group hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-colors duration-500 relative overflow-hidden">
              <div className="flex items-center gap-6 mb-10">
                <div className="w-16 h-16 rounded-2xl bg-white dark:bg-[#222] flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500">
                  <CreditCard className="w-8 h-8 text-emerald-600 dark:text-emerald-400"/>
                </div>
                <h3 className="text-2xl font-bold text-black dark:text-white tracking-tight">{t('응시료 입금 안내', 'Payment Info')}</h3>
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
        </div>
      </section>

      {/* Checklist Section */}
      <section className="py-24 bg-gray-50 dark:bg-[#050505] transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            {/* Left side: Checklist */}
            <div className="lg:w-3/5 w-full">
              <div className="mb-12">
                <div className="flex items-center justify-start gap-4 mb-6">
                  <div className="h-[1px] w-12 bg-black dark:bg-white"/>
                  <span className="text-[11px] font-bold tracking-[0.4em] uppercase text-black dark:text-white">CHECKLIST</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-sans font-medium text-black dark:text-white mb-6 tracking-tighter">
                  {t('필요 서류 체크리스트', 'Required Documents Checklist')}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed max-w-xl">
                  {t('접수 전 아래의 서류들이 모두 준비되었는지 확인해 주세요. 누락된 서류가 있을 경우 접수가 지연될 수 있습니다.', 'Please check if all the documents below are prepared before applying. If there are missing documents, the application may be delayed.')}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                {[
            t('응시 신청서 (온라인 작성)', 'Application form (online)'),
            t('신분증 (실기 본인 확인용)', 'ID for practical examination identity verification'),
            t('포트폴리오 작품 및 첨부 자료', 'Portfolio stamps and supporting materials'),
            t('온라인 실기 영상 링크 또는 오프라인 시연 준비', 'Online practical video link or offline demonstration preparation')
        ].map((item, idx) => (<div key={idx} className="flex items-center gap-4 p-6 bg-white dark:bg-[#111] rounded-2xl border border-black/5 dark:border-white/5 shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center shrink-0">
                      <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400"/>
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item}</span>
                  </div>))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://form.naver.com/response/rVGLmuWiizZP0ebTi2CbNQ" target="_blank" rel="noopener noreferrer" className="flex-1 py-5 px-8 bg-emerald-600 hover:bg-emerald-700 text-white text-center rounded-full font-bold transition-all shadow-lg text-sm tracking-widest uppercase">
                  {t('네이버폼 접수하기', 'Apply via Naver Form')}
                </a>
                <button onClick={() => setShowApplyModal(true)} className="flex-1 py-5 px-8 bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200 text-center rounded-full font-bold transition-all shadow-lg text-sm tracking-widest uppercase">
                  {t('홈페이지 접수하기', 'Apply via Website')}
                </button>
              </div>
            </div>

            {/* Right side: Detailed Guides */}
            <div className="lg:w-2/5 w-full bg-white dark:bg-[#111] p-10 md:p-12 rounded-[2.5rem] border border-black/5 dark:border-white/5 shadow-sm">
              <h4 className="text-xl font-bold text-black dark:text-white mb-6 flex items-center gap-4 tracking-tight">
                <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
                  <Info className="w-5 h-5 text-emerald-600 dark:text-emerald-400"/>
                </div>
                {t('상세 안내문 다운로드', 'Download Detailed Guides')}
              </h4>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-10 leading-relaxed">
                {t('시험 응시 전, 아래의 안내문과 평가표를 반드시 확인하시기 바랍니다. 각 항목별 평가 기준이 상세히 안내되어 있습니다.', 'Before taking the exam, please be sure to check the instructions and evaluation table below. Evaluation criteria for each item are provided in detail.')}
              </p>
              
              <div className="space-y-4">
                <a href={assetUrl('/documents/stamp-making-online-practical-guide.pdf')} download className="flex items-center justify-between p-6 bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl border border-black/5 dark:border-white/5 group hover:border-emerald-500/30 transition-all">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#222] flex items-center justify-center shadow-sm group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/20 transition-colors">
                      <FileText className="w-6 h-6 text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors"/>
                    </div>
                    <div>
                      <p className="font-bold text-black dark:text-white text-sm">{t('온라인 실기 안내문 및 평가표', 'Online Practical Exam Guide')}</p>
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mt-1">PDF Document</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300 dark:text-gray-600 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all"/>
                </a>

                <a href={assetUrl('/documents/stamp-making-portfolio-guide.pdf')} download className="flex items-center justify-between p-6 bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl border border-black/5 dark:border-white/5 group hover:border-emerald-500/30 transition-all">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#222] flex items-center justify-center shadow-sm group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/20 transition-colors">
                      <FileText className="w-6 h-6 text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors"/>
                    </div>
                    <div>
                      <p className="font-bold text-black dark:text-white text-sm">{t('포트폴리오 제출 안내문 및 평가표', 'Portfolio Submission Guide')}</p>
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mt-1">PDF Document</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300 dark:text-gray-600 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all"/>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-24 bg-white dark:bg-[#0a0a0a] transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <div className="flex items-center justify-start gap-4 mb-6">
                <div className="h-[1px] w-12 bg-black dark:bg-white"/>
                <span className="text-[11px] font-bold tracking-[0.4em] uppercase text-black dark:text-white">EXAM TIPS</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-sans font-medium text-black dark:text-white mb-8 leading-tight tracking-tighter">
                {t('성공적인 시험을 위한 꿀팁', 'Tips for Exam Success')}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 font-light mb-12 leading-relaxed text-lg">
                {t('자격증 취득을 준비하시는 분들을 위해 평가 위원들이 전하는 핵심 팁입니다. 작은 차이가 합격을 결정합니다.', 'Here are key tips from evaluators for those preparing for certification. Small differences determine success.')}
              </p>
              
              <div className="space-y-6">
                {[
            { title: t('도안의 독창성', 'Originality'), desc: t('기존 디자인을 모방하기보다 본인만의 개성이 담긴 도안을 구성하세요.', 'Create designs with your own personality rather than imitating existing ones.') },
            { title: t('제작의 정교함', 'Precision'), desc: t('스탬프의 테두리 처리와 잉크 충전 상태 등 디테일한 마무리가 중요합니다.', 'Detailed finishing such as edge treatment and ink charging is important.') },
            { title: t('영상 가독성', 'Video Clarity'), desc: t('작업 과정이 잘 보이도록 밝은 조명과 고정된 카메라 구도를 확보하세요.', 'Ensure bright lighting and a fixed camera angle so the process is clearly visible.') }
        ].map((tip, idx) => (<motion.div key={idx} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: isMobile ? idx * 0.05 : idx * 0.1 }} className="flex gap-6 p-6 bg-gray-50 dark:bg-[#111] rounded-2xl border border-black/5 dark:border-white/5">
                    <div className="w-12 h-12 rounded-full bg-white dark:bg-[#222] flex items-center justify-center shrink-0 text-emerald-600 dark:text-emerald-400 font-bold shadow-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-black dark:text-white mb-2">{tip.title}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{tip.desc}</p>
                    </div>
                  </motion.div>))}
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="aspect-[4/3] rounded-[3rem] overflow-hidden">
                <img src={assetUrl('/img/exam/exam-tips.jpg')} alt="Exam Prep" className="w-full h-full object-cover" referrerPolicy="no-referrer"/>
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white dark:bg-[#111] p-8 rounded-[2rem] shadow-2xl border border-black/5 dark:border-white/5">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 shrink-0 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                    <Award className="w-7 h-7"/>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 tracking-widest uppercase mb-1">{t('평균 합격률', 'Avg. Pass Rate')}</p>
                    <p className="text-3xl font-bold text-black dark:text-white">95%<span className="text-emerald-500">+</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio & Practical Exam Examples Section */}
      <section className="py-24 bg-gray-50 dark:bg-[#050505] transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-black dark:bg-white"/>
              <span className="text-[11px] font-bold tracking-[0.4em] uppercase text-black dark:text-white">EXAM EXAMPLES</span>
              <div className="h-[1px] w-12 bg-black dark:bg-white"/>
            </div>
            <h3 className="text-3xl md:text-4xl font-sans font-medium text-black dark:text-white mb-6 tracking-tighter">
              {t('포트폴리오 및 실기 예시', 'Portfolio & Practical Examples')}
            </h3>
            <p className="text-center text-gray-500 dark:text-gray-400 font-light max-w-2xl mx-auto text-lg leading-relaxed">
              {t('성공적인 자격증 취득을 위한 우수 포트폴리오와 온라인 실기 시험 예시 영상입니다. 참고하여 본인만의 개성 있는 결과물을 준비해 보세요.', 'These are examples of excellent portfolios and online practical exams. Use them as a reference to prepare your own unique work.')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[
            {
                title: t('우수 포트폴리오 예시', 'Excellent Portfolio Example'),
                desc: t('다양한 스탬프 기법을 활용한 우수 포트폴리오 영상입니다.', 'This is an excellent portfolio video using various stamp techniques.'),
                url: "https://www.youtube.com/embed/fjo26-SntiE"
            },
            {
                title: t('실기 시험 진행 예시 및 촬영 가이드', 'Practical Exam Process & Filming Guide'),
                desc: t('실제 실기 시험이 진행되는 과정과 카메라 각도, 조명 등 촬영 시 주의사항 안내 영상입니다.', 'This is a standard example of the practical exam process and a guide on precautions when filming, such as camera angle and lighting.'),
                url: "https://www.youtube.com/embed/GKR6NiKmdFk"
            }
        ].map((video, idx) => (<motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group bg-white dark:bg-[#111] rounded-[2.5rem] overflow-hidden border border-black/5 dark:border-white/5 shadow-sm hover:shadow-xl transition-all duration-500">
                <div className="aspect-video w-full bg-gray-200 dark:bg-gray-800 relative">
                  <iframe className="absolute inset-0 w-full h-full" src={video.url} title={video.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
                <div className="p-8 md:p-10">
                  <h4 className="text-xl font-bold text-black dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors tracking-tight">{video.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    {video.desc}
                  </p>
                </div>
              </motion.div>))}
          </div>
        </div>
      </section>

      {/* FAQ Banner Section */}
      <section className="py-24 bg-white dark:bg-[#0a0a0a] transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#050505] rounded-[2.5rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20" style={{backgroundImage: `url(${assetUrl('/img/textures/stardust.png')})`}}></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full"></div>
            
            <div className="text-left relative z-10">
              <h3 className="text-3xl md:text-4xl font-sans font-medium text-white mb-6 tracking-tighter">
                {t('더 궁금한 점이 있으신가요?', 'Have more questions?')}
              </h3>
              <p className="text-gray-400 font-light text-lg leading-relaxed max-w-2xl">
                {t('시험 응시 및 자격증 발급과 관련하여 가장 많이 궁금해하시는 질문들을 모았습니다.', 'We have collected the most frequently asked questions regarding exam application and certification issuance.')}
              </p>
            </div>
            <button onClick={() => {
            window.scrollTo(0, 0);
            if (setCurrentPage)
                setCurrentPage('faq');
        }} className="shrink-0 px-10 py-5 bg-white text-black rounded-full font-bold hover:bg-emerald-50 transition-colors inline-flex items-center gap-3 relative z-10">
              <span>{t('자주 묻는 질문', 'FAQ')}</span>
              <ChevronRight className="w-5 h-5"/>
            </button>
          </div>
        </div>
      </section>

      </>)}
    </div>);
}

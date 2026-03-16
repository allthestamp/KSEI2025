import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FileEdit, CreditCard, CheckCircle, Search, ChevronRight, PlayCircle, FileText, HelpCircle, Award, Clock, Info, Trophy, ShieldCheck, CheckCircle2, Building2, User, ArrowRight, Phone, Copy, Check } from 'lucide-react';

interface Props {
  t: (ko: string, en: string) => string;
  setShowApplyModal: (show: boolean) => void;
  setCurrentPage?: (page: string) => void;
  isMobile?: boolean;
}

export default function ExamPage({ t, setShowApplyModal, setCurrentPage, isMobile }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('351-1372-1557-33');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pt-20 bg-white dark:bg-[#121212] min-h-screen transition-colors duration-300 relative overflow-hidden">
      {/* Hero Section */}
      <div className="relative py-24 bg-white dark:bg-[#121212] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: isMobile ? 0.4 : 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-emerald-600 dark:bg-emerald-500" />
              <span className="text-[11px] font-bold tracking-[0.4em] uppercase text-emerald-600 dark:text-emerald-500">EXAM & APPLY</span>
              <div className="h-[1px] w-12 bg-emerald-600 dark:bg-emerald-500" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-medium text-black dark:text-white leading-tight mb-8 tracking-tight">
              {t('시험 안내 및 접수 방법', 'Exam Information & How to Apply')}
            </h1>
            <p className="text-center text-lg md:text-xl text-gray-600 dark:text-gray-400 font-light max-w-3xl mx-auto leading-relaxed">
              {t('한국스탬프교육진흥원의 자격증 시험 안내 및 접수 방법을 확인하세요. 체계적인 검정 시스템을 통해 여러분의 전문성을 증명해 드립니다.', 'Check the certification exam information and application process of the Korea Stamp Education Institute. We prove your expertise through a systematic testing system.')}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Exam Info Section - Subtle Green Background */}
      <div className="py-24 bg-emerald-50/40 dark:bg-emerald-900/5 border-y border-black/5 dark:border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-black dark:bg-white" />
              <span className="text-[11px] font-bold tracking-[0.4em] uppercase text-black dark:text-white">EXAM INFO</span>
              <div className="h-[1px] w-12 bg-black dark:bg-white" />
            </div>
            <h3 className="text-3xl md:text-4xl font-sans font-medium text-black dark:text-white">{t('시험 안내', 'Exam Information')}</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div 
              className="bg-white dark:bg-[#1e1e1e] p-8 md:p-12 rounded-[2.5rem] border border-black/5 dark:border-white/5 shadow-xl shadow-black/5 hover:shadow-2xl transition-all group"
            >
              <div className="flex items-center gap-6 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileText className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h4 className="text-2xl font-bold text-black dark:text-white">
                  {t('포트폴리오 제출', 'Portfolio Submission')}
                </h4>
              </div>
              <div className="space-y-6">
                {[
                  { level: t('2급', 'Level 2'), desc: t('제작 스탬프 5종 + 손글씨 활동지', '5 types of custom stamps + handwriting activity sheet') },
                  { level: t('1급', 'Level 1'), desc: t('제작 스탬프 10종 + 강의 커리큘럼 기획안', '10 types of custom stamps + lecture curriculum proposal') },
                  { level: t('마스터', 'Master'), desc: t('제작 스탬프 15종 + 강의 커리큘럼 기획안', '15 types of custom stamps + lecture curriculum proposal') }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6 items-center p-4 rounded-2xl bg-gray-50 dark:bg-black/20 border border-transparent hover:border-emerald-500/20 transition-colors">
                    <div className="bg-emerald-100 dark:bg-emerald-900/50 px-3 py-1 rounded-lg text-xs font-bold text-emerald-700 dark:text-emerald-300 shrink-0">{item.level}</div>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div 
              className="bg-white dark:bg-[#1e1e1e] p-8 md:p-12 rounded-[2.5rem] border border-black/5 dark:border-white/5 shadow-xl shadow-black/5 hover:shadow-2xl transition-all group"
            >
              <div className="flex items-center gap-6 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <PlayCircle className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h4 className="text-2xl font-bold text-black dark:text-white">
                  {t('영상 실기시험', 'Video Practical Exam')}
                </h4>
              </div>
              <div className="space-y-6">
                <div className="bg-emerald-600 dark:bg-emerald-500 p-4 rounded-2xl mb-6 shadow-lg shadow-emerald-500/20">
                  <p className="text-sm text-white font-bold flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    {t('온라인 응시 가능', 'Online application available')}
                  </p>
                </div>
                <ul className="space-y-5">
                  {[
                    t('지정된 주제에 따른 스탬프 제작 과정 촬영 및 제출', 'Filming and submitting the stamp making process according to the designated theme'),
                    t('촬영 시 얼굴·작업 과정이 명확히 확인되어야 함', 'Face and work process must be clearly visible during filming'),
                    t('제출된 영상은 평가위원의 채점 기준에 따라 심사', 'Submitted videos are judged according to the evaluation criteria of the evaluation committee')
                  ].map((text, idx) => (
                    <li key={idx} className="flex gap-4 items-start">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How to Apply Infographic Section - White Background */}
      <div className="py-24 bg-white dark:bg-[#121212]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-black dark:bg-white" />
              <span className="text-[11px] font-bold tracking-[0.4em] uppercase text-black dark:text-white">HOW TO APPLY</span>
              <div className="h-[1px] w-12 bg-black dark:bg-white" />
            </div>
            <h3 className="text-3xl md:text-4xl font-sans font-medium text-black dark:text-white">{t('접수 방법 안내', 'Application Process')}</h3>
          </div>

          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-[40px] left-[10%] w-[80%] h-[2px] bg-emerald-100 dark:bg-emerald-900/20 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
              {[
                { icon: FileEdit, title: t('온라인 신청서 작성', 'Online Application'), desc: t('네이버폼 또는 홈페이지를 통해 신청서를 작성합니다.', 'Fill out the application via Naver Form or the website.') },
                { icon: CreditCard, title: t('응시료 입금', 'Fee Deposit'), desc: t('안내된 계좌로 등급별 응시료를 입금합니다.', 'Deposit the application fee to the provided account.') },
                { icon: CheckCircle, title: t('접수 확인', 'Confirmation'), desc: t('입금 확인 후 접수 완료 안내를 발송해 드립니다.', 'We will send a completion notice after confirming the deposit.') },
                { icon: Search, title: t('심사 진행', 'Evaluation'), desc: t('제출된 포트폴리오 및 영상을 바탕으로 심사합니다.', 'Evaluation is based on the submitted portfolio and video.') }
              ].map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: isMobile ? idx * 0.05 : idx * 0.1 }}
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
                  {idx < 3 && (
                    <div className="lg:hidden mt-8 text-gray-300 dark:text-white/10">
                      <ChevronRight className="w-8 h-8 rotate-90 mx-auto" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Issuance & Payment Info Section - New Section */}
      <div className="py-24 bg-emerald-50/40 dark:bg-emerald-900/5 border-y border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-black dark:bg-white" />
              <span className="text-[11px] font-bold tracking-[0.4em] uppercase text-black dark:text-white">FEES & PAYMENT</span>
              <div className="h-[1px] w-12 bg-black dark:bg-white" />
            </div>
            <h3 className="text-3xl md:text-4xl font-sans font-medium text-black dark:text-white">
              {t('입금 안내', 'Payment Guide')}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Certificate Examination & Issuance Fee */}
            <div
              className="bg-white dark:bg-[#1e1e1e] p-8 md:p-12 rounded-[2.5rem] border border-black/5 dark:border-white/5 shadow-xl shadow-black/5 hover:shadow-2xl transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-emerald-500/10 transition-colors"></div>
              
              <div className="flex items-center gap-5 mb-10">
                <div className="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-600/20">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-black dark:text-white tracking-tight">{t('자격증 검정료 및 발급 비용', 'Certificate Examination & Issuance Fee')}</h3>
              </div>
              
              <div className="space-y-4">
                {[
                  { level: t('마스터', 'Master'), price: '600,000' },
                  { level: t('1급', 'Level 1'), price: '300,000' },
                  { level: t('2급', 'Level 2'), price: '200,000' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-5 rounded-2xl bg-gray-50 dark:bg-black/20 border border-transparent hover:border-emerald-500/20 transition-all group/item">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-emerald-600/60 dark:text-emerald-500/60 uppercase tracking-widest mb-0.5">{t('자격 등급', 'Level')}</span>
                        <span className="font-bold text-xl text-black dark:text-white">{item.level}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-0.5 block">{t('검정료', 'Fee')}</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold text-2xl">{item.price}<span className="text-sm ml-1 opacity-70">{t('원', 'KRW')}</span></span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gray-50 dark:bg-black/20 rounded-2xl flex gap-3 items-start">
                <Info className="w-5 h-5 shrink-0 mt-0.5 text-emerald-500" />
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  {t('자격증 발급 비용은 검정료에 포함되어 있습니다. 합격 시 별도의 추가 비용 없이 자격증이 발급됩니다.', 'The certificate issuance fee is included in the examination fee. Certificates are issued without additional cost upon passing.')}
                </p>
              </div>
            </div>

            {/* Payment Info */}
            <div
              className="bg-white dark:bg-[#1e1e1e] p-8 md:p-12 rounded-[2.5rem] border border-black/5 dark:border-white/5 shadow-xl shadow-black/5 hover:shadow-2xl transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-emerald-500/10 transition-colors"></div>
              
              <div className="flex items-center gap-5 mb-10">
                <div className="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-600/20">
                  <CreditCard className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-black dark:text-white tracking-tight">{t('응시료 입금 안내', 'Payment Info')}</h3>
              </div>
              
              <div className="space-y-4">
                {[
                  { label: t('은행명', 'Bank'), value: t('농협', 'NH Bank') },
                  { label: t('계좌번호', 'Account Number'), value: '351-1372-1557-33', isAccount: true },
                  { label: t('예금주', 'Account Holder'), value: t('한국스탬프교육진흥원', 'KSEI') }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-5 p-5 rounded-2xl bg-gray-50 dark:bg-black/20 border border-transparent hover:border-emerald-500/20 transition-all group/row">
                    <div className="flex flex-col w-full">
                      <span className="text-[10px] font-bold text-emerald-600/60 dark:text-emerald-500/60 uppercase tracking-widest mb-0.5">{item.label}</span>
                      {item.isAccount ? (
                        <div 
                          onClick={handleCopy}
                          className="inline-flex items-center gap-2 cursor-pointer group/copy"
                        >
                          <span className="font-bold text-xl text-black dark:text-white tracking-tight group-hover/copy:text-emerald-600 dark:group-hover/copy:text-emerald-400 transition-colors">{item.value}</span>
                          <div className="p-1.5 rounded-md bg-gray-200 dark:bg-white/10 text-gray-500 dark:text-gray-400 group-hover/copy:bg-emerald-100 dark:group-hover/copy:bg-emerald-900/30 group-hover/copy:text-emerald-600 dark:group-hover/copy:text-emerald-400 transition-colors">
                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </div>
                        </div>
                      ) : (
                        <span className="font-bold text-xl text-black dark:text-white tracking-tight">{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gray-50 dark:bg-black/20 rounded-2xl flex gap-3 items-start">
                <Info className="w-5 h-5 shrink-0 mt-0.5 text-emerald-500" />
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  {t('입금 시 반드시 본인 성함으로 입금해 주세요. 타인 명의 입금 시 확인이 누락될 수 있습니다.', 'Please deposit in your own name. Confirmation may be missed if deposited under another name.')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checklist Section - Independent Section */}
      <div className="py-24 bg-white dark:bg-[#121212] border-y border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            {/* Left side: Checklist */}
            <div className="lg:w-3/5 w-full">
              <div className="mb-10">
                <div className="flex items-center justify-start gap-4 mb-6">
                  <div className="h-[1px] w-12 bg-black dark:bg-white" />
                  <span className="text-[11px] font-bold tracking-[0.4em] uppercase text-black dark:text-white">CHECKLIST</span>
                </div>
                <h3 className="text-3xl font-sans font-medium text-black dark:text-white mb-6">
                  {t('필요 서류 체크리스트', 'Required Documents Checklist')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {t('접수 전 아래의 서류들이 모두 준비되었는지 확인해 주세요. 누락된 서류가 있을 경우 접수가 지연될 수 있습니다.', 'Please check if all the documents below are prepared before applying. If there are missing documents, the application may be delayed.')}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                {[
                  t('응시 신청서 (온라인 작성)', 'Application form (online)'),
                  t('신분증 사본 (본인 확인용)', 'Copy of ID card'),
                  t('포트폴리오 파일', 'Portfolio file'),
                  t('실기 영상 링크', 'Practical video link')
                ].map((item, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center gap-4 p-5 bg-white dark:bg-black/40 rounded-2xl border border-black/5 dark:border-white/5 shadow-sm"
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://form.naver.com/response/rVGLmuWiizZP0ebTi2CbNQ" target="_blank" rel="noopener noreferrer" className="flex-1 py-5 px-8 bg-emerald-600 hover:bg-emerald-700 text-white text-center rounded-2xl font-bold transition-all shadow-lg shadow-emerald-500/20 text-sm tracking-widest uppercase">
                  {t('네이버폼 접수하기', 'Apply via Naver Form')}
                </a>
                <button onClick={() => setShowApplyModal(true)} className="flex-1 py-5 px-8 bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200 text-center rounded-2xl font-bold transition-all shadow-lg text-sm tracking-widest uppercase">
                  {t('홈페이지 접수하기', 'Apply via Website')}
                </button>
              </div>
            </div>

            {/* Right side: Detailed Guides */}
            <div className="lg:w-2/5 w-full bg-white dark:bg-[#1e1e1e] p-8 md:p-10 rounded-[2.5rem] border border-black/5 dark:border-white/5 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full -mr-16 -mt-16"></div>
              
              <h4 className="text-xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
                <Info className="w-6 h-6 text-emerald-500" />
                {t('상세 안내문 다운로드', 'Download Detailed Guides')}
              </h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-8 leading-relaxed">
                {t('시험 응시 전, 아래의 안내문과 평가표를 반드시 확인하시기 바랍니다. 각 항목별 평가 기준이 상세히 안내되어 있습니다.', 'Before taking the exam, please be sure to check the instructions and evaluation table below. Evaluation criteria for each item are provided in detail.')}
              </p>
              
              <div className="space-y-4">
                <a 
                  href="https://docs.google.com/uc?export=download&id=1TiFod1jnWRbEsp8-CAbewWGOtSFmWRGw" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-6 bg-emerald-50/40 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100 dark:border-emerald-900/20 group hover:bg-emerald-100 dark:hover:bg-emerald-900/20 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white dark:bg-black/20 flex items-center justify-center shadow-sm">
                      <FileText className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="font-bold text-black dark:text-white text-sm">{t('온라인 실기 안내문 및 평가표', 'Online Practical Exam Guide')}</p>
                      <p className="text-[10px] uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold mt-1">PDF Document</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                </a>

                <a 
                  href="https://drive.google.com/file/d/1hcp7JkAiNtIB-aKXiNEWjnoKKjmWfDxv/view?usp=sharing" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-6 bg-emerald-50/40 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100 dark:border-emerald-900/20 group hover:bg-emerald-100 dark:hover:bg-emerald-900/20 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white dark:bg-black/20 flex items-center justify-center shadow-sm">
                      <FileText className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="font-bold text-black dark:text-white text-sm">{t('포트폴리오 제출 안내문 및 평가표', 'Portfolio Submission Guide')}</p>
                      <p className="text-[10px] uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold mt-1">PDF Document</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tips Section - Subtle Green Background */}
      <div className="py-24 bg-emerald-50/40 dark:bg-emerald-900/5 border-y border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <div className="flex items-center justify-start gap-4 mb-6">
                <div className="h-[1px] w-12 bg-black dark:bg-white" />
                <span className="text-[11px] font-bold tracking-[0.4em] uppercase text-black dark:text-white">EXAM TIPS</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-sans font-medium text-black dark:text-white mb-8 leading-tight">
                {t('성공적인 시험을 위한 꿀팁', 'Tips for Exam Success')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-light mb-10 leading-relaxed">
                {t('자격증 취득을 준비하시는 분들을 위해 평가 위원들이 전하는 핵심 팁입니다. 작은 차이가 합격을 결정합니다.', 'Here are key tips from evaluators for those preparing for certification. Small differences determine success.')}
              </p>
              
              <div className="space-y-4">
                {[
                  { title: t('도안의 독창성', 'Originality'), desc: t('기존 디자인을 모방하기보다 본인만의 개성이 담긴 도안을 구성하세요.', 'Create designs with your own personality rather than imitating existing ones.') },
                  { title: t('제작의 정교함', 'Precision'), desc: t('스탬프의 테두리 처리와 잉크 충전 상태 등 디테일한 마무리가 중요합니다.', 'Detailed finishing such as edge treatment and ink charging is important.') },
                  { title: t('영상 가독성', 'Video Clarity'), desc: t('작업 과정이 잘 보이도록 밝은 조명과 고정된 카메라 구도를 확보하세요.', 'Ensure bright lighting and a fixed camera angle so the process is clearly visible.') }
                ].map((tip, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: isMobile ? idx * 0.05 : idx * 0.1 }}
                    className="flex gap-6 p-6 bg-white dark:bg-[#1e1e1e] rounded-2xl border border-black/5 dark:border-white/5 shadow-sm"
                  >
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 text-emerald-600 dark:text-emerald-400 font-bold">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-black dark:text-white mb-1">{tip.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{tip.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="aspect-square bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-900/20 dark:to-emerald-900/5 rounded-[3rem] overflow-hidden p-12">
                <img 
                  src="https://i.postimg.cc/prxWyhsR/20260311-135110.jpg" 
                  alt="Exam Prep" 
                  className="w-full h-full object-cover rounded-2xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-6 left-4 md:-left-6 bg-white dark:bg-[#1e1e1e] p-4 md:p-6 rounded-2xl shadow-xl border border-black/5 dark:border-white/5 max-w-[calc(100%-2rem)] md:max-w-none">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                    <Award className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">{t('평균 합격률', 'Avg. Pass Rate')}</p>
                    <p className="text-lg md:text-xl font-bold text-black dark:text-white">95% +</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* Portfolio Examples Section - Subtle Green Background */}
      <div className="py-24 bg-white dark:bg-[#121212] border-y border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-black dark:bg-white" />
              <span className="text-[11px] font-bold tracking-[0.4em] uppercase text-black dark:text-white">PORTFOLIO EXAMPLES</span>
              <div className="h-[1px] w-12 bg-black dark:bg-white" />
            </div>
            <h3 className="text-3xl md:text-4xl font-sans font-medium text-black dark:text-white mb-4">{t('우수 포트폴리오 예시', 'Portfolio Examples')}</h3>
            <p className="text-center text-gray-600 dark:text-gray-400 font-light max-w-2xl mx-auto">
              {t('실제 제출된 우수 포트폴리오 예시입니다. 참고하여 본인만의 개성 있는 포트폴리오를 준비해 보세요.', 'These are examples of excellent portfolios. Use them as a reference to prepare your own unique portfolio.')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[
              { title: t('1급 포트폴리오 예시', 'Level 1 Portfolio Example'), desc: t('다양한 스탬프 기법을 활용한 1급 과정 우수 포트폴리오 영상입니다.', 'This is an excellent portfolio video for the Level 1 course using various stamp techniques.') },
              { title: t('마스터 포트폴리오 예시', 'Master Portfolio Example'), desc: t('고급 기법과 창의적인 도안이 돋보이는 마스터 과정 우수 포트폴리오 영상입니다.', 'This is an excellent portfolio video for the Master course featuring advanced techniques and creative designs.') }
            ].map((video, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group bg-white dark:bg-[#1e1e1e] rounded-[2.5rem] overflow-hidden border border-black/5 dark:border-white/5 shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <div className="aspect-video w-full bg-gray-200 dark:bg-gray-800 relative">
                  <iframe 
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                    title={video.title}
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-8 md:p-10">
                  <h4 className="text-xl font-bold text-black dark:text-white mb-3 group-hover:text-emerald-500 transition-colors">{video.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {video.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Online Practical Exam Example Section - White Background */}
      <div className="py-24 bg-emerald-50/40 dark:bg-emerald-900/5 border-y border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-black dark:bg-white" />
              <span className="text-[11px] font-bold tracking-[0.4em] uppercase text-black dark:text-white">PRACTICAL EXAM EXAMPLES</span>
              <div className="h-[1px] w-12 bg-black dark:bg-white" />
            </div>
            <h3 className="text-3xl md:text-4xl font-sans font-medium text-black dark:text-white mb-4">{t('온라인 실기 예시', 'Online Practical Examples')}</h3>
            <p className="text-center text-gray-600 dark:text-gray-400 font-light max-w-2xl mx-auto">
              {t('온라인 실기 시험 응시를 위한 촬영 방법 및 예시 영상입니다. 얼굴과 작업 과정이 잘 보이도록 촬영해 주세요.', 'This is a filming method and example video for the online practical exam. Please film so that your face and the work process are clearly visible.')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[
              { title: t('실기 시험 촬영 가이드', 'Practical Exam Filming Guide'), desc: t('카메라 각도, 조명, 작업 영역 확보 등 실기 시험 촬영 시 주의사항 안내 영상입니다.', 'This video guides you through precautions when filming for the practical exam, such as camera angle, lighting, and securing the work area.') },
              { title: t('실기 시험 진행 예시', 'Practical Exam Process Example'), desc: t('실제 실기 시험이 진행되는 과정과 제출용 영상의 표준 예시입니다.', 'This is a standard example of the practical exam process and the video for submission.') }
            ].map((video, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group bg-gray-50 dark:bg-[#1e1e1e] rounded-[2.5rem] overflow-hidden border border-black/5 dark:border-white/5 shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <div className="aspect-video w-full bg-gray-200 dark:bg-gray-800 relative">
                  <iframe 
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/GKR6NiKmdFk" 
                    title={video.title}
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-8 md:p-10">
                  <h4 className="text-xl font-bold text-black dark:text-white mb-3 group-hover:text-emerald-500 transition-colors">{video.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {video.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Banner Section */}
      <div className="py-24 bg-white dark:bg-[#121212] border-t border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#111] rounded-[2rem] p-8 md:p-12 border border-black/5 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-left">
              <h3 className="text-2xl md:text-3xl font-sans font-medium text-white mb-4">
                {t('더 궁금한 점이 있으신가요?', 'Have more questions?')}
              </h3>
              <p className="text-gray-400 font-light text-base md:text-lg leading-relaxed max-w-2xl">
                {t('시험 응시 및 자격증 발급과 관련하여 가장 많이 궁금해하시는 질문들을 모았습니다.', 'We have collected the most frequently asked questions regarding exam application and certification issuance.')}
              </p>
            </div>
            <button 
              onClick={() => {
                window.scrollTo(0, 0);
                window.location.hash = 'faq';
              }}
              className="shrink-0 px-8 py-4 bg-[#222] text-white rounded-full font-bold hover:bg-[#333] transition-all inline-flex items-center gap-3"
            >
              <span>{t('자주 묻는 질문', 'FAQ')}</span>
              <ChevronRight className="w-5 h-5 text-emerald-500" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

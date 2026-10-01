import { ArrowLeft, ArrowRight, FileText, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { SitePageHero, SiteCallout, sitePrimaryButtonClass } from '../shared/SiteLayout';
import StampMakingDetail from './stamp-making/StampMakingDetail';
import HandwritingDetail from './handwriting/HandwritingDetail';

const sections = {
  'stamp-making': [['stamp-overview','소개','Overview'],['stamp-levels','등급 안내','Levels'],['stamp-learning','교육·준비 과정','Learning'],['stamp-strengths','과정의 특징','Features'],['stamp-uses','활용 방안','Uses'],['stamp-reviews','후기','Reviews']],
  handwriting: [['handwriting-overview','소개','Overview'],['handwriting-course','과정 안내','Course'],['handwriting-learning','교육·준비 과정','Learning'],['handwriting-strengths','과정의 특징','Features'],['handwriting-uses','활용 방안','Uses'],['handwriting-fees','검정료','Fees']],
};

export default function CertificateDetailPage({ t, qualification, isMobile, onNavigate, onApply, onShowLevel }) {
  const isHandwriting = qualification === 'handwriting';
  const title = isHandwriting ? t('손글씨 스탬프체험 지도사', 'Handwriting Stamp Experience Instructor') : t('스탬프 제작 지도사', 'Stamp Making Instructor');
  const Detail = isHandwriting ? HandwritingDetail : StampMakingDetail;
  const jump = id => {
    const element = document.getElementById(id);
    if (element) { const top = element.getBoundingClientRect().top + window.scrollY - 96; window.scrollTo({top,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'}); }
  };
  return <motion.div key={qualification} initial={{opacity:0}} animate={{opacity:1}} className="pt-20">
    <SitePageHero
      eyebrow="CERTIFICATION GUIDE"
      title={title}
      isMobile={isMobile}
      leading={<button type="button" onClick={() => onNavigate('cert-info')} className="inline-flex min-h-11 items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-emerald-600"><ArrowLeft className="w-4 h-4"/>{t('자격 목록', 'All qualifications')}</button>}
      description={isHandwriting ? t('내 손글씨로 도안을 만들고, 스탬프 제작과 체험 교육으로 이어가는 과정입니다.', 'Create designs in your own handwriting and develop stamp making and experience education skills.') : t('스탬프 제작의 기초부터 다양한 제작 기법과 수업 준비까지, 목표에 맞는 과정을 살펴보세요.', 'Explore courses from stamp making basics to different techniques and teaching preparation, suited to your goals.')}
    >
      <p className="mt-6 text-sm leading-relaxed text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"><span className="font-bold text-black dark:text-white">{t('응시 조건 · ', 'Eligibility · ')}</span>{isHandwriting ? t('온라인·오프라인 클래스 또는 손글씨 도장 전자책에 포함된 VOD 강의 수강 후 응시할 수 있습니다.', 'You may apply after taking an online/offline class or the VOD lessons included in the handwriting stamp e-book.') : t('온라인 또는 오프라인 스탬프 교육 클래스 수강 후 응시할 수 있습니다.', 'You may apply after taking an online or offline stamp education class.')}</p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button type="button" onClick={onApply} className={sitePrimaryButtonClass}>{t('자격검정 접수', 'Apply for qualification')}<ArrowRight className="h-5 w-5" aria-hidden="true"/></button>
        <label htmlFor={`${qualification}-section-select`} className="sr-only">{t('안내 항목 바로가기', 'Jump to a guide section')}</label>
        <select id={`${qualification}-section-select`} value="" onChange={event => jump(event.target.value)} className="min-h-13 max-w-full rounded-full border border-black/10 bg-white px-6 py-4 text-sm font-medium text-gray-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-500 dark:border-white/10 dark:bg-[#111] dark:text-gray-300">
          <option value="" disabled>{t('안내 항목 바로가기', 'Jump to a guide section')}</option>
          {sections[qualification].map(([id,ko,en]) => <option key={id} value={id}>{t(ko,en)}</option>)}
        </select>
      </div>
    </SitePageHero>
    <Detail t={t} isMobile={isMobile} onNavigate={onNavigate} onApply={onApply} onShowLevel={onShowLevel}/>
    <section className="py-12 md:py-24 bg-white dark:bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SiteCallout title={t('나에게 맞는 과정으로 시작해 보세요.', 'Start with a course that fits your goals.')} description={title}>
          <div className="flex flex-col gap-3">
            <button type="button" onClick={onApply} className="inline-flex min-h-11 items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-emerald-50">{t('자격검정 접수', 'Apply for qualification')}<ArrowRight className="w-5 h-5"/></button>
            <button type="button" onClick={() => onNavigate('exam')} className="inline-flex min-h-11 items-center justify-center gap-3 bg-emerald-600 text-white px-8 py-4 rounded-full font-bold hover:bg-emerald-500"><FileText className="w-5 h-5"/>{t('시험·비용 안내', 'Exam & fees')}</button>
            <button type="button" onClick={() => onNavigate('certification')} className="min-h-11 px-8 py-4 rounded-full border border-white/25 text-white font-bold hover:bg-white/10">{t('발급 안내', 'Issuance')}</button>
            <button type="button" onClick={() => onNavigate('faq')} className="inline-flex min-h-11 items-center justify-center gap-2 text-sm text-gray-300 hover:text-white"><MessageCircle className="w-4 h-4"/>{t('자주 묻는 질문', 'FAQ')}</button>
          </div>
        </SiteCallout>
      </div>
    </section>
  </motion.div>;
}

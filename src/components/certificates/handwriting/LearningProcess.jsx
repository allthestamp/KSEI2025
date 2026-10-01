import React from 'react';
import { motion } from 'motion/react';
import { Award, CheckCircle2, MonitorPlay, Route } from 'lucide-react';
import CertificateSection from '../shared/CertificateSection.jsx';
import LearningRoutes from '../shared/LearningRoutes.jsx';
import { siteCardTitleClass, siteCardTextClass } from '../../shared/SiteLayout.jsx';

const LearningProcess = ({ t, isMobile }) => {
    const steps = [
        { icon: Route, title: t('학습 경로 선택', 'Choose a learning pathway'), description: t('온라인 클래스, 오프라인 클래스 또는 전자책에 포함된 VOD 강의를 선택합니다.', 'Choose an online class, an offline class or the VOD lessons included with the e-book.') },
        { icon: MonitorPlay, title: t('강의 수강 및 제작 실습', 'Learn and practise'), description: t('선택한 강의를 수강하고, 자신의 손글씨로 도안을 작성하여 스탬프를 제작합니다.', 'Complete your chosen lessons, draw a design in your own handwriting and create a stamp.') },
        { icon: CheckCircle2, title: t('제작 결과 확인', 'Production verification'), description: t('온라인은 제작 영상을 제출하고, 오프라인은 현장에서 강사의 확인을 받습니다.', 'Submit a production video online, or receive instructor verification on site.') },
        { icon: Award, title: t('자격증 취득', 'Receive your qualification'), description: t('제작 과정과 결과 확인을 거쳐 손글씨 스탬프체험 지도사 자격증을 취득합니다.', 'Receive your Handwriting Stamp Experience Instructor certificate after verification.') },
    ];
    const pathways = [
        { title: t('온라인 과정', 'Online Pathway'), items: [t('클래스 또는 전자책에 포함된 VOD 강의 수강', 'Complete a class or the e-book VOD lessons'), t('본인의 손글씨 도안 작성부터 스탬프 제작까지 영상 제출', 'Submit a video from your handwritten design through stamp production'), t('제작 과정·결과 확인 후 자격증 발급', 'Verification, followed by certificate issuance')] },
        { title: t('오프라인 과정', 'Offline Pathway'), items: [t('현장 손글씨 스탬프 클래스 수강', 'Attend an on-site handwriting stamp class'), t('현장에서 강사 확인', 'Instructor verification on site'), t('확인 후 자격증 발급', 'Certificate issuance after verification')] },
    ];
    return (
        <CertificateSection id="handwriting-learning" eyebrow="LEARNING PROCESS" title={t('교육·준비 과정', 'Learning & Preparation')} description={t('학습에서 제작 확인과 자격 취득까지, 네 단계로 준비하세요.', 'Follow four steps from learning and practice to verification and certification.')} align="center">
            <ol className="grid gap-6 md:grid-cols-4 md:gap-8">
                {steps.map(({ icon: Icon, title, description }, index) => (
                    <motion.li key={title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: isMobile ? 0 : index * 0.08 }} className="relative flex items-start gap-4 md:block md:text-center group">
                        {index < steps.length - 1 && <span className="absolute left-[calc(50%_+_48px)] right-[calc(-50%_+_16px)] top-12 hidden h-px bg-black/10 dark:bg-white/10 md:block" aria-hidden="true" />}
                        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-xs font-bold text-white dark:bg-white dark:text-black md:hidden">{index + 1}</span>
                        <div className="relative z-10 mx-auto mb-8 hidden h-24 w-24 items-center justify-center rounded-full border border-black/10 bg-white shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:border-emerald-500 group-hover:bg-emerald-50 dark:border-white/10 dark:bg-[#111] dark:group-hover:bg-emerald-900/20 md:flex">
                            <Icon className="h-10 w-10 text-gray-400 transition-colors group-hover:text-emerald-500 dark:text-gray-500" aria-hidden="true" />
                            <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black text-xs font-bold text-white shadow-lg dark:bg-white dark:text-black">{index + 1}</span>
                        </div>
                        <div className="min-w-0 flex-1">
                            <h3 className={`${siteCardTitleClass} mb-2 md:mb-4`}>{title}</h3>
                            <p className={siteCardTextClass}>{description}</p>
                        </div>
                    </motion.li>
                ))}
            </ol>
            <LearningRoutes t={t} id="handwriting-learning" routes={pathways} tone="soft" />
        </CertificateSection>
    );
};

export default LearningProcess;

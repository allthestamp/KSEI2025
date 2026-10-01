import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, PenLine, Stamp } from 'lucide-react';
import { SitePageHero, SiteIcon, siteFeatureCardClass, siteFeatureCardTitleClass, siteCardTextClass, sitePrimaryButtonClass } from '../shared/SiteLayout';

const CertificateCatalog = ({ t, isMobile, onSelectQualification }) => {
    const qualifications = [
        {
            id: 'stamp-making',
            icon: Stamp,
            eyebrow: 'STAMP MAKING',
            title: t('스탬프 제작 지도사', 'Stamp Making Instructor'),
            description: t('다양한 스탬프 제작 기술을 익히고, 제작과 교육에 활용하는 자격 과정입니다.', 'Learn a range of stamp making techniques for production and teaching.'),
            audience: t('제작 기술을 폭넓게 배우고 수업·공방 활동으로 이어가고 싶은 분', 'For those who want to develop a broad range of production skills for classes and workshops'),
            badges: [t('2급', 'Level 2'), t('1급', 'Level 1'), t('마스터', 'Master')],
            eligibility: t('온라인 또는 오프라인 스탬프 교육 클래스 수강 후 응시', 'Eligible after completing an online or offline stamp making class'),
            points: [
                t('목표에 맞는 등급별 교육 안내', 'Level-based guidance for your goals'),
                t('포트폴리오와 실기 평가를 통한 자격 취득', 'Portfolio and practical assessment'),
                t('제작·교육·활용 사례 안내', 'Production, teaching and application examples'),
            ],
        },
        {
            id: 'handwriting',
            icon: PenLine,
            eyebrow: 'HANDWRITING STAMP',
            title: t('손글씨 스탬프체험 지도사', 'Handwriting Stamp Experience Instructor'),
            description: t('자신의 손글씨로 도안을 만들고 스탬프를 제작하는 과정을 배우는 자격 과정입니다.', 'Learn to turn your own handwriting into a design and create a stamp.'),
            audience: t('손글씨를 스탬프로 만들고 체험 활동으로 활용하고 싶은 분', 'For those who want to turn handwriting into stamps and use it in creative activities'),
            badges: [t('온라인 과정', 'Online'), t('오프라인 과정', 'Offline')],
            eligibility: t('온라인·오프라인 클래스 또는 전자책에 포함된 VOD 강의 수강 후 응시', 'Eligible after a class or the VOD lessons included with the e-book'),
            points: [
                t('손글씨 도안부터 제작까지 이어지는 실습', 'Practice from handwritten design to production'),
                t('온라인: 클래스 또는 전자책 VOD 수강 후 영상 제출', 'Online: class or e-book VOD lessons, followed by video submission'),
                t('오프라인: 현장 수강 후 강사 확인', 'Offline: an on-site class followed by instructor verification'),
            ],
        },
    ];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-20">
            <SitePageHero eyebrow="CERTIFICATION GUIDE" title={t('자격증 안내', 'Certification Guide')} description={t('배우고 싶은 제작 방식과 활동 목표에 맞는 자격을 살펴보세요. 각 자격의 교육 과정, 준비 방법과 활용 방안을 안내합니다.', 'Explore the qualification that fits your making style and goals. Find information about learning, preparation and practical applications.')} isMobile={isMobile} />

            <section className="bg-white py-12 transition-colors duration-500 dark:bg-[#0a0a0a] md:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-8 lg:grid-cols-2">
                        {qualifications.map(qualification => {
                            const Icon = qualification.icon;
                            const text = siteCardTextClass;
                            const rule = 'border-black/5 dark:border-white/10';
                            return (
                                <article key={qualification.id} className={`flex flex-col ${siteFeatureCardClass}`}>
                                    <div className="mb-8 flex items-center gap-6">
                                        <SiteIcon icon={Icon} tone="soft" />
                                        <h2 className={siteFeatureCardTitleClass}>{qualification.title}</h2>
                                    </div>
                                    <p className={`mb-6 ${text}`}>{qualification.description}</p>
                                    <div className="mb-6 flex flex-wrap gap-2">
                                        {qualification.badges.map((badge) => <span key={badge} className="rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-bold tracking-wide text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">{badge}</span>)}
                                    </div>
                                    <div className={`border-t pt-4 ${rule}`}>
                                        <p className="mb-3 text-sm font-bold text-black dark:text-white">{t('이런 분께 추천합니다', 'Recommended for')}</p>
                                        <p className={text}>{qualification.audience}</p>
                                    </div>
                                    <ul className="my-6 space-y-3">
                                        {qualification.points.map((point) => <li key={point} className={`flex items-start gap-3 ${text}`}><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" /><span>{point}</span></li>)}
                                    </ul>
                                    <div className="mt-auto">
                                        <div className={`border-t pt-4 ${rule}`}>
                                            <p className={text}><span className="mb-3 block text-sm font-bold text-black dark:text-white">{t('응시 조건', 'Eligibility')}</span>{qualification.eligibility}</p>
                                        </div>
                                        <button type="button" onClick={() => onSelectQualification(qualification.id)} className={`group mt-8 w-full ${sitePrimaryButtonClass}`}>
                                            <span>{t('상세 안내 보기', 'View Details')}<span className="sr-only"> — {qualification.title}</span></span>
                                            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                                        </button>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                    <p className="mt-8 text-center text-sm leading-relaxed text-gray-500 dark:text-gray-400">{t('자격별 응시 조건과 확인 방법이 다르므로, 상세 안내에서 선택한 자격의 준비 기준을 확인해 주세요.', 'Each qualification has different eligibility and verification requirements. Check the preparation guidance for your chosen qualification.')}</p>
                </div>
            </section>
        </motion.div>
    );
};

export default CertificateCatalog;

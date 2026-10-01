import React, { useState } from 'react';
import { MonitorPlay, Users } from 'lucide-react';
import CertificateSection from '../shared/CertificateSection.jsx';
import { SiteIcon, siteCardClass, siteCardTitleClass, siteCardTextClass, sitePrimaryButtonClass } from '../../shared/SiteLayout.jsx';

const CourseGuide = ({ t }) => {
    const [selectedCourse, setSelectedCourse] = useState(0);
    return (
    <CertificateSection id="handwriting-course" eyebrow="COURSE GUIDE" title={t('클래스 또는 전자책 VOD로 시작하세요', 'Start with a Class or E-book VOD Lessons')} description={t('전자책에 포함된 VOD 강의는 온라인 과정의 학습 선택지입니다. 학습 경로에 따라 제작 결과를 확인받는 방법이 달라집니다.', 'The VOD lessons included with the e-book are an online learning option. The way your production is verified depends on your learning pathway.')} align="center" tone="paper">
        <div className="mb-6 flex justify-center gap-3 md:hidden" role="group" aria-label={t('교육 방식 선택', 'Choose a learning format')}>
            {[t('온라인 과정', 'Online Pathway'), t('오프라인 과정', 'Offline Pathway')].map((title, index) => <button key={title} type="button" aria-pressed={selectedCourse === index} aria-controls={`handwriting-course-${index}`} onClick={() => setSelectedCourse(index)} className={selectedCourse === index ? sitePrimaryButtonClass : 'inline-flex min-h-11 items-center justify-center rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-[#111] px-8 py-4 text-sm font-bold text-gray-500 dark:text-gray-400 transition-colors hover:border-black dark:hover:border-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-500'}>{title}</button>)}
        </div>
        <div className="grid gap-8 md:grid-cols-2">
            <article id="handwriting-course-0" className={`${siteCardClass} ${selectedCourse === 0 ? 'block' : 'hidden md:block'}`}>
                <div className="mb-6"><SiteIcon icon={MonitorPlay} /></div>
                <h3 className={`${siteCardTitleClass} mb-6`}>{t('온라인 과정', 'Online Pathway')}</h3>
                <div className={siteCardTextClass}>
                    <p className="mb-4">{t('다음 두 학습 방법 중 하나를 선택하여 수강합니다.', 'Choose one of the following two learning options.')}</p>
                    <p className="mb-2 font-medium text-black dark:text-white">{t('온라인 손글씨 스탬프 교육 클래스', 'Online handwriting stamp class')}</p>
                    <p><span className="mr-2 text-xs text-emerald-700 dark:text-emerald-400">{t('또는', 'or')}</span><span className="font-medium text-black dark:text-white">{t('손글씨 도장 전자책에 포함된 VOD 강의', 'VOD lessons included with the handwriting stamp e-book')}</span></p>
                </div>
            </article>
            <article id="handwriting-course-1" className={`${siteCardClass} ${selectedCourse === 1 ? 'block' : 'hidden md:block'}`}>
                <div className="mb-6"><SiteIcon icon={Users} /></div>
                <h3 className={`${siteCardTitleClass} mb-6`}>{t('오프라인 과정', 'Offline Pathway')}</h3>
                <div className={siteCardTextClass}>
                    <p className="mb-4">{t('현장에서 진행되는 손글씨 스탬프 교육 클래스를 수강합니다.', 'Attend an on-site handwriting stamp class.')}</p>
                    <p className="font-medium text-black dark:text-white">{t('오프라인 손글씨 스탬프 교육 클래스', 'On-site handwriting stamp class')}</p>
                </div>
            </article>
        </div>
    </CertificateSection>
    );
};

export default CourseGuide;

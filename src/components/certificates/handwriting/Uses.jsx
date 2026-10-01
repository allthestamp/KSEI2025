import React, { useState } from 'react';
import { Gift, Sparkles, Stamp } from 'lucide-react';
import CertificateSection from '../shared/CertificateSection.jsx';
import { SiteIcon, siteCardClass, siteCardTitleClass, siteCardTextClass, sitePrimaryButtonClass } from '../../shared/SiteLayout.jsx';

const Uses = ({ t }) => {
    const [selectedUse, setSelectedUse] = useState(0);
    const uses = [
        { icon: Stamp, title: t('손글씨 스탬프 체험', 'Handwriting stamp activities'), description: t('참여자가 자신의 손글씨로 도안을 만들고 결과물을 찍어보는 체험 활동에 활용할 수 있습니다.', 'Use handwritten stamp making in an activity where participants create their own designs and print the result.') },
        { icon: Gift, title: t('나만의 기념 스탬프', 'Personal keepsake stamps'), description: t('이름이나 짧은 문구를 손글씨로 담아, 선물과 기념 작품을 만드는 데 활용할 수 있습니다.', 'Use handwritten names and short phrases to create personal gifts and keepsake stamps.') },
        { icon: Sparkles, title: t('일상 속 창작 활동', 'Everyday creative activities'), description: t('손글씨 스탬프를 카드, 기록장과 꾸미기 활동에 응용할 수 있습니다.', 'Use handwritten stamps in cards, journals and decorating activities.') },
    ];
    return <CertificateSection id="handwriting-uses" eyebrow="APPLICATIONS" title={t('취득 후 활용 방안', 'Ways to Apply Your Skills')} description={t('배운 제작 과정을 손글씨와 스탬프를 활용한 활동으로 이어갈 수 있습니다.', 'Apply the production skills you learn to activities combining handwriting and stamps.')} tone="paper" align="center">
        <div className="mx-auto max-w-4xl">
            <div className="mb-8 flex flex-wrap justify-center gap-3" role="group" aria-label={t('활용 분야 선택', 'Choose an application area')}>
                {uses.map(({ title }, index) => <button key={title} id={`handwriting-uses-choice-${index}`} type="button" onClick={() => setSelectedUse(index)} aria-pressed={selectedUse === index} aria-controls="handwriting-uses-selected" className={selectedUse === index ? sitePrimaryButtonClass : 'inline-flex min-h-11 items-center justify-center rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-[#111] px-8 py-4 text-sm font-bold text-gray-500 dark:text-gray-400 transition-colors hover:border-black dark:hover:border-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-500'}>{title}</button>)}
            </div>
            <article id="handwriting-uses-selected" aria-labelledby={`handwriting-uses-choice-${selectedUse}`} aria-live="polite" className={siteCardClass}>
                <div className="mb-6"><SiteIcon icon={uses[selectedUse].icon} /></div>
                <h3 className={`${siteCardTitleClass} mb-4`}>{uses[selectedUse].title}</h3>
                <p className={siteCardTextClass}>{uses[selectedUse].description}</p>
            </article>
        </div>
    </CertificateSection>;
};

export default Uses;

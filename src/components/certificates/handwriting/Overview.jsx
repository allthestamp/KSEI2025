import React from 'react';
import { MonitorPlay, PenLine, Users } from 'lucide-react';
import CertificateSection from '../shared/CertificateSection.jsx';
import { SiteIcon, siteCardClass, siteCardTitleClass, siteCardTextClass } from '../../shared/SiteLayout.jsx';

const Overview = ({ t }) => {
    const audiences = [
        { icon: PenLine, title: t('손글씨를 작품으로', 'Handwriting as a creation'), description: t('자신의 글씨를 도안으로 만들고 스탬프로 완성하고 싶은 분', 'For those who want to turn their own writing into a design and a finished stamp') },
        { icon: Users, title: t('체험 활동으로 활용', 'Creative activities'), description: t('손글씨 스탬프 제작을 수업이나 체험 활동에 활용하고 싶은 분', 'For those who want to use handwritten stamp making in classes or creative activities') },
        { icon: MonitorPlay, title: t('나에게 맞는 방식으로', 'Choose how you learn'), description: t('클래스나 전자책 VOD 강의로 제작 과정을 익히고 싶은 분', 'For those who want to learn production through a class or the e-book VOD lessons') },
    ];
    return (
        <CertificateSection id="handwriting-overview" eyebrow="OVERVIEW" title={t('나의 손글씨가 스탬프가 되는 과정', 'Turn Your Handwriting into a Stamp')} description={t('손글씨 도안을 작성하고 직접 스탬프를 제작합니다. 학습한 제작 과정과 결과를 확인받아 자격을 취득하는 과정입니다.', 'Create a handwritten design and produce your own stamp. Qualification follows verification of the production process and result.')} align="center">
            <p className="mb-8 text-center text-sm font-bold text-gray-500 dark:text-gray-400">{t('이런 분께 추천합니다', 'RECOMMENDED FOR')}</p>
            <dl className="grid gap-6 md:grid-cols-3">
                {audiences.map(({ icon, title, description }) => (
                    <div key={title} className={siteCardClass}>
                        <div className="mb-6"><SiteIcon icon={icon} /></div>
                        <dt className={`${siteCardTitleClass} mb-4`}>{title}</dt>
                        <dd className={siteCardTextClass}>{description}</dd>
                    </div>
                ))}
            </dl>
        </CertificateSection>
    );
};

export default Overview;

import React from 'react';
import { CheckCircle2, MonitorPlay, PenLine } from 'lucide-react';
import CertificateSection from '../shared/CertificateSection.jsx';
import { SiteIcon, siteCardClass, siteCardTitleClass, siteCardTextClass } from '../../shared/SiteLayout.jsx';

const Strengths = ({ t }) => {
    const features = [
        { icon: PenLine, title: t('자신의 손글씨로 시작', 'Begin with your own handwriting'), description: t('직접 쓴 글씨를 도안으로 구성하고 스탬프로 완성하는 제작 과정을 익힙니다.', 'Learn the production process of arranging your own handwriting into a design and completing a stamp.') },
        { icon: MonitorPlay, title: t('학습 경로 선택', 'Choose your learning pathway'), description: t('온라인·오프라인 클래스뿐 아니라 전자책에 포함된 VOD 강의로도 온라인 과정을 준비할 수 있습니다.', 'Prepare through an online or offline class, or take the online pathway using the VOD lessons included with the e-book.') },
        { icon: CheckCircle2, title: t('제작 과정과 결과 확인', 'Verification of your work'), description: t('온라인 제작 영상 또는 오프라인 현장 확인으로 학습한 제작 과정과 결과를 확인받습니다.', 'Have your learned production process and result verified through an online video or an on-site check.') },
    ];
    return <CertificateSection id="handwriting-strengths" eyebrow="COURSE FEATURES" title={t('과정의 특징', 'Course Features')} tone="soft" align="center">
        <div className="grid gap-6 md:grid-cols-3">
            {features.map(({ icon, title, description }) => <article key={title} className={siteCardClass}>
                <div className="mb-6"><SiteIcon icon={icon} /></div>
                <h3 className={`${siteCardTitleClass} mb-4`}>{title}</h3><p className={siteCardTextClass}>{description}</p>
            </article>)}
        </div>
    </CertificateSection>;
};

export default Strengths;

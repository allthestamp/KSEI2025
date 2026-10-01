import React from 'react';
import { BookOpen, Palette, Heart } from 'lucide-react';
import CertificateSection from '../shared/CertificateSection.jsx';
import { SiteIcon, siteCardClass, siteCardTitleClass, siteCardTextClass } from '../../shared/SiteLayout.jsx';

export default function Strengths({ t }) {
  const strengths = [
    { icon: BookOpen, title: t('등급에 맞춘 단계별 학습', 'Learning tailored to your level'), description: t('2급의 제작 기초부터 1급의 응용 제작과 지도, 마스터의 교육·창업 과정까지 목표에 맞춰 배웁니다.', 'Learn according to your goals, from Level 2 fundamentals to Level 1 production and instruction, and the Master education and startup course.') },
    { icon: Palette, title: t('작품으로 쌓는 실전 경험', 'Practical experience through your work'), description: t('손글씨·로고·QR 등 다양한 스탬프를 직접 제작하고 포트폴리오로 정리합니다. 등급에 따라 활동지와 강의안도 준비합니다.', 'Make handwriting, logo, QR and other stamps and organize them into a portfolio. Prepare activity sheets and lesson plans according to your level.') },
    { icon: Heart, title: t('취득 이후의 활동 지원', 'Support after certification'), description: t('자격 취득 후 강사 활동과 공방 창업 등 활동 방향을 함께 고민하고, 상담과 지원으로 다음 단계를 준비합니다.', 'Prepare your next steps through consultation and support for activities such as teaching and starting a workshop after certification.') },
  ];
  return (
    <CertificateSection id="stamp-strengths" eyebrow="COURSE FEATURES" title={t('과정의 특징', 'Course features')} description={t('기초를 익히는 데서 끝나지 않고, 작품과 교육으로 연결합니다.', 'Connect what you learn with finished work and education.')} tone="soft" align="center">
      <div className="grid gap-5 md:grid-cols-3 md:gap-6">
        {strengths.map(({ icon, title, description }) => <article key={title} className={`${siteCardClass} flex flex-col min-[480px]:flex-row items-start gap-5 md:block`}>
          <div className="md:mb-8"><SiteIcon icon={icon} /></div>
          <div><h3 className={`${siteCardTitleClass} mb-4`}>{title}</h3><p className={siteCardTextClass}>{description}</p></div>
        </article>)}
      </div>
    </CertificateSection>
  );
}

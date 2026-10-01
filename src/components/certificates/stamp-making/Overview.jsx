import React from 'react';
import { Stamp, Store, GraduationCap } from 'lucide-react';
import CertificateSection from '../shared/CertificateSection.jsx';
import { SiteIcon, siteCardClass, siteCardTitleClass, siteCardTextClass } from '../../shared/SiteLayout.jsx';

export default function Overview({ t }) {
  const audiences = [
    { icon: Stamp, title: t('제작의 기초부터 배우고 싶은 분', 'Those learning the fundamentals'), description: t('스탬프의 재료와 제작 원리를 익히고, 직접 디자인한 도안을 작품으로 완성하고 싶은 분께 추천합니다.', 'Learn materials and production principles, then turn your own designs into finished stamps.') },
    { icon: Store, title: t('공방·브랜드의 활동을 넓히고 싶은 분', 'Workshop owners and designers'), description: t('맞춤 스탬프와 굿즈 제작, 새로운 클래스 등 기존 활동에 스탬프를 더하고 싶은 분께 추천합니다.', 'Add custom stamps, goods and new classes to your workshop or brand.') },
    { icon: GraduationCap, title: t('제작을 가르치고 싶은 분', 'Those interested in teaching'), description: t('제작 실습에 더해 활동지와 강의안을 준비하며, 스탬프 교육을 기획하고 싶은 분께 추천합니다.', 'Prepare activity sheets and lesson plans alongside practical production to plan stamp education.') },
  ];

  return (
    <CertificateSection id="stamp-overview" eyebrow="ABOUT THE QUALIFICATION" align="center" title={t('만드는 기술에서, 가르치는 역량까지', 'From making stamps to teaching others')} description={t('스탬프 제작 지도사는 제작 원리와 실습을 바탕으로 작품을 완성하고, 교육과 다양한 활용으로 이어가는 자격입니다.', 'The Stamp Making Instructor qualification connects production principles and practice with education and practical applications.')}>
      <div className="grid gap-6 md:grid-cols-3">
        {audiences.map(({ icon, title, description }) => (
          <article key={title} className={`${siteCardClass} flex flex-col min-[480px]:flex-row items-start gap-5 md:block`}>
            <div className="md:mb-8"><SiteIcon icon={icon} /></div>
            <div>
              <h3 className={`${siteCardTitleClass} mb-4`}>{title}</h3>
              <p className={siteCardTextClass}>{description}</p>
            </div>
          </article>
        ))}
      </div>
    </CertificateSection>
  );
}

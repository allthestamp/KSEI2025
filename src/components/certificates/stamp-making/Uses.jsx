import React, { useState } from 'react';
import { GraduationCap, Palette, Store, Building2, ShoppingBag, UserCheck } from 'lucide-react';
import CertificateSection from '../shared/CertificateSection.jsx';
import { SiteIcon, siteCardClass, siteCardTitleClass, siteCardTextClass } from '../../shared/SiteLayout.jsx';

export default function Uses({ t }) {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const categories = [
    {
      icon: GraduationCap, title: t('정규 수업 및 클래스 운영', 'Regular classes'),
      items: [
        t('문화센터, 평생교육원, 공방 등에서 정규 수업 운영', 'Regular classes at cultural centers, lifelong education centers and workshops'),
        t('성인 취미반, 원데이 클래스, 소규모 그룹 수업 진행', 'Adult hobby classes, one-day classes and small group lessons'),
        t('초보자 대상 스탬프 제작 기초 교육 운영', 'Fundamental stamp making education for beginners'),
        t('오프라인·온라인 클래스 개설 및 관리', 'Opening and managing online and offline classes'),
      ],
    },
    {
      icon: Palette, title: t('체험 프로그램 운영', 'Hands-on experience programs'),
      items: [
        t('플리마켓, 박람회, 축제 체험 부스 운영', 'Experience booths at flea markets, exhibitions and festivals'),
        t('키즈카페, 미술학원, 지역센터 연계 체험 클래스 진행', 'Experience classes with kids cafes, art academies and community centers'),
        t('가족 체험 행사 및 시즌별 프로그램 기획', 'Family experience events and seasonal programs'),
        t('단기 체험형 수업 및 참여형 이벤트 운영', 'Short-term hands-on classes and participatory events'),
      ],
    },
    {
      icon: Store, title: t('창업 및 판매 활동', 'Workshop startup and sales'),
      items: [
        t('스탬프 전문 공방 창업 및 클래스 운영', 'Starting a stamp workshop and running classes'),
        t('맞춤 스탬프 제작·판매 및 온라인 주문 운영', 'Custom stamp production, sales and online orders'),
        t('소상공인 대상 로고·포장용 스탬프 제작', 'Logo and packaging stamps for small businesses'),
        t('체험과 판매를 연계한 수익형 비즈니스 확장', 'Expanding business activities through experiences and sales'),
      ],
    },
    {
      icon: Building2, title: t('기관·기업 프로그램 기획', 'Institutional and corporate programs'),
      items: [
        t('학교, 복지관, 공공기관 대상 프로그램 제안', 'Programs for schools, welfare centers and public institutions'),
        t('지자체·기관 행사 맞춤형 체험 프로그램 기획', 'Customized experience programs for local government and institutional events'),
        t('기업 워크숍, 단체 수업, 협업 프로그램 구성', 'Corporate workshops, group classes and collaborative programs'),
        t('대상별 교육안, 제안서, 운영안 작성 및 협의', 'Educational plans, proposals and operational plans tailored to participants'),
      ],
    },
    {
      icon: ShoppingBag, title: t('브랜딩·디자인 활용', 'Branding and design'),
      items: [
        t('스탬프를 활용한 로고, 패키지, 굿즈 디자인', 'Logo, packaging and goods design with stamps'),
        t('소상공인·소규모 브랜드 맞춤 제작 제안', 'Custom production for small businesses and brands'),
        t('문구, 엽서, 포장재 등 감성 상품 제작 활용', 'Stationery, postcards, packaging and other creative products'),
        t('브랜드 콘셉트에 맞춘 시각 요소 개발', 'Visual elements tailored to a brand concept'),
      ],
    },
    {
      icon: UserCheck, title: t('교육 기획 및 전문가 활동', 'Educational planning'),
      items: [
        t('후배 강사 양성 및 멘토링 활동', 'Training and mentoring junior instructors'),
        t('연령·대상별 교육 커리큘럼 개발', 'Curriculum development for different ages and participants'),
        t('교육 콘텐츠, 교안, 활동지 제작', 'Educational content, lesson plans and activity sheets'),
        t('전문 교육자 및 상위 과정 운영 역량 확장', 'Developing skills as an educator and advanced course instructor'),
      ],
    },
  ];
  const selected = categories[selectedCategory];

  return (
    <CertificateSection
      id="stamp-uses"
      eyebrow="PRACTICAL APPLICATIONS"
      title={t('취득 후 활용 방안', 'Ways to use your qualification')}
      description={t('배운 제작 기술과 교육 역량을 수업, 체험, 제작·판매 등 다양한 활동으로 이어갈 수 있습니다.', 'Apply production and teaching skills to classes, experiences, custom work and sales.')}
      align="center"
    >
      <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] md:gap-8">
        <div className="grid grid-cols-2 gap-1.5 rounded-[2rem] border border-black/5 bg-gray-100/50 p-1.5 dark:border-white/5 dark:bg-white/5 md:grid-cols-1" role="group" aria-label={t('활용 분야 선택', 'Choose an application area')}>
          {categories.map(({ title }, index) => <button
            key={index}
            id={`stamp-uses-category-${index}`}
            type="button"
            onClick={() => setSelectedCategory(index)}
            aria-pressed={selectedCategory === index}
            aria-controls="stamp-uses-selected"
            className={`flex min-h-11 items-center rounded-full px-4 py-2.5 text-left text-sm font-medium leading-relaxed tracking-wide transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600 md:px-6 md:py-4 ${selectedCategory === index ? 'bg-white text-black shadow-sm dark:bg-[#222] dark:text-white' : 'text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white'}`}
          ><span>{title}</span></button>)}
        </div>
        <article id="stamp-uses-selected" aria-labelledby={`stamp-uses-category-${selectedCategory}`} aria-live="polite" className={siteCardClass}>
          <div className="mb-6 flex items-center gap-5 md:mb-8">
            <SiteIcon icon={selected.icon} />
            <h3 className={siteCardTitleClass}>{selected.title}</h3>
          </div>
          <ul className="space-y-3 md:space-y-4">
            {selected.items.map(item => <li key={item} className={`flex items-start gap-3 md:gap-4 ${siteCardTextClass}`}><span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30" aria-hidden="true"><span className="h-2 w-2 rounded-full bg-emerald-500" /></span><span>{item}</span></li>)}
          </ul>
        </article>
      </div>
    </CertificateSection>
  );
}

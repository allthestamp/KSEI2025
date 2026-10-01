import React, { useRef, useState } from 'react';
import { BookOpen, Stamp, Award, ArrowUpRight, ChevronDown } from 'lucide-react';
import CertificateSection from '../shared/CertificateSection.jsx';
import QualificationFees from '../shared/QualificationFees.jsx';
import { SiteIcon, siteCardClass, siteCardTitleClass, siteCardTextClass, sitePrimaryButtonClass } from '../../shared/SiteLayout';

function LevelDetails({ t, items, portfolioTitle, portfolio, showPortfolioTitle = true }) {
  return <>
    <ul className="space-y-2.5">
      {items.map(item => <li key={item} className={`flex items-start gap-3 ${siteCardTextClass}`}><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" /><span>{item}</span></li>)}
    </ul>
    <div className="mt-6 border-t border-black/10 pt-5 dark:border-white/15">
      <p className="mb-2 text-xs font-medium text-emerald-700 dark:text-emerald-400">{t('준비할 내용', 'What to prepare')}</p>
      {showPortfolioTitle && <h4 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">{portfolioTitle}</h4>}
      <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-400">{portfolio}</p>
    </div>
  </>;
}

export default function Levels({ t, onShowLevel }) {
  const [activeLevel, setActiveLevel] = useState(0);
  const tabRefs = useRef([]);
  const levels = [
    {
      id: '2급', icon: BookOpen, label: t('2급 · 기초', 'Level 2 · Basic'), title: t('스탬프 제작의 기초', 'Fundamentals of stamp making'),
      description: t('제작 원리와 재료를 이해하고 기본 도안부터 스탬프 제작까지 기초 역량을 익힙니다.', 'Learn production principles, materials, basic design and stamp making.'),
      items: [t('스탬프 제작 원리 및 재료 이해', 'Production principles and materials'), t('손글씨 및 기본 도안 제작', 'Handwriting and basic design'), t('팝핑머신을 활용한 제작 실습', 'Practice using a popping machine'), t('문구·로고 등 기본 스탬프 제작', 'Basic text and logo stamps')],
      portfolioTitle: t('스탬프 5종 + 손글씨 활동지', '5 stamps + handwriting activity sheet'), portfolio: t('손글씨 · 칭찬 · 로고 · QR · 음각 스탬프', 'Handwriting · Praise · Logo · QR · Engraved stamps'), color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
    },
    {
      id: '1급', icon: Stamp, label: t('1급 · 심화', 'Level 1 · Advanced'), title: t('상업용 제작과 기초 지도', 'Commercial production and instruction'),
      description: t('응용 제작 기술을 익히고, 상업적으로 활용할 수 있는 작품과 기초 교육을 준비합니다.', 'Develop applied production techniques, work for commercial use and basic instruction skills.'),
      items: [t('상업용 스탬프 제작 및 응용 기술', 'Commercial production and applications'), t('다양한 도안 구성과 디자인 활용', 'Design composition and applications'), t('스탬프 제작 지도 방법 기초', 'Fundamentals of teaching stamp making'), t('공방·체험 수업 운영 기초', 'Workshop and experience class fundamentals')],
      portfolioTitle: t('스탬프 10종 + 활동지 + 강의안', '10 stamps + activity sheet + lesson plan'), portfolio: t('2급 5종에 이름 · 투톤 · 의류 · 화이트 · 형광 스탬프를 더하고, 취미반 강의안을 준비합니다.', 'Add name, two-tone, clothing, white and fluorescent stamps to the five Level 2 types, and prepare a hobby-class lesson plan.'), color: 'bg-emerald-600 text-white',
    },
    {
      id: '마스터', icon: Award, label: t('마스터 · 전문가', 'Master · Expert'), title: t('교육 및 창업·강사 과정', 'Education and workshop development'),
      description: t('고급 제작 기술과 교육 설계를 바탕으로 강사·창업자로서의 전문 역량을 넓힙니다.', 'Expand your professional capabilities through advanced production and educational planning.'),
      items: [t('고급 스탬프 제작과 창작 작품 구현', 'Advanced production and creative work'), t('단계별 커리큘럼 설계 및 지도법', 'Curriculum planning and teaching methods'), t('체험 프로그램·강의 운영 방법', 'Experience programs and class operation'), t('공방 창업과 비즈니스 모델 구축', 'Workshop startup and business models')],
      portfolioTitle: t('전문 교육·창업 역량 확장', 'Expand education and startup skills'), portfolio: t('과정의 세부 내용과 준비 사항은 자세한 안내를 확인해 주세요.', 'View the detailed guide for course information and preparation requirements.'), color: 'bg-emerald-800 text-white dark:bg-emerald-400 dark:text-emerald-950',
    },
  ];
  const selected = levels[activeLevel];
  const eligibility = id => id === '마스터'
    ? t('1급 자격증 취득 후 경력을 바탕으로 교육 상담을 통해 안내받으실 수 있습니다.', 'After obtaining Level 1, please consult us about the Master course based on your experience.')
    : t('온라인 또는 오프라인 스탬프 교육 클래스 수강 후 응시할 수 있습니다.', 'You may apply after taking an online or offline stamp education class.');

  function selectTab(index) {
    setActiveLevel(index);
  }

  function handleTabKey(event, index) {
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % levels.length;
    else if (event.key === 'ArrowLeft') next = (index - 1 + levels.length) % levels.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = levels.length - 1;
    else return;
    event.preventDefault();
    selectTab(next);
    tabRefs.current[next]?.focus();
  }

  function detailButton(id) {
    return <button
      type="button"
      onClick={() => onShowLevel?.(id)}
      className={`mt-8 self-start ${sitePrimaryButtonClass}`}
    >
      <span>{t(`${id} 자세히 보기`, `View ${id === '마스터' ? 'Master' : id === '1급' ? 'Level 1' : 'Level 2'} details`)}</span>
      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </button>;
  }

  return (
    <CertificateSection
      id="stamp-levels"
      eyebrow="CERTIFICATION LEVELS"
      title={t('자격증 등급별 안내', 'Certification levels')}
      description={t('제작의 기초, 응용과 지도, 전문 교육까지 목표에 맞는 등급을 살펴보세요.', 'Explore levels for fundamental production, applied work and instruction, and professional education.')}
    >
      <div className="md:hidden">
        <div className="mb-6 flex rounded-full border border-black/5 bg-gray-100/50 p-1.5 dark:border-white/5 dark:bg-white/5" role="tablist" aria-label={t('자격증 등급 선택', 'Choose a qualification level')}>
          {levels.map((level, index) => <button
            key={level.id}
            ref={element => { tabRefs.current[index] = element; }}
            id={`stamp-level-tab-${index}`}
            type="button"
            role="tab"
            aria-selected={activeLevel === index}
            aria-controls="stamp-level-active-panel"
            tabIndex={activeLevel === index ? 0 : -1}
            onClick={() => selectTab(index)}
            onKeyDown={event => handleTabKey(event, index)}
            className={`min-h-11 flex-1 rounded-full px-1 py-2.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-emerald-600 ${activeLevel === index ? 'bg-white text-black shadow-sm dark:bg-[#222] dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}
          >{level.label}</button>)}
        </div>
        <article
          key={selected.id}
          id="stamp-level-active-panel"
          role="tabpanel"
          aria-labelledby={`stamp-level-tab-${activeLevel}`}
          tabIndex={0}
          className={`${siteCardClass} focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600`}
        >
          <div className="mb-6"><SiteIcon icon={selected.icon} /></div>
          <h3 className={siteCardTitleClass}>{selected.title}</h3>
          <p className={`mt-4 ${siteCardTextClass}`}>{selected.description}</p>
          <p className="mt-5 text-base font-medium text-emerald-800 dark:text-emerald-300">{selected.portfolioTitle}</p>
          <p className="mt-3 text-xs leading-relaxed text-gray-500 dark:text-gray-400"><span className="font-medium text-gray-800 dark:text-gray-200">{t('응시 조건 · ', 'Eligibility · ')}</span>{eligibility(selected.id)}</p>
          <details className="group mt-5 border-y border-black/10 dark:border-white/15">
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 py-3 text-sm font-medium text-gray-800 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-emerald-600 dark:text-gray-200 [&::-webkit-details-marker]:hidden">
              <span>{t('교육 내용·준비 사항', 'Course content and preparation')}</span>
              <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180 motion-reduce:transition-none" aria-hidden="true" />
            </summary>
            <div className="pb-5 pt-2"><LevelDetails t={t} {...selected} showPortfolioTitle={false} /></div>
          </details>
          {detailButton(selected.id)}
        </article>
      </div>
      <div className="hidden gap-8 md:grid md:grid-cols-3">
        {levels.map(({ id, icon: Icon, label, title, description, items, portfolioTitle, portfolio }) => (
          <article key={id} className={`flex flex-col ${siteCardClass}`}>
            <div className="mb-8"><SiteIcon icon={Icon} /></div>
            <p className="mb-4 self-start rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-bold tracking-wide text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">{label}</p>
            <h3 className={`mb-4 ${siteCardTitleClass}`}>{title}</h3>
            <p className={`mb-6 ${siteCardTextClass}`}>{description}</p>
            <div className="flex-1"><LevelDetails t={t} items={items} portfolioTitle={portfolioTitle} portfolio={portfolio} /></div>
            <p className="mt-5 text-xs leading-relaxed text-gray-500 dark:text-gray-400"><span className="font-medium text-gray-800 dark:text-gray-200">{t('응시 조건 · ', 'Eligibility · ')}</span>{eligibility(id)}</p>
            {detailButton(id)}
          </article>
        ))}
      </div>
      <div className="mt-10 grid gap-5 md:mt-16 md:grid-cols-[1fr_2fr] md:gap-12">
        <h3 className="text-xl font-medium tracking-tight text-black dark:text-white md:text-2xl">{t('검정료 안내', 'Examination fees')}</h3>
        <QualificationFees t={t} qualification="stamp-making" />
      </div>
    </CertificateSection>
  );
}

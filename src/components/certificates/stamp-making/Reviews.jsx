import React, { useState } from 'react';
import { Quote, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import CertificateSection from '../shared/CertificateSection.jsx';
import { SiteIcon, siteCardClass } from '../../shared/SiteLayout';

export default function Reviews({ t }) {
  const [activeReview, setActiveReview] = useState(0);
  const [expanded, setExpanded] = useState(false);
  // 후기 추가·수정은 아래 배열에서 진행합니다. 실제 기존 후기 8개를 유지합니다.
  const reviews = [
    {
      name: '김*진', role: t('1급 자격증', 'Level 1 Certified'),
      content: t('초기 창업 비용이 비교적 적어서 시작해보고 싶다는 마음은 있었지만, 막상 무엇부터 준비해야 할지 막막했습니다. 처음에는 협회에서 연결해 준 작은 행사부터 참여했는데, 그 경험이 쌓이면서 지금은 제가 직접 기관에 제안서를 보내고 프로그램을 운영하고 있습니다. 혼자 시작했을 때보다 훨씬 체계적으로 방향을 잡을 수 있다고 생각해 만족합니다!', 'I wanted to start because the initial startup cost was relatively low, but I was at a loss as to what to prepare first. At first, I participated in small events connected by the association, and as that experience accumulated, I am now sending proposals directly to institutions and running programs. I am satisfied because I think I can set the direction much more systematically than when I started alone!'),
    },
    {
      name: '조*자', role: t('1급 자격증', 'Level 1 Certified'),
      content: t('아이를 키우며 경력이 끊긴 뒤, 저도 다시 제 일을 해보고 싶다는 마음으로 시작했어요. 처음에는 아이들 학원비 정도만 보탤 수 있어도 좋겠다고 생각했는데, 지금은 꾸준히 수업과 체험을 운영하면서 제 일에 대한 자신감도 많이 생겼고 무엇보다 시간과 공간의 제약을 비교적 덜 받으면서 활동할 수 있다는 점이 큰 장점이었습니다. 자격증이 있으니 기관이나 학부모에게 프로그램을 소개할 때도 조금 더 신뢰 있게 설명할 수 있어요!', "After my career was interrupted while raising a child, I started with the desire to do my own work again. At first, I thought it would be good if I could just add enough for my children's academy fees, but now, as I steadily run classes and experiences, I have gained a lot of confidence in my work, and above all, the biggest advantage is that I can work with relatively fewer time and space constraints. Having a certification allows me to explain programs more reliably when introducing them to institutions or parents!"),
    },
    {
      name: '남*희', role: t('2급 자격증', 'Level 2 Certified'),
      content: t('기존에 공방을 운영하면서 새로운 클래스를 추가하고 싶어 스탬프 제작 지도사 과정을 수강하게 되었습니다. 단순히 자격증 취득에 그치는 과정이 아니라, 실제 수업에서 어떻게 설명하고 어떤 방식으로 진행해야 하는 지까지 배울 수 있어서 만족도가 높았습니다. 이론보다 실무에 바로 연결되는 점이 특히 좋았습니다.', 'I took the stamp making instructor course because I wanted to add a new class while running an existing workshop. It was not just a course that ended with obtaining a certification, but I was highly satisfied because I could learn how to explain and how to proceed in actual classes. The fact that it was directly connected to practice rather than theory was especially good.'),
    },
    {
      name: '김*영', role: t('1급 자격증', 'Level 1 Certified'),
      content: t('문화센터나 외부 출강 활동에 관심은 있었지만, 막연히 ‘내가 할 수 있을까’ 하는 부담이 컸습니다. 자격 과정을 통해 스탬프 제작 원리부터 포트폴리오 준비까지 차근차근 배우면서 자신감을 얻었습니다. 특히 단순 제작 기술만 배우는 것이 아니라, 교육 프로그램으로 어떻게 구성할 수 있는지를 배운 점이 큰 장점이었습니다.', "I was interested in cultural center or external lecture activities, but I had a big burden of vaguely thinking, 'Can I do it?'. Through the certification course, I gained confidence by learning step by step from the principles of stamp making to portfolio preparation. In particular, the biggest advantage was learning how to organize it into an educational program, not just learning simple production techniques."),
    },
    {
      name: '장*정', role: t('2급 자격증', 'Level 2 Certified'),
      content: t('처음에는 자격증이 이름만 있는 과정은 아닐까 걱정 했습니다. 그런데 실제로 준비해보니 제작 실습, 포트폴리오, 수업 기획까지 생각보다 꼼꼼하게 과정을 밟게 되어 오히려 더 만족스러웠습니다. 자격증을 준비하는 과정 자체가 실력을 정리하고 현장에 적용하는 연습이 되었고, 취득 후에는 제 활동을 소개할 때 전문성을 보여주는 기준이 되어 주었습니다. 단순한 수료가 아니라 실제 활용을 염두에 둔 과정이라는 점이 인상적이었습니다.', 'At first, I was worried that the certification was just a course in name only. However, when I actually prepared for it, I was rather more satisfied because I went through the process more meticulously than I thought, including production practice, portfolio, and class planning. The process of preparing for the certification itself became an exercise in organizing my skills and applying them to the field, and after obtaining it, it became a standard showing my professionalism when introducing my activities. It was impressive that it was not just a simple completion, but a course with actual application in mind.'),
    },
    {
      name: '김*지', role: t('1급 자격증 취득', 'Level 1 Certified'),
      content: t('평소 다꾸(다이어리 꾸미기)에 관심이 많았는데, 스탬프 아트라는 새로운 세계를 알게 되어 너무 즐거웠습니다. 체계적인 커리큘럼 덕분에 기초부터 탄탄하게 배울 수 있었고, 지금은 작은 공방 창업을 준비하고 있습니다.', "I was always interested in diary decorating, and learning about the new world of stamp art was so much fun. Thanks to the systematic curriculum, I was able to learn solidly from the basics, and now I'm preparing to open a small workshop."),
    },
    {
      name: '이*현', role: t('1급 자격증 취득', 'Level 1 Certified'),
      content: t('미술 학원을 운영하면서 아이들에게 새로운 미술 활동을 제공하고 싶어 수강하게 되었습니다. 아이들의 반응이 폭발적이고, 학부모님들의 만족도도 매우 높습니다. 강사로서의 역량을 한 단계 높일 수 있는 훌륭한 과정이었습니다.', "I took this course because I wanted to provide new art activities to children while running an art academy. The children's reactions are explosive, and the parents' satisfaction is very high. It was an excellent course to elevate my skills as an instructor."),
    },
    {
      name: '박*윤', role: t('2급 자격증 취득', 'Level 2 Certified'),
      content: t('취미로 시작했지만, 자격증까지 취득하게 되어 정말 뿌듯합니다. 온라인으로도 충분히 꼼꼼한 피드백을 받을 수 있어서 직장 생활과 병행하기 좋았습니다. 나만의 굿즈를 만드는 재미에 푹 빠져있어요.', "I started it as a hobby, but I'm really proud to have obtained the certification. It was great to balance with work because I could get thorough feedback online. I'm totally into the fun of making my own goods."),
    },
  ];

  const { name, role, content } = reviews[activeReview];

  function changeReview(direction) {
    setActiveReview(current => (current + direction + reviews.length) % reviews.length);
    setExpanded(false);
  }

  return (
    <CertificateSection
      id="stamp-reviews"
      eyebrow="STUDENT STORIES"
      title={t('수강·자격 취득 후기', 'Course and certification stories')}
      description={t('스탬프 제작 지도사 과정을 경험한 분들의 이야기를 만나보세요.', 'Meet those who have experienced the Stamp Making Instructor course.')}
      tone="paper"
    >
      <div
        className="mx-auto max-w-3xl"
        role="region"
        aria-roledescription={t('후기 슬라이드', 'carousel')}
        aria-label={t('수강·자격 취득 후기', 'Course and certification stories')}
      >
        <article
          id="stamp-review-card"
          className={`flex flex-col ${siteCardClass}`}
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="mb-6 md:mb-8"><SiteIcon icon={Quote} /></div>
          <div className={expanded ? '' : 'min-h-[8rem] md:min-h-[9rem]'}>
            <blockquote id="stamp-review-content" className={`text-base font-light leading-relaxed text-gray-500 dark:text-gray-400 md:text-lg ${expanded ? '' : 'line-clamp-4'}`}>
              {content}
            </blockquote>
          </div>
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls="stamp-review-content"
            onClick={() => setExpanded(current => !current)}
            className="mt-2 inline-flex min-h-11 items-center gap-1 self-start py-1 text-sm font-medium text-emerald-700 underline decoration-emerald-700/30 underline-offset-4 hover:decoration-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600 dark:text-emerald-400 dark:decoration-emerald-400/40"
          >
            {expanded ? t('접기', 'Show less') : t('더보기', 'Read more')}
            {expanded ? <ChevronUp className="h-4 w-4" aria-hidden="true" /> : <ChevronDown className="h-4 w-4" aria-hidden="true" />}
          </button>
          <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-black/15 pt-5 dark:border-white/20">
            <h3 className="text-base font-medium text-black dark:text-white">{name}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">{role}</p>
          </div>
        </article>
        <div className="mt-5 flex items-center justify-between gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => changeReview(-1)}
            aria-label={t('이전 후기', 'Previous review')}
            aria-controls="stamp-review-card"
            className="inline-flex min-h-11 items-center gap-2 py-2 text-sm font-medium text-gray-800 transition-colors hover:text-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600 dark:text-gray-200 dark:hover:text-emerald-300"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />{t('이전', 'Previous')}
          </button>
          <p className="min-w-14 text-center text-sm tabular-nums text-gray-600 dark:text-gray-400" aria-label={t(`전체 ${reviews.length}개 중 ${activeReview + 1}번째 후기`, `Review ${activeReview + 1} of ${reviews.length}`)}>
            {activeReview + 1}<span className="mx-1.5 text-gray-400">/</span>{reviews.length}
          </p>
          <button
            type="button"
            onClick={() => changeReview(1)}
            aria-label={t('다음 후기', 'Next review')}
            aria-controls="stamp-review-card"
            className="inline-flex min-h-11 items-center gap-2 py-2 text-sm font-medium text-gray-800 transition-colors hover:text-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600 dark:text-gray-200 dark:hover:text-emerald-300"
          >
            {t('다음', 'Next')}<ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </CertificateSection>
  );
}

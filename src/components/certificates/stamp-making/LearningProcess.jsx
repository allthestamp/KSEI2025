import React from 'react';
import { ArrowRight, MessageCircle, BookOpen, Palette, Award } from 'lucide-react';
import CertificateSection from '../shared/CertificateSection.jsx';
import LearningRoutes from '../shared/LearningRoutes.jsx';
import { siteCardTitleClass, siteCardTextClass, sitePrimaryButtonClass } from '../../shared/SiteLayout.jsx';

export default function LearningProcess({ t, onNavigate }) {
  const steps = [
    { icon: MessageCircle, title: t('교육 상담', 'Consultation'), description: t('개인의 목표인 1급·2급에 맞는 교육 과정을 상담합니다.', 'Discuss a curriculum that fits your Level 1 or Level 2 goals.') },
    { icon: BookOpen, title: t('이론 및 실기', 'Theory and practice'), description: t('온라인 또는 오프라인 스탬프 교육 클래스를 수강하며 제작 원리와 실전 기술을 익힙니다.', 'Complete an online or offline stamp class to learn production principles and practical techniques.') },
    { icon: Palette, title: t('포트폴리오 및 실기 평가', 'Portfolio and practical assessment'), description: t('포트폴리오를 준비하고, 선택한 응시 방식에 따라 제작 실력을 평가받습니다.', 'Prepare your portfolio and demonstrate your production skills through your selected assessment route.') },
    { icon: Award, title: t('자격증 취득', 'Certification'), description: t('심사를 거쳐 스탬프 제작 지도사 자격증을 취득합니다.', 'Receive your Stamp Making Instructor certificate after review.') },
  ];
  const routes = [
    { title: t('온라인 과정', 'Online route'), description: t('클래스 수강 후 작품과 제작 과정으로 실력을 보여주세요.', 'Demonstrate your skills through your work and a production video after completing the class.'), items: [t('온라인 스탬프 교육 클래스 수강', 'Complete an online stamp education class'), t('등급에 맞는 포트폴리오 준비', 'Prepare the portfolio required for your level'), t('실기영상 제출 및 포트폴리오 심사', 'Submit a practical video and portfolio for assessment'), t('심사 후 자격증 발급', 'Certificate issued after assessment')] },
    { title: t('오프라인 과정', 'Offline route'), description: t('클래스 수강 후 감독관 앞에서 제작 과정을 시연합니다.', 'Demonstrate the production process in front of a supervisor after completing the class.'), items: [t('오프라인 스탬프 교육 클래스 수강', 'Complete an offline stamp education class'), t('등급에 맞는 포트폴리오 준비', 'Prepare the portfolio required for your level'), t('포트폴리오용으로 준비한 스탬프로 감독관 앞 시연', 'Demonstrate with a stamp prepared for your portfolio'), t('심사 후 자격증 발급', 'Certificate issued after assessment')] },
  ];

  return (
    <CertificateSection id="stamp-learning" eyebrow="LEARNING & PREPARATION" title={t('교육·준비 과정', 'Learning and preparation')} description={t('교육 상담부터 포트폴리오와 실기 평가까지, 목표에 맞춰 차근차근 준비합니다.', 'Prepare step by step, from consultation to your portfolio and practical assessment.')} align="center">
      <ol className="relative grid md:grid-cols-4 md:gap-8">
        {steps.map(({ icon: Icon, title, description }, index) => (
          <li key={title} className="group relative flex items-start gap-4 pb-6 last:pb-0 md:block md:pb-0 md:text-center">
            {index < steps.length - 1 && <span className="pointer-events-none absolute left-1/2 right-[calc(-50%_-_2rem)] top-12 hidden h-px bg-black/10 dark:bg-white/10 md:block" aria-hidden="true" />}
            <span className="relative z-10 mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-xs font-bold text-white dark:bg-white dark:text-black md:hidden">{index + 1}</span>
            <div className="relative z-10 mx-auto mb-8 hidden h-24 w-24 items-center justify-center rounded-full border border-black/10 bg-white shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:border-emerald-500 group-hover:bg-emerald-50 dark:border-white/10 dark:bg-[#111] dark:group-hover:bg-emerald-900/20 md:flex">
              <Icon className="h-10 w-10 text-gray-400 transition-colors group-hover:text-emerald-500 dark:text-gray-500" aria-hidden="true" />
              <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black text-xs font-bold text-white shadow-lg dark:bg-white dark:text-black">{index + 1}</span>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className={`${siteCardTitleClass} mb-3`}>{title}</h3>
              <p className={siteCardTextClass}>{description}</p>
            </div>
          </li>
        ))}
      </ol>
      <LearningRoutes t={t} id="stamp-learning" routes={routes} />
      {onNavigate && <div className="mt-10 text-center"><button type="button" onClick={() => onNavigate('exam', 'stamp-making')} className={sitePrimaryButtonClass}>{t('시험·접수 안내 확인', 'View assessment and application details')}<ArrowRight className="h-4 w-4" aria-hidden="true" /></button></div>}
    </CertificateSection>
  );
}

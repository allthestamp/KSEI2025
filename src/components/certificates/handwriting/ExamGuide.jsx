import React, { useState } from 'react';
import { BookOpen, Video, Users, CheckCircle, FileText, CreditCard, Copy, Check, ChevronRight, Mail } from 'lucide-react';
import CertificateSection from '../shared/CertificateSection';
import QualificationFees from '../shared/QualificationFees';
import { assetUrl } from '../../../utils/publicAssets';

// 손글씨 스탬프체험 지도사의 응시·촬영 안내를 이 파일에서 수정합니다.
// 검정료는 handwriting/fees.js에서 관리합니다.
export default function HandwritingExamGuide({ t, setShowApplyModal, setCurrentPage }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText('351-1372-1557-33');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };
  const card = 'rounded-[2rem] border border-black/5 dark:border-white/5 bg-gray-50 dark:bg-[#111] p-6 md:p-9';
  const detail = 'text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed';
  const goTo = (page) => {
    setCurrentPage?.(page);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <CertificateSection id="handwriting-exam-eligibility" eyebrow="ELIGIBILITY" title={t('손글씨 스탬프체험 지도사 응시 안내', 'Handwriting Stamp Experience Instructor examination')} description={t('온라인·오프라인 클래스 또는 손글씨 도장 전자책에 포함된 VOD 강의 수강 후 응시할 수 있습니다.', 'Apply after completing an online or offline class, or the VOD lessons included with the handwriting stamp ebook.')}>
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <article className={card}>
            <Video className="w-9 h-9 text-emerald-600 dark:text-emerald-400 mb-5" aria-hidden="true" />
            <h3 className="text-2xl font-bold text-black dark:text-white mb-4">{t('온라인 과정', 'Online pathway')}</h3>
            <p className={detail}>{t('스탬프 교육 클래스 또는 손글씨 도장 전자책에 포함된 VOD 강의를 수강한 후, 본인의 손글씨 스탬프 제작 영상을 제출합니다. 영상 확인 후 자격증이 발급됩니다.', 'Complete a stamp education class or the VOD lessons included with the handwriting stamp ebook, then submit a video of yourself making your own handwriting stamp. The certificate is issued after the video is reviewed.')}</p>
            <div className="mt-6 rounded-2xl bg-white dark:bg-[#1a1a1a] p-5 flex gap-3">
              <BookOpen className="w-5 h-5 shrink-0 text-emerald-500 mt-0.5" aria-hidden="true" />
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{t('전자책을 구매한 경우, 포함된 VOD 강의를 수강해야 응시할 수 있습니다.', 'Ebook purchasers must complete the included VOD lessons before applying.')}</p>
            </div>
          </article>
          <article className={card}>
            <Users className="w-9 h-9 text-emerald-600 dark:text-emerald-400 mb-5" aria-hidden="true" />
            <h3 className="text-2xl font-bold text-black dark:text-white mb-4">{t('오프라인 과정', 'Offline pathway')}</h3>
            <p className={detail}>{t('현장 강의를 수강한 후, 현장에서 강사의 확인을 거쳐 자격증이 발급됩니다.', 'Complete an in-person class. The certificate is issued after verification by the instructor on site.')}</p>
            <div className="mt-6 rounded-2xl bg-white dark:bg-[#1a1a1a] p-5 flex gap-3">
              <CheckCircle className="w-5 h-5 shrink-0 text-emerald-500 mt-0.5" aria-hidden="true" />
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{t('아래 온라인 영상 제출 안내는 온라인 응시자에게 적용됩니다.', 'The video submission instructions below apply to online applicants.')}</p>
            </div>
          </article>
        </div>
      </CertificateSection>

      <CertificateSection id="handwriting-video-guide" eyebrow="ONLINE PRACTICAL" title={t('온라인 실기영상 촬영 안내', 'Online practical video guide')} description={t('손글씨 도안을 그리는 과정부터 스탬프 제작과 인쇄 결과까지 본인의 작업을 보여 주세요.', 'Show your own work from drawing the handwriting design to making the stamp and displaying the printed results.')} tone="soft">
        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            [t('본인 확인', 'Identity verification'), t('신분증을 3초 이상 제시하고 본인의 이름을 말합니다.', 'Show your ID for at least 3 seconds and state your name.')],
            [t('도구·재료 설명', 'Tools and materials'), t('준비한 도구와 재료를 소개하고 용도를 설명합니다.', 'Introduce the prepared tools and materials and explain their purpose.')],
            [t('손글씨 도안·제작', 'Handwriting design and production'), t('직접 손글씨 도안을 그리는 과정부터 제작 전 과정을 설명하며 촬영합니다.', 'Film and explain the entire process, starting with drawing your handwriting design.')],
            [t('인쇄·마무리', 'Printing and closing'), t('완성된 스탬프로 20회 이상 인쇄하여 결과를 보여 주고 마무리합니다.', 'Make at least 20 prints with the completed stamp, show the results, and close the demonstration.')],
          ].map(([title, description], index) => (
            <li key={title} className="rounded-3xl bg-white dark:bg-[#111] border border-black/5 dark:border-white/5 p-6">
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">STEP {String(index + 1).padStart(2, '0')}</span>
              <h3 className="text-lg font-bold text-black dark:text-white mt-4 mb-3">{title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 rounded-3xl border border-black/5 dark:border-white/5 bg-white dark:bg-[#111] p-6 md:p-8">
          <h3 className="text-xl font-bold text-black dark:text-white mb-5">{t('촬영 형식과 제출 기한', 'Recording format and deadline')}</h3>
          <ul className="space-y-4">
            {[
              t('가로 화면, 720p 이상의 해상도, MP4 형식으로 10~20분 동안 촬영합니다.', 'Record horizontally at 720p or higher in MP4 format, for 10–20 minutes.'),
              t('손글씨 도안과 작업 과정, 완성된 인쇄 결과가 잘 보이도록 카메라를 고정합니다.', 'Keep the camera fixed so the handwriting design, work process, and printed results are clearly visible.'),
              t('잉크가 흡수되기를 기다리는 동안에는 촬영을 잠시 중단할 수 있습니다.', 'You may pause recording while waiting for the ink to absorb.'),
              t('파일명은 성명_검정번호로 작성하고 검정 접수일로부터 30일 이내 제출합니다.', 'Name the file Name_ExamNumber and submit it within 30 days of examination registration.'),
              t('영상을 Google Drive에 업로드한 후 확인 가능한 공유 링크를 이메일로 제출합니다.', 'Upload the video to Google Drive and submit an accessible sharing link by email.'),
            ].map((text) => (
              <li key={text} className="flex gap-3 items-start">
                <CheckCircle className="w-5 h-5 mt-0.5 shrink-0 text-emerald-500" aria-hidden="true" />
                <span className={detail}>{text}</span>
              </li>
            ))}
          </ul>
          <a href="mailto:ksei2025@naver.com" className="mt-6 inline-flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-semibold break-all">
            <Mail className="w-5 h-5 shrink-0" aria-hidden="true" /> ksei2025@naver.com
          </a>
          <a href={assetUrl('/documents/handwriting-online-practical-guide.docx')} download className="mt-6 flex items-center justify-between gap-4 rounded-2xl bg-gray-50 dark:bg-[#1a1a1a] p-5 text-black dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            <span className="flex items-center gap-3"><FileText className="w-5 h-5 shrink-0" aria-hidden="true" />{t('온라인 실기 안내문 및 평가표 다운로드 (Word)', 'Download the practical examination guide and evaluation criteria (Word)')}</span>
            <ChevronRight className="w-5 h-5 shrink-0" aria-hidden="true" />
          </a>
        </div>
      </CertificateSection>

      <CertificateSection id="handwriting-exam-fees" eyebrow="FEES & PAYMENT" title={t('검정료 및 입금 안내', 'Examination fees and payment')}>
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <div className={card}>
            <h3 className="text-xl font-bold text-black dark:text-white mb-6">{t('손글씨 스탬프체험 지도사 검정료', 'Handwriting Stamp Experience Instructor fee')}</h3>
            <QualificationFees t={t} qualification="handwriting" />
          </div>
          <div className={card}>
            <CreditCard className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mb-5" aria-hidden="true" />
            <h3 className="text-xl font-bold text-black dark:text-white mb-6">{t('입금 계좌', 'Bank account')}</h3>
            <dl className="space-y-5">
              <div><dt className="text-xs text-gray-500 dark:text-gray-400 mb-2">{t('은행명', 'Bank')}</dt><dd className="text-lg font-semibold text-black dark:text-white">{t('농협', 'NH Bank')}</dd></div>
              <div><dt className="text-xs text-gray-500 dark:text-gray-400 mb-2">{t('계좌번호', 'Account number')}</dt><dd><button type="button" onClick={handleCopy} className="inline-flex flex-wrap items-center gap-3 text-lg font-semibold text-black dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400" aria-label={t('계좌번호 복사', 'Copy account number')}>351-1372-1557-33{copied ? <Check className="w-4 h-4" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}</button><span className="sr-only" role="status">{copied ? t('계좌번호가 복사되었습니다.', 'Account number copied.') : ''}</span></dd></div>
              <div><dt className="text-xs text-gray-500 dark:text-gray-400 mb-2">{t('예금주', 'Account holder')}</dt><dd className="text-lg font-semibold text-black dark:text-white">{t('한국스탬프교육진흥원', 'KSEI')}</dd></div>
            </dl>
            <p className="mt-6 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{t('입금 시 신청자 본인 성함으로 입금해 주세요.', 'Please make the deposit under the applicant’s own name.')}</p>
          </div>
        </div>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button type="button" onClick={() => setShowApplyModal?.(true)} className="px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors">{t('홈페이지 접수하기', 'Apply on this website')}</button>
          <button type="button" onClick={() => goTo('certification')} className="px-8 py-4 rounded-full border border-black/15 dark:border-white/20 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-[#111] font-semibold transition-colors">{t('자격증 발급 안내', 'Certificate issuance guide')}</button>
        </div>
      </CertificateSection>
    </>
  );
}

import { X, UserCheck, CreditCard, FileCheck } from 'lucide-react';
import { stampMakingFees } from './fees';
import { formatFee } from '../shared/QualificationFees';
import useDialogFocus from '../../../hooks/useDialogFocus';

export default function LevelDetailsModal({ t, level, onClose, onNavigate }) {
  useDialogFocus(true, 'level-dialog', onClose);
  const fee = stampMakingFees.find(item => item.id === level);
  const isMaster = level === '마스터';
  const submissions = level === '2급' ? [t('스탬프 5종: 손글씨·칭찬·로고·QR·음각', '5 stamps: handwriting, praise, logo, QR and negative image'),t('손글씨 스탬프 활동지 1부', 'One handwriting stamp activity sheet')] : level === '1급' ? [t('스탬프 10종: 2급 5종 + 이름·투톤·의류·화이트·형광', '10 stamps: the 5 Level 2 types plus name, two-tone, fabric, white and fluorescent'),t('손글씨 활동지 및 스탬프 취미반 강의안 각 1부', 'One handwriting activity sheet and one hobby-class lesson plan')] : [t('포트폴리오 및 교육 커리큘럼 기획안', 'Portfolio and curriculum plan')];
  return <div id="level-dialog" className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="level-dialog-title">
    <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col">
      <header className="px-6 md:px-10 py-6 border-b border-black/10 dark:border-white/10 flex justify-between items-start gap-4">
        <h2 id="level-dialog-title" className="text-xl font-medium text-black dark:text-white">{t('스탬프 제작 지도사', 'Stamp Making Instructor')} · {level}</h2>
        <button type="button" onClick={onClose} aria-label={t('닫기', 'Close')} className="p-2 text-gray-500 hover:text-black dark:hover:text-white"><X className="w-5 h-5"/></button>
      </header>
      <div className="px-6 md:px-10 py-8 overflow-y-auto space-y-7 text-sm text-gray-600 dark:text-gray-300">
        <section><h3 className="flex gap-2 items-center font-bold text-base text-black dark:text-white mb-3"><UserCheck className="w-5 h-5 text-emerald-600"/>{t('응시 자격', 'Eligibility')}</h3><p className="leading-relaxed">{isMaster ? t('1급 자격증 취득 후 경력을 바탕으로 교육 상담을 통해 안내받으실 수 있습니다.', 'After obtaining Level 1, please consult us about the Master course based on your experience.') : t('온라인 또는 오프라인 스탬프 교육 클래스 수강 후 응시할 수 있습니다.', 'You may apply after taking an online or offline stamp education class.')}</p></section>
        <section><h3 className="flex gap-2 items-center font-bold text-base text-black dark:text-white mb-3"><CreditCard className="w-5 h-5 text-emerald-600"/>{t('검정료 및 발급 비용', 'Examination and issuance fee')}</h3>{fee && <><p className="font-medium text-lg text-emerald-700 dark:text-emerald-400">{formatFee(fee.regular)}{t('원', ' KRW')}</p>{fee.student !== undefined && <p className="mt-2">{t('수강생 할인가', 'Class student price')} {formatFee(fee.student)}{t('원', ' KRW')}</p>}</>}</section>
        <section><h3 className="flex gap-2 items-center font-bold text-base text-black dark:text-white mb-3"><FileCheck className="w-5 h-5 text-emerald-600"/>{t('준비할 내용', 'What to prepare')}</h3><ul className="list-disc pl-5 space-y-2 leading-relaxed">{submissions.map(item => <li key={item}>{item}</li>)}</ul>{!isMaster && <p className="mt-4 leading-relaxed">{t('온라인은 포트폴리오와 제작영상을 제출하며, 오프라인은 준비한 스탬프로 감독관 앞에서 시연합니다.', 'Online applicants submit a portfolio and production video. Offline applicants demonstrate their prepared stamp in front of a supervisor.')}</p>}</section>
        <div className="flex flex-wrap gap-3 pt-5 border-t border-black/10 dark:border-white/10"><button type="button" onClick={() => {onClose();onNavigate('exam');}} className="px-5 py-3 bg-emerald-600 text-white rounded-full">{t('시험·비용 안내', 'Exam & fees')}</button><button type="button" onClick={() => {onClose();onNavigate('certification');}} className="px-5 py-3 border border-black/10 dark:border-white/10 rounded-full">{t('발급 안내', 'Issuance')}</button></div>
      </div>
    </div>
  </div>;
}

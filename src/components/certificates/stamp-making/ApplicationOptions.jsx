import { stampMakingFees, stampMakingOnsiteFee, simultaneousStudentFees, simultaneousStudentFee } from './fees';
import { formatFee } from '../shared/QualificationFees';

export default function ApplicationOptions({ t, formData, setFormData, errors }) {
  return <>
    <fieldset className="p-6 bg-emerald-50/50 dark:bg-emerald-900/10 rounded-3xl border border-emerald-100 dark:border-emerald-800/30">
      <legend className="sr-only">{t('스탬프 제작 지도사 응시 등급', 'Stamp Making Instructor levels')}</legend>
      <p className="text-sm font-bold text-black dark:text-white mb-2">{t('응시 등급 선택 (복수 선택 가능)', 'Select levels (multiple selections allowed)')}{errors.levels && <span className="block text-red-500 font-normal mt-1">{errors.levels}</span>}</p>
      <p className="text-xs text-emerald-700 dark:text-emerald-400 mb-4 leading-relaxed">{t(`1급·2급 동시 응시 시 수강생 할인가 합계는 ${formatFee(simultaneousStudentFee)}원입니다. 1급 ${formatFee(simultaneousStudentFees.level1)}원 + 2급 ${formatFee(simultaneousStudentFees.level2)}원이 적용됩니다.`, `For class students applying for Levels 1 and 2 together, the total is ${formatFee(simultaneousStudentFee)} KRW (Level 1: ${formatFee(simultaneousStudentFees.level1)} + Level 2: ${formatFee(simultaneousStudentFees.level2)}).`)}</p>
      <div className="space-y-3">
        {stampMakingFees.filter(fee => fee.student !== undefined).map(fee => <label key={fee.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white dark:hover:bg-[#1e1e1e] cursor-pointer">
          <input type="checkbox" checked={formData.levels.includes(fee.id)} onChange={event => setFormData(previous => ({...previous,levels:event.target.checked ? [...previous.levels,fee.id] : previous.levels.filter(level => level !== fee.id)}))} className="w-5 h-5 mt-0.5 shrink-0 accent-emerald-600"/>
          <span className="leading-relaxed">{t(fee.ko,fee.en)}<span className="block text-xs text-gray-600 dark:text-gray-400 mt-1">{t('검정료', 'Standard fee')} {formatFee(fee.regular)}{t('원 · 수강생 할인가 ', ' KRW · Class student price ')}{formatFee(fee.student)}{t('원', ' KRW')}</span></span>
        </label>)}
      </div>
      <p className="text-xs text-gray-600 dark:text-gray-400 mt-4">{t('마스터 과정은 교육 상담을 통해 안내받으실 수 있습니다.', 'Please contact us for guidance on the Master course.')}</p>
    </fieldset>
    <fieldset>
      <legend className="text-sm font-bold text-black dark:text-white mb-3">{t('검정 방식 선택', 'Select examination method')}{errors.examMethod && <span className="block text-red-500 font-normal mt-1">{errors.examMethod}</span>}</legend>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[{id:'우편',ko:'온라인 · 우편 포트폴리오 및 제작영상 제출',en:'Online · Mail portfolio and submit production video'},{id:'현장',ko:`오프라인 · 포트폴리오 및 감독관 앞 시연 (현장 검정비 ${formatFee(stampMakingOnsiteFee)}원 추가)`,en:`Offline · Portfolio and supervised demonstration (additional ${formatFee(stampMakingOnsiteFee)} KRW)`}].map(method => <label key={method.id} className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer ${formData.examMethod === method.id ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/20' : 'border-black/10 dark:border-white/10'}`}><input type="radio" name="stamp-exam-method" checked={formData.examMethod === method.id} onChange={() => setFormData(previous => ({...previous,examMethod:method.id}))} className="w-5 h-5 mt-0.5 shrink-0 accent-emerald-600"/><span className="leading-relaxed">{t(method.ko,method.en)}</span></label>)}
      </div>
    </fieldset>
  </>;
}

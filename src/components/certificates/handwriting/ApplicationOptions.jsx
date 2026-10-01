import QualificationFees from '../shared/QualificationFees';

export const handwritingLearningRoutes = [
  {id:'online-class',ko:'온라인 손글씨 스탬프 클래스',en:'Online handwriting stamp class',method:'온라인'},
  {id:'offline-class',ko:'오프라인 손글씨 스탬프 클래스',en:'On-site handwriting stamp class',method:'현장'},
  {id:'ebook-vod',ko:'손글씨 도장 전자책에 포함된 VOD 강의',en:'VOD lessons included in the handwriting stamp e-book',method:'온라인'},
];

export default function ApplicationOptions({ t, formData, setFormData, errors }) {
  const route = handwritingLearningRoutes.find(item => item.id === formData.learningRoute);
  return <>
    <fieldset className="p-6 bg-emerald-50/50 dark:bg-emerald-900/10 rounded-3xl border border-emerald-100 dark:border-emerald-800/30">
      <legend className="sr-only">{t('손글씨 스탬프체험 지도사 학습 경로', 'Handwriting qualification learning route')}</legend>
      <p className="font-bold text-black dark:text-white mb-2">{t('수강한 학습 경로', 'Your completed learning route')}{errors.learningRoute && <span className="block text-red-500 font-normal mt-1">{errors.learningRoute}</span>}</p>
      <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{t('클래스 또는 전자책에 포함된 VOD 강의를 수강한 후 응시할 수 있습니다.', 'You may apply after taking a class or the VOD lessons included in the e-book.')}</p>
      <div className="space-y-3">{handwritingLearningRoutes.map(item => <label key={item.id} className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer ${formData.learningRoute === item.id ? 'border-emerald-500 bg-white dark:bg-[#1a1a1a]' : 'border-transparent hover:bg-white dark:hover:bg-[#1a1a1a]'}`}><input type="radio" name="handwriting-learning-route" checked={formData.learningRoute === item.id} onChange={() => setFormData(previous => ({...previous,learningRoute:item.id,examMethod:item.method}))} className="w-5 h-5 mt-0.5 shrink-0 accent-emerald-600"/><span>{t(item.ko,item.en)}</span></label>)}</div>
    </fieldset>
    <div>
      <h3 className="font-bold text-black dark:text-white mb-3">{t('검정료', 'Examination fee')}</h3>
      <QualificationFees t={t} qualification="handwriting"/>
    </div>
    <div aria-live="polite" className="p-5 rounded-2xl bg-gray-50 dark:bg-[#2a2a2a] border border-black/5 dark:border-white/5">
      <p className="font-medium text-black dark:text-white mb-2">{t('제작 확인 방식', 'Production verification')}</p>
      <p className="text-sm leading-relaxed">{!route ? t('학습 경로를 선택하면 제작 확인 방식이 표시됩니다.', 'Choose your learning route to view the verification method.') : route.method === '현장' ? t('오프라인 · 현장 강의 수강 후 강사의 확인을 거쳐 자격증이 발급됩니다.', 'Offline · After the on-site class, your instructor verifies your work before certification is issued.') : t('온라인 · 본인의 손글씨 스탬프 제작영상을 제출하면 확인 후 자격증이 발급됩니다.', 'Online · Submit a video of yourself making your handwriting stamp; certification is issued after verification.')}</p>
    </div>
  </>;
}

import { stampMakingFees } from '../stamp-making/fees';
import { handwritingFees, handwritingDiscountLabel } from '../handwriting/fees';

export const formatFee = amount => amount.toLocaleString('ko-KR');

export default function QualificationFees({ t, qualification = 'stamp-making' }) {
  const isHandwriting = qualification === 'handwriting';
  const rows = isHandwriting ? [
    { id: 'regular', label: t('일반 검정료', 'Standard examination fee'), price: handwritingFees.regular },
    { id: 'student', label: t(handwritingDiscountLabel.ko, handwritingDiscountLabel.en), price: handwritingFees.student, discounted: true },
  ] : stampMakingFees.map(fee => ({ id: fee.id, label: t(fee.ko, fee.en), price: fee.regular, student: fee.student }));
  return <div className="min-w-0">
    <dl className="divide-y divide-black/10 border-y border-black/20 dark:divide-white/15 dark:border-white/25">
      {rows.map(row => (
        <div key={row.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-4 gap-y-1.5 py-5">
          <dt className={`min-w-0 text-sm font-medium leading-relaxed sm:text-base ${row.discounted ? 'text-emerald-800 dark:text-emerald-300' : 'text-gray-800 dark:text-gray-200'}`}>{row.label}</dt>
          <dd className={`whitespace-nowrap text-right text-xl font-medium tabular-nums tracking-tight sm:text-2xl ${row.discounted ? 'text-emerald-800 dark:text-emerald-300' : 'text-black dark:text-white'}`}>
            {formatFee(row.price)}<span className="ml-1.5 text-xs font-normal text-gray-500 dark:text-gray-400">{t('원', 'KRW')}</span>
          </dd>
          {row.student !== undefined && <dd className="col-span-2 text-right text-xs leading-relaxed text-emerald-700 dark:text-emerald-400 sm:text-sm">{t('수강생 할인가', 'Class student price')} <span className="font-medium tabular-nums">{formatFee(row.student)}{t('원', ' KRW')}</span></dd>}
        </div>
      ))}
    </dl>
    {isHandwriting && <p className="mt-4 text-xs leading-relaxed text-gray-600 dark:text-gray-400 sm:text-sm">{t('할인은 손글씨 스탬프 클래스 수강생에게 적용됩니다. 검정료는 클래스 수강료 및 전자책 구매 비용과 별도입니다.', 'The discount applies to handwriting stamp class students. The examination fee is separate from class tuition and e-book purchase costs.')}</p>}
  </div>;
}

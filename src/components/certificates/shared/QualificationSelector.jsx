import { Stamp, PenLine, Check } from 'lucide-react';

export default function QualificationSelector({ t, value = 'stamp-making', onChange }) {
  return <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8" role="group" aria-label={t('자격 종류 선택', 'Choose qualification')}>
    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">{t('안내받을 자격을 선택하세요.', 'Select a qualification to view its information.')}</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {[{ id: 'stamp-making', ko: '스탬프 제작 지도사', en: 'Stamp Making Instructor', Icon: Stamp }, { id: 'handwriting', ko: '손글씨 스탬프체험 지도사', en: 'Handwriting Stamp Experience Instructor', Icon: PenLine }].map(({ id, ko, en, Icon }) => <button key={id} type="button" onClick={() => onChange(id)} aria-pressed={value === id} className={`flex items-center gap-3 text-left p-5 rounded-2xl border transition-colors ${value === id ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300' : 'border-black/10 dark:border-white/10 bg-white dark:bg-[#1a1a1a] text-gray-600 dark:text-gray-300 hover:border-emerald-500'}`}>
        <Icon className="w-5 h-5 shrink-0" aria-hidden="true"/><span className="font-medium flex-1">{t(ko, en)}</span>{value === id && <Check className="w-4 h-4 shrink-0" aria-hidden="true"/>}
      </button>)}
    </div>
  </div>;
}

import React, { useState } from 'react';
import { Monitor, Users } from 'lucide-react';
import { SiteIcon, siteCardClass, siteCardTitleClass, siteCardTextClass } from '../../shared/SiteLayout.jsx';

export default function LearningRoutes({ t, id, routes, tone = 'white' }) {
    const [selectedRoute, setSelectedRoute] = useState(0);

    return (
        <div className="mt-10 md:mt-16" data-tone={tone}>
            <div className="mb-6 grid grid-cols-2 gap-1.5 rounded-full border border-black/5 bg-gray-100/50 p-1.5 dark:border-white/5 dark:bg-white/5 md:hidden" role="group" aria-label={t('교육 방식별 과정 선택', 'Choose a learning format')}>
                {routes.map((route, index) => (
                    <button key={route.title} type="button" aria-pressed={selectedRoute === index} aria-controls={`${id}-route-${index}`} onClick={() => setSelectedRoute(index)} className={`min-h-11 rounded-full px-4 py-2.5 text-sm font-medium tracking-wide transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 ${selectedRoute === index ? 'bg-white text-black shadow-sm dark:bg-[#222] dark:text-white' : 'text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white'}`}>
                        {route.title}
                    </button>
                ))}
            </div>
            <div className="grid gap-8 md:grid-cols-2">
                {routes.map(({ title, description, items }, index) => (
                    <article key={title} id={`${id}-route-${index}`} aria-labelledby={`${id}-route-heading-${index}`} className={`${siteCardClass} ${selectedRoute === index ? 'block' : 'hidden md:block'}`}>
                        <div className="mb-6 flex items-center gap-5 md:mb-8">
                            <SiteIcon icon={index === 0 ? Monitor : Users} />
                            <h3 id={`${id}-route-heading-${index}`} className={siteCardTitleClass}>{title}</h3>
                        </div>
                        {description && <p className={`mb-6 ${siteCardTextClass}`}>{description}</p>}
                        <ol className="space-y-3 md:space-y-4">
                            {items.map((item, itemIndex) => <li key={item} className={`flex items-start gap-4 ${siteCardTextClass}`}><span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">{itemIndex + 1}</span><span>{item}</span></li>)}
                        </ol>
                    </article>
                ))}
            </div>
        </div>
    );
}

import { motion } from 'motion/react';
import { assetUrl } from '../../utils/publicAssets';

// 기존 시험·발급 페이지의 디자인을 모든 자격 안내에서 그대로 사용합니다.
export function SitePageHero({ eyebrow, title, description, isMobile, children, leading }) {
  return <section className="relative py-24 md:py-32 bg-white dark:bg-[#0a0a0a] overflow-hidden transition-colors duration-500">
    <div className="absolute inset-0 z-0 pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1)_0%,transparent_50%)]" />
      <div className="absolute inset-0 opacity-10 dark:opacity-20" style={{ backgroundImage: `url(${assetUrl('/img/textures/stardust.png')})` }} />
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      {leading && <div className="absolute left-4 top-[-4rem] sm:left-6 lg:left-8">{leading}</div>}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: isMobile ? 0.5 : 0.8 }} className="text-center max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="h-px w-12 bg-emerald-500/50" aria-hidden="true" />
          <span className="text-[11px] font-bold tracking-[0.4em] uppercase text-emerald-600 dark:text-emerald-400">{eyebrow}</span>
          <span className="h-px w-12 bg-emerald-500/50" aria-hidden="true" />
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-sans font-medium text-black dark:text-white leading-[1.1] tracking-tighter mb-8">{title}</h1>
        {description && <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-light max-w-3xl mx-auto leading-relaxed">{description}</p>}
        {children}
      </motion.div>
    </div>
  </section>;
}

export function SiteSectionHeading({ eyebrow, title, description, as: Heading = 'h2', className = 'mb-16' }) {
  return <div className={`text-center ${className}`}>
    {eyebrow && <div className="flex items-center justify-center gap-4 mb-6">
      <span className="h-px w-12 bg-black dark:bg-white" aria-hidden="true" />
      <span className="text-[11px] font-bold tracking-[0.4em] uppercase text-black dark:text-white">{eyebrow}</span>
      <span className="h-px w-12 bg-black dark:bg-white" aria-hidden="true" />
    </div>}
    <Heading className="text-3xl md:text-4xl font-sans font-medium text-black dark:text-white tracking-tighter">{title}</Heading>
    {description && <p className="mt-6 text-lg text-gray-500 dark:text-gray-400 font-light leading-relaxed max-w-3xl mx-auto">{description}</p>}
  </div>;
}

export const siteCardClass = 'rounded-[3rem] border border-black/5 dark:border-white/5 bg-white dark:bg-[#111] p-6 md:p-10 shadow-sm';
export const siteFeatureCardClass = 'bg-gray-50 dark:bg-[#111] p-6 md:p-12 rounded-[2.5rem] border border-black/5 dark:border-white/5 group hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-colors duration-500';
export const siteCardTitleClass = 'text-[20px] font-bold tracking-tight text-black dark:text-white';
export const siteFeatureCardTitleClass = 'text-2xl font-bold tracking-tight text-black dark:text-white';
export const siteCardTextClass = 'text-[15px] font-light leading-relaxed text-gray-500 dark:text-gray-400';
export const sitePrimaryButtonClass = 'inline-flex min-h-11 items-center justify-center gap-3 rounded-full bg-black dark:bg-white text-white dark:text-black px-8 py-4 font-bold text-sm hover:bg-emerald-600 dark:hover:bg-emerald-400 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-500';

export function SiteIcon({ icon: Icon, tone = 'black' }) {
  return <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${tone === 'soft' ? 'bg-white dark:bg-[#222] shadow-sm group-hover:scale-110 transition-transform duration-500' : 'bg-black dark:bg-white text-white dark:text-black shadow-lg shadow-black/20 dark:shadow-white/20'}`}><Icon className={`w-8 h-8 ${tone === 'soft' ? 'text-emerald-600 dark:text-emerald-400' : ''}`} aria-hidden="true" /></div>;
}

export function SiteCallout({ title, description, children }) {
  return <div className="bg-[#050505] rounded-[2.5rem] p-6 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden">
    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `url(${assetUrl('/img/textures/stardust.png')})` }} />
    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />
    <div className="text-left relative z-10">
      <h2 className="text-3xl md:text-4xl font-sans font-medium text-white mb-6 tracking-tighter">{title}</h2>
      {description && <p className="text-gray-400 font-light text-lg leading-relaxed max-w-2xl">{description}</p>}
    </div>
    <div className="relative z-10 shrink-0 max-w-full">{children}</div>
  </div>;
}

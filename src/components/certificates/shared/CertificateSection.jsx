import { SiteSectionHeading } from '../../shared/SiteLayout';

export default function CertificateSection({ id, eyebrow, title, description, children, tone = 'white' }) {
  const surfaces = {
    white: 'bg-white dark:bg-[#0a0a0a]',
    soft: 'bg-emerald-50/40 dark:bg-emerald-900/5',
    paper: 'bg-gray-50 dark:bg-[#111]',
    ink: 'bg-emerald-50/40 dark:bg-emerald-900/10',
  };
  return <section id={id} className={`py-12 md:py-24 scroll-mt-24 transition-colors duration-500 ${surfaces[tone] || surfaces.white}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SiteSectionHeading eyebrow={eyebrow} title={title} description={description} className="mb-8 md:mb-16" />
      <div className="min-w-0">{children}</div>
    </div>
  </section>;
}

import { useEffect, useState } from 'react';

const paths = {
  home: '/',
  'cert-info': '/certificates',
  'cert-stamp-making': '/certificates/stamp-making',
  'cert-handwriting': '/certificates/handwriting',
  exam: '/exam',
  certification: '/issuance',
  faq: '/faq',
};
const qualificationPages = ['exam', 'certification'];

export function readCertificateRoute(hash = window.location.hash) {
  const [path, query = ''] = hash.replace(/^#/, '').split('?');
  const page = Object.keys(paths).find(key => paths[key] === path) || 'home';
  const queryQualification = new URLSearchParams(query).get('qualification');
  return { page, qualification: page === 'cert-handwriting' || (qualificationPages.includes(page) && queryQualification === 'handwriting') ? 'handwriting' : 'stamp-making' };
}

export function certificateHash(page, qualification = 'stamp-making') {
  const path = paths[page] || paths.home;
  return `#${path}${qualificationPages.includes(page) ? `?qualification=${qualification}` : ''}`;
}

export default function useCertificateNavigation() {
  const [route, setRoute] = useState(readCertificateRoute);
  useEffect(() => {
    const restore = () => { setRoute(readCertificateRoute()); window.scrollTo({ top: 0, behavior: 'auto' }); };
    window.addEventListener('hashchange', restore);
    window.addEventListener('popstate', restore);
    return () => { window.removeEventListener('hashchange', restore); window.removeEventListener('popstate', restore); };
  }, []);
  const commit = next => {
    const hash = certificateHash(next.page, next.qualification);
    if (window.location.hash !== hash) window.history.pushState(null, '', hash);
    setRoute(next);
  };
  const setCurrentPage = page => {
    const qualification = page === 'cert-handwriting' ? 'handwriting' : page === 'cert-stamp-making' ? 'stamp-making' : route.qualification;
    commit({ page, qualification });
  };
  const setQualification = qualification => {
    const value = qualification === 'handwriting' ? 'handwriting' : 'stamp-making';
    const page = route.page === 'cert-stamp-making' || route.page === 'cert-handwriting' ? `cert-${value}` : route.page;
    commit({ page, qualification: value });
  };
  return { currentPage: route.page, qualification: route.qualification, setCurrentPage, setQualification };
}

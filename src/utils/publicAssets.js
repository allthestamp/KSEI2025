// public 폴더의 파일을 현재 사이트 경로에서 찾습니다.
// 루트 도메인과 GitHub Pages 하위 경로에서 같은 소스를 사용할 수 있습니다.
export function assetUrl(path) {
  const base = import.meta.env.BASE_URL || './';
  return `${base.endsWith('/') ? base : `${base}/`}${path.replace(/^\/+/, '')}`;
}

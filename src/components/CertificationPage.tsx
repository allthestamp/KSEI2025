import React from 'react';
import { CreditCard, FileText, Truck, Info, CheckCircle2 } from 'lucide-react';

interface Props {
  t: (ko: string, en: string) => string;
}

export default function CertificationPage({ t }: Props) {
  return (
    <div className="pt-32 pb-24 bg-white dark:bg-[#121212] min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest uppercase text-black dark:text-white mb-6 flex items-center justify-center gap-2">
            <span className="w-4 h-[1px] bg-black dark:bg-white"></span>
            ISSUANCE GUIDE
            <span className="w-4 h-[1px] bg-black dark:bg-white"></span>
          </h2>
          <p className="text-2xl md:text-3xl font-sans font-medium text-black dark:text-white leading-tight mb-4">
            {t('자격증 발급 안내', 'Certification Issuance Guide')}
          </p>
          <p className="text-gray-600 dark:text-gray-400 font-light">
            {t('한국스탬프교육진흥원의 자격증 발급 절차 및 비용을 안내해 드립니다.', 'Guide to the certification issuance procedure and fees of the Korea Stamp Education Institute.')}
          </p>
        </div>

        <div className="space-y-16">
          
          {/* Part 1: 자격증 안내 및 비용 */}
          <div className="space-y-8">
            <div className="flex items-center gap-4 border-b border-black/5 dark:border-white/5 pb-4">
              <span className="w-8 h-8 rounded-full bg-black dark:bg-white flex items-center justify-center text-sm font-bold text-white dark:text-black">1</span>
              <h2 className="text-xl font-bold text-black dark:text-white">
                {t('자격증 안내 및 비용', 'Certification Info & Fees')}
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Left: 자격증 형태 및 샘플이미지 보기 */}
              <section className="bg-white dark:bg-[#1e1e1e] p-8 md:p-10 rounded-2xl border border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/10 transition-colors">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-black dark:text-white flex items-center gap-3">
                    <FileText className="w-5 h-5 text-emerald-500" />
                    {t('자격증 형태 및 샘플 이미지', 'Certificate Type and Sample Image')}
                  </h3>
                </div>
                <div className="bg-gray-100 dark:bg-[#2a2a2a] rounded-xl flex items-center justify-center overflow-hidden aspect-video border border-black/5 dark:border-white/5">
                  <img 
                    src="https://picsum.photos/seed/certificate/800/450" 
                    alt="Certificate Sample" 
                    className="w-full h-full object-cover opacity-90"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center font-light">
                  * {t('실제 발급되는 자격증의 샘플 이미지입니다.', 'This is a sample image of the actual certificate issued.')}
                </p>
              </section>

              {/* Right: 비용 및 입금 안내 */}
              <div className="space-y-8">
                {/* Top: 자격증 검정료 및 발급 비용 */}
                <section className="bg-white dark:bg-[#1e1e1e] p-8 md:p-10 rounded-2xl border border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/10 transition-colors">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-black dark:text-white flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-emerald-500" />
                      {t('자격증 검정료 및 발급 비용', 'Certification Exam and Issuance Fees')}
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-6 bg-gray-50 dark:bg-[#2a2a2a] rounded-xl text-center border border-black/5 dark:border-white/5">
                      <h4 className="font-bold text-sm text-black dark:text-white mb-2">{t('마스터', 'Master')}</h4>
                      <p className="text-xl font-sans font-bold text-emerald-600 dark:text-emerald-400">600,000<span className="text-xs font-normal text-gray-500 dark:text-gray-400 ml-1">{t('원', 'KRW')}</span></p>
                    </div>
                    <div className="p-6 bg-gray-50 dark:bg-[#2a2a2a] rounded-xl text-center border border-black/5 dark:border-white/5">
                      <h4 className="font-bold text-sm text-black dark:text-white mb-2">{t('1급', 'Level 1')}</h4>
                      <p className="text-xl font-sans font-bold text-emerald-600 dark:text-emerald-400">300,000<span className="text-xs font-normal text-gray-500 dark:text-gray-400 ml-1">{t('원', 'KRW')}</span></p>
                    </div>
                    <div className="p-6 bg-gray-50 dark:bg-[#2a2a2a] rounded-xl text-center border border-black/5 dark:border-white/5">
                      <h4 className="font-bold text-sm text-black dark:text-white mb-2">{t('2급', 'Level 2')}</h4>
                      <p className="text-xl font-sans font-bold text-emerald-600 dark:text-emerald-400">200,000<span className="text-xs font-normal text-gray-500 dark:text-gray-400 ml-1">{t('원', 'KRW')}</span></p>
                    </div>
                  </div>
                </section>

                {/* Bottom: 입금 안내 */}
                <section className="bg-white dark:bg-[#1e1e1e] p-8 md:p-10 rounded-2xl border border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/10 transition-colors">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-black dark:text-white flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      {t('입금 안내', 'Payment Information')}
                    </h3>
                  </div>
                  <div className="bg-gray-50 dark:bg-[#2a2a2a] rounded-xl border border-black/5 dark:border-white/5 p-4">
                    {/* Desktop View */}
                    <div className="hidden md:block overflow-x-auto">
                      <table className="w-full text-left border-collapse min-w-[400px]">
                        <thead>
                          <tr className="border-b border-black/10 dark:border-white/10">
                            <th className="py-3 px-4 font-bold text-sm text-black dark:text-white">{t('은행', 'Bank')}</th>
                            <th className="py-3 px-4 font-bold text-sm text-black dark:text-white">{t('계좌번호', 'Account Number')}</th>
                            <th className="py-3 px-4 font-bold text-sm text-black dark:text-white">{t('예금주', 'Account Holder')}</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="py-4 px-4 text-sm text-gray-700 dark:text-gray-300">농협</td>
                            <td className="py-4 px-4 text-sm font-mono text-gray-700 dark:text-gray-300">351-1372-1557-33</td>
                            <td className="py-4 px-4 text-sm text-gray-700 dark:text-gray-300">한국스탬프교육진흥원</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    {/* Mobile View (1 column 6 rows) */}
                    <div className="md:hidden flex flex-col">
                      <div className="py-3 px-4 border-b border-black/5 dark:border-white/5 font-bold text-sm text-black dark:text-white bg-black/5 dark:bg-white/5 rounded-t-lg">{t('은행', 'Bank')}</div>
                      <div className="py-3 px-4 border-b border-black/5 dark:border-white/5 text-sm text-gray-700 dark:text-gray-300">농협</div>
                      <div className="py-3 px-4 border-b border-black/5 dark:border-white/5 font-bold text-sm text-black dark:text-white bg-black/5 dark:bg-white/5">{t('계좌번호', 'Account Number')}</div>
                      <div className="py-3 px-4 border-b border-black/5 dark:border-white/5 text-sm font-mono text-gray-700 dark:text-gray-300">351-1372-1557-33</div>
                      <div className="py-3 px-4 border-b border-black/5 dark:border-white/5 font-bold text-sm text-black dark:text-white bg-black/5 dark:bg-white/5">{t('예금주', 'Account Holder')}</div>
                      <div className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300">한국스탬프교육진흥원</div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>

          {/* Part 2: 발급 절차 및 수령 */}
          <div className="space-y-8 pt-8">
            <div className="flex items-center gap-4 border-b border-black/5 dark:border-white/5 pb-4">
              <span className="w-8 h-8 rounded-full bg-black dark:bg-white flex items-center justify-center text-sm font-bold text-white dark:text-black">2</span>
              <h2 className="text-xl font-bold text-black dark:text-white">
                {t('발급 절차 및 수령', 'Issuance Procedure & Receipt')}
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Left: 자격증 발급 절차 */}
              <section className="bg-white dark:bg-[#1e1e1e] p-8 md:p-10 rounded-2xl border border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/10 transition-colors">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-black dark:text-white flex items-center gap-3">
                    <Info className="w-5 h-5 text-emerald-500" />
                    {t('자격증 발급 절차', 'Certificate Issuance Procedure')}
                  </h3>
                </div>
                
                <div className="bg-gray-100 dark:bg-[#2a2a2a] rounded-xl flex items-center justify-center overflow-hidden mb-8 aspect-video border border-black/5 dark:border-white/5">
                  <img 
                    src="https://picsum.photos/seed/procedure/800/450" 
                    alt="Procedure" 
                    className="w-full h-full object-cover opacity-90"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-xl border border-emerald-100 dark:border-emerald-800/30">
                  <h4 className="font-bold text-sm text-emerald-800 dark:text-emerald-300 mb-3">{t('안내사항', 'Notice')}</h4>
                  <ul className="space-y-2 text-sm text-emerald-700 dark:text-emerald-400">
                    <li className="flex gap-2">
                      <span className="shrink-0">•</span>
                      <span>{t('자격증 취득 후 갱신이 필요 없는 평생자격증 입니다.', 'This is a lifetime certificate that does not require renewal after acquisition.')}</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="shrink-0">•</span>
                      <span>{t('자격증에 협회 자격일련번호가 기재되기 때문에 사진이 들어가지 않습니다.', 'Photos are not included as the association\'s qualification serial number is printed on the certificate.')}</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Right: 자격증 수령 */}
              <section className="bg-white dark:bg-[#1e1e1e] p-8 md:p-10 rounded-2xl border border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/10 transition-colors">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-black dark:text-white flex items-center gap-3">
                    <Truck className="w-5 h-5 text-emerald-500" />
                    {t('자격증 수령', 'Certificate Receipt')}
                  </h3>
                </div>
                <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex gap-4 items-start bg-gray-50 dark:bg-[#2a2a2a] p-6 rounded-xl border border-black/5 dark:border-white/5">
                    <span className="text-emerald-500 font-bold shrink-0 mt-0.5">{t('수령방법:', 'Method:')}</span>
                    <span className="leading-relaxed">{t('자격증은 자격증 교부신청서에 신청인이 기재한 주소로 자격증 발급처에서 택배발송됩니다.', 'The certificate will be sent via courier from the issuing office to the address provided by the applicant on the application form.')}</span>
                  </li>
                  <li className="flex gap-4 items-start bg-gray-50 dark:bg-[#2a2a2a] p-6 rounded-xl border border-black/5 dark:border-white/5">
                    <span className="text-emerald-500 font-bold shrink-0 mt-0.5">{t('발급일정:', 'Schedule:')}</span>
                    <span className="leading-relaxed">{t('자격증 발급은 제작 후 배송까지 입금일 기준 2주 정도 소요됩니다.', 'It takes about 2 weeks from the date of payment for the certificate to be produced and delivered.')}</span>
                  </li>
                  <li className="flex gap-4 items-start bg-gray-50 dark:bg-[#2a2a2a] p-6 rounded-xl border border-black/5 dark:border-white/5">
                    <span className="text-emerald-500 font-bold shrink-0 mt-0.5">{t('참고사항:', 'Note:')}</span>
                    <span className="leading-relaxed">{t('자격증 신청 접수자가 많을 경우 교부기간은 조정될 수 있습니다.', 'The issuance period may be adjusted if there are many applicants.')}</span>
                  </li>
                  <li className="flex gap-4 items-start bg-gray-50 dark:bg-[#2a2a2a] p-6 rounded-xl border border-black/5 dark:border-white/5">
                    <span className="text-emerald-500 font-bold shrink-0 mt-0.5">{t('배송업체:', 'Courier:')}</span>
                    <span className="leading-relaxed">{t('자격증 발급처에서 발급된 자격증은 CJ택배를 통해 주소지로 발송 됩니다.', 'Certificates issued by the issuing office are sent to the address via CJ Logistics.')}</span>
                  </li>
                </ul>
              </section>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
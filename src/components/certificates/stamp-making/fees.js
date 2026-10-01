// 스탬프 제작 지도사 비용만 관리합니다. 금액은 원 단위입니다.
export const stampMakingFees = [
  { id: '2급', ko: '2급', en: 'Level 2', regular: 200000, student: 100000 },
  { id: '1급', ko: '1급', en: 'Level 1', regular: 300000, student: 150000 },
  { id: '마스터', ko: '마스터', en: 'Master', regular: 600000 },
];
export const stampMakingOnsiteFee = 50000;
export const simultaneousStudentFees = {
  level1: stampMakingFees.find(fee => fee.id === '1급').student,
  level2: stampMakingFees.find(fee => fee.id === '2급').student / 2,
};
export const simultaneousStudentFee = simultaneousStudentFees.level1 + simultaneousStudentFees.level2;

import { handwritingFees } from './fees';

// 손글씨 스탬프체험 지도사 FAQ 문구를 이 파일에서 수정합니다.
// 금액은 fees.js를 함께 사용하므로 안내 페이지와 FAQ에 동일하게 반영됩니다.
const feeText = (amount) => amount.toLocaleString('ko-KR');

export const handwritingFaqs = [
  {
    category: '시험/접수',
    question: '손글씨 스탬프체험 지도사는 어떤 강의를 수강해야 응시할 수 있나요?',
    questionEn: 'Which course must I complete to apply for the Handwriting Stamp Experience Instructor qualification?',
    answer: '온라인·오프라인 손글씨 스탬프 클래스 또는 손글씨 도장 전자책에 포함된 VOD 강의를 수강한 후 응시할 수 있습니다. 전자책을 구매한 경우에는 포함된 VOD 강의를 수강해야 합니다.',
    answerEn: 'You may apply after completing an online or offline handwriting stamp class, or the VOD lessons included with the handwriting stamp ebook. If you purchase the ebook, you must complete its included VOD lessons.',
  },
  {
    category: '시험/접수',
    question: '손글씨 스탬프체험 지도사의 온라인·오프라인 취득 방식은 어떻게 다른가요?',
    questionEn: 'How do the online and offline qualification pathways differ for Handwriting Stamp Experience Instructor?',
    answer: '온라인 과정은 강의 수강 후 본인의 손글씨 도안 작성부터 스탬프 제작까지 촬영한 영상을 제출하고, 영상 확인 후 자격증이 발급됩니다.\n오프라인 과정은 현장 강의를 수강한 후 현장에서 강사의 확인을 거쳐 자격증이 발급됩니다.',
    answerEn: 'Online participants submit a video of their own work, from drawing the handwriting design through stamp production, after completing the lessons. The certificate is issued after the video is reviewed.\nOffline participants complete an in-person class and receive verification from the instructor on site before the certificate is issued.',
  },
  {
    category: '결제/환불',
    question: '손글씨 스탬프체험 지도사 검정료와 수강생 할인은 얼마인가요?',
    questionEn: 'What are the examination fee and class student discount for Handwriting Stamp Experience Instructor?',
    answer: `일반 검정료는 ${feeText(handwritingFees.regular)}원이며, 손글씨 스탬프 클래스 수강생에게는 ${feeText(handwritingFees.student)}원의 수강생 할인가가 적용됩니다. 할인 대상은 손글씨 스탬프 클래스 수강생입니다.`,
    answerEn: `The standard examination fee is KRW ${feeText(handwritingFees.regular)}. Handwriting stamp class students pay the discounted fee of KRW ${feeText(handwritingFees.student)}. The discount applies to handwriting stamp class students.`,
  },
];

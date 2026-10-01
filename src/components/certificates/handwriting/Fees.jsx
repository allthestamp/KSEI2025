import React from 'react';
import CertificateSection from '../shared/CertificateSection.jsx';
import QualificationFees from '../shared/QualificationFees.jsx';

const Fees = ({ t }) => (
    <CertificateSection id="handwriting-fees" eyebrow="EXAMINATION FEE" title={t('검정료 안내', 'Examination Fee')} description={t('손글씨 스탬프 클래스 수강생에게는 수강생 할인가가 적용됩니다.', 'Students of the handwriting stamp class receive the student examination rate.')} tone="soft">
        <QualificationFees t={t} qualification="handwriting" />
    </CertificateSection>
);

export default Fees;

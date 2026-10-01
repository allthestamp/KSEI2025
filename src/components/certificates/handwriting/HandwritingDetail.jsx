import React from 'react';
import Overview from './Overview.jsx';
import CourseGuide from './CourseGuide.jsx';
import LearningProcess from './LearningProcess.jsx';
import Strengths from './Strengths.jsx';
import Uses from './Uses.jsx';
import Fees from './Fees.jsx';

const HandwritingDetail = ({ t, isMobile }) => (
    <>
        <Overview t={t} />
        <CourseGuide t={t} />
        <LearningProcess t={t} isMobile={isMobile} />
        <Strengths t={t} />
        <Uses t={t} />
        <Fees t={t} />
    </>
);

export default HandwritingDetail;

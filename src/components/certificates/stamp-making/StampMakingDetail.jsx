import React from 'react';
import Overview from './Overview.jsx';
import Levels from './Levels.jsx';
import LearningProcess from './LearningProcess.jsx';
import Strengths from './Strengths.jsx';
import Uses from './Uses.jsx';
import Reviews from './Reviews.jsx';

// 각 항목의 문구는 같은 폴더의 해당 파일에서 수정합니다.
export default function StampMakingDetail({ t, isMobile, onNavigate, onApply, onShowLevel }) {
  return (
    <>
      <Overview t={t} />
      <Levels t={t} onShowLevel={onShowLevel} />
      <LearningProcess t={t} onNavigate={onNavigate} />
      <Strengths t={t} />
      <Uses t={t} />
      <Reviews t={t} />
    </>
  );
}

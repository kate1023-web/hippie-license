import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import background from '../assets/TestBG.png';
import u_answer from '../assets/U_answer.png';
import d_answer from '../assets/D_answer.png';
import question_n from '../assets/Question_N.svg';
import question from '../assets/Question.svg';
import questions from '../data/Questions'; 
import './QuestionView.css';

// OptionButton 정의 (컴포넌트 외부나 위에 작성)
const OptionButton = ({ text, onClick, top, left, width, preventActions, img }) => {
  const [pressed, setPressed] = useState(false);
  
  return (
    <div 
      onClick={onClick}
      //pc용 이벤트
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      //모바일용 이벤트
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      style={{
        position: 'absolute',
        top: top,
        left: left,
        // translate(-50%, -50%)와 scale을 한 곳에 모아야 정중앙 기준으로 줄어듭니다.
        transform: `translate(-50%, -50%) scale(${pressed ? 0.96 : 1})`,
        width: width,
        cursor: 'pointer',
        zIndex: 25,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        WebkitTapHighlightColor: 'transparent',
        transition: 'transform 0.1s ease', // scale이 포함된 transform 전체에 애니메이션 적용
        transformOrigin: 'center center'   // 기준점을 명확히 중앙으로 설정
      }}
    >
      {/* 1. 답변 배경 이미지 */}
      <img 
        src={img} 
        alt="답변 배경" 
        style={{ width: '100%', display: 'block' }} 
        onContextMenu={preventActions}
        onDragStart={preventActions}
      />
      
      {/* 2. 이미지 위에 올라가는 답변 텍스트 */}
      <div className="answer-text" style={{ 
        position: 'absolute',
        fontSize: '2.15cqi',
        color: '#7B5323',
        fontFamily: 'SchoolSafetyStubbyChalk',
        pointerEvents: 'none',
        textAlign: 'left',
        width: '80%',
        lineHeight: '1.2',
        // 글자 각도 유지
        transform: 'rotate(-1.16deg)',
        letterSpacing: '0em',
        // 텍스트 위치 (이미지 내부에서 상대적 위치)
        top: '19%', 
        left: '18%',
      }}>
        {text}
      </div>
    </div>
  );
}

function QuestionView() {
  const preventActions = (e) => e.preventDefault(); //이미지 다운금지

  const navigate = useNavigate();
  const location = useLocation()
  const [currentIdx, setCurrentIdx] = useState(0); // 현재 질문 번호 (1부터 시작)

  const currentQ = questions[currentIdx]; // 질문 화면출력을 위한 선언

  const userName = location.state?.userName || "히삐";
  // 초기값: 모든 결과의 카운트는 0
  const [counts, setCounts] = useState({
    Exclamation_H: 0, Reaction_H: 0, Encyclopedia_H: 0, Analysis_H: 0,
  Collecting_H: 0, Creator_H: 0, Explorer_H: 0, Promotion_H: 0
  });

  const handleNext = (selectedTypes) => {
    // 1. 기존 점수 복사
    let newCounts = { ...counts };

    // 2. 선택된 타입들(배열)을 돌면서 1점씩 추가
    // 예: ["type1", "type4"] 라면 두 곳 모두 +1
    selectedTypes.forEach((type) => {
        newCounts[type] = (newCounts[type] || 0) + 1;
    });

    // 3. 상태 업데이트
    setCounts(newCounts);

    if (currentIdx < questions.length - 1) {
        setCurrentIdx(currentIdx + 1);
    } else {
        // 최종 결과 전달
        navigate('/result', { state: { finalCounts: newCounts, userName: userName } });
    }
  };

  const questionNumber = String(currentIdx + 1).padStart(2, '0'); // 질문 번호 화면출력을 위한 선언

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      backgroundColor: '#ffffff', //여백 색상
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      overflow: 'hidden' 
    }}>

    <div style={{ 
        position: 'relative', 
      // 창 너비와 높이 중 비율(16:9)에 맞는 '최대 크기'를 자동으로 계산
      width: 'min(100vw, calc(100vh * 1920 / 1080))',
      height: 'min(100vh, calc(100vw * 1080 / 1920))',
      backgroundColor: 'black', // 위치 확인용 (나중에 투명하게 바꾸셔도 됩니다)
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      //boxShadow: '0 0 20px rgba(0,0,0,0.2)' // 박스 영역 확인용
    }}>

        <img 
          src={background} 
          alt="배경"
          style={{
            width: '100%',
            height: '100%',
            //objectFit: 'fill', // 이미지 비율 유지
            display: 'block'
          }}
          onContextMenu={preventActions}
          onDragStart={preventActions}
        />

        <div 
            className="question-text"
            style={{
            position: 'absolute',
            top: '28.5%', // 배경 이미지의 번호판 위치에 맞게 조절
            left: '53.95%',
            transform: 'translate(-50%, -50%) rotate(1.16deg)', // 문구와 같은 각도
            fontFamily: 'SchoolSafetyTteokbokki',
            fontSize: '2.15cqi', // 질문보다 조금 작게
            color: '#ffffff',
            zIndex: 30
        }}>
            {questionNumber}
        </div>

        <img 
          src={question_n} 
          alt="질문번호"
          style={{
            position: 'absolute',
            top: '29%',          // 위에서 50% 지점
            left: '54%',         // 왼쪽에서 "
            transform: 'translate(-50%, -50%)', // 정중앙 정렬을 위한 보정
            width: '3.8%',      // 캐릭터 크기 조절
            zIndex: 15
          }}
          onContextMenu={preventActions}
          onDragStart={preventActions}
        />
        
        <div 
            className="question-text"
            style={{
            position: 'absolute',
            top: '33.5%', // 배경 이미지의 질문 상자 위치에 맞게 조정
            left: '69.3%',
            transform: 'translate(-50%, -50%) rotate(-1.16deg)',
            width: '70%',
            textAlign: 'center',
            fontSize: '2.2cqi', // 크기에 비례하는 폰트 사이즈
            color: '#ffffff',
            zIndex: 15,
            lineHeight: '1.4',
            wordBreak: 'keep-all'
            }}>
            {currentQ.question}
        </div>

        <img 
          src={question} 
          alt="질문칸"
          style={{
            position: 'absolute',
            top: '33.845%',          // 위에서 50% 지점
            left: '69.25%',         // 왼쪽에서 "
            transform: 'translate(-50%, -50%)', // 정중앙 정렬을 위한 보정
            width: '39%',      // 캐릭터 크기 조절
            zIndex: 10
          }}
          onContextMenu={preventActions}
          onDragStart={preventActions}
        />

        <OptionButton 
            text={currentQ.options[0].text} 
            onClick={() => handleNext(currentQ.options[0].value)}
            top="51.75%"   
            left="69.55%" 
            width="39%" 
            img={u_answer} 
            preventActions={preventActions}
        />

        <OptionButton 
            text={currentQ.options[1].text} 
            onClick={() => handleNext(currentQ.options[1].value)}
            top="64.2%"    
            left="69.62%" 
            width="39%" 
            img={d_answer} 
            preventActions={preventActions}
        />

      </div>  
    </div>
  );
}

export default QuestionView;
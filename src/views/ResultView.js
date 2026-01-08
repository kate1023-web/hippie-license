import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react'; //클릭 이벤트

import background from '../assets/TestBG.png';
import exclamation_H from '../assets/Exclamation_H.png';
import reaction_H from '../assets/Reaction_H.png';
import encyclopedia_H from '../assets/Encyclopedia_H.png';
import analysis_H from '../assets/Analysis_H.png';
import collecting_H from '../assets/Collecting_H.png';
import creator_H from '../assets/Creator_H.png';
import explorer_H from '../assets/Explorer_H.png';
import promotion_H from '../assets/Promotion_H.png';
import home from '../assets/Home.png';
import recap from '../assets/Recap.png'

const ResultButton = ({ src, alt, onClick, top, left, width, preventActions }) => {
  const [pressed, setPressed] = useState(false);

  return (
    <img 
      src={src} 
      alt={alt}
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
        transform: `translate(-50%, -50%) scale(${pressed ? 0.92 : 1})`,
        width: width,
        zIndex: 20,
        cursor: 'pointer',
        transition: 'transform 0.1s ease',
        WebkitTapHighlightColor: 'transparent'
      }}
      onContextMenu={preventActions}
      onDragStart={preventActions}
    />
  );
};


function ResultView() {
  const preventActions = (e) => e.preventDefault(); //이미지 다운금지

  const navigate = useNavigate();

  const canvasRef = useRef(null);
  const location = useLocation();
  const { finalCounts, userName } = location.state || { finalCounts: { Exclamation_H: 0 }, userName: "히삐" };

  // 가장 높은 카운트를 가진 key(type)를 찾는 함수
  const getBestType = (obj) => {
    if (!obj) return "Exclamation_H";

    // 1. 가장 높은 점수를 찾음 (예: 최고점이 3점)
    const maxScore = Math.max(...Object.values(obj));

    // 2. 최고점을 가진 모든 타입들을 배열로 모음 (예: ["Analysis_H", "Reaction_H"])
    const candidates = Object.keys(obj).filter(key => obj[key] === maxScore);

    // 3. 후보가 여러 명이라면 그 중 하나를 무작위로 선택
    // 후보가 하나라면 0번째 인덱스를 그대로 반환
    return candidates[Math.floor(Math.random() * candidates.length)];
  };

  const bestType = getBestType(finalCounts); // 예: "type3"이 나옴

  // 실제 결과 데이터 매핑
  const results = {
    Exclamation_H: { title: "감탄 히삐", img: exclamation_H },
    Reaction_H: { title: "리액션 히삐", img: reaction_H },
    Encyclopedia_H: { title: "백과사전 히삐", img: encyclopedia_H },
    Analysis_H: { title: "분석 히삐", img: analysis_H },
    Collecting_H: { title: "수집 히삐", img: collecting_H },
    Creator_H: { title: "크리에이터 히삐", img: creator_H },
    Explorer_H: { title: "탐험가 히삐", img: explorer_H },
    Promotion_H: { title: "홍보 히삐", img: promotion_H }
  };

  const finalResult = results[bestType];

  const testClick = () => {
    navigate('/'); // App.js에서 설정한 path로 이동
  };
  const recapClick = () => {
    navigate('/recap-main'); // App.js에서 설정한 path로 이동
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.src = finalResult.img;

    image.onload = () => {
      // 1. 캔버스 크기를 이미지 크기에 맞춤
      canvas.width = image.width;
      canvas.height = image.height;

      const x = canvas.width*0.392;     // 가로 중앙
      const y = canvas.height * 0.41;

      // 2. 히삐 이미지 그리기
      ctx.drawImage(image, 0, 0);

      // 3. 이름 텍스트 스타일 설정
      ctx.font = 'bold 80px SchoolSafetyStubbyChalk'; // 폰트와 크기
      ctx.textAlign = 'left';

      ctx.lineJoin = 'round'; // 테두리를 둥글게 연결

      // 2. 중간 테두리 (예: 갈색, 두께 1)
      ctx.strokeStyle = '#7B5323';
      ctx.lineWidth = 16;
      ctx.strokeText(`${userName}`, x, y);  

      // 1. 가장 바깥쪽 테두리 (예: 흰색, 두께 15)
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 12;
      ctx.strokeText(`${userName}`, x, y);

          

      // 4. 이름 그리기 (위치는 이미지에 맞춰 조절하세요)
      // 예: 이미지 하단 중앙에서 약간 위 (x: 중앙, y: 높이의 85%)
      ctx.fillStyle = '#7B5323'; // 글자색
      ctx.fillText(`${userName}`, x,y);
    };
  }, [finalResult, userName]);

  const saveImage = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = `${userName}_히삐_결과.png`;
    link.href = canvas.toDataURL();
    link.click();
  };
  
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
        
        <div style={{ 
            position: 'absolute', 
            top: '47.8%', 
            left: '71%', 
            // 1. transform을 한 줄로 합쳐야 '중앙 정렬'과 '회전'이 동시에 먹힙니다.
            transform: 'translate(-50%, -50%) rotate(-1.16deg)', 
            textAlign: 'center',
            // 2. 이 div 자체가 반응형 너비를 가져야 내부 캔버스가 줄어듭니다.
            width: '45%', 
            zIndex: 15
        }}>
        {/* 캔버스가 실제 이미지가 됩니다. */}
        <canvas 
            ref={canvasRef} 
            // 3. style width를 100%로 주어 부모 div 크기에 맞게 신축성 있게 만듭니다.
            style={{ 
            width: '100%', 
            maxWidth: '670px', 
            height: 'auto', // 높이 비율 유지
            cursor: 'pointer',
            display: 'block'
            }} 
            title="클릭하면 저장됩니다"
            onClick={saveImage} // 클릭 시 저장 기능 연결
        />
        </div>

        <ResultButton 
                src={home} 
                alt="홈으로" 
                onClick={testClick} 
                top="81.2%" 
                left="61%" 
                width="16%" 
                preventActions={preventActions}
            />

            <ResultButton 
                src={recap} 
                alt="리캡보기" 
                onClick={recapClick} 
                top="80.6%" 
                left="79%" 
                width="16%" 
                preventActions={preventActions}
            />

      </div>  
    </div>
  );
}

export default ResultView;
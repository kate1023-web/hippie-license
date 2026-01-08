import React from 'react';
import background from '../assets/Background_v2.png';
import nino from '../assets/Nino_v2.png';
import rbtn from '../assets/Recap_btn.png';
import mbtn from '../assets/Measure_btn.png';
import logo from '../assets/Logo.png';
import './GameLayout.css';
import { useNavigate } from 'react-router-dom'; //다른 js페이지로 이동할 때
import { useState } from 'react'; //클릭 이벤트

//클릭 이벤트
const GameButton = ({ src, alt, onClick, top, left, width, preventActions }) => {
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

function GameLayout() {
  const preventActions = (e) => e.preventDefault(); //이미지 다운금지

  const navigate = useNavigate(); //네비게이트 함수 선언

  const recapClick = () => {
    navigate('/recap-main'); // App.js에서 설정한 path로 이동
  };
  const testClick = () => {
    navigate('/name'); // App.js에서 설정한 path로 이동
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

        <img 
          src={nino} 
          alt="인물"
          style={{
            position: 'absolute',
            top: '50%',          // 위에서 50% 지점
            left: '49.95%',         // 왼쪽에서 "
            transform: 'translate(-50%, -50%)', // 정중앙 정렬을 위한 보정
            width: '100%',      // 캐릭터 크기 조절
            zIndex: 10
          }}
          onContextMenu={preventActions}
          onDragStart={preventActions}
        />

        <img 
          src={logo} 
          alt="로고"
          className="tilting-logo"
          style={{
            position: 'absolute',
            top: '49%',          
            left: '49.95%',         
            transform: 'translate(-50%, -50%)', // 정중앙 정렬을 위한 보정
            width: '100%',      // 캐릭터 크기 조절
            zIndex: 15
          }}
          onContextMenu={preventActions}
          onDragStart={preventActions}
        />

        <GameButton 
          src={mbtn} 
          alt="히삐력 측정하기" 
          onClick={testClick} 
          top="66.7%" 
          left="24.1%" 
          width="11.5%" 
          preventActions={preventActions}
        />

        {/* 버튼 2: 자격증 구경하기 */}
        <GameButton 
          src={rbtn} 
          alt="자격증 구경하기" 
          onClick={recapClick} 
          top="73.15%" 
          left="34.2%" 
          width="11.5%" 
          preventActions={preventActions}
        />
      </div>  
    </div>
  );
}

export default GameLayout;
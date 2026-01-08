import React from 'react';
import background from '../assets/RecapBackground_v2.png';
import nino from '../assets/Nino_Recap.png';
import ment from '../assets/R_ment.png';
import toggle from '../assets/R_Toggle.png';

import { useNavigate } from 'react-router-dom'; //다른 js페이지로 이동할 때
import { useState } from 'react'; //클릭 이벤트
import Particles from "react-tsparticles"; // react-particles 대신 react-tsparticles 권장
import { loadSlim } from "tsparticles-slim"; //먼지효과
//npm install react-tsparticles tsparticles-slim -> 먼지 흩날리는 효과 만들 때 다운받아야함

//클릭 이벤트
const RecapButton = ({ src, alt, onClick, top, left, width, preventActions }) => {
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

function RecapLayout() {
  const preventActions = (e) => e.preventDefault(); //이미지 다운금지

  const navigate = useNavigate(); //네비게이트 함수 선언

  const nextClick = () => {
    navigate('/recap'); // App.js에서 설정한 path로 이동
  };

  const particlesInit = async (engine) => {
    await loadSlim(engine);
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

      <RecapButton 
          src={toggle} 
          alt="다음으로" 
          onClick={nextClick} 
          top="50.5%" 
          left="95.5%" 
          width="2.4%" 
          preventActions={preventActions}
        />

      <img 
          src={ment} 
          alt="설명"
          style={{
            position: 'absolute',
            top: '80.4%',          // 위에서 50% 지점
            left: '79.5%',         // 왼쪽에서 "
            transform: 'translate(-50%, -50%)', // 정중앙 정렬을 위한 보정
            width: '31%',      // 캐릭터 크기 조절
            zIndex: 10
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

    <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            fullScreen: { enable: false }, // 컨테이너 안에서만 돌게 설정
            fpsLimit: 60,
            particles: {
              number: {
                value: 50, // 먼지 개수
                density: { enable: true, area: 800 },
              },
              color: { value: "#ffffff" },
              shape: { type: "circle" },
              opacity: {
                value: { min: 0.1, max: 0.5 }, // 반짝이는 느낌을 위해 범위 지정
                animation: {
                  enable: true,
                  speed: 1,
                  sync: false,
                }
              },
              size: {
                value: { min: 1, max: 3 },
              },
              move: {
                enable: true,
                speed: 0.3, // 아주 천천히 이동
                direction: "none",
                random: true,
                straight: false,
                outModes: { default: "out" },
              },
            },
            // 3. z-index 설정 (배경 이미지보다 위에 보이게)
            zIndex: {
              value: 10
            },
            detectRetina: true,
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />

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
      </div>  
    </div>
  );
}

export default RecapLayout;
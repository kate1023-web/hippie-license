import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 사용할 이미지들을 배열로 묶어줍니다.
import result1 from '../assets/result1.png';
import result2 from '../assets/result2.png';
import result3 from '../assets/result3.png';
import result4 from '../assets/result4.png';
import result5 from '../assets/result5.png';
import result6 from '../assets/result6.png';
import result7 from '../assets/result7.png';
import result8 from '../assets/result8.png';

import toggle from '../assets/R_Toggle.png';
import background from '../assets/RecapBackground_v3.png';
import nino from '../assets/Nino_Recap.png';
import home from '../assets/R_Home.png';

import Particles from "react-tsparticles"; // react-particles 대신 react-tsparticles 권장
import { loadSlim } from "tsparticles-slim"; //먼지효과

const HomeButton = ({ src, alt, onClick, top, left, width, preventActions }) => {
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


function RecapView() {
  const preventActions = (e) => e.preventDefault();
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [result1, result2, result3, result4, result5, result6, result7, result8]; 

  const nextSlide = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  const navigate = useNavigate(); //네비게이트 함수 선언
  
    const homeClick = () => {
      navigate('/'); // App.js에서 설정한 path로 이동
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

        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1, // 전체 레이어 중 가장 아래
            overflow: 'hidden' // 입자가 배경 밖으로 나가는 것 방지
        }}>

            <img 
                src={background} 
                alt="배경"
                style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover', // 컨테이너에 꽉 차게 설정
                    position: 'absolute', 
                    top: 0, 
                    left: 0 
                }}
                onContextMenu={preventActions}
                onDragStart={preventActions}
            />

            <Particles
                id="tsparticles"
                init={particlesInit}
                style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none"
                }}
                options={{
                fullScreen: { enable: false }, // 컨테이너 내부 렌더링 필수
                fpsLimit: 60,
                particles: {
                    number: { 
                    value: 80, 
                    density: { enable: true, area: 800 } // area를 조금 줄여 밀도 조절
                    },
                    color: { value: "#ffffff" },
                    opacity: { 
                    value: { min: 0.1, max: 0.5 }, 
                    animation: { enable: true, speed: 0.5 } 
                    },
                    size: { value: { min: 1, max: 2.5 } },
                    move: { 
                    enable: true, 
                    speed: 0.4, 
                    direction: "none", 
                    random: true, 
                    straight: false, 
                    outModes: { default: "out" } 
                    },
                },
                detectRetina: true,
                }}
            />
        </div>

        <img 
          src={nino} 
          alt="인물"
          style={{
            position: 'absolute',
            top: '50%', left: '49.95%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            zIndex: 10
          }}
          onContextMenu={preventActions}
          onDragStart={preventActions}
        />

        <div style={{ 
          position: 'absolute', 
          left: "40%",
          width: '60%', 
          zIndex: 15,
          display: 'flex', justifyContent: 'center'
        }}>
          <img 
            key={currentIndex}
            src={images[currentIndex]} 
            alt={`result-${currentIndex}`}
            style={{ width: '100%', height: 'auto' }}
            onContextMenu={preventActions}
            onDragStart={preventActions}
          />
        </div>

        {currentIndex < images.length - 1 && (
          <img 
            src={toggle} 
            onClick={nextSlide}
            style={{ 
              position: 'absolute', 
              top: "50.5%", right: "2.1%", // left 대신 right 사용이 더 정확함
              width: "2.4%", 
              cursor: 'pointer',
              zIndex: 50,
              transform: 'translateY(-50%)', // Y축 고정
              transition: 'transform 0.2s'
            }} 
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-50%) scale(1.1)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(-50%) scale(1)'}
            onContextMenu={preventActions}
            onDragStart={preventActions}
          />
        )}

        {currentIndex > 0 && (
          <img 
            src={toggle} 
            onClick={prevSlide}
            style={{ 
              position: 'absolute', 
              top: "50.5%", left: "2%", 
              width: "2.4%", 
              cursor: 'pointer',
              zIndex: 50,
              transform: 'translateY(-50%) scaleX(-1)', // 반전 상태 유지
              transition: 'transform 0.2s'
            }} 
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-50%) scaleX(-1) scale(1.1)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(-50%) scaleX(-1) scale(1)'}
            onContextMenu={preventActions}
            onDragStart={preventActions}
          />
        )}

        {currentIndex === images.length - 1 && (
            <HomeButton 
            src={home} 
            alt="홈으로" 
            onClick={homeClick} 
            top="92.5%" 
            left="94%" 
            width="3.4%" 
            preventActions={preventActions}
            />
        )}

      </div>
    </div>
  );
}

export default RecapView;
import React from 'react';
import background from '../assets/TestBG.png';
import namebox from '../assets/Name_box.png';
import { useState } from 'react';
import toggle from '../assets/Toggle.png';
import { useNavigate } from 'react-router-dom';

// 이름 입력 후 누를 "다음으로" 버튼
const NextButton = ({ onClick, top, left, width, text, img, preventActions }) => {
  const [pressed, setPressed] = useState(false);
  const rotation = "-1.16deg";
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
        // 밖에서 받아온 top, left 값을 그대로 적용합니다.
        top: top, 
        left: left,
        width: width, // 밖에서 받아온 너비 적용
        transform: `translate(-50%, -50%) rotate(${rotation}) scale(${pressed ? 0.95 : 1})`,
        display: 'flex',
        flexDirection: 'row', // 가로로 나열
        alignItems: 'center', 
        justifyContent: 'center',
        gap: '8px', // 이미지와 글자 사이 간격
        cursor: 'pointer',
        zIndex: 20,
        transition: 'transform 0.1s ease',
        WebkitTapHighlightColor: 'transparent',
        
      }}
    >
      {/* 1. 이미지 (토글 아이콘) */}
      <img 
        src={toggle} 
        alt="다음버튼" 
        style={{ width: '100%', display: 'block', }} 
        onContextMenu={preventActions} 
        onDragStart={preventActions} 
      />
      
      {/* 2. 문구 (이미지 바로 옆에 배치) */}
      <div style={{
        fontFamily: 'SchoolSafetyTteokbokki',
        fontSize: '1.5cqi',
        color: '#7B5323',
        pointerEvents: 'none', // 클릭 이벤트가 부모 div로 전달되도록 설정
        whiteSpace: 'nowrap',
      }}>
        {text}
      </div>
    </div>
  );
};

function NamewriteView() {
  const preventActions = (e) => e.preventDefault(); //이미지 다운금지

  const [userName, setUserName] = useState(''); // 이름 저장용 state

  const navigate = useNavigate();

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

        <input
            type="text"
            placeholder="닉네임을 입력해주세요"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            style={{
                position: 'absolute',
                top: "37.8%", // 이미지와 동일한 위치
                left: "68.5%", 
                transform: 'translate(-50%, -50%)',
                width: "20%", // 이미지보다 약간 작게 설정해서 박스 안에 들어오게 함
                zIndex: 15,    // 이미지(10)보다 위로
                background: 'transparent', // 배경 투명하게
                border: 'none',            // 테두리 없애기
                outline: 'none',           // 클릭 시 생기는 테두리 없애기
                fontFamily: 'SchoolSafetyStubbyChalk', // 폰트 통일
                fontSize: '2cqi',
                color: '#7B5323',          // 글자색 통일
                textAlign: 'center'
            }}
        />

        <img 
          src={namebox} 
          alt="이름을 입력하세요"
          style={{
            position: 'absolute',
            top: "38%", 
            left: "68.5%", 
            width: "28%",
            transform: 'translate(-50%, -50%)', // 정중앙 정렬을 위한 보정
            zIndex: 10
          }}
          onContextMenu={preventActions}
          onDragStart={preventActions}
        />

        <NextButton 
          text="다음으로"
          top="52.8%"
          left="68%"
          width="2.5%" // 토글 이미지 크기
          onClick={() => {
            if(userName.trim() === "") {
              alert("이름을 입력해주세요!");
            } else {
              navigate('/test', { state: { userName } });
              console.log(userName + "님 환영합니다!");
            }
          }}
          preventActions={preventActions}
        />

      </div>  
    </div>
  );
}

export default NamewriteView;
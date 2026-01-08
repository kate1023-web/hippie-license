import React from 'react';

const questions = [
  {
    id: 1,
    question: "니노 방송을 볼 때 더 가까운 쪽은?",
    options: [
      { text: "흠.. 이거 설마 스포?!", value: ["Analysis_H"] }, 
      { text: "니노야!!!! 니가 짱이다!!!!!", value: ["Reaction_H"] },
    ],
  },
  {
    id: 2,
    question: "방송이 끝난 뒤 나는?",
    options: [
      { text: "오늘 방송을 머릿속에서 다시 떠올림", value: ["Encyclopedia_H"] }, // 분석->백과사전 변경 (균형)
      { text: "여운이 남아서 SNS나 댓글부터 봄", value: ["Promotion_H"] },  // 반응->홍보 변경 (균형)
    ],
  },
  {
    id: 3,
    question: "덕질할 때 나는 주로?",
    options: [
      { text: "조용히, 하지만 꾸준히 함께함", value: ["Explorer_H"] },
      { text: "주변에 니노 얘기를 자주 함", value: ["Promotion_H"] },
    ],
  },
  {
    id: 4,
    question: "니노의 말 한마디에 더 끌리는 쪽은?",
    options: [
      { text: "공감만땅! 다정하고 따뜻한 말투", value: ["Exclamation_H"] },
      { text: "정보 · 맥락이 또렷한 말", value: ["Encyclopedia_H"] },
    ],
  },
  {
    id: 5,
    question: "니노 관련 자료를 보면?",
    options: [
      { text: "이건 저장해야지!!!", value: ["Collecting_H"] },
      { text: "이걸로 뭐 만들어 볼까?", value: ["Creator_H"] },
    ],
  },
  {
    id: 6,
    question: "방송 중 명장면이 나오면?",
    options: [
      { text: "왜 이 장면이 좋은지 생각함", value: ["Analysis_H"] },
      { text: "그냥 마음이 먼저 움직임", value: ["Exclamation_H"] },
    ],
  },
  {
    id: 7,
    question: "덕질에서 더 중요한 건?",
    options: [
      { text: "오래오래 함께하는 것", value: ["Explorer_H", "Encyclopedia_H"] }, // 보강
      { text: "순간의 감정을 나누는 것", value: ["Reaction_H", "Exclamation_H"] }, // 보강
    ],
  },
  {
    id: 8,
    question: "굿즈를 대하는 나의 자세는?",
    options: [
      { text: "종류별로 모으고 정리함", value: ["Collecting_H"] },
      { text: "취향인 것만 골라 구매함", value: ["Explorer_H"] },
    ],
  },
  {
    id: 9,
    question: "팬아트나 영상이 올라오면?",
    options: [
      { text: "썸네일이나 영상구성부터 봄", value: ["Creator_H"] },
      { text: "너무 좋아서 바로 반응함", value: ["Reaction_H"] },
    ],
  },
  {
    id: 10,
    question: "니노는 나에게...",
    options: [
      { text: "기록하고 남기고 싶은 사람", value: ["Creator_H", "Analysis_H"] }, // 보강
      { text: "감정을 나누고 싶은 사람", value: ["Collecting_H", "Promotion_H"] }, // 보강
    ],
  }
];

export default questions;
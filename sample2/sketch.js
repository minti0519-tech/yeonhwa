function setup() {
  createCanvas(600, 400);
  noFill();
  stroke(0);
  strokeWeight(4);
  strokeJoin(ROUND);
}

function draw() {
  background(240);
  
  push();
  translate(50, -66);

  // --- 1. 얼굴 전체 구조 (연결된 폴리라인 및 겹치는 선) ---
  beginShape();
  
  // 왼쪽 눈썹에서 코로 이어지는 라인
  vertex(150, 120); // 왼쪽 눈썹 시작
  vertex(235, 80);  // 눈썹 정점
  vertex(170, 250); // 코 왼쪽 선
  vertex(260, 275); // 코 밑선
  vertex(275, 100); // 코 오른쪽 선 (상승)
  
  // 오른쪽 눈썹으로 연결
  vertex(370, 200); 
  endShape();

  // 왼쪽 눈 (폴리라인 겹치도록 배치)
  line(150, 160, 205, 160); // 눈 윗선
  line(167, 160, 167, 185); // 눈물 1
  line(175, 160, 175, 238); // 눈물 2
  line(183, 160, 183, 185);// 눈물 3

  // 오른쪽 눈
  line(268, 180, 348, 180); // 눈 윗선
  line(307, 180, 307, 210); // 눈물 1
  line(315, 180, 315, 365); // 눈물 2
  line(323, 180, 323, 260); // 눈물 3  
  
  // 오른쪽 눈물점
fill(1); // 점의 안을 까맣게 칠
  ellipse(330, 230, 2, 2)
  noFill(); //
  
  // 입 (하단 폴리라인 구조)
  beginShape();
  vertex(130, 335); // 입 왼쪽 끝
  vertex(190, 298); // 윗입술 산 1
  vertex(210, 330); // 윗입술 골
  vertex(240, 305); // 윗입술 산 2
  vertex(300, 360); // 입 오른쪽 끝
  vertex(230, 350);
  vertex(210, 360); // 입 내부 라인
  vertex(190, 340);  
  vertex(130, 335); // 닫기
  
  // 아랫입술 라인 연결
  vertex(145, 430); 
  vertex(250, 450); 
  vertex(300, 360); 
  endShape();

  // --- 2. 오른쪽 원 (완전히 분리된 형태) ---
  ellipse(360, 360, 90, 90);
  
  noLoop(); // 
  
  // 얇고 미세한 선들로 구성된 방사형 패턴을 구현.
  
  push();
  strokeWeight(1); 
  stroke(200, 300); // 회색에 약간의 투명도 부여
  
  // --- 패턴 중심 및 분포 조절 ---
  const centerX = 360; // 패턴의 중심을 캔버스 중앙
  const centerY = 360; 
  const linesCount = 120; // 선의 개수 (밀도)
  const segments = 50; // 점선의 마디 개수를 늘려 패턴이 더 멀리 퍼지도록
  const maxLength = 250; // 최대 길이
  const dashLength = 2; // 점선의 길이
  const spaceLength = 8; // 점선 사이의 간격을 늘려 패턴이 더 넓게 퍼지도록

  for (let i = 0; i < linesCount; i++) {
    const angle = i * (Math.PI * 5) / linesCount;
    let x = centerX;
    let y = centerY;
    
    for (let j = 0; j < segments; j++) {
      const nextX = x + Math.cos(angle) * dashLength;
      const nextY = y + Math.sin(angle) * dashLength;
      
      line(x, y, nextX, nextY);
      
      // 마스크(Masking)
      // 단순한 점선을 겹쳐서 그리는 방식으로 구현.
      
      x = nextX + Math.cos(angle) * spaceLength;
      y = nextY + Math.sin(angle) * spaceLength;
    }
  }
  pop();
}
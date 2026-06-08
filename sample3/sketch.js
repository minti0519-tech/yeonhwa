 let tearColor; // 눈물 색상 변수

function setup() {
  createCanvas(600, 400);
  strokeJoin(ROUND);
  tearColor = color(0); // 첫 시작 색은 검정색
}

function draw() {
  background(240);

  // --- 인터액션: 마우스 Y축 위치에 따라 눈물 길이를 조절 ---
  // 마우스를 아래로 내릴수록 눈물이 길어짐.
  let tearLen = map(mouseY, 0, height, 0, 180);

  push();
  translate(50, -66);

  // --- 1. 얼굴 전체 구조  ---
  stroke(0);
  strokeWeight(4);
  noFill();

  beginShape();
  // 왼쪽 눈썹에서 코로 이어지는 라인
  vertex(150, 120);
  vertex(235, 80);
  vertex(170, 250);
  vertex(260, 275);
  vertex(275, 100);
  // 오른쪽 눈썹으로 연결
  vertex(370, 200);
  endShape();
  
  
  // --- 2. 움직이는 눈물 (인터액션 적용) ---
  stroke(tearColor); // 키보드로 변경되는 색상  

  // 왼쪽 눈 및 눈물
  line(150, 160, 205, 160); // 눈 윗선
  line(167, 160, 167, 160 + tearLen * 0.2); // 눈물 1
  line(175, 160, 175, 160 + tearLen * 0.6); // 눈물 2 (가장 김)
  line(183, 160, 183, 160 + tearLen * 0.2); // 눈물 3

  // 오른쪽 눈 및 눈물
line(268, 180, 348, 180); // 눈 윗선
  line(307, 180, 307, 180 + tearLen * 0.2); // 눈물 1
  line(315, 180, 315, 180 + tearLen * 1.0); // 눈물 2 (가장 김)
  line(323, 180, 323, 180 + tearLen * 0.4); // 눈물 3

  // 오른쪽 눈물점
  fill(tearColor);
  ellipse(330, 230, 3, 3);
  noFill();

  // --- 3. 입 구조  ---
  stroke(0);
  beginShape();
  vertex(130, 335);
  vertex(190, 298);
  vertex(210, 330);
  vertex(240, 305);
  vertex(300, 360);
  vertex(230, 350);
  vertex(210, 360);
  vertex(190, 340);
  vertex(130, 335);
  // 아랫입술 라인
  vertex(145, 430);
  vertex(250, 450);
  vertex(300, 360);
  endShape();

  // --- 4. 오른쪽 원 및 방사형 패턴  ---
  ellipse(360, 360, 90, 90);

  push();
  strokeWeight(1);
  stroke(200, 150); // 약간의 투명도 부여

  const centerX = 360;
  const centerY = 360;
  const linesCount = 120;
  const segments = 50;
  const dashLength = 2;
  const spaceLength = 8;

  for (let i = 0; i < linesCount; i++) {
    const angle = (i * (PI * 5)) / linesCount;
    let x = centerX;
    let y = centerY;

    for (let j = 0; j < segments; j++) {
      const nextX = x + cos(angle) * dashLength;
      const nextY = y + sin(angle) * dashLength;
      line(x, y, nextX, nextY);
      x = nextX + cos(angle) * spaceLength;
      y = nextY + sin(angle) * spaceLength;
    }
  }
  pop();
  pop(); // 상단 translate 영향 종료
}

// --- 키보드 인터액션: 아무 키나 누르면 눈물 색상이 랜덤으로 변경 ---
function keyPressed() {
  tearColor = color(random(255), random(100), random(100));
}
// 키보드 이벤트 함수 
function keyPressed() {
  // 's' 키를 누르면 저장 시작
  if (key === 's' || key === 'S') {
    saveGif('myCharacter_Interaction', 5); // 5초 동안 녹화 후 저장
  }
  
  // (기존에 있던 눈물 색상 변경 코드)
  tearColor = color(random(100, 255), random(100, 255), random(255));
}
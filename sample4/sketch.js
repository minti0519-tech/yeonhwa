function setup() {
  createCanvas(600, 400);
  
  // 색상 변화(lerpColor)를 위한 두 가지 대비되는 색상 그룹 정의
  palette1 = [
    color(255, 0, 0),
    color(0, 100, 255),
    color(255, 200, 0),
    color(0, 180, 120),
    color(255),
    color(20, 20, 20)
  ];
  
  palette2 = [
    color(150, 0, 255), // 보라
    color(0, 230, 255), // 하늘
    color(255, 0, 150), // 핫핑크
    color(50, 50, 50),
    color(200),
    color(10, 10, 50)
  ];
}

function draw() {
  background(0);

  // sin()을 이용하여 사람이 위아래로 움직임
  let hoverY = sin(frameCount * 0.03) * 15;
  translate(width / 2, height / 1.5 + hoverY);

  drawBackgroundCircles();
  drawPixelHuman();
}

// 사람 (네모로 조합)
function drawPixelHuman() {
  noStroke();

  // [색상 변화] 시간에 따라 palette1과 palette2 사이를 부드럽게 오고 가도록 설정
  let colorT = (sin(frameCount * 0.02) + 1) / 2; 

  // 인체 
  for (let y = -250; y < 300; y += 8) {
    for (let x = -120; x < 120; x += 8) {

      // 몸 형태
      if (isInsideHuman(x, y)) {
       
        // 시간에 따른 흐름(frameCount * 0.03)을 더해 부드럽게 커졌다 작아졌다 하도록 
        let n = noise(x * 0.05, y * 0.05, frameCount * 0.03);
        let size = map(n, 0, 1, 2, 14); // 최소 2px에서 최대 14px까지 랜덤하게 변화

        let isBody = (y > -100 && y < 120 && abs(x) < 90);
        let isArm = (y > -80 && y < 80 && abs(x) > 90 && abs(x) < 140);

        // 시간의 흐름에 따라 변하는 동적 팔레트 색상 추출
        let idx = floor(random(palette1.length));
        let blendedColor = lerpColor(palette1[idx], palette2[idx], colorT);

        //  채워진 네모 & 빈 네모 
        if (isBody || isArm) {
          if (random() > 0.6) {
            // > 빈 네모
            noFill();
            stroke(255, 200); 
            strokeWeight(1);
            rect(x, y, size, size);
            noStroke();
          } else {
            // > 채워진 네모
            fill(blendedColor);
            rect(x, y, size, size);
          }
        } else {
          // 머리&등 > 나머지는 그대로 채움
          fill(blendedColor);
          rect(x, y, size, size);
        }

        // 작은 사각형 외곽선 효과 유지
        if (random() > 0.7) {
          stroke(0);
          noFill();
          rect(x, y, size, size);
          noStroke();
        }
      }
    }
  }
}

//  인체 실루엣 
function isInsideHuman(x, y) {
  if (dist(x, y, 0, -180) < 50) return true;
  if (abs(x) < 20 && y > -130 && y < -100) return true;
  if (y > -100 && y < 120 && abs(x) < 90) return true;
  if (y > -80 && y < 80 && abs(x) > 90 && abs(x) < 140) return true;
  return false;
}

//  배경 (원 기반) 
function drawBackgroundCircles() {
  noFill();

  // 배경 원들의 부드러운 회전 효과
  let bgRotation = frameCount * 0.005;

  // 동글
  for (let r = 50; r < 400; r += 30) {
    stroke(255, 40);
    strokeWeight(1);

    // 원 
    for (let a = 0; a < TWO_PI; a += 0.1) {
      let x = cos(a + bgRotation) * r;
      let y = sin(a + bgRotation) * r;

      // 배경 입자 크기도 시간 및 반지름에 따라 변화
      let size = map(sin(frameCount * 0.02 + r), -1, 1, 1, 6);

      noStroke();
      fill(255, random(30, 120));
      ellipse(x, y, size);
    }
  }

  // 랜덤 원형 추가
  for (let i = 0; i < 50; i++) {
    fill(255, random(20, 80));
    ellipse(
      random(-300, 300),
      random(-400, 400),
      random(1, 5)
    );
  }
}

// 키보드 이벤트 함수 (녹화 및 저장)
function keyPressed() {
  // 's' 또는 'S' 키를 누르면 저장 시작
  if (key === 's' || key === 'S') {
    saveGif('myCharacter_Interaction', 5); // 5초 동안 녹화 후 GIF 저장
  }
}
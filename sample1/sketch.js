function setup() {
  createCanvas(600, 400);
  noLoop();
}

function draw() {
  background(0);

  translate(width / 2, height / 1.5);

  drawBackgroundCircles();
  drawPixelHuman();
}

// ----- 사람 (네모로 조합) -----
function drawPixelHuman() {
  let palette = [
    color(255, 0, 0),
    color(0, 100, 255),
    color(255, 200, 0),
    color(0, 180, 120),
    color(255),
    color(20, 20, 20)
  ];

  noStroke();

  // 인체 
  for (let y = -250; y < 300; y += 8) {
  for (let x = -120; x < 120; x += 8) {

      // 몸 형태
      if (isInsideHuman(x, y)) {

      let size = random(5, 10);

      let isBody = (y > -100 && y < 120 && abs(x) < 90);
      let isArm = (y > -80 && y < 80 && abs(x) > 90 && abs(x) < 140);

// ----- 채워진 네모 & 빈 네모 -----
if (isBody || isArm) {

    if (random() > 0.6) {
    // > 빈 네모
    noFill();
    stroke(255, 200); // 밝은 라인
    strokeWeight(1);
    rect(x, y, size, size);
    noStroke();

  } else {
    // > 채워진 네모
    fill(random(palette));
    rect(x, y, size, size);
  }

} else {
  // 머리&등 > 나머지는 그대로 채움
  fill(random(palette));
  rect(x, y, size, size);
}

        // 작은 사각형
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

// ----- 인체 실루엣 -----
function isInsideHuman(x, y) {

  // ----- 머리 -----
  if (dist(x, y, 0, -180) < 50) return true;
 
  // ----- 목 -----
  if (abs(x) < 20 && y > -130 && y < -100) return true;

  // ----- 어깨 + 상체 -----
  if (y > -100 && y < 120 && abs(x) < 90) return true;

  // ----- 팔 (상반신만) -----
  if (y > -80 && y < 80 && abs(x) > 90 && abs(x) < 140) return true;

  return false;
}
// ----- 배경 (원 기반) -----
function drawBackgroundCircles() {
  noFill();

  // 동구조
  for (let r = 50; r < 400; r += 30) {
    stroke(255, 40);
    strokeWeight(1);

    // 원 쪼개기
    for (let a = 0; a < TWO_PI; a += 0.1) {
      let x = cos(a) * r;
      let y = sin(a) * r;

      let size = random(1, 7);

      noStroke();
      fill(255, random(30, 120));
      ellipse(x, y, size);
    }
  }

  // 랜덤 원형 추가
  for (let i = 0; i < 300; i++) {
    fill(255, random(20, 100));
    ellipse(
      random(-300, 300),
      random(-400, 400),
      random(1, 6)
    );
  }
}

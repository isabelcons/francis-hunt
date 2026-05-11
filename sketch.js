let catOpen, catClosed, ratImg;
let ratX, ratY;

let score = 0;
let timeLeft = 30;
let gameStarted = false;
let gameOver = false;
let timerStarted = false;

function preload() {
  catOpen = loadImage("images/francis-open.png");
  catClosed = loadImage("images/francis-closed.png");
  ratImg = loadImage("images/rat.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  textFont("monospace");
  noCursor();

  ratX = random(100, width - 100);
  ratY = random(150, height - 150);
}

function draw() {
  background(245, 239, 226);

  if (!gameStarted) {
    startScreen();
  } else if (gameOver) {
    endScreen();
  } else {
    playGame();
  }
}

function startScreen() {
  cursor();

  fill(0);
  textSize(80);
  text("francis hunt.", 40, 120);

  textSize(28);
  text("catch the rats!", 45, 180);
  text("move your mouse to chase them.", 45, 220);

  textSize(22);
  text("click to start", 45, 290);

  image(catClosed, width / 2, height / 2 + 80, 220, 260);
}

function playGame() {
  noCursor();

  fill(0);
  textSize(32);
  text("score: " + score, width - 250, 70);
  text("time: " + timeLeft, width - 250, 120);

  textSize(24);
  text("catch 10 rats!", 45, height - 90);
  text("good luck <3", 45, height - 55);

  let d = dist(mouseX, mouseY, ratX, ratY);

  if (d < 180) {
    let angle = atan2(ratY - mouseY, ratX - mouseX);
    ratX += cos(angle) * 5;
    ratY += sin(angle) * 5;
  }

  ratX = constrain(ratX, 70, width - 70);
  ratY = constrain(ratY, 70, height - 70);

  image(ratImg, ratX, ratY, 120, 80);

  if (d < 65) {
    image(catOpen, mouseX, mouseY, 170, 220);
  } else {
    image(catClosed, mouseX, mouseY, 170, 220);
  }

  if (d < 50) {
    score++;
    ratX = random(100, width - 100);
    ratY = random(150, height - 150);
  }

  if (score >= 10 || timeLeft <= 0) {
    gameOver = true;
  }
}

function mousePressed() {
  if (!gameStarted) {
    gameStarted = true;

    if (!timerStarted) {
      timerStarted = true;

      setInterval(function () {
        if (gameStarted && !gameOver && timeLeft > 0) {
          timeLeft--;
        }

        if (timeLeft <= 0) {
          gameOver = true;
        }
      }, 1000);
    }
  } else if (gameOver) {
    score = 0;
    timeLeft = 30;
    gameOver = false;
    ratX = random(100, width - 100);
    ratY = random(150, height - 150);
  }
}

function endScreen() {
  cursor();

  background(245, 239, 226);
  fill(0);

  textSize(70);

  if (score >= 10) {
    text("francis wins.", 45, 120);
  } else {
    text("time is up.", 45, 120);
  }

  textSize(32);
  text("final score: " + score, 50, 190);
  text("click to play again", 50, 250);

  image(catOpen, width / 2, height / 2 + 80, 240, 300);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
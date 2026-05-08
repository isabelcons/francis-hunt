let catOpen;
let catClosed;
let ratImg;

let ratX;
let ratY;
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
  newRat();
}

function draw() {
  background(245, 239, 226);

  if (gameStarted === false) {
    startScreen();
  } else if (gameOver === true) {
    endScreen();
  } else {
    playGame();
  }
}

function startScreen() {
  fill(0);
  textSize(80);
  text("francis hunt.", 40, 100);

  textSize(28);
  text("catch the rats!", 45, 160);
  text("move your mouse to chase them.", 45, 200);

  textSize(22);
  text("click to start", 45, 270);

  image(catOpen, width / 2, height / 2 + 80, 220, 260);
}

function playGame() {
  fill(0);
  textSize(32);
  text("score: " + score, width - 250, 70);
  text("time: " + timeLeft, width - 250, 120);

  textSize(24);
  text("catch 10 rats!", 45, height - 90);
  text("good luck <3", 45, height - 55);

  let distanceToRat = dist(mouseX, mouseY, ratX, ratY);

  if (distanceToRat < 180) {
    let angle = atan2(ratY - mouseY, ratX - mouseX);
    ratX = ratX + cos(angle) * 5;
    ratY = ratY + sin(angle) * 5;
  }

  ratX = constrain(ratX, 70, width - 70);
  ratY = constrain(ratY, 70, height - 70);

  image(ratImg, ratX, ratY, 120, 80);

  if (distanceToRat < 65) {
    image(catClosed, mouseX, mouseY, 170, 220);
  } else {
    image(catOpen, mouseX, mouseY, 170, 220);
  }

  if (distanceToRat < 50) {
    score = score + 1;
    newRat();
  }

  if (score >= 10 || timeLeft <= 0) {
    gameOver = true;
  }
}

function mousePressed() {
  if (gameStarted === false) {
    gameStarted = true;

    if (timerStarted === false) {
      timerStarted = true;
      setInterval(countDown, 1000);
    }
  } else if (gameOver === true) {
    score = 0;
    timeLeft = 30;
    gameOver = false;
    newRat();
  }
}

function countDown() {
  if (gameStarted === true && gameOver === false && timeLeft > 0) {
    timeLeft = timeLeft - 1;
  }
}

function newRat() {
  ratX = random(100, width - 100);
  ratY = random(150, height - 150);
}

function endScreen() {
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

  image(catClosed, width / 2, height / 2 + 80, 240, 300);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
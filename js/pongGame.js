let canvas, canvasContext;
let ballX = 50;
let ballY = 50;
let ballRadius = 10;
let ballSpeedX = 10;
let ballSpeedY = 5;
let player1Y = 250;
let player1X = 10;
let ballLeftEdge;
let ballRightEdge;
let ballBottomEdge;
let ballTopEdge;

const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 100;
const PLAYER1_EDGE = player1X + PADDLE_WIDTH;

function calculateMousePos(evt) {
  let rect = canvas.getBoundingClientRect();
  let root = document.documentElement;
  let mouseX = evt.clientX - rect.left - root.scrollLeft;
  let mouseY = evt.clientY - rect.top - root.scrollTop;
  return {
    x: mouseX,
    y: mouseY
  }
}

window.onload = function(){
  canvas = document.getElementById('pong-canvas'); //gets the canvas element from the dom by the id of pong-game
  canvasContext = canvas.getContext('2d');  //after looking at the getContext() method on mdn I now understand that this method returns a drawing context on the canvas
  let fps = 1000/60; // I don't want the fps to be changed by anything in the program, so it will be limited to the scope of window.onload
  setInterval(function(){ //an update all function isn't necessary since it wont be changed later
  drawEverything();
  moveEverything();
}, fps);

canvas.addEventListener('mousemove',
function(evt){
  let mousePos = calculateMousePos(evt);
  player1Y = mousePos.y - (PADDLE_HEIGHT/2);
});
}

function drawEverything(){
  drawRect(0,0, canvas.width, canvas.height, 'black');  //defines a rectangle with the drawRect() function
  drawCircle(ballX, ballY, ballRadius, 'red');
  drawRect(player1X, player1Y, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');
}

function moveEverything() {
  moveBall();
}

function drawRect(topX, topY, width, height, color) { // dry up code and make it reusable by making the fillRect() method into a helper function
  canvasContext.fillStyle = color; //define the fill color of the rect
  canvasContext.fillRect(topX,topY, width, height);
}

function drawCircle(centerX, centerY, radius, color) {
  canvasContext.fillStyle = color;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true); //the arc() method uses these arguements to draw a circle
  canvasContext.fill();
}

function moveBall(){
  ballX += ballSpeedX;
  ballY += ballSpeedY;
  ballLeftEdge = ballX - ballRadius;
  ballRightEdge = ballX + ballRadius;
  ballBottomEdge = ballY + ballRadius;
  ballTopEdge = ballY - ballRadius;

  if(ballRightEdge === canvas.width){
    ballSpeedX *= -1;
  }

  if(ballBottomEdge === canvas.height || ballTopEdge === 0){
    ballSpeedY *= -1;
  }

  if ( ballLeftEdge <= player1X + PADDLE_WIDTH) {
    if (ballY > player1Y && ballY < player1Y + PADDLE_HEIGHT) {
      ballSpeedX *= -1;
    } else if(ballRightEdge < 0) {
      resetBall();
    }
  }

}

function resetBall(){
  ballX = canvas.width/2;
  ballY = canvas.height/2;
  ballSpeedX *= -1;
}

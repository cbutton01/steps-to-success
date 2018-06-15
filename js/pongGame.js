let canvas, canvasContext;
let ballX = 50;
let ballY = 50;
let ballWidth = 25;
let ballHeight = 25;

window.onload = function(){
  canvas = document.getElementById('pong-canvas'); //gets the canvas element from the dom by the id of pong-game
  canvasContext = canvas.getContext('2d');  //after looking at the getContext() method on mdn I now understand that this method returns a drawing context on the canvas
  drawEverything(); //draws everything inside the drawEverything() function
}

function drawEverything(){
  drawRect(0,0, canvas.width, canvas.height, 'black');  //defines a rectangle with the drawRect() function
}

function drawRect(topX, topY, width, height, color) { // dry up code and make it reusable by making the fillRect() method into a helper function
  canvasContext.fillStyle = color; //define the fill color of the rect
  canvasContext.fillRect(topX,topY, width, height);
}

function drawCircle(centerX, centerY, width, height, color) {

}

var sprite_flappy;
var sprite_pipe;
var sprite_city;
var sprite_floor;
var sprite_title;

var sound_point;
var sound_wing;
var sound_hit;
var sound_die;
var sound_sweetwing;

var font_flappy;

var mousePress = false;
var mousePressEvent = false;
var mouseReleaseEvent = false;
var keyPress = false;
var keyPressEvent = false;
var keyReleaseEvent = false;

var pipes = [];

var score = 0;
var hightscore = 0;
var speed = 3;
var gap = 80;

var gameover = false;
var page = "MENU";

var overflowX = 0;

var startgame = false;

var flappy_bird;
var menu_gameover;

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  imageMode(CENTER);
  rectMode(CENTER);
  ellipseMode(CENTER);
  textAlign(CENTER,CENTER);
  
  noSmooth();
  
  pipes[0] = new Pipe();

  sprite_flappy = loadImage('flappybird.png');
  sprite_pipe = loadImage('pipe.png');
  sprite_city = loadImage('city.png');
  sprite_floor = loadImage('floor.png');
  sprite_title = loadImage('title.png');
  
  
  sound_point = loadSound('sfx_point.wav');
  sound_hit = loadSound('sfx_hit.wav');
  sound_die = loadSound('sfx_die.wav');
  sound_wing = loadSound('sfx_wing.wav');
  sound_sweetwing = loadSound('sfx_swooshing.wav');
  
  
  font_flappy = loadFont('flappy-font.ttf');
  
  flappy_bird = new FlappyBird();
  flappy_bird.y = height/2;
  
  menu_gameover = new GameOverMenu();
  
  try {
    textFont(font_flappy);
  }
  catch(e) {}
}

function draw() {
  background(123,196,208);
  
  switch(page) {
    case 'GAME':
      page_game();
      break;
    case 'MENU':
      page_menu();
      break;
  }

  mousePressEvent = false;
  mouseReleaseEvent = false;
  keyPressEvent = false;
  keyReleaseEvent = false;
}

function page_game() {  
  overflowX += speed;
  if(overflowX > sprite_city.width/2) {
    overflowX = 0;
  }

  image(sprite_city, sprite_city.width/2/2, height-sprite_city.height/2/2-40, sprite_city.width/2, sprite_city.height/2);

  if(!flappy_bird.falls) {
    if(parseInt(frameCount)%70 === 0) {
      pipes.push(new Pipe());
    }
  }
  
  for(var i = 0; i < pipes.length; i++) {
    if(pipes[i].x < -50) {
      pipes.splice(i, 1);
    }
    
    try {
      pipes[i].display();
      pipes[i].update();
    }
    catch(e) {}
  }

  image(sprite_floor, sprite_floor.width-overflowX, height-sprite_floor.height, sprite_floor.width*2, sprite_floor.height*2);
  image(sprite_floor, sprite_floor.width+sprite_floor.width-overflowX, height-sprite_floor.height, sprite_floor.width*2, sprite_floor.height*2);
  image(sprite_floor, sprite_floor.width+sprite_floor.width*2-overflowX, height-sprite_floor.height, sprite_floor.width*2, sprite_floor.height*2);
    
  flappy_bird.display();
  flappy_bird.update();
  flappy_bird.x = smoothMove(flappy_bird.x,90,0.02);

  if(!gameover) {
    push();
    stroke(0);
    strokeWeight(5);
    fill(255);
    textSize(30);
    text(score,width/2,50);
    pop();
  }
  
  push();
  noStroke();
  fill(255,flappy_bird.flashAnim);
  rect(width/2,height/2,width,height);
  pop();
  
  if(gameover) {
    menu_gameover.display();
    menu_gameover.update();
  }
}

function page_menu() {
  speed = 1;
  overflowX += speed;
  if(overflowX > sprite_city.width/2) {
    overflowX = 0;
  }

  image(sprite_city, sprite_city.width/2/2, height-sprite_city.height/2/2-40, sprite_city.width/2, sprite_city.height/2);

  image(sprite_floor, sprite_floor.width-overflowX, height-sprite_floor.height, sprite_floor.width*2, sprite_floor.height*2);
  image(sprite_floor, sprite_floor.width+sprite_floor.width-overflowX, height-sprite_floor.height, sprite_floor.width*2, sprite_floor.height*2);
  image(sprite_floor, sprite_floor.width+sprite_floor.width*2-overflowX, height-sprite_floor.height, sprite_floor.width*2, sprite_floor.height*2);
  
  image(sprite_title, width/2, 100, sprite_title.width/4, sprite_title.height/4);
  
  flappy_bird.kinematicMove();
  
  push();
  fill(230,97,29);
  stroke(255);
  strokeWeight(3);
  text('Tap to play',width/2,height/2-50);
  pop();

  if(mousePressEvent || (keyPressEvent && key == ' ') ) {
  	page = "GAME";
    resetGame();
  	
  	flappy_bird.velocityY = 0;
    flappy_bird.fly = true;
    flappy_bird.target = clamp(this.y - 60, -19, height);
    flappy_bird.angle = -45;
    flappy_bird.update();
  }
  
  flappy_bird.x = width/2;
}

function resetGame() {
  gameover = false;
  gap = 80;
  speed = 3;
  score = 0;
  flappy_bird.y = height/2;
  flappy_bird.falls = false;
  flappy_bird.velocityY = 0;
  flappy_bird.angle = 0;
  flappy_bird.flashAnim = 0;
  flappy_bird.flashReturn = false;
  pipes = [];
  flappy_bird.target = 10000;
  menu_gameover.ease = 0;
}

function press(txt, x, y, tX, tY) {
  var this_h = false;
  
  if(mouseX > tX+x-textWidth(txt)/2-10 &&
     mouseX < tX+x+textWidth(txt)/2+10 &&
     mouseY > tY+y-textAscent()/2-10 &&
     mouseY < tY+y+textAscent()/2+10)
  {
    this_h = true;
  }
  
  push();
  textSize(16);
    
  if(this_h && mousePress) {
    noStroke();
    fill(83, 56, 71);
    rect(x, y+3, textWidth(txt)+25+10, textAscent()+10+10);
      
    fill(250, 117, 49);
    stroke(255);
    strokeWeight(3);
    rect(x, y+2, textWidth(txt)+25, textAscent()+10);
    
    noStroke();
    fill(255);
    text(txt, x, y+2);
  }
  else {
    noStroke();
    fill(83, 56, 71);
    rect(x, y+2, textWidth(txt)+25+10, textAscent()+10+12);
    
    if(this_h) {
      fill(250, 117, 49);
    }
    else {
      fill(230, 97, 29);
    }
    stroke(255);
    strokeWeight(3);
    rect(x, y, textWidth(txt)+25, textAscent()+10);
    
    noStroke();
    fill(255);
    text(txt, x, y);
  }
  pop();
  
  if(this_h && mouseReleaseEvent) {
    try {
      sound_sweetwing.play();
    }
    catch(e) {}
  }
  
  return (this_h && mouseReleaseEvent);
}
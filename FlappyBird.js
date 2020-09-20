class FlappyBird {
  constructor() {
    this.x = 100;
    this.y = 0;
    this.target = 0;
    this.velocityY = 0;
    this.fly = false;
    this.angle = 0;
    this.falls = false;
    this.flashAnim = 0;
    this.flashReturn = false;
    this.kinematicAnim = 0;
  }
  
  display() {
    if((!mousePress) || this.falls) {
      push();
      translate(this.x, this.y);
      rotate(radians(this.angle));
      image(sprite_flappy, 0, 0, sprite_flappy.width*1.5, sprite_flappy.height*3, 0, 0, sprite_flappy.width/2, sprite_flappy.height*3);
      pop();
    }
    else {
      push();
      translate(this.x, this.y);
      rotate(radians(this.angle));
      image(sprite_flappy, 0, 0, sprite_flappy.width*1.5, sprite_flappy.height*3, sprite_flappy.width/2, 0, sprite_flappy.width/2, sprite_flappy.height*3);
      pop();
    }
  }
  
  update() {
    if(this.falls) {
      if(this.flashAnim > 255) {
        this.flashReturn = true;
      }
      
      if(this.flashReturn) {
        this.flashAnim -= 60;
      }
      else {
        this.flashAnim += 60;
      }
      
      if(this.flashReturn && this.flashAnim === 0) {
        gameover = true;
        menu_gameover.easein();
        try {
          sound_die.play();
        }
        catch(e) {}
        
        if(score > hightscore) {
          hightscore = score;
        }
      }
      
      this.y += this.velocityY;
      this.velocityY += 0.4;
      this.angle += 4;
      
      if(speed > 0) {
        speed = 0;
      }
      
      if(this.angle > 90) {
        this.angle = 90;
      }
    }
    else {
      this.y += this.velocityY;
      this.angle += 2.5;
    
      if(this.angle > 90) {
        this.angle = 90;
      }
    
      if(mousePressEvent || (keyPressEvent && key == ' ') ) {
        try {
          sound_wing.play();
        }
        catch(e) {}
        
        this.velocityY = 0;
        this.fly = true;
        this.target = clamp(this.y - 60, -19, height);
        this.angle = -45;
      }
    
    
      if(this.y < this.target) {
        this.fly = false;
        this.target = 10000;
      }
    
    
      if(!this.fly) {
        this.velocityY += 0.4;
      }
      else {
        this.y -= 5;
      }
      
      if(this.y > height-49) {
        if(!flappy_bird.falls) {
          try {
            sound_hit.play();
          }
          catch(e) {}
        }
        this.falls = true;
      }
    }
    this.y = clamp(this.y, -20, height-50);
  }
  
  kinematicMove() {
    if(gameover) {
      this.x = width/2;
      this.y = height/2;
      
      gameover = false;
      score = 0;
      gap = 90;
    }
    
    this.y = height/2 + map(sin(frameCount*0.1), 0, 1, -2, 2);

    push();
    translate(this.x,this.y);
    image(sprite_flappy, 0, 0, sprite_flappy.width*1.5, sprite_flappy.height*3, 0, 0, sprite_flappy.width/2, sprite_flappy.height*3);
    pop();
  }
}
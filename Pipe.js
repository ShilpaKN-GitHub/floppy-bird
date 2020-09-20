class Pipe {
  constructor() {
    this.gapSize = gap;
    this.y = random(150, height-150);
    this.x = width + 50;
    this.potential = true;
  }
  
  display() {
    push();
    translate(this.x, this.y+this.gapSize+sprite_pipe.height/2/2);
    image(sprite_pipe, 0, 0, sprite_pipe.width/2, sprite_pipe.height/2);
    pop();
    
    push();
    translate(this.x, this.y-this.gapSize-sprite_pipe.height/2/2);
    rotate(radians(180));
    scale(-1, 1);
    image(sprite_pipe, 0, 0, sprite_pipe.width/2, sprite_pipe.height/2);
    pop();
    
    //Score
    if(this.potential && (flappy_bird.x > this.x-25 && flappy_bird.x < this.x+25)) {
      score++;
      try {
        sound_point.play();
      }
      catch(e) {}
      
      if(gap > 60) {
        gap--;
      }
      
      this.potential = false;
    }
    
    if(((flappy_bird.x+20 > this.x-25 && flappy_bird.x-20 < this.x+25) && 
        (flappy_bird.y+20 > (this.y-this.gapSize-sprite_pipe.height/2/2)-200 &&
         flappy_bird.y-20 < (this.y-this.gapSize-sprite_pipe.height/2/2)+200)) ||
       ((flappy_bird.x+20 > this.x-25 && flappy_bird.x-20 < this.x+25) && 
        (flappy_bird.y+20 > (this.y+this.gapSize+sprite_pipe.height/2/2)-200 &&
         flappy_bird.y-20 < (this.y+this.gapSize+sprite_pipe.height/2/2)+200)))
    {
      if(!flappy_bird.falls) {
        try {
          sound_hit.play();
        }
        catch(e) {}
      }
      flappy_bird.falls = true;
    }
  }
  
  update() {
    this.x-= speed;
  }
}
class GameOverMenu {
  constructor() {
    this.ease = 0;
    this.easing = false;
    this.open = false;
  }
  
  display() {
    push();
    translate(width/2, height/2);
    scale(this.ease);
      
    stroke(83, 56, 71);
    strokeWeight(2);
    fill(222, 215, 152);
    rect(0, 0, 200, 200);
    
    noStroke();
    fill(83, 56, 71);
    text('by Stephcraft', 0, -50);

    textSize(20);
    strokeWeight(5);
    stroke(83, 56, 71);
    fill(255);
    text('Flappy Bird', 0, -80);

    push();
    textAlign(LEFT, CENTER);
    textSize(12);
    noStroke();
    fill(83, 56, 71);
    text('score : ', -80, 0);
    text('hightscore : ', -80, 30);
      
    stroke(0);
    strokeWeight(3);
    fill(255);
    text(score, 20, 0);
    text(hightscore, 20, 30);
    pop();
      
    if(press('restart', 0, 140, width/2, height/2)) { 
      resetGame();
    }
      
    if(press(' menu ', 0, 190, width/2, height/2)) {
      page = 'MENU';
    }
    pop();
  }
  
  update() {
    if(this.easing) {
      this.ease += 0.1;
      if(this.ease > 1) {
        this.open = true;
        this.ease = 1;
        this.easing = false;
      }
    }
  }
  
  easein() {
    this.easing = true;
  }
}
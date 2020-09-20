function mousePressed() {
  mousePress = true;
  mousePressEvent = true;
}

function mouseReleased() {
  mousePress = false;
  mouseReleaseEvent = true;
}

function keyPressed() {
  keyPress = true;
  keyPressEvent = true;
}

function keyReleased() {
  keyPress = false;
  keyReleaseEvent = true;
}

function clamp(value, min, max) {
  if(value < min) {
    value = min;
  }
  if(value > max) {
    value = max;
  }
  
  return value;
}

function smoothMove(pos, target, speed) {
	return pos + (target-pos) * speed;
}
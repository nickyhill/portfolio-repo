/*
The logo consists of the first letter of my first and last name. The colors were choosen as blue as it is one of my favorite colors and the marron represents Virginia Tech. 

The intial movement is suppose to draw the individuals eye right away. The spin is then suppose to disorient the viewer to further bring their attention to the logo incase they missed it. The abrupt stop after one spin is to give the viewer relief from the disorientating spin and they will now be fixated on the logo at the center. 
*/



class Letter{
  constructor(a){
    this.x = 0;
    this.y = 0;
    this.angleOfRotation = 0;
    this.letter = a;
    this.transition = true;
   
  }
  
  draw(){

    if(this.letter === "H"){
      // Drawing the letter "H" as in Hillengas

      fill(134, 31, 65); // Chicago maroon: Exact RGB as described by Virginia Tech (https://brand.vt.edu/identity/color.html)
      noStroke();
      rect(this.x + 14, this.y, 14, 82, 15); // Left up and down line
      rect(this.x + 42, this.y, 70, 14, 15); // The horizontal line 
      rect(this.x + 70, this.y, 14, 82, 15); // Right up and down line
    }
    
    else if(this.letter === "N"){
      rotate(this.angleOfRotation); 
   
    

      // Drawing the letter "N" as in Nicholas
      fill(0, 0, 255); // Blue
      noStroke();
      rect(this.x-70, this.y, 14, 84, 15); // Left up and down line

      // Diagonal line for N
      push();
      translate(this.x-42, this.y);
      rotate(-0.21 * PI);
      rect(0, 0, 14, 100, 15);
      pop();

      rect(this.x-14, this.y, 14, 84, 15); // Right up and down line
    }
    
  }
  /*
  Move individual letters 
  */
  move(){
    
    if(!this.transition && (this.x == -85 || this.x == 85)){
       intials.startSpin = true;
    }
    else{
        
      if(this.letter === "H"&& !intials.stopSpin){

        if(this.x > 200 ){
          this.x = -277;
          this.transition = false;
      }        
      this.x += 2;

        
      }else if(this.letter == "N"&& !intials.stopSpin){
          
          if(this.x < -200){
            this.x = 277;
            this.transition = false;

          } 
           this.x -= 2;
        }
    }

  }
}


class Initials{
  
  //Intialize Start location
  constructor(x, y, l){
    this.x = x;
    this.y = y;
    this.oneMovement = true;
    this.enteredSpin = false;
    this.stopSpin = false;
    this.angleOfRotation = 0; 
    this.startClicked = false;
    this.startSpin = false;
    
    this.threeDegRadian = 0.0523599 / 2;
    
    this.N = new Letter("N");
    this.H = new Letter("H");
    
  }
  
/*
Display draws the intials on to the canvas.
*/
  display() {
      
    push();
    
    translate(this.x, this.y); // Set new origin to center for all rotations will be about the intials center
    
    if(this.startSpin && !this.stopSpin){
      
      if(this.angleOfRotation > PI - 0.1){
         this.startSpin = false;
         this.H.x = 0;
         this.N.x = 0;
         this.stopSpin = true;
       }else{
        this.angleOfRotation += this.threeDegRadian;
        rotate(this.angleOfRotation);
       }
    }
    
    
    this.H.draw();
    this.N.draw();
    
  
    pop();

  }

/*
  Move increments the x and y coordinate, unless the intials have returned to center then it sets the movement flag and the spin flag to true. This then begins a singular spin.
*/
  move(){
    
    if(!this.enteredSpin){
      this.y += 2;
      this.x += 2;
    }


    if(this.y > 442 && this.x > 477.5 && this.oneMovement){
      this.y = -84;
      this.x = -84;
      this.oneMovement = false;
    }else if(this.y > 199 && this.x > 199 && !this.oneMovement){
      this.N.move();
      this.H.move();
      this.enteredSpin = true;
    } 
  }



}


class StartButton{
  constructor(){
    fill(255);
    stroke(0);
    rect(200, 350, 120, 40, 15);
    fill(0);
    textSize(18);
    textAlign(CENTER, CENTER);
    text("Start", 200 , 350);
  }
  
} // StartButton

class GunObj{
  constructor(){
    this.y = 385;
    this.x = 200;
  }
  
  display(){
    
    fill(255);
    stroke(0);
    
    push();
    translate(this.x, this.y);
    rotate(-PI/4);
    rect(0, 2, 4, 20, 15);
    pop()
    rect(this.x, this.y, 6, 22, 2);
    fill(220);
    noStroke();
    rect(this.x - 6.5, this.y, 6, 22);
      
    stroke(0);
    
    arc(this.x + 3, this.y, 6, 6,  -PI/2, PI/ 4, PIE);
  }
  
  move() {
    if (keyArray[65] === 1 && this.x > 6) { // Go left
      this.x -= 3;
    }
    if (keyArray[68] === 1 && this.x < 388) { // Go right
      this.x += 3;
    }
  }

  
} // GunObj



class bulletObj {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.fire = 0;
  }
  
  
  draw() {
    fill(255, 0, 0);
    ellipse(this.x, this.y, 2, 6);
    this.y -= 5;
    if (this.y < 0) {
      this.fire = 0;
    }
    for (var i=0; i<invaders.length; i++) { // Collision with invader
      if ((invaders[i].dead === false) && (dist(this.x, this.y, invaders[i].x, invaders[i].y) < 8)) {
        invaders[i].dead = true;
        invadersAlive--;
        this.fire = 0;
      }
    }
  }
} // bulletObj


class bombObj {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.dropped = 0;
  }
  draw() {
    
    
    fill(43, 21, 21);
    ellipse(this.x, this.y, 5, 8);
    rect(this.x, this.y - 6, 6, 3);
    
    this.y++;
    if (this.y > 400) {
    this.dropped = 0;
    }
    
    for(var i = 0; i < invaders.length; i++){
      if(invaders[i].x > this.x - 2 && invaders[i].x < this.x + 2 && !invaders[i].dead){
         if(invaders[i].y > this.y - 2 && invaders[i].y < this.y + 2){
           this.dropped = 0;
          }
        } 
      }
    
    if (this.y > 372) {
      if (this.x > (gunObj.x-3) && this.x < (gunObj.x+6)) {
      gameOver.gameover = true;
      }
    }
    
  }
} // bombObj


class SpaceInvaderObj{
  constructor(){
    this.x = random(330, 0);
    this.y = random(330, 0);
    this.xDir = random([-1, 1]);
    this.yDir = random([-1, 1]);
    this.speed = random(1, 2);
    this.dead = false;
  }
  
  display(){
    if(!this.dead){      
      fill(0,255,0);
      quad(this.x + 3, this.y - 3, this.x - 3, this.y-3, this.x - 6, this.y + 3, this.x + 6, this.y + 3);
      fill(220);
      stroke(0);
      square(this.x-2, this.y, 1.5);
      square(this.x+2, this.y, 1.5);
      fill(0,255,0);
      triangle(this.x-6, this.y+3, this.x, this.y+3, this.x-6, this.y+6);
      triangle(this.x+6, this.y+3, this.x, this.y+3, this.x+6, this.y+6);
      
    }
  }
  
  // Flip direction on border contact 
  move(){
    if(this.x > 390 || this.x < 10){
       this.xDir *= -1;
     }
    if(this.y > 390 || this.y < 10){
       this.yDir *= -1;
       }
    this.x += 1 * this.xDir;
    this.y += 1 * this.yDir;
  }
  
} // SpaceInvaderObj


class GameOver{
  constructor(){
    this.won = false;
    this.gameover = false;
  }
  display(){
    
    if(endOfGame){
      background(220);
      endOfGame = false;
    }
    
    
    if(invadersAlive == 0){
      
      if(frameCount % 60 == 0){ // Random color for "You win" ever 60 frames.
        fill(random(0, 255), random(0, 255), random(0, 255));
        textAlign(CENTER);
        textSize(36);
        text("You Win!!", 200, 200);
      }
    }
    else{
      fill(255, 0, 0);
      textAlign(CENTER);
      textSize(36);
      text("Game Over", 200, 200);
    }
  }
} // GameOver



function keyPressed() {
  keyArray[keyCode] = 1;
} // func keyreleased
function keyReleased() {
  keyArray[keyCode] = 0;
} // func keyReleased

function mouseClicked(){
    if(mouseX < 260 && mouseX > 140  ){
      if(mouseY < 370 && mouseY > 330){
        intials.startClicked = true;
    }
  }
} // func mouseClicked

function checkFire() {
  if (keyArray[32] === 1) {
    if (currFrameCount < (frameCount - 10)) {
      currFrameCount = frameCount;
      bullets[bulletIndex].fire = 1;
      bullets[bulletIndex].x = gunObj.x;
      bullets[bulletIndex].y = 370;
      bulletIndex++;
      if (bulletIndex > bullets.length - 1) {
        bulletIndex = 0;
      }
    }
  }
} // func checkFire


// Collision detection using a four point hit box on the Invaders
function checkInvadersCollision(invader){
  for(var i = 0; i < invader.length; i++){
    if(!invader[i].dead){
      if(invader[i].x + 6 > gunObj.x - 3 && invader[i].x + 6 < gunObj.x + 6){ // bottom right point
         if(invader[i].y + 9 > gunObj.y - 3 && invader[i].y + 9 < gunObj.y + 6){
            return true;
         }
      } 
      if(invader[i].x + 6 > gunObj.x - 3 && invader[i].x + 6 < gunObj.x + 6){ // top right point
         if(invader[i].y -3 > gunObj.y - 3 && invader[i].y -3 < gunObj.y + 6){
            return true;
         }
      }

      if(invader[i].x - 6 > gunObj.x - 3 && invader[i].x - 6 < gunObj.x + 6){ // top left point
         if(invader[i].y - 3 > gunObj.y - 3 && invader[i].y -3 < gunObj.y + 6){
            return true;
         }
      }

      if(invader[i].x - 6 > gunObj.x - 3 && invader[i].x - 6 < gunObj.x + 6){ // bottom left point
         if(invader[i].y + 9 > gunObj.y - 3 && invader[i].y + 9 < gunObj.y + 6){
            return true;
         }
      }

    }
    
  }
  return false;
} // func checkInvadersCollision


// Check how many invaders are left and thus whether a winning condition was meet
function checkInvaders(alive) {
  
  for(var i = 0; i < invadersAlive; i++){
    if(alive[i].dead == true){
      print(alive[i].dead)
       invadersAlive--;
    }
  }
  print(invadersAlive);
  if(invadersAlive == 0){
    gameOver.won = true;
    return true;
  }
  return false;
} // func checkInvaders














// Setup Function and Draw loop



var endOfGame = true;
var intials = new Initials(200, 200);
var gunObj = new GunObj();
var keyArray = [];
var invaders = [];
var bullets = [];
var bulletIndex = 0;
var bombs = [];
var currFrameCount = 0;
var gameOver = new GameOver();
var invadersAlive;

function setup() {
  createCanvas(400, 400);
  rectMode(CENTER); // Sets rectange x and y based of their center
  
  // Initialize bullets 
  for(var i = 0; i < 8; i++){
    append(bullets, new bulletObj());
  }
  
  // Initialize invaders
  invadersAlive = 15;
  for(var j = 0; j < invadersAlive; j++){
    append(invaders, new SpaceInvaderObj());
    bombs.push(new bombObj());
  }
  
  
}

// Draw loop
function draw() {

  
  
  if(!intials.startClicked){ // Starting screen
    background(220);
    intials.move();
    if(intials.enteredSpin && intials.startSpin){ // Check to see if the first movement is done
      intials.display();   
      intials.angleOfRotation += intials.threeDegRadian;
    }else if(intials.enteredSpin && intials.stopSpin){
      intials.display();  
      var startButton = new StartButton();
    }
    else{
      intials.display();
    }
    
    
  }
  else if(invadersAlive == 0 || checkInvadersCollision(invaders) || gameOver.gameover){ // Gameover conditions
   
    gameOver.display();
  }
  else{ // Displaying the game images and movement 
    background(220);
    gunObj.display();
    gunObj.move();
    checkFire();
    for (i =0; i<bullets.length; i++) {
      if (bullets[i].fire === 1) {
        bullets[i].draw();
      }
    }
    for (i =0; i<invaders.length; i++) { // Display and move invaders in addition to checking their bombs to draw.
      invaders[i].display();
      invaders[i].move();
      if (bombs[i].dropped === 1 && !invaders[i].dead) {
        bombs[i].draw();
      }
      else {
        if (random(0, 10000) < 3 && invaders[i].y < 200) {
          bombs[i].dropped = 1;
          bombs[i].x = invaders[i].x;
          bombs[i].y = invaders[i].y + 14;
        }
      }
    }

  }
  
  
  
  
}
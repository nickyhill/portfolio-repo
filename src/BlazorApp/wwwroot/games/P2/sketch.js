/*
Large tile map 1000 x 1000 pixels. Ghosts wander around and randomly change directions every 5 seconds. When a ghost is with in 150 pixels of the pacman they start to chase. 

To win collect all diamonds.
*/


class pacmanObj {
  constructor(x, y, s) {
    this.x = x;
    this.y = y;
    this.speed = s;
  }
  draw() {
    fill(119, 0, 255);
    noStroke();
    arc(this.x + 490, this.y + 510, 20, 20, PI/4, -PI/4, PIE);
    
    this.y -= this.speed;
  }
  // Movement based of arrow keys however the pacman doesnt move but the tilemap.
  move() {
    if (keyIsDown(LEFT_ARROW)) {
      game.xCor += 1;
      this.x = -1 * game.xCor;
    }
    else if (keyIsDown(RIGHT_ARROW)) {
      game.xCor -= 1;
      this.x = -1 * game.xCor;
    }
    else if (keyIsDown(UP_ARROW)) {
      game.yCor += 1;
      this.y = -1 * game.yCor;
    }
    else if (keyIsDown(DOWN_ARROW)) {
      game.yCor -= 1;
      this.y = -1 * game.yCor;
    }
  }
  
  //Collision check
  checkCollision() {
    for (var i=0; i<game.objects.length; i++) {
      if (dist(this.x+490, this.y+510, game.objects[i].x, game.objects[i].y) < 15) {
        if (game.objects[i].obj === 2) {
          if(!game.collectedDiamonds.includes(game.objects[i].location)){ // check if the diamond has already been collected
            if (game.currFrame < (frameCount - 50)) {
              game.score++;
              game.collectedDiamonds.push(game.objects[i].location);
              game.currFrame = frameCount;
            }
          }
        }
        else if (game.objects[i].obj === 1 ) {
          if (keyIsDown(LEFT_ARROW)) {
            game.xCor -= 1 * 25;
            this.x = -1 * game.xCor;
          }
          else if (keyIsDown(RIGHT_ARROW)) {
            game.xCor += 1 * 25;
            this.x = -1 * game.xCor;
          }
          else if (keyIsDown(UP_ARROW)) {
            game.yCor -= 1 * 25;
            this.y = -1 * game.yCor;
          }
          else if (keyIsDown(DOWN_ARROW)) {
            game.yCor += 1 * 25;
            this.y = -1 * game.yCor;
          }
        }
      }
    }
  }
} // pacmanObj

class ghostObj{
  constructor (x, y) {
    this.x = x;
    this.y = y;
    this.w = 300; // 60fps = wandering for 5 secs then change direction
    this.speed = 0.5;
    this.xDir = random([-0.5, 0.5]); 
    this.yDir = random([-0.5, 0.5]); 
    this.dead = false;
    
    this.ghostColor = random([[255,0,0], [255, 184, 255], [100, 100, 255],  [255, 184, 82]]);
    
  }
  
  draw(){
    if(!this.dead){ // Only draw the alive ghosts
      fill(this.ghostColor)
      noStroke();
      circle(this.x, this.y, 10);
      rect(this.x, this.y + 3, 10, 4);
      triangle(this.x - 5, this.y + 5, this.x - 5, this.y + 10, this.x - 1, this.y + 2);
      triangle(this.x - 2, this.y + 4, this.x, this.y + 9, this.x +2, this.y + 2);
      triangle(this.x + 2, this.y + 5, this.x + 5, this.y + 10, this.x + 5, this.y + 2);
      fill(255);
      circle(this.x - 2, this.y, 2);
      circle(this.x + 2, this.y, 2);
      fill(0, 0, 255);
      circle(this.x - 2 + 0.5, this.y+0.5, 1);
      circle(this.x + 2 + 0.5, this.y+0.5, 1);
    }
  }
  
  move(){
    // Wandering logic
    this.w--;
    if(this.w === 0){
      this.w = 300;
      this.xDir = random([-1, 1]); 
      this.yDir = random([-1, 1]);
    }
    
    
    // Chasing logic
    var distToPac = dist(this.x, this.y, pacman.x+490, pacman.y+510);
    if(distToPac <= 150){
      const angle = atan2(pacman.y + 510 - this.y, pacman.x+490 - this.x); // Angle to pacman
      this.xDir = cos(angle); // Use the angle to get the x and y components
      this.yDir = sin(angle);
      
    }
    
      this.x += this.xDir * this.speed;
      this.y += this.yDir * this.speed;
    
  }
  
  // Check ghosts collision with walls/borders/pacman/diamonds
  checkCollision(){
    for (var i=0; i<game.objects.length; i++) {
      if (dist(this.x, this.y, game.objects[i].x, game.objects[i].y) < 14) { // diamond and terrain collision
       if (game.objects[i].obj === 1) { // Wall/borders
         
          // angle at which collision occured
          var angle = atan2(game.objects[i].y - this.y, game.objects[i].x - this.x);

          this.xDir = cos(angle);
          this.yDir = sin(angle);

         //normalize 
          var length = sqrt(this.xDir * this.xDir + this.yDir * this.yDir);
          this.xDir /= length;
          this.yDir /= length;
         
         
          this.x -= this.xDir * 15;
          this.y -= this.yDir * 15;

    
        }else if(game.objects[i].obj === 2){ // Diamond
          if(!game.collectedDiamonds.includes(game.objects[i].location)){
            this.dead = true;
          }
        }
      }
    }
    if(dist(pacman.x+490, pacman.y+510, this.x, this.y) < 12 && !this.dead){ // check pacman collision
       game.gameOver = 1;
    }
    
    
    
  }
  
} // ghostObj


function customChar() {
  background(0, 255, 208);
  noStroke();
  
  
  // Rock/Wall
  fill(128,128,128); 
  rect(0, 0, 400, 400);
  noStroke();
  fill(0, 255, 208);
  rect(0,0,100,100);
  rect(350,0,50,50);
  rect(0,350,50,50);
  rect(350,350,50,50);
  fill(138,138,138);
  rect(40, 40, 70, 70);
  rect(170, 250, 80, 80);
  rect(5, 295, 50, 50);
  rect(300, 150, 25, 25);
  game.images.push(get(0,0,width,height));

  background(0, 255, 208);
  // Diamond
  fill(0, 255, 208); // set background of the custom char
  rect(0, 0, 400, 400);
  fill(0,255,255);
  triangle(50, 150, 200, 0, 350, 150);
  fill(0,205,225);
  triangle(50, 150, 200, 400, 350, 150);
  fill(0, 100, 150);
  triangle(200, 400, 50, 150, 0, 150);
  triangle(200, 400, 350, 150, 400, 150);
  fill(0, 230, 255);
  triangle(0, 150, 50, 150, 125, 0);
  fill(0, 100, 150);
  triangle(50, 150, 200, 0, 125, 0);
  fill(0, 100, 150);
  triangle(350, 150, 200, 0, 275, 0);
  fill(0, 230, 255);
  triangle(350, 150, 400, 150, 275, 0);
  game.images.push(get(0,0,width,height));
  
  // Border
  fill(0, 255, 208); // set background of the custom char
  rect(0, 0, 400, 400);
  fill(150, 105, 25);
  rect(0, 0, 400 ,400);
  fill(180, 105, 25);
  rect(75, 100, 50 ,50);
  rect(275, 150, 50 ,50);
  rect(70, 325, 50 ,50);
  fill(100, 255, 100);
  rect(0 ,0 , 400, 75);
  fill(100, 200, 100);
  rect(20, 15 , 10, 10);
  rect(320, 20 , 15, 15);
  rect(190, 30 , 15, 15);
  fill(255);
  rect(0, 0, 400, 4);
  game.images.push(get(0,0,width,height));
  
}



// objectObj is for the objects in the tilemap
class objectObj {
constructor(x, y, o, l) {
    this.x = x;
    this.y = y;
    this.obj = o;
    this.location = l;
  }
} // objectObj


// gameObj houses the tile map and the methos to draw the map
class gameObj {
  constructor() {
  this.tilemap = [
  "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",
  "r                                                r",
  "r                                                r",
  "r                           c                    r",
  "r                                                r",
  "r                  g                     g       r",
  "r      c                                         r",
  "r                                                r",
  "r           w                                    r",
  "r    c                                           r",
  "r                                       c        r",
  "r                         w                      r",
  "r              g                                 r",
  "r                                 g              r",
  "r                                                r",
  "r      c                                         r",
  "r                                                r",
  "r    g                                           r",
  "r                c      w                        r",
  "r                                       w        r",
  "r                                                r",
  "r                        c                 g     r",
  "r                                                r",
  "r          c                                     r",
  "r                                      c         r",
  "r        w                                       r",
  "r                      c                         r",
  "r                               c                r",
  "r                                                r",
  "r                                       g        r",
  "r       c                                        r",
  "r                                                r",
  "r                                                r",
  "r          w         c                           r",
  "r                                                r",
  "r                                                r",
  "r     c                                w  c      r",
  "r              c         w                       r",
  "r                                                r",
  "r                               c                r",
  "r              g                                 r",
  "r                  c                             r",
  "r                                g               r",
  "r         w                             g        r",
  "r                                                r",
  "r            c                                   r",
  "r        g                                       r",
  "r                                         w      r",
  "r            g                                   r",
  "r                                    c           r",
  "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr"];
    
  this.gameOver = -1;
  this.score = 0;
  this.currFrame = 0;
  this.yCor = 0;
  this.xCor = 0;
  this.objects = [];
  this.collectedDiamonds = [];
  this.ghostSetup = true;
  this.images = [];
  } // gameObj constructor
  initialize() {
    for (var i=0; i<this.tilemap.length; i++) {
      for (var j = 0; j < this.tilemap[i].length; j++) {
      switch (this.tilemap[i][j]) {
        case 'w': 
            this.objects.push(new objectObj(j*20+10, i*20+10, 1, i*50+j));
        break;
        case 'r':
            this.objects.push(new objectObj(j*20+10, i*20+10, 1, i*50+j));
        break;
        case 'g':
            ghosts.push(new ghostObj(j*20 + 10, i*20 + 17));
        break;
        case 'c': 
            this.objects.push(new objectObj(j*20+10,i*20+10, 2, i*50+j));
        break;
        }
      }
    }
  }
    drawBackground() {
    
        for (var i = 0; i < this.tilemap.length; i++) {
          for (var j = 0; j < this.tilemap[i].length; j++) {
            switch (this.tilemap[i][j]) {
              case 'w':
                image(game.images[0], j * 20, i * 20, 20, 20);
                break;
              case 'r':
                image(game.images[2], j * 20, i * 20, 20, 20);
                break;
              case 'c':
                if(!game.collectedDiamonds.includes(i*50 + j)){ // Only draw the diamonds that havent been collected.
                  image(game.images[1], j * 20, i * 20, 20, 20);
                }
                break;
            }
          }
        }
      }
} // gameObj


var game;
var pacman;
var diamond;

function setup() {
  createCanvas(400,400);
  
  game = new gameObj();
  pacman = new pacmanObj(0, 0, 0);
  customChar();
  rectMode(CENTER);
  ghosts = [];
  game.initialize();
  game.gameOver = 0;
}


// Main game loop
function draw() {
  if (game.gameOver === -1) {
    game.initialize();
    game.gameOver = 0;
  }
  else if (game.gameOver === 0) {
    
    if(game.collectedDiamonds.length === 20){ // Winning condition
      game.gameOver = 3;
    }
    
    
    background(0, 255, 208);
    push();
    translate(game.xCor-290, game.yCor-310);
    game.drawBackground();
    pacman.draw();
    pacman.move();
    pacman.checkCollision();
    for(var i = 0; i < ghosts.length; i ++){
      ghosts[i].draw();
      ghosts[i].move();
      ghosts[i].checkCollision();
    }
    
    pop();
    fill(255, 0, 0);
    text(game.score, 350, 10);
    
  }else if(game.gameOver === 3){
    fill(255, 200, 255);
    textSize(40); 
    textAlign(CENTER);
    text("You Win", 200, 200);
  }
  else {
    fill(255, 0, 0);
    textSize(40);
    text("Game Over", 100, 200);
  }
}
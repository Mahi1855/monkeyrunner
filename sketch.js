var  PLAY = 1
 var END = 0
var gameState= PLAY
var monkey,monkeyrunning;
var ground, invisibleGround;

var BananaGroup, BananaImage,gameState,END,PLAY;
var obstaclesGroup, obstacleimg,groundimg;

var score;


function preload(){
  
  monkeyrunning = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
BananaImage = loadImage("banana.png")
  obstacleimg = loadImage("stone.png")
  groundimg = loadImage("jungle.jpg")
 
}

function setup() {
  createCanvas(600, 200);
  
  monkey = createSprite(50,180);
  monkey.addAnimation("running", monkeyrunning);
  monkey.scale = 0.1;
  

  
  ground = createSprite(300,190,1200,20);
 
  BananaGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  background("skyblue");
  if (gameState === "PLAY"){
    spawnBanana();
  spawnObstacles();
  if(keyDown("space")) {
    monkey.velocityY = -10;
  }
 
  monkey.velocityY = monkey.velocityY + 0.6
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
if(obstaclesGroup.isTouching(monkey)){
  gameState=END;
}
  
 
}
if(gameState ===END){
  monkey.velocityY = 0;
obstaclesGroup.setVelocityXEach(0);
BananaGroup.setVelocityXEach(0);  
 obstaclesGroup.setLifetimeEach(-1);
    BananaGroup.setLifetimeEach(-1); 
    text("GameOver!", 200,200)
  
  
}
monkey.collide(ground);
 drawSprites();
}

function spawnBanana() {
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage("img4",BananaImage);
    banana.scale = 0.05;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    BananaGroup.add(banana);
  }
  
}

function spawnObstacles() {
  if(frameCount % 120 === 0) {
    var obstacle = createSprite(600,165);
    obstacle.addImage("img3",obstacleimg)
    obstacle.velocityX = -4; 
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}
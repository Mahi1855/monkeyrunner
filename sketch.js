var monkey1
var gameState = "play"
var monkey,monkeyrunning;
var ground, invisibleGround,gameover,gameoverimg,monkey_collided;

var BananaGroup, BananaImage,gameState,END,PLAY;
var obstaclesGroup, obstacleimg,groundimg,scene,sceneimg;

var score;


function preload(){
  
  monkeyrunning = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
BananaImage = loadImage("banana.png")
  obstacleimg = loadImage("stone.png")
  groundimg = loadImage("jungle.jpg")
  gameoverimg = loadImage("game_over_PNG57.png")
  sceneimg = loadImage("jungle.jpg")
  monkey_collided = loadImage("Monkey_03.png")
}

function setup() {
 createCanvas(600,400);
  scene = createSprite(200,20)
  scene.addImage(sceneimg)
  scene.scale = 1.4
  
  monkey = createSprite(50,380);
  monkey.addAnimation("running", monkeyrunning);
  monkey.scale = 0.1;
  
  monkey1 = createSprite(50,360);
  monkey1.addImage(monkey_collided);
  monkey1.scale = 0.1;
  monkey1.visible =false
  gameover = createSprite(300,100)
  gameover.addImage("img43",gameoverimg)
  gameover.scale = .1
  gameover.visible=false
  ground = createSprite(300,390,1200,20);
  ground.visible = false
  BananaGroup = new Group();
  obstaclesGroup = new Group();
  scene.velocityX = -2
  score = 0;
}

function draw() {
  background("skyblue");
   drawSprites();
  fill("red")
  textSize(15)
  text("Score:" + score,300,20)
  
  if (gameState === "play"){
    spawnBanana();
  spawnObstacles();
  if(keyDown("space") && monkey.y >= 349.3) {
    monkey.velocityY = -10;
  }
 console.log(monkey.y)
  monkey.velocityY = monkey.velocityY + 0.4
      if(BananaGroup.isTouching(monkey)){
      BananaGroup.destroyEach()
      score =score +1
    }
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
    if (scene.x < 10){
    scene.x = scene.width/2;
  }
  if (obstaclesGroup.isTouching(monkey)){
    gameState = "end"
   
  }

  }
if(gameState === "end") {
monkey.velocityY = 0;
obstaclesGroup.setVelocityXEach(0);
BananaGroup.setVelocityXEach(0);  
 obstaclesGroup.setLifetimeEach(-1);
    BananaGroup.setLifetimeEach(-1); 
    gameover.visible=true
   scene.velocityX = 0
 monkey.visible=false
  monkey1.visible=true
}
monkey.collide(ground);

  
 
}

 
  
   




function spawnBanana() {
  if (frameCount % 200 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(290,350));
    banana.addImage("img4",BananaImage);
    banana.scale = 0.05;
    banana.velocityX = -6;
    
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
    var obstacle = createSprite(600,365);
    obstacle.addImage("img3",obstacleimg)
    obstacle.velocityX = -4; 
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}
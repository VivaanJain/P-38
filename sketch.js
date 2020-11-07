var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var CloudsGroup, cloudImage;
var ObstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var count = 0;
var gameOver, restart, gameOverImg, restartImg;
var Play = 1;
var End = 0; 
var gameState = Play;
localStorage["highestScore"] = 0;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,170,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,30);
  ground.addImage("ground",groundImage);

  
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  CloudsGroup = new Group();
  ObstaclesGroup = new Group();
  
  score = 0;
  
  gameOver = createSprite(300,55,20,20);
  restart = createSprite(300,100,10,10);

  gameOver.addImage(gameOverImg);
  restart.addImage(restartImg);

  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  gameOver.visible = false;
  restart.visible = false;
  
  gameState = Play;
  
  Play = 1
  End = 0

}

function draw() {
  background(180);
  
  if(gameState === Play)
  {
  if(World.frameCount % 5 === 0){
    count.visible = true;
    count = count +1;
  }
  
  if(keyDown("space")) 
  {
    trex.velocityY = -15;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0)
  {
    ground.x = ground.width/2;
  }
  
  trex.collide(invisibleGround);
    
  spawnClouds();
  spawnObstacles();
    if(trex.y>280&&keyDown("space")){
      trex.velocityY=0;
    }
  
    
    if(ObstaclesGroup.isTouching(trex))
    {
      gameState = End;
    }
}
  
  else if(gameState === End)
  {
   gameOver.visible = true;
   restart.visible = true;
    
    trex.changeAnimation(trex_collided);
    
    ground.velocityX = 0;
    trex.velocityX = 0;
    
    ObstaclesGroup.setVelocityEach(0);
    CloudsGroup.setVelocityEach(0);
    
    ObstaclesGroup.destroyEach();
    CloudsGroup.destroyEach();
    
    if(mousePressedOver(restart))
    {
    reset();
    }

    text("Score : " + count, 500,50);
    trex.collide(invisibleGround);
    
  }
  if(count === 5){
    
    fill("red");
    textSize(20)
    text("Good Job! Your High Score is "+localStorage["highestScore"],160,100);
    gameOver.visible = false;
    restart.visible = false;

    ground.velocityX = 0;
    trex.velocityX = 0;
    obstaclesGroup.destroyEach();
    cloudsGroup.destroyEach();
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    count= 0;
  }
  
  drawSprites();

}

function reset()
{
  gameState = Play;
  restart.visible = false;
  gameOver.visible = false;
  CloudsGroup.destroyEach();
  ObstaclesGroup.destroyEach();
  count = 0;
  trex.changeAnimation("running", trex_running);
  if(localStorage["highestScore"]<count){
    localStorage["highestScore"] = count;
  }
}

function spawnClouds() {

  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = random(80,120);
                        cloud.addImage("cloud",cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     
    cloud.lifetime = 200;
cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
  
                CloudsGroup.add(cloud);
  }
  
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -(6 + 3*count/100);
    
    
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
     
    obstacle.scale = 0.55;
    obstacle.lifetime = 100;

    ObstaclesGroup.add(obstacle);
  }
}
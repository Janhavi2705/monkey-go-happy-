
var monkey , monkey_running;
var banana ,bananaImage, obstacle, oImage;
var FoodGroup, ObstacleGroup;
var survivalTime=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bImage = loadImage("banana.png");
  oImage = loadImage("obstacle.png");
 
}

function setup() {
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;

  ground=createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  
  FoodGroup =  createGroup();
   ObstacleGroup = createGroup();
    //monkey.debug = true;
    //ObstacleGroup.debug = true; 
}


function draw() {
background(255);
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  
  if(keyDown("space")&& monkey.y >= 100) {
    monkey.velocityY = -10;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(ground);
  
   
  
  stroke("white");
  textSize(20);
  fill("white");
  
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time: " + survivalTime,100,50);
  
  
  spawnBanana();
  spawnObstacle();
  
  if(ObstacleGroup.isTouching(monkey)){
    ground.velocityX = 0;
    monkey.velocityX = 0;
    ObstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
  }
  
  //console.log(obstacle);
  
  drawSprites();
}

function spawnBanana() {
  if (frameCount % 200 === 0) {
    var banana = createSprite(380,320,40,10);
    banana.y = Math.round(random(80,140));
    banana.addImage(bImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime = 200;
    
    //adjust the depth
    //banana.depth = monkey.depth;
    //monkey.depth = monkey.depth + 1;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacle() {
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(400,310,40,10);
    //obstacle.y = Math.round(random(80,315));
    obstacle.addImage(oImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -3;
    obstacle.lifetime = 300;
    ObstacleGroup.add(obstacle);
  }
}
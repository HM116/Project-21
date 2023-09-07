var rocket,rocketimg
var asteroid,asteroidimg
var alien,alienimg
var score = 0
var PLAY = 1;
var END = 0;
var gameState=1;
var space,spaceimg
var star,starimg
var asteroidGroup,starGroup,alienGroup



function preload(){
    rocketimg = loadImage("rocket.png");
    spaceimg = loadImage("space.jpg");
    asteroidimg = loadImage("asteroids.png");
    starimg = loadImage("star.png");
    alienimg = loadImage("alien.png");

}

function setup() {
 createCanvas(windowWidth,windowHeight);

 space=createSprite(width/2,200);
 space.addImage(spaceimg);
 space.velocityY = 4;

 rocket = createSprite(width/2,height-20,20,20);
 rocket.addImage(rocketimg);
 rocket.scale = 0.4;

 asteroidGroup= new Group();
 starGroup= new Group();
 alienGroup= new Group();
}

function draw() {
if(gameState === PLAY){
    background(0);
    rocket.x = World.mouseX;

    edges= createEdgeSprites();
    rocket.collide(edges);

    if(space.y > height){
        space.y = height/2;
    }

    createAsters();
    createStars();
    createAliens();
    

    if (starGroup.isTouching(rocket)){
        starGroup.destroyEach();
        score = score + 50;
    }
    else {
        if(asteroidGroup.isTouching(rocket) || alienGroup.isTouching(rocket)){
            gameState=END;

            rocket.x=width/2;
            rocket.y=height/2;
            rocket.scale=0.6;

            asteroidGroup.destroyEach();
            alienGroup.destroyEach();
            starGroup.destroyEach();

            asteroidGroup.setVelocityEach(0);
            starGroup.setVelocityEach(0);
            alienGroup.setVelocityEach(0);
        }
    }

    drawSprites();
    textSize(20);
    fill(255);
    text("Score:  "+score,width-150,30);
}
 
}

function createStars(){
    if(World.frameCount % 200 == 0){
        var star = createSprite(Math.round(random(width),40,10,10))
        star.addImage(starimg);
        star.scale=0.5;
        star.velocityY = 5;
        star.lifetime = 200;
        starGroup.add(star);
    }
}

function createAsters(){
    if (World.frameCount % 530 == 0){
        var asteroid = createSprite(Math.round(random(50,350),40,10,10));
        asteroid.addImage(asteroidimg)
        asteroid.scale=0.25;
        asteroid.velocityY = 4;
        asteroid.lifetime = 200;
        asteroidGroup.add(asteroid);
    }
}

function createAliens(){
    if (World.frameCount % 400 == 0){
        var alien = createSprite(Math.round(random(50,350),40,10,10));
        alien.addImage(alienimg);
        alien.scale=0.3;
        alien.velocityY = 4;
        alien.lifetime = 200;
        alienGroup.add(alien);
    }
}

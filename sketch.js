var Ballon, database;
var position;

function preload(){
 cityImg = loadImage("cityImage.png")
hotairballon = loadAnimation("hotairballoon1.png","hotairballoon2.png","hotairballoon3.png")

}


function setup(){
  database=firebase.database()
  console.log(database);
  createCanvas(1200,600);

  Ballon = createSprite(250,250,10,10);
  Ballon.addAnimation("air",hotairballon)
  Ballon.shapeColor = "red";
  Ballon.scale=0.8
  var ballonposition=database.ref('ballon/height')
  ballonposition.on("value",readPosition,showError)
}

function draw(){
  background(cityImg);
  
    if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
    }
    drawSprites();
  
}

function writePosition(x,y){
 database.ref('ballon/height').set({
   'x':position.x+x,
   'y':position.y+y,
 })
}

function readPosition(data){
 position=data.val()
 Ballon.x=position.x
 Ballon.y=position.y
}

function showError(){
 console.log("error in writtening to the database")

}

/*

The Game Project 7 - Making a complete level

Week 8

*/

var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var realPos;

var isLeft;
var isRight;
var isJumping;
var isFalling;

var clouds = [];
var mountains;
var trees;
var houseXs;

var canyons;

var fallspeed=0.01

var pickups;

var score;

var isWon;

var lives;
var isLost;

var enemies;

var platforms;
var isOnPlatform ;

function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	//score
	score = 0;
	
	//lives
	lives = 3;
	
	startGame()
	
	
}

function draw()
{
	background(100, 155, 255); // fill the sky blue

	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height/4); // draw some green ground

	
	// Draw clouds.

	push()
	translate(scrollPos*0.1, 0)
	drawClouds()
	pop()
	
	// Draw mountains.

	push()
	translate(scrollPos*0.3, 0)
	drawMountains()
	pop()
	
	
	// Draw trees.

	push()
	translate(scrollPos*0.6, 0)
	drawTrees()
	pop()
	
	// Draw houses.

	push()
	translate(scrollPos*0.9, 0)
	drawHouses()
	pop()
	
	// Draw canyons.
	
	push()
	translate(scrollPos, 0)
	for(var x = 0;x<canyons.length;x++){
		drawCanyon(canyons[x])
		checkCanyon(canyons[x])
	}
	pop()
	
	
	//Draw pickup items
	push()
	
	translate(scrollPos, 0)
	for(var x = 0; x <pickups.length;x++){
		drawPickup(pickups[x])
		checkPickup(pickups[x])
	}
	
	pop()
	
	
	
	// Draw enemies
	push()
	
	translate(scrollPos, 0)
	for(var x = 0;x<enemies.length;x++){
		
		enemies[x].display()
		enemies[x].move()
		enemies[x].checkCharCollision()
	}
	pop()
	
	
	//Draw platforms

	push()
	
	translate(scrollPos, 0)
	
	isOnPlatform=false
	for(var x = 0;x<platforms.length;x++){
		
		platforms[x].display()
		platforms[x].checkCharOn()
		
		
	}
	pop()
	

	

	// Draw game character.
	drawGameChar();

	
	// Draw score
	stroke(0)
	strokeWeight(1)
	noFill()
	fill(0)
	textSize(20)
	text("Score: " + score,20,27)
	
	//check won
	checkPlayerWon()
	
	//check die
	checkPlayerDie()
	
	for(var x = 0;x<lives;x++){
		noStroke()
		fill(255,0,0)
		ellipse(25*x+120,20,20,20)
	}
	

	
	if(isLost){
		fill(0)
		textSize(30)
		text("Game over - you lost. Press space to continue.",230,286)
		return
	}
	
	if(isWon){
		fill(0)
		textSize(30)
		text("Game over - you won. Press space to continue.",230,286)
		return
	}
	
	
	
	
	
	
	// Logic to make the game character move or the background scroll.
	if(isLeft)
	{
			if(gameChar_x > width * 0.2)
			{
					gameChar_x -= 5;
			}
			else
			{
					scrollPos += 5;
			}
	}

	if(isRight)
	{
			if(gameChar_x < width * 0.8)
			{
					gameChar_x  += 5;
			}
			else
			{
					scrollPos -= 5; // negative for moving against the background
			}
	}

	// Logic to make the game character rise and fall.
	if(gameChar_y < floorPos_y&&isOnPlatform==false)
	{
//		if(isOnPlatform==false){
//			
			gameChar_y += 2;
			isJumping = true;
//			
//		}
//		
		
		
		
	}
	else
	{
		
			isJumping = false;
	}

	if(isFalling)
	{
			gameChar_y += 5;
			isJumping=true
	}

	// Update real position of gameChar for collision detection.
	realPos = gameChar_x - scrollPos;
}


// ---------------------
// Key control functions
// ---------------------

function keyPressed(){

	
	if(isLost || isWon)
	{
    if(key == ' ')
    {
        nextLevel();
    }
    return;
	}

	if(key == 'A' || keyCode == 37)
	{
			isLeft = true;
	}

	if(key == 'D' || keyCode == 39)
	{
			isRight = true;
	}

	if(key == ' ' || key == 'W')
	{
			if(!isJumping)
			{
					gameChar_y -= 100;
			}
	}
	
	
	
}

function keyReleased(){

	if(key == 'A' || keyCode == 37)
	{
		isLeft = false;
	}

	if(key == 'D' || keyCode == 39)
	{
		isRight = false;
	}

}


// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.

function drawGameChar()
{
	// draw game character
	
	
   //the game character
    if(isLeft && isJumping)
    {	
		
    // add your jumping-left code
	
    strokeWeight(.5)
    //Boots
    stroke(0)
    fill(60)
    rect(gameChar_x-9,gameChar_y-46.2,18,40,5) //boots
    
    //legs
    stroke(0)
    fill(17,53,114)
    rect(gameChar_x-9,gameChar_y-25,18,15) //jeans
    
    //Body
    stroke(0)
    fill(150)
    rect(gameChar_x-9,gameChar_y-55,18,40,5) //body
    noStroke()
    fill(150)
    stroke(0)
    arc(gameChar_x-0.1,gameChar_y-19.3,17.8,10,0,PI) //belt
    noStroke()
    
    //Hands
    stroke(0)
    fill(150)
    
    line(gameChar_x+1.5,gameChar_y-22,gameChar_x-1.3,gameChar_y-19.2)
    //line(236.8,512.9,239.8,507.5) //left line for arm
    arc(gameChar_x-2.3,gameChar_y-22,8,10,4,6.2) //curved line for arm
    
    arc(gameChar_x-3.7,gameChar_y-23.59,10,10,1,2)
    line(gameChar_x-6.1,gameChar_y-19.2,gameChar_x-14,gameChar_y-23.3)
    
    fill(255,205,150)
    ellipse(gameChar_x-10,gameChar_y-25,9,9) //hand
    noStroke()
    
    //Head
    stroke(0)
    fill(180)
    ellipse(gameChar_x-15,gameChar_y-48,10,25) //Front part of hoodie
    fill(150)
    ellipse(gameChar_x,gameChar_y-48,33,38) //Green hoodie ellipse
    fill(255,205,150)
    strokeWeight(1)
    noStroke()
		
    }
    else if(isRight && isJumping)
    {
    // add your jumping-right code

    
    strokeWeight(.5)
    //Boots
    stroke(0)
    fill(60)
    rect(gameChar_x-9,gameChar_y-46.2,18,40,5) //boots
    
    //legs
    stroke(0)
    fill(17,53,114)
    rect(gameChar_x-9,gameChar_y-25,18,15) //jeans
    
    //Body
    stroke(0)
    fill(150)
    rect(gameChar_x-9,gameChar_y-55,18,40,5) //body
    noStroke()
    fill(150)
    stroke(0)
    arc(gameChar_x-0.1,gameChar_y-19.3,17.8,10,0,PI) //belt
    noStroke()
    
    //Hands
    stroke(0)
    fill(150)
    line(gameChar_x-1.5,gameChar_y-21.5,gameChar_x+1.3,gameChar_y-19) //right line for arm 
    arc(gameChar_x+2.5,gameChar_y-22,8,10,3,5.4) //curved line for arm
    
    arc(gameChar_x+3.5,gameChar_y-23.5,10,10,1,2)
    line(gameChar_x+6.1,gameChar_y-19.2,gameChar_x+14,gameChar_y-23.3)
    fill(255,205,150)
    ellipse(gameChar_x+10,gameChar_y-25,9,9) //hand
    noStroke()
    
    //Head
    stroke(0)
    fill(180)
    ellipse(gameChar_x+15,gameChar_y-48,10,25) //Front part of hoodie
    fill(150)
    ellipse(gameChar_x,gameChar_y-48,33,38) //Green hoodie ellipse
    fill(255,205,150)
    strokeWeight(1)
    noStroke()
		
		
					
		
		
    }
    else if(isLeft)
    {
    // add your walking left code
		
    strokeWeight(.5)
    //Boots
    stroke(0)
    fill(60)
    rect(gameChar_x-9,gameChar_y-40,18,40,5) //boots
    
    //legs
    stroke(0)
    fill(17,53,114)
    rect(gameChar_x-9,gameChar_y-20,18,15) //jeans
    
    //Body
    stroke(0)
    fill(150)
    rect(gameChar_x-9,gameChar_y-55,18,40,5) //body
    noStroke()
    fill(150)
    stroke(0)
    arc(gameChar_x+0.5,gameChar_y-19,17,10,0,PI) //belt
    noStroke()
    
    //Hands
    stroke(0)
    fill(255,205,150)
    ellipse(gameChar_x-6,gameChar_y-16,9,9) //hand
    fill(150)
    line(gameChar_x-1.3,gameChar_y-16,gameChar_x+2,gameChar_y-23) //right line for arm 
    line(gameChar_x-8.2,gameChar_y-20.1,gameChar_x-5.2,gameChar_y-25.5) //left line for arm
    arc(gameChar_x-1.9,gameChar_y-22.4,8,10,4,6.2) //curved line for arm
    noStroke()
    
    //Head
    stroke(0)
    fill(180)
    ellipse(gameChar_x-15,gameChar_y-48,10,25) //Front part of hoodie
    fill(150)
    ellipse(gameChar_x,gameChar_y-48,33,38) //Green hoodie ellipse
    fill(255,205,150)
    strokeWeight(1)
    noStroke()
		
		
		
		
		
    }
    else if(isRight)
    {
    // add your walking right code
		
    strokeWeight(.5)
    //Boots
    stroke(0)
    fill(60)
    rect(gameChar_x-9,gameChar_y-40,18,40,5) //boots
    
    //legs
    stroke(0)
    fill(17,53,114)
    rect(gameChar_x-9,gameChar_y-20,18,15) //jeans
    
    //Body
    stroke(0)
    fill(150)
    rect(gameChar_x-9,gameChar_y-55,18,40,5) //body
    noStroke()
    fill(150)
    stroke(0)
    arc(gameChar_x-0.3,gameChar_y-19,17,10,0,PI) //belt
    noStroke()
    
    //Hands
    stroke(0)
    fill(255,205,150)
    ellipse(gameChar_x+6,gameChar_y-16,9,9) //hand
    fill(150)
    line(gameChar_x+1.3,gameChar_y-16,gameChar_x-2,gameChar_y-22.7) //right line for arm 
    line(gameChar_x+8.2,gameChar_y-20.1,gameChar_x+5.2,gameChar_y-25.5) //left line for arm
    arc(gameChar_x+2.1,gameChar_y-22.4,8,10,3,5.4) //curved line for arm
    noStroke()
    
    //Head
    stroke(0)
    fill(180)
    ellipse(gameChar_x+15,gameChar_y-48,10,25) //Front part of hoodie
    fill(150)
    ellipse(gameChar_x,gameChar_y-48,33,38) //Green hoodie ellipse
    fill(255,205,150)
    strokeWeight(1)
    noStroke()
		
		
		
		
		
		

    }
    else if(isJumping || isFalling)
    {
    // add your jumping facing forwards code

    
    strokeWeight(.5)
    //Boots
    stroke(0)
    fill(60)
    rect(gameChar_x-12.5,gameChar_y-47,25,40,5) //boots
    
    //legs
    stroke(0)
    fill(17,53,114)
    rect(gameChar_x-12,gameChar_y-25,24,15) //jeans
    
    //Body
    stroke(0)
    fill(150)
    rect(gameChar_x-12,gameChar_y-55,24,40,5) //body
    noStroke()
    fill(150)
    stroke(0)
    arc(gameChar_x,gameChar_y-19,23,9.8,0,PI) //belt
    arc(gameChar_x+1,gameChar_y-27,40,18,PI,-2.35) //left side arm
    arc(gameChar_x,gameChar_y-27,40,18,-0.78,0) //right side arm
    arc(gameChar_x-6,gameChar_y-22,10,4.2,PI,-2.35) //left seperator
    arc(gameChar_x+7,gameChar_y-22,10,4.2,-0.78,0) //right seperator
    noStroke()
    
    //Hands
    stroke(0)
    fill(255,205,150)
    // ellipse(233,117,9,9) //left hand
    //ellipse(258,117,9,9) //right hand
    
    ellipse(gameChar_x-15,gameChar_y-25,9,9) //left hand
    ellipse(gameChar_x+16,gameChar_y-25,9,9) //right hand
    noStroke()
    
    //Head
    stroke(0)
    fill(150)
    ellipse(gameChar_x,gameChar_y-48,38,38) //Green hoodie ellipse
    fill(180)
    ellipse(gameChar_x,gameChar_y-48,33,33) //Outer hoodie
    fill(255,205,150)
    ellipse(gameChar_x,gameChar_y-48,27,27) //face
    fill(255)
    noStroke()
    ellipse(gameChar_x-6,gameChar_y-48,13,17) //left eye
    ellipse(gameChar_x+6,gameChar_y-48,13,17) //right eye
    fill(0)
    ellipse(gameChar_x-6,gameChar_y-48,3,3) //left pupil
    ellipse(gameChar_x+6,gameChar_y-48,3,3) //right pupil
    strokeWeight(1)
    noStroke()
		
		
		
		
		
		
    }
    else
    {
    // add your standing front facing code

	
    strokeWeight(.5)
    //Boots
    stroke(0)
    fill(60)
    rect(gameChar_x-12,gameChar_y-40,24,40,5) //boots
    
    //legs
    stroke(0)
    fill(17,53,114)
    rect(gameChar_x-12,gameChar_y-20,24,15) //jeans
    
    //Body
    stroke(0)
    fill(150)
    rect(gameChar_x-12,gameChar_y-55,24,40,5) //body
    noStroke()
    fill(150)
    stroke(0)
    arc(gameChar_x,gameChar_y-16,23,15,0,PI) //belt
    //arc(45,116,25,10,0,PI) //belt
    arc(gameChar_x+6,gameChar_y-17,45,70,PI,-2.35) //left side arm
    arc(gameChar_x-5,gameChar_y-17,45,70,-0.78,0) //right side arm
    arc(gameChar_x,gameChar_y-17,15.75,24.5,PI,-2.35) //left seperator
    arc(gameChar_x+1,gameChar_y-17,15.75,24.5,-0.78,0) //right seperator
    noStroke()
    //Hands
    stroke(0)
    fill(255,205,150)
    ellipse(gameChar_x-12,gameChar_y-16,9,9) //left hand
    ellipse(gameChar_x+13,gameChar_y-16,9,9) //right hand
    noStroke()
    
    //Head
    stroke(0)
    fill(150)
    ellipse(gameChar_x,gameChar_y-48,38,38) //Green hoodie ellipse
    fill(180)
    ellipse(gameChar_x,gameChar_y-48,33,33) //Outer hoodie
    fill(255,205,150)
    ellipse(gameChar_x,gameChar_y-48,27,27) //face
    fill(255)
    noStroke()
    ellipse(gameChar_x-6,gameChar_y-48,13,17) //left eye
    ellipse(gameChar_x+6,gameChar_y-48,13,17) //right eye
    fill(0)
    ellipse(gameChar_x-6,gameChar_y-48,3,3) //left pupil
    ellipse(gameChar_x+6,gameChar_y-48,3,3) //right pupil
    strokeWeight(1)
    noStroke()	
		
		
		
    }
	
	
}

// ---------------------------
// Background render functions
// ---------------------------

// Function to draw cloud objects.

	function drawClouds(){
		
		for(var x = 0; x<clouds.length;x++){
			fill(clouds[x].colour,clouds[x].colour,clouds[x].colour,100)
			ellipse(clouds[x].pos_x+40,clouds[x].pos_y+40,clouds[x].size+10,clouds[x].size+10) //faded cloud 1
			fill(clouds[x].colour)
			ellipse(clouds[x].pos_x+40,clouds[x].pos_y+40,clouds[x].size,clouds[x].size); //cloud 1

			fill(clouds[x].colour,clouds[x].colour,clouds[x].colour,100)
			ellipse(clouds[x].pos_x+90,clouds[x].pos_y+40,clouds[x].size+10,clouds[x].size+10); //faded cloud 2
			fill(clouds[x].colour)
			ellipse(clouds[x].pos_x+90,clouds[x].pos_y+40,clouds[x].size,clouds[x].size); //cloud 2

			fill(clouds[x].colour,clouds[x].colour,clouds[x].colour,100)
			ellipse(clouds[x].pos_x+140,clouds[x].pos_y+40,clouds[x].size+10,clouds[x].size+10); //fadedcloud 3
			fill(clouds[x].colour)
			ellipse(clouds[x].pos_x+140,clouds[x].pos_y+40,clouds[x].size,clouds[x].size); //cloud 3
		}
		
	}

// Function to draw mountains objects.

	function drawMountains(){
		
		for(var x = 0;x<mountains.length;x++){

			noStroke();
			fill(90);
			triangle(mountains[x].pos_x+0,432,mountains[x].pos_x+360,432,mountains[x].pos_x+180,mountains[x].height); //mountain triangle
			fill(90);
			//triangle(mountains[x].pos_x+520,248-29,mountains[x].pos_x+555,238-29,mountains[x].pos_x+582,378-29); //right outdent

			fill(100,100,100,100)
			triangle(mountains[x].pos_x+10,432,mountains[x].pos_x+350,432,mountains[x].pos_x+180,mountains[x].height+10)
			fill(110,110,110,100)
			triangle(mountains[x].pos_x+20,432,mountains[x].pos_x+340,432,mountains[x].pos_x+180,mountains[x].height+20)
			fill(120,120,120,100)
			triangle(mountains[x].pos_x+30,432,mountains[x].pos_x+330,432,mountains[x].pos_x+180,mountains[x].height+30)
			fill(130,130,130,100)
			triangle(mountains[x].pos_x+40,432,mountains[x].pos_x+320,432,mountains[x].pos_x+180,mountains[x].height+40)

			strokeWeight(3)
			stroke(70)
			noStroke()
		}
	
	}

// Function to draw trees objects.

	function drawTrees(){
		
		for(var x = 0;x<trees.length;x++){
			noStroke();
			fill(139,69,19);
			quad(trees[x].pos_x+50,432,trees[x].pos_x+100,432,trees[x].pos_x+100,321,trees[x].pos_x+50,321); //trunk
			fill(0,100,0);
			stroke(0)
			strokeWeight(1)
			triangle(trees[x].pos_x-25,355,trees[x].pos_x+175,355,trees[x].pos_x+75,265); //triangle1
			triangle(trees[x].pos_x-5,305,trees[x].pos_x+155,305,trees[x].pos_x+75,195); //triangle2
			triangle(trees[x].pos_x+15,237,trees[x].pos_x+135,237,trees[x].pos_x+75,135); //triangle3

			fill(100,70,30);
			ellipse(trees[x].pos_x+90,370,5,10); //wood circle

			fill(255);
		}
		
	}


// Function to draw houses objects.

	function drawHouses(){
		
		for(var x = 0; x< houseXs.length;x++){
			yPosHouse=0	

			stroke(1);
			strokeWeight(1);
			fill(159,90,25);
			quad(houseXs[x]+8,yPosHouse+432,houseXs[x]+168,yPosHouse+432,houseXs[x]+168,yPosHouse+291,houseXs[x]+8,yPosHouse+291); //house
			fill(100,20,10);
			triangle(houseXs[x]+1,yPosHouse+291,houseXs[x]+175,yPosHouse+291,houseXs[x]+88,yPosHouse+181); //roof

			fill(205,165,109); 
			rect(houseXs[x]+98,yPosHouse+432,45,-102); //door
			fill(100,70,20);
			ellipse(houseXs[x]+132,yPosHouse+385,8,8); //door handle
			fill(0,110,200);
			stroke(0);
			rect(houseXs[x]+23,yPosHouse+331,60,60); //window

			line(houseXs[x]+53,yPosHouse+331,houseXs[x]+53,yPosHouse+391); //vert wind frame
			line(houseXs[x]+23,yPosHouse+361,houseXs[x]+83,yPosHouse+361);  //horz wind frame
			noStroke();		
		}
	
	}




// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects.

function drawCanyon(canyons)
{
	
	fill(50,50,0);
    rect(canyons.x_pos, floorPos_y, canyons.width, height - floorPos_y);
	
}

// Function to check character is over a canyon.

function checkCanyon(canyons)
{
	
	if(realPos>canyons.x_pos && realPos<canyons.x_pos+canyons.width&&isJumping==false&&isOnPlatform==false){
		
		isFalling=true
	}
	
//	if(isFalling){
//		gameChar_y+=1+3*fallspeed
//		fallspeed+=0.1
//	}
	
}

// ----------------------------------
// Pick-up render and check functions
// ----------------------------------

// Function to draw pick-up objects.

function drawPickup(pickups){
	
	if(pickups.isFound==false){
		
		noStroke();

		fill(218,165,32)
		ellipse(pickups.x_pos,pickups.y_pos+405,pickups.size,pickups.size);
		
		fill(255,215,0)
		ellipse(pickups.x_pos,pickups.y_pos+405,pickups.size-10,pickups.size-10);
	}
	
}

// Function to check character has picked up an item.

function checkPickup(pickups){
	
	if(abs(pickups.x_pos-realPos)<(pickups.size/2)+15&&abs(pickups.y_pos+floorPos_y-gameChar_y)<(pickups.size/2+15)){
	
		if(!pickups.isFound){
			pickups.isFound=true
			score+=1
			
		}
		
	}
	
}

function checkPlayerWon(){
	
	
	if(score == pickups.length){
		isWon = true
		
	}
	
	
}
	
function startGame(){

	gameChar_x = width/2;
	gameChar_y = floorPos_y;
	
	// Variable to control the background scrolling.
	scrollPos = 0;

	// Variable to store the real position of the gameChar in the game
	// world. Needed for collision detection.
	realPos = gameChar_x - scrollPos;

	// Boolean variables to control the movement of the game character.
	isLeft = false;
	isRight = false;
	isJumping = false;
	isFalling = false;

	// Initialise arrays of scenery objects.
	
	//house
	houseXs = []
	for(var x = 0; x<10;x++){
		var h = random(0,8000)
		houseXs.push(h)
	}
	
	//clouds
	clouds = [];
	for(var x = 0; x<25;x++){
		var c = {pos_x: random(0,8000), pos_y: random(0,100), size: random(60,90), colour: random(180,255)}
		clouds.push(c)
	}

	//mountains
	mountains = []
	for(var x = 0; x<50;x++){
		var m = {pos_x: random(0,4000), height: random(100,300)}
		mountains.push(m)
	}
	
	//trees
	trees = []
	for(var x = 0; x<20;x++){
		var t = {pos_x: random(0,4000)}
		trees.push(t)
	}

	//pickups
	
	pickups = [{x_pos: 100, y_pos: -150, size: 50, isFound: false},{x_pos: 1380, y_pos: 0, size: 50, isFound: false},
			 {x_pos: 750, y_pos: 0, size: 50, isFound: false},
			 {x_pos: 1850, y_pos: 0, size: 50, isFound: false},
			 {x_pos: 2300, y_pos: -190, size: 50, isFound: false},
			 {x_pos: 2740, y_pos: 0, size: 50, isFound: false},
			 ]

	//canyons
	
	canyons = [{x_pos: 300, width: 100},
			   {x_pos: 800, width: 150},
			   {x_pos: 1500, width: 180},
			   {x_pos: 2200, width: 210}
			   ]
	
	//Won
	isWon = false;
	
	//lost
	isLost = false;
	
	score = 0
	
	
	//enemies
	enemies = []
	
	
	enemies.push(
    {
        x_pos: 780,
        y_pos: floorPos_y,
        size: 30,
		x1: 400,
		x2: 800,
		speed: 1,
        display: function()
        { 
            // Draw enemy.
			if(this.speed>0){
				fill([255, 0, 0]);
				ellipse(this.x_pos, this.y_pos-15, this.size);
				fill([255,255,255])
				ellipse(this.x_pos+7, this.y_pos-18, this.size-15)	
				fill([0,0,0])
				ellipse(this.x_pos+7, this.y_pos-18, this.size-22)

				
				
			}  else {
				fill([255, 0, 0]);
				ellipse(this.x_pos, this.y_pos-15, this.size);
				fill([255,255,255])
				ellipse(this.x_pos-7, this.y_pos-18, this.size-15)	
				fill([0,0,0])
				ellipse(this.x_pos-7, this.y_pos-18, this.size-22)
				
				
			}
			
        },
		move: function()
		{
			
		if(this.x_pos>this.x2||this.x_pos<this.x1){
			this.speed=-this.speed
		
		}
			this.x_pos+=this.speed
			
		},
		checkCharCollision: function()
		{
			
			if(realPos>this.x_pos-this.size/2&&realPos<this.x_pos+this.size/2&&gameChar_y>this.y_pos-this.size/2&&gameChar_y<this.y_pos+this.size/2){
					playerDied()
			}	
		}	
		
    }
);
	
	
	
	
	
	enemies.push(
    {
        x_pos: 250,
        y_pos: floorPos_y-8,
        size: 45,
		x1: 50,
		x2: 300,
		speed: 1,
        display: function()
        { 
            // Draw enemy.
			if(this.speed>0){
				fill([30,30,255]);
				ellipse(this.x_pos, this.y_pos-15, this.size);
				fill([255,255,255])
				ellipse(this.x_pos+7, this.y_pos-18, this.size-15)	
				fill([0,0,0])
				ellipse(this.x_pos+7, this.y_pos-18, this.size-25)

				
				
			}  else {
				fill([30,30,255]);
				ellipse(this.x_pos, this.y_pos-15, this.size);
				fill([255,255,255])
				ellipse(this.x_pos-7, this.y_pos-18, this.size-15)	
				fill([0,0,0])
				ellipse(this.x_pos-7, this.y_pos-18, this.size-25)
				
				
			}
			
        },
		move: function()
		{
			
		if(this.x_pos>this.x2||this.x_pos<this.x1){
			this.speed=-this.speed
		
		}
			this.x_pos+=this.speed
			
		},
		checkCharCollision: function()
		{
			
			if(realPos>this.x_pos-this.size/2&&realPos<this.x_pos+this.size/2&&gameChar_y>this.y_pos-this.size/2&&gameChar_y<this.y_pos+this.size/2){
					playerDied()
			}	
		}	
		
    }
);
	
	
	
	
	enemies.push(
    {
        x_pos: 1200,
        y_pos: floorPos_y-15,
        size: 60,
		x1: 1150,
		x2: 1480,
		speed: 1,
        display: function()
        { 
            // Draw enemy.
			if(this.speed>0){
				fill([0, 255, 0]);
				ellipse(this.x_pos, this.y_pos-15, this.size);
				fill([255,255,255])
				ellipse(this.x_pos+7, this.y_pos-18, this.size-15)	
				fill([0,0,0])
				ellipse(this.x_pos+7, this.y_pos-18, this.size-25)

				
				
			}  else {
				fill([0, 255, 0]);
				ellipse(this.x_pos, this.y_pos-15, this.size);
				fill([255,255,255])
				ellipse(this.x_pos-7, this.y_pos-18, this.size-15)	
				fill([0,0,0])
				ellipse(this.x_pos-7, this.y_pos-18, this.size-25)
				
				
			}
			
        },
		move: function()
		{
			
		if(this.x_pos>this.x2||this.x_pos<this.x1){
			this.speed=-this.speed
		
		}
			this.x_pos+=this.speed
			
		},
		checkCharCollision: function()
		{
			
			if(realPos>this.x_pos-this.size/2&&realPos<this.x_pos+this.size/2&&gameChar_y>this.y_pos-this.size/2&&gameChar_y<this.y_pos+this.size/2){
					playerDied()
			}	
		}	
		
    }
);
	
	
	
	
	
	
	
	enemies.push(
    {
        x_pos: 2000,
        y_pos: floorPos_y,
        size: 30,
		x1: 1700,
		x2: 2200,
		speed: 1,
        display: function()
        { 
            // Draw enemy.
			if(this.speed>0){
				fill([255, 0, 0]);
				ellipse(this.x_pos, this.y_pos-15, this.size);
				fill([255,255,255])
				ellipse(this.x_pos+7, this.y_pos-18, this.size-15)	
				fill([0,0,0])
				ellipse(this.x_pos+7, this.y_pos-18, this.size-22)

				
				
			}  else {
				fill([255, 0, 0]);
				ellipse(this.x_pos, this.y_pos-15, this.size);
				fill([255,255,255])
				ellipse(this.x_pos-7, this.y_pos-18, this.size-15)	
				fill([0,0,0])
				ellipse(this.x_pos-7, this.y_pos-18, this.size-22)
				
				
			}
			
        },
		move: function()
		{
			
		if(this.x_pos>this.x2||this.x_pos<this.x1){
			this.speed=-this.speed
		
		}
			this.x_pos+=this.speed
			
		},
		checkCharCollision: function()
		{
			
			if(realPos>this.x_pos-this.size/2&&realPos<this.x_pos+this.size/2&&gameChar_y>this.y_pos-this.size/2&&gameChar_y<this.y_pos+this.size/2){
					playerDied()
			}	
		}	
		
    }
);
	
	
	
	
	enemies.push(
    {
        x_pos: 2300,
        y_pos: 250,
        size: 60,
		y1: 243,
		y2: 360,
		speed: 1,
        display: function()
        { 
            // Draw enemy.
			if(this.speed>0){
				fill([128,50,128]);
				ellipse(this.x_pos, this.y_pos-15, this.size);
				fill([255,255,255])
				ellipse(this.x_pos+7, this.y_pos-18, this.size-15)	
				fill([0,0,0])
				ellipse(this.x_pos+7, this.y_pos-18, this.size-25)

				
				
			}  else {
				fill([128,50,128]);
				ellipse(this.x_pos, this.y_pos-15, this.size);
				fill([255,255,255])
				ellipse(this.x_pos-7, this.y_pos-18, this.size-15)	
				fill([0,0,0])
				ellipse(this.x_pos-7, this.y_pos-18, this.size-25)
				
				
			}
			
        },
		move: function()
		{
			
		if(this.y_pos>this.y2||this.y_pos<this.y1){
			this.speed=-this.speed
		
		}
			this.y_pos+=this.speed
			
		},
		checkCharCollision: function()
		{
			
			if(realPos>this.x_pos-this.size/2&&realPos<this.x_pos+this.size/2&&gameChar_y>this.y_pos-this.size/2&&gameChar_y<this.y_pos+this.size/2){
					playerDied()
			}	
		}	
		
    }
);
	
	
	
	
	
	
	
	//platforms
	platforms = []
	isOnPlatform = false
	
	
	platforms.push(
    {
        x_pos: 70,
        y_pos: floorPos_y - 100,
        width: 160,
        height: 15,
        display: function()
        {
            // Draw platform.
            fill([255, 255, 0]);
            rect(this.x_pos, this.y_pos, this.width, this.height);
            line(this.x_pos,
                 this.y_pos + this.height / 2,
                 this.x_pos + this.width,
                 this.y_pos + this.height / 2);
        },
		checkCharOn: function()
		{
			if(realPos>this.x_pos&&realPos<this.x_pos+this.width&&gameChar_y>-1+this.y_pos&&gameChar_y<this.y_pos+this.height){
	
				isOnPlatform=true
			}
		
			
			
			
		}
		
    }
)
	
	
	platforms.push(
    {
        x_pos: 1150,
        y_pos: floorPos_y - 100,
        width: 300,
        height: 15,
        display: function()
        {
            // Draw platform.
            fill([255, 255, 0]);
            rect(this.x_pos, this.y_pos, this.width, this.height);
            line(this.x_pos,
                 this.y_pos + this.height / 2,
                 this.x_pos + this.width,
                 this.y_pos + this.height / 2);
        },
		checkCharOn: function()
		{
			if(realPos>this.x_pos&&realPos<this.x_pos+this.width&&gameChar_y>-1+this.y_pos&&gameChar_y<this.y_pos+this.height){
			
				isOnPlatform=true
			}
				
			
			
			
		}
		
    }
)
	
	
	
	
	
	
	platforms.push(
    {
        x_pos: 2000,
        y_pos: floorPos_y - 100,
        width: 200,
        height: 15,
        display: function()
        {
            // Draw platform.
            fill([255, 255, 0]);
            rect(this.x_pos, this.y_pos, this.width, this.height);
            line(this.x_pos,
                 this.y_pos + this.height / 2,
                 this.x_pos + this.width,
                 this.y_pos + this.height / 2);
        },
		checkCharOn: function()
		{
			if(realPos>this.x_pos&&realPos<this.x_pos+this.width&&gameChar_y>-1+this.y_pos&&gameChar_y<this.y_pos+this.height){
				isOnPlatform=true
			}
				
			
			
			
		}
		
    }
)
	
	
	
	
	
	
	
	
	platforms.push(
    {
        x_pos: 2400,
        y_pos: floorPos_y - 100,
        width: 200,
        height: 15,
        display: function()
        {
            // Draw platform.
            fill([255, 255, 0]);
            rect(this.x_pos, this.y_pos, this.width, this.height);
            line(this.x_pos,
                 this.y_pos + this.height / 2,
                 this.x_pos + this.width,
                 this.y_pos + this.height / 2);
        },
		checkCharOn: function()
		{
			if(realPos>this.x_pos&&realPos<this.x_pos+this.width&&gameChar_y>-1+this.y_pos&&gameChar_y<this.y_pos+this.height){
	
				isOnPlatform=true
			}
			
			
			
			
		}
		
    }
)	
	
	
	
	
	
	
	
	
	
	
	
}

function checkPlayerDie(){

	
	
	if (gameChar_y > height)
    {
        playerDied();
    }
	
	
	
}

function playerDied(){
	
		lives-=1
	//if(gameChar_y>height+65){
		if(lives > 0){
			startGame()
			
		} else {
			isLost = true;
		
		}
		
	//}
	
}


function nextLevel()
{
    // DO NOT CHANGE THIS FUNCTION!
    console.log('next level');
}

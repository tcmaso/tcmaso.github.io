function eraserTool(){
	//set an icon and a name for the object
	this.icon = "assets/eraserIcon.png";
	this.name = "eraser";

	//to smoothly draw we'll draw a line from the previous mouse location
	//to the current mouse location. The following values store
	//the locations from the last frame. They are -1 to start with because
	//we haven't started drawing yet.
	var previousMouseX = -1;
	var previousMouseY = -1;

	this.draw = function(){

		toolSetting.sizeChange()
		
		
		//if the mouse is pressed

		if(mouseIsPressed && mouseCanvas()){
			//check if they previousX and Y are -1. set them to the current
			//mouse X and Y if they are.
			if (previousMouseX == -1){
				previousMouseX = mouseX;
				previousMouseY = mouseY;
			}
			//if we already have values for previousX and Y we can draw a line from 
			//there to the current mouse location
			else{
				
				push();
				
				fill(255,255,255,200);
				stroke(255);
				line(previousMouseX, previousMouseY, mouseX, mouseY);
				pop();
//				line(previousMouseX, previousMouseY, mouseX, mouseY);
				
				previousMouseX = mouseX;
				previousMouseY = mouseY;
			}
		}
		//if the user has released the mouse we want to set the previousMouse values 
		//back to -1.
		//try and comment out these lines and see what happens!
		else{
			previousMouseX = -1;
			previousMouseY = -1;
		}
	};
	
	this.unselectTool = function () {
		loadPixels();
	}
}
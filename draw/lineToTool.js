function LineToTool(){
	//loads the icons for the the buttons
	this.icon = "assets/lineTo.jpg";
	this.name = "LineTo";

	//initalise variables
	var startMouseX = -1;
	var startMouseY = -1;
	var drawing = false;

	this.draw = function(){
		toolSetting.sizeChange()
		
		
//when Mouse is clicked and the defualt value of startMouseX is -1, assign startMouseX to the current x position of mouse and assign startMouseY to the current y position of mouse.
		if(mouseIsPressed && mouseCanvas()){ 
			if(startMouseX == -1){
				startMouseX = mouseX;
				startMouseY = mouseY;
				drawing = true;
				loadPixels(); // loads the canvas before the line is drawn every frame, prevents a trail of lines of being created.
			}

			else{
				updatePixels(); // once mouse click is released, frame is saved
				line(startMouseX, startMouseY, mouseX, mouseY);
			}

		}
//when drawing is true, a line is produced from where the x and y point where the mouse was clicked to the current position of the mouse.
		else if(drawing){
			updatePixels(); // once mouse click is released, frame is saved
			line(startMouseX, startMouseY, mouseX, mouseY);
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
		}
	};

	this.unselectTool = function () {
		loadPixels();
	}
}
//this random line
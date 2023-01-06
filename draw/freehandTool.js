function FreehandTool(){
	//set an icon and a name for the object
	this.icon = "assets/freehand.jpg";
	this.name = "freehand";

	this.linePoints = [];
	

	this.draw = function(){
		//if the mouse is pressed
		toolSetting.sizeChange()
		colourP.loadColours()
		strokeJoin(ROUND);
		strokeCap(ROUND);
		
		if(mouseIsPressed && mouseCanvas()){

			this.connectPoints();
		}

		else{

			this.connectPoints();
			loadPixels();
			this.linePoints = [];
			
			
			
		}
	};
	
	this.connectPoints = function() {
			updatePixels();
			
			this.linePoints.push([mouseX,mouseY]);
			
			push();
			noFill();
			beginShape();
			
			for( var x = 0; x < this.linePoints.length - 1; x++){
				vertex(this.linePoints[x][0], this.linePoints[x][1]);
			}
			
			endShape();
			pop();	
	}
	
	
	
	this.unselectTool = function() {
		loadPixels();
	}
}
////spray can object literal
//sprayCan = {
//    name: "sprayCanTool",
//    icon: "assets/sprayCan.jpg",
//    points: 13,
//    spread: 10,
//    draw: function(){
//        //if the mouse is pressed paint on the canvas
//        //spread describes how far to spread the paint from the mouse pointer
//        //points holds how many pixels of paint for each mouse press.
//        if(mouseIsPressed){
//            for(var i = 0; i < this.points; i++){
//                point(random(mouseX-this.spread, mouseX + this.spread), 
//                    random(mouseY-this.spread, mouseY+this.spread));
//            }
//        }
//    }
//};


function SprayCanTool() {
    this.name = "sprayCanTool";
    this.icon = "assets/sprayCan.jpg";
    this.points = 13;
    this.spread = 10;
    this.draw = function(){
		
		strokeWeight(toolSetting.size/3)
		
        //if the mouse is pressed paint on the canvas
        //spread describes how far to spread the paint from the mouse pointer
        //points holds how many pixels of paint for each mouse press.
        if(mouseIsPressed && mouseCanvas()){
            for(var i = 0; i < this.points; i++){
                point(random(mouseX-this.spread*toolSetting.size/10, mouseX + this.spread*toolSetting.size/10), 
                    random(mouseY-this.spread*toolSetting.size/10, mouseY+this.spread*toolSetting.size/10));
            }
        }
    }
	
	this.unselectTool = function () {
		loadPixels();
	}
};
function textTool() {
	this.icon = "assets/textIcon.png";
	this.name = "textTool";

    var xPosText = -1
    var yPosText = -1
    
    var theText = "";
    
    this.draw = function () {
		colourP.loadColours()
	}

    
    this.mousePressed = function(){
        
        
        if(xPosText>-1){
            
            loadPixels();

            xPosText = -1;
            yPosText = -1;

            theText = "";
        }
        if(mouseCanvas()){
            
            xPosText = mouseX
            yPosText = mouseY
            this.addText()
            
        }
        
        
        
    }
    
    this.keyPressed = function(){
        if(xPosText>-1){
            
            if(keyCode == 8){
                if(theText != ""){
                    theText = theText.substr(0, theText.length-1);

                    this.addText();
                }
            }
            
        }
    
        
    }
    
    this.keyTyped = function(){
        
        if(xPosText>-1){
            
            theText = theText + key

            this.addText()
            
        }

        
    }
    
    this.addText = function(isDrawing){
        
        push()
        
            strokeWeight(0.3)
        
        updatePixels()
        
        if(xPosText>-1 && theText.length>0){
            
            text(theText, xPosText, yPosText)
            
        }
            
        

        
        pop()
        
    }

    this.unselectTool = function() {
        $(".options").html("");
    }
}

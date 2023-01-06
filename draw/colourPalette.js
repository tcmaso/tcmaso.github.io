//Displays and handles the colour palette.
function ColourPalette(){
	this.selectedColour = "#000000";
	this.opacity = 1;
	
	
//Load in the colours 
	this.loadColours = function(){
		
		this.selectedColour = this.opacityChange($("#colInput").val(), this.opacity)
		
		fill(this.selectedColour);
		stroke(this.selectedColour);
	};
	
	
//Takes the current colour from loadColours and the current opacity and returns a new rgba value which combines the colour and alpha
	this.opacityChange = function(theColour, opacity){
		var tempColour = color(theColour)
		var red = tempColour.levels[0]
		var green = tempColour.levels[1]
		var blue = tempColour.levels[2]
		var opacity = this.opacity
		
		var newColour = color('rgba(' + [red,green,blue,opacity] + ')')
		
		return newColour
		
	};
	
	
	
//call the loadColours function now it is declared
	this.loadColours();
	


//handle clicks on the colours.
	$("#colInput").change(() => { this.loadColours(); })
	

	
}
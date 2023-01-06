function toolSettings(){
//local size variable
	this.size = 50; 
	
//Changes the stroke weight to the current size on the slider
	this.sizeChange = function(){
		
		this.size = $("#sizeInput").val();
		strokeWeight(this.size)
	}
	
//Calls the ColourP function to get the current opacity
	this.opacityChange = function(){
		
		colourP.opacity = $("#opacityInput").val();
		colourP.loadColours();
	}
	
//When the size and opacity are changed they call the following functions
	$("#sizeInput").change(() => { this.sizeChange(); })

	$("#opacityInput").change(() => { this.opacityChange(); })
	
	
//Called on first load
	this.sizeChange();
	this.opacityChange();
	
	
	
}

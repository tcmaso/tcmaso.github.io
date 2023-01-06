function HelperFunctions() {

	//Jquery click events. Notice that there is no this. at the
	//start we don't need to do that here because the event will
	//be added to the button and doesn't 'belong' to the object

	//event handler for the clear button event. Clears the screen
	$("#clearButton").on("click", function () {
		//sets background to white

		background(255);

		if (img) {
			img = null;
			var canvas = getElementById("defaultCanvas0");
			c.clearRect(0, 0, canvas.width, canvas.height)

			shapeTool.shapeList = [];
			imageTool.imageList = [];
		}


		//call loadPixels to update the drawing state
		//this is needed for the mirror tool
		loadPixels();
	});

	//event handler for the save image button. saves the canvsa to the
	//local file system. 
	$("#saveImageButton").on("click", function () {
		//???
		saveCanvas("myCanvas", "png");
	});


//This functions remove the opacity box if it is not used by the tool.
	this.opacityBoxControl = function (theCurrentTool) {
		if (theCurrentTool.name == "mirrorDraw"||theCurrentTool.name == "eraser"||theCurrentTool.name == "imageTool"||theCurrentTool.name == "cropTool"||theCurrentTool.name == "textTool") {
			$(".opacityContainer").fadeOut(0);
		} else {
			$(".opacityContainer").fadeIn(0);
		}
	}
	
//This functions remove the size box if it is not used by the tool.
	this.sizeBoxControl = function (theCurrentTool) {
		if (theCurrentTool.name == "shapeTool"||theCurrentTool.name == "imageTool"||theCurrentTool.name == "cropTool"||theCurrentTool.name == "textTool") {
			$(".sizeContainer").fadeOut(0);
		} else {
			$(".sizeContainer").fadeIn(0);
		}
	}
	
//This functions remove th colour box if it is not used by the tool.
	this.colourBoxControl = function (theCurrentTool) {
		if (theCurrentTool.name == "imageTool"||theCurrentTool.name == "cropTool") {
			$(".colourContainer").fadeOut(0);
		} else {
			$(".colourContainer").fadeIn(0);
		}
	}



	//If the help button is clicked the visibility of the help box is toggled.
	$("#helpButton").click(function () {
		$("#helpBox").fadeToggle();
	});

	//Sets the help button background image to question marks
	$("#helpButton").css("background-image", "url(assets/questionMark.png)");

	//Returns true if help box is being dragged. Returns false if help box is not being dragged.
	this.mouseHelpBox = function () {
		if (helpSetting.isDragging == true) {
			return true
		} else {
			return false
		}
	}

}

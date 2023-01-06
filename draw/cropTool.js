//This function allows the user to crop the canvas, and drag the new crop to a new location. It involves using getImageData and putImageDatet to get the image data from the canvas, storing it as an image, then saving it in an object and then displaying it on screen. The user can then drag the cropped portion ("image") of the canvas around to a new location.
function cropTool() {
	this.icon = "assets/cropToolIcon.png";
	this.name = "cropTool";

	//Stores the image data
	var theImageData = null;

	//theCanvas set as the element by id defaultCanvas0
	var theCanvas = document.getElementById('defaultCanvas0');

	//context of theCanvas in 2d
	var ctx = theCanvas.getContext("2d");

	//If the mouse is currently being held.
	var isDown = false;

	//The last x and y position of the mouse.
	var lastX;
	var lastY;


	//This variable i cruical as the screen size changes deppending on the zoom. So it is set to 1 or 2 deppending on the zoom to make sure the the canvas size and css size of the canvas match
	var canvasPixelNo;

	//Used to tell if a new object is being created
	var isNewObject = false;

	//Currently selected tool.
	var selectedTool = null

	//Starting mouse positions
	var startMouseX = -1;
	var startMouseY = -1;

	var drawing = false;

	//True if new image is being drawn
	var drawingNewImage = false;

	//the crop object whichs stores all the properties of the current cropped image
	var cropObject = {
		x: null,
		y: null,
		width: null,
		height: null,
		drag: null,
		data: null
	}

	//Stores the crop tools which can be chosen
	var cropTools = [{
		name: "Normal",
		icon: "assets/selectIcon.png",
		display: false
	}, {
		name: "Select",
		icon: "assets/dragIcon.png",
		display: false
	}, {
		name: "Remove",
		icon: "assets/removeIcon.png",
		display: false
	}]

	//If the mouse is currently being held.
	var isDown = false;

	//The last x and y position of the mouse.
	var lastX;
	var lastY;


	this.draw = function () {


		this.selectCropArea()

		if (selectedTool != "Remove") {
			this.cropDragging()
			this.drawCropArea()

		}


	}


	//This function is what sets the drag property of the image to true or false deppending on whether a image is being hovered over by the mouse.
	this.updateCropTool = function () {
		if (cropObject.data != null && !isNewObject && selectedTool != "Remove") {
			updatePixels()
			push()
			noFill()
			strokeWeight(4)
			stroke(255, 0, 0)
			rect(cropObject.x, cropObject.y, cropObject.width, cropObject.height)
			pop()

		}

	}

	//When a new crop is created the old crop selection is finally saved with is current object properties
	this.finalCropSave = function () {

		if (cropObject.data != null) {
			updatePixels()
			//Displays the cropped image data on canvas and is saved by loadPixels
			ctx.putImageData(cropObject.data, cropObject.x * canvasPixelNo, cropObject.y * canvasPixelNo);
			loadPixels()

		}

	}

	//Resets the variables for a new crop selection
	this.resetCropTool = function () {
		updatePixels();
		drawing = false;

		startMouseX = -1;
		startMouseY = -1;
		cropObject = {
			x: null,
			y: null,
			width: null,
			height: null,
			drag: null,
			data: null
		}
	}

	//Displays what will be cropped
	this.selectCropArea = function () {

		var width
		var height

		push()
		strokeWeight(0)
		if (mouseIsPressed && mouseCanvas() && selectedTool != "Select") {
			if (startMouseX == -1) {

				drawing = true;
				this.finalCropSave()

				startMouseX = mouseX;
				startMouseY = mouseY;

			} else {
				updatePixels();

				width = mouseX - startMouseX
				height = mouseY - startMouseY
				strokeWeight(2)
				stroke(0, 0, 0, 100)
				fill(0, 0, 0, 30)
				rect(startMouseX, startMouseY, width, height);
			}
		} else if (drawing) {
			updatePixels(); // once mouse click is released, frame is saved

			theWidth = mouseX - startMouseX
			theHeight = mouseY - startMouseY


			if (theWidth <= 0 || theHeight <= 0) {
				this.resetCropTool()
                alert("Make sure your starting point is in the top left corner and your finishing point is in the bottom right corner!")
			} else if (selectedTool == "Normal") {
				this.cropSave(startMouseX, startMouseY, theWidth, theHeight)

				//If the selectedTool is the remove tool a white rectangle is displayed on the canvas and saved
			} else if (selectedTool == "Remove") {
				updatePixels()
				push()
				fill(255)
				strokeWeight(0)
				rect(startMouseX, startMouseY, theWidth, theHeight)
				pop()
				loadPixels()
				this.resetCropTool()

			}

			drawing = false;
			startMouseX = -1;
			startMouseY = -1;

		};
		pop()

	}

	//The selected part of the canvas is saved as an image type and the crop properties are saved to the cropObject
	this.cropSave = function (startX, startY, theWidth, theHeight) {

		var x = startX
		var y = startY
		var width = theWidth
		var height = theHeight
		var drag = false

		if (width != 0 && height != 0) {

			theCanvasContainer = $('#content');

			//This is where the canvasPixelNo is crucial.
			if (abs(theCanvasContainer.innerWidth() - theCanvas.width) > 10) {

				canvasPixelNo = 2
			} else {

				canvasPixelNo = 1
			}

			//The image data for the correct region of the canvas is stored.
			var data = ctx.getImageData(x * canvasPixelNo, y * canvasPixelNo, width * canvasPixelNo, height * canvasPixelNo)

			push()
			fill(255)
			strokeWeight(0)
			rect(x, y, width, height)
			pop()
			loadPixels()

			//cropObject has the new crop image properties stored
			cropObject = {
				x: x,
				y: y,
				width: width,
				height: height,
				drag: drag,
				data: data
			}
		}
	}

	//The new crop image is displayed on the canvas
	this.drawCropArea = function () {

		if (cropObject.data != null && !drawing) {

			updatePixels()
			if (!drawing) {
				this.updateCropTool()

			}
			ctx.putImageData(cropObject.data, cropObject.x * canvasPixelNo, cropObject.y * canvasPixelNo);



		}


	}

	//Used to make drag feature, edited. https://stackoverflow.com/questions/34369053/how-to-drag-shapes-like-rect-circle-other-polygons-etc-around-the-canvas-using

	//Function which handles the event when the mouse is pressed down. 
	this.handleMouseDown = function (e) {


		if (selectedTool == "Select") {

			// tell the browser we'll handle this event
			e.preventDefault();
			e.stopPropagation();

			// save the mouse position
			// in case this becomes a drag operation
			lastX = mouseX
			lastY = mouseY

			// if no hits then add a circle
			// if hit then set the isDown flag to start a drag
			this.cropDragging()
			if (cropObject.drag == true) {

				isDown = true;
			}
		}
	}

	//Function which handles the event when the mouse is up. 
	this.handleMouseUp = function (e) {

		if (selectedTool == "Select") {

			// tell the browser we'll handle this event
			e.preventDefault();
			e.stopPropagation();

			// stop the drag
			isDown = false;

		}

	}

	//Function which handles the event when the mouse is moving.
	this.handleMouseMove = function (e) {
		if (selectedTool == "Select") {

			// if we're not dragging, just exit
			if (!isDown) {
				return;
			}

			// calculate how far the mouse has moved
			// since the last mousemove event was processed
			var dx = mouseX - (cropObject.width / 2);
			var dy = mouseY - (cropObject.height / 2);
			// reset the lastX/Y to the current mouse position

			updatePixels()

			// change the target object position by the 
			// distance the mouse has moved since the last
			// mousemove event
			cropObject.x = dx;
			cropObject.y = dy;

			this.drawCropArea();
		}

	}



	this.populateOptions = function () {
		//http://api.jquery.com/append/
		//https://www.w3schools.com/jquery/jquery_dom_add.asp
		$(".options").append("<div id='cropContainer'></div>")

		for (var x = 0; x < cropTools.length; x++) {
			//Iterates through cropTools and displays each icon	
			if (cropTools[x].display == false) {
				var cropHTML = "<div class='cropItems' id='" + cropTools[x].name + "Item'> <img src='" + cropTools[x].icon + "'></div>";
				$("#cropContainer").append(cropHTML);
			}

		}

		$(".options").on("click", ".cropItems", function () {

			$(".cropItems").css("border", "0px");


			//finds the current id of the selected element
			//https://stackoverflow.com/questions/964119/how-to-get-the-class-of-the-clicked-element
			cropName = $(this).attr("id");
			//Adds blue border around currently selected shape option
			$("#" + cropName).css("border", "2px solid blue");

			//sets the new shape tool
			selectedTool = split(cropName, "Item")[0]

		});

	}

	//Used to see if the mouse position is inside the curren cropObject properties. Sets the cropObjects drag property to true if it is.
	this.cropDragging = function () {
		if (selectedTool == "Select") {
			if (mouseX > cropObject.x && mouseX < cropObject.x + cropObject.width && mouseY > cropObject.y && mouseY < cropObject.y + cropObject.height) {
				cropObject.drag = true
			} else {
				cropObject.drag = false
			}
		}
	}


	//Jquery event handles
	$("#defaultCanvas0").mousedown(
		(e) => {
			this.handleMouseDown(e);
		});
	$("#defaultCanvas0").mousemove((e) => {
		this.handleMouseMove(e);
	});
	$("#defaultCanvas0").mouseout(
		(e) => {
			this.handleMouseUp(e);
		});

	$("#defaultCanvas0").mouseup(
		(e) => {
			this.handleMouseUp(e);
		});

	$("#clearButton").on("click", function () {
		cropObject = {
			x: null,
			y: null,
			width: null,
			height: null,
			drag: null,
			data: null
		}
	});

	this.unselectTool = function () {

		this.finalCropSave()
		loadPixels();
		$(".options").html("");
		selectedTool = null
		cropObject = {
			x: null,
			y: null,
			width: null,
			height: null,
			drag: null,
			data: null
		}
	}

}

//This function allows the user to add images to the canvas. The user can change the size of the image, upload images from there directory and select a image and move it around. When a image is created its data including the x, y coordinates, the width, the height are saved as an object and pushed into an array. A loop then displays every image in the array on the canvas but does not permanently  save it allowing the user to move the image around and the loop will display the image in the new position.

function imageTool() {
	this.icon = "assets/imgIcon.png";
	this.name = "imageTool";

	//Stores the image data
	var theImageData = null;

	//Currently selected tool.
	var selectedTool = null

	//True if new image is being drawn
	var drawingNewImage = false;

	//Stores the image tools which can be chosen
	var imageTools = [{
		name: "Normal",
		icon: "assets/imgIcon.png",
		display: false
	}, {
		name: "Select",
		icon: "assets/dragIcon.png",
		display: false
	}]

	//If the mouse is currently being held.
	var isDown = false;

	//The last x and y position of the mouse.
	var lastX;
	var lastY;

	//The currentImage stores the current images's object
	var currentImage;

	//The current index that is being hovered over by the mouse
	var currentIndex;

	//The default image sizes
	var currentImageWidth = 100;
	var currentImageHeight = 100;

	//The array that stores the image objects
	var imageList = [];

	//When the mouse is pressed and the imageData variable contains image data, then the function to create a new image is called.
	this.mousePressed = function () {
		if (drawingNewImage == false && mouseCanvas()) {

			if (theImageData) {

				drawingNewImage = true
				this.drawImage()

			} else {
				alert("Please choose a file")
			}

		}

	}

	//When mouse is released, drawing a new image is now false
	this.mouseReleased = function () {
		drawingNewImage = false
	}

	//Draw functions continually calls the drawAllImages function to display the images on the canvas
	this.draw = function () {

		this.drawAllImages()

	}

	//Gets the ID of the image which the mouse is on. Returns the ID of the image the mouse is on if the mouse is on a image otherwise it returns null if the mouse is on no image.
	this.getDragId = function () {

		for (var x = 0; x < imageList.length; x++) {

			if (mouseX > imageList[x].x && mouseX < imageList[x].x + imageList[x].width && mouseY > imageList[x].y && mouseY < imageList[x].y + imageList[x].height) {
				var theCurrentId = imageList[x].id - 1
				return (theCurrentId)
			}
		}
		return null
	}

	//This function is what sets the drag property of the image to true or false deppending on whether a image is being hovered over by the mouse.
	this.updateImage = function () {

		if (currentIndex != null && !isDown) {
			imageList[currentIndex].drag = true

		} else if (currentIndex == null && !isDown) {

			for (var x = 0; x < imageList.length; x++) {

				imageList[x].drag = false
			}
		}
	}

	this.populateOptions = function () {
		//http://api.jquery.com/append/
		//https://www.w3schools.com/jquery/jquery_dom_add.asp
		$(".options").append("<div id='imageContainer'></div>")
		$(".options").append("<div id='imageContainer2'></div>")

		var imageDataHTML = createFileInput(this.handleFile)
		imageDataHTML.parent('imageContainer');

		//Iterates through imageTools and displays each icon	
		for (var x = 0; x < imageTools.length; x++) {

			if (imageTools[x].display == false) {
				var imageHTML = "<div class='imageItems' id='" + imageTools[x].name + "Item'> <img src='" + imageTools[x].icon + "'></div>";
				$("#imageContainer").append(imageHTML);
			}
		}

		//Jquery to add the width and height input boxes
		$("#imageContainer2").append("<div id='imageWidth'><p>Image width</p><input type='number' value='250' id='imageWidthInput'/></div>")

		$("#imageContainer2").append("<div id='imageHeight'><p>Image height</p><input type='number'  value='250'  id='imageHeightInput'/></div>")

		//Jquery which changes the values when the width and height change
		$("#imageWidthInput").change(() => {
			currentImageWidth = $("#imageWidthInput").val()

		})

		$("#imageHeightInput").change(() => {
			currentImageHeight = $("#imageHeightInput").val()

		})

		//Applys the border when an imageTool icon is clicked
		$(".options").on("click", ".imageItems", function () {

			$(".imageItems").css("border", "0px");

			//https://stackoverflow.com/questions/964119/how-to-get-the-class-of-the-clicked-element
			imageName = $(this).attr("id");
			//Adds blue border around currently selected image option
			$("#" + imageName).css("border", "2px solid blue");

			//sets the new image tool
			selectedTool = split(imageName, "Item")[0]
		});
	}

	//This function saves the image data from the image file which is uploaded by the user
	this.handleFile = function (file) {
		print("file data saved to theimagedata");
		if (file.type === 'image') {
			theImageData = file.data;
		}
	}

	//This function pushes the new images details in the array. It's parameters come from the drawImage function.
	this.imageAdd = function (xPos, yPos, imgWidth, imgHeight, imgData) {
		var x = xPos
		var y = yPos
		var width = imgWidth
		var height = imgHeight
		var imageData = imgData
		var drag = false

		imageList.push({
			id: imageList.length + 1,
			x: x,
			y: y,
			width: width,
			height: height,
			data: imageData,
			drag: drag
		});

	}

	//The function that is called to display where the new image will be created
	this.drawImage = function () {

		var xPos = mouseX;
		var yPos = mouseY;

		currentImageWidth = $("#imageWidthInput").val()
		currentImageHeight = $("#imageHeightInput").val()

		var imgWidth = int(currentImageWidth)
		var imgHeight = int(currentImageHeight)
		var imageData = theImageData

		//Calls the function passing parameters where the image will be saved
		this.imageAdd(xPos, yPos, imgWidth, imgHeight, imageData)
	}

	//The function that loops through all the images and draws each image on the canvas. It does not permanently save the canvas till the tool is unselected which allows the user to move the images around.
	this.drawAllImages = function () {

		updatePixels()
		for (var x = 0; x < imageList.length; x++) {

			if (imageList[x].drag == true) {
				strokeWeight(3)
				stroke(255, 0, 0)

			} else {
				strokeWeight(0)
			}

			//Image properties
			var xPos = imageList[x].x;
			var yPos = imageList[x].y;
			var imgWidth = imageList[x].width;
			var imgHeight = imageList[x].height;

			var imgData = imageList[x].data

			var theNewImage;
			theNewImage = createImg(imageList[x].data)
			theNewImage.hide()
			//image is displayed with correct properties
			image(theNewImage, xPos, yPos, imgWidth, imgHeight)
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
			
			currentIndex = this.getDragId()

			// if no hits then add a circle
			// if hit then set the isDown flag to start a drag
			if (currentIndex != null) {
				currentImage = imageList[currentIndex];
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

			currentIndex = this.getDragId()

			// calculate how far the mouse has moved
			// since the last mousemove event was processed
			var dx = mouseX - (currentImage.width / 2);
			var dy = mouseY - (currentImage.height / 2);
			// reset the lastX/Y to the current mouse position


			// change the target circles position by the 
			// distance the mouse has moved since the last
			// mousemove event
			updatePixels()
			currentImage.x = dx;
			currentImage.y = dy;
			this.drawAllImages()
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
		imageList = [];
	});


	this.unselectTool = function () {
		loadPixels();
		$(".options").html("");
		selectedTool = null
		imageList = []
	}

}

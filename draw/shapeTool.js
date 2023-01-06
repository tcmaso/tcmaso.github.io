//This Function allows the user to draw different types of shapes to the canvas. The user can select the shapes and move them around. When a shape is created its data including the x, y coordinates, the width, the height, the type, the colour and the points are saved as an object and pushed into an array. A loop then displays every shape in the array on the canvas but does not permantely save it allowing the user to move the shape around and the loop will display the shape in the new position.

function shapeTool() {
	this.name = "shapeTool";
	this.icon = "assets/shapeIcon.png";

	//Currently selected tool.
	var selectedTool = null
	var startMouseX = -1;
	var startMouseY = -1;
	var drawing = false;

	//If the mouse is currently being held.
	var isDown = false;

	//The last x and y position of the mouse.
	var lastX;
	var lastY;

	//The currentShape stores the current shape's object
	var currentShape

	//The current index that is being hovered over by the mouse
	var currentIndex

	//The last index which was hovered over by the mouse
	var oldIndex;


	//True if the control key has been pressed
	var isControlKey;

	//Stores the shape tools which can be chosen
	var shapeTools = [{
		name: "Circle",
		icon: "assets/circleIcon.png",
		display: false,
		points: ["Circle"]
	}, {
		name: "Rectangle",
		icon: "assets/blackSquareIcon.png",
		display: false,
		points: [{
			x: 0,
			y: 0
		}, {
			x: 0,
			y: 1
		}, {
			x: 1,
			y: 1
		}, {
			x: 1,
			y: 0
		}]
	}, {
		name: "Triangle",
		icon: "assets/triangleIcon.png",
		display: false,
		points: [{
			x: 0.5,
			y: 0
		}, {
			x: 0,
			y: 1
		}, {
			x: 1,
			y: 1
		}]
	}, {
		name: "Diamond",
		icon: "assets/diamondTool.png",
		display: false,
		points: [{
			x: 0.5,
			y: 0
		}, {
			x: 1,
			y: 0.5
		}, {
			x: 0.5,
			y: 1
		}, {
			x: 0,
			y: 0.5
		}]
	}, {
		name: "Pentagon",
		icon: "assets/pentagonTool.png",
		display: false,
		points: [{
			x: 0.5,
			y: 0
		}, {
			x: 1,
			y: 0.5
		}, {
			x: 0.75,
			y: 1
		}, {
			x: 0.25,
			y: 1
		}, {
			x: 0,
			y: 0.5
		}]
	}, {
		name: "Weird",
		icon: "assets/weirdShapeIcon.png",
		display: false,
		points: [{
			x: 3 / 7,
			y: 1 / 7
		}, {
			x: 2 / 7,
			y: 2 / 7
		}, {
			x: 3 / 7,
			y: 3 / 7
		}, {
			x: 2 / 7,
			y: 4 / 7
		}, {
			x: 3 / 7,
			y: 5 / 7
		}, {
			x: 4 / 7,
			y: 5 / 7
		}, {
			x: 5 / 7,
			y: 5 / 7
		}, {
			x: 6 / 7,
			y: 5 / 7
		}, {
			x: 7 / 7,
			y: 4 / 7
		}, {
			x: 6 / 7,
			y: 3 / 7
		}, {
			x: 7 / 7,
			y: 2 / 7
		}, {
			x: 6 / 7,
			y: 1 / 7
		}, {
			x: 5 / 7,
			y: 1 / 7
		}, {
			x: 4 / 7,
			y: 1 / 7
		}]
	}, {
		name: "Select",
		icon: "assets/dragIcon.png",
		display: false,
		points: [{
			x: 3,
			y: 1
		}]
	}]

	//The array that stores the shape objects
	var shapeList = [];


	this.draw = function () {

		this.drawShape()


		currentIndex = this.getDragId()
		if (selectedTool == "Select") {

			this.updateShape()

		}


		this.drawAllShapes()



	}

	//Gets the ID of the shape which the mouse is on. Returns the ID of the shape the mouse is on if the mouse is on a shape otherwise it returns null if the mouse is on no shape.
	this.getDragId = function () {

		//Iterates through every shape to see if the mouse lies in the shape area
		for (var x = 0; x < shapeList.length; x++) {
			if (shapeList[x].points == "Circle") {
				if (mouseX > (shapeList[x].x - shapeList[x].width / 2) && mouseX < (shapeList[x].x + shapeList[x].width / 2) && mouseY > (shapeList[x].y - shapeList[x].height / 2) && mouseY < (shapeList[x].y + shapeList[x].height / 2)) {
					var theCurrentId = shapeList[x].id - 1
					return (theCurrentId)
				}
			} else {
				if (mouseX > shapeList[x].x && mouseX < shapeList[x].x + shapeList[x].width && mouseY > shapeList[x].y && mouseY < shapeList[x].y + shapeList[x].height) {
					var theCurrentId = shapeList[x].id - 1
					return (theCurrentId)
				}
			}
		}
		return null
	}


	this.keyPressed = function () {
		currentIndex = this.getDragId()
		if (currentIndex != null && selectedTool == "Select") {

			//If up arrow is pressed the shapes size increase by 5
			if (keyCode == 38) {
				shapeList[currentIndex].width += 5
				shapeList[currentIndex].height += 5

				//If down arrow is pressed the shapes size decreases by 5
			} else if (keyCode == 40) {
				shapeList[currentIndex].width -= 5
				shapeList[currentIndex].height -= 5
			}

		}

		//If the control key is pressed the boolean variable is set to true
		if (keyCode == 17) {
			isControlKey = true
		} else {
			isControlKey = false
		}



	}

	//When the key is released the boolean variable is set to false
	this.keyReleased = function () {
		keyCode = 1
		isControlKey = false
	}


	//
	this.updateShape = function () {
		try {
			if (currentIndex != null && !isDown) {
				if (currentIndex == oldIndex) {
					shapeList[currentIndex].drag = true
				} else if (currentIndex != oldIndex) {
					if (oldIndex != null) {
						shapeList[oldIndex].drag = false
					}
					oldIndex = currentIndex
				}
			} else {
				for (var x = 0; x < shapeList.length; x++) {
					if (shapeList[x].drag == true) {
						shapeList[x].drag = false
						break
					}
				}
			}
		} catch (err) {
			oldIndex = currentIndex
		}
	}

	//The function that loops through all the shapes and draws each shape on the canvas. It does not permanently save the canvas till the tool is unselected which allows the user to move the shapes around.
	this.drawAllShapes = function () {
		if (!drawing) {

			updatePixels()
			for (var x = 0; x < shapeList.length; x++) {
				strokeWeight(0)
				push()
				beginShape()

				fill(shapeList[x].colour)
				//If the shapes drag property is true, the shape is highlighted.
				if (shapeList[x].drag == true) {
					strokeWeight(3)
					stroke(255, 0, 0)

				} else {
					strokeWeight(0)
				}

				if (shapeList[x].points == "Circle") {
					ellipse(shapeList[x].x, shapeList[x].y, shapeList[x].width, shapeList[x].height)

				}
				for (var y = 0; y < shapeList[x].points.length; y++) {

					vertex(shapeList[x].x + shapeList[x].points[y].x * shapeList[x].width, shapeList[x].y + shapeList[x].points[y].y * shapeList[x].height)

				}
				endShape(CLOSE)

			}
			pop()

		}

	}


	//This function pushes the new shapes details in the array. It's parameters come from the drawShape function.
	this.shapeAdd = function (startX, startY, theWidth, theHeight, thePoints) {

		if (abs(theWidth) < 10 && abs(theHeight) < 10) {

			theWidth = 50
			theHeight = 50
		}



		var x = startX
		var y = startY
		var width = theWidth
		var height = theHeight
		var type = selectedTool
		var drag = false
		var colour = colourP.selectedColour
		var points = thePoints


		//Pushes the new shape object onto the array.
		shapeList.push({
			id: shapeList.length + 1,
			x: x,
			y: y,
			width: width,
			height: height,
			type: type,
			drag: drag,
			colour: colour,
			points: points,
		});
	}

	//The function that is called to display where the new shape will be created
	this.drawShape = function () {
		var width
		var height
		var points = []

		if (selectedTool == "Circle") {
			points = "Circle"
		} else if (selectedTool == "Rectangle") {
			points = shapeTools[1].points
		} else if (selectedTool == "Triangle") {
			points = shapeTools[2].points
		} else if (selectedTool == "Diamond") {
			points = shapeTools[3].points
		} else if (selectedTool == "Pentagon") {
			points = shapeTools[4].points
		} else if (selectedTool == "Weird") {
			points = shapeTools[5].points
		}

		push()
		strokeWeight(0)
		if (mouseIsPressed && mouseCanvas() == true && selectedTool != "Select") {

			if (startMouseX == -1) {
				startMouseX = mouseX;
				startMouseY = mouseY;
			} else {
				updatePixels()
				drawing = false
				if (shapeList.length != 0) {
					this.drawAllShapes()
				}
				drawing = true
				beginShape()
				colourP.loadColours()
				//If the control key is pressed the shape will be symmetrical
				if (isControlKey == true) {
					width = mouseX - startMouseX
					height = width
				} else {
					width = mouseX - startMouseX
					height = mouseY - startMouseY
				}

				//Where the new shape is drawn
				if (points == "Circle") {
					ellipse(startMouseX, startMouseY, width, height)
				} else {
					for (var x = 0; x < points.length; x++) {
						vertex(startMouseX + points[x].x * width, startMouseY + points[x].y * height)
					}
				}

				endShape()
			}

		} else if (drawing) {

			width = mouseX - startMouseX
			height = mouseY - startMouseY
			updatePixels()
			beginShape()

			if (isControlKey == true) {
				width = mouseX - startMouseX
				height = width
			} else {
				width = mouseX - startMouseX
				height = mouseY - startMouseY
			}

			if (points == "Circle") {
				ellipse(startMouseX, startMouseY, width, height)
			} else {

				for (var x = 0; x < points.length; x++) {
					vertex(startMouseX + points[x].x * width, startMouseY + points[x].y * height)
				}

			}
			endShape()
			drawing = false;
			this.shapeAdd(startMouseX, startMouseY, width, height, points)

			startMouseX = -1;
			startMouseY = -1;

		};
		pop()


	}

	this.populateOptions = function () {
		//http://api.jquery.com/append/
		//https://www.w3schools.com/jquery/jquery_dom_add.asp
		$(".options").append("<div id='shapeContainer'></div>")

		//Iterates through shapeTools and displays each icon
		for (var x = 0; x < shapeTools.length; x++) {

			if (shapeTools[x].display == false) {
				var shapeHTML = "<div class='shapeItems' id='" + shapeTools[x].name + "Item'> <img src='" + shapeTools[x].icon + "'></div>";
				$("#shapeContainer").append(shapeHTML);
			}
		}

		//Applys the border when an shapeTool icon is clicked
		$(".options").on("click", ".shapeItems", function () {

			$(".shapeItems").css("border", "0px");

			//https://stackoverflow.com/questions/964119/how-to-get-the-class-of-the-clicked-element
			//Finds the current id of the selected element
			shapeName = $(this).attr("id");
			//Adds blue border around currently selected shape option
			$("#" + shapeName).css("border", "2px solid blue");

			//Sets the new shape tool
			selectedTool = split(shapeName, "Item")[0]
		});


	}



	//Used to make drag feature, edited. https://stackoverflow.com/questions/34369053/how-to-drag-shapes-like-rect-circle-other-polygons-etc-around-the-canvas-using

	//Function which handles the event when the mouse is pressed down. 
	this.handleMouseDown = function (e) {
		//The selectedTool must be in Select mode to continue.
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
				currentShape = shapeList[currentIndex];
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
			if (currentShape.points == "Circle") {
				var dx = mouseX
				var dy = mouseY
			} else {
				var dx = mouseX - (currentShape.width / 2);
				var dy = mouseY - (currentShape.height / 2);
			}

			updatePixels()
			//Updates the currentShapes x and y positions
			currentShape.x = dx;
			currentShape.y = dy;
			// redraw all the shapes
			this.drawAllShapes();
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
		shapeList = [];
	});

	this.unselectTool = function () {
		loadPixels();
		$(".options").html("");
		selectedTool = null
		shapeList = []
	}
}

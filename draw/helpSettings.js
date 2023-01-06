function helpSettings(){
	//External javascript file which allows the canvas window to be moved.
	//https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_draggable
	this.backgroundCol = 205;
	
	this.theWindow = document.getElementById("helpBox");
	
	
	var isDragging = null;
	
	dragElement(this.theWindow)
	

	
}

function dragElement(windowElement) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(windowElement.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(windowElement.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    windowElement.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
	
	// Help box currently being dragged
	helpSetting.isDragging = true
  }

  function elementDrag(e) {
    e = e || window.event;
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    windowElement.style.top = (windowElement.offsetTop - pos2) + "px";
    windowElement.style.left = (windowElement.offsetLeft - pos1) + "px";
	  	  
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
	  
	// Help box no longer being dragged
	helpSetting.isDragging = false
  }
}
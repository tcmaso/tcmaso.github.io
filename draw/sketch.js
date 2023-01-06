//global variables that will store the toolboxm colour palette
//amnd the helper functions
var toolbox = null;
var colourP = null;
var helpers = null;
var toolSetting = null;

var canvasSetting = null;

//variables needed to load image
var input; 
var img;

var c;


var allowDraw = true //$$$used to control when the user is allowed to draw


function setup() {

	
	
    //create a canvas to fill the content div from index.html
    canvasContainer = $('#content');
    var c = createCanvas(canvasContainer.innerWidth()-2, canvasContainer.innerHeight()-2);
    c.parent("content");

	background(255);

	if (img) {
		img = null;
		var canvas = getElementById("defaultCanvas0");
		c.clearRect(0,0,canvas.width,canvas.height)
	}
	
	//sets up the load button
	input = createFileInput(this.handleFile)
	input.position(319, 9); 
	
	
	
	
   //create helper functions and the colour palette
    helpers = new HelperFunctions();
    colourP = new ColourPalette();
	toolSetting = new toolSettings();
	helpSetting = new helpSettings();
    
    //create a toolbox for storing the tools
    toolbox = new Toolbox();
    //add the tools to the toolbox. 
    toolbox.addTool(new FreehandTool());
    toolbox.addTool(new LineToTool());
    toolbox.addTool(new SprayCanTool());
    toolbox.addTool(new mirrorDrawTool());
	toolbox.addTool(new eraserTool());
	toolbox.addTool(new shapeTool()); 
	toolbox.addTool(new imageTool()); 	
	toolbox.addTool(new cropTool()); 
	toolbox.addTool(new textTool()); 
	
}

function draw() {
	//if an image is assigned to the img with loading, it will draw the image once, then reset img to null, prevents constant loop.
	
	
	if (img) {
	 	image(img, 0, 0, width/100, height/100);
		img = null;
	}
	
	
	
	
    //call the draw function from the selected tool.
    //hasOwnProperty is a javascript function that tests
    //if an object contains a particular method or property
    //if there isn't a draw method the app will alert the user
	try {
		if(toolbox.selectedTool.hasOwnProperty("draw") && allowDraw == true){
			
			toolbox.selectedTool.draw();
			helpers.opacityBoxControl(toolbox.selectedTool)
			helpers.sizeBoxControl(toolbox.selectedTool)
			helpers.colourBoxControl(toolbox.selectedTool)
		}

	}
	catch(err) {
		console.log(err)
	}
	
	
}

//function to assign a locally stored image to load.
	this.handleFile = function(file) {
	print(file);
	if (file.type === 'image') {
		img = createImg(file.data);
		img.hide();
	}
		
}

//function mousePressed(){
//	var canvasClicked = $('*').bind('click', function(){
//    console.log($(this).attr('id')); // gets the id of a clicked link that has a class of menu
//});


function mouseCanvas(){

	try {
		if(mouseX>0 && mouseX<width && mouseY>0 && mouseY<height && !helpers.mouseHelpBox() == true)
		{
			return true
		} 
		else
		{
			return false
		}
	
	}
	catch(err) {
		console.log(err)
	}
}

function mousePressed(){
	
	try {
		if(toolbox.selectedTool.hasOwnProperty("mousePressed")){
			toolbox.selectedTool.mousePressed();

		}
		
	}
	catch(err){
		console.log(err)
	}
	
}

function mouseReleased(){
	
	try {
		if(toolbox.selectedTool.hasOwnProperty("mouseReleased")){
			toolbox.selectedTool.mouseReleased();


		}
		
		
	}
	catch(err){
		console.log(err)
	}
	
}

function keyPressed(){
	
	try {
		if(toolbox.selectedTool.hasOwnProperty("keyPressed")){
			toolbox.selectedTool.keyPressed();

		}
		
	}
	catch(err){
		console.log(err)
	}
}

function keyReleased(){
	
	try {
		if(toolbox.selectedTool.hasOwnProperty("keyReleased")){
			toolbox.selectedTool.keyReleased();

		}
		
	}
	catch(err){
		console.log(err)
	}
}

function keyTyped(){
	
	try {
		if(toolbox.selectedTool.hasOwnProperty("keyTyped")){
			toolbox.selectedTool.keyTyped();

		}
		
	}
	catch(err){
		console.log(err)
	}
}

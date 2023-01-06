	$(document).ready(function(){
		$("#aboutText, #projectsText, #educationText, #experienceText").hover(function(){
			        $(this).css("background-color", "rgba(50,50,50,0.3)");
					}, function(){
					$(this).css("background-color", "transparent");
		});
		
		
	});
var createBoard = function() { 
	//Creates the buttons used for user input. A <br> is appended it is on the 15th iteration representing one of the 15 rows.
	for(var i = 0; i < 15; i++){
		for(var x = 0; x < 15; x++){
			addToElement($("#gameBoard"), '<span class="userIn">&nbsp</span>'); //Span on click functions change the data within to appropriate values
		}
		addToElement($("#gameBoard"), "</br>")
	}
}

//Universal function to simplify addition to elements
var addToElement = function(element, data) {
	element.html(element.html() + data)
}
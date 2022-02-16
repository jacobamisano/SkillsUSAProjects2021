var currentChoice = 'Make your move ';
var currentPlayer = 'Player 1';
var returnChoice;
var returnPlayer;
var P1Health = 10;
var P2Health = 10;
//These two functions return the appropriate values to be used within the Game.js
var getCurrentChoice = function() {
 	returnChoice;

	if(currentChoice === 'Make your move '){
		returnChoice = 'Make your move ';
		currentChoice = 'Place your bomb ';
	}else{
		returnChoice = 'Place your bomb ';
		currentChoice = 'Make your move '
	}
	return returnChoice;
}

var getCurrentPlayer = function() {
	returnChoice;

	if(currentPlayer === 'Player 1'){
		returnPlayer = 'Player 1';
		currentPlayer = 'Player 2';
	}else{
		returnPlayer = 'Player 2';
		currentPlayer = 'Player 1'
	}

	return returnPlayer;
}

//Method with default values for updating the current choice, movement, and player health.
var updateCurrents = function(P1Sub = 0, P2Sub = 0){
	$("#currents").html(returnChoice + returnPlayer + ",\nPlayer 1 HP: " + (P1Health -= P1Sub) + "\nPlayer 2 HP: " + (P2Health -= P2Sub));

}
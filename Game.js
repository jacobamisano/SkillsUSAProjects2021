/*TODO 
	Initialize board.
	Create Players
	Set Player Details
	Create Bombs
	Create Movement
	Create Bomb Placement
	Create Bomb Damage Proximity
END TODO*/


$(document).ready(function() {
	//Refer to GameBoard.js for documentation
	createBoard();

	//Refer to GamePlayers.js for documentation of below methods. addToElement() is within GameBoard.js
	var currentChoice = getCurrentChoice();
	var currentPlayer = getCurrentPlayer();
	var previousPlayerLocation1;
	var previousPlayerLocation2;
	var currentPlayerLocation1;
	var currentPlayerLocation2;
	var clickCount = 0;
	var firstClick = true;

	$(".userIn").click(function() { 
		if(clickCount == 2){
			clickCount = 0;
			$(".userIn").html("&nbsp");
		}

		if(currentChoice === 'Make your move '){
			if(currentPlayer === 'Player 1'){
				currentPlayerLocation1 = this;
			}else{
				currentPlayerLocation2 = this;
			}

		}else{
			addToElement($(this), "X");
			if(currentPlayer === 'Player 1'){
				currentPlayerLocation1 = this;
			}else{
				currentPlayerLocation2 = this;
			}
		}
		
		//Changes turnand player. Additionally deals damage to target player's HP based upon position within the grid.
		

		alert(currentChoice + "|")
		if(currentChoice === 'Make your move '){
			currentPlayer = getCurrentPlayer();
		}
		if(currentChoice == 'Place your bomb '){
			//Code to calculate damage.
			if((currentPlayerLocation1 == previousPlayerLocation2 || previousPlayerLocation1 == currentPlayerLocation2) && !firstClick){
				if(currentPlayer == 'Player 1'){
					updateCurrents(3, 0);
					$(currentPlayerLocation1).html(":)");
				}else{
					updateCurrents(0, 3);
					$(currentPlayerLocation2).html(":)");
				}
			}

			$(".userIn").show();
		}
		previousPlayerLocation1 = currentPlayerLocation1;
		previousPlayerLocation2 = currentPlayerLocation2;
		clickCount++;
		currentChoice = getCurrentChoice();
		updateCurrents();
		if(firstClick){
			firstClick = false;
		}
	});


});
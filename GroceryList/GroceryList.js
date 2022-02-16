"use strict";
$(document).ready(function(){
	var isValid = true;
	//Parallel arrays relating to values within the grocery item
	var groceryNameArray = [];
	var groceryQuantityArray = [];
	var groceryPriceArray = [];

	//START CURRENTMODE METHODS
	//Gets current mode (Adding, Editing, or Removing) Default:adding
	var getCurrentMode = function(){
		return $("#currentMode").text();
	}
	//Sets value of current mode
	var setCurrentMode = function(mode){
		$("#currentMode").text(mode);
	}
	//END CURRENTMODE METHODS

	//START VALIDATION METHODS
	//The methods below check a specific criteria specific by the name, change the error text if user data is invalid, and return a value (excluding checkIfEmptyInput) to be processed later
	var checkIfEmptyInput = function(input){
		if(input.val().trim() == ""){
			input.next().text("This is a required field.");
			isValid = false;
		}else{
			input.next().text("");
		}
	}

	//Checks if the data is specifically an integer.
	var checkIfIntInput = function(input){
		if(Number.isInteger(parseInt(input.val().trim()))){
			input.next().text("");
			isValid = true;
		}else{
			input.next().text("Please make sure to enter valid numeric data. No half items (for example 2.5) are allowed. Whole numbers only.");
			isValid = false;
		}
		return parseInt(input.val().trim())
	}

	//All Integers are floats so only use !isNaN. Convert to float with fixed digits in display. Automatically removes % and $ for data processing.
	var checkIfFloatInput = function(input){
		var processVal;
		if(input.val().trim().indexOf("$") != -1){
			processVal = input.val().trim().substring(0, input.val().trim().indexOf("$")) + input.val().trim().substring(input.val().trim().indexOf("$") + 1);
		}else if(input.val().trim().indexOf("%") != -1){
			processVal = input.val().trim().substring(0, input.val().trim().indexOf("%")) + input.val().trim().substring(input.val().trim().indexOf("%") + 1);
		}
		else{
			processVal = input.val().trim();
		}
		if(!isNaN(processVal)){
			input.next().text("");
			isValid = true;
		}else{
			input.next().text("Please make sure to enter valid numeric data. Only include digits such as 1, 2, or 3.14.");
			isValid = false;
		}
		return parseFloat(processVal);
	}

	//Checks if a text input contains characters other than strings, and processes appropriatly
	var checkIfLetterString = function(input){
		var val = $(input).val().trim();
		//This regular expression was tested due to the idea that no items other than english named food would be tested as based off of what is in the Use Cases
		var regExp = /[^abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'`]/
		if(regExp.test(val)){
			input.next().text("Please make sure this only contains letters.");
			isValid = false;
		}else{
			input.next().text("");
			isValid = true;
		}
		return $(input).val().trim();
	}
	//END VALIDATION METHODS



	//START LIST MANIPULATION METHODS
	var addToGroceryList = function(type, name, quantity, price){
		//Process based on a grocery list item
		var stringPrice = "$" + price.toFixed(2);
		var stringPriceTotal = "";
		stringPriceTotal = "$" + (price * quantity).toFixed(2);
		
		if(type == "g"){
			$("#gList").html($("#gList").html() + "<dt class=\"" + name + "\">" + quantity + " " + name + " for " + stringPriceTotal + " (" + stringPrice + " each)</dt>");
			
			groceryNameArray[groceryNameArray.length] = name.toLowerCase();
			groceryQuantityArray[groceryQuantityArray.length] = quantity;
			groceryPriceArray[groceryPriceArray.length] = price;
		}else{
			alert("An error occurred when processing, please try again")
		}
		
	}

	//END LIST MANIPULATION METHODS



	//START DATA PROCESSING
	$("#submit").click(function(){
		try{
			//START INPUT VALIDATION
			//Checking if required fields are empty
			checkIfEmptyInput($("#gItemName"));
			checkIfEmptyInput($("#gItemQuantity"));
			checkIfEmptyInput($("#gItemPrice"));

			

			//Checking if appropriate numeric data is present within the user's entries
			if($("#gItemQuantity").val().trim() != ""){
				var gItemQuantity = checkIfIntInput($("#gItemQuantity"));
			}
			if($("#gItemPrice").val().trim() != ""){
				var gItemPrice = checkIfFloatInput($("#gItemPrice"));
			}

			//Checking names for non letter characters
			if($("#gItemName").val().trim() != ""){
				var gItemName = checkIfLetterString($("#gItemName"));
			}

			//Final Check for validity
			//END INPUT VALIDATION



			//START LIST ADDITION
			if(isValid && getCurrentMode() == "Adding"){
				addToGroceryList("g", gItemName, gItemQuantity, gItemPrice);
			}	
			//END LIST ADDITION



			//START LIST REMOVAL
			if(isValid && getCurrentMode() == "Removing"){
				try{
					if($("." + gItemName).next().is("dd")){
						$("." + gItemName).next().remove();
					}
					$("." + gItemName).remove();
				}catch(error){
					alert("An error occurred in your removal attempt. Please make sure that all data matches an existing element within the grocery list.")
				}



			}
			//END LIST REMOVAL



			//START LIST EDITING
			if(isValid && getCurrentMode() == "Editing"){
				var valTotal = parseFloat($("#editgItemPrice").val()) * $("#editgItemQuantity").val();
				var valSingle = parseFloat($("#editgItemPrice").val());
				$("." + gItemName).text("" + $("#editgItemQuantity").val() + " " + $("#editgItemName").val() + " for $" + valTotal.toFixed(2) + " ($" + valSingle.toFixed(2) + " each)");
			}
		
			//END LIST EDITING
		}catch(error){
			alert("An error occurred, please make sure all required boxes are filled.")
		}
	});

	$("#clear").click(function(){
		$("#gItemName").val("");
		$("#gItemQuantity").val("");
		$("#gItemPrice").val("");
		$("#gItemName").focus();
	});


	//START CALCULATE
	$("#calculate").click(function(){
		var basePrice = 0;
		for(var i =0; i < groceryPriceArray.length;i++){
			basePrice += groceryPriceArray[i] * groceryQuantityArray[i];
		}

		//Display Totals

		$("#totals").text("Total Cost for groceries: $" + basePrice.toFixed(2));

	});

	//START MODE CHANGING
	//Each of the click functions below change the current text within the span with the id of "currentMode" and change the currently disabled button to the button that is clicked.
	$("#removeMode").click(function(){
		if(getCurrentMode() == "Adding"){
			$("#addMode").toggleClass("disabled");
		}else if(getCurrentMode() == "Editing"){
			$("#editMode").toggleClass("disabled");
			$("#editForms").toggleClass("disabled");
		}
		setCurrentMode("Removing");
		$("#removeMode").toggleClass("disabled");
	});
		
	$("#editMode").click(function(){
		if(getCurrentMode() == "Adding"){
			$("#addMode").toggleClass("disabled");
		}else if(getCurrentMode() == "Removing"){
			$("#removeMode").toggleClass("disabled");
		}
		$("#editForms").toggleClass("disabled");
		setCurrentMode("Editing");
		$("#editMode").toggleClass("disabled");
	});

	$("#addMode").click(function(){
		if(getCurrentMode() == "Editing"){
			$("#editMode").toggleClass("disabled");
			$("#editForms").toggleClass("disabled");
		}else if(getCurrentMode() == "Removing"){
			$("#removeMode").toggleClass("disabled");
		}
		setCurrentMode("Adding");
		$("#addMode").toggleClass("disabled");
	});
	//END MODE CHANGING

});
eggApp.controller('profileCtrl', function($scope,$timeout,$location,eggModel,$window){

	//Array for storing all the users eggs so they can be displayed in profile 
	eggModel.fetchEggs();
	$scope.eggs = eggModel.returnEggs();

	//Function that sends us to timer with the values of the egg that was clicked 
	//The timer then starts for that egg 
	//>>>>>>OBS! PGA denna funktion kanske inte timer ska starta automatiskt utan med en "start-knapp"
	 $scope.boilAgain = function(size, boil){
	 	//updates current information about the chosen egg
		eggModel.addSizeToProfile(size);
		eggModel.addSoftnessToProfile(boil);
		//Switching to the timer view
		$location.path('/timer');
    };

    //Removes egg from database and profile
     $scope.removeEgg = function(egg){
    	console.log(egg)  
    	//>>>Borde istället finnas en funktion i model så vi bara kan köra 
    	//>>>>>>eggModel.remove(); härifrån

    	// Måste nog spara eggets KEY också i listan i början, så det kan 
    	// SKickas med som värde till den här funktionen 
    	// sen ba eggModel.allEggs.child(key).remove(); antagligen! 
    };

});
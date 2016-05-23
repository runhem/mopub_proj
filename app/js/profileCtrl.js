eggApp.controller('profileCtrl', function($scope,$timeout,$location,eggModel,$window){
	
	$scope.initProfile = function(){
		console.log("I init")
		if(eggModel.loggedIn){
			$scope.eggs = eggModel.fetchEggs();			
		}
	};

	$scope.$on('userSetLogged', function(){
		$scope.eggs = eggModel.fetchEggs();
	});

	$scope.$on('userLoggedOut', function(){
		$scope.egg = [];
		$location.path('/login')
	});

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
	   eggModel.loggedIn.child('egg').once("value", function(snapshot){
	      if(snapshot.numChildren() == 1){
     		eggModel.setNoEggs();
	      }else{
	        eggModel.removeSavedEgg(egg.eggid);
	      }
	    })
	 	$scope.eggs = eggModel.fetchEggs();
	 }

});
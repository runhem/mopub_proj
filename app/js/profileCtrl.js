eggApp.controller('profileCtrl', function($scope,$timeout,$location,eggModel,$window){
	
	//Checks so that the users is logged in and if so eggs are fetched
	$scope.initProfile = function(){
		if(eggModel.loggedIn){
			$scope.eggs = eggModel.fetchEggs();			
		}
	};

	$scope.$on('userSetLogged', function(){
		$scope.eggs = eggModel.fetchEggs();
	});

	//If user is logged out no eggs are to be shown
	$scope.$on('userLoggedOut', function(){
		$scope.egg = [];
		$location.path('/login')
	});

	//Function that updates current information about chose egg and them switches to timer-page
	$scope.boilAgain = function(size, boil){
		eggModel.addSizeToProfile(size);
		eggModel.addSoftnessToProfile(boil);
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
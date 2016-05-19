eggApp.controller('menuCtrl', function(eggModel, $scope, $window){

	$scope.userName = "ERNST";

  	if($scope.returnUser){
  		$scope.userName = eggModel.returnName();		
  		$scope.$apply();
  	}

	$scope.$on('userLoggedIn', function(){
	  	$scope.userName = eggModel.returnName();	
	  	$scope.$apply();	
  	});




  	$scope.signOut = function(){
  		eggModel.signOut();
  	};

  	$scope.$on('userLoggedOut', function(){
  		console.log("Helo")
  	});

});


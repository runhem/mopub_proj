eggApp.controller('menuCtrl', function(eggModel, $scope){

	$scope.userName = "ERNST";

  	if($scope.returnUser){
  		$scope.userName = eggModel.returnName();		
  		$scope.$apply();
  	}

	$scope.$on('userLoggedIn', function(){
	  	$scope.userName = eggModel.returnName();	
	  	$scope.$apply();	
  	});

  $scope.$on('$routeChangeStart', function() { 
    if(slideout.isOpen()){
      slideout.close();
     }; 
  });


  	$scope.signOut = function(){
  		eggModel.signOut();
  	};

  	$scope.$on('userLoggedOut', function(){
  		console.log("Helo")
  	});

});


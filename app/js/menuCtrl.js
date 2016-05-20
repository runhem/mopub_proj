eggApp.controller('menuCtrl', function(eggModel, $location, $scope){

	$scope.userName = "";
  $scope.userPhoto = "images/profile.png";
  $scope.path = $location.$$path;

  $scope.initMenu = function(){
  	if(eggModel.loggedIn){
  		$scope.userName = eggModel.returnName();	
      $scope.userPhoto = eggModel.returnPhoto();	
  	}
  };

	$scope.$on('userLoggedIn', function(){
	  	$scope.userName = eggModel.returnName();
      $scope.userPhoto = eggModel.returnPhoto();
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
      $location.path('/login');  
      $scope.$apply() 
             
      $scope.userName = "";
      $scope.userPhoto = "images/profile.png";
  	});

});


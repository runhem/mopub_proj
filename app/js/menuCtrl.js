eggApp.controller('menuCtrl', function(eggModel, $location, $scope){

  $scope.header = eggModel.headerText;
  //Default variables
	$scope.userName = "";
  $scope.userPhoto = "images/profile.png";
  $scope.path = $location.$$path;

  //Init for the menu, sets up username and photo in menu
  $scope.initMenu = function(){
  	if(eggModel.loggedIn){
  		$scope.userName = eggModel.returnName();	
      $scope.userPhoto = eggModel.returnPhoto();	
  	}
  };

  //If user is logged in the photo and username are always to be displayed in menu
	$scope.$on('userLoggedIn', function(){
	  	$scope.userName = eggModel.returnName();
      $scope.userPhoto = eggModel.returnPhoto();
	  	$scope.$apply();	
  	});

  //Closes the menu of path changes
  $scope.$on('$routeChangeStart', function() { 
    if(slideout.isOpen()){
      slideout.close();
     }; 
  });

    //Function for signing out
  	$scope.signOut = function(){
  		eggModel.signOut();
  	};

    //Redirects to login-page if user is logged out
  	$scope.$on('userLoggedOut', function(){
      $location.path('/login');  
      $scope.$apply()  
      $scope.userName = "";
      $scope.userPhoto = "images/profile.png";
  	});

});


eggApp.controller('menuCtrl', function(eggModel, $location, $scope){

  //Default variables
	$scope.userName = "";
  $scope.userPhoto = "images/profile.png";
  $scope.path = $location.$$path;
  $scope.header = 'hej';

  //Init for the menu, sets up username and photo in menu
  $scope.initMenu = function(){
  	if(eggModel.loggedIn){
  		$scope.userName = eggModel.returnName();	
      $scope.userPhoto = eggModel.returnPhoto();	
  	}
    $scope.setHeader()
  };

  //If user is logged in the photo and username are always to be displayed in menu
	$scope.$on('userLoggedIn', function(){
	  	$scope.userName = eggModel.returnName();
      $scope.userPhoto = eggModel.returnPhoto();
	  	$scope.$apply();	
  	});

  //Closes the menu of path changes
  $scope.$on('$routeChangeStart', function() { 
    $scope.setHeader()   
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

      $scope.setHeader = function(){
      if($location.path() == "/timer"){
        $scope.header = "Timer";
        }
      else if($location.path() == "/newegg"){
        $scope.header = "New egg";
        }
      else if($location.path() == "/profile"){
        $scope.header = "My eggs";
        }
      else if($location.path() == "/videos"){
        $scope.header = "Videos";
        }
      else if($location.path() == "/startBoil"){
        $scope.header = "Set boil";
        }
      };

});


eggApp.controller('menuCtrl', function(eggModel, $location, $scope, $timeout){

  //Default variables
	$scope.userName = "";
  $scope.userPhoto = "images/profile.png";
  $scope.path = $location.$$path;
  $scope.header = '';

  //Init for the menu, sets up username and photo in menu
  $scope.initMenu = function(){
  	if(eggModel.returnUser()){
  		$scope.userName = eggModel.returnName();	
      $scope.userPhoto = eggModel.returnPhoto();	
  	}else{
    $timeout(function() {
        $location.path = ('/login')
        $scope.$apply();
    }, 1000);
    }
    setHeader();
  };

  //If user is logged in the photo and username are always to be displayed in menu
	$scope.$on('userLoggedIn', function(){
     var uid = eggModel.returnUid()
    eggModel.allUsers.on("value", function(snapshot){
      snapshot.forEach(function(childSnapshot){
        if(childSnapshot.child('uid').val() === uid){
          eggModel.setLoggedUser(childSnapshot.key)
          $scope.userName = eggModel.returnName();
          $scope.userPhoto = eggModel.returnPhoto();
          $scope.$apply();  
        }
      })
    });
  });

  //Closes the menu of path changes
  $scope.$on('$routeChangeStart', function() { 
    setHeader()   
    if(slideout.isOpen()){
      slideout.close();
     }; 
  });
  
    //Function for signing out
  $scope.signOut = function(){
		eggModel.signOut();
    eggModel.clearProfile();
  };

    //Redirects to login-page if user is logged out
  $scope.$on('userLoggedOut', function(){
    $location.path('/login');  
    $scope.$apply()  
    $scope.userName = "";
    $scope.userPhoto = "images/profile.png";
  });

  //Sets the right name for the header depending on path
  var setHeader = function(){
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

  //Closes menu if open and redirects to the right path on click on link
  $scope.closeMenu = function(link){
    if(link == "newegg"){
      $location.path('/newegg');  
      }
    else if(link == "profile"){
      $location.path('/profile');  
      }
    else if(link == "videos"){
      $location.path('/videos');  
      }

      if(slideout.isOpen()){
      slideout.close();
     };   

  }

});


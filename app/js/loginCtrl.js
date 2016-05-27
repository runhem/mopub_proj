eggApp.controller('loginCtrl', function($scope, $location, eggModel){

  $scope.loading = false;


  //Sets logged in user to the right user by fetching the user from the database
  //If user doesn't exist in database, a new user is created
  $scope.addUser = function(){
    $scope.loading = true;
    var a = false;
    var uid = eggModel.returnUid();

    eggModel.allUsers.on("value", function(snapshot){
      snapshot.forEach(function(childSnapshot){
        console.log(childSnapshot.child('uid').val(), 'Innan if 1')
        if(childSnapshot.child('uid').val() === uid){
          eggModel.setLoggedUser(childSnapshot.key)
          
          //If user has no eggs he or she gets redirected to 'new egg'-page
          if(childSnapshot.child('egg').val() == "No eggs"){
            $location.path('/newegg'); 
            $scope.$apply()             
          } 
          //Else redirected to 'profile'-page
          else{
            $location.path('/profile');  
            $scope.$apply()            
          }
        a = true;
        return true  
        }
      });

    if(a == false){
      var newUser = eggModel.allUsers.push({'uid': eggModel.returnUid(), 'name': eggModel.returnName(), 'egg': "No eggs"});
      eggModel.setLoggedUser(newUser.key);  
      $location.path('/newegg'); 
      $scope.$apply()   
    };
  });
  };

  //If userLoggedIn the addUser function is run
  $scope.$on('userLoggedIn', function(){
    $scope.addUser();
    $scope.loading = true;
  });

  //Signs in by calling signIn function in model
  $scope.signIn = function(){
    eggModel.signIn();
    $scope.loading = true;
  };

});

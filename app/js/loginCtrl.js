eggApp.controller('loginCtrl', function($scope, $location, eggModel){

  $scope.addUser = function(){
    var a = false;
    var uid = eggModel.returnUid();

    eggModel.allUsers.on("value", function(snapshot){
      snapshot.forEach(function(childSnapshot){
        console.log(childSnapshot.child('uid').val(), 'Innan if 1')
        if(childSnapshot.child('uid').val() === uid){
          eggModel.setLoggedUser(childSnapshot.key)
          
          if(childSnapshot.child('egg').val() == "No eggs"){
            $location.path('/newegg'); 
            $scope.$apply()             
          } else{
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

  $scope.$on('userLoggedIn', function(){
    $scope.addUser();
  });

  $scope.signIn = function(){
    eggModel.signIn();
  };

});

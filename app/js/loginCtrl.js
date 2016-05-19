eggApp.controller('loginCtrl', function($scope, $location, eggModel){

  var loggedIn

  $scope.addUser = function(){
    console.log('I add user')
    var a = false; 
    eggModel.allUsers.once("value", function(snapshot) {
    // The callback function will get called twice, once for "fred" and once for "barney"
      snapshot.forEach(function(childSnapshot) {
      // key will be "fred" the first time and "barney" the second time
        if(childSnapshot.val().uid === eggModel.returnUid()){
          console.log("Inloggat id finns i databasen");
          console.log("Då är vi klara här! Return true");
          loggedIn = eggModel.allUsers.child(childSnapshot.key)
              
          loggedIn.once("value", function(snapshot){
            snapshot.forEach(function(childSnapshot){
              if(childSnapshot.key === "egg"){
                if(childSnapshot.val() === "No eggs"){
                  $location.path('/newegg');  
                }else{
                  $location.path('/profile');  
                }
              }
            })
          })
          a = true;
          return true;         
        }
      })
      if(a === false){
        console.log("Inloggat id fanns inte i databasen. Lägger till användaren") 
        var newUser = eggModel.allUsers.push({'uid': eggModel.returnUid(), 'name': eggModel.returnName(), 'egg': "No eggs"});
        loggedIn = eggModel.allUsers.child(newUser.key);

        loggedIn.once("value", function(snapshot){
          snapshot.forEach(function(childSnapshot){
            if(childSnapshot.key === "egg"){
              if(childSnapshot.val() === "No eggs"){
                $location.path('/newegg');  
              }else{
                $location.path('/profile');  
              }
            }
          })
        })
      }
    })
  };

  $scope.$on('userLoggedIn', function(){
    $scope.addUser();
  });

  $scope.signIn = function(){
    eggModel.signIn();
  };

});

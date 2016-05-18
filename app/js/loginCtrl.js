eggApp.controller('loginCtrl', function($scope){

// logga in, redirecta rätt :) 
// Om redan inloggad, redirect till profil

	var ref = new Firebase("https://eggapp.firebaseio.com");
	var allEggs = ref.child('eggbase');
	var allUsers = ref.child('userbase');

    var loggedIn
    var time

   	$scope.authDataCallback = function(authData){
      if (authData) {
        console.log("User " + authData.uid + " is logged in with " + authData.provider);
        $scope.addUser(authData);
      } else {
          console.log("User is logged out");
      }
    };

    ref.onAuth($scope.authDataCallback);

    $scope.signIn = function(){
    ref.authWithOAuthRedirect("google", function(error) {
      if (error) {
        console.log("Login Failed!", error);
        return
        } else{ 
        }
      });
    };

    $scope.signOut = function(){
      ref.unauth();
    };

    $scope.addUser = function(authData){
    var a = false; 
    allUsers.once("value", function(snapshot) {
    // The callback function will get called twice, once for "fred" and once for "barney"
      snapshot.forEach(function(childSnapshot) {
    // key will be "fred" the first time and "barney" the second time
      if(childSnapshot.val().uid === authData.uid){
        console.log("Inloggat id finns i databasen");
        console.log("Då är vi klara här! Return true");
        loggedIn = allUsers.child(childSnapshot.key())
        a = true;
        return true;         
      }else{
        console.log("Inloggat id finns inte databasen")
        console.log("Kollar nästa id i databasen")
      }
      });
      if(a === false){
      console.log("Inloggat id fanns inte i databasen. Lägger till användaren") 
      var newUser = allUsers.push({'uid': authData.uid, 'name': authData.google.displayName, 'egg': "No eggs"});
      console.log(newUser.key())
      loggedIn = new Firebase("https://eggapp.firebaseio.com/userbase/"+newUser.key());
      };
    });

};
});
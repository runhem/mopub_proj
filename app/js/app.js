var eggApp = angular.module('egg',['ngRoute', 'ngResource', 'ngTouch', 'youtube-embed','timer']); 

eggApp.config(['$routeProvider',
  function($routeProvider) { 
    $routeProvider.
      when('/profile', {
        templateUrl: 'partials/profile.html',
        controller: 'profileCtrl'
         }).
        when('/timer', {
          templateUrl: 'partials/timer.html',
          controller: 'timerCtrl'
        }).
        when('/videos', {
          templateUrl: 'partials/videos.html',
          controller: 'videosCtrl'
        }).
        when('/test', {
          templateUrl: 'partials/slidertest.html',
          controller: 'boilCtrl'
        }).
        when('/newegg', {
          templateUrl: 'partials/newegg.html',
          controller: 'newEggCtrl'
        }).
        when('/login', {
          templateUrl: 'partials/login.html',
          controller: 'loginCtrl'
        }).
        when('/startBoil', {
          templateUrl: 'partials/startBoil.html',
          controller: 'boilCtrl'
        }).
      otherwise({
        redirectTo:'/login'
      });
  }]);


eggApp.factory('eggModel',function ($resource, $rootScope, $location) {

// Initializing firebase 

  var config = {
    apiKey: "AIzaSyC5UNcs8CVnpX5xDPs7cWVTfpLEO8pZJ_Q",
    authDomain: "eggapp.firebaseapp.com",
    databaseURL: "https://eggapp.firebaseio.com",
    storageBucket: "project-640863975778677110.appspot.com",
  };

  firebase.initializeApp(config);
  this.ref = firebase.database().ref();

// Creating reference to branches in database 
  this.allEggs = this.ref.child('eggbase');
  this.allUsers = this.ref.child('userbase');
  this.allVideos = this.ref.child('videobase');
  

// Firebase authorisation through google login
  var auth = firebase.auth();
  var provider = new firebase.auth.GoogleAuthProvider();
  var profile = {"eggSize": null, "softness": null, "eggTime" : null, "rating": null};
  this.loggedIn //<----VAD GÖR DENNA??

  // Signs in
  this.signIn = function(){ 
    auth.signInWithRedirect(provider)
    provider.addScope('profile');
  };

  //Signs out
  this.signOut = function(){
    firebase.auth().signOut().then(function() {
    console.log("Sign out successful")
    loggedIn = '';
    }, function(error) {
    console.log("Sign out error")
    });
  };

// Setting authorised user in database
  this.setLoggedUser = function(userbaseId){
    this.loggedIn = this.allUsers.child(userbaseId);
    $rootScope.$broadcast('userSetLogged')
  };

  //Sets current User and returns true if successful
  this.returnUser = function(){
    if(firebase.auth().currentUser){
      return true
    }
    else{
      return false
    }
  };

  //Checks if user is logged in
  firebase.auth().onAuthStateChanged(function(user){
    if (user) {
      console.log("user")
      $rootScope.$broadcast('userLoggedIn');
   //   this.setLoggedUser() <----HA KVAR????? 
    } 
    else {
      console.log("No user")
      this.loggedIn
      $rootScope.$broadcast('userLoggedOut');
    }
  });

  //Returns users email
  this.returnEmail = function(){
      console.log(firebase.auth().currentUser.email);
      return firebase.auth().currentUser.email;
  };

  //Returns users name
  this.returnName = function(){
      return firebase.auth().currentUser.displayName;
  };

  //Returns users photo
  this.returnPhoto = function(){
    return firebase.auth().currentUser.photoURL; 
  };

  //Returns unders uid
  this.returnUid = function(){
    return firebase.auth().currentUser.uid;
  };

  //Fetches all eggs from database and stores it in eggs-array
  this.fetchEggs = function(){
  var eggs = [];
  this.loggedIn.child('egg').on("value", function(snapshot){
      snapshot.forEach(function(childSnapshot){
      eggs.push({'boil':childSnapshot.child('boil').val(),
                'size':childSnapshot.child('size').val(),
                'rating':childSnapshot.child('rating').val(),
                'date':childSnapshot.child('date').val(),
                'eggid':childSnapshot.key
              })
        })
    })
  return eggs
  }

  //Adds the current Boil-softness to profile
  this.addSoftnessToProfile = function(softness){
    profile.softness = softness;
  }

  //Adds the current egg-size to profile
  this.addSizeToProfile = function(size){
    profile.eggSize = size;
  }

  //Adds cooking-Time to Profile 
  this.addTimeToProfile = function(time){
    profile.eggTime = time;
    $rootScope.$broadcast('newTime');

  }

  //Adds the current Rating to profile
  this.addRatingToProfile = function(rating){
    profile.rating = rating;
  }

  //Returns current EggSize to fetch to controller when needed
  this.returnEggSize = function(){
    return profile.eggSize;
  }

  //Returns current Boil-softness to fetch to controller when needed 
  this.returnSoftness = function(){
    return profile.softness;
  }

  //Returns cooking-time for current egg, so can be fetched to controller when needed 
  this.returnEggTime = function(){
    return profile.eggTime;
  }

  //Returns the current egg-rating to fetch to controller when needed 
  this.returnRating = function(){
    return profile.rating;
  }

  //Removes egg from database
  this.removeSavedEgg = function(item){
    this.loggedIn.child('egg').child(item).remove()
  };

  //Sets eggs to "No eggs" for logged in user <--- NÄR ANVÄNDER VI DENNA??? 
  this.setNoEggs = function(){
    this.loggedIn.child('egg').set('No eggs')
  }


  //Clears profile 
  this.clearProfile = function(){
  profile = {"eggSize": null, "softness": null, "eggTime" : null, "rating": null};
  }


  return this
});












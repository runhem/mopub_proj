var eggApp = angular.module('egg',['ngRoute', 'ngResource', 'youtube-embed','timer','ngTouch']); 

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


eggApp.factory('eggModel',function ($resource, $rootScope) {

  var config = {
    apiKey: "AIzaSyC5UNcs8CVnpX5xDPs7cWVTfpLEO8pZJ_Q",
    authDomain: "eggapp.firebaseapp.com",
    databaseURL: "https://eggapp.firebaseio.com",
    storageBucket: "project-640863975778677110.appspot.com",
  };

  firebase.initializeApp(config);

  this.headerText = "";
  this.ref = firebase.database().ref();
  this.allEggs = this.ref.child('eggbase');
  this.allUsers = this.ref.child('userbase');
  this.allVideos = this.ref.child('videobase');
  
  var profile = {"eggSize": "small", "softness": "medium", "eggTime" : 0, "rating": 0};
  this.loggedIn

  var eggs = [];

  var auth = firebase.auth();

  var provider = new firebase.auth.GoogleAuthProvider();

  this.signIn = function(){ 
    auth.signInWithRedirect(provider)
    provider.addScope('profile');
  };

  this.signOut = function(){
    firebase.auth().signOut().then(function() {
    console.log("Sign out successful")
    }, function(error) {
    console.log("Sign out error")
    });
  };

  this.setLoggedUser = function(userbaseId){
    this.loggedIn = this.allUsers.child(userbaseId);
  };

  this.returnUser = function(){
    if(firebase.auth().currentUser){
      return true
    }else{
      return false
    }
  };

  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    $rootScope.$broadcast('userLoggedIn');
    this.setLoggedUser()
  } else {
    console.log("No user")
    $rootScope.$broadcast('userLoggedOut');
    this.loggedIn 
  }
  });

  this.returnEmail = function(){
      console.log(firebase.auth().currentUser.email);
      return firebase.auth().currentUser.email;
  };

  this.returnName = function(){
      return firebase.auth().currentUser.displayName;
  };

  this.returnPhoto = function(){
    return firebase.auth().currentUser.photoURL; 
  };

  this.returnUid = function(){
    return firebase.auth().currentUser.uid;
  };


  //Fetches all eggs from database and stores it in eggs-array
  this.fetchEggs = function(){
  this.loggedIn.child('egg').on("value", function(snapshot){
      snapshot.forEach(function(childSnapshot){
      eggs.push({'boil':childSnapshot.child('boil').val(),
                'size':childSnapshot.child('size').val(),
                'rating':childSnapshot.child('rating').val()
              })
        })
    })
  }

  this.returnEggs = function(){
      return eggs;
  }

//Josmol har lagt till 

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
  this.removeEggFromDatabase = function(item){
    console.log("i remove")
    //Ska ta bort egg från firebase
    //Vet ej hur man gör :(
    this.loggedIn.child('egg').on("value", function(snapshot){
      snapshot.forEach(function(childSnapshot){
        //Istället kolla om key = key
        if(childSnapshot.val() == item){
          //remove
        }
        else{ console.log("not to remove")}
        })
    })
  }

  return this

});












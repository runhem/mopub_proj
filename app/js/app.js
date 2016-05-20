var eggApp = angular.module('egg',['ngRoute', 'ngResource', 'youtube-embed','timer','ngTouch']); 

eggApp.config(['$routeProvider',
  function($routeProvider) { 
    $routeProvider.
      when('/profile', {
        templateUrl: 'partials/profile.html',
        controller: 'boilCtrl'
         }).
        when('/timer', {
          templateUrl: 'partials/timer.html',
          controller: 'boilCtrl'
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
          controller: 'boilCtrl'
        }).
        when('/login', {
          templateUrl: 'partials/login.html',
          controller: 'loginCtrl'
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

  this.ref = firebase.database().ref();
  this.allEggs = this.ref.child('eggbase');
  this.allUsers = this.ref.child('userbase');
  this.allVideos = this.ref.child('videobase');
  
  this.loggedIn
  this.eggSizeNow

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

  this.returnEggs = function(){
    console.log("Loggedin", this.loggedIn)
    return this.loggedIn.child('egg');
  }

  this.returnEggSize = function(){
    return this.eggSizeNow;
  }

  return this

});












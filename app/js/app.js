var eggApp = angular.module('egg',['ngRoute', 'ngResource', 'youtube-embed','timer']); 

eggApp.config(['$routeProvider',
  function($routeProvider) { 
    $routeProvider.
      when('/profile', {
        templateUrl: 'partials/profile.html',
        controller: 'profileCtrl'
         }).
        when('/timer', {
          templateUrl: 'partials/timer.html',
          controller: 'boilCtrl'
        }).
        when('/videos', {
          templateUrl: 'partials/videos.html',
          controller: 'videosCtrl'
        }).
        when('/newegg', {
          templateUrl: 'partials/newegg.html',
          controller: 'eggCtrl'
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

  this.returnUser = function(){
    if(firebase.auth().currentUser){
      return true
  }else{
      return false
  }};

  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("user changed")
    $rootScope.$broadcast('userLoggedIn');
  } else {
    console.log("No user")
    $rootScope.$broadcast('userLoggedOut');
  }
  });

  this.returnEmail = function(){
      console.log(firebase.auth().currentUser.email);
      return firebase.auth().currentUser.email;
  };

  this.returnName = function(){
      return firebase.auth().currentUser.displayName;
  }

  this.returnPhoto = function(){
    return firebase.auth().currentUser.photoURL; 
  };

  this.returnUid = function(){
    return firebase.auth().currentUser.uid;
  };

  return this

});
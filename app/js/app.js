var eggApp = angular.module('egg',['ngRoute', 'ngResource']); 

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


// index som grund ? Importera angular hur 

// Josmol shake that egg
// videoeggs.html
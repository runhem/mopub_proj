var eggApp = angular.module('egg',['ngRoute']); 

eggApp.config(['$routeProvider',
	function($routeProvider) { 
		$routeProvider.
			when('/profile', {
				templateUrl: 'profile.html',
				controller: 'profileCtrl'
		     }).
    		when('/timer', {
      		templateUrl: 'timer.html',
      		controller: 'boilCtrl'
    		}).
    		when('/videos', {
      		templateUrl: 'videos.html',
      		controller: 'videosCtrl'
    		}).
    		when('/newegg', {
      		templateUrl: 'newegg.html',
      		controller: 'boilCtrl'
    		}).
        when('/login', {
          templateUrl: 'login.html',
          controller: 'loginCtrl'
        }).
			otherwise({
				redirectTo:'/login'
			});
	}]);


// index som grund ? Importera angular hur 

// Josmol shake that egg
// videoeggs.html
var app = angular.module('myApp',[]); 

app.config(['$routeProvider',
	function($routeProvider) { 
		$routeProvider.
			when('/home', {
				templateUrl: 'timer.html',
				controller: 'timer-ctrl.js'
			}).
			otherwise({
				redirectTo: '/home'
			});
	}]);


var app = angular.module('myApp', ['youtube-embed']); 

app.config(['$routeProvider',
	function($routeProvider) { 
		$routeProvider.
			when('/home', {
				templateUrl: 'shakethategg.html'
			}).
			when('/video', {
				templateUrl: 'index.html',
				controller: 'videoCtrl'
			}).
			otherwise({
				redirectTo: '/home'
			});
	}]);




eggApp.controller('boilCtrl', ['$scope','$timeout', function($scope,$timeout){

// ta in eggstorlek
// Slider ska generera tid
// Countdown
// Start boil
// Klar med boil -> Vill du spara?

// Till CSS sen! 
// 	small = document.querySelector("#smallEgg");
// 	large = document.querySelector("#mediumEgg");
// // Klart med tilll CSS

// 	medium = document.querySelector("#largeEgg");

// 	small.style.display = "none";
// 	large.style.display = "none";

// 	$scope.changeSize = function(size){
// 	  if(size == 'small'){
// 	    medium.style.display = "none";
// 	    large.style.display = "none";
// 	    small.style.display = "block";
// 	  }
// 	  if(size == 'medium'){
// 	    small.style.display = "none";
// 	    large.style.display = "none";
// 	    medium.style.display = "block";

// 	  }
// 	  if(size == 'large'){
// 	    small.style.display = "none";
// 	    medium.style.display = "none";
// 	    large.style.display = "block";
// 	  }
// 	};

	$scope.counter = 10;
    var stopped;

	$scope.countdown = function() {
	    stopped = $timeout(function() {
	        if($scope.counter>0){
	     $scope.counter--;   
	     $scope.countdown(); 
	     }
	     else{
	        $scope.counter=0;
	     }  
	    }, 1000);
	  };	




	  

}]);
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

	$scope.counter = 3;
    var stopped;

	$scope.countdown = function() {
		var animateCount = 0;
		TweenMax.to('.animateEgg',1,{y:"+=200px"});
		TweenMax.to('.animateText',0.01,{'opacity':'0'});
		
	    stopped = $timeout(function() {
	        if($scope.counter>0){
	     $scope.counter--;   
	     $scope.countdown(); 
	     }
	     else{
	        $scope.counter=0;
	        TweenLite.to('#finishText', 0.001, {text:{value:"TAKE OUT YOUR EGG!", delimiter:" "}, ease:Linear.easeNone, 'color':'red', 'font-weight':'bold'});
	        $scope.wannaSave = true;
	     }  
	    }, 1000);
	  };

	$scope.saveEgg = function(){

		console.log("[insert awesome function here]")

	}  	




	  

}]);
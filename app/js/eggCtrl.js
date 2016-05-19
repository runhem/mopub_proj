eggApp.controller('eggCtrl', function($scope){

// Till CSS sen! 
	small = document.querySelector("#smallEgg");
	large = document.querySelector("#largeEgg");
// Klart med tilll CSS

	medium = document.querySelector("#mediumEgg");

	medium.style.display = "block";
	small.style.display = "none";
	large.style.display = "none";

	$scope.changeSize = function(size){
	  if(size == 'small'){
	    medium.style.display = "none";
	    large.style.display = "none";
	    small.style.display = "block";
	  }
	  if(size == 'medium'){
	    small.style.display = "none";
	    large.style.display = "none";
	    medium.style.display = "block";

	  }
	  if(size == 'large'){
	    small.style.display = "none";
	    medium.style.display = "none";
	    large.style.display = "block";
	  }
	};

});
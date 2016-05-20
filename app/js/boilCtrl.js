eggApp.controller('boilCtrl', function($scope,$timeout,$location,eggModel){

// ta in eggstorlek
// Slider ska generera tid
// Countdown
// Start boil
// Klar med boil -> Vill du spara?

// Till CSS sen! 

	var size = 'S'; 
	var boil = 4;

	$scope.initNewEgg = function(){
    if(slideout.isOpen()){
        slideout.close();
    }
    	
 	this.small = document.querySelector("#smallEgg");
 	this.large = document.querySelector("#mediumEgg");
	this.medium = document.querySelector("#largeEgg");

	this.small.style.display = "none";
	this.large.style.display = "none";
	};

	$scope.changeSize = function(eggSize){
		size = eggSize;
	  
	  if(size == 'small'){
	    this.medium.style.display = "none";
	    this.large.style.display = "none";
	    this.small.style.display = "block";
	  }
	  if(size == 'medium'){
	    this.small.style.display = "none";
	    this.large.style.display = "none";
	    this.medium.style.display = "block";

	  }
	  if(size == 'large'){
	    this.small.style.display = "none";
	    this.medium.style.display = "none";
	    this.large.style.display = "block";
	  }
	};

	var userId

	$scope.saveEgg = function(){
		eggModel.loggedIn.child('egg').push({'size': size, 'boil': boil});
	};


	$scope.timerRunning = false;
	$scope.wannaSave = false;

	$scope.startTimer = function (){
	     $scope.$broadcast('timer-start');
         $scope.timerRunning = true;
         TweenMax.to('.animateEgg',2,{y:"+=400px"});
		 TweenMax.to('.animateText',0.01,{'opacity':'0'});
		 document.getElementById('audio1').play();
         };


	$scope.$on('timer-stopped', function (event, data){
		$scope.wannaSave = true;
		$scope.$apply();
		$scope.timerRunning = false;
		TweenLite.to('#finishText', 0.001, {text:{value:"TAKE OUT YOUR EGG!", delimiter:" "}, ease:Linear.easeNone, 'color':'red', 'font-weight':'bold'});
		TweenMax.to('#audio1', 2, {'volume':0}, "-=1");
	});        

/*
	Slask

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
	  };*/

});


eggApp.controller('boilCtrl', function($scope,$timeout,$location,eggModel){

// ta in eggstorlek
// Slider ska generera tid
// Countdown
// Start boil
// Klar med boil -> Vill du spara?

// Till CSS sen! 

	var size = 'S'; 
	var boil = 4;
	$scope.eggs = [];

	$scope.initNewEgg = function(){
	 	$scope.small = document.querySelector("#smallEgg");
	 	$scope.large = document.querySelector("#mediumEgg");
		$scope.medium = document.querySelector("#largeEgg");

		$scope.small.style.display = "none";
		$scope.large.style.display = "none";
	};

	$scope.initProfile = function(){ 
		eggModel.returnEggs().on("value", function(snapshot){
			snapshot.forEach(function(childSnapshot){
			$scope.eggs.push({'boil':childSnapshot.child('boil').val(),
								'size':childSnapshot.child('size').val(),
								'rating':childSnapshot.child('rating').val()
							})
			})
		})
	};

	$scope.changeSize = function(eggSize){
		size = eggSize;
	  
	  if(size == 'small'){
	    $scope.medium.style.display = "none";
	    $scope.large.style.display = "none";
	    $scope.small.style.display = "block";
	  }
	  if(size == 'medium'){
	    $scope.small.style.display = "none";
	    $scope.large.style.display = "none";
	    $scope.medium.style.display = "block";

	  }
	  if(size == 'large'){
	    $scope.small.style.display = "none";
	    $scope.medium.style.display = "none";
	    $scope.large.style.display = "block";
	  }
	};


	$scope.saveEgg = function(){
		eggModel.loggedIn.child('egg').push({'size': size, 'boil': boil, 'rating': 5});
	};


	$scope.timerRunning = false;
	$scope.wannaSave = false;

	$scope.startTimer = function (){
	     $scope.$broadcast('timer-start');
         $scope.timerRunning = true;
         TweenMax.to('.animateEgg',2,{y:"+=400px"});
		 TweenMax.to('.animateText',0.01,{'opacity':'0'});
		 document.getElementById('audio1').play();
		 var t1 = new TimelineMax();
		 t1.from('#t1',2, {css:{'height':'0px', 'width':'5'}});
		 t1.to('#t1',2,{opacity:1},{css:{'height':'100px'}});
		 t1.to('#c1',2,{opacity:1});
		 t1.to('#text1',0.001,{text:{value:"#Tips1: Did you know...", delimiter:" "},ease:Linear.easeNone});
		 t1.from('#t2',2, {css:{'height':'0px', 'width':'5'}});
		 t1.to('#t2',2,{opacity:1},{css:{'height':'100px'}});
		 t1.to('#c2',2,{opacity:1});
		 t1.to('#text2',0.001,{text:{value:"#Tips2: Did you know...", delimiter:" "},ease:Linear.easeNone});
		 t1.from('#t3',2, {css:{'height':'0px', 'width':'5'}});
		 t1.to('#t3',2,{opacity:1},{css:{'height':'100px'}});
		 t1.to('#c3',2,{opacity:1});
		 t1.to('#text3',0.001,{text:{value:"#Tips3: Did you know...", delimiter:" "},ease:Linear.easeNone});
		 t1.from('#t4',2, {css:{'height':'0px', 'width':'5'}});
		 t1.to('#t4',2,{opacity:1},{css:{'height':'100px'}});
		 t1.to('#c4',2,{opacity:1});
		 t1.to('#text4',0.001,{text:{value:"#Tips4: Did you know...", delimiter:" "},ease:Linear.easeNone});



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


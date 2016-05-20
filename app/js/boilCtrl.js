eggApp.controller('boilCtrl', function($scope,$timeout,$location,eggModel,$window){

// ta in eggstorlek
// Slider ska generera tid
// Countdown
// Start boil
// Klar med boil -> Vill du spara?

// Till CSS sen! 

	$scope.eggs = [];
	$scope.boil 
	$scope.eggSize = eggModel.returnEggSize()
	$scope.eggTime = 1;

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

	$scope.selectSize = function(){
		eggModel.eggSizeNow = document.querySelector(".item.active").id;
		$location.path('/timer');
	}

	$scope.saveEgg = function(){
		eggModel.loggedIn.child('egg').push({'size': $scope.eggSize, 'boil': $scope.boil, 'rating': 5});
	};


	$scope.timerRunning = false;
	$scope.wannaSave = false;
	$scope.animate = false;

	$scope.startTimer = function (){
	     $scope.$broadcast('timer-start');
         $scope.timerRunning = true;
         $scope.animate = true;
         TweenMax.to('.animateEgg',2,{y:"+=400px"});
		 TweenMax.to('.animateText',0.01,{'opacity':'0'});
		 document.getElementById('audio1').play();
		 var t1 = new TimelineMax();
		 t1.from('#t1',0.1, {css:{'height':'0px', 'width':'5'}});
		 t1.to('#t1',60,{css:{'height':'100px'}});
		 t1.to('#c1',2,{css:{'height':'40px','width':'40px', 'border-radius':'50%','opacity':'1'}});
		 t1.to('#text1',0.001,{text:{value:"#Tips1: Did you know...", delimiter:" "},ease:Linear.easeNone});
		 t1.from('#t2',0.1, {css:{'height':'0px', 'width':'5'}});
		 t1.to('#t2',6,{css:{'height':'100px'}});
		 t1.to('#c2',2,{css:{'height':'40px','width':'40px', 'border-radius':'50%','opacity':'1'}});
		 t1.to('#text2',0.001,{text:{value:"#Tips2: Did you know...", delimiter:" "},ease:Linear.easeNone});
		 t1.from('#t3',0.1, {css:{'height':'0px', 'width':'5'}});
		 t1.to('#t3',6,{css:{'height':'100px'}});
		 t1.to('#c3',2,{css:{'height':'40px','width':'40px', 'border-radius':'50%','opacity':'1'}});
		 t1.to('#text3',0.001,{text:{value:"#Tips3: Did you know...", delimiter:" "},ease:Linear.easeNone});
		 t1.from('#t4',0.1, {css:{'height':'0px', 'width':'5'}});
		 t1.to('#t4',6,{css:{'height':'100px'}});
		 t1.to('#c4',2,{css:{'height':'40px','width':'40px', 'border-radius':'50%','opacity':'1'}});
		 t1.to('#text4',0.001,{text:{value:"#Tips4: Did you know...", delimiter:" "},ease:Linear.easeNone});
    };


	$scope.$on('timer-stopped', function (event, data){
		$scope.wannaSave = true;
		$scope.$apply();
		$scope.timerRunning = false;
		TweenLite.to('#finishText', 0.001, {text:{value:"YOUR EGG IS DONE!", delimiter:" "}, ease:Linear.easeNone});
		TweenMax.to('#audio1', 2, {'volume':0}, "-=1");
		TweenMax.to('.tipsQueue',1,{opacity:0});
		TweenMax.to('#countDown',1,{opacity:0});
	});       

	$scope.initTest = function(){
		var slider = document.getElementById('slider');

		noUiSlider.create(slider, {
			start: [ 3 ],
			step:1,
			range: {
				'min': [  1 ],
				'max': [ 6 ]
			},	
			format: {
	  			to: function ( value ) {
				return value + '';
			  },
			  	from: function ( value ) {
				return value.replace('', '');
			  }
			}
		});

		slider.noUiSlider.on('update', function(){
			boil = slider.noUiSlider.get();
			console.log(boil)
			if(boil == 1){
				var tBoil = 'soft'
				$scope.getEggTime(tBoil);

			}else if(boil == 2){
				var tBoil = 'soft to medium'
				$scope.getEggTime(tBoil);

			}else if(boil == 3){
				var tBoil = 'medium'
				$scope.getEggTime(tBoil);
			}else if(boil == 4){
				var tBoil = 'medium to hard'
				$scope.getEggTime(tBoil);
			}else if(boil == 5){
				var tBoil = 'hard'
				$scope.getEggTime(tBoil);

			}else if(boil == 6){
				var tBoil = 'too hard'
				$scope.getEggTime(tBoil);
			}
			$scope.boil = tBoil;
		});
};


	$scope.getEggTime = function(tBoil){
		var eggsize = $scope.eggSize;
      	allEggsSize = eggModel.allEggs.child(eggsize)
      	allEggsSize.once("value", function(snapshot){
        snapshot.forEach(function(childSnapshot) {
          if(childSnapshot.key == tBoil){
            $scope.eggTime = childSnapshot.val();
            console.log($scope.eggTime)
            $scope.$apply()
          }else{
          }
        });
      }); 
    };


// Typ såhär beroende på hur sidan som nu visas ser ut?
// Kanske att vi måste göra en funktion i app som gör att boil sparas där med 
// I och med att CTRL kanske läses om och vi då måste spara boil-värdet på en 
// fast plats? 

    $scope.boilAgain = function(size, boil){
		eggModel.eggSizeNow = size;
		$scope.eggSize = size;
		getEggTime(boil);
    };

    $scope.removeEgg = function(key){
    	// Måste nog spara eggets KEY också i listan i början, så det kan 
    	// SKickas med som värde till den här funktionen 
    	// sen ba eggModel.allEggs.child(key).remove(); antagligen! 
    };

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


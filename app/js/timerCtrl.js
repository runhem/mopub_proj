eggApp.controller('timerCtrl', function($scope,$timeout,$location,eggModel,$window){


	//Variables
	$scope.timerRunning = false;
	$scope.wannaSave = false;
	$scope.animate = false;
	$scope.eggTime = eggModel.returnEggTime();
	$scope.t1 = new TimelineMax();

	// $scope.stopTimer = function(){
	// 	$scope.timerRunning = false;

	// 	console.log("stop",$scope.timerRunning )
	// 	$scope.animate = false;
	// 	document.getElementById('audio1').pause();
	// }
	
	//Timer function
	$scope.startTimer = function (){
	    $scope.$broadcast('timer-start');

        $scope.timerRunning = true;
        $scope.animate = true;
         
         //Detta används ej om vi kör på att byta sida för timer
   //       TweenMax.to('.animateEgg',2,{y:"+=400px"});
		 // TweenMax.to('.animateText',0.01,{'opacity':'0'});
		
		var music = document.getElementById('audio1');
		music.play();

		var t1 = new TimelineMax();

		 //>>>>> Eventuellt ha i databas??? 
		var tipsList = ["Tip #1: Put your egg in a sock and spin it before boiling and you will have a scramled egg!",
		 				"Tip #2: Be gentle with your eggs. They break very easy!",
		 				"Tip #3: Try putting an egg on your next hamburger! Yummie!",
		 				"Tip #4: Eggs stay fresh longer if your store them in the fridge!",
		 				"Tip #5: Putting a spoon in the pot while boiling help the egg not to break!", 
		 				"Tip #6: Put salt in the water when boiling to prevent the egg to spread if it breaks"]
		
		//animates tips in loop depending on how many tips there are in tipsList-array
		for(i=1; i<tipsList.length+2; i++){
		 	t1.from('#t'+i, 0.1, {css:{'height':'0px', 'width':'5'}});
		 	t1.to("#t"+i,6,{css:{'height':'100px'}});
			t1.to("#c"+i,2,{css:{'height':'40px','width':'40px', 'border-radius':'50%','opacity':'1'}});
		 	t1.to("#text"+i,0.001,{text:{value:tipsList[i-1], delimiter:" "},ease:Linear.easeNone});
		 }
    };
	$scope.stopTimer = function (){
		$scope.$broadcast('timer-stop');
		$scope.timerRunning = false;
		};

	$scope.resumeTimer = function(){
		$scope.$broadcast('timer-resume');

	}	
        $scope.$on('timer-resume', function () {
          console.log("hejeje")
        });

 	$scope.operation = 'start';
    $scope.startStop = function(){
    document.getElementById('timer')[$scope.operation]();
    $scope.operation = ($scope.operation === 'start' || $scope.operation === 'resume') ? 'stop' : 'resume';
    if($scope.operation === 'stop'){
    	$scope.animate = true;
    	$scope.t1.paused(false);
         
		
		$scope.music = document.getElementById('audio1');
		$scope.music.play();

		

		 //>>>>> Eventuellt ha i databas??? 
		var tipsList = ["Tip #1: Put your egg in a sock and spin it before boiling and you will have a scramled egg!",
		 				"Tip #2: Be gentle with your eggs. They break very easy!",
		 				"Tip #3: Try putting an egg on your next hamburger! Yummie!",
		 				"Tip #4: Eggs stay fresh longer if your store them in the fridge!",
		 				"Tip #5: Putting a spoon in the pot while boiling help the egg not to break!", 
		 				"Tip #6: Put salt in the water when boiling to prevent the egg to spread if it breaks"]
		
		//animates tips in loop depending on how many tips there are in tipsList-array
		for(i=1; i<tipsList.length+2; i++){
		 	$scope.t1.from('#t'+i, 0.1, {css:{'height':'0px', 'width':'5'}});
		 	$scope.t1.to("#t"+i,6,{css:{'height':'100px'}});
			$scope.t1.to("#c"+i,2,{css:{'height':'40px','width':'40px', 'border-radius':'50%','opacity':'1'}});
		 	$scope.t1.to("#text"+i,0.001,{text:{value:tipsList[i-1], delimiter:" "},ease:Linear.easeNone});
		 }
    };
    if($scope.operation === 'resume'){
    	$scope.t1.paused(true)
    	$scope.music.pause();
    }



  }

	// $scope.$on('timer-stopped', function (event, data){
	// 	console.log("inne i timer stopped")
	// 	$scope.wannaSave = true;
	// 	TweenLite.to('#finishText', 0.001, {text:{value:"YOUR EGG IS DONE!", delimiter:" "}, ease:Linear.easeNone});
	// 	TweenMax.to('#audio1', 2, {'volume':0}, "-=1");
	// 	TweenMax.to('.tipsQueue',1,{opacity:0});
	// 	TweenMax.to('#countDown',1,{opacity:0});
	// });       


	//Variable used to display saving buttons when set to true
	$scope.chooseSave = true;
	//Sets variables needed for displaying rating
	$scope.showRating = function(){
		$scope.rating = true;
		$scope.chooseSave = false;
	}

	//Function that is called when don't save egg is chosen.
	//Should clear the egg-profile and the redirect to 'my eggs'(?) or 'new egg'(?)
	$scope.dontSave = function(){
		console.log("Don't save egg!")
		//Should clear profile
	}
//Saves the egg after cooking
	$scope.saveEgg = function(rating){
		var eggSize = eggModel.returnEggSize();
		var boil = eggModel.returnSoftness();

		var currentDate = new Date()
		var day = currentDate.getDate()
		var month = currentDate.getMonth()
		var year = currentDate.getFullYear()
		var date = day + "/" + month + "/" + year

		eggModel.loggedIn.child('egg').push({'size': eggSize, 'boil':boil, 'rating': rating, 'date':date});
		$location.path("/profile");

	};


});

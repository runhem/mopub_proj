eggApp.controller('timerCtrl', function($scope,$timeout,$location,eggModel,$window){

	//Variables
	$scope.timerRunning = false;
	$scope.wannaSave = false;
	$scope.animate = false;
	$scope.eggTime = eggModel.returnEggTime();

	//Timer function
	$scope.startTimer = function (){
	    $scope.$broadcast('timer-start');
        $scope.timerRunning = true;
        $scope.animate = true;
         
         //Detta används ej om vi kör på att byta sida för timer
   //       TweenMax.to('.animateEgg',2,{y:"+=400px"});
		 // TweenMax.to('.animateText',0.01,{'opacity':'0'});
		
		// var music = document.getElementById('audio1');
		// music.play();
		// music.loop = true;

		var t1 = new TimelineMax();

		 //>>>>> Eventuellt ha i databas??? 
		var tipsList = ["Tips #1: Lägg ett egg i en strumpa och skaka om innan kokning så får du ett 'scrambled egg'",
		 				"Tips #2: Var varsam med dina ägg. De går lätt sönder.",
		 				"Tips #3: Det är gott med ägg på hamburgare!",
		 				"Tips #4: Lägg ägg i farfars skägg"]
		
		//animates tips in loop depending on how many tips there are in tipsList-array
		for(i=1; i<tipsList.length+2; i++){
		 	t1.from('#t'+i, 0.1, {css:{'height':'0px', 'width':'5'}});
		 	t1.to("#t"+i,6,{css:{'height':'100px'}});
			t1.to("#c"+i,2,{css:{'height':'40px','width':'40px', 'border-radius':'50%','opacity':'1'}});
		 	t1.to("#text"+i,0.001,{text:{value:tipsList[i-1], delimiter:" "},ease:Linear.easeNone});
		 }
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

//Saves the egg after cooking
	$scope.saveEgg = function(rating){
		//>>>>> Istället här: 
		//>>>>> Kalla på funktion i app som gör "add Rating" till profile
		//>>>>> Och sedan en eggModel.saveEgg som kanske kan pusha hela profile till databasen?
		//>>>>> om vi får den att stämma överens (se ut som nedan?)
		//>>>>> I så fall kan vi ta bort 'time' från profile så ser den ju ut som nedan (om vi också döper om 'eggSize' och 'softness' till detta)
		//>>>>> möjligtvis om även profile ska tömmas sen bara för att vara säkra på att vi inte råkar få in felaktiga ägg
		eggModel.loggedIn.child('egg').push({'size': $scope.eggSize, 'boil': $scope.boil, 'rating': rating});
	};


});

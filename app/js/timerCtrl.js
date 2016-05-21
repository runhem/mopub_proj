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
		 
		 document.getElementById('audio1').play();
		 var t1 = new TimelineMax();
		 
		 //Animation for egg tips
		 t1.from('#t1',0.1, {css:{'height':'0px', 'width':'5'}});
		 t1.to('#t1',15,{css:{'height':'100px'}});
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

eggApp.controller('timerCtrl', function($scope,$timeout,$location,eggModel,$window){

	//Variables
	$scope.timerRunning = false;
	$scope.wannaSave = false;
	$scope.animate = false;	
	$scope.t1 = new TimelineMax();

	//Gets the eggtime 
	var getEggTime = function(softness, size){
		checkLoggedIn()
      	var allSoftness = eggModel.allEggs.child(size)
      	allSoftness.once("value", function(snapshot){
        	snapshot.forEach(function(childSnapshot) {
          		if(childSnapshot.key == softness){
          		//Adds the time to profile for the current egg
            	eggModel.addTimeToProfile(childSnapshot.val());

	            //Fetches variables $scope.eggTime and $scope.softness so they can update dynamically
	            //when using slider
	            $scope.eggTime = eggModel.returnEggTime();
	            $scope.$apply()
	            return $scope.eggTime; 
	          	}else{
	          	}
        	});
      	}); 
    };

	// Making sure user is logged in, otherwise redirect to login
	var checkLoggedIn = function(){
		if(eggModel.loggedIn){
		}else{
		window.location.href = 'http://xml.csc.kth.se/~friekl/mopub_proj/app/index.html';
		}
	};

    //Fetches softness and eggsize from the profile in the model
	$scope.softness = eggModel.returnSoftness();
	$scope.eggSize = eggModel.returnEggSize();

	//Calls the function getEggTime with the softness and egSize just fetched 
	$scope.eggTime = getEggTime($scope.softness, $scope.eggSize);

	//Timer function. Starts timer and animations
	$scope.startTimer = function (){
		//Listens to when timer is started
	    $scope.$broadcast('timer-start');

	    //Variables for timerRunning and animate, 
	    //used for displaying the right content at the right time
        $scope.timerRunning = true;
        $scope.animate = true;
    
    	//Fetching music element and plays it
		$scope.music = document.getElementById('audio1');
		$scope.music.play();

		//List with egg-tips 
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

    //When timer stops music is paused, and wannaSave is set to true which displays the saving options
	$scope.$on('timer-stopped', function (event, data){
		console.log("inne i timer stopped")
		$scope.wannaSave = true;
		$scope.music.pause();
		$scope.$apply();
		
		TweenMax.to('#audio1', 2, {'volume':0}, "-=1");
		TweenMax.to('.tipsQueue',1,{opacity:0});
		TweenMax.to('#countDown',1,{opacity:0});
	});       


	//Variable used to display saving buttons when set to true
	$scope.chooseSave = true;

	//Sets variables needed for displaying rating
	$scope.showRating = function(){
		$scope.rating = true;
		$scope.chooseSave = false;
	}

	//Function that is called when don't save egg is chosen.
	//Clears the egg-profile and the redirect to 'new egg' page
	$scope.dontSave = function(){
		eggModel.clearProfile();
		$location.path("/newegg");
	}
	
//Saves the egg after cooking
	$scope.saveEgg = function(rating){
		console.log(rating)
		var eggSize = eggModel.returnEggSize();
		var boil = eggModel.returnSoftness();

		var currentDate = new Date()
		var day = currentDate.getDate()
		var month = currentDate.getMonth()+1
		var year = currentDate.getFullYear()
		var date = day + "/" + month + "/" + year

		eggModel.loggedIn.child('egg').push({'size': eggSize, 'boil':boil, 'rating': rating, 'date':date});
		$location.path("/profile");
	};

	//Redirects the user back to previous page
	$scope.goBack = function(){
		history.back()
	};


});

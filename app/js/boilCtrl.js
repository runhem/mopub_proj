eggApp.controller('boilCtrl', function($scope,$timeout,$location,eggModel,$window){

// Getting egg-size selected by user
$scope.eggSize = eggModel.returnEggSize();


//Handling the slider 
	$scope.initSlider = function(){
		if(eggModel.returnEggSize()){
		var slider = document.getElementById('slider');
		//setting up slider
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

		//When sliding, updates value and $scope.eggTime through $scope.getEggTime
		slider.noUiSlider.on('update', function(){
			//Gets value from slider and puts it into variable boil
			var boil = slider.noUiSlider.get();
			//Checking different states of boil from slider value 'boil'
			//and depending on state the variable 'softness' gets diffrent values
			var softness
			if(boil == 1){
				softness = 'soft';
			}
			else if(boil == 2){
				softness = 'soft to medium';
			}
			else if(boil == 3){
				softness = 'medium';
			}
			else if(boil == 4){
				softness = 'medium to hard';
			}
			else if(boil == 5){
				softness = 'hard';
			}
			else if(boil == 6){
				softness = 'too hard';
			}
			//Adds eggSoftness to profile
			eggModel.addSoftnessToProfile(softness);
			//Calls function $scope.getEggTime to get new time depending on new softness
			$scope.getEggTime(softness);
		});
	}
	else{
		$location.path('/newegg')	
	}
	};

// fetches the time to boil for the chosen softness called 'softness'
	$scope.getEggTime = function(softness){
      	var allSoftness = eggModel.allEggs.child($scope.eggSize)
      	allSoftness.once("value", function(snapshot){
        	snapshot.forEach(function(childSnapshot) {
          		if(childSnapshot.key == softness){
          		
          		//Adds the time to profile for the current egg
            	eggModel.addTimeToProfile(childSnapshot.val());
	            
	            //Fetches variables $scope.eggTime and $scope.softness so they can update dynamically
	            //when using slider
	            $scope.eggTime = eggModel.returnEggTime();
	            $scope.softness = eggModel.returnSoftness();
	            $scope.$apply()
	          	}else{
	          	}
        	});
      	}); 
    };

    //Redirects user back to previous page
	$scope.goBack = function(){
		history.back()
	};

	//Redirects user to timer page
    $scope.goToTimer = function(){
		$location.path("/timer");
	}


	

});


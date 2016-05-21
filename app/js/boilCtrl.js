eggApp.controller('boilCtrl', function($scope,$timeout,$location,eggModel,$window){

	eggModel.headerText = "Set timer";
	
	//variable for storing current eggSize
	$scope.eggSize = eggModel.returnEggSize();
	console.log("eggSize", $scope.eggSize)
//Handling the slider 
	$scope.initSlider = function(){
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
			if(boil == 1){
				var softness = 'soft';
			}
			else if(boil == 2){
				var softness = 'soft to medium';
			}
			else if(boil == 3){
				var softness = 'medium';
			}
			else if(boil == 4){
				var softness = 'medium to hard';
			}
			else if(boil == 5){
				var softness = 'hard';
			}
			else if(boil == 6){
				var softness = 'too hard';
			}
			//Adds eggSoftness to profile
			eggModel.addSoftnessToProfile(softness);
			//Calls function $scope.getEggTime to get new time depending on new softness
			$scope.getEggTime(softness);
		});
};

// fetches the time to boil for the chosen softness called 'softness'
//>>>>> GÖRAS I MODEL ISTÄLLET? 
//>>>>> Just nu får man nämligen ingen tid i profile pga att denna ligger i ctrl.
//>>>>> Vet inte vad som är bäst? Provade men lyckades inte få till det med att ha den i model
//>>>>> Annars slår vi ihop Profile och boil controllerna igen om vi inte får det att funka
//>>>>> Det som inte gick när jag la den i app var att då updaterades inte tid och softness med slidern
$scope.getEggTime = function(softness){
	console.log("hej")
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

// ------------- ÖVRIGT ------------------

	//>>>>>>Funkar ej än men tanken är att den ska göra så header-texten uppdateras på nåt sätt 


});


eggApp.controller('newEggCtrl', function($scope,$location,eggModel,$window){

//selects current size and stores it in profile and then moves to Timer Page
	$scope.selectSize = function(){
		var eggSize = document.querySelector(".item.active").id;
		eggModel.addSizeToProfile(eggSize);
		$location.path('/startBoil');
	}

	//Handles the carousel
	$( ".carousel" ).carousel({ interval: false });
});
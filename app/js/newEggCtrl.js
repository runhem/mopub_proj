eggApp.controller('newEggCtrl', function($scope,$location,eggModel,$window){

eggModel.headerText = "New egg";
//selects current size and moves to Timer Page
	$scope.selectSize = function(){
		var eggSize = document.querySelector(".item.active").id;
		eggModel.addSizeToProfile(eggSize);
		$location.path('/startBoil');
	}

});
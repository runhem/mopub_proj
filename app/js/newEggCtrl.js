eggApp.controller('newEggCtrl', function($scope,$location,eggModel,$window){

// Making sure user is logged in, otherwise redirect to login
$scope.checkLoggedIn = function(){
	if(eggModel.loggedIn){
	}else{
	window.location.href = 'http://xml.csc.kth.se/~friekl/mopub_proj/app/index.html';
	}
};

//selects current size and stores it in profile and then moves to Timer Page
	$scope.selectSize = function(){
		var eggSize = document.querySelector(".item.active").id;
		eggModel.addSizeToProfile(eggSize);
		$location.path('/startBoil');
	}

	//Handles the carousel
	$( ".carousel" ).carousel({ interval: false });
});
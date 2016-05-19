eggApp.controller('profileCtrl', function($scope){

// Kolla om du är inloggad, annars skicka dig till login
// Visa alla dina ägg, valt ägg leder till timer 
$scope.eggs = [
{"boil":"5", "size":"medium", "rating": "4"},
{"boil":"3", "size":"small", "rating": "5"},
{"boil":"7", "size":"small", "rating": "1"},
{"boil":"2", "size":"small", "rating": "2"},
{"boil":"10", "size":"large", "rating": "4"},
{"boil":"4", "size":"medium", "rating": "5"},
{"boil":"2", "size":"small", "rating": "2"},
{"boil":"1", "size":"large", "rating": "3"},
{"boil":"6", "size":"small", "rating": "3"},
]


$scope.boilAgain = function(boil, size){
	//Tar in input från eggets tid och storlek
	//Måste synkas med databas sen så det stämmer
	//Måste även redirecta till timersidan
	//Kanske ha samma controller på nåt sätt :) ? 
	if(boil && size){
		//Om boil och size värden finns
		console.log(boil, size);
		}
	}

$scope.checkMenu = function(){
	if(slideout.isOpen()){
		slideout.close();
	}
}



});
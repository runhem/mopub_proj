var app = angular.module('egg',[]); 
app.controller('timerCtrl', ['$scope','$timeout', function($scope,$timeout){

    $scope.counter = 10;
    var stopped;
    
$scope.countdown = function() {
    stopped = $timeout(function() {
        if($scope.counter>0){
     $scope.counter--;   
     $scope.countdown(); 
     }
     else{
        $scope.counter=0;
     }  
    }, 1000);
  };
    
            
}]);
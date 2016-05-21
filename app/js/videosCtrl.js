eggApp.controller('videosCtrl', function($scope, eggModel){

eggModel.headerText = "Egg videos";


$scope.displayVideos = [];

    $scope.getVideo = function(videoCat){

    $scope.displayVideos = [];
       eggModel.allVideos.once("value", function(snapshot){
            snapshot.forEach(function(childSnapshot){
                if(childSnapshot.child("category").val() == videoCat){
                    $scope.displayVideos.push(childSnapshot.val())
                }
            })
            $scope.$apply();
        })

    }




});
